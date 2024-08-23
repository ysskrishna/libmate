from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dbutils import get_db
from src.services.user_auth import UserAuthService
from src.models import schemas
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login", response_model=schemas.TokenResponseSchema)
async def login_user(user: schemas.LoginSchema, db: AsyncSession = Depends(get_db)):
    logger.info(f"User login attempt for email: {user.email}")
    result = await UserAuthService.login(user, db)
    logger.info(f"User login successful for email: {user.email}")
    return result

@router.post("/register", response_model=schemas.TokenResponseSchema)
async def register_user(user: schemas.RegisterSchema, db: AsyncSession = Depends(get_db)):
    logger.info(f"User register attempt for email: {user.email}")
    result = await UserAuthService.register(user, db)
    logger.info(f"User register successful for email: {user.email}")
    return result