// src/components/ExamNameField.tsx
import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";

interface ExamNameFieldProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const ExamNameField: React.FC<ExamNameFieldProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="שם מבחן"
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ExamNameField;