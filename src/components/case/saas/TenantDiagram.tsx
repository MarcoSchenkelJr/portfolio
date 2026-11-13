import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { tenantDiagram, tenants } from '../../../content/cases/wms-saas';
import { spring } from '../../../motion/tokens';
import { useScrollRoot } from '../../../lib/hooks';
import { SegmentedControl } from '../../ui/SegmentedControl';

/**
 * "Uma tabela, três empresas" (DESIGN.md §6.3). As linhas das outras empresas perdem opacidade
 * e deslizam 8px. `auto` alterna sozinho (capa do case) até alguém interagir.
 */
export default function TenantDiagram({ auto = false, compact = false }: { auto?: boolean; compact?: boolean }) {
  const [who, setWho] = useState('A');
  const [manual, setManual] = useState(false);
  const reduced = useReducedMotion();
  const root = useScrollRoot();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { root: root ?? undefined });

  useEffect(() => {
    if (!auto || manual || reduced || !inView) return;
    const t = window.setInterval(() => setWho((w) => tenants[(tenants.findIndex((x) => x.id === w) + 1) % tenants.length].id), 2600);
    return () => window.clearInterval(t);
  }, [auto, manual, reduced, inView]);

  const rows = compact ? tenantDiagram.rows.slice(0, 6) : tenantDiagram.rows;
  const color = (id: string) => tenants.find((t) => t.id === id)?.color;

  return (
    <div className="tenant" ref={ref}>
      <div className="tenant__head">
        <span className="tenant__title">{compact ? `tabela ${tenantDiagram.table}` : tenantDiagram.title}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span className="tenant__title" id={compact ? 'tenant-quem-c' : 'tenant-quem'}>
            {tenantDiagram.selectorLabel}
          </span>
          <SegmentedControl
            options={tenants.map((t) => ({ value: t.id, label: t.name }))}
            value={who}
            onChange={(v) => {
              setManual(true);
              setWho(v);
            }}
            ariaLabel={tenantDiagram.selectorLabel}
            layoutId={compact ? 'tenant-pilula-capa' : 'tenant-pilula'}
            tone="stage"
            size="sm"
          />
        </span>
      </div>
      <div className="tenant__table" role="table" aria-label={`Tabela ${tenantDiagram.table}: linhas visíveis para a ${tenants.find((t) => t.id === who)?.name}`}>
        <div className="tenant__row tenant__row--head" role="row">
          <span role="columnheader" aria-label="Empresa" />
          <span role="columnheader">empresa</span>
          <span role="columnheader">sku</span>
          <span role="columnheader">posição</span>
        </div>
        {rows.map((r, i) => {
          const own = r.tenant === who;
          return (
            <m.div
              key={i}
              className="tenant__row"
              role="row"
              aria-hidden={own ? undefined : true}
              animate={{ opacity: own ? 1 : 0.12, x: own ? 0 : 8 }}
              transition={reduced ? { duration: 0 } : spring.soft}
            >
              <span role="cell">
                <i style={{ background: color(r.tenant) }} />
              </span>
              <span role="cell">{r.tenant}</span>
              <span role="cell">{r.sku}</span>
              <span role="cell">{r.pos}</span>
            </m.div>
          );
        })}
      </div>
      <code className="tenant__sql">
        select * from {tenantDiagram.table} <b>where system_unit_id = '{who}'</b>
      </code>
      {!compact && <p className="tenant__cap">{tenantDiagram.caption}</p>}
    </div>
  );
}
