import { ArrowUpRight } from 'lucide-react';
import { game } from '../../../content/cases/antigravity';
import { useMediaQuery } from '../../../lib/hooks';
import { Stage } from '../../ui/Stage';
import { LiveEmbed } from '../../media/LiveEmbed';
import { LoopVideo } from '../../media/LoopVideo';
import { isSpeechSupported } from './speech';

/** Jogo embutido sob clique (DESIGN.md §10.2). Sem suporte a voz ou em tela pequena: clipe + link. */
export function GameEmbed() {
  const big = useMediaQuery('(min-width: 768px)');
  const supported = isSpeechSupported();
  const fallback = (text: string) => (
    <div className="embed">
      <div className="embed__view">
        <LoopVideo video={game.clip} poster={game.poster} sizes="92vw" fallbackLabel="antigravity · em jogo" />
      </div>
      <p style={{ color: 'var(--stage-ink)', fontSize: '.9rem' }}>{text}</p>
      <div className="embed__bar">
        <a className="btn btn--primary btn--sm" href={game.src} target="_blank" rel="noopener" style={{ color: 'var(--on-accent)' }}>
          {game.mobile}
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
  return (
    <Stage figure={['fig. 03 · ', 'jogável aqui', ' · mesmo domínio']} padding="md" style={{ paddingTop: 48 }}>
      {!big ? (
        fallback(game.mobileNote)
      ) : !supported ? (
        fallback(game.unsupported)
      ) : (
        <LiveEmbed
          title={game.iframeTitle}
          src={game.src}
          poster={game.poster}
          allow="microphone; autoplay; fullscreen"
          aspect="16 / 10"
          minHeight={480}
          cta={game.cta}
          note={game.note}
          fallbackHref={game.src}
        />
      )}
    </Stage>
  );
}
