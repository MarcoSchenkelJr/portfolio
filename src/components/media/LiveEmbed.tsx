import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import type { ImageSource } from '../../content/types';
import { Picture } from './Picture';

type State = 'poster' | 'loading' | 'ready' | 'error';

/**
 * Embed sob clique (DESIGN.md §10.1): nenhum iframe existe antes do clique.
 * poster → loading → ready | error (20s sem onLoad). "Fechar" remove o iframe.
 */
export function LiveEmbed({
  title,
  src,
  poster,
  allow,
  aspect = '16 / 10',
  minHeight,
  cta,
  note,
  fallbackHref,
  extra,
}: {
  title: string;
  src: string;
  poster: ImageSource;
  allow?: string;
  aspect?: string;
  minHeight?: number;
  cta: string;
  note?: ReactNode;
  fallbackHref: string;
  /** conteúdo ao lado do link "Abrir em nova aba" (ex.: aquecimento do servidor) */
  extra?: ReactNode;
}) {
  const [state, setState] = useState<State>('poster');
  const timer = useRef<number | undefined>(undefined);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    setState('loading');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState((s) => (s === 'loading' ? 'error' : s)), 20000);
  };
  const close = () => {
    window.clearTimeout(timer.current);
    setState('poster');
  };

  return (
    <div className="embed">
      <div className="embed__view" style={{ aspectRatio: aspect, minHeight }}>
        {(state === 'poster' || state === 'error') && <Picture media={poster} sizes="(min-width: 960px) 62vw, 92vw" fill alt="" fallbackLabel={title} />}
        {(state === 'loading' || state === 'ready') && (
          <iframe
            src={src}
            title={title}
            allow={allow}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => {
              window.clearTimeout(timer.current);
              setState('ready');
            }}
          />
        )}
        {state === 'poster' && (
          <div className="embed__overlay">
            <button type="button" className="btn btn--primary" onClick={open}>
              <Play aria-hidden="true" />
              {cta}
            </button>
            {note && <p>{note}</p>}
          </div>
        )}
        {state === 'loading' && (
          <div className="embed__overlay media-fallback" style={{ background: 'rgba(8,18,30,.92)' }} role="status">
            <span>Carregando…</span>
          </div>
        )}
        {state === 'error' && (
          <div className="embed__overlay" role="alert">
            <p>Não carregou.</p>
            <a className="btn btn--primary btn--sm" href={fallbackHref} target="_blank" rel="noopener">
              Abrir em nova aba
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
      <div className="embed__bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a href={fallbackHref} target="_blank" rel="noopener">
            Abrir em nova aba
            <ArrowUpRight aria-hidden="true" />
          </a>
          {extra}
        </div>
        {(state === 'loading' || state === 'ready') && (
          <button ref={closeRef} type="button" className="stage-btn" onClick={close}>
            <X aria-hidden="true" />
            Fechar
          </button>
        )}
      </div>
    </div>
  );
}
