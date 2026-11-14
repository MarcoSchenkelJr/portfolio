import { useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'motion/react';
import { ArrowDown, Mail } from 'lucide-react';
import { contact, hero, links, site } from '../../content/site';
import { ease, spring } from '../../motion/tokens';
import { Stage } from '../ui/Stage';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcon';

const rise = (delay: number, reduced: boolean | null) =>
  reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { y: { ...spring.soft, delay }, opacity: { duration: 0.6, ease: ease.out, delay } },
      };

/** Texto digitado a 22ms por caractere (DESIGN.md §7.2); completo de uma vez com movimento reduzido. */
function Typed({ text, delay, reduced }: { text: string; delay: number; reduced: boolean | null }) {
  const [n, setN] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (reduced) {
      setN(text.length);
      return;
    }
    let i = 0;
    let iv: number | undefined;
    const t = window.setTimeout(() => {
      iv = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) window.clearInterval(iv);
      }, 22);
    }, delay * 1000);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(iv);
    };
  }, [text, delay, reduced]);
  return (
    <>
      <span className="sr-only-fix">{text}</span>
      <span aria-hidden="true">{text.slice(0, n)}</span>
    </>
  );
}

/** Hero: o Marco primeiro. Nome, papel, resumo, CTAs e a ficha com monograma e terminal. */
export function Hero() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef);
  const lineDelay = (i: number) => 0.07 + 0.07 * i;

  return (
    <section className="hero hero--person" aria-labelledby="hero-titulo">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <m.p className="mono eyebrow" {...rise(0, reduced)}>
              {hero.availability}
            </m.p>
            <h1 id="hero-titulo" className="hero__name" aria-label={hero.name}>
              {hero.nameLines.map((line, i) => (
                <span className="line" key={i} aria-hidden="true">
                  <m.span
                    initial={reduced ? { opacity: 0 } : { y: '100%' }}
                    animate={reduced ? { opacity: 1 } : { y: '0%' }}
                    transition={reduced ? { duration: 0.2 } : { ...spring.soft, delay: lineDelay(i) }}
                  >
                    {line.map((seg, k) => (seg.a ? <em key={k}>{seg.t}</em> : <span key={k}>{seg.t}</span>))}
                  </m.span>
                </span>
              ))}
            </h1>
            <m.p className="hero__role" {...rise(0.22, reduced)}>
              {hero.role}
            </m.p>
            <m.p className="hero__lead" {...rise(0.28, reduced)}>
              {hero.summary.map((s, i) => (s.b ? <strong key={i}>{s.t}</strong> : <span key={i}>{s.t}</span>))}
            </m.p>
            <m.div className="hero__cta" {...rise(0.35, reduced)}>
              <a className="btn btn--primary hero__cta-main" href="#projetos">
                {hero.ctaProjects}
                <ArrowDown aria-hidden="true" className="arrow arrow--down" />
              </a>
              <a className="btn btn--ghost" href={links.linkedin} target="_blank" rel="noopener">
                <LinkedinIcon size={18} />
                {hero.ctaLinkedin}
              </a>
              <a className="btn btn--ghost" href={links.github} target="_blank" rel="noopener">
                <GithubIcon size={18} />
                {hero.ctaGithub}
              </a>
              {contact.email && (
                <a className="btn btn--ghost" href={`mailto:${contact.email}`}>
                  <Mail aria-hidden="true" />
                  {hero.ctaEmail}
                </a>
              )}
            </m.div>
          </div>

          <m.div
            ref={stageRef}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={reduced ? { duration: 0.2 } : { ...spring.soft, delay: 0.14 }}
          >
            <Stage figure={hero.figure} padding="none" className={`hero__stage hero__id${stageInView ? '' : ' is-paused'}`} label={hero.stageLabel}>
              <div className="id">
                <div className="id__drawing">
                  <m.div
                    className="id__mono"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
                    transition={reduced ? { duration: 0.2 } : { ...spring.bouncy, delay: 0.4 }}
                  >
                    <span aria-hidden="true">
                      M<b>S</b>
                    </span>
                    <i className="id__corner id__corner--tl" aria-hidden="true" />
                    <i className="id__corner id__corner--tr" aria-hidden="true" />
                    <i className="id__corner id__corner--bl" aria-hidden="true" />
                    <i className="id__corner id__corner--br" aria-hidden="true" />
                  </m.div>
                  <m.span
                    className="id__dim id__dim--x mono"
                    aria-hidden="true"
                    initial={reduced ? false : { clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{ duration: 0.9, ease: ease.out, delay: 0.7 }}
                  >
                    <span>{hero.dims.width}</span>
                  </m.span>
                  <m.span
                    className="id__dim id__dim--y mono"
                    aria-hidden="true"
                    initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0)' }}
                    transition={{ duration: 0.9, ease: ease.out, delay: 0.85 }}
                  >
                    <span>{hero.dims.height}</span>
                  </m.span>
                </div>
                <div className="term">
                  <div className="frame__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>
                      {site.brand.prefix}
                      {site.brand.full}
                    </span>
                  </div>
                  <div className="term__body">
                    <p>
                      <span className="p">$</span> {hero.whoamiPrompt}
                    </p>
                    <p className="o">
                      <Typed text={hero.whoami} delay={0.6} reduced={reduced} />
                    </p>
                    <p>
                      <span className="p">$</span> {hero.statusPrompt}
                    </p>
                    <p className="o">
                      <Typed text={hero.status} delay={0.6 + hero.whoami.length * 0.022 + 0.3} reduced={reduced} />
                    </p>
                  </div>
                </div>
              </div>
            </Stage>
          </m.div>
        </div>
      </div>
    </section>
  );
}
