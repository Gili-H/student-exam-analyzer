// src/components/AddTestModal.tsx
import React, { useState } from 'react'; 
import type { ChangeEvent, MouseEvent } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material'; // <--- ייבוא טיפוס מ-MUI

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import type { Test, ParametersByCategory, ParameterItem } from '../../types'; // ייבוא ממשקים

// ממשק עבור הפרופסים של AddTestModal
interface AddTestModalProps {
  open: boolean;
  handleClose: () => void;
  onAddTest: (newTest: Test) => void;
}

const style = {
  position: 'absolute' as 'absolute', // Type assertion for position
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', md: 800 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

// קומפוננטת CustomCheckbox עבור סגנון צ'קבוקס קטן יותר
const CustomCheckbox = (props: React.ComponentProps<typeof Checkbox>) => (
  <Checkbox
    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
    checkedIcon={<CheckBoxIcon fontSize="small" />}
    {...props}
  />
);

function AddTestModal({ open, handleClose, onAddTest }: AddTestModalProps) {
  const [testName, setTestName] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [numAssignments, setNumAssignments] = useState<number>(0);
  const [assignmentScores, setAssignmentScores] = useState<{ [key: number]: number }>({});
  const [validateSum, setValidateSum] = useState<boolean>(false);
  const [sumError, setSumError] = useState<boolean>(false);
  const [rigorLevel, setRigorLevel] = useState<Test['rigorLevel']>(''); // שימוש בסוג מתוך Test
  const [customizeValidation, setCustomizeValidation] = useState<boolean>(false);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const parameters: ParametersByCategory = {
    'תוכן ומשמעות': [
      { id: 'relevance', label: 'רלוונטיות התשובה – האם התלמיד ענה לשאלה עצמה?' },
      { id: 'originality', label: 'מקוריות – האם התשובה מועתקת או משקפת חשיבה עצמאית?' },
      { id: 'completeness', label: 'מענה מלא/חלקי – עד כמה התשובה מקיפה את מה שהתבקשה?' },
    ],
    'שפה ודקדוק': [
      { id: 'syntax', label: 'תחביר – משפטים בנויים היטב, ללא שגיאות תחביריות.' },
      { id: 'vocabulary', label: 'אוצר מילים – שימוש במילים מגוונות ומתאימות לרמה.' },
      { id: 'spelling', label: 'איתור – בדיקת שגיאות כתיב.' },
      { id: 'tenses', label: 'שימוש בזמנים נכונים – לדוגמה, past simple במקום present.' },
    ],
    'מבנה וסדר': [
      { id: 'clarity', label: 'בהירות – האם הטקסט ברור ולא מבלבל?' },
      { id: 'paragraphs', label: 'חלוקה לפסקאות – במידת הצורך.' },
      { id: 'structure', label: 'מבנה תשובה – פתיחה, גוף, סיכום (למשימות כתיבה).' },
    ],
  };

  const handleNumAssignmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumAssignments(isNaN(value) ? 0 : value);
    setAssignmentScores({}); // איפוס ניקוד כשמספר העבודות משתנה
  };

  const handleAssignmentScoreChange = (index: number, value: string) => {
    setAssignmentScores((prevScores) => ({
      ...prevScores,
      [index]: parseFloat(value) || 0,
    }));
  };

  const handleValidateSumChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidateSum(e.target.checked);
    if (e.target.checked) {
      calculateSumAndValidate();
    } else {
      setSumError(false);
    }
  };

  const calculateSumAndValidate = (): boolean => {
    if (!validateSum) return true;
    const totalSum = Object.values(assignmentScores).reduce((acc: number, curr: number) => acc + curr, 0);
    const isValid = totalSum === 100;
    setSumError(!isValid);
    return isValid;
  };

  const handleParameterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setSelectedParameters((prevSelected) =>
      checked ? [...prevSelected, id] : prevSelected.filter((paramId) => paramId !== id)
    );
  };

