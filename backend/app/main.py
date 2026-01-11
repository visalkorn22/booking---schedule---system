from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth, services, bookings

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(services.router, prefix="/api/v1/services", tags=["services"])
app.include_router(bookings.router, prefix="/api/v1/bookings", tags=["bookings"])

@app.get("/health")
def health():
    return {"status": "ok"}