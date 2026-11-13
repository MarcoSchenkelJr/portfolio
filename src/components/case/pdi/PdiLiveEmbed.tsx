import { useEffect, useState } from 'react';
import { m } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { embed } from '../../../content/cases/pdi-studio';
import { pdiStudio } from '../../../content/cases/meta';
import { media } from '../../../content/media';
import { useMediaQuery } from '../../../lib/hooks';
import { Stage } from '../../ui/Stage';
import { LiveEmbed } from '../../media/LiveEmbed';
import { LoopVideo } from '../../media/LoopVideo';
import { startWarmup } from './warmup';

type Warm = 'warming' | 'ready' | 'down';

/** Lê o aquecimento disparado na montagem da página do case e mostra o progresso de ~50s. */
function useWarmup(): { state: Warm; start: number } {
  const [w] = useState(() => startWarmup(embed.warmupUrl));
  const [state, setState] = useState<Warm>('warming');
  useEffect(() => {
    let alive = true;
    w.result.then((r) => alive && setState(r));
    return () => {
      alive = false;
    };
  }, [w]);
  return { state, start: w.start };
}

export default function PdiLiveEmbed() {
  const big = useMediaQuery('(min-width: 1024px)');
  const { state, start } = useWarmup();
  const remaining = Math.max(0, 50 - (Date.now() - start) / 1000);

  const indicator = (
    <span className="warm" role="status" style={{ color: 'var(--stage-ink)' }}>
      {state === 'warming' && (
        <>
          <span>{embed.warming}</span>
          <span className="warm__bar" style={{ background: 'rgba(255,255,255,.1)' }}>
            <m.i initial={{ scaleX: 1 - remaining / 50 }} animate={{ scaleX: 1 }} transition={{ duration: remaining, ease: 'linear' }} />
          </span>
        </>
      )}
      {state === 'ready' && <span className="warm__ok" style={{ color: '#6fd49a' }}>{embed.ready}</span>}
      {state === 'down' && <span>{embed.down}</span>}
    </span>
  );

  return (
    <Stage figure={['fig. 05 · ', 'editor ao vivo', ' · pdistudio.vercel.app']} padding="md" style={{ paddingTop: 48, marginTop: 24 }}>
      <h3 className="block-h" style={{ color: '#fff' }}>
        {embed.heading}
      </h3>
      {big ? (
        <LiveEmbed
          title={embed.title}
          src={embed.src}
          poster={media.pdi.editor}
          allow="clipboard-write; fullscreen"
          aspect="16 / 10"
          minHeight={640}
          cta={embed.cta}
          fallbackHref={embed.src}
          extra={indicator}
        />
      ) : (
        <div className="embed">
          <div className="embed__view">
            <LoopVideo video={media.pdi.editorClip} poster={media.pdi.editor} sizes="92vw" fallbackLabel="pdi studio · editor" />
          </div>
          <p style={{ color: 'var(--stage-ink)', fontSize: '.9rem' }}>{embed.smallScreen}</p>
          <div className="embed__bar">
            <a className="btn btn--primary btn--sm" href={pdiStudio.links.live!.href} target="_blank" rel="noopener" style={{ color: 'var(--on-accent)' }}>
              {pdiStudio.links.live!.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
            {indicator}
          </div>
        </div>
      )}
    </Stage>
  );
}
