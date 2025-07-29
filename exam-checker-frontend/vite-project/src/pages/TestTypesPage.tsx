// src/components/TestTypesPage.tsx
import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  Paper,
  List, // נשאיר למקרה שתרצה להשתמש בה שוב, אך כרגע פחות בשימוש ישיר לתצוגת המבחנים
  ListItem, // כנ"ל
  ListItemText, // כנ"ל
  Card, // ייבוא Card
  CardContent, // ייבוא CardContent
  CardActions, // ייבוא CardActions (אם תרצה כפתורים על הכרטיס)
} from '@mui/material';
import AddTestModal from '../components/TestModels/AddTestModal';
import type { Test, ParametersByCategory, ParameterItem } from '../types'; // ייבוא ממשק Test
import { ALL_PARAMETERS } from '../types';

function TestTypesPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]); // הגדרת הסוג של המערך

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddTest = (newTest: Test) => {
    setTests((prevTests) => [...prevTests, newTest]);
    handleCloseModal();
  };

  // פונקציה עזר להמרת רמת קפדנות לטקסט קריא
  const getRigorLevelText = (level: Test['rigorLevel']): string => {
    switch (level) {
      case 'high':
        return 'גבוהה (מדויקת מאוד)';
      case 'medium':
        return 'בינונית (מאוזנת)';
      case 'low':
        return 'נמוכה (סלחנית)';
      default:
        return 'לא צוין';
    }
  };

    const getParameterShortLabel = (id: string): string => {
    for (const category in ALL_PARAMETERS) { // השתמש ב-ALL_PARAMETERS
      // הטיפוס של category הוא string, אבל TypeScript יודע ש-ALL_PARAMETERS
      // הוא מסוג ParametersByCategory ולכן הגישה בטוחה יותר.
      const categoryItems: ParameterItem[] = ALL_PARAMETERS[category]; // הגדר במפורש את הטיפוס
      const found = categoryItems.find((p) => p.id === id);
      if (found) return found.label.split(' – ')[0];
    }
    return id;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h2">
          מודלי המבחנים
        </Typography>
        <Button variant="contained" onClick={handleOpenModal}>
          הוסף מבחן
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        {tests.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            עדיין אין מודלי מבחנים. לחץ על "הוסף מבחן" כדי ליצור אחד.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(auto-fill, minmax(280px, 1fr))',
                md: 'repeat(auto-fill, minmax(320px, 1fr))',
              },
              gap: 3,
            }}
          >
            {tests.map((test, index) => (
              <Card key={index} elevation={2} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {test.testName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    **כיתה:** {test.grade}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    **מקצוע:** {test.subject}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    **מספר עבודות:** {test.numAssignments}
                  </Typography>
                  {test.rigorLevel && (
                    <Typography variant="body2" color="text.secondary">
                      **רמת קפדנות:** {getRigorLevelText(test.rigorLevel)}
                    </Typography>
                  )}
                  {test.selectedParameters.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" component="span">
                        **פרמטרים נבחרים:**{' '}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {test.selectedParameters.map(getParameterShortLabel).join(', ')}{' '}
                        ({test.selectedParameters.length})
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Paper>

      <AddTestModal open={openModal} handleClose={handleCloseModal} onAddTest={handleAddTest} />
    </Box>
  );
}

export default TestTypesPage;