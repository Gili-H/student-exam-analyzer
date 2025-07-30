import React, { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import TestInfoFields from './TestInfoFields';
import AssignmentFields from './AssignmentFields';
import RigorLevelSelector from './RigorLevelSelector';
import CustomValidationSection from './CostomValidationSection';
import SubmitButton from './SubmitButton';

// You may need to adjust these types to match your actual types
import type { ParametersByCategory } from '../../types';

const defaultParameters: ParametersByCategory = {
  // Example structure, replace with your real parameter categories
  'תוכן ומשמעות': [
    { id: 'relevance', label: 'רלוונטיות התשובה – האם התלמיד ענה לשאלה עצמה?' },
    { id: 'originality', label: 'מקוריות – האם התשובה מועתקת או משקפת חשיבה עצמאית?' },
  ],
  'שפה ודקדוק': [
    { id: 'syntax', label: 'תחביר – משפטים בנויים היטב, ללא שגיאות תחביריות.' },
    { id: 'vocabulary', label: 'אוצר מילים – שימוש במילים מגוונות ומתאימות לרמה.' },
  ]
};

interface AddTestModalProps {
  open: boolean;
  onClose: () => void;
  onAddTest?: (data: any) => void; // Adjust 'any' to your actual test data type
}

const AddTestModal: React.FC<AddTestModalProps> = ({
  open,
  onClose,
  onAddTest,
}) => {
  // State for each section
  const [testName, setTestName] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [numAssignments, setNumAssignments] = useState(1);
  const [assignmentScores, setAssignmentScores] = useState<{ [key: number]: number }>({});
  const [rigorLevel, setRigorLevel] = useState('');
  const [customizeValidation, setCustomizeValidation] = useState(false);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [validateSum, setValidateSum] = useState(false);
  const [sumError] = useState(false);

  // Collect and submit all form data
  const handleSubmit = () => {
    const testData = {
      testName,
      grade,
      subject,
      numAssignments,
      assignmentScores,
      rigorLevel,
      customizeValidation,
      selectedParameters,
    };
    if (onAddTest) onAddTest(testData);
    onClose();
    setTestName('');
    setGrade('');
    setSubject('');
    setNumAssignments(0);
    setAssignmentScores({});
    setRigorLevel('');
    setCustomizeValidation(false);
    setSelectedParameters([]);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95vw', sm: 550, md: 700 },
          maxWidth: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 3,
          p: { xs: 3, md: 5 },
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          הוספת מבחן חדש
        </Typography>
        <TestInfoFields
          testName={testName}
          setTestName={setTestName}
          grade={grade}
          setGrade={setGrade}
          subject={subject}
          setSubject={setSubject}
        />
        <AssignmentFields
          numAssignments={numAssignments}
          setNumAssignments={setNumAssignments}
          assignmentScores={assignmentScores}
          setAssignmentScores={setAssignmentScores}
          validateSum={validateSum}
          setValidateSum={setValidateSum}
          sumError={sumError}
        />
        <RigorLevelSelector
          rigorLevel={rigorLevel}
          setRigorLevel={setRigorLevel}
        />
        <CustomValidationSection
          customizeValidation={customizeValidation}
          setCustomizeValidation={setCustomizeValidation}
          selectedParameters={selectedParameters}
          setSelectedParameters={setSelectedParameters}
          showSummary={showSummary}
          setShowSummary={setShowSummary}
          parameters={defaultParameters}
        />
        <SubmitButton onClick={handleSubmit} label="צור מבחן" />
      </Box>
    </Modal>
  );
};

export default AddTestModal;