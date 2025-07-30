import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import SummarizeIcon from '@mui/icons-material/Summarize';

import type { ParametersByCategory } from '../../types';

interface CustomValidationSectionProps {
    customizeValidation: boolean;
    setCustomizeValidation: (v: boolean) => void;
    selectedParameters: string[];
    setSelectedParameters: React.Dispatch<React.SetStateAction<string[]>>;
    showSummary: boolean;
    setShowSummary: (v: boolean) => void;
    parameters: ParametersByCategory;
  }

const CustomValidationSection: React.FC<CustomValidationSectionProps> = ({
  customizeValidation, setCustomizeValidation, selectedParameters, setSelectedParameters, parameters
}) => (
  <Box sx={{ mb: 2 }}>
    <FormControlLabel
      control={
        <Checkbox
          checked={customizeValidation}
          onChange={e => {
            setCustomizeValidation(e.target.checked);
            if (!e.target.checked) setSelectedParameters([]);
          }}
        />
      }
      label="התאמה אישית של הבדיקה"
      sx={{ mt: 2 }}
    />
    {customizeValidation && (
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TuneIcon color="action" />
          <Typography variant="subtitle1">פרמטרים</Typography>
        </Box>
        {Object.entries(parameters).map(([category, items]) => (
          <Accordion key={category}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {items.map(param => (
                  <FormControlLabel
                    key={param.id}
                    control={
                      <Checkbox
                        checked={selectedParameters.includes(param.id)}
                        onChange={e => {
                          const checked = e.target.checked;
                          setSelectedParameters(prev =>
                            checked
                              ? [...prev, param.id]
                              : prev.filter(id => id !== param.id)
                          );
                        }}
                      />
                    }
                    label={param.label}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
        {selectedParameters.length > 0 && (
          <Box sx={{ mt: 1, p: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
            <Typography variant="body2">
              <SummarizeIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              <strong>פרמטרים נבחרים:</strong>{' '}
              {selectedParameters.map(id => {
                for (const category in parameters) {
                  const found = parameters[category].find(p => p.id === id);
                  if (found) return found.label.split(' – ')[0];
                }
                return id;
              }).join(', ')} ({selectedParameters.length})
            </Typography>
          </Box>
        )}
      </Box>
    )}
  </Box>
);

export default CustomValidationSection;