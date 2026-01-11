from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_db, require_role
from app.models.service import Service
from app.models.user import User
from app.schemas.service import ServiceCreate, ServiceOut

router = APIRouter()

@router.post("/", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_role("admin")),
):
    svc = Service(
        admin_id=current_admin.id,
        **payload.dict(),
    )
    db.add(svc)
    db.commit()
    db.refresh(svc)
    return svc

@router.get("/", response_model=list[ServiceOut])
def list_services(
    db: Session = Depends(get_db),
    _: User = Depends(require_role("admin")),
):
    return db.query(Service).all()