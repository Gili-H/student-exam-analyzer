# create_tables.py
from db.database import Base, engine
from db import models  # חשוב: כאן תוודאי שהנתיב נכון לפי המבנה שלך

def create_tables():
    print("יוצר טבלאות במסד הנתונים...")
    Base.metadata.create_all(bind=engine)
    print("✅ הטבלאות נוצרו בהצלחה!")

if __name__ == "__main__":
    create_tables()
