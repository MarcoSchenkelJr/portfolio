import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';
const listeners = new Set<() => void>();

const read = (): Theme => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

export function setTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t);
  try {
    localStorage.setItem('tema', t);
  } catch {
    /* armazenamento indisponível: o tema vale só nesta visita */
  }
  listeners.forEach((l) => l());
}

export function useTheme(): [Theme, () => void] {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => 'light' as Theme,
  );
  const toggle = useCallback(() => setTheme(read() === 'dark' ? 'light' : 'dark'), []);
  return [theme, toggle];
}
