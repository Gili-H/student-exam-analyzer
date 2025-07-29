from dotenv import load_dotenv
import os
import openai
from httpx import Client, Timeout, Limits # ייבוא נוסף: Client, Timeout, Limits מ-httpx

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


def evaluate_answer(question: str, answer: str, criteria: list[str]) -> str:
    prompt = (
        f"Evaluate the following answer based on these criteria: {', '.join(criteria)}.\n\n"
        f"Question: {question}\n"
        f"Student Answer: {answer}\n\n"
        "Provide a score (out of 100) and detailed feedback for each criterion. "
        "Also, suggest corrections where necessary. Format the output clearly."
    )

    try: # הוספת בלוק try-except לטיפול בשגיאות
        response = client.chat.completions.create(
            model="gpt-4", # השארתי gpt-4 כפי שהיה בקוד המקורי שלך. אם תרצה gpt-4o-mini, שנה כאן
            messages=[
                {"role": "system", "content": "You are an AI assistant that evaluates student answers to English exams. Provide concise and helpful feedback."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7
        )
        return response.choices[0].message.content
    except openai.APIStatusError as e:
        print(f"Error calling OpenAI API (Status {e.status_code}): {e.response}")
        return f"An API error occurred during evaluation: Status {e.status_code}, Response: {e.response}"
    except openai.APIConnectionError as e:
        print(f"OpenAI API connection error: {e}")
        return f"An API connection error occurred during evaluation: {e}"
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return f"An unexpected error occurred during evaluation: {e}"


def extract_questions(text: str) -> list[str]:
    prompt = (
        "The following text contains an exam. Extract all the questions/instructions only, "
        "one per line, exactly as they appear:\n\n"
        f"{text}"
    )

    try: # הוספת בלוק try-except גם כאן
        response = client.chat.completions.create(
            model="gpt-4", # השארתי gpt-4 כפי שהיה בקוד המקורי שלך
            messages=[
                {"role": "system", "content": "You extract exam questions from text."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0
        )
        return response.choices[0].message.content.strip().splitlines()
    except openai.APIStatusError as e:
        print(f"Error calling OpenAI API (Status {e.status_code}): {e.response}")
        return [f"An API error occurred during extraction: Status {e.status_code}, Response: {e.response}"]
    except openai.APIConnectionError as e:
        print(f"OpenAI API connection error during extraction: {e}")
        return [f"An API connection error occurred during extraction: {e}"]
    except Exception as e:
        print(f"An unexpected error occurred during extraction: {e}")
        return [f"An unexpected error occurred during extraction: {e}"]


def evaluate_exam(text: str, student_name: str = "לא צוין") -> dict:
    print(f"Text length received by evaluate_exam: {len(text)} characters")
    try:
        current_dir = os.path.dirname(__file__)  # הנתיב של gpt_service.py
        prompt_path = os.path.join(current_dir, "..", "prompts", "exam_prompt.txt")
        # קריאה מהקובץ
        with open(prompt_path, "r", encoding="utf-8") as f:
            template = f.read()

        # הכנסת הנתונים הרלוונטיים
        prompt = template.format(student_name=student_name, text=text)
        print("הפרומפט שנשלח ל-GPT:\n", prompt)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "אתה עוזר בודק מבחנים באנגלית. הפלט חייב להיות JSON תקני בלבד."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.3
        )

        import json
        print(f"Response from GPT: {response.choices[0].message.content}")  # הדפסת התגובה לצורך ניפוי שגיאות
        return json.loads(response.choices[0].message.content)

    except Exception as e:
        print(f"שגיאה בעת שליחת הבקשה ל-GPT: {e}")
        return {"error": str(e)}
