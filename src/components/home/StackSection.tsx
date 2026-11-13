import { useState } from 'react';
import { stackSection } from '../../content/stack';
import type { CaseSlug } from '../../content/types';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

type Used = (CaseSlug | 'site')[] | 'all';
const PROJECTS: (CaseSlug | 'site')[] = ['wms-pro', 'wms-saas', 'pdi-studio', 'antigravity', 'site'];

/** 04 · Stack e método: ficha técnica com destaque cruzado (DESIGN.md §4.6, §11.11). */
export function StackSection() {
  const [active, setActive] = useState<{ name: string; used: Used } | null>(null);
  const describe = (name: string, used: Used) =>
    used === 'all' ? `${name}, ${stackSection.usedIn} ${stackSection.all}` : used.length ? `${name}, ${stackSection.usedIn} ${used.map((u) => stackSection.projectNames[u]).join(', ')}` : `${name}, ${stackSection.studying}`;

  return (
    <Section id="stack" n={stackSection.n} label={stackSection.label} title={stackSection.title}>
      <div className="stack">
        <Reveal>
          <table className="spec-table">
            <caption className="sr-only-fix">Tecnologias por área</caption>
            <tbody>
              {stackSection.groups.map((g) => (
                <tr key={g.label}>
                  <th scope="row" className="mono">
                    {g.label}
                  </th>
                  <td>
                    <ul>
                      {g.items.map((it) => (
                        <li key={it.name}>
                          <button
                            type="button"
                            className={`tech-btn${active?.name === it.name ? ' is-on' : ''}`}
                            aria-label={describe(it.name, it.usedIn)}
                            onMouseEnter={() => setActive({ name: it.name, used: it.usedIn })}
                            onMouseLeave={() => setActive(null)}
                            onFocus={() => setActive({ name: it.name, used: it.usedIn })}
                            onBlur={() => setActive(null)}
                            onClick={() => setActive({ name: it.name, used: it.usedIn })}
                          >
                            {it.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="used-in" aria-hidden="true">
            {!active ? (
              <span>{stackSection.hint}</span>
            ) : active.used !== 'all' && active.used.length === 0 ? (
              <>
                <span>{active.name}:</span>
                <span className="is-on">{stackSection.studying}</span>
              </>
            ) : (
              <>
                <span>{stackSection.usedIn}</span>
                {PROJECTS.map((p) => (
                  <span key={p} className={active.used === 'all' || active.used.includes(p) ? 'is-on' : undefined}>
                    {stackSection.projectNames[p]}
                  </span>
                ))}
              </>
            )}
          </p>
        </Reveal>
        <ol className="principles">
          {stackSection.principles.map((p, i) => (
            <Reveal as="li" key={p.n} index={i + 1}>
              <span className="n" aria-hidden="true">
                {p.n}
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
