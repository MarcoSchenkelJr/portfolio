import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, FileDown } from 'lucide-react';
import { about, contact } from '../../content/site';
import { spring } from '../../motion/tokens';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { Picture } from '../media/Picture';
import { asset } from '../../lib/paths';
import { opener, preloadCase } from '../case/loaders';

type Experience = (typeof about.experience)[number];

/** Linha do tempo da carreira: o trilho cresce com a rolagem e cada marco acende (DESIGN.md §7.9). */
function CareerTimeline({ steps }: { steps: readonly Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const location = useLocation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 1 });
  const [lit, setLit] = useState(reduced ? steps.length : 0);
  useMotionValueEvent(fill, 'change', (v) => {
    const n = steps.filter((_, i) => v >= i / Math.max(steps.length - 1, 1) - 0.02).length;
    if (n > lit) setLit(n);
  });
  const shown = reduced ? steps.length : lit;
  return (
    <div className="timeline-wrap" ref={ref}>
      <span className="timeline__rail" aria-hidden="true">
        <m.span className="timeline__fill" style={{ scaleY: reduced ? 1 : fill }} />
      </span>
      <ol className="timeline timeline--career">
        {steps.map((s, i) => (
          <li key={s.title} className={`${'current' in s && s.current ? 'is-current' : ''} is-${s.weight}`}>
            <span className="timeline__dot" aria-hidden="true">
              <m.i initial={false} animate={{ scale: i < shown ? 1 : 0 }} transition={spring.bouncy} />
            </span>
            <p className="mono timeline__period">{s.period}</p>
            <h4>{s.title}</h4>
            <p className="timeline__org">{s.org}</p>
            <ul className="timeline__items">
              {s.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {'link' in s && s.link && (
              <Link
                className="timeline__link"
                to={`/projetos/${s.link.slug}`}
                state={{ backgroundLocation: location }}
                onPointerEnter={() => preloadCase(s.link.slug)}
                onFocus={() => preloadCase(s.link.slug)}
                onClick={(e) => {
                  opener.el = e.currentTarget;
                }}
              >
                {s.link.label}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 01 · Sobre: apresentação, ficha, carreira, formação, certificações e idiomas. Sem foto: monograma. */
export function About() {
  const location = useLocation();
  return (
    <Section id="sobre" n={about.n} label={about.label} title={about.title}>
      <div className="about">
        <Reveal className={`about__intro${about.photo ? '' : ' about__intro--nophoto'}`}>
          {about.photo && (
            <figure className="about__figure">
              <Picture media={about.photo} sizes="180px" className="monogram" />
              <figcaption className="mono">{about.figure}</figcaption>
            </figure>
          )}
          <div className="about__text">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'about__lead' : undefined}>
                {p.map((seg, k) => (seg.b ? <strong key={k}>{seg.t}</strong> : <span key={k}>{seg.t}</span>))}
              </p>
            ))}
            <p className="about__aside">{about.aside}</p>
            <div className="about__links">
              <Link
                className="btn btn--primary btn--sm"
                to="/projetos/wms-pro"
                state={{ backgroundLocation: location }}
                onPointerEnter={() => preloadCase('wms-pro')}
                onFocus={() => preloadCase('wms-pro')}
                onClick={(e) => {
                  opener.el = e.currentTarget;
                }}
              >
                {about.ctas.case}
                <ArrowRight aria-hidden="true" className="arrow" />
              </Link>
              {contact.resume && (
                <a className="btn btn--ghost btn--sm" href={asset(contact.resume.href)} download>
                  <FileDown aria-hidden="true" />
                  Baixar currículo
                </a>
              )}
            </div>
          </div>
        </Reveal>
        <Reveal index={1}>
          <dl className="facts" aria-label="Ficha">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="mono">{f.label}</dt>
                <dd>
                  {f.value}
                  {f.note && <small>{f.note}</small>}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="career">
        <Reveal>
          <h3 className="career__h">
            <span className="mono">01.1</span> {about.experienceTitle}
          </h3>
          <CareerTimeline steps={about.experience} />
        </Reveal>
        <div className="career__side">
          <Reveal index={1}>
            <h3 className="career__h">
              <span className="mono">01.2</span> {about.educationTitle}
            </h3>
            <ol className="edu">
              {about.education.map((e) => (
                <li key={e.title} className={`${'current' in e && e.current ? 'is-current' : ''}${'discreet' in e && e.discreet ? ' is-discreet' : ''}`}>
                  <p className="mono timeline__period">{e.period}</p>
                  <h4>{e.title}</h4>
                  <p className="timeline__org">{e.org}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal index={2}>
            <h3 className="career__h">
              <span className="mono">01.3</span> {about.certsTitle}
            </h3>
            <ul className="certs">
              {about.certifications.map((c) => (
                <li key={c.title}>
                  <span className="mono">{c.date}</span>
                  <b lang={'lang' in c ? c.lang : undefined}>{c.title}</b>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal index={3}>
            <h3 className="career__h">
              <span className="mono">01.4</span> {about.languagesTitle}
            </h3>
            <ul className="langs">
              {about.languages.map((l) => (
                <li key={l.title}>
                  <b>{l.title}</b>
                  <span>{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
