// src/components/TestModelList.tsx
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { getTestModels } from "../../api/testsApi";
import type { TestData } from "../../api/testsApi";

interface TestModelListProps {
  onSelectModel: (modelId: string) => void;
  selectedModelId: string | null;
}

const TestModelList: React.FC<TestModelListProps> = ({
  onSelectModel,
  selectedModelId,
}) => {
  const [models, setModels] = useState<TestData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await getTestModels();
        setModels(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">שגיאה: {error}</Typography>;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="test-model-select-label">בחר מודל בדיקה</InputLabel>
      <Select
        labelId="test-model-select-label"
        value={selectedModelId || ""}
        label="בחר מודל בדיקה"
        onChange={(e) => onSelectModel(e.target.value as string)}
      >
        {models.map((model) => (
          <MenuItem key={model.id} value={model.id}>
            {model.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TestModelList;