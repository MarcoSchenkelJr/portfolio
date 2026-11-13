import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { ease } from '../../motion/tokens';
import { Reveal } from '../ui/Reveal';

/** Linha de cota com batentes e rótulo "02 · Projetos" (DESIGN.md §2.5, §7.3). */
export function Cota({ n, label }: { n: string; label: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="mono cota">
      <span className="cota__a" aria-hidden="true" />
      <Reveal as="p" y={8}>
        <b>{n}</b> · {label}
      </Reveal>
      <m.span
        className="cota__b"
        aria-hidden="true"
        initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.9, ease: ease.out }}
      />
    </div>
  );
}

/** Seção numerada da home: Cota + h2 + lead. `tone="muted"` usa --surface-2 e título menor. */
export function Section({
  id,
  n,
  label,
  title,
  lead,
  tone = 'default',
  head,
  children,
  className = '',
}: {
  id: string;
  n: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'default' | 'muted';
  /** substitui o cabeçalho padrão (o Laboratório põe a caixa de crédito ao lado) */
  head?: (h: ReactNode) => ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const h = (
    <div className="sec-head">
      <Cota n={n} label={label} />
      <Reveal>
        <h2 id={`${id}-titulo`} className={tone === 'muted' ? 'h3-lg' : undefined}>
          {title}
        </h2>
        {lead && <p className="sec-head__lead">{lead}</p>}
      </Reveal>
    </div>
  );
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`section below-fold ${tone === 'muted' ? 'section--muted' : ''} ${className}`}>
      <div className="wrap">
        {head ? head(h) : h}
        {children}
      </div>
    </section>
  );
}
