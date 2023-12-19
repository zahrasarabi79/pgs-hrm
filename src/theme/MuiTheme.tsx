import { FC, ReactNode, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import createCache from '@emotion/cache';
import { createTheme, CssBaseline, ThemeOptions, ThemeProvider } from '@mui/material';
import { palette } from './palette';
import typography from './typography';
import components from './compOverrides';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

export const MuiTheme: FC<{ children: ReactNode }> = ({ children }) => {
  const theme: ThemeOptions = createTheme({
    direction: 'rtl',
    palette,
    typography,
    components,
    shape: {
      borderRadius: 12,
    },
  });

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};
