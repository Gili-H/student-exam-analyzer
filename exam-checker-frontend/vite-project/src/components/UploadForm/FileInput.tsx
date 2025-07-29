import React from 'react';
import { Button, Typography, FormLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    isLoading: boolean;
}

const FileInput: React.FC<Props> = ({ selectedFile, onFileChange, isLoading }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            onFileChange(event.target.files[0]);
        } else {
            onFileChange(null);
        }
    };

    return (
        <>
            <FormLabel>בחר קובץ</FormLabel>
            <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={isLoading}
            >
                העלה קובץ
                <input type="file" hidden onChange={handleChange} accept=".pdf,.doc,.docx,.txt" />
            </Button>
            {selectedFile && <Typography>נבחר: {selectedFile.name}</Typography>}
        </>
    );
};

export default FileInput;
