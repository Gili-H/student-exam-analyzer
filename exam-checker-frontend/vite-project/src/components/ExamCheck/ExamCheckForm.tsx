import { Box } from "@mui/material";
import ExamNameField from "./ExamNameField";
import ExamTypeSelector from "./ExamTypeSelector";
import ExamPicker from "./ExamPicker";
import ExamActions from "./ExamActions";

export default function ExamCheckForm() {
  return (
    <Box sx={{ minWidth: 320, maxWidth: 400, display: "flex", flexDirection: "column", gap: 2 }}>
      <ExamNameField />
      <ExamTypeSelector />
      <ExamPicker />
      <ExamActions />
    </Box>
  );
}