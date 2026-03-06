from fastapi import APIRouter, Header, Request

from app.core.auth_session import get_optional_user
from app.core.quota import get_quota_status_for_subject

router = APIRouter()


@router.get("/status")
def quota_status(
    request: Request,
    authorization: str | None = Header(default=None),
    x_guest_id: str | None = Header(default=None),
):
    user = get_optional_user(authorization)

    if user:
        subject_type = "user"
        subject_id = str(user["id"])
        plan = str(user["plan"])
    else:
        subject_type = "guest"
        subject_id = x_guest_id or request.client.host or "anonymous"
        plan = "guest"

    status = get_quota_status_for_subject(subject_type=subject_type, subject_id=subject_id, plan=plan)

    return {
        "plan": status["plan"],
        "used": status["used"],
        "limit": status["limit"],
        "remaining": status["remaining"],
        "resetsAt": status["resetsAt"],
    }
