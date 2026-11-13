import { useRef, type KeyboardEvent } from 'react';
import { m } from 'motion/react';
import { spring } from '../../motion/tokens';

export interface SegOption<T extends string> {
  value: T;
  label: string;
  count?: number;
  id?: string;
  controls?: string;
}

/** Controle segmentado com pílula deslizante (DESIGN.md §5.2). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  layoutId,
  as = 'toggle',
  tone = 'default',
  size = 'md',
  scroll = false,
  className = '',
}: {
  options: readonly SegOption<T>[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
  layoutId: string;
  as?: 'tabs' | 'toggle';
  tone?: 'default' | 'stage';
  size?: 'md' | 'sm';
  scroll?: boolean;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    if (as !== 'tabs') return;
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % options.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + options.length) % options.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = options.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  };
  const cls = ['seg', tone === 'stage' ? 'seg--stage' : '', size === 'sm' ? 'seg--sm' : '', scroll ? 'seg--scroll' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} role={as === 'tabs' ? 'tablist' : 'group'} aria-label={ariaLabel}>
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={o.id}
            type="button"
            className="seg__btn"
            role={as === 'tabs' ? 'tab' : undefined}
            aria-selected={as === 'tabs' ? on : undefined}
            aria-controls={as === 'tabs' ? o.controls : undefined}
            aria-pressed={as === 'toggle' ? on : undefined}
            tabIndex={as === 'tabs' ? (on ? 0 : -1) : undefined}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {on && <m.span layoutId={layoutId} className="seg__thumb" transition={spring.snappy} aria-hidden="true" />}
            {o.label}
            {o.count !== undefined && <sup>{o.count}</sup>}
          </button>
        );
      })}
    </div>
  );
}
