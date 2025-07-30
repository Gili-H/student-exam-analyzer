import { Button, Stack } from "@mui/material";
export default function ExamActions() {
  return (
    <Stack spacing={2}>
      <Button variant="contained" fullWidth>צרף קובץ</Button>
      <Button variant="outlined" fullWidth>בחר מודל בדיקה</Button>
      <Button variant="outlined" fullWidth>שלח לבדיקה</Button>
    </Stack>
  );
}