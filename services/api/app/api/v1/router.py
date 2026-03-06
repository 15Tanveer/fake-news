from fastapi import APIRouter
from app.api.v1 import auth, detect, quota

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(detect.router, prefix="/detect", tags=["detect"])
api_router.include_router(quota.router, prefix="/quota", tags=["quota"])
