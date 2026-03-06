import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.database import init_db

DEFAULT_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
DEFAULT_ORIGIN_REGEX = r"https?://(localhost|127\.0\.0\.1|10\.0\.2\.2|192\.168\.\d+\.\d+)(:\d+)?$"

cors_allow_all = os.getenv("CORS_ALLOW_ALL", "true").lower() == "true"
allowed_origins = [origin.strip() for origin in os.getenv("CORS_ALLOW_ORIGINS", DEFAULT_ORIGINS).split(",") if origin.strip()]
allowed_origin_regex = os.getenv("CORS_ALLOW_ORIGIN_REGEX", DEFAULT_ORIGIN_REGEX)

app = FastAPI(title="Fake News SaaS API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if cors_allow_all else allowed_origins,
    allow_origin_regex=None if cors_allow_all else allowed_origin_regex,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/v1")


@app.on_event("startup")
def startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
