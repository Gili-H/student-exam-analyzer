import React from "react";
import { Button, Stack } from "@mui/material";

const ExamActions: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Button variant="contained" fullWidth>צרף קובץ</Button>
      <Button variant="outlined" fullWidth>בחר מודל בדיקה</Button>
      <Button variant="outlined" fullWidth>שלח לבדיקה</Button>
    </Stack>
  );
};

export default ExamActions;
