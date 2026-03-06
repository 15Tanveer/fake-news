from datetime import datetime, timezone

from fastapi import HTTPException

from app.core.database import get_connection


def parse_bearer_token(authorization: str | None) -> str | None:
    if not authorization:
        return None

    parts = authorization.split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "bearer" or not parts[1]:
        return None

    return parts[1]


def get_user_from_token(token: str):
    conn = get_connection()
    row = conn.execute(
        """
        SELECT u.id, u.email, u.first_name, u.last_name, u.plan, s.expires_at
        FROM sessions s
        JOIN users u ON u.id = s.user_id
        WHERE s.token = ?
        """,
        (token,),
    ).fetchone()

    if not row:
        conn.close()
        return None

    expires_at = datetime.fromisoformat(row["expires_at"])
    if expires_at <= datetime.now(timezone.utc):
        conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()
        return None

    conn.close()
    return row


def get_optional_user(authorization: str | None):
    token = parse_bearer_token(authorization)
    if not token:
        return None
    return get_user_from_token(token)


def get_required_user(authorization: str | None):
    token = parse_bearer_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

    user = get_user_from_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Session not found or expired")

    return user, token
