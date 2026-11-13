import { useId, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import type { TourScreen } from '../../content/types';
import { ease, spring } from '../../motion/tokens';
import { useIsDesktop, useIsTouch } from '../../lib/hooks';
import { SegmentedControl } from '../ui/SegmentedControl';
import { BrowserFrame, DeviceFrame, Stage } from '../ui/Stage';
import { Pin } from '../ui/Pin';
import { Picture } from '../media/Picture';

type Device = 'desktop' | 'mobile';

/** Vista explodida: abas por tela, alternador de aparelho e balões ligados à lista (DESIGN.md §6.1, §7.8). */
export function ScreenTour({ screens, frameLabel = 'wms pro', figureN = '03', caption }: { screens: TourScreen[]; frameLabel?: string; figureN?: string; caption?: string }) {
  const desktopVp = useIsDesktop();
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const [tab, setTab] = useState(screens[0].id);
  const [deviceChoice, setDeviceChoice] = useState<Device | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const screen = screens.find((s) => s.id === tab) ?? screens[0];
  const hasBoth = !!screen.desktop && !!screen.mobile;
  const anyMobile = screens.some((s) => s.mobile);
  const preferred: Device = deviceChoice ?? (desktopVp ? 'desktop' : 'mobile');
  const device: Device = hasBoth ? preferred : screen.desktop ? 'desktop' : 'mobile';
  const shot = device === 'desktop' ? screen.desktop : screen.mobile;
  const listPins = screen.pinsDesktop ?? screen.pinsMobile ?? [];
  const shotPins = device === 'desktop' ? screen.pinsDesktop ?? [] : screen.pinsMobile ?? [];

  const changeTab = (id: string) => {
    setTab(id);
    setActive(null);
  };

  const renderShot = (shotKey: string) => (
      <div style={{ position: 'relative' }}>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={shotKey}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, ease: ease.out } }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
          >
            {shot && <Picture media={shot} sizes={device === 'desktop' ? '(min-width: 960px) 62vw, 92vw' : '300px'} fallbackLabel={`${screen.label} · captura`} />}
          </m.div>
        </AnimatePresence>
        {shotPins.map((p, i) => (
          <Pin
            key={`${shotKey}-${i}`}
            n={i + 1}
            x={p.x}
            y={p.y}
            label={p.title}
            interactive
            active={active === i}
            delay={0.2 + 0.09 * i}
            ringIndex={i}
            describedBy={`${uid}-item-${screen.id}-${i}`}
            onHover={(on) => setActive(on ? i : null)}
          />
        ))}
      </div>
    );

  const panelId = `${uid}-painel`;
  return (
    <div className="tour">
      <div className="tour__controls">
        {screens.length > 1 ? (
          <SegmentedControl
            as="tabs"
            options={screens.map((s) => ({ value: s.id, label: s.label, id: `${uid}-aba-${s.id}`, controls: panelId }))}
            value={tab}
            onChange={changeTab}
            ariaLabel="Telas do sistema"
            layoutId={`tour-pilula-${uid}`}
            scroll
          />
        ) : (
          <span />
        )}
        {anyMobile && (
          <SegmentedControl
            options={[
              { value: 'desktop' as Device, label: 'Desktop' },
              { value: 'mobile' as Device, label: 'Coletor' },
            ]}
            value={device}
            onChange={(v) => {
              setDeviceChoice(v);
              setActive(null);
            }}
            ariaLabel="Aparelho"
            layoutId={`tour-aparelho-${uid}`}
          />
        )}
      </div>
      <div className="tour__grid" id={panelId} role={screens.length > 1 ? 'tabpanel' : undefined} aria-labelledby={screens.length > 1 ? `${uid}-aba-${tab}` : undefined}>
        <div ref={stageRef} style={{ scrollMarginTop: 80 }}>
          <Stage figure={[`fig. ${figureN} · `, screen.label.toLowerCase(), device === 'mobile' ? ' · coletor' : '']} padding="none" className={`tour__stage${device === 'mobile' ? ' tour__stage--mobile' : ''}`}>
            <m.div layout={reduced ? false : true} transition={spring.soft} className="tour__shot-wrap">
              {device === 'desktop' ? (
                <BrowserFrame label={screen.frameLabel ?? frameLabel}>
                  {renderShot(`${screen.id}-d`)}
                </BrowserFrame>
              ) : (
                <DeviceFrame>
                  {renderShot(`${screen.id}-m`)}
                </DeviceFrame>
              )}
            </m.div>
          </Stage>
        </div>
        <ol className="tour__list">
          {listPins.map((p, i) => (
            <li key={p.title}>
              <m.button
                type="button"
                id={`${uid}-item-${screen.id}-${i}`}
                className={`tour__item${active === i ? ' is-on' : ''}`}
                animate={{ x: active === i ? -4 : 0 }}
                transition={spring.snappy}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => {
                  setActive(i);
                  if (touch || !desktopVp) stageRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
                }}
                aria-pressed={active === i}
              >
                <i aria-hidden="true">{i + 1}</i>
                <span>
                  <b>{p.title}</b>
                  <span>{p.text}</span>
                </span>
              </m.button>
            </li>
          ))}
        </ol>
      </div>
      {caption && <p className="fig-caption">{caption}</p>}
    </div>
  );

}
