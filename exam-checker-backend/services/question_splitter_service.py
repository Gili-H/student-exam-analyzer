import re
from typing import List, Dict

def split_questions_and_answers(extracted_text: str) -> List[Dict[str, str]]:
    """
    מקבל טקסט שחולץ (OCR) ומחזיר רשימה של אובייקטים עם שאלה ותשובה.
    מזהה שאלות שמתחילות במספר ונקודה, ותשובות עד לשאלה הבאה או לסוף הקובץ.
    """
    # תבנית: תופס שאלה (מספר. טקסט) + התשובה עד השאלה הבאה או סוף הטקסט
    pattern = re.compile(r'(\d+\.\s[^\n]+)(.*?)(?=\n\d+\.|\Z)', re.S)

    matches = pattern.findall(extracted_text)

    result = []
    for q, a in matches:
        cleaned_answer = (
            a.replace("_", "")    # מסיר קווים תחתיים
             .replace("\n", " ")  # שוברי שורה לרווח
             .strip()
        )
        result.append({
            "question": q.strip(),
            "answer": cleaned_answer
        })
    return result
