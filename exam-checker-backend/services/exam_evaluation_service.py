# services/exam_evaluation_service.py
from typing import Dict, Any
from sqlalchemy.orm import Session
from services import exam_model_service
from fastapi import UploadFile
from services.ocr_service import extract_text
from services.question_splitter_service import split_questions_and_answers
from services.parse_grade_service import parse_hebrew_grade
from services.question_mapper_service import build_questions_with_scores
from services.prompt_builder_service import build_exam_prompt
from services.gpt_service import evaluate_exam_with_prompt   # <<< הוספה

async def process_exam_for_evaluation(
    db: Session, 
    file_content: bytes,
    filename: str,
    exam_name: str,
    exam_type: str,
    selected_model_id: str
) -> Dict[str, Any]:

    print("--- נתונים שהתקבלו ---")
    print(f"שם המבחן: {exam_name}")
    print(f"סוג המבחן: {exam_type}")
    print(f"מזהה מודל בדיקה: {selected_model_id}")
    print(f"שם הקובץ: {filename}")
    print("-----------------------")

    # אחזור נתוני המודל
    try:
        model_id_int = int(selected_model_id)
        selected_model = exam_model_service.get_exam_model_by_id(db, model_id_int)
    except (ValueError, TypeError):
        return {"status": "error", "message": f"Invalid model ID '{selected_model_id}'."}

    if not selected_model:
        return {"status": "error", "message": f"Model with ID {selected_model_id} not found."}

    evaluation_structure = selected_model.structure

    # חילוץ שאלות מהקובץ
    try:
        extracted_text = await extract_text(file_content, filename)
        qa_list = split_questions_and_answers(extracted_text)
    except ValueError as e:
        return {"status": "error", "message": str(e)}

    # ציונים מיועדים
    num_assignments = evaluation_structure.get("numAssignments", 1)
    intended_score_per_question = evaluation_structure.get("assignmentScores", "None specified")
    if intended_score_per_question == "None specified":
        calculated_score = 100 / num_assignments
        intended_score_per_question = [calculated_score] * num_assignments

    # בניית שאלות + ציונים
    questions_with_scores = build_questions_with_scores(qa_list, intended_score_per_question)

    # פרמטרים
    selected_parameters = evaluation_structure.get("selectedParameters", [])
    rigor_level = evaluation_structure.get("rigorLevel", "medium")
    rigor_prompts = {
        "low": "Rigor level: Low. Focus on identifying basic knowledge and main points.",
        "medium": "Rigor level: Medium. Focus on understanding the main idea of the answer.",
        "high": "Rigor level: High. Requires precise alignment and perfect phrasing."
    }
    rigor_text = rigor_prompts.get(rigor_level, rigor_prompts["medium"])

    grade_letter = selected_model.grade
    grade = parse_hebrew_grade(grade_letter) or 0

    # --- בניית הפרומפט ושליחה ל־GPT ---
    prompt = build_exam_prompt(questions_with_scores, selected_parameters, rigor_text, grade)
    print("--- Final Prompt ---")
    print(prompt)
    print("--------------------")

    gpt_result = evaluate_exam_with_prompt(
        questions_with_scores,
        selected_parameters,
        rigor_text,
        grade
    )

    # מחזיר את התוצאה הסופית
    return {
        "status": "completed",
        "qa_list": qa_list,
        "evaluation": gpt_result, 
        "details": {
            "exam_name": exam_name,
            "exam_type": exam_type,
            "selected_model_id": selected_model_id,
            "extracted_text_length": len(extracted_text),
            "evaluation_structure": evaluation_structure
        }
    }
