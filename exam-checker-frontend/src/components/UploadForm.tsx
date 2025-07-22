import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Input,
} from '@mui/material';

const criteriaList = [
  { value: 'crit1', label: 'קריטריון 1' },
  { value: 'crit2', label: 'קריטריון 2' },
  { value: 'crit3', label: 'קריטריון 3' },
];

const UploadForm: React.FC = () => {
  const [examFile, setExamFile] = useState<File | null>(null);
  const [criteria, setCriteria] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setExamFile(event.target.files[0]);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCriteria((prevCriteria) => [...prevCriteria, value]);
    } else {
      setCriteria((prevCriteria) => prevCriteria.filter((c) => c !== value));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (examFile) {
      console.log('קובץ מבחן נבחר:', examFile.name);
    }
    console.log('קריטריונים שנבחרו:', criteria);
    // כאן תוכלו לקרוא לפונקציית העלאה ל-backend
    // לדוגמה: uploadExamTemplate(examFile);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        direction: 'rtl',
        textAlign: 'right',
      }}
    >
      <Typography variant="h5" gutterBottom>
        העלאת מבחן
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            בחר קובץ מבחן:
          </Typography>
          <Input
            type="file"
            inputProps={{ accept: '.pdf,.doc,.docx', style: { direction: 'rtl' } }}
            onChange={handleFileChange}
            fullWidth
            disableUnderline
          />
          {examFile && (
            <Typography variant="body2" color="primary" mt={1}>
              קובץ נבחר: {examFile.name}
            </Typography>
          )}
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            בחר קריטריונים:
          </Typography>
          <FormGroup sx={{ direction: 'rtl' }}>
            {criteriaList.map((crit) => (
              <FormControlLabel
                key={crit.value}
                control={
                  <Checkbox
                    checked={criteria.includes(crit.value)}
                    onChange={handleCheckboxChange}
                    value={crit.value}
                  />
                }
                label={crit.label}
                sx={{ mr: 0 }}
              />
            ))}
          </FormGroup>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          העלה
        </Button>
      </Box>
    </Box>
  );
};

export default UploadForm;