import type { Metric } from '../../content/types';
import { Reveal } from '../ui/Reveal';
import { CountUp } from '../ui/CountUp';

/** Faixa de 4 métricas; 2×2 no celular (DESIGN.md §4.2, §7.4). */
export function MetricsBand({ items }: { items: Metric[] }) {
  return (
    <div className="wrap">
      <dl className="metrics" aria-label="Números do portfólio" style={{ margin: 'clamp(48px, 6vw, 80px) 0 0' }}>
        {items.map((it, i) => (
          <Reveal key={it.label} className="metric" index={i}>
            <dt className="mono metric__k">{it.label}</dt>
            <dd className="metric__v" style={{ margin: '10px 0 8px' }}>
              {it.countTo ? <CountUp to={it.countTo} /> : it.value}
              {it.unit && <small>{it.unit}</small>}
            </dd>
            <dd className="metric__d" style={{ margin: 0 }}>
              {it.detail}
            </dd>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
