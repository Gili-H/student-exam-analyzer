import React from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, Tooltip } from '@mui/material';
import ListIcon from '@mui/icons-material/FormatListNumbered';

interface AssignmentFieldsProps {
  numAssignments: number;
  setNumAssignments: (n: number) => void;
  assignmentScores: { [key: number]: number };
  setAssignmentScores: (scores: { [key: number]: number }) => void;
  validateSum: boolean;
  setValidateSum: (v: boolean) => void;
  sumError: boolean;
}

const AssignmentFields: React.FC<AssignmentFieldsProps> = ({
  numAssignments, setNumAssignments, assignmentScores, setAssignmentScores, validateSum, setValidateSum, sumError
}) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ListIcon color="primary" />
      <Typography variant="h6">משימות</Typography>
    </Box>
    <TextField
      label="מספר משימות"
      type="number"
      value={numAssignments}
      onChange={e => setNumAssignments(Number(e.target.value))}
      fullWidth
      sx={{ mt: 2 }}
      inputProps={{ min: 0 }}
    />
    {Array.from({ length: numAssignments }, (_, i) => (
      <TextField
        key={i}
        label={`ציון משימה ${i + 1}`}
        type="number"
        value={assignmentScores[i] || ''}
        onChange={e => {
          const newScores = { ...assignmentScores, [i]: Number(e.target.value) };
          setAssignmentScores(newScores);
        }}
        fullWidth
        sx={{ mt: 2 }}
      />
    ))}
    <Tooltip title="ודא שסכום המשימות הוא 100">
      <FormControlLabel
        control={
          <Checkbox
            checked={validateSum}
            onChange={e => setValidateSum(e.target.checked)}
          />
        }
        label="חייב סכום משימות = 100"
        sx={{ mt: 2 }}
      />
    </Tooltip>
    {validateSum && sumError && (
      <Typography color="error" sx={{ mt: 1 }}>
        סכום הציונים חייב להיות 100!
      </Typography>
    )}
  </Box>
);

export default AssignmentFields;