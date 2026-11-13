import { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { X } from 'lucide-react';
import { nav } from '../../content/site';
import { spring, stagger } from '../../motion/tokens';
import { useFocusTrap } from '../../lib/focus';

/** Folha que desce do topo com os 5 links e "Falar comigo" (DESIGN.md §4.1). */
export function MobileMenu({ open, onClose, items, active }: { open: boolean; onClose: () => void; items: { id: string; label: string; n: string }[]; active: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    ref.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div key="scrim" className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose} />
          <m.div
            key="menu"
            ref={ref}
            id="menu-celular"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={spring.sheet}
          >
            <div className="mobile-menu__top">
              <span className="mono" style={{ color: 'var(--ink-3)' }}>Menu</span>
              <button type="button" className="icon-btn" onClick={onClose} aria-label={nav.menuClose}>
                <X aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Seções">
              <ul>
                {items.map((i, k) => (
                  <m.li key={i.id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring.snappy, delay: 0.05 + k * stagger.tight }}>
                    <a href={`#${i.id}`} onClick={onClose} aria-current={active === i.id ? 'true' : undefined}>
                      <span className="n">{i.n}</span>
                      {i.label}
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <a className="btn btn--primary" style={{ width: '100%' }} href="#contato" onClick={onClose}>
              {nav.cta}
            </a>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
