import hashlib
import hmac
import os
import secrets
from datetime import datetime, timedelta, timezone

SESSION_TTL_DAYS = int(os.getenv("SESSION_TTL_DAYS", "30"))


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, stored_value: str) -> bool:
    try:
        salt, stored_hash = stored_value.split("$", 1)
    except ValueError:
        return False

    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return hmac.compare_digest(digest.hex(), stored_hash)


def create_session_token() -> str:
    return secrets.token_urlsafe(32)


def session_expiry_iso() -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(days=SESSION_TTL_DAYS)
    return expires_at.isoformat()
