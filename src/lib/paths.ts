/**
 * Endereços do site. O portfólio é um project site do GitHub Pages:
 * https://marcoschenkeljr.github.io/portfolio/  (base do Vite: '/portfolio/').
 * Nenhum caminho interno pode começar com '/' absoluto: tudo passa por BASE.
 */
import seo from '../content/seo.json';

/** '/portfolio/' no build; vem do `base` do vite.config.ts */
export const BASE = import.meta.env.BASE_URL;
/** basename do roteador, sem barra final: '/portfolio' */
export const ROUTER_BASENAME = BASE.replace(/\/$/, '') || '/';
/** URL pública absoluta, sem barra final */
export const SITE_URL = seo.site;

/** Caminho de arquivo em public/ (ex.: 'media/wms-pro/painel-960.avif') → '/portfolio/media/...' */
export const asset = (p: string) => BASE + p.replace(/^\/+/, '');
/** URL absoluta de uma rota do site (ex.: '/projetos/wms-pro/') */
export const absoluteUrl = (routePath: string) => SITE_URL + '/' + routePath.replace(/^\/+/, '');
