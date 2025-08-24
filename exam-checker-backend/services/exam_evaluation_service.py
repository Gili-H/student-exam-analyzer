# services/exam_evaluation_service.py
from typing import Dict, Any
from sqlalchemy.orm import Session
from services import exam_model_service
from core.schemas import ExamModelResponse
from fastapi import UploadFile  # יש להוסיף את ספריית FastAPI
from services.ocr_service import extract_text # יש להוסיף את הקובץ שמכיל את פונקציות חילוץ הטקסט
from services.question_splitter import split_questions_and_answers
from services.parse_grade import parse_hebrew_grade

async def process_exam_for_evaluation(
    db: Session, 
    file_content: bytes,  # שינוי: מקבלים את תוכן הקובץ
    filename: str,
    exam_name: str,
    exam_type: str,
    selected_model_id: str
) -> Dict[str, Any]:
    """
    פונקציה זו מקבלת את כל הנתונים הנדרשים מבקשת ה-API.
    """
    
    print("--- נתונים שהתקבלו ---")
    print(f"שם המבחן: {exam_name}")
    print(f"סוג המבחן: {exam_type}")
    print(f"מזהה מודל בדיקה: {selected_model_id}")
    print(f"שם הקובץ: {filename}")
    print("-----------------------")

    # 1. חילוץ הטקסט מהקובץ
    try:
        extracted_text = await extract_text(file_content, filename)
        qa_list = split_questions_and_answers(extracted_text)
    except ValueError as e:
        return {
            "status": "error",
            "message": str(e)
        }

    
    # 2. אחזור נתוני המודל ממאגר הנתונים 
    try:
        model_id_int = int(selected_model_id)
        selected_model = exam_model_service.get_exam_model_by_id(db, model_id_int)
    except (ValueError, TypeError):
        return {
            "status": "error",
            "message": f"Invalid model ID format. Expected an integer, but received '{selected_model_id}'."
        }

    if not selected_model:
        return {
            "status": "error",
            "message": f"Model with ID {selected_model_id} not found."
        }

    # 3. חילוץ ה-JSON structure מהמודל שנמצא
    evaluation_structure = selected_model.structure

    # 4. חילוץ הפרמטרים הנדרשים לפרומפט

    # {selected_parameters}
    selected_parameters = evaluation_structure.get("selectedParameters", [])
   
    # {rigor_text}
    rigor_level = evaluation_structure.get("rigorLevel", "medium")
    rigor_prompts = {
        "low": "Rigor level: Low. Focus on identifying basic knowledge and main points. Any answer showing some understanding should receive full credit.",
        "medium": "Rigor level: Medium. Focus on understanding the main idea of the answer. Minor spelling or phrasing mistakes can be forgiven.",
        "high": "Rigor level: High. Requires precise alignment and perfect phrasing. Even small mistakes will significantly reduce the score."
    }
    rigor_text = rigor_prompts.get(rigor_level, rigor_prompts["medium"])
   
    # {grade}
    grade_letter = selected_model.grade  # לא לעשות strip כאן, הפונקציה כבר מנקה
    grade = parse_hebrew_grade(grade_letter)
    if grade is None:
        grade = 0  # או להחזיר שגיאה/אזהרה

    # {inteded_score_per_question}
    num_assignments = evaluation_structure.get("numAssignments", 1)
    intended_score_per_question = evaluation_structure.get("assignmentScores", "לא צויין")
    if intended_score_per_question == "לא צויין":
        calculated_score = 100 / num_assignments
        intended_score_per_question = [calculated_score] * num_assignments

    # 7. בניית הפרומפט הסופי - חשוב לכלול את הטקסט שחולץ מהקובץ
    print("--- פרמטרים לפרומפט ---")
    print(selected_parameters)
    print(rigor_text)
    print("grade:")
    print(grade)
    print(intended_score_per_question)
    print(qa_list)
    print("----------------------")
    
    # מחזיר אובייקט עם הנתונים שהתקבלו
    return {
        "status": "received",
        "qa_list": qa_list,
        "message": "Data received successfully. Further processing will be handled here.",
        "details": {
            "exam_name": exam_name,
            "exam_type": exam_type,
            "selected_model_id": selected_model_id,
            "extracted_text_length": len(extracted_text),
            "evaluation_structure": evaluation_structure
        }
    }