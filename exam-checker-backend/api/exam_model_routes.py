from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services import exam_model_service
from core.schemas import ExamModelCreate, ExamModelResponse
from typing import List

router = APIRouter(prefix="/models", tags=["Exam Models"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ExamModelResponse)
def create_model(model: ExamModelCreate, db: Session = Depends(get_db)):
    return exam_model_service.create_exam_model(db, model)

@router.get("/", response_model=List[ExamModelResponse])
def list_models(db: Session = Depends(get_db)):
    return exam_model_service.get_exam_models(db)
