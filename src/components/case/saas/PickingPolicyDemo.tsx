import { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { pickingDemo } from '../../../content/cases/wms-saas';
import { spring } from '../../../motion/tokens';
import { SegmentedControl } from '../../ui/SegmentedControl';

type Policy = (typeof pickingDemo.policies)[number]['value'];
const fmt = (iso: string) => iso.split('-').reverse().join('/');

/** "Qual pallet sai primeiro?" — FIFO, FEFO e LIFO reordenam a lista (DESIGN.md §6.3). */
export default function PickingPolicyDemo() {
  const [policy, setPolicy] = useState<Policy>('FIFO');
  const reduced = useReducedMotion();
  const sorted = [...pickingDemo.pallets].sort((a, b) =>
    policy === 'FIFO' ? a.entrada.localeCompare(b.entrada) : policy === 'FEFO' ? a.validade.localeCompare(b.validade) : b.entrada.localeCompare(a.entrada),
  );
  const caption = pickingDemo.policies.find((p) => p.value === policy)!.caption;
  return (
    <div className="picking">
      <h3 className="block-h">{pickingDemo.title}</h3>
      <SegmentedControl options={pickingDemo.policies} value={policy} onChange={setPolicy} ariaLabel="Política de separação" layoutId="picking-pilula" />
      <p className="picking__cap" aria-live="polite">
        <strong>{policy}:</strong> {caption}
      </p>
      <ol className="picking__list">
        {sorted.map((p, i) => (
          <m.li key={p.id} layout={reduced ? false : 'position'} transition={spring.soft} className={`picking__item${i === 0 ? ' is-first' : ''}`}>
            <span className="pos">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="id">
                {p.id} · lote {p.lote}
              </span>
              <span className="dates">
                <span>
                  {pickingDemo.labels.entrada} <b>{fmt(p.entrada)}</b>
                </span>
                <span>
                  {pickingDemo.labels.validade} <b>{fmt(p.validade)}</b>
                </span>
              </span>
            </span>
            <AnimatePresence initial={false}>
              {i === 0 && (
                <m.span key={policy} className="badge badge--first" initial={reduced ? false : { scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring.bouncy}>
                  {pickingDemo.badge}
                </m.span>
              )}
            </AnimatePresence>
          </m.li>
        ))}
      </ol>
    </div>
  );
}
