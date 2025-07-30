import React from "react";
import { Box, Typography } from "@mui/material";

interface ExamPreviewProps {
  file: File | null;
}

const ExamPreview: React.FC<ExamPreviewProps> = ({ file }) => {
  const [fileUrl, setFileUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      // ניקוי ה-URL כשמתחלף או בקומפוננטה unmount
      return () => URL.revokeObjectURL(url);
    } else {
      setFileUrl(null);
    }
  }, [file]);

  return (
    <Box
      sx={{
        border: "1px solid #222",
        width: 300,
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {fileUrl ? (
        <iframe
          src={fileUrl}
          title="Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <Typography variant="body2">לא נבחר קובץ</Typography>
      )}

      <Typography
        variant="caption"
        sx={{ position: "absolute", bottom: 10 }}
      >
        תצוגה מקדימה
      </Typography>
    </Box>
  );
};

export default ExamPreview;
