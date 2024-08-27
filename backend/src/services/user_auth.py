from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.models import User
from src.models import schemas, enums
from src.core.dbutils import db_transaction_handler
from src.core.jwtutils import verify_password, get_password_hash, create_access_token
import logging

logger = logging.getLogger(__name__)


class UserAuthService:
    role = enums.RoleType.USER

    @staticmethod
    async def register(user: schemas.RegisterSchema, db: AsyncSession):
        async def inner_logic():
            query = select(User).filter(User.email == user.email)
            result = await db.execute(query)
            db_user = result.scalar_one_or_none()

            if db_user:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

            hashed_password = get_password_hash(user.password)
            new_user = User(name=user.name, email=user.email, password=hashed_password)
            db.add(new_user)
            await db.commit()
            await db.refresh(new_user)

            access_token = create_access_token(new_user.email, UserAuthService.role)
            return {"access_token": access_token, "name": new_user.name, "role": UserAuthService.role}
        
        return await db_transaction_handler(db, inner_logic)
    
    @staticmethod
    async def login(user: schemas.LoginSchema, db: AsyncSession):
        query = select(User).filter(User.email == user.email)
        result = await db.execute(query)
        db_user = result.scalar_one_or_none()

        if not db_user or not verify_password(user.password, db_user.password):
            logger.error("Invalid credentials for email: %s", user.email)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

        logger.info(f"User login successful for email: {user.email}")
        access_token = create_access_token(db_user.email, UserAuthService.role)
        return {"access_token": access_token, "name": db_user.name, "role": UserAuthService.role}