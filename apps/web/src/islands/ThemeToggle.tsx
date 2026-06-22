import * as React from 'react';
import { useStore } from '@nanostores/react';
import { persistentAtom } from '@nanostores/persistent';
import { Moon, Sun } from 'lucide-react';

export type Theme = 'dark' | 'light';

export const $theme = persistentAtom<Theme>('toolorbit:theme', 'dark');

function applyTheme(theme: Theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export default function ThemeToggle() {
  const theme = useStore($theme);

  // Keep the DOM attribute in sync whenever the store changes (covers both
  // user clicks and the persisted value loading in on mount).
  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => $theme.set(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-base-300 transition-colors hover:bg-base-800 hover:text-base-50"
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
