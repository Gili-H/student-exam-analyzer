from dotenv import load_dotenv
import os
import openai
from httpx import Client, Timeout, Limits # ייבוא נוסף: Client, Timeout, Limits מ-httpx
from services.prompt_builder_service import build_exam_prompt  # <--- הוספנו ייבוא
import json

load_dotenv()

api_key = os.environ.get("OPENAI_API_KEY")

# --- התחלת שינוי: הגדרת לקוח HTTPX מותאם לעקיפת בדיקת SSL ---
try:
    custom_http_client = Client(
        verify=False,  # <--- זה הדגל שמעקף את בדיקת SSL
        timeout=Timeout(timeout=30.0), # ניתן להתאים את הזמן הקצוב אם יש צורך
        limits=Limits(max_connections=10), # הגבלת חיבורים אם רלוונטי
    )
    # יצירת לקוח OpenAI עם לקוח ה-HTTP המותאם
    client = openai.OpenAI(api_key=api_key, http_client=custom_http_client)
except Exception as e:
    # הדפסת שגיאה אם יש בעיה באתחול הלקוח
    raise ValueError(f"Failed to initialize OpenAI client. Error: {e}")
# --- סוף שינוי ---

def evaluate_exam_with_prompt(
    questions_with_scores,
    selected_parameters,
    rigor_text,
    grade
) -> dict:
    """
    Build the exam prompt (via prompt_builder_service) and send it to GPT.
    """
    # בניית הפרומפט
    prompt = build_exam_prompt(
        questions_with_scores=questions_with_scores,
        selected_parameters=selected_parameters,
        rigor_text=rigor_text,
        grade=grade
    )

    print("--- Final Prompt ---")
    print(prompt)

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # אפשר לשנות למודל אחר
            messages=[
                {"role": "system", "content": "אתה בודק מבחנים באנגלית. הפלט חייב להיות JSON חוקי בעברית."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1500,
            temperature=0
        )

        content = response.choices[0].message.content
        print("GPT Response:", content)

        return json.loads(content)

    except Exception as e:
        print(f"שגיאה בעת שליחת הבקשה ל-GPT: {e}")
        return {"error": str(e)}

