from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.models import Admin
from src.models import schemas
from src.models import enums
from src.core.jwtutils import verify_password, get_password_hash, create_access_token
import logging

logger = logging.getLogger(__name__)


class AdminService:
    role = enums.RoleType.ADMIN

    @staticmethod
    async def register(admin: schemas.RegisterSchema, db: AsyncSession):
        query = select(Admin).filter(Admin.email == admin.email)
        result = await db.execute(query)
        db_admin = result.scalar_one_or_none()

        if db_admin:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        hashed_password = get_password_hash(admin.password)
        new_admin = Admin(name=admin.name, email=admin.email, password=hashed_password)
        db.add(new_admin)
        await db.commit()
        await db.refresh(new_admin)

        access_token = create_access_token(new_admin.email, AdminService.role)
        return {"access_token": access_token, "name": new_admin.name, "role": AdminService.role}

    @staticmethod
    async def login(admin: schemas.LoginSchema, db: AsyncSession):
        query = select(Admin).filter(Admin.email == admin.email)
        result = await db.execute(query)
        db_admin = result.scalar_one_or_none()

        if not db_admin or not verify_password(admin.password, db_admin.password):
            logger.error("Invalid credentials for email: %s", admin.email)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

        access_token = create_access_token(db_admin.email, AdminService.role)
        return {"access_token": access_token, "name": db_admin.name, "role": AdminService.role}