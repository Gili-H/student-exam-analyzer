from sqlalchemy import text
from database import engine

def test_database_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("✅ Connected to database! Result:", result.scalar())
    except Exception as e:
        print("❌ Failed to connect to database:", e)

if __name__ == "__main__":
    test_database_connection()
