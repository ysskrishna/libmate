from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.models import Transaction, Book
from src.models import schemas, enums
from src.core.dbutils import db_transaction_handler
import logging

logger = logging.getLogger(__name__)


class BookTransactionService:
    
    @staticmethod
    async def checkout_books(transactions: list[schemas.CheckoutRequestSchema], db: AsyncSession):
        async def inner_logic():
            created_transactions = []
            for transaction in transactions:
                # Fetch the book and update available copies
                book = await db.get(Book, transaction.book_id)
                if not book or book.available_copies <= 0:
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Book ID {transaction.book_id} is not available")

                book.available_copies -= 1

                # Create the transaction record
                new_transaction = Transaction(
                    book_id=transaction.book_id,
                    user_id=transaction.user_id,
                    status=enums.BookTransactionStatus.CHECKOUT.value,
                    collected_date=transaction.collected_date,
                    due_date=transaction.due_date,
                )
                db.add(new_transaction)
                await db.flush()  # To generate transaction_id
                created_transactions.append(schemas.BookTransactionResponseSchema.from_orm(new_transaction))

            await db.commit()
            return created_transactions
        
        return await db_transaction_handler(db, inner_logic, error_return=[])
    
    @staticmethod
    async def return_books(transactions: list[schemas.ReturnRequestSchema], db: AsyncSession):
        async def inner_logic():
            updated_transactions = []
            for transaction in transactions:
                # Fetch the transaction and update its status
                existing_transaction = await db.get(Transaction, transaction.transaction_id)
                if not existing_transaction:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Transaction ID {transaction.transaction_id} not found")

                if existing_transaction.status == enums.BookTransactionStatus.RETURN.value:
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Transaction ID {transaction.transaction_id} is already returned")

                 # Fetch the book and update available copies
                book = await db.get(Book, existing_transaction.book_id)
                if not book:
                    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Book ID {existing_transaction.book_id} does not exist")
                book.available_copies += 1

                # Update the transaction
                existing_transaction.status = enums.BookTransactionStatus.RETURN.value
                existing_transaction.return_date = transaction.return_date
                await db.flush()
                
                updated_transactions.append(schemas.BookTransactionResponseSchema.from_orm(existing_transaction))
            
            await db.commit()
            return updated_transactions
        
        return await db_transaction_handler(db, inner_logic, error_return=[])