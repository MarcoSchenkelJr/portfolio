import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { m, useInView, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { hero } from '../../content/site';
import { media } from '../../content/media';
import { ease, spring } from '../../motion/tokens';
import { useAfterLoad, useIsDesktop } from '../../lib/hooks';
import { BrowserFrame, DeviceFrame, Stage } from '../ui/Stage';
import { Pin } from '../ui/Pin';
import { Picture } from '../media/Picture';
import { LoopVideo } from '../media/LoopVideo';
import { opener, preloadCase } from '../case/loaders';

const rise = (delay: number, reduced: boolean | null) =>
  reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { y: { ...spring.soft, delay }, opacity: { duration: 0.6, ease: ease.out, delay } },
      };

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

/** Hero + palco do WMS (DESIGN.md §4.2, §7.2). */
export function Hero() {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  const location = useLocation();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef);
  const afterLoad = useAfterLoad(1500);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const phoneYRaw = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const frameYRaw = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const phoneY = useSpring(phoneYRaw, { stiffness: 140, damping: 22, mass: 1 });
  const frameY = useSpring(frameYRaw, { stiffness: 140, damping: 22, mass: 1 });
  const parallax = desktop && !reduced;

  const lineDelay = (i: number) => 0.07 + 0.07 * i;

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-titulo">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <m.p className="mono eyebrow" {...rise(0, reduced)}>
              {hero.availability}
            </m.p>
            <h1 id="hero-titulo" aria-label={hero.title}>
              {hero.titleLines.map((line, i) => (
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
            <m.p className="hero__lead" {...rise(0.28, reduced)}>
              {hero.lead.map((s, i) => (s.b ? <strong key={i}>{s.t}</strong> : <span key={i}>{s.t}</span>))}
            </m.p>
            <m.div className="hero__cta" {...rise(0.35, reduced)}>
              <Link
                className="btn btn--primary"
                to="/projetos/wms-pro"
                state={{ backgroundLocation: location }}
                onPointerEnter={() => preloadCase('wms-pro')}
                onFocus={() => preloadCase('wms-pro')}
                onClick={(e) => {
                  opener.el = e.currentTarget;
                }}
              >
                {hero.ctaPrimary}
                <ArrowRight aria-hidden="true" className="arrow" />
              </Link>
              <a className="btn btn--ghost" href="#projetos">
                {hero.ctaSecondary}
              </a>
            </m.div>
            <m.div className="whoami" {...rise(0.42, reduced)}>
              <div>
                <span className="p">$</span> {hero.whoamiPrompt}
              </div>
              <div className="o">
                <Typed text={hero.whoami} delay={0.6} reduced={reduced} />
              </div>
            </m.div>
          </div>

          <m.div
            ref={stageRef}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={reduced ? { duration: 0.2 } : { ...spring.soft, delay: 0.14 }}
          >
            <Stage figure={hero.figure as [string, string, string]} padding="none" className={`hero__stage${stageInView ? '' : ' is-paused'}`} label={hero.stageLabel}>
              <m.div style={parallax ? { y: frameY } : undefined}>
                <BrowserFrame label={hero.frameLabel}>
                  <Picture media={media.wms.painel} sizes="(min-width: 960px) 46vw, 92vw" priority fallbackLabel="wms pro · painel" />
                </BrowserFrame>
              </m.div>
              <m.div
                className="hero__phone"
                style={parallax ? { y: phoneY } : undefined}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotate: 4 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
                transition={reduced ? { duration: 0.2 } : { ...spring.bouncy, delay: 0.5 }}
              >
                <DeviceFrame>
                  {desktop ? (
                    <LoopVideo video={media.wms.coletorClip} poster={media.wms.painelColetor} posterAlt={media.wms.painelColetor.alt} sizes="12vw" fill deferUntil={afterLoad} fallbackLabel="coletor" />
                  ) : (
                    <Picture media={media.wms.painelColetor} sizes="27vw" fill fallbackLabel="coletor" />
                  )}
                </DeviceFrame>
              </m.div>
              {hero.pins.map((p, i) => (
                <Pin key={p.title} n={i + 1} x={p.x} y={p.y} label={p.title} side={p.side} delay={0.7 + 0.12 * i} ringIndex={i} />
              ))}
            </Stage>
          </m.div>
        </div>
      </div>
    </section>
  );
}
