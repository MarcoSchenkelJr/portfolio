import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { animate, m, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import { ChevronsLeftRight } from 'lucide-react';
import type { ImageSource } from '../../../content/types';
import { ease } from '../../../motion/tokens';
import { useScrollRoot } from '../../../lib/hooks';
import { Stage } from '../../ui/Stage';
import { SegmentedControl } from '../../ui/SegmentedControl';
import { Picture } from '../../media/Picture';

interface Pair {
  id: string;
  label: string;
  before: ImageSource;
  after: ImageSource;
  note: string;
}

/** Comparação com divisor arrastável (DESIGN.md §6.4, §7.9). Funciona sem o servidor. */
export default function BeforeAfter({ pairs, original, processed, sliderLabel, heading }: { pairs: Pair[]; original: string; processed: string; sliderLabel: string; heading: string }) {
  const [id, setId] = useState(pairs[0].id);
  const pair = pairs.find((p) => p.id === id)!;
  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const viewRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduced = useReducedMotion();
  const root = useScrollRoot();
  const seen = useInView(viewRef, { once: true, margin: '0px 0px -20% 0px', root: root ?? undefined });
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  useMotionValueEvent(pos, 'change', (v) => setValue(Math.round(v)));

  // Dica na primeira vez: 50% → 62% → 50% (1,2s).
  useEffect(() => {
    if (!seen || reduced) return;
    const c = animate(pos, [50, 62, 50], { duration: 1.2, ease: ease.inOut });
    return () => c.stop();
  }, [seen, reduced, pos]);

  const setFromX = (clientX: number) => {
    const r = viewRef.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => dragging.current && setFromX(e.clientX);
  const up = () => (dragging.current = false);
  const onKey = (e: KeyboardEvent) => {
    const v = pos.get();
    const map: Record<string, number> = { ArrowLeft: v - 5, ArrowDown: v - 5, ArrowRight: v + 5, ArrowUp: v + 5, Home: 0, End: 100 };
    if (!(e.key in map)) return;
    e.preventDefault();
    pos.set(Math.min(100, Math.max(0, map[e.key])));
  };

  return (
    <Stage figure={['fig. 04 · ', 'antes e depois', ' · saída do pdi studio']} padding="md" style={{ paddingTop: 48 }}>
      <div className="ba">
        <h3 className="block-h" style={{ color: '#fff' }}>
          {heading}
        </h3>
        <SegmentedControl options={pairs.map((p) => ({ value: p.id, label: p.label }))} value={id} onChange={setId} ariaLabel="Operação" layoutId="ba-pilula" tone="stage" scroll />
        <div className="ba__view" ref={viewRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          <div className="ba__layer">
            <Picture key={`a-${id}`} media={pair.after} sizes="(min-width: 960px) 62vw, 92vw" fill fallbackLabel={`${pair.label} · ${processed}`} />
          </div>
          <m.div className="ba__layer" style={{ clipPath: clip }}>
            <Picture key={`b-${id}`} media={pair.before} sizes="(min-width: 960px) 62vw, 92vw" fill fallbackLabel={`${pair.label} · ${original}`} />
          </m.div>
          <span className="ba__label" style={{ left: 12 }}>
            {original}
          </span>
          <span className="ba__label" style={{ right: 12 }}>
            {processed}
          </span>
          <m.div
            className="ba__handle"
            style={{ left }}
            role="slider"
            tabIndex={0}
            aria-label={sliderLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            aria-valuetext={`${value}% da imagem original visível`}
            onKeyDown={onKey}
          >
            <span className="ba__knob">
              <ChevronsLeftRight aria-hidden="true" />
            </span>
          </m.div>
        </div>
        <p className="ba__note" aria-live="polite">
          {pair.note}
        </p>
      </div>
    </Stage>
  );
}
