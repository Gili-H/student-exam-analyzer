import React from "react";
import { TextField } from "@mui/material";

const ExamNameField: React.FC = () => {
    return (
        <TextField
            label="שם בדיקה"
            variant="standard"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ style: { textAlign: "right" } }}
        />
    );
};

export default ExamNameField;
