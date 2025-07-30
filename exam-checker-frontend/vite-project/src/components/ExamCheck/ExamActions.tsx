import { Button, Stack } from "@mui/material";
import React from "react";

const ExamActions: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Button variant="outlined" fullWidth>בחר מודל בדיקה</Button>
      <Button variant="outlined" fullWidth>שלח לבדיקה</Button>
    </Stack>
  );
};

export default ExamActions;
