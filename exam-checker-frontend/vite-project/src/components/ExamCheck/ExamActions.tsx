// src/components/ExamActions.tsx
import React, { useState } from "react";
import { Button, Stack, Menu, MenuItem } from "@mui/material";
import { getTestModels } from "../../api/testsApi";
import type { TestData } from "../../api/testsApi";

const ExamActions: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<TestData | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [models, setModels] = useState<TestData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    if (models.length === 0) {
      setLoading(true);
      try {
        const data = await getTestModels();
        setModels(data);
      } catch (err: any) {
        setError("שגיאה בטעינת המודלים");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModelSelect = (model: TestData) => {
    setSelectedModel(model);
    handleMenuClose();
    console.log("נבחר מודל:", model.name, "עם ID:", model.id);
  };

  return (
    <Stack spacing={2}>
      {/* כפתור לפתיחת התפריט */}
      <Button
        variant="outlined"
        fullWidth
        onClick={handleMenuClick}
        aria-controls={isMenuOpen ? 'models-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
      >
        {selectedModel ? selectedModel.name : "בחר מודל בדיקה"}
      </Button>

      {/* תפריט המודלים */}
      <Menu
        id="models-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // הגדרת רוחב התפריט כרוחב הכפתור
        PaperProps={{
          style: {
            width: anchorEl ? anchorEl.clientWidth : undefined,
          },
        }}
      >
        {loading ? (
          <MenuItem disabled>טוען...</MenuItem>
        ) : error ? (
          <MenuItem disabled>{error}</MenuItem>
        ) : (
          models.map((model) => (
            <MenuItem key={model.id} onClick={() => handleModelSelect(model)}>
              {model.name}
            </MenuItem>
          ))
        )}
      </Menu>

      <Button
        variant="contained"
        fullWidth
        disabled={!selectedModel}
      >
        שלח לבדיקה
      </Button>
    </Stack>
  );
};

export default ExamActions;