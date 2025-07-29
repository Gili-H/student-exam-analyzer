// src/App.tsx
import React from 'react';
import TestTypesPage from './pages/TestTypesPage';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        ניהול מבחנים
      </Typography>
      <TestTypesPage />
    </Container>
  );
}

export default App;