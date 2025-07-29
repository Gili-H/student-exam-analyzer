from dotenv import load_dotenv
import os
import openai
from httpx import Client, Timeout, Limits

# --- טעינת משתני הסביבה מקובץ .env ---
load_dotenv()

# --- קבלת מפתח ה-API ---
api_key = os.environ.get('OPENAI_API_KEY')

# --- יצירת לקוח מותאם לעקיפת בדיקת תעודה ---
try:
    custom_http_client = Client(
        verify=False,  # עקיפת בדיקת SSL
        timeout=Timeout(timeout=30.0),
        limits=Limits(max_connections=10),
    )
    client = openai.OpenAI(api_key=api_key, http_client=custom_http_client)
except Exception as e:
    raise ValueError(f"Failed to initialize OpenAI client. Error: {e}")


def evaluate_answer(question, answer, criteria):
    """
    שולח שאלה ותשובה למודל GPT-4 להערכה על בסיס קריטריונים נתונים.
    מחזיר את הפידבק מהמודל.
    """
    if not api_key:
        raise ValueError("OpenAI API key not set. Please ensure OPENAI_API_KEY is configured in your .env file.")

    prompt = (
        f"Evaluate the following answer based on these criteria: {', '.join(criteria)}.\n\n"
        f"Question: {question}\n"
        f"Student Answer: {answer}\n\n"
        "Provide a score (out of 100) and detailed feedback for each criterion. "
        "Also, suggest corrections where necessary. Format the output clearly."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
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


# --- דוגמה לשימוש ---
if __name__ == "__main__":
    question_example = "What is the capital of France?"
    answer_example = "Paris is the capital city of France."
    criteria_example = ["Accuracy", "Clarity", "Completeness"]

    print("Attempting to evaluate answer...")
    feedback = evaluate_answer(question_example, answer_example, criteria_example)

    print("\n--- Evaluation Feedback ---")
    print(feedback)
    print("---------------------------\n")

    if "An error occurred during evaluation" in feedback:
        print("Evaluation failed. Please check the error message above. 👆")
    else:
        print("Evaluation completed successfully! ✅")
