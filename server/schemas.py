from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    full_name: str
    password: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: int
    full_name: str

    class Config:
        orm_mode = True
