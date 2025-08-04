from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import router
from api import exam_model_routes
from db.database import Base, engine
from db import models  # חשוב כדי ש-SQLAlchemy יטען את המודלים

app = FastAPI()

allowed_origins = [
    "http://localhost",
    "http://localhost:3000",  # Common for Create React App
    "http://localhost:5173",  # This is the origin your React app is actually using
    "http://127.0.0.1:5173",  # Sometimes 127.0.0.1 is used instead of localhost
    # Add any other specific origins where your client might be hosted in development
]

app.add_middleware(
    CORSMiddleware,
    # Set the specific allowed origins
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"], # Allows all headers from the client
)
# חיבור ה־router שמוגדר ב־api/endpoints.py
app.include_router(router, prefix="/api")
app.include_router(exam_model_routes.router)



Base.metadata.create_all(bind=engine)
