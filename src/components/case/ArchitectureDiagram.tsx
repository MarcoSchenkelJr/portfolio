import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { ease, spring } from '../../motion/tokens';
import { useIsDesktop, useScrollRoot } from '../../lib/hooks';
import { Stage } from '../ui/Stage';

export interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dashed?: boolean;
  accent?: boolean;
}
export interface ArchEdge {
  d: string;
  dashed?: boolean;
}
export interface ArchLayout {
  w: number;
  h: number;
  nodes: ArchNode[];
  edges: ArchEdge[];
}

/** Diagrama de arquitetura: nós em sequência, setas desenhadas e pontos correndo (DESIGN.md §7.9). */
export default function ArchitectureDiagram({ wide, narrow, caption, description }: { wide: ArchLayout; narrow: ArchLayout; caption: string; description: string }) {
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const root = useScrollRoot();
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px', root: root ?? undefined });
  const visible = useInView(ref, { root: root ?? undefined });
  const L = desktop ? wide : narrow;
  const drawStart = L.nodes.length * 0.08 + 0.1;
  const [dots, setDots] = useState(false);
  useEffect(() => {
    if (!seen || reduced) return;
    const t = window.setTimeout(() => setDots(true), (drawStart + 0.8 + L.edges.length * 0.15) * 1000);
    return () => window.clearTimeout(t);
  }, [seen, reduced, drawStart, L.edges.length]);

  return (
    <figure ref={ref} style={{ margin: 0 }}>
      <Stage figure={[caption.split(' · ')[0] + ' · ', caption.split(' · ')[1] ?? '']} padding="none" className="arch">
        <svg viewBox={`0 0 ${L.w} ${L.h}`} role="img" aria-label={description} key={desktop ? 'w' : 'n'}>
          <defs>
            <marker id="arch-seta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#8FA6BD" />
            </marker>
          </defs>
          {L.edges.map((e, i) => (
            <m.path
              key={`e${i}`}
              d={e.d}
              className={`edge${e.dashed ? ' edge--dashed' : ''}`}
              markerEnd="url(#arch-seta)"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={seen || reduced ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ pathLength: { duration: 0.8, ease: ease.inOut, delay: drawStart + i * 0.15 }, opacity: { duration: 0.1, delay: drawStart + i * 0.15 } }}
            />
          ))}
          {L.nodes.map((n, i) => (
            <m.g
              key={n.id}
              className={`node${n.dashed ? ' node--dashed' : ''}${n.accent ? ' node--accent' : ''}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={seen || reduced ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...spring.soft, delay: i * 0.08 }}
            >
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} />
              <text x={n.x + n.w / 2} y={n.y + (n.sub ? n.h / 2 - 4 : n.h / 2 + 5)} textAnchor="middle">
                {n.label}
              </text>
              {n.sub && (
                <text className="sub" x={n.x + n.w / 2} y={n.y + n.h / 2 + 16} textAnchor="middle">
                  {n.sub}
                </text>
              )}
            </m.g>
          ))}
          {!reduced &&
            dots &&
            visible &&
            L.edges.map((e, i) => (
              <circle key={`d${i}`} r={4} className="dot">
                <animateMotion dur="2.4s" repeatCount="indefinite" path={e.d} begin={`${i * 0.4}s`} />
              </circle>
            ))}
        </svg>
      </Stage>
    </figure>
  );
}
