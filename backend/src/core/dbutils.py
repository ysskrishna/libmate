from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.core.config import Config
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, status
import logging


DATABASE_URL = Config.DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)
Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session


logger = logging.getLogger(__name__)

async def db_transaction_handler(db: AsyncSession, func, error_return=None):
    try:
        return await func()
    except SQLAlchemyError as e:
        logger.error(f"Database error: {e}")
        await db.rollback()
        return error_return