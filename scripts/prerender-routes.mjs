// Gera um HTML por rota depois do `vite build` (DESIGN.md §14.2):
//  - dist/projetos/<slug>/index.html com título, descrição, canonical, OG e JSON-LD próprios (status 200 no Pages);
//  - dist/404.html (cópia da home com noindex) para qualquer outro caminho sob /portfolio/;
//  - pré-carregamento do woff2 da Archivo em todos os HTML.
// O conteúdo continua sendo montado pelo React no navegador.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const seo = JSON.parse(readFileSync(join(root, 'src/content/seo.json'), 'utf8'));
const SITE = seo.site.replace(/\/$/, ''); // https://marcoschenkeljr.github.io/portfolio
const BASE = new URL(SITE + '/').pathname; // /portfolio/

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let html = readFileSync(join(dist, 'index.html'), 'utf8');

// 1. Pré-carregar só o woff2 da Archivo (DESIGN.md §2.2).
const assets = readdirSync(join(dist, 'assets'));
const archivo = assets.find((f) => /^archivo-latin-wdth-normal.*\.woff2$/.test(f));
if (archivo && !html.includes(archivo + '" as="font"')) {
  html = html.replace('</title>', `</title>\n    <link rel="preload" href="${BASE}assets/${archivo}" as="font" type="font/woff2" crossorigin />`);
}
writeFileSync(join(dist, 'index.html'), html);

function replaceMeta(src, r) {
  const url = `${SITE}${r.path}`;
  const img = `${SITE}/${r.ogImage}`;
  const ld =
    r.schemaType === 'SoftwareApplication'
      ? { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: r.name, description: r.description, url: r.liveUrl, applicationCategory: r.applicationCategory, operatingSystem: 'Navegador web', author: { '@type': 'Person', name: 'Marco Schenkel Jr.', url: `${SITE}/` }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' } }
      : { '@context': 'https://schema.org', '@type': 'CreativeWork', name: r.name, description: r.description, url, author: { '@type': 'Person', name: 'Marco Schenkel Jr.', url: `${SITE}/` }, inLanguage: 'pt-BR' };
  let out = src
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(r.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1article$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`)
    .replace(/(<script type="application\/ld\+json" id="ld-json">)[\s\S]*?(<\/script>)/, `$1\n      ${JSON.stringify(ld)}\n    $2`);
  // A imagem do hero só é usada na home.
  out = out.replace(/\s*<link rel="preload" as="image"[\s\S]*?\/>/, '');
  return out;
}

let n = 0;
for (const [slug, r] of Object.entries(seo.routes)) {
  const dir = join(dist, 'projetos', slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), replaceMeta(html, r));
  n++;
}

const notFound = html
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Página não encontrada · Marco Schenkel Jr.</title>\n    <meta name="robots" content="noindex" />')
  .replace(/\s*<link rel="preload" as="image"[\s\S]*?\/>/, '');
writeFileSync(join(dist, '404.html'), notFound);

if (existsSync(join(dist, 'antigravity-game'))) {
  console.error('ERRO: dist/antigravity-game não pode existir (colide com o site do jogo).');
  process.exit(1);
}
console.log(`prerender: ${n} rotas de case + 404.html geradas em ${BASE} (fonte pré-carregada: ${archivo ?? 'não encontrada'})`);
