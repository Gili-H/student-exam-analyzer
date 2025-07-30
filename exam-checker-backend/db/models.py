from sqlalchemy import Column, Integer, String, JSON
from db.database import Base

class ExamModel(Base):
    __tablename__ = "exam_models"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    grade = Column(String)
    subject = Column(String)
    structure = Column(JSON)  # שדה שבו תשמר כל מבנה הבחינה כולל קריטריונים
