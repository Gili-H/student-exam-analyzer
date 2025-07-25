import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os

# נתיב לקובץ ההפעלה של Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# הגדרת נתיב ל-Poppler (רק אם לא הוגדר במשתני הסביבה)
# אם התקנת את Poppler ב-Windows למשל, ייתכן שתצטרכי להוסיף את הנתיב לכאן:
poppler_path = r'C:\Program Files\poppler-24.08.0\Library\bin' # שנה/י את הנתיב לפי המיקום אצלך

def extract_text_from_image(image_path):
    """מחזירה טקסט מתמונה."""
    try:
        img = Image.open(image_path)
        text = pytesseract.image_to_string(img)
        return text
    except Exception as e:
        print(f"שגיאה בעיבוד תמונה {image_path}: {e}")
        return ""

def extract_text_from_pdf(pdf_path):
    """מחזירה טקסט מקובץ PDF."""
    full_text = []
    try:
        # המרת כל עמוד ב-PDF לתמונה
        # שימי לב להוסיף את poppler_path אם הוא לא מוגדר במשתני הסביבה
        pages = convert_from_path(pdf_path, poppler_path=poppler_path)

        for i, page in enumerate(pages):
            print(f"מעבד עמוד {i+1} מתוך {len(pages)} ב-PDF...")
            # ניתן לשמור את העמוד כתמונה זמנית אם יש צורך בניפוי באגים
            # page.save(f'page_{i}.png', 'PNG')
            text = pytesseract.image_to_string(page)
            full_text.append(f"--- עמוד {i+1} ---\n{text}")
        return "\n".join(full_text)
    except Exception as e:
        print(f"שגיאה בעיבוד PDF {pdf_path}: {e}")
        return ""

# --- שימוש בפונקציות ---

# דוגמה לעיבוד תמונה
image_file = "sample_answer.png"
if os.path.exists(image_file):
    print(f"--- מעבד תמונה: {image_file} ---")
    image_text = extract_text_from_image(image_file)
    # print(image_text)
else:
    print(f"קובץ תמונה {image_file} לא נמצא.")

print("\n" + "="*50 + "\n")

# דוגמה לעיבוד PDF
pdf_file = "sample.pdf" # צרי/החליפי בקובץ PDF אמיתי שלך
if os.path.exists(pdf_file):
    print(f"--- מעבד PDF: {pdf_file} ---")
    pdf_text = extract_text_from_pdf(pdf_file)
    print(pdf_text)
else:
    print(f"קובץ PDF {pdf_file} לא נמצא. ודא/י שיצרת קובץ כזה.")