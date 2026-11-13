import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatePresence, LayoutGroup, m, useReducedMotion } from 'motion/react';
import { projectsSection } from '../../content/site';
import { cases } from '../../content/cases/meta';
import type { Category } from '../../content/types';
import { dur, ease, spring, stagger } from '../../motion/tokens';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { SegmentedControl } from '../ui/SegmentedControl';
import { CaseCard, CaseTeaserCard } from './CaseCard';

type Filter = Category | 'all';
const VALID: Filter[] = ['all', 'sistemas', 'visao', 'jogos', 'no-ar'];

/** 02 · Projetos: filtro sincronizado com ?f= e grade com animação de layout (DESIGN.md §4.4, §7.5). */
export function Projects() {
  const [params, setParams] = useSearchParams();
  const reduced = useReducedMotion();
  const raw = params.get('f') as Filter | null;
  const filter: Filter = raw && VALID.includes(raw) ? raw : 'all';

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: cases.length };
    cases.forEach((k) => k.categories.forEach((cat) => (c[cat] = (c[cat] ?? 0) + 1)));
    return c;
  }, []);

  const visible = cases.filter((c) => filter === 'all' || c.categories.includes(filter));

  const setFilter = (f: Filter) => {
    const next = new URLSearchParams(params);
    if (f === 'all') next.delete('f');
    else next.set('f', f);
    setParams(next, { replace: true, preventScrollReset: true, state: undefined });
  };

  return (
    <Section id="projetos" n={projectsSection.n} label={projectsSection.label} title={projectsSection.title} lead={projectsSection.lead}>
      <Reveal>
        <SegmentedControl
          options={projectsSection.filters.map((f) => ({ value: f.value as Filter, label: f.label, count: counts[f.value] ?? 0 }))}
          value={filter}
          onChange={setFilter}
          ariaLabel={projectsSection.filterLabel}
          layoutId="filtro-pilula"
          scroll
        />
      </Reveal>
      <p className="sr-only-fix" aria-live="polite">
        {projectsSection.announce(visible.length)}
      </p>
      <LayoutGroup id="cases">
        <div className="cases">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c, i) => {
              const wide = c.slug === 'wms-pro' || c.slug === 'wms-saas';
              return (
                <m.div
                  key={c.slug}
                  layout={reduced ? false : 'position'}
                  className={`case-cell${wide ? ' case-cell--wide' : ''}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: reduced ? 0 : dur.fast, ease: ease.out } }}
                  transition={reduced ? { duration: 0 } : { ...spring.soft, delay: i * stagger.tight }}
                >
                  <Reveal index={i} style={{ height: '100%' }}>
                    {c.slug === 'wms-saas' ? <CaseTeaserCard data={c} /> : <CaseCard data={c} variant={c.slug === 'wms-pro' ? 'featured' : 'default'} />}
                  </Reveal>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </Section>
  );
}
