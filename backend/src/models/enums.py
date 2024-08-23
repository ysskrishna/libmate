from enum import Enum


class RoleType(str, Enum):
    ADMIN="admin"
    USER="user"

class BookTransactionType(str, Enum):
    CHECKOUT = "CHECKOUT"
    RETURN = "RETURN"

class BookGenre(Enum):
    FICTION = "Fiction"
    NON_FICTION = "Non-Fiction"
    MYSTERY = "Mystery"
    FANTASY = "Fantasy"
    SCIENCE_FICTION = "Science Fiction"
    BIOGRAPHY = "Biography"
    HISTORY = "History"
    ROMANCE = "Romance"
    THRILLER = "Thriller"