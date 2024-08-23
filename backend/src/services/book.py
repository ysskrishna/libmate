from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.models import Book
from src.models import schemas, enums
from src.core.dbutils import db_transaction_handler
import logging

logger = logging.getLogger(__name__)


class BookService:

    @staticmethod
    async def get_books(db: AsyncSession):
        async def inner_logic():
            query = select(Book)
            result = await db.execute(query)
            books = result.scalars().all()
            return books

        return await db_transaction_handler(db, inner_logic, error_return=[])


    @staticmethod
    async def create(book_data: schemas.BookBase, db: AsyncSession):
        async def inner_logic():
            new_book = Book(**book_data.dict())
            db.add(new_book)
            await db.commit()
            await db.refresh(new_book)
            return new_book
        
        return await db_transaction_handler(db, inner_logic)
    
    @staticmethod
    async def update(book_id: int, book_data: schemas.UpdateBookRequestSchema, db: AsyncSession):
        async def inner_logic():
            result = await db.execute(select(Book).filter(Book.book_id == book_id))
            book = result.scalar_one_or_none()
            if not book:
                return None
            for key, value in book_data.dict(exclude_unset=True).items():
                setattr(book, key, value)
            await db.commit()
            await db.refresh(book)
            return book
        
        return await db_transaction_handler(db, inner_logic)

    @staticmethod
    async def delete(book_id: int, db: AsyncSession):
        async def inner_logic():
            result = await db.execute(select(Book).filter(Book.book_id == book_id))
            book = result.scalar_one_or_none()
            if not book:
                return None
            await db.delete(book)
            await db.commit()
            return book
        
        return await db_transaction_handler(db, inner_logic)