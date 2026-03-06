import os
from functools import lru_cache

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel, Field
from transformers import pipeline

from app.core.auth_session import get_optional_user
from app.core.quota import consume_quota

router = APIRouter()


class DetectRequest(BaseModel):
    text: str = Field(min_length=10)


MODEL_ID = os.getenv("HF_MODEL_ID", "jy46604790/Fake-News-Bert-Detect")


@lru_cache(maxsize=1)
def _get_classifier():
    return pipeline("text-classification", model=MODEL_ID, tokenizer=MODEL_ID)


def _fallback_detection(text: str) -> tuple[str, int]:
    lowered = text.lower()
    fake_markers = ["shocking", "secret", "hoax", "click here", "breaking truth"]
    score = sum(1 for marker in fake_markers if marker in lowered)

    if score >= 2:
        return "FAKE", 84
    if score == 1:
        return "FAKE", 63
    return "REAL", 78


def _model_detection(text: str) -> tuple[str, int]:
    classifier = _get_classifier()
    prediction = classifier(text, truncation=True, max_length=512)[0]

    raw_label = str(prediction.get("label", "")).upper()
    score = float(prediction.get("score", 0.0))

    if "0" in raw_label or "FAKE" in raw_label:
        label = "FAKE"
        accuracy = int(round(score * 100))
    else:
        label = "REAL"
        accuracy = int(round(score * 100))

    return label, max(0, min(100, accuracy))


@router.post("")
def detect(
    payload: DetectRequest,
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

    quota = consume_quota(subject_type=subject_type, subject_id=subject_id, plan=plan)
    if not quota["allowed"]:
        raise HTTPException(
            status_code=429,
            detail={
                "message": "Quota exceeded",
                "quota": quota,
            },
        )

    try:
        label, accuracy = _model_detection(payload.text)
    except Exception:
        # If model download/inference fails, keep endpoint available.
        label, accuracy = _fallback_detection(payload.text)

    return {
        "label": label,
        "accuracy": accuracy,
        "quota": {
            "plan": quota["plan"],
            "used": quota["used"],
            "limit": quota["limit"],
            "remaining": quota["remaining"],
            "resetsAt": quota["resetsAt"],
        },
    }
