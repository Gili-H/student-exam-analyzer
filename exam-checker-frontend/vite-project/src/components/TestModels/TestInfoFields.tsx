import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/MenuBook';

interface TestInfoFieldsProps {
  testName: string;
  setTestName: (name: string) => void;
  grade: string;
  setGrade: (grade: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
}

const TestInfoFields: React.FC<TestInfoFieldsProps> = ({
  testName, setTestName, grade, setGrade, subject, setSubject
}) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ClassIcon color="primary" />
      <Typography variant="h6">פרטי מבחן</Typography>
    </Box>
    <TextField
      label="שם המבחן"
      value={testName}
      onChange={e => setTestName(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />
    <TextField
      label="כיתה"
      value={grade}
      onChange={e => setGrade(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />
    <TextField
      label="מקצוע"
      value={subject}
      onChange={e => setSubject(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
      InputProps={{
        startAdornment: <SubjectIcon sx={{ mr: 1 }} />
      }}
    />
  </Box>
);

export default TestInfoFields;