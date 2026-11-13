import { useRef, useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { m } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CaseMeta } from '../../content/types';
import { projectsSection } from '../../content/site';
import { sprints, sprintSummary } from '../../content/cases/meta';
import { spring } from '../../motion/tokens';
import { useIsTouch } from '../../lib/hooks';
import { BrowserFrame, Stage } from '../ui/Stage';
import { Pin } from '../ui/Pin';
import { CodeBadge, StatusBadge, Tags } from '../ui/Badge';
import { LoopVideo } from '../media/LoopVideo';
import { Picture } from '../media/Picture';
import { opener, preloadCase } from '../case/loaders';

const pad = (n: number) => String(n).padStart(2, '0');

/** Abre o case como folha sobre a home, guardando a origem para a viagem da mídia (DESIGN.md §3.2, §7.7). */
function useOpenCase(slug: string, mediaRef: React.RefObject<HTMLElement | null>) {
  const navigate = useNavigate();
  const location = useLocation();
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const r = mediaRef.current?.getBoundingClientRect();
    const visible = !!r && r.bottom > 0 && r.top < window.innerHeight;
    opener.el = e.currentTarget;
    navigate(`/projetos/${slug}`, { state: { backgroundLocation: location, sharedFrom: visible ? slug : undefined } });
  };
}

export function CaseCard({ data, variant }: { data: CaseMeta; variant: 'featured' | 'default' }) {
  const [hover, setHover] = useState(false);
  const touch = useIsTouch();
  const mediaRef = useRef<HTMLDivElement>(null);
  const open = useOpenCase(data.slug, mediaRef);
  const featured = variant === 'featured';
  const sizes = featured ? '(min-width: 960px) 56vw, 92vw' : '(min-width: 960px) 44vw, 92vw';
  const cover = data.cover?.kind === 'image' ? data.cover : undefined;

  const mediaEl = cover ? (
    data.coverClip && (!touch || featured) ? (
      <LoopVideo
        video={data.coverClip}
        poster={cover}
        sizes={sizes}
        mode={touch ? 'inview' : 'hover'}
        threshold={0.6}
        active={hover}
        controls={touch}
        posterAlt=""
        fallbackLabel={data.coverFrameLabel}
      />
    ) : (
      <Picture media={cover} sizes={sizes} alt="" fallbackLabel={data.coverFrameLabel} />
    )
  ) : null;

  return (
    <article
      className={`case${featured ? ' case--wide' : ''}`}
      onPointerEnter={() => {
        setHover(true);
        preloadCase(data.slug);
      }}
      onPointerLeave={() => setHover(false)}
      onFocus={() => {
        setHover(true);
        preloadCase(data.slug);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false);
      }}
    >
      <Stage
        layoutId={`case-media-${data.slug}`}
        className="case__media"
        padding="none"
        figure={data.cardStageTag}
        style={{ borderRadius: 0 }}
      >
        <m.div ref={mediaRef} layout="position" animate={hover && !touch ? { y: -6, scale: 1.015 } : { y: 0, scale: 1 }} transition={spring.soft} style={{ transformOrigin: '50% 100%' }}>
          <BrowserFrame label={data.coverFrameLabel}>{mediaEl}</BrowserFrame>
        </m.div>
        {featured &&
          data.cardPins?.map((p, i) => (
            <Pin key={p.title} n={i + 1} x={p.x} y={p.y} label={p.title} show={hover && !touch} delay={i * 0.07} ringIndex={i} />
          ))}
      </Stage>
      <div className="case__body">
        <div className="case__top">
          <span className="mono case__n">
            {pad(data.index)} / 04
          </span>
          <StatusBadge status={data.status} label={data.statusLabel} />
          <CodeBadge privateCode={data.privateCode} />
        </div>
        <h3>{data.title}</h3>
        <p className="case__desc">{data.cardText}</p>
        {data.cardMetrics && (
          <dl className="case__metrics">
            {data.cardMetrics.map((mt) => (
              <div key={mt.label}>
                <dt>{mt.label}</dt>
                <dd>{mt.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <Tags items={data.cardStack} />
        <div className="case__foot">
          <a className="case__link" href={`${import.meta.env.BASE_URL}projetos/${data.slug}/`} onClick={open} aria-label={`${projectsSection.open}: ${data.title}`}>
            {projectsSection.open}
            <m.span style={{ display: 'inline-grid' }} animate={{ x: hover ? 5 : 0 }} transition={spring.snappy}>
              <ArrowRight aria-hidden="true" />
            </m.span>
          </a>
          {data.links.cardExternal && (
            <a className="case__ext" href={data.links.cardExternal.href} target="_blank" rel="noopener">
              {data.links.cardExternal.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Cartão baixo e tracejado do WMS SaaS (DESIGN.md §4.4). */
export function CaseTeaserCard({ data }: { data: CaseMeta }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const open = useOpenCase(data.slug, mediaRef);
  return (
    <article className="case case--teaser" onPointerEnter={() => preloadCase(data.slug)} onFocus={() => preloadCase(data.slug)}>
      <div className="case__body">
        <div className="case__top">
          <span className="mono case__n" style={{ marginRight: 4 }}>
            {pad(data.index)} / 04
          </span>
          <StatusBadge status={data.status} label={data.statusLabel} />
          <CodeBadge privateCode={data.privateCode} />
        </div>
        <h3>{data.cardTitle ?? data.title}</h3>
        <p className="case__desc" style={{ maxWidth: '40em' }}>
          {data.cardText}
        </p>
        <p className="teaser__line">{data.teaserLine}</p>
      </div>
      <div className="teaser__side">
        <div className="sprints-mini" role="img" aria-label={sprintSummary}>
          {sprints.map((s) => (
            <i key={s.n} className={s.state} />
          ))}
          <span className="sprints-mini__label" aria-hidden="true">
            sprints
          </span>
        </div>
        <span className="mono" style={{ color: 'var(--ink-3)', fontSize: '.66rem' }} aria-hidden="true">
          {sprintSummary}
        </span>
        <a className="case__link" href={`${import.meta.env.BASE_URL}projetos/${data.slug}/`} onClick={open} aria-label={`${projectsSection.openTeaser}: ${data.title}`}>
          {projectsSection.openTeaser}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
