import httpx

try:
    # עקיפת אימות תעודה
    response = httpx.get("https://api.openai.com/v1/models", timeout=10, verify=False)
    print("Success! Got response:", response.status_code)
except httpx.RequestError as e:
    print("Connection error:", e)
