import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

export const rtlCache = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

export const rtlTheme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Arial',
    },
});
