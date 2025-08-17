// src/components/ExamActions.tsx
import React from "react";
import { Button, Stack, Menu, MenuItem } from "@mui/material";
import { getTestModels } from "../../api/testsApi";
import type { TestData } from "../../api/testsApi";

interface ExamActionsProps {
  selectedModel: TestData | null;
  onModelSelect: (model: TestData) => void;
}

const ExamActions: React.FC<ExamActionsProps> = ({ selectedModel, onModelSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [models, setModels] = React.useState<TestData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

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
    onModelSelect(model); // קריאה לפונקציית ה-prop מהאב
    handleMenuClose();
    console.log("נבחר מודל:", model.name, "עם ID:", model.id);
  };

  return (
    <Stack spacing={2}>
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

      <Menu
        id="models-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
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
    </Stack>
  );
};

export default ExamActions;