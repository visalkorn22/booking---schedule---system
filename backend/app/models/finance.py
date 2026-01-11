import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    booking_id = Column(UUID(as_uuid=True), ForeignKey("bookings.id"), nullable=False)
    provider = Column(String(50), nullable=False)
    provider_reference = Column(String(255), nullable=False)
    amount = Column(Numeric, nullable=False)
    currency = Column(String(10), nullable=False)
    status = Column(String(30), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Refund(Base):
    __tablename__ = "refunds"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    payment_id = Column(UUID(as_uuid=True), ForeignKey("payments.id"), nullable=False)
    amount = Column(Numeric, nullable=False)
    reason = Column(Text)
    provider_refund_id = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
