import { media } from '../../content/media';
import type { PinData } from '../../content/types';
import { useIsDesktop } from '../../lib/hooks';
import { BrowserFrame, DeviceFrame } from '../ui/Stage';
import { Pin } from '../ui/Pin';
import { Picture } from '../media/Picture';
import { LoopVideo } from '../media/LoopVideo';

/**
 * Composição painel + coletor do WMS Pro (a figura que abria o hero), agora dentro do projeto em destaque.
 * O painel toca o clipe no hover (desktop) ou ao ficar 60% visível (toque); o coletor toca em laço.
 */
export function WmsFigure({ hover, touch, frameLabel, pins }: { hover: boolean; touch: boolean; frameLabel: string; pins?: PinData[] }) {
  const desktop = useIsDesktop();
  return (
    <>
      <BrowserFrame label={frameLabel}>
        <LoopVideo
          video={media.wms.painelClip}
          poster={media.wms.painel}
          posterAlt=""
          sizes="(min-width: 960px) 52vw, 92vw"
          mode={touch ? 'inview' : 'hover'}
          threshold={0.6}
          active={hover}
          controls={touch}
          fallbackLabel="wms pro · painel"
        />
      </BrowserFrame>
      <div className="feature__phone">
        <DeviceFrame>
          {desktop ? (
            <LoopVideo video={media.wms.coletorClip} poster={media.wms.painelColetor} posterAlt="" sizes="12vw" fill fallbackLabel="coletor" />
          ) : (
            <Picture media={media.wms.painelColetor} sizes="27vw" fill alt="" fallbackLabel="coletor" />
          )}
        </DeviceFrame>
      </div>
      {pins?.map((p, i) => (
        <Pin key={p.title} n={i + 1} x={p.x} y={p.y} label={p.title} side={p.side} delay={0.3 + 0.12 * i} ringIndex={i} />
      ))}
    </>
  );
}
