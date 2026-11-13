import { ArrowUpRight, Info } from 'lucide-react';
import { lab, type LabItem } from '../../content/lab';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { Picture } from '../media/Picture';
import { LoopVideo } from '../media/LoopVideo';

function LabCard({ item }: { item: LabItem }) {
  const t = item.thumb;
  return (
    <article className="lab-card">
      <div className="lab-card__thumb">
        {t.kind === 'video' ? (
          <LoopVideo video={t} sizes="(min-width: 960px) 30vw, 82vw" posterAlt="" fallbackLabel={item.title} fill />
        ) : (
          <Picture media={t} sizes="(min-width: 960px) 30vw, 82vw" fill tone="light" fallbackLabel={item.title} />
        )}
      </div>
      <div className="lab-card__body">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <p className="lab-card__author">{item.author}</p>
        <div className="lab-card__links">
          {item.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" aria-label={`${l.label} de ${item.title} (abre em nova aba)`}>
              {l.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/** 03 · Laboratório de dados: menor destaque, crédito explícito ao Mário (DESIGN.md §4.5, §11.10). */
export function DataLab() {
  return (
    <Section
      id="dados"
      n={lab.n}
      label={lab.label}
      title={lab.title}
      lead={lab.text}
      tone="muted"
      head={(h) => (
        <div className="lab-head">
          {h}
          <Reveal index={1}>
            <aside className="credit" aria-label={lab.creditTitle}>
              <p className="mono credit__h">
                <Info aria-hidden="true" />
                {lab.creditTitle}
              </p>
              <p>{lab.credit}</p>
              <a className="link" href={lab.creditLink.href} target="_blank" rel="noopener">
                {lab.creditLink.label}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </aside>
          </Reveal>
        </div>
      )}
    >
      <ul className="lab-grid">
        {lab.items.map((it, i) => (
          <Reveal as="li" key={it.title} index={i}>
            <LabCard item={it} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
