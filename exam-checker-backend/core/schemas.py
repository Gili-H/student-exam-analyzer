from pydantic import BaseModel
from typing import Optional, Dict, Any

class ExamModelCreate(BaseModel):
    name: str
    grade: Optional[str]
    subject: Optional[str]
    structure: Dict[str, Any]

class ExamModelResponse(ExamModelCreate):
    id: int

    class Config:
        orm_mode = True
