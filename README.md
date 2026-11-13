# Portfólio · Marco Schenkel Jr.

**https://marcoschenkeljr.github.io/portfolio/**

Portfólio pessoal em Vite + React 19 + TypeScript, Tailwind CSS v4 e Motion 12 (`LazyMotion`). Publicado como *project site* do GitHub Pages a partir do repositório `MarcoSchenkelJr/portfolio`. O design (identidade, textos, movimento, acessibilidade e orçamento) está em `../design/DESIGN.md`.

## Rodar

```bash
npm install
npm run dev       # http://localhost:5180/portfolio/
npm run build     # tsc + vite build + HTML por rota + 404.html
npm run preview   # http://localhost:4173/portfolio/
```

Node 22.

## Estrutura

```
src/
  content/            todo o texto e os dados (edite aqui, não nos componentes)
    site.ts           home, links, contato (e-mail, currículo e foto são opcionais)
    cases/meta.ts     dados dos 4 cartões e do topo de cada case
    cases/<slug>.ts   texto completo de cada case (carrega só na página do case)
    lab.ts stack.ts   Laboratório de dados e Stack
    media.ts          caminhos, dimensões e textos alternativos das mídias
    seo.json          títulos, descrições e imagens sociais por rota (usado também no build)
    code/             trecho de código exibido no case do PDI Studio (realçado no build)
  components/         layout, ui, media, home, case (cada case tem seu bloco lazy)
  lib/paths.ts        BASE ('/portfolio/'), URL pública e helpers de caminho
public/
  media/<slug>/       imagens AVIF/WebP e clipes MP4/WebM (gerados à parte)
  media/og/           imagens de compartilhamento 1200×630 (media/site/: favicon e apple-touch-icon)
scripts/prerender-routes.mjs
```

## Acrescentar depois

Tudo num arquivo só, `src/content/site.ts`:

- **E-mail**: preencha `contact.email`. Aparece no Contato com botão "Copiar".
- **Currículo**: coloque o PDF em `public/` e preencha `contact.resume = { href: 'curriculo-marco-schenkel-jr.pdf' }` (caminho relativo; o BASE é aplicado no link).
- **Foto**: coloque a imagem em `public/media/sobre/` (`marco-400.avif/webp`, `marco-800.avif/webp`) e preencha `about.photo`. Sem foto, o Sobre mostra o monograma.

Demonstração do WMS com login de convidado: preencha `demo` em `src/content/cases/wms-pro.ts` (`url`, `user`, `password`). Vazio = caixa "Em breve".

## Publicação

- `vite.config.ts` usa `base: '/portfolio/'` e o roteador usa `basename="/portfolio"`. Nenhum caminho interno começa com `/` absoluto: mídias, fontes, favicon e imagens OG passam por `import.meta.env.BASE_URL`.
- O build gera `dist/projetos/<slug>/index.html` (status 200 e metadados próprios por case) e `dist/404.html` (qualquer outro caminho sob `/portfolio/` abre o app, que mostra "Não encontrado").
- `.github/workflows/deploy.yml` faz `npm ci`, `npm run build` e publica `dist` com `actions/upload-pages-artifact` + `actions/deploy-pages`. Em *Settings → Pages*, escolha a fonte **GitHub Actions**.
- O jogo continua em `https://marcoschenkeljr.github.io/antigravity-game/`, fora de `/portfolio/`. Não crie rota nem pasta `antigravity-game` aqui.
