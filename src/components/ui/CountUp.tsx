import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { ease } from '../../motion/tokens';
import { useScrollRoot } from '../../lib/hooks';

/** Conta de 0 até `to` ao entrar na tela; só anima valores >= 10 (DESIGN.md §7.4). */
export function CountUp({ to, durationMs = 1100 }: { to: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const root = useScrollRoot();
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px', root: root ?? undefined });
  const reduced = useReducedMotion();
  const done = useRef(false);
  useEffect(() => {
    if (!inView || done.current || reduced || to < 10) return;
    done.current = true;
    const el = ref.current;
    if (!el) return;
    const c = animate(0, to, {
      duration: durationMs / 1000,
      ease: ease.out,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => c.stop();
  }, [inView, reduced, to, durationMs]);
  return <span ref={ref}>{to}</span>;
}
