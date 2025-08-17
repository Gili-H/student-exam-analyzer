// src/api/examsApi.ts
import axios from 'axios';

const API_BASE = "http://localhost:8000/api";

interface UploadOptions {
    examName: string;
    examType: string;
    selectedModelId: string;
}

export async function uploadExamData(
    file: File,
    setUploadStatus: (status: string) => void,
    options: UploadOptions
) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('exam_name', options.examName);
    formData.append('exam_type', options.examType);
    formData.append('selected_model_id', options.selectedModelId);

    const response = await axios.post(`${API_BASE}/evaluate-exam`, formData, {
        onUploadProgress: (e) => {
            if (e.total) {
                const percent = Math.round((e.loaded * 100) / e.total);
                setUploadStatus(`מעלה קובץ: ${percent}%`);
            }
        },
    });

    return response.data;
}