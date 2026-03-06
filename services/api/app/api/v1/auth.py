from typing import Literal

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel, EmailStr, Field

from app.core.auth_session import get_required_user
from app.core.database import get_connection
from app.core.security import (
    create_session_token,
    hash_password,
    session_expiry_iso,
    verify_password,
)

router = APIRouter()

Plan = Literal["registered", "paid"]


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    firstName: str = Field(min_length=2)
    lastName: str = Field(min_length=2)
    plan: Plan = "registered"


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)


@router.post("/register")
def register(payload: RegisterRequest):
    conn = get_connection()

    existing = conn.execute("SELECT id FROM users WHERE email = ?", (payload.email.lower(),)).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=409, detail="Email already exists")

    hashed = hash_password(payload.password)
    cursor = conn.execute(
        """
        INSERT INTO users(email, password_hash, first_name, last_name, plan)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            payload.email.lower(),
            hashed,
            payload.firstName.strip(),
            payload.lastName.strip(),
            payload.plan,
        ),
    )

    user_id = cursor.lastrowid
    token = create_session_token()
    conn.execute(
        "INSERT INTO sessions(token, user_id, expires_at) VALUES (?, ?, ?)",
        (token, user_id, session_expiry_iso()),
    )

    conn.commit()

    user = conn.execute(
        "SELECT id, email, first_name, last_name, plan FROM users WHERE id = ?",
        (user_id,),
    ).fetchone()
    conn.close()

    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "firstName": user["first_name"],
            "lastName": user["last_name"],
            "plan": user["plan"],
        },
    }


@router.post("/login")
def login(payload: LoginRequest):
    conn = get_connection()
    user = conn.execute(
        "SELECT id, email, first_name, last_name, plan, password_hash FROM users WHERE email = ?",
        (payload.email.lower(),),
    ).fetchone()

    if not user or not verify_password(payload.password, user["password_hash"]):
        conn.close()
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_session_token()
    conn.execute(
        "INSERT INTO sessions(token, user_id, expires_at) VALUES (?, ?, ?)",
        (token, user["id"], session_expiry_iso()),
    )

    conn.commit()
    conn.close()

    return {
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "firstName": user["first_name"],
            "lastName": user["last_name"],
            "plan": user["plan"],
        },
    }


@router.get("/me")
def me(authorization: str | None = Header(default=None)):
    user, _ = get_required_user(authorization)

    return {
        "user": {
            "id": user["id"],
            "email": user["email"],
            "firstName": user["first_name"],
            "lastName": user["last_name"],
            "plan": user["plan"],
        }
    }


@router.post("/logout")
def logout(authorization: str | None = Header(default=None)):
    _, token = get_required_user(authorization)
    conn = get_connection()
    conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
    conn.commit()
    conn.close()
    return {"message": "Logged out"}
