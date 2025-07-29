import axios from 'axios';

export async function uploadExam(file: File, setUploadStatus: (status: string) => void) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('http://localhost:8000/api/evaluate-exam', formData, {
        onUploadProgress: (e) => {
            if (e.total) {
                const percent = Math.round((e.loaded * 100) / e.total);
                setUploadStatus(`מעלה קובץ: ${percent}%`);
            }
        },
    });

    return response.data;
}
