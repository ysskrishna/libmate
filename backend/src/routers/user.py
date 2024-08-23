from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dbutils import get_db
from src.services.user import UserService
from src.models import schemas
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login", response_model=schemas.TokenResponse)
async def login_user(user: schemas.LoginSchema, db: AsyncSession = Depends(get_db)):
    logger.info(f"User login attempt for email: {user.email}")
    result = await UserService.login(user, db)
    logger.info(f"User login successful for email: {user.email}")
    return result

@router.post("/register", response_model=schemas.TokenResponse)
async def register_user(user: schemas.RegisterSchema, db: AsyncSession = Depends(get_db)):
    logger.info(f"User register attempt for email: {user.email}")
    result = await UserService.register(user, db)
    logger.info(f"User register successful for email: {user.email}")
    return result