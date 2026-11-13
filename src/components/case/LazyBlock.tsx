import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { useScrollRoot } from '../../lib/hooks';

/**
 * Monta um bloco pesado só quando ele chega a 200px da tela (DESIGN.md §6.2 e §14.1).
 * Até lá, reserva a altura para não deslocar o layout.
 */
export function LazyBlock<P extends object>({ load, props, minHeight = 480 }: { load: () => Promise<{ default: ComponentType<P> }>; props: P; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const root = useScrollRoot();
  const [show, setShow] = useState(false);
  const Comp = useMemo(() => lazy(load), [load]);
  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { root: root?.current ?? null, rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [root, show]);
  const placeholder = <div style={{ minHeight }} aria-hidden="true" />;
  return <div ref={ref}>{show ? <Suspense fallback={placeholder}>{<Comp {...props} />}</Suspense> : placeholder}</div>;
}
