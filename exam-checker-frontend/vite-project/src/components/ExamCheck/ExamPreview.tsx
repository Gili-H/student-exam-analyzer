import { Box, Typography } from "@mui/material";
export default function ExamPreview() {
  return (
    <Box sx={{ border: "1px solid #222", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
      <Typography variant="caption" sx={{ position: "absolute", bottom: 10 }}>
        תצוגה מקדימה
      </Typography>
    </Box>
  );
}