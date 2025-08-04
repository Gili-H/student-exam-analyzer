import React from "react";
import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  isLoading: boolean;
}

const ExamPicker: React.FC<Props> = ({ selectedFile, onFileChange, isLoading }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      onFileChange(event.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
        fullWidth
        disabled={isLoading}
        sx={{ mb: 2 }}
      >
        בחר מבחן
        <input
          type="file"
          hidden
          onChange={handleChange}
          accept=".pdf,.doc,.docx,.txt"
        />
      </Button>
      {selectedFile && (
        <Typography variant="body2" sx={{ direction: "rtl" }}>
          נבחר: {selectedFile.name}
        </Typography>
      )}
    </>
  );
};

export default ExamPicker;

