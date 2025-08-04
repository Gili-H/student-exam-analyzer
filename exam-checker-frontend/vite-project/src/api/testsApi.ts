// src/api/testsApi.ts

export interface TestData {
  name: string;
  grade?: string;
  subject?: string;
  structure: {
    numAssignments: number;
    assignmentScores: Record<number, number>;
    rigorLevel: string;
    customizeValidation: boolean;
    selectedParameters: string[];
  };
}


const API_BASE = "http://localhost:8000"; // לשנות בהתאם לכתובת השרת

export const createTestModel = async (testData: TestData) => {
  const response = await fetch(`${API_BASE}/models`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(testData),
  });

  if (!response.ok) {
    throw new Error(`שמירת המבחן נכשלה (${response.status})`);
  }

  return response.json();
};

export const getTestModels = async () => {
  const response = await fetch(`${API_BASE}/models`);
  if (!response.ok) {
    throw new Error(`שליפת המבחנים נכשלה (${response.status})`);
  }
  return response.json();
};
