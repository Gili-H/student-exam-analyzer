from fastapi import APIRouter, UploadFile, Form
from services.ocr_service import extract_text
from services.gpt_service import extract_questions

router = APIRouter()

@router.post("/extract-questions")
async def upload(file: UploadFile, criteria: str = Form(default="[]")):
    text = await extract_text(file)
    questions = extract_questions(text)
    return {"questions": questions}
