import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import os

# נתיב לקובץ ההפעלה של Tesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

poppler_path = r'C:\Program Files\poppler-24.08.0\Library\bin'  # עדכן בהתאם למחשב שלך
import tempfile

async def extract_text(file) -> str:
    """Detect file type and extract text accordingly."""
    filename = file.filename.lower()

    # שמירת הקובץ לקובץ זמני
    with tempfile.NamedTemporaryFile(delete=False, suffix=filename[-4:]) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    if filename.endswith('.pdf'):
        return extract_text_from_pdf(tmp_path)
    elif filename.endswith(('.png', '.jpg', '.jpeg')):
        return extract_text_from_image(tmp_path)
    else:
        raise ValueError("Unsupported file type")


def extract_text_from_image(image_path: str) -> str:
    """Extract text from an image file."""
    img = Image.open(image_path)
    text = pytesseract.image_to_string(img)
    return text

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from a PDF file."""
    full_text = []
    pages = convert_from_path(pdf_path, poppler_path=poppler_path)

    for i, page in enumerate(pages):
        page_text = pytesseract.image_to_string(page)
        full_text.append(page_text)

    return "\n".join(full_text)
