from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dbutils import get_db
from src.services.admin_auth import AdminAuthService
from src.models import schemas
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login", response_model=schemas.TokenResponseSchema)
async def login_admin(admin: schemas.LoginSchema, db: AsyncSession = Depends(get_db)):
    logger.info(f"Admin login attempt for email: {admin.email}")
    result = await AdminAuthService.login(admin, db)
    logger.info(f"Admin login successful for email: {admin.email}")
    return result

@router.post("/register", response_model=schemas.TokenResponseSchema)
async def register_admin(admin: schemas.RegisterSchema, db: AsyncSession = Depends(get_db)):
    logger.info(f"Admin register attempt for email: {admin.email}")
    result = await AdminAuthService.register(admin, db)
    logger.info(f"Admin register successful for email: {admin.email}")
    return result