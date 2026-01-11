from sqlalchemy.orm import declarative_base

Base = declarative_base()

# Import all models so Base.metadata includes every table
from app import models  # noqa: F401,E402