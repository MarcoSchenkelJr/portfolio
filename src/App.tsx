import { lazy, Suspense, useEffect, useRef } from 'react';
import { matchPath, Route, Routes, useLocation, type Location } from 'react-router';
import { AnimatePresence, LazyMotion, MotionConfig } from 'motion/react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { nav } from './content/site';
import { isCaseSlug } from './content/cases/meta';
import { loadCasePage } from './components/case/loaders';

const CasePage = lazy(loadCasePage);
/** domMax (animações, gestos e layout) em bloco próprio, fora do JS inicial (DESIGN.md §14.1). */
const loadFeatures = () => import('./motion/features').then((r) => r.default);

/**
 * Rotas com o padrão "background location" (DESIGN.md §3.2):
 * clicando num cartão, o case abre como folha sobre a home (que continua montada, com inert);
 * pelo endereço direto, o mesmo componente aparece como página.
 */
export default function App() {
  const location = useLocation();
  const background = (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;
  const base = background ?? location;
  const caseMatch = matchPath('/projetos/:slug', base.pathname.replace(/\/$/, '') || '/');
  const isCasePage = !!caseMatch && isCaseSlug(caseMatch.params.slug);
  const isHome = base.pathname === '/';
  const prevPath = useRef(base.pathname);

  // Página comum: volta ao topo na troca de rota (a não ser que haja âncora ou scrollTo).
  useEffect(() => {
    if (prevPath.current === base.pathname) return;
    prevPath.current = base.pathname;
    const st = base.state as { scrollTo?: string } | null;
    if (!base.hash && !st?.scrollTo) window.scrollTo(0, 0);
  }, [base.pathname, base.hash, base.state]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <a className="skip" href="#conteudo">
          {nav.skip}
        </a>
        <div inert={!!background} className="app-base">
          {!isCasePage && <NavBar variant={isHome ? 'home' : 'case'} />}
          <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
            <Routes location={base}>
              <Route path="/" element={<Home />} />
              <Route path="/projetos/:slug" element={<CasePage mode="page" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
        <AnimatePresence>
          {background && (
            <Routes location={location} key="folha">
              <Route
                path="/projetos/:slug"
                element={
                  <Suspense fallback={null}>
                    <CasePage mode="sheet" />
                  </Suspense>
                }
              />
            </Routes>
          )}
        </AnimatePresence>
      </LazyMotion>
    </MotionConfig>
  );
}
