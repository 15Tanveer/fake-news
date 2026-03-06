from datetime import datetime, timezone
from typing import Any

from app.core.database import get_connection


def current_month_key() -> str:
    now = datetime.now(timezone.utc)
    return f"{now.year:04d}-{now.month:02d}"


def monthly_resets_at() -> str:
    now = datetime.now(timezone.utc)
    if now.month == 12:
        next_month = datetime(now.year + 1, 1, 1, tzinfo=timezone.utc)
    else:
        next_month = datetime(now.year, now.month + 1, 1, tzinfo=timezone.utc)
    return next_month.isoformat()


def plan_limits(plan: str) -> tuple[int | None, str, str | None]:
    if plan == "paid":
        return None, "lifetime", None
    if plan == "registered":
        return 30, current_month_key(), monthly_resets_at()
    return 5, "lifetime", None


def get_quota_status_for_subject(subject_type: str, subject_id: str, plan: str) -> dict[str, Any]:
    limit, period_key, resets_at = plan_limits(plan)

    conn = get_connection()
    row = conn.execute(
        """
        SELECT used FROM quota_counters
        WHERE subject_type = ? AND subject_id = ? AND period_key = ?
        """,
        (subject_type, subject_id, period_key),
    ).fetchone()
    conn.close()

    used = int(row["used"]) if row else 0

    return {
        "plan": plan,
        "used": used,
        "limit": limit,
        "remaining": None if limit is None else max(limit - used, 0),
        "periodKey": period_key,
        "resetsAt": resets_at,
    }


def consume_quota(subject_type: str, subject_id: str, plan: str) -> dict[str, Any]:
    status = get_quota_status_for_subject(subject_type, subject_id, plan)

    if status["limit"] is not None and status["used"] >= status["limit"]:
        return {**status, "allowed": False}

    conn = get_connection()
    conn.execute("BEGIN IMMEDIATE")

    period_key = status["periodKey"]
    conn.execute(
        """
        INSERT INTO quota_counters(subject_type, subject_id, period_key, used)
        VALUES (?, ?, ?, 1)
        ON CONFLICT(subject_type, subject_id, period_key)
        DO UPDATE SET used = used + 1, updated_at = CURRENT_TIMESTAMP
        """,
        (subject_type, subject_id, period_key),
    )

    conn.commit()

    row = conn.execute(
        """
        SELECT used FROM quota_counters
        WHERE subject_type = ? AND subject_id = ? AND period_key = ?
        """,
        (subject_type, subject_id, period_key),
    ).fetchone()
    conn.close()

    used = int(row["used"]) if row else 0
    limit = status["limit"]

    return {
        "plan": plan,
        "used": used,
        "limit": limit,
        "remaining": None if limit is None else max(limit - used, 0),
        "periodKey": period_key,
        "resetsAt": status["resetsAt"],
        "allowed": True,
    }
