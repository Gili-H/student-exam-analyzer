import re
from typing import Optional

HEBREW_GRADE_MAP = {
    "א": 1, "ב": 2, "ג": 3, "ד": 4, "ה": 5, "ו": 6,
    "ז": 7, "ח": 8, "ט": 9, "י": 10, "יא": 11, "יב": 12
}

def normalize_grade_text(raw: str) -> str:
    if raw is None:
        return ""
    s = str(raw)

    # הסרת רווחים בקצוות
    s = s.strip()

    # הסרת מילים נפוצות ורעש
    s = re.sub(r"\bכיתה\b", "", s)               # מסיר "כיתה"
    s = re.sub(r"\s+", "", s)                    # מסיר כל רווח
    s = re.sub(r"[-–—]", "", s)                  # מסיר מקפים/דש
    s = re.sub(r"[()\.]", "", s)                 # סוגריים ונקודות

    # הסרת ניקוד (טווח יוניקוד ניקוד עברי)
    s = re.sub(r"[\u0591-\u05C7]", "", s)

    # הסרת סימני כיווניות
    s = re.sub(r"[\u200e\u200f\u202a-\u202e]", "", s)

    # הסרת גרש/גרשיים וסימני ציטוט שונים
    s = s.replace("\u05F3", "")   # geresh ׳
    s = s.replace("\u05F4", "")   # gershayim ״
    s = s.replace('"', "").replace("'", "").replace("’", "").replace("“", "").replace("”", "")

    # איחוד וריאציות של י״א / י״ב שכבר הוסר מהן הגרשיים
    # (אחרי ההסרה זה כבר "יא"/"יב", אבל נשאיר פה לכל מקרה)
    replacements = {
        'יי"א': 'יא',
        'יי"ב': 'יב',
    }

    s = replacements.get(s, s)

    return s

def parse_hebrew_grade(raw: str) -> Optional[int]:
    s = normalize_grade_text(raw)

    # אם זה מספר (למשל "5" או "12") — נחזיר אותו אם בטווח 1–12
    if s.isdigit():
        n = int(s)
        if 1 <= n <= 12:
            return n

    # מיפוי אותיות (כולל "יא"/"יב")
    if s in HEBREW_GRADE_MAP:
        return HEBREW_GRADE_MAP[s]

    # לפעמים כותבים "ה5" או "ה(5)" — נחפש ספרה בתוך הטקסט כמוצא אחרון
    m = re.search(r"\d{1,2}", s)
    if m:
        n = int(m.group())
        if 1 <= n <= 12:
            return n

    return None  # או 0 אם מעדיפים ברירת מחדל מספרית
