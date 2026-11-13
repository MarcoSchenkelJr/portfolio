import type { CSSProperties, ReactNode } from 'react';
import { m } from 'motion/react';
import { spring } from '../../motion/tokens';

/** Palco azul com malha de desenho técnico e legenda "fig. NN · …" (DESIGN.md §2.5). */
export function Stage({
  figure,
  layoutId,
  padding = 'md',
  className = '',
  style,
  children,
  label,
  tools,
  as = 'div',
}: {
  figure?: [string, string, string?] | readonly string[];
  layoutId?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  label?: string;
  tools?: ReactNode;
  as?: 'div' | 'figure';
}) {
  const Comp = as === 'figure' ? m.figure : m.div;
  return (
    <Comp
      layoutId={layoutId}
      transition={layoutId ? { layout: spring.soft } : undefined}
      className={`stage ${padding === 'none' ? '' : `stage--${padding}`} ${className}`}
      style={{ margin: 0, ...style }}
      role={label ? 'group' : undefined}
      aria-label={label}
    >
      {figure && (
        <span className="mono stage__tag" aria-hidden={label ? true : undefined}>
          {figure[0]}
          <b>{figure[1]}</b>
          {figure[2] ?? ''}
        </span>
      )}
      {tools && <div className="stage__tools">{tools}</div>}
      {children}
    </Comp>
  );
}

export function BrowserFrame({ label, children, className = '', style }: { label: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`frame ${className}`} style={style}>
      <div className="frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </div>
      <div className="frame__shot">{children}</div>
    </div>
  );
}

export function DeviceFrame({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`device ${className}`} style={style}>
      <div className="device__screen">{children}</div>
    </div>
  );
}
