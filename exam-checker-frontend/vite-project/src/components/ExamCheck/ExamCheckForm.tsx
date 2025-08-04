import React from "react";
import { Box } from "@mui/material";
import ExamNameField from "./ExamNameField";
import ExamTypeSelector from "./ExamTypeSelector";
import ExamPicker from "./ExamPicker";
import ExamActions from "./ExamActions";

interface ExamCheckFormProps {
  onFileChange: (file: File | null) => void;
  selectedFile: File | null;
}

const ExamCheckForm: React.FC<ExamCheckFormProps> = ({ onFileChange, selectedFile }) => {
  const [isLoading] = React.useState(false);

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
      <ExamNameField />
      <ExamTypeSelector />
      <ExamPicker
        onFileChange={onFileChange}
        isLoading={isLoading}
        selectedFile={selectedFile}
      />
      <ExamActions />
    </Box>
  );
};

export default ExamCheckForm;
