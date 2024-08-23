import jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from src.core.config import Config
from src.core.dbutils import get_db
from src.models.enums import RoleType
from src.models.models import User, Admin


SECRET_KEY = Config.JWT_SECRET_KEY
ALGORITHM = Config.JWT_ALGORITHM
EXPIRE_MINUTES = Config.JWT_EXPIRE_MINUTES


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, role: RoleType,  expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    
    encoded_jwt = jwt.encode({"sub": data, "exp": expire, "role": role}, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials"
    )
    
    try:
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = decoded_data.get("sub")
        if email is None:
            raise credentials_exception
        role = decoded_data.get("role")
        token_data = {"email": email, "role": role}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    if role == RoleType.ADMIN:
        query = select(Admin).filter(Admin.email == token_data["email"])
    elif role == RoleType.USER:
        query = select(User).filter(User.email == token_data["email"])
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Role not valid")

    result = await db.execute(query)
    user = result.scalars().first()
    if user is None:
        raise credentials_exception
    
    return token_data

class RoleChecker:  
  def __init__(self, allowed_roles):  
    self.allowed_roles = allowed_roles  
  
  def __call__(self, user = Depends(get_current_user)):
    if user.get('role') in self.allowed_roles:  
      return True  
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You don't have enough permissions")