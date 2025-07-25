from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import router

app = FastAPI()

# הגדרת CORS - חשוב מאוד לפיתוח
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # מאפשר הכל לצורך פיתוח. בהפקה, הגבילי!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# חיבור ה־router שמוגדר ב־api/endpoints.py
app.include_router(router, prefix="/api")
