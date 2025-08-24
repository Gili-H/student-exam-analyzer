# services/prompt_builder_service.py
from typing import List, Dict, Any

def build_exam_prompt(
    questions_with_scores: List[Dict[str, Any]],
    selected_parameters: List[str],
    rigor_text: str,
    grade: int
) -> str:
    """
    Builds the exam evaluation prompt to send to the LLM.
    The instructions are in English, but the required JSON keys are in Hebrew.
    """
    return f"""
Please evaluate the attached exam. You must analyze the content and provide a detailed evaluation for each question.

Evaluation data:
• Parameters to check: {selected_parameters}
• Rigor level: {rigor_text}
• Student grade: {grade}

Required output format:
Return a JSON object in the following structure.
⚠️ Important: the JSON keys must be in Hebrew exactly as specified below.

• questions: an array of objects, each object represents a question and must contain:
  - מספר_שאלה
  - נוסח_שאלה
  - נוסח_תשובה_תלמיד
  - ציון_מיועד
  - ציון_סופי
  - הערות

The exam questions and answers (including the intended score) are:
{questions_with_scores}
"""
