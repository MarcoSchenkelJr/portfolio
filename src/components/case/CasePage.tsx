import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, type ComponentType, type LazyExoticComponent } from 'react';
import { useLocation, useNavigate, useParams, type Location } from 'react-router';
import { AnimatePresence, m, useReducedMotion, useScroll } from 'motion/react';
import { caseBySlug, cases, isCaseSlug } from '../../content/cases/meta';
import type { CaseSlug } from '../../content/types';
import { spring } from '../../motion/tokens';
import { ScrollRootContext, useDocumentMeta } from '../../lib/hooks';
import { useFocusTrap } from '../../lib/focus';
import NotFound from '../../pages/NotFound';
import { bodyLoaders, opener } from './loaders';
import { CaseHero } from './CaseHero';
import { CaseNav, CaseNavContext, CaseTopBar, SpecStrip } from './CaseParts';

const bodies = {} as Record<CaseSlug, LazyExoticComponent<ComponentType>>;
const bodyOf = (slug: CaseSlug) => (bodies[slug] ??= lazy(bodyLoaders[slug]));

interface CaseState {
  backgroundLocation?: Location;
  sharedFrom?: string;
}

/**
 * Detalhe do case (DESIGN.md §3.2, §4.8, §7.7).
 * mode="sheet": folha de tela cheia sobre a home (diálogo, foco preso, Esc fecha).
 * mode="page": página comum, quando se chega direto pelo endereço.
 */
export default function CasePage({ mode }: { mode: 'page' | 'sheet' }) {
  const { slug } = useParams();
  if (!isCaseSlug(slug)) return mode === 'page' ? <NotFound /> : null;
  return <CaseView slug={slug} mode={mode} />;
}

function CaseView({ slug, mode }: { slug: CaseSlug; mode: 'page' | 'sheet' }) {
  const data = caseBySlug[slug];
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = useReducedMotion();
  const state = (location.state ?? {}) as CaseState;
  const background = state.backgroundLocation;
  const sheet = mode === 'sheet';
  const shared = sheet && state.sharedFrom === slug && !reduced;
  const sheetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closing = useRef(false);

  useDocumentMeta({ title: data.seo.title, description: data.seo.description, path: data.seo.path, ogImage: data.seo.ogImage });

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (background) navigate(-1);
    else navigate('/', { state: { scrollTo: 'projetos' } });
  }, [background, navigate]);

  // Folha: trava a rolagem do body, foco no botão "Projetos", devolve o foco ao cartão ao fechar.
  useEffect(() => {
    if (!sheet) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const t = window.setTimeout(() => sheetRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true }), 30);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = prev;
      const el = opener.el;
      opener.el = null;
      if (el && document.contains(el)) el.focus({ preventScroll: true });
    };
  }, [sheet]);
  useFocusTrap(sheetRef, sheet, close);

  // Troca de case: volta ao topo e move o foco para o h1 (DESIGN.md §12).
  const first = useRef(true);
  useEffect(() => {
    if (sheet) sheetRef.current?.scrollTo({ top: 0 });
    if (first.current && sheet) {
      first.current = false;
      return;
    }
    first.current = false;
    const t = window.setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 50);
    return () => window.clearTimeout(t);
  }, [slug, sheet]);

  const navCtx = useMemo(
    () => ({
      hrefOf: (s: CaseSlug) => `${import.meta.env.BASE_URL}projetos/${s}/`,
      goTo: (s: CaseSlug) => {
        if (sheet) navigate(`/projetos/${s}`, { replace: true, state: { backgroundLocation: background } });
        else navigate(`/projetos/${s}`);
      },
    }),
    [sheet, background, navigate],
  );

  const { scrollYProgress } = useScroll(sheet ? { container: sheetRef } : undefined);
  const i = cases.findIndex((c) => c.slug === slug);
  const prev = cases[(i - 1 + cases.length) % cases.length];
  const next = cases[(i + 1) % cases.length];
  const Body = bodyOf(slug);

  const content = (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={slug}
        initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24, transition: { duration: 0.18 } }}
        transition={reduced ? { duration: 0.2 } : spring.soft}
      >
        <div className="wrap">
          <CaseHero data={data} shared={shared} titleRef={titleRef} />
          <SpecStrip items={data.spec} />
          <Suspense fallback={<div style={{ minHeight: '60vh' }} aria-busy="true" />}>
            <Body />
          </Suspense>
          <CaseNav prev={prev} next={next} />
        </div>
      </m.div>
    </AnimatePresence>
  );

  const bar = <CaseTopBar index={data.index} total={cases.length} onBack={close} progress={scrollYProgress} mode={mode} />;

  if (!sheet) {
    return (
      <CaseNavContext.Provider value={navCtx}>
        {bar}
        <main id="conteudo" className="case-main">
          {content}
        </main>
      </CaseNavContext.Provider>
    );
  }

  return (
    <CaseNavContext.Provider value={navCtx}>
      <ScrollRootContext.Provider value={sheetRef}>
        <m.div
          ref={sheetRef}
          className="sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-titulo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.18 } }}
          exit={shared ? { opacity: 0, transition: { duration: 0.22, delay: 0.1 } } : { opacity: 0, y: 12, transition: { duration: 0.22 } }}
        >
          {bar}
          <div id="conteudo-case">{content}</div>
        </m.div>
      </ScrollRootContext.Provider>
    </CaseNavContext.Provider>
  );
}
