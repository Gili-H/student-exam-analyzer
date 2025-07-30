import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  label = "שלח",
}) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={disabled || loading}
    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
    sx={{ mt: 2 }}
    fullWidth
  >
    {label}
  </Button>
);

export default SubmitButton;