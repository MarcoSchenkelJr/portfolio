import { useEffect, useState, useSyncExternalStore, createContext, useContext, type RefObject } from 'react';
import { absoluteUrl, asset, SITE_URL } from './paths';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener('change', cb);
      return () => m.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useIsDesktop = () => useMediaQuery('(min-width: 960px)');
/** dispositivo sem hover (toque) */
export const useIsTouch = () => useMediaQuery('(hover: none)');

/** Contêiner de rolagem atual (a folha do case ou a janela). */
export const ScrollRootContext = createContext<RefObject<HTMLElement | null> | null>(null);
export const useScrollRoot = () => useContext(ScrollRootContext);

export interface DocMeta {
  title: string;
  description: string;
  /** rota interna, ex.: '/projetos/wms-pro/' */
  path: string;
  /** relativo a public/, ex.: 'og/home.png' */
  ogImage: string;
}

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Atualiza título, descrição, canonical e OG na navegação interna (DESIGN.md §13). */
export function useDocumentMeta(meta: DocMeta | null) {
  useEffect(() => {
    if (!meta) return;
    document.title = meta.title;
    const url = absoluteUrl(meta.path);
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', `${SITE_URL}/${meta.ogImage}`);
  }, [meta?.title, meta?.description, meta?.path, meta?.ogImage]);
}

/** Verdadeiro depois do evento load + um respiro (para mídia não prioritária). */
export function useAfterLoad(delayMs = 1200): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    const go = () => {
      t = window.setTimeout(() => setReady(true), delayMs);
    };
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => {
      window.removeEventListener('load', go);
      if (t) clearTimeout(t);
    };
  }, [delayMs]);
  return ready;
}

export { asset };
