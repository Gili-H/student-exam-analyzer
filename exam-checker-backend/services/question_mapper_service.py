# services/question_mapper_service.py
from typing import List, Dict, Union

def build_questions_with_scores(
    qa_list: List[Dict[str, str]],
    score_mapping: Union[List[int], Dict[str, int]]
) -> List[Dict[str, Union[int, str]]]:
    questions = []
    for idx, qa in enumerate(qa_list):
        if isinstance(score_mapping, dict):
            intended_score = score_mapping.get(str(idx), 0)
        elif isinstance(score_mapping, list) and idx < len(score_mapping):
            intended_score = score_mapping[idx]
        else:
            intended_score = 0

        questions.append({
            "question_num": idx + 1,
            "question_text": qa.get("question", ""),
            "student_answer": qa.get("answer", ""),
            "intended_score": intended_score,
        })

    return questions
