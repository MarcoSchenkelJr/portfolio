import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ImageSource } from '../../content/types';

const srcset = (m: ImageSource, ext: string) => m.widths.map((w) => `${m.src}-${w}.${ext} ${w}w`).join(', ');

/**
 * <picture> com AVIF e WebP (DESIGN.md §9.2). Sempre com width/height para reservar espaço.
 * Se o arquivo faltar, mostra o palco neutro com a legenda, nunca um ícone quebrado.
 */
export function Picture({
  media,
  sizes,
  priority = false,
  className = '',
  style,
  fallbackLabel,
  fill = false,
  tone = 'stage',
  alt,
}: {
  media: ImageSource;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  fallbackLabel?: string;
  /** ocupa o tamanho do pai (o pai define a proporção) */
  fill?: boolean;
  tone?: 'stage' | 'light';
  /** substitui o texto alternativo (ex.: "" em cartões) */
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0 && img.currentSrc) setFailed(true);
  }, []);
  const box: CSSProperties = fill ? { width: '100%', height: '100%', ...style } : { aspectRatio: `${media.width} / ${media.height}`, ...style };
  const fallback = Math.max(...media.widths.filter((w) => w <= 1000), media.widths[0]);
  return (
    <div className={`media-box ${className}`} style={box}>
      {failed ? (
        <div className={`media-fallback${tone === 'light' ? ' media-fallback--light' : ''}`} role={(alt ?? media.alt) ? 'img' : undefined} aria-label={(alt ?? media.alt) || undefined}>
          <span aria-hidden="true">{fallbackLabel ?? 'imagem indisponível'}</span>
        </div>
      ) : (
        <picture>
          <source type="image/avif" srcSet={srcset(media, 'avif')} sizes={sizes} />
          <source type="image/webp" srcSet={srcset(media, 'webp')} sizes={sizes} />
          <img
            ref={imgRef}
            src={`${media.src}-${fallback}.webp`}
            alt={alt ?? media.alt}
            width={media.width}
            height={media.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'auto' : 'async'}
            fetchPriority={priority ? 'high' : undefined}
            onError={() => setFailed(true)}
            draggable={false}
          />
        </picture>
      )}
    </div>
  );
}
