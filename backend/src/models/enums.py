from enum import Enum


class BookTransactionType(str, Enum):
    CHECKOUT = "CHECKOUT"
    RETURN = "RETURN"