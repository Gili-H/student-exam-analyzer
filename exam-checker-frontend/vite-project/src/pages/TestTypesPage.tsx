import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import AddTestModal from '../components/TestModels/AddTestModal';
import type { Test, ParameterItem } from '../types';
import { ALL_PARAMETERS } from '../types';
import { red } from '@mui/material/colors';

function TestTypesPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tests, setTests] = useState<Test[]>([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddTest = (newTest: Test) => {
    setTests((prevTests) => [...prevTests, newTest]);
    handleCloseModal();
  };

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
    for (const category in ALL_PARAMETERS) {
      const categoryItems: ParameterItem[] = ALL_PARAMETERS[category];
      const found = categoryItems.find((p) => p.id === id);
      if (found) return found.label.split(' – ')[0];
    }
    return id;
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column', 
      gap: 5, mt: 2, p: 2
    }} dir="rtl">
      <Typography sx={{ fontSize: 70 }} variant="h4" align="center" gutterBottom fontWeight="bold">
        הגדרות בדיקה
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          mt: 4,
          justifyContent: 'center',
        }}
      >
        {/* יצירת מבחן חדש */}
        <Paper
          elevation={4}
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: '#e3f2fd',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 350,
            maxWidth: { xs: '100%', md: 700 },
            width: '100%',
            mx: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, mt: 2 }}>
            {/* Icon */}
            <AddCircleOutlineIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
            {/* or <LibraryBooksIcon ... /> for the other box */}
            {/* Title */}
            <Typography variant="h6" gutterBottom>
              יצירת מבחן חדש
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{ mt: 3 }}
            startIcon={<AssignmentIcon />}
          >
            הוסף מבחן
          </Button>
        </Paper>

        {/* מודלי מבחנים קיימים */}
        <Paper
          elevation={4}
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: '#f1f8e9',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 350,
            maxWidth: { xs: '100%', md: 700 },
            width: '100%',
            mx: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, mt: 2 }}>
            <LibraryBooksIcon sx={{ fontSize: 40, color: '#558b2f', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              מודלי המבחנים הקיימים:
            </Typography>
          </Box>

          {tests.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              עדיין אין מודלי מבחנים. לחץ על "הוסף מבחן" כדי ליצור אחד.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tests.map((test, index) => (
                <Card key={index} variant="outlined" sx={{ bgcolor: '#ffffff' }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {test.testName}
                    </Typography>
                    <Typography variant="body2">כיתה {test.grade} - {test.subject}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      {/* מודאל */}
      <AddTestModal
        open={openModal}
        onClose={handleCloseModal}
        onAddTest={handleAddTest}
      />
    </Box>
  );
}

export default TestTypesPage;
