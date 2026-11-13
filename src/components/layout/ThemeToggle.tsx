import { AnimatePresence, m } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme';
import { nav } from '../../content/site';
import { spring } from '../../motion/tokens';

/** Alterna data-theme, grava localStorage["tema"] (DESIGN.md §2.1, §7.9). */
export function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const dark = theme === 'dark';
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-pressed={dark} aria-label={dark ? nav.themeToLight : nav.themeToDark} title={dark ? nav.themeToLight : nav.themeToDark}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={theme}
          style={{ display: 'grid' }}
          initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
          transition={spring.snappy}
        >
          {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
