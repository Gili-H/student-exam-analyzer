from fastapi import APIRouter, UploadFile, Form
from services.ocr_service import extract_text
from services.gpt_service import extract_questions
from services.gpt_service import evaluate_exam
import logging

router = APIRouter()

@router.post("/extract-questions")
async def upload(file: UploadFile, criteria: str = Form(default="[]")):
    text = await extract_text(file)
    questions = extract_questions(text)
    return {"questions": questions}


@router.post("/evaluate-exam")
async def upload(file: UploadFile, student_name: str = Form(default="לא צוין")):
    text = await extract_text(file)
    print(f"Extracted text: {text[:100]}...")  # הדפסת 100 התווים הראשונים של הטקסט
    result = evaluate_exam(text, student_name)
    return result
