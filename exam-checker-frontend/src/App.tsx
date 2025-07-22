import React from 'react';
// ייבוא קומפוננטות MUI
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// ייבוא עבור RTL
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// ייבוא קומפוננטת UploadForm
import UploadForm from './components/UploadForm';

// יצירת ה-cache עבור RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// יצירת התמה (Theme) עם כיווניות RTL
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  return (
    // עוטפים את כל תוכן האפליקציה ב-CacheProvider ו-ThemeProvider
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* לאיפוס CSS בסיסי */}
        {/* כאן יבואו כל שאר הקומפוננטות שלך */}
        <div>
          <h1>ברוכים הבאים לאפליקציה שלי!</h1>
          {/* לדוגמה, קומפוננטת UploadForm מהשאלה הקודמת */}
          <UploadForm />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;