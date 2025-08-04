import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const ExamTypeSelector: React.FC = () => {
  return (
    <FormControl component="fieldset" sx={{ mb: 2 }}>
      <FormLabel component="legend">בחר מבחן</FormLabel>
      <RadioGroup row>
        <FormControlLabel
          value="single"
          control={<Radio />}
          label="מבחן בודד"
        />
        <FormControlLabel
          value="multi"
          control={<Radio />}
          label="מבחנים מרחבים"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ExamTypeSelector;
