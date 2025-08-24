# router.py

from fastapi import APIRouter, UploadFile, Form, File, Depends
from typing import Dict, Any
from sqlalchemy.orm import Session
from services.ocr_service import extract_text
from services.gpt_service import extract_questions
from services.gpt_service import evaluate_exam
from services.exam_evaluation_service import process_exam_for_evaluation
from db.database import get_db # יש לוודא שהפונקציה get_db מיובאת

router = APIRouter()

@router.post("/extract-questions")
async def upload(file: UploadFile, criteria: str = Form(default="[]")):
    text = await extract_text(file)
    questions = extract_questions(text)
    return {"questions": questions}

@router.post("/evaluate-exam")
async def evaluate_exam(
    db: Session = Depends(get_db), # הוספת הזרקת התלות של הסשן
    file: UploadFile = File(...),
    exam_name: str = Form(...),
    exam_type: str = Form(...),
    selected_model_id: str = Form(...)
) -> Dict[str, Any]:
    """
    נקודת קצה לקבלת מבחן לבדיקה והעברת הנתונים לשירות.
    """
    # קריאת תוכן הקובץ
    file_content = await file.read()
    
    # קריאה לפונקציית השירות והעברת הנתונים, כולל סשן ה-db
    evaluation_result = await process_exam_for_evaluation(
        db=db, # העברת סשן ה-db כארגומנט
        file_content=file_content, # העברת התוכן של הקובץ במקום האובייקט
        filename=file.filename,  # העברת שם הקובץ בנפרד
        exam_name=exam_name,
        exam_type=exam_type,
        selected_model_id=selected_model_id
    )
    
    # החזרת התוצאה מהשירות ללקוח
    return evaluation_result