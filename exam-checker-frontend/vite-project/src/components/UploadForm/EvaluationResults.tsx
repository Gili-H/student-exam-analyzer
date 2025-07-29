import React from 'react';
import { Typography, Box } from '@mui/material';

interface Question {
    question_number: number;
    score: number;
    accuracy: number;
    clarity: number;
    relevance: number;
    comment: string;
}

const EvaluationResults: React.FC<{ questions: Question[], overallScore: number | null }> = ({ questions, overallScore }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" align="center">
                תוצאות הבדיקה (ציון כולל: {overallScore ?? 'N/A'})
            </Typography>
            <ul>
                {questions.map((q) => (
                    <li key={q.question_number}>
                        <strong>שאלה {q.question_number}</strong>: ציון כולל: {q.score} | דיוק: {q.accuracy} | בהירות: {q.clarity} | היענות: {q.relevance}
                        <br />הערה: {q.comment}
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default EvaluationResults;
