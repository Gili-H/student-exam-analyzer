import { useState, useEffect } from 'react';
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
import { getTestModels } from '../api/testsApi';

function TestTypesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchTests = async () => {
    try {
      const data = await getTestModels();
      setTests(data);
    } catch (error) {
      console.error('שגיאה בטעינת מודלים:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTest = async () => {
    await fetchTests(); // ריענון הרשימה אחרי שמירה
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, mt: 2, p: 2 }} dir="rtl">
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
            <AddCircleOutlineIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
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

          {loading ? (
            <Typography variant="body2" color="text.secondary">טוען...</Typography>
          ) : tests.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              עדיין אין מודלי מבחנים. לחץ על "הוסף מבחן" כדי ליצור אחד.
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {tests.map((test) => (
                <Card key={test.id} variant="outlined" sx={{ bgcolor: '#ffffff' }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {test.name}
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
