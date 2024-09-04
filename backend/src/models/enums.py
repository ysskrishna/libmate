from enum import Enum


class RoleType(str, Enum):
    ADMIN="admin"
    USER="user"

class BookTransactionStatus(str, Enum):
    CHECKOUT = "CHECKOUT"
    RETURN = "RETURN"

class BookGenre(str, Enum):
    FICTION = "Fiction"
    NON_FICTION = "Non-Fiction"
    MYSTERY = "Mystery"
    FANTASY = "Fantasy"
    SCIENCE_FICTION = "Science Fiction"
    BIOGRAPHY = "Biography"
    HISTORY = "History"
    ROMANCE = "Romance"
    THRILLER = "Thriller"

class UserBookFilterStatus(str, Enum):
    ALL = "all"
    BORROWED = "borrowed"
    RETURNED = "returned"