from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.core.config import Config
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from fastapi import HTTPException, status
import logging


DATABASE_URL = Config.DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=Config.SQLALCHEMY_ECHO)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session


logger = logging.getLogger(__name__)

async def db_transaction_handler(db: AsyncSession, func):
    try:
        return await func()
    except IntegrityError as e:
        logger.error(f"Integrity error: {e}")
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Integrity constraint violated.")
    except SQLAlchemyError as e:
        logger.error(f"Database error: {e}")
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Database error: {e}")