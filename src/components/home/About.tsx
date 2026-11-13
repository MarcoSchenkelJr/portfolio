import { useRef, useState } from 'react';
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { about, contact, links } from '../../content/site';
import { spring } from '../../motion/tokens';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { Stage } from '../ui/Stage';
import { Picture } from '../media/Picture';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcon';
import { asset } from '../../lib/paths';

function Timeline({ steps }: { steps: { title: string; text: string; current?: boolean }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 1 });
  const [lit, setLit] = useState(reduced ? steps.length : 0);
  useMotionValueEvent(fill, 'change', (v) => {
    const n = steps.filter((_, i) => v >= i / Math.max(steps.length - 1, 1) - 0.02).length;
    if (n > lit) setLit(n);
  });
  const shown = reduced ? steps.length : lit;
  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <span className="timeline__rail" aria-hidden="true">
        <m.span className="timeline__fill" style={{ scaleY: reduced ? 1 : fill }} />
      </span>
      <ol className="timeline">
      {steps.map((s, i) => (
        <li key={s.title} className={s.current ? 'is-current' : undefined} aria-current={s.current ? 'step' : undefined}>
          <span className="timeline__dot" aria-hidden="true">
            <m.i initial={false} animate={{ scale: i < shown ? 1 : 0 }} transition={spring.bouncy} />
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
      </ol>
    </div>
  );
}

/** 01 · Sobre (DESIGN.md §4.3, §11.4). Sem foto: monograma no lugar. */
export function About() {
  return (
    <Section id="sobre" n={about.n} label={about.label} title={about.title}>
      <div className="about">
        <Reveal className="about__intro">
          <figure className="about__figure">
            {about.photo ? (
              <Picture media={about.photo} sizes="180px" className="monogram" />
            ) : (
              <Stage padding="none" className="monogram">
                <span aria-hidden="true">
                  M<b>S</b>
                </span>
                <span className="sr-only-fix">Monograma de Marco Schenkel Jr.</span>
              </Stage>
            )}
            <figcaption className="mono">{about.figure}</figcaption>
          </figure>
          <div className="about__text">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <div className="about__links">
              {contact.resume && (
                <a className="btn btn--primary btn--sm" href={asset(contact.resume.href)} download>
                  <FileDown aria-hidden="true" />
                  Baixar currículo
                </a>
              )}
              <a className="btn btn--ghost btn--sm" href={links.linkedin} target="_blank" rel="noopener">
                <LinkedinIcon />
                LinkedIn
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="btn btn--ghost btn--sm" href={links.github} target="_blank" rel="noopener">
                <GithubIcon />
                GitHub
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal index={1}>
          <Timeline steps={about.timeline} />
        </Reveal>
      </div>
    </Section>
  );
}
