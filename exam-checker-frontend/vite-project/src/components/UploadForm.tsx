import React, { useState } from 'react';
import {
    Button,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import axios from 'axios'; 

// Create RTL cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

// Create RTL theme
const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            'Segoe UI',
        ].join(','),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: '8px',
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '4px',
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginLeft: '0',
                    marginRight: '8px',
                },
            },
        },
    },
});

const UploadForm: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
    const [uploadStatus, setUploadStatus] = useState<string>(''); // <--- סטייט חדש לסטטוס העלאה
    const [isLoading, setIsLoading] = useState<boolean>(false); // <--- סטייט חדש למצב טעינה

    // הגדר את ה-URL של נקודת הקצה בשרת שלך
    const UPLOAD_URL = 'http://localhost:5000/upload'; 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setUploadStatus(''); // איפוס סטטוס בהחלפת קובץ
        } else {
            setSelectedFile(null);
        }
    };

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCriteria((prev) => [...prev, value]);
        } else {
            setSelectedCriteria((prev) => prev.filter((criteria) => criteria !== value));
        }
    };

    const handleSubmit = async (event: React.FormEvent) => { // <--- הפונקציה הפכה ל-async
        event.preventDefault();

        if (!selectedFile) {
            setUploadStatus('לא נבחר קובץ. אנא בחר/י קובץ.');
            return;
        }

        setIsLoading(true); // התחל מצב טעינה
        setUploadStatus('מעלה קובץ...');

        // יצירת אובייקט FormData
        const formData = new FormData();
        formData.append('file', selectedFile); // 'file' - שם השדה שהשרת יצפה לו
        formData.append('criteria', JSON.stringify(selectedCriteria)); // שליחת קריטריונים כמחרוזת JSON

        try {
            // שליחת הבקשה באמצעות Axios
            const response = await axios.post(UPLOAD_URL, formData, {
                headers: {
                    // Axios מגדיר אוטומטית את Content-Type ל-multipart/form-data
                    // אין צורך להגדיר כאן: 'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadStatus(`מעלה קובץ: ${percentCompleted}%`);
                    }
                },
            });

            // טיפול בתשובה מהשרת
            console.log('Server Response:', response.data);
            setUploadStatus(`העלאה בוצעה בהצלחה! תגובת שרת: ${response.data.message || JSON.stringify(response.data)}`);
            setSelectedFile(null); // איפוס בחירת הקובץ
            setSelectedCriteria([]); // איפוס בחירת קריטריונים
        } catch (error) {
            // טיפול בשגיאות
            if (axios.isAxiosError(error)) {
                setUploadStatus(`שגיאת העלאה: ${error.response?.data?.message || error.message}`);
                console.error('Upload error:', error.response?.data || error);
            } else {
                setUploadStatus(`אירעה שגיאה בלתי צפויה: ${error}`);
                console.error('Unexpected error:', error);
            }
        } finally {
            setIsLoading(false); // סיים מצב טעינה
        }
    };

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <Box
                    dir="rtl"
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        p: 4,
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        maxWidth: '500px',
                        margin: '40px auto',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#fff',
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom align="center">
                        טופס העלאת קבצים
                    </Typography>

                    {/* File Input */}
                    <FormControl fullWidth>
                        <FormLabel component="legend" sx={{ mb: 1 }}>
                            בחר קובץ (למבחן)
                        </FormLabel>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{ width: 'fit-content' }}
                            disabled={isLoading} // <--- השבתה בזמן טעינה
                        >
                            בחר קובץ
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.txt"
                            />
                        </Button>
                        {selectedFile && (
                            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                קובץ נבחר: {selectedFile.name}
                            </Typography>
                        )}
                        {/* שינוי הודעת השגיאה לפי הסטטוס החדש */}
                        {!selectedFile && !uploadStatus.includes('מעלה') && (
                             <Typography variant="body2" sx={{ mt: 1, color: 'error.main' }}>
                                לא נבחר קובץ. אנא בחר קובץ.
                            </Typography>
                        )}
                    </FormControl>

                    {/* Criteria Checkboxes */}
                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">בחר קריטריונים:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.includes('criteria1')}
                                        onChange={handleCriteriaChange}
                                        value="criteria1"
                                        disabled={isLoading} // <--- השבתה בזמן טעינה
                                    />
                                }
                                label="קריטריון 1"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.includes('criteria2')}
                                        onChange={handleCriteriaChange}
                                        value="criteria2"
                                        disabled={isLoading} // <--- השבתה בזמן טעינה
                                    />
                                }
                                label="קריטריון 2"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedCriteria.includes('criteria3')}
                                        onChange={handleCriteriaChange}
                                        value="criteria3"
                                        disabled={isLoading} // <--- השבתה בזמן טעינה
                                    />
                                }
                                label="קריטריון 3"
                            />
                        </FormGroup>
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!selectedFile || isLoading} // <--- השבתה אם אין קובץ או בזמן טעינה
                        sx={{ alignSelf: 'center', mt: 3 }}
                    >
                        {isLoading ? 'שולח...' : 'שלח'} {/* <--- שינוי טקסט הכפתור בזמן טעינה */}
                    </Button>

                    {/* <--- הצגת סטטוס ההעלאה כאן */}
                    {uploadStatus && (
                        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: uploadStatus.includes('הצלחה') ? 'success.main' : 'error.main' }}>
                            {uploadStatus}
                        </Typography>
                    )}
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default UploadForm;