import { createContext, useContext, type ReactNode } from 'react';
import { m, type MotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import type { CaseMeta, CaseSlug, SpecItem } from '../../content/types';
import { spring } from '../../motion/tokens';
import { Brand } from '../layout/Brand';
import { ThemeToggle } from '../layout/ThemeToggle';
import { Reveal } from '../ui/Reveal';

/** Navegação entre cases que respeita o modo (folha ou página). */
export const CaseNavContext = createContext<{ goTo: (slug: CaseSlug) => void; hrefOf: (slug: CaseSlug) => string }>({
  goTo: () => undefined,
  hrefOf: (s) => `/projetos/${s}`,
});
export const useCaseNav = () => useContext(CaseNavContext);

const pad = (n: number) => String(n).padStart(2, '0');

/** Barra fixa do detalhe com progresso de leitura (DESIGN.md §4.8, §7.7). */
export function CaseTopBar({ index, total, onBack, progress, mode }: { index: number; total: number; onBack: () => void; progress: MotionValue<number>; mode: 'page' | 'sheet' }) {
  const sheet = mode === 'sheet';
  return (
    <m.header
      className={`case-bar${sheet ? '' : ' case-bar--page'}`}
      initial={sheet ? { y: -56 } : false}
      animate={{ y: 0 }}
      transition={{ ...spring.sheet, delay: 0.05 }}
    >
      <div className="wrap">
        {!sheet && <Brand />}
        <button type="button" className="nav__back" onClick={onBack} data-autofocus>
          <ArrowLeft aria-hidden="true" size={18} />
          Projetos
        </button>
        <span className="mono case-bar__meta">
          Case {pad(index)} / {pad(total)}
          {sheet && <span className="case-bar__esc"> · Esc fecha</span>}
        </span>
        {sheet ? (
          <button type="button" className="icon-btn" onClick={onBack} aria-label="Fechar" title="Fechar">
            <X aria-hidden="true" />
          </button>
        ) : (
          <ThemeToggle />
        )}
      </div>
      <m.div className="case-bar__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </m.header>
  );
}

export function SpecStrip({ items }: { items: SpecItem[] }) {
  return (
    <Reveal as="dl" className="spec" label="Ficha técnica">
      {items.map((s) => (
        <div key={s.label}>
          <dt className="mono">{s.label}</dt>
          <dd>
            {s.value}
            {s.note && <small>{s.note}</small>}
          </dd>
        </div>
      ))}
    </Reveal>
  );
}

/** Seção numerada do detalhe: rótulo lateral fixo + conteúdo (DESIGN.md §5.2). */
export function CaseSection({ n, title, children, wide, intro }: { n: string; title: string; children: ReactNode; wide?: boolean; intro?: ReactNode }) {
  const id = `sec-${n}-${title.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}`;
  return (
    <section className={`d-sec${wide ? ' d-sec--wide' : ''}`} aria-labelledby={id}>
      <div className="mono d-sec__k">
        <b>{n}</b>
        <h2 id={id}>{title}</h2>
      </div>
      {wide ? (
        <>
          <div className="d-sec__body">{intro}</div>
          <div className="d-sec__full">{children}</div>
        </>
      ) : (
        <div className="d-sec__body">{children}</div>
      )}
    </section>
  );
}

type Seg = { t: string; b?: boolean };
export function Prose({ paragraphs }: { paragraphs: Seg[][] }) {
  return (
    <Reveal className="prose">
      {paragraphs.map((p, i) => (
        <p key={i}>{p.map((s, k) => (s.b ? <strong key={k}>{s.t}</strong> : <span key={k}>{s.t}</span>))}</p>
      ))}
    </Reveal>
  );
}

export function DiagnosisCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="diag">
      {items.map((d, i) => (
        <Reveal as="li" key={d.title} index={i}>
          <span className="n">{pad(i + 1)}</span>
          <h3>{d.title}</h3>
          <p>{d.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function DeliveryList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="delivery">
      {items.map((d, i) => (
        <Reveal as="li" key={d.title} index={i}>
          <Check aria-hidden="true" />
          <div>
            <b>{d.title}</b>
            <span>{d.text}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Dois cartões de navegação para o case anterior e o próximo. */
export function CaseNav({ prev, next }: { prev: CaseMeta; next: CaseMeta }) {
  const { goTo, hrefOf } = useCaseNav();
  const click = (slug: CaseSlug) => (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    goTo(slug);
  };
  return (
    <nav className="case-nav" aria-label="Outros cases">
      <a href={hrefOf(prev.slug)} onClick={click(prev.slug)}>
        <span className="mono k">
          <ArrowLeft aria-hidden="true" /> Case anterior
        </span>
        <strong>{prev.title}</strong>
      </a>
      <a href={hrefOf(next.slug)} onClick={click(next.slug)}>
        <span className="mono k">
          Próximo case <ArrowRight aria-hidden="true" />
        </span>
        <strong>{next.title}</strong>
      </a>
    </nav>
  );
}

/** Cartão "Próxima revisão" que leva a outro case. */
export function NextRevision({ text, button, to }: { text: string; button: string; to: CaseSlug }) {
  const { goTo, hrefOf } = useCaseNav();
  return (
    <Reveal className="next-card">
      <p>{text}</p>
      <a
        className="btn btn--ghost"
        href={hrefOf(to)}
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey) return;
          e.preventDefault();
          goTo(to);
        }}
      >
        {button}
        <ArrowRight aria-hidden="true" className="arrow" />
      </a>
    </Reveal>
  );
}
