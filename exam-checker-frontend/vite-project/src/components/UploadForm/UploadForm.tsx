import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { Box } from '@mui/material';

import { rtlTheme, rtlCache } from './formTheme';
import FileInput from './FileInput';
import UploadStatus from './UploadStatus';
import EvaluationResults from './EvaluationResults';
import { uploadExam } from '../../api/uploadExam'

const UploadForm: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<any[]>([]);
    const [overallScore, setOverallScore] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadStatus('לא נבחר קובץ.');
            return;
        }

        setIsLoading(true);
        setUploadStatus('מעלה קובץ...');

        try {
            const result = await uploadExam(selectedFile, setUploadStatus);
            setQuestions(result.questions || []);
            setOverallScore(result.overall_score || null);
            setUploadStatus('העלאה ובדיקה הושלמו בהצלחה!');
            setSelectedFile(null);
        } catch (err) {
            setUploadStatus(`שגיאה: ${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={rtlTheme}>
                <Box component="form" onSubmit={handleSubmit} dir="rtl" sx={{ p: 4, maxWidth: 500, margin: 'auto' }}>
                    <FileInput
                        selectedFile={selectedFile}
                        onFileChange={setSelectedFile}
                        isLoading={isLoading}
                    />
                    <UploadStatus status={uploadStatus} />
                    <button type="submit" disabled={!selectedFile || isLoading}>שלח</button>
                </Box>

                {questions.length > 0 && (
                    <EvaluationResults questions={questions} overallScore={overallScore} />
                )}
            </ThemeProvider>
        </CacheProvider>
    );
};

export default UploadForm;
