import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import type { ImageSource, VideoSource } from '../../content/types';
import { Picture } from './Picture';
import { useScrollRoot } from '../../lib/hooks';

/**
 * Clipe em laço sem áudio (DESIGN.md §5.2, §7.6, §9.2).
 * - A imagem (pôster) fica por baixo; o vídeo aparece por cima só quando começa a tocar.
 * - `src` só é atribuído quando o elemento chega a 300px da tela (preload="none").
 * - mode="inview": toca com 50% visível e pausa ao sair. mode="hover": toca só enquanto `active`.
 * - Movimento reduzido: não toca sozinho; botão de tocar visível.
 * - Se o vídeo faltar, fica a imagem; se a imagem faltar, fica o palco neutro.
 */
export function LoopVideo({
  video,
  poster,
  sizes,
  mode = 'inview',
  active = false,
  threshold = 0.5,
  controls = true,
  fill = false,
  priorityPoster = false,
  deferUntil = true,
  className = '',
  style,
  fallbackLabel,
  posterAlt,
}: {
  video?: VideoSource;
  /** imagem de base; padrão = pôster do próprio clipe */
  poster?: ImageSource;
  sizes: string;
  mode?: 'inview' | 'hover';
  active?: boolean;
  threshold?: number;
  controls?: boolean;
  fill?: boolean;
  priorityPoster?: boolean;
  /** false adia o carregamento (ex.: até depois do load da página) */
  deferUntil?: boolean;
  className?: string;
  style?: CSSProperties;
  fallbackLabel?: string;
  posterAlt?: string;
}) {
  const reduced = useReducedMotion();
  const root = useScrollRoot();
  const wrapRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [userPlay, setUserPlay] = useState(false);
  const base = poster ?? video?.poster;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !video) return;
    const ioNear = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { root: root?.current ?? null, rootMargin: '300px' });
    const ioVis = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { root: root?.current ?? null, threshold });
    ioNear.observe(el);
    ioVis.observe(el);
    return () => {
      ioNear.disconnect();
      ioVis.disconnect();
    };
  }, [video, root, threshold]);

  const load = !!video && !failed && deferUntil && (mode === 'hover' ? active || near : near);
  const wantPlay =
    load &&
    (mode === 'hover' ? active : visible) &&
    (userPlay || (!reduced && !userPaused));

  useEffect(() => {
    const v = vRef.current;
    if (!v || !load) return;
    if (wantPlay) {
      const p = v.play();
      if (p) p.catch(() => undefined);
    } else {
      v.pause();
      if (mode === 'hover') {
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
        setPlaying(false);
      }
    }
  }, [wantPlay, load, mode]);

  const showToggle = controls && mode === 'inview' && load;
  const isOn = playing && wantPlay;
  const toggle = () => {
    if (isOn) {
      setUserPaused(true);
      setUserPlay(false);
    } else {
      setUserPaused(false);
      setUserPlay(true);
    }
  };

  const box: CSSProperties = fill ? { width: '100%', height: '100%', ...style } : { aspectRatio: `${(video ?? base)!.width} / ${(video ?? base)!.height}`, ...style };

  return (
    <div ref={wrapRef} className={`media-box ${className}`} style={box}>
      {base ? (
        <Picture media={base} sizes={sizes} fill priority={priorityPoster} fallbackLabel={fallbackLabel} alt={posterAlt ?? (video ? '' : undefined)} />
      ) : (
        <div className="media-fallback" aria-hidden="true">
          <span>{fallbackLabel}</span>
        </div>
      )}
      {load && video && (
        <video
          ref={vRef}
          muted
          loop
          playsInline
          preload="none"
          width={video.width}
          height={video.height}
          aria-label={video.alt}
          style={{ opacity: isOn || (playing && !wantPlay && mode === 'inview') ? 1 : 0, transition: 'opacity .2s' }}
          onPlaying={() => setPlaying(true)}
          onError={() => setFailed(true)}
        >
          <source src={`${video.src}.webm`} type="video/webm" />
          <source src={`${video.src}.mp4`} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
      {showToggle && (
        <button type="button" className="vid-toggle" onClick={toggle} aria-label={isOn ? 'Pausar' : 'Tocar'} title={isOn ? 'Pausar' : 'Tocar'}>
          {isOn ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
