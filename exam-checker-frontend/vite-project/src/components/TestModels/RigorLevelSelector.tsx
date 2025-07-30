import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import RuleIcon from '@mui/icons-material/Gavel';

interface RigorLevelSelectorProps {
  rigorLevel: string;
  setRigorLevel: (level: string) => void;
}

const RigorLevelSelector: React.FC<RigorLevelSelectorProps> = ({
  rigorLevel, setRigorLevel
}) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <RuleIcon color="primary" />
      <Typography variant="h6">רמת קפדנות</Typography>
    </Box>
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel>רמת קפדנות</InputLabel>
      <Select
        value={rigorLevel}
        onChange={e => setRigorLevel(e.target.value)}
        label="רמת קפדנות"
      >
        <MenuItem value=""><em>ללא</em></MenuItem>
        <MenuItem value="high">גבוהה (מדויקת מאוד)</MenuItem>
        <MenuItem value="medium">בינונית (מאוזנת)</MenuItem>
        <MenuItem value="low">נמוכה (סלחנית)</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default RigorLevelSelector;