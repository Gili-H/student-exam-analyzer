// src/types.ts

export interface Test {
  testName: string;
  grade: string;
  subject: string;
  numAssignments: number;
  assignmentScores: { [key: number]: number }; // אובייקט עם מפתחות מספריים וערכים מספריים
  rigorLevel: 'high' | 'medium' | 'low' | '';
  selectedParameters: string[];
}

export interface ParameterItem {
  id: string;
  label: string;
}

export interface ParametersByCategory {
  [category: string]: ParameterItem[];
}

export const ALL_PARAMETERS: ParametersByCategory = {
  'תוכן ומשמעות': [
    { id: 'relevance', label: 'רלוונטיות התשובה – האם התלמיד ענה לשאלה עצמה?' },
    { id: 'originality', label: 'מקוריות – האם התשובה מועתקת או משקפת חשיבה עצמאית?' },
    { id: 'completeness', label: 'מענה מלא/חלקי – עד כמה התשובה מקיפה את מה שהתבקשה?' },
  ],
  'שפה ודקדוק': [
    { id: 'syntax', label: 'תחביר – משפטים בנויים היטב, ללא שגיאות תחביריות.' },
    { id: 'vocabulary', label: 'אוצר מילים – שימוש במילים מגוונות ומתאימות לרמה.' },
    { id: 'spelling', label: 'איתור – בדיקת שגיאות כתיב.' },
    { id: 'tenses', label: 'שימוש בזמנים נכונים – לדוגמה, past simple במקום present.' },
  ],
  'מבנה וסדר': [
    { id: 'clarity', label: 'בהירות – האם הטקסט ברור ולא מבלבל?' },
    { id: 'paragraphs', label: 'חלוקה לפסקאות – במידת הצורך.' },
    { id: 'structure', label: 'מבנה תשובה – פתיחה, גוף, סיכום (למשימות כתיבה).' },
  ],
};