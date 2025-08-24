import React, { useState } from "react";
import { Box } from "@mui/material";
import ExamCheckTitle from "../components/ExamCheck/ExamCheckTitle";
import ExamCheckForm from "../components/ExamCheck/ExamCheckForm";
import ExamPreview from "../components/ExamCheck/ExamPreview";

const ExamCheckPage: React.FC = () => {
    const [selectedFile] = useState<File | null>(null);
    
    return (
        <Box sx={{ p: 4 }}>
            <ExamCheckTitle />
            <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 4, mt: 4 }}>
                <ExamPreview file={selectedFile} />
                <ExamCheckForm />
            </Box>
        </Box>
    );
};

export default ExamCheckPage;

