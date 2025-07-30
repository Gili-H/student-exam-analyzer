
from sqlalchemy.orm import Session
from db.models import ExamModel
from core.schemas import ExamModelCreate

def create_exam_model(db: Session, exam_model: ExamModelCreate):
    db_model = ExamModel(**exam_model.dict())
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model

def get_exam_models(db: Session):
    return db.query(ExamModel).all()

def get_exam_model_by_id(db: Session, model_id: int):
    return db.query(ExamModel).filter(ExamModel.id == model_id).first()
