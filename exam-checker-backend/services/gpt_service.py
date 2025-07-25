from dotenv import load_dotenv
import os
import openai

load_dotenv()

api_key = os.environ.get("OPENAI_API_KEY")

client = openai.OpenAI(api_key=api_key)

def evaluate_answer(question: str, answer: str, criteria: list[str]) -> str:
    prompt = (
        f"Evaluate the following answer based on these criteria: {', '.join(criteria)}.\n\n"
        f"Question: {question}\n"
        f"Student Answer: {answer}\n\n"
        "Provide a score (out of 100) and detailed feedback for each criterion. "
        "Also, suggest corrections where necessary. Format the output clearly."
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI assistant that evaluates student answers to English exams. Provide concise and helpful feedback."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=500,
        temperature=0.7
    )

    return response.choices[0].message.content

def extract_questions(text: str) -> list[str]:
    prompt = (
        "The following text contains an exam. Extract all the questions/instructions only, "
        "one per line, exactly as they appear:\n\n"
        f"{text}"
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You extract exam questions from text."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000,
        temperature=0
    )

    return response.choices[0].message.content.strip().splitlines()
