// src/components/ExamCheckForm.tsx
import React, { useState } from "react";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import ExamNameField from "./ExamNameField";
import ExamTypeSelector from "./ExamTypeSelector";
import ExamPicker from "./ExamPicker";
import { uploadExamData } from "../../api/examsApi"; // וודא שהייבוא נכון
import type { TestData } from "../../api/testsApi";
import ExamActions from "./ExamActions";

interface ExamCheckFormProps {
  // onFileChange ו-selectedFile כבר לא נחוצים כאן
}

const ExamCheckForm: React.FC<ExamCheckFormProps> = () => {
  const [examName, setExamName] = useState<string>("");
  const [examType, setExamType] = useState<string>("single"); // 'single' or 'multiple'
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<TestData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSendForCheck = async () => {
    if (!examName || !selectedFile || !selectedModel || !selectedModel.id) {
      setUploadError("אנא מלא את כל השדות הנדרשים (שם, קובץ, ומודל בדיקה).");
      return;
    }
    
    setIsLoading(true);
    setUploadError(null);
    setUploadStatus("מעלה קובץ...");

    try {
      const response = await uploadExamData(selectedFile, setUploadStatus, {
        examName,
        examType,
        selectedModelId: selectedModel.id, 
      });

      console.log("העלאה הסתיימה בהצלחה:", response);
      setUploadStatus("העלאה הושלמה!");
    } catch (err: any) {
      console.error("שגיאה בהעלאה:", err);
      setUploadStatus("העלאה נכשלה.");
      setUploadError(err.message || "העלאת הקובץ נכשלה.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minWidth: 320,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ExamNameField value={examName} onChange={setExamName} />
      <ExamTypeSelector value={examType} onChange={setExamType} />
      <ExamPicker onFileChange={setSelectedFile} selectedFile={selectedFile} isLoading={isLoading}
 />
      <ExamActions onModelSelect={setSelectedModel} selectedModel={selectedModel} />

      {uploadError && <Alert severity="error">{uploadError}</Alert>}
      {isLoading && <CircularProgress size={24} />}
      {uploadStatus && <Alert severity="info">{uploadStatus}</Alert>}

      <Button
        variant="contained"
        fullWidth
        disabled={!examName || !selectedFile || !selectedModel || isLoading}
        onClick={handleSendForCheck}
      >
        שלח לבדיקה
      </Button>
    </Box>
  );
};

export default ExamCheckForm;