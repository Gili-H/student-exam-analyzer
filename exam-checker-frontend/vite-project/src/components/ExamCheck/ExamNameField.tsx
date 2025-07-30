import { TextField } from "@mui/material";
export default function ExamNameField() {
  return (
    <TextField
      label="שם בדיקה"
      variant="standard"
      fullWidth
      sx={{ mb: 2 }}
      InputProps={{ style: { textAlign: "right" } }}
    />
  );
}