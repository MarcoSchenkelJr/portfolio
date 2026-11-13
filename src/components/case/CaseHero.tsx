import { lazy, Suspense, type ReactNode, type RefObject } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Info } from 'lucide-react';
import type { CaseMeta } from '../../content/types';
import { ease, spring } from '../../motion/tokens';
import { Badge, CodeBadge, StatusBadge, Tags } from '../ui/Badge';
import { BrowserFrame, Stage } from '../ui/Stage';
import { LoopVideo } from '../media/LoopVideo';
import { Picture } from '../media/Picture';
import { heroExtraLoaders } from './loaders';

const TenantDiagram = lazy(() => import('./saas/TenantDiagram'));
const extras = Object.fromEntries(Object.entries(heroExtraLoaders).map(([k, l]) => [k, lazy(l!)]));

/** Topo do detalhe: selos, título, resumo, etiquetas, ações e o palco com a mídia (DESIGN.md §4.8, §7.7). */
export function CaseHero({ data, shared, titleRef }: { data: CaseMeta; shared: boolean; titleRef: RefObject<HTMLHeadingElement | null> }) {
  const reduced = useReducedMotion();
  const item = (i: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { y: { ...spring.soft, delay: 0.12 + 0.06 * i }, opacity: { duration: 0.5, ease: ease.out, delay: 0.12 + 0.06 * i } },
        };
  const Extra = extras[data.slug];
  const cover = data.cover?.kind === 'image' ? data.cover : undefined;
  const sizes = '(min-width: 960px) 56vw, 92vw';

  let media: ReactNode;
  if (data.slug === 'wms-saas') {
    media = (
      <Suspense fallback={<div style={{ minHeight: 360 }} />}>
        <TenantDiagram auto compact />
      </Suspense>
    );
  } else if (cover) {
    media = (
      <BrowserFrame label={data.coverFrameLabel}>
        {data.coverClip ? (
          <LoopVideo video={data.coverClip} poster={cover} posterAlt={cover.alt} sizes={sizes} fallbackLabel={data.coverFrameLabel} />
        ) : (
          <Picture media={cover} sizes={sizes} fallbackLabel={data.coverFrameLabel} />
        )}
      </BrowserFrame>
    );
  }

  return (
    <div className="d-hero">
      <div>
        <m.div className="case__top" {...item(0)}>
          <StatusBadge status={data.status} label={data.statusLabel} />
          {data.version && <Badge>{data.version}</Badge>}
          <CodeBadge privateCode={data.privateCode} />
        </m.div>
        <m.h1 id="case-titulo" ref={titleRef} tabIndex={-1} {...item(1)}>
          {data.title}
        </m.h1>
        <m.p className="lead" {...item(2)}>
          {data.summary}
        </m.p>
        <m.div {...item(3)}>
          <Tags items={data.stack} />
        </m.div>
        {(data.links.live || data.links.repo) && data.slug !== 'wms-pro' && (
          <m.div className="d-hero__actions" {...item(4)}>
            {data.links.live && (
              <a className="btn btn--primary" href={data.links.live.href} target="_blank" rel="noopener">
                {data.links.live.label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {data.links.repo && (
              <a className="btn btn--ghost" href={data.links.repo.href} target="_blank" rel="noopener">
                {data.links.repo.label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </m.div>
        )}
        {data.heroNote && (
          <m.p className={data.heroNote.tone === 'notice' ? 'notice' : 'd-hero__note'} {...item(5)}>
            {data.heroNote.tone === 'notice' && <Info aria-hidden="true" />}
            <span>{data.heroNote.text}</span>
          </m.p>
        )}
        {Extra && (
          <m.div {...item(4)}>
            <Suspense fallback={<div style={{ minHeight: 180 }} />}>
              <Extra />
            </Suspense>
          </m.div>
        )}
      </div>
      <Stage
        layoutId={shared ? `case-media-${data.slug}` : undefined}
        className="d-media"
        padding="none"
        figure={data.heroFigure}
        style={{ borderRadius: 20 }}
      >
        <m.div layout={shared ? 'position' : false}>{media}</m.div>
      </Stage>
    </div>
  );
}
