import type { CaseSlug } from '../../content/types';

/** Blocos carregados sob demanda (DESIGN.md §14.1): página do case e conteúdo de cada case. */
export const loadCasePage = () => import('./CasePage');

export const bodyLoaders: Record<CaseSlug, () => Promise<{ default: React.ComponentType }>> = {
  'wms-pro': () => import('./bodies/WmsProBody'),
  'wms-saas': () => import('./bodies/WmsSaasBody'),
  'pdi-studio': () => import('./bodies/PdiStudioBody'),
  antigravity: () => import('./bodies/AntigravityBody'),
};

export const heroExtraLoaders: Partial<Record<CaseSlug, () => Promise<{ default: React.ComponentType }>>> = {
  'wms-pro': () => import('./bodies/WmsProHeroExtra'),
};

/** Pré-carrega o case no pointerenter/focus do cartão. */
export function preloadCase(slug: CaseSlug) {
  loadCasePage().catch(() => undefined);
  bodyLoaders[slug]().catch(() => undefined);
  heroExtraLoaders[slug]?.().catch(() => undefined);
}

/** Elemento que abriu a folha, para devolver o foco ao fechar (DESIGN.md §12). */
export const opener: { el: HTMLElement | null } = { el: null };
