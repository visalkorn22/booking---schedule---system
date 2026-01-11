from datetime import datetime
from pydantic import BaseModel, EmailStr

class UserProfileOut(BaseModel):
    full_name: str
    phone: str | None = None
    avatar_url: str | None = None
    timezone: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: str
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime
    profile: UserProfileOut | None = None

    class Config:
        from_attributes = True