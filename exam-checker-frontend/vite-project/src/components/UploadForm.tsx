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
    // TextField is not used in the final form, so it can be removed if not needed elsewhere
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Fixed: Ensure @mui/icons-material is installed
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create RTL cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

// Create RTL theme
// Removed 'Direction' import as it's an internal type and not directly importable.
// 'rtl' as const is used for strict type assertion, or simply 'rtl' works too.
const theme = createTheme({
    direction: 'rtl', // Fixed: Directly use 'rtl' as a string literal
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
                    marginRight: '8px', // Adjust margin for RTL checkboxes
                },
            },
        },
    },
});

const UploadForm: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            console.log('Selected File:', selectedFile.name);
        } else {
            console.log('No file selected');
        }
        console.log('Selected Criteria:', selectedCriteria);
        // Here you would typically send the file and criteria to your backend
        alert('Form submitted! Check console for details.');
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
                        maxWidth: '500px', // This width is crucial for 'margin: auto' to work
                        margin: '40px auto', // This centers it horizontally
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
                        >
                            בחר קובץ
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                // Limiting to PDF and DOCX for common test files, adjust as needed
                                accept=".pdf,.doc,.docx,.txt"
                            />
                        </Button>
                        {selectedFile && (
                            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                קובץ נבחר: {selectedFile.name}
                            </Typography>
                        )}
                        {!selectedFile && (
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
                        disabled={!selectedFile} // Disable button if no file is selected
                        sx={{ alignSelf: 'center', mt: 3 }}
                    >
                        שלח
                    </Button>
                </Box>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default UploadForm;