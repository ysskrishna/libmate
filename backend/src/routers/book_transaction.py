from fastapi import APIRouter, Depends
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.core.dbutils import get_db
from src.core.jwtutils import RoleChecker
from src.services.book_transaction import BookTransactionService
from src.models.models import Transaction
from src.models import schemas, enums

import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/checkout", response_model=list[schemas.BookTransactionResponseSchema])
async def checkout_books(transactions: list[schemas.CheckoutRequestSchema], current_user: dict = Depends(RoleChecker([enums.RoleType.ADMIN, enums.RoleType.USER])), db: AsyncSession = Depends(get_db)):
    logger.info("Processing checkout for multiple books")
    checked_out_transactions = await BookTransactionService.checkout_books(transactions, db)
    logger.info(f"Successfully checked out {len(checked_out_transactions)} books")
    return checked_out_transactions


@router.post("/return", response_model=list[schemas.BookTransactionResponseSchema])
async def return_books(transactions: list[schemas.ReturnRequestSchema], current_user: dict = Depends(RoleChecker([enums.RoleType.ADMIN, enums.RoleType.USER])), db: AsyncSession = Depends(get_db)):
    logger.info("Processing return for multiple books")

    if current_user.get('role') == enums.RoleType.USER:
        for transaction in transactions:
            book_transaction = await db.get(Transaction, transaction.transaction_id)
            
            if book_transaction.user_id != current_user.get("id"):
                logger.error(f"User ID mismatch: {book_transaction.user_id} does not match current user {current_user.get('id')}")
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You are not authorized to return these books"
                )

    returned_transactions = await BookTransactionService.return_books(transactions, db)
    logger.info(f"Successfully returned {len(returned_transactions)} books")
    return returned_transactions

@router.get("/user", response_model=list[schemas.UserBooksSchema])
async def get_user_books(status: enums.UserBookFilterStatus, current_user: dict = Depends(RoleChecker([enums.RoleType.USER])), db: AsyncSession = Depends(get_db)):
    logger.info(f"Processing user {current_user.get('id')} books based on status {status}") 
    user_books = await BookTransactionService.get_user_books(status, current_user.get('id'), db) 
    logger.info(f"Successfully fetched {len(user_books)} books for user {current_user.get('id')}")
    return user_books