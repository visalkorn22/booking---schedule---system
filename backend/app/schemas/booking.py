from datetime import datetime
from pydantic import BaseModel


class BookingCreate(BaseModel):
    service_id: str
    staff_id: str
    customer_id: str
    start_time_utc: datetime
    end_time_utc: datetime
    status: str
    payment_status: str
    booking_source: str
    customer_timezone: str


class BookingOut(BookingCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
