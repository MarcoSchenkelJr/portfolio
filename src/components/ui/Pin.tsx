import type { CSSProperties } from 'react';
import { m } from 'motion/react';
import { spring } from '../../motion/tokens';

interface PinProps {
  n: number;
  x: number;
  y: number;
  label?: string;
  side?: 'left' | 'right';
  active?: boolean;
  /** atraso da entrada, em segundos */
  delay?: number;
  /** vira <button> ligado a um item da lista */
  interactive?: boolean;
  describedBy?: string;
  onHover?: (on: boolean) => void;
  onSelect?: () => void;
  ringIndex?: number;
  show?: boolean;
}

/** Balão de vista explodida (DESIGN.md §2.5 e §7.8). */
export function Pin({ n, x, y, label, side = 'right', active = false, delay = 0, interactive, describedBy, onHover, onSelect, ringIndex = 0, show = true }: PinProps) {
  const ringStyle = { '--i': ringIndex } as CSSProperties;
  const inner = (
    <>
      <m.span
        className="pin__dot"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={show ? { opacity: 1, scale: active ? 1.35 : 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ scale: { ...spring.bouncy, delay: active ? 0 : delay }, opacity: { duration: 0.2, delay } }}
      >
        <span className="pin__ring" style={ringStyle} aria-hidden="true" />
        <span aria-hidden={interactive ? true : undefined}>{n}</span>
      </m.span>
      {label && (
        <m.span className="pin__label" initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3, delay: delay + 0.1 }}>
          {label}
        </m.span>
      )}
    </>
  );
  const cls = `pin${side === 'left' ? ' pin--left' : ''}`;
  const style = { left: `${x}%`, top: `${y}%` };
  if (interactive) {
    return (
      <button
        type="button"
        className={cls}
        style={style}
        aria-label={`${n}: ${label ?? ''}`.trim()}
        aria-describedby={describedBy}
        onMouseEnter={() => onHover?.(true)}
        onMouseLeave={() => onHover?.(false)}
        onFocus={() => onHover?.(true)}
        onBlur={() => onHover?.(false)}
        onClick={onSelect}
      >
        {inner}
      </button>
    );
  }
  return (
    <span className={cls} style={style} aria-hidden="true">
      {inner}
    </span>
  );
}