const handleCreateTest = (event: React.FormEvent<HTMLFormElement>) => {    event.preventDefault(); // מניעת רענון דף בטופס
    if (validateSum && !calculateSumAndValidate()) {
      alert('סכום הניקוד חייב להיות 100%');
      return;
    }

    const newTest: Test = { // הגדרת הסוג של newTest
      testName,
      grade,
      subject,
      numAssignments,
      assignmentScores,
      rigorLevel,
      selectedParameters,
    };
    onAddTest(newTest);
    // איפוס טופס
    setTestName('');
    setGrade('');
    setSubject('');
    setNumAssignments(0);
    setAssignmentScores({});
    setValidateSum(false);
    setSumError(false);
    setRigorLevel('');
    setCustomizeValidation(false);
    setSelectedParameters([]);
    setShowSummary(false);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-test-modal-title">
      <Box sx={style} component="form" onSubmit={handleCreateTest}> {/* הוספת component="form" ו-onSubmit */}
        <Typography id="add-test-modal-title" variant="h5" component="h2" sx={{ mb: 3 }}>
          הוסף מבחן חדש
        </Typography>

        {/* Test Details */}
        <TextField
          label="שם המבחן"
          variant="outlined"
          fullWidth
          margin="normal"
          value={testName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTestName(e.target.value)}
          required // שדה חובה
        />
        <TextField
          label="כיתה"
          variant="outlined"
          fullWidth
          margin="normal"
          value={grade}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setGrade(e.target.value)}
          required
        />
        <TextField
          label="מקצוע"
          variant="outlined"
          fullWidth
          margin="normal"
          value={subject}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
          required
        />

        {/* Number of Assignments */}
        <TextField
          label="מספר העבודות"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={numAssignments}
          onChange={handleNumAssignmentsChange}
          inputProps={{ min: 0 }}
          required
        />

        {/* Assignment Scores */}
        <Box sx={{ mt: 2 }}>
          {Array.from({ length: numAssignments }).map((_, index) => (
            <TextField
              key={index}
              label={`ניקוד עבודה מס' ${index + 1}`}
              type="number"
              variant="outlined"
              fullWidth
              margin="dense"
              value={assignmentScores[index] || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleAssignmentScoreChange(index, e.target.value)}
              inputProps={{ min: 0, max: 100 }}
              required
            />
          ))}
          {numAssignments > 0 && (
            <FormControlLabel
              control={<CustomCheckbox checked={validateSum} onChange={handleValidateSumChange} />}
              label="ודא שסכום התשובות הכולל שווה 100%"
              sx={{ mt: 1 }}
            />
          )}
          {sumError && (
            <Typography color="error" variant="caption" display="block">
              סכום הניקוד חייב להיות 100% בדיוק. הסכום הנוכחי הוא:{' '}
              {Object.values(assignmentScores).reduce((acc, curr) => acc + curr, 0)}%
            </Typography>
          )}
        </Box>

        {/* Rigor Level Dropdown */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>בחרי רמת קפדנות</InputLabel>
          <Tooltip
            title="בחרי את רמת הקפדנות הרצויה לבדיקה: גבוהה – בדיקה מדויקת ומחמירה, מתאימה למבחנים רשמיים. בינונית – איזון בין דיוק לבין גמישות. נמוכה – בדיקה סלחנית, מתאימה לתרגול והערכה כללית."
            arrow
          >
            <Select
              value={rigorLevel}
              label="בחרי רמת קפדנות"
              onChange={(e: SelectChangeEvent<Test['rigorLevel']>) => setRigorLevel(e.target.value as Test['rigorLevel'])}
            >
              <MenuItem value="">
                <em>ללא</em>
              </MenuItem>
              <MenuItem value="high">גבוהה (מדויקת מאוד)</MenuItem>
              <MenuItem value="medium">בינונית (מאוזנת)</MenuItem>
              <MenuItem value="low">נמוכה (סלחנית)</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>

        {/* Customization Options */}
        <FormControlLabel
          control={
            <CustomCheckbox
              checked={customizeValidation}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCustomizeValidation(e.target.checked);
                if (!e.target.checked) setSelectedParameters([]);
                setShowSummary(false);
              }}
            />
          }
          label="התאמה אישית של הבדיקה"
          sx={{ mt: 2 }}
        />

        {customizeValidation && (
          <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
            {Object.entries(parameters).map(([category, items]) => (
              <Accordion key={category}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {items.map((param: ParameterItem) => ( // הגדרת הסוג של param
                      <FormControlLabel
                        key={param.id}
                        control={
                          <CustomCheckbox
                            id={param.id}
                            checked={selectedParameters.includes(param.id)}
                            onChange={handleParameterChange}
                          />
                        }
                        label={param.label}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ))}
            <FormControlLabel
              control={
                <CustomCheckbox
                  checked={showSummary}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSummary(e.target.checked)}
                />
              }
              label="✅ הצג סיכום פרמטרים נבחרים"
              sx={{ mt: 2, '& .MuiSvgIcon-root': { fontSize: 20 } }}
            />
            {showSummary && selectedParameters.length > 0 && (
              <Box sx={{ mt: 1, p: 1, bgcolor: 'action.hover', borderRadius: '4px' }}>
                <Typography variant="body2">
                  **פרמטרים נבחרים:**{' '}
                  {selectedParameters
                    .map((id) => {
                      for (const category in parameters) {
                        const found = parameters[category].find((p: ParameterItem) => p.id === id);
                        if (found) return found.label.split(' – ')[0];
                      }
                      return id;
                    })
                    .join(', ')}{' '}
                  ({selectedParameters.length})
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Create Test Button */}
        <Button
          variant="contained"
          sx={{ mt: 4, float: 'left' }}
          type="submit" // הגדרת הכפתור כ-submit
          disabled={validateSum && sumError}
        >
          צור מבנה מבחן
        </Button>
      </Box>
    </Modal>
  );
}

export default AddTestModal;