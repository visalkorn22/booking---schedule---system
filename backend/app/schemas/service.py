from datetime import datetime
from pydantic import BaseModel

class ServiceCreate(BaseModel):
    name: str
    description: str | None = None
    duration_minutes: int
    price: float
    deposit_amount: float
    buffer_minutes: int
    max_capacity: int
    is_active: bool = True

class ServiceOut(ServiceCreate):
    id: str
    admin_id: str
    created_at: datetime

    class Config:
        from_attributes = True