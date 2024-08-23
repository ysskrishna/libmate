from enum import Enum


class RoleType(str, Enum):
    ADMIN="admin"
    USER="user"

class BookTransactionType(str, Enum):
    CHECKOUT = "CHECKOUT"
    RETURN = "RETURN"