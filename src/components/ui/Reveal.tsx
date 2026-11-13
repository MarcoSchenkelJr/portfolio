import type { CSSProperties, ReactNode } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { ease, spring, stagger } from '../../motion/tokens';
import { useScrollRoot } from '../../lib/hooks';

const tags = {
  div: m.div,
  li: m.li,
  section: m.section,
  header: m.header,
  p: m.p,
  ul: m.ul,
  ol: m.ol,
  article: m.article,
  dl: m.dl,
  figure: m.figure,
};

/** Revelação ao rolar (DESIGN.md §7.3). No máximo 6 passos de atraso. */
export function Reveal({
  as = 'div',
  index = 0,
  y = 20,
  className,
  style,
  children,
  id,
  label,
}: {
  as?: keyof typeof tags;
  index?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const root = useScrollRoot();
  const Comp = tags[as] as typeof m.div;
  const delay = Math.min(index, 6) * stagger.base;
  return (
    <Comp
      id={id}
      className={className}
      style={style}
      aria-label={label}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px', root: root ?? undefined }}
      transition={reduced ? { duration: 0.2 } : { y: { ...spring.soft, delay }, opacity: { duration: 0.6, ease: ease.out, delay } }}
    >
      {children}
    </Comp>
  );
}
