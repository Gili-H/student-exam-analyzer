// src/components/ExamTypeSelector.tsx
import React from "react";
import type { Dispatch, SetStateAction } from "react";
import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from "@mui/material";

interface ExamTypeSelectorProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const ExamTypeSelector: React.FC<ExamTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">סוג בדיקה</FormLabel>
      <RadioGroup
        row
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel value="single" control={<Radio />} label="מבחן בודד" />
        <FormControlLabel value="multiple" control={<Radio />} label="מבחנים מרובים" />
      </RadioGroup>
    </FormControl>
  );
};

export default ExamTypeSelector;