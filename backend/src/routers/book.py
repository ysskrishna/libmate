from fastapi import APIRouter, Depends
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dbutils import get_db
from src.core.jwtutils import RoleChecker
from src.services.book import BookService
from src.models import schemas, enums

import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/", response_model=list[schemas.BookResponseSchema])
async def get_books(current_user: dict = Depends(RoleChecker([enums.RoleType.ADMIN, enums.RoleType.USER])), db: AsyncSession = Depends(get_db)):
    logger.info("Fetching all books")
    books = await BookService.get_books(db)
    logger.info(f"Found {len(books)} books")
    return books

@router.post("/", response_model=schemas.BookResponseSchema)
async def create_book(book: schemas.BookBase, current_user: dict = Depends(RoleChecker([enums.RoleType.ADMIN])), db: AsyncSession = Depends(get_db)):
    logger.info(f"Creating book with title: {book.title}")
    new_book = await BookService.create(book, db)
    logger.info(f"Created book with ID: {new_book.book_id}")
    return new_book

@router.put("/{book_id}", response_model=schemas.BookResponseSchema)
async def update_book(book_id: int, book: schemas.UpdateBookRequestSchema, current_user: dict = Depends(RoleChecker([enums.RoleType.ADMIN])), db: AsyncSession = Depends(get_db)):
    logger.info(f"Updating book with ID: {book_id}")
    updated_book = await BookService.update(book_id, book, db)
    if not updated_book:
        logger.error(f"Book with ID {book_id} not found or not updated")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found or not updated")
    logger.info(f"Updated book with ID: {updated_book.book_id}")
    return updated_book

@router.delete("/{book_id}", response_model=schemas.BookResponseSchema)
async def delete_book(book_id: int, current_user: dict = Depends(RoleChecker([enums.RoleType.ADMIN])), db: AsyncSession = Depends(get_db)):
    logger.info(f"Deleting book with ID: {book_id}")
    deleted_book = await BookService.delete(book_id, db)
    if not deleted_book:
        logger.error(f"Book with ID {book_id} not found or not deleted")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found or not deleted")
    logger.info(f"Deleted book with ID: {deleted_book.book_id}")
    return deleted_book