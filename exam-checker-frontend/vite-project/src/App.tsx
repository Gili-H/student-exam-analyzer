// In App.tsx or another parent component
import React from 'react';
import UploadForm from './components/UploadForm'; // Adjust path if necessary
import { Box, CssBaseline } from '@mui/material'; // Import Box and CssBaseline

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center',     // Centers vertically
        minHeight: '100vh',       // Ensures the container takes full viewport height
        width: '100vw',           // Ensures the container takes full viewport width
        backgroundColor: '#f5f5f5', // Optional: Add a subtle background color
      }}
    >
      <CssBaseline /> {/* Resets browser styles for consistent look */}
      <UploadForm />
    </Box>
  );
};

export default App;