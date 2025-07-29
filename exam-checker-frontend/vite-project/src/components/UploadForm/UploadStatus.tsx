import React from 'react';
import { Typography } from '@mui/material';

const UploadStatus: React.FC<{ status: string }> = ({ status }) => {
    if (!status) return null;
    return (
        <Typography sx={{ mt: 2, color: status.includes('הצלחה') ? 'green' : 'red' }}>
            {status}
        </Typography>
    );
};

export default UploadStatus;
