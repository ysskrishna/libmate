from pydantic import BaseModel

class LoginSchema(BaseModel):
    email: str
    password: str


class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    name: str
    role: str