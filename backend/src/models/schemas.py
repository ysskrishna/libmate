from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from src.models import enums

class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str


class TokenResponseSchema(BaseModel):
    access_token: str
    name: str
    role: str


class BookBase(BaseModel):
    title: str
    author: str
    description: Optional[str] = None
    genre: Optional[enums.BookGenre] = None
    publish_date: Optional[date] = None
    total_copies: int
    available_copies: int

    class Config:
        use_enum_values = True

class UpdateBookRequestSchema(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    genre: Optional[enums.BookGenre] = None
    publish_date: Optional[date] = None
    number_of_copies: Optional[int] = None
    available_number_of_copies: Optional[int] = None

class BookResponseSchema(BookBase):
    book_id: int

    class Config:
        orm_mode = True