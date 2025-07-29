import os
from dotenv import load_dotenv
from openai import OpenAI  # תיקון כאן

os.environ['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

load_dotenv()
api_key = os.environ.get('OPENAI_API_KEY')

if not api_key:
    raise ValueError("API key not found in environment variables.")

client = OpenAI(api_key=api_key)  # תיקון כאן

def evaluate_answer(question, answer, criteria):
    prompt = (
        f"Evaluate the following answer based on these criteria: {', '.join(criteria)}.\n\n"
        f"Question: {question}\n"
        f"Student Answer: {answer}\n\n"
        "Provide a score (out of 100) and detailed feedback for each criterion. "
        "Also, suggest corrections where necessary. Format the output clearly."
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an AI assistant that evaluates student answers to English exams. Provide concise and helpful feedback."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    feedback = evaluate_answer(
        "What is the capital of France?",
        "Paris is the capital city of France.",
        ["Accuracy", "Clarity", "Completeness"]
    )
    print("\n--- Evaluation Feedback ---")
    print(feedback)
