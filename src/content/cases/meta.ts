/**
 * Dados leves dos quatro cases (cartões da home e topo do detalhe).
 * O texto completo de cada case fica em ./<slug>.ts e só carrega com a página do case.
 */
import seo from '../seo.json';
import { media } from '../media';
import type { CaseMeta, CaseSeo, CaseSlug, SprintState } from '../types';

const seoOf = (slug: CaseSlug): CaseSeo => {
  const r = seo.routes[slug] as (typeof seo.routes)['pdi-studio'] | (typeof seo.routes)['wms-pro'];
  return {
    title: r.title,
    description: r.description,
    ogImage: r.ogImage,
    path: r.path,
    schemaType: r.schemaType as CaseSeo['schemaType'],
    liveUrl: 'liveUrl' in r ? r.liveUrl : undefined,
  };
};

export const wmsPro: CaseMeta = {
  slug: 'wms-pro',
  index: 1,
  title: 'WMS Pro',
  summary: 'Sistema de gestão de armazém que roda no coletor de código de barras, no celular e no computador, com ou sem internet.',
  cardText:
    'Gestão de armazém de ponta a ponta: recebimento com leitura contínua pelo coletor industrial, conferência de volumes por pallet, endereçamento, expedição e painel de ocupação. Continua operando sem internet e sincroniza quando a rede volta.',
  status: 'producao',
  statusLabel: 'Em produção',
  privateCode: true,
  categories: ['sistemas', 'no-ar'],
  version: 'v1.2',
  cover: media.wms.painel,
  coverClip: media.wms.painelClip,
  coverFrameLabel: 'wms pro · painel · dados fictícios',
  cardStageTag: ['case 01 · ', 'em produção', ' · painel + coletor · dados fictícios'],
  heroFigure: ['fig. 01 · ', 'painel animado', ' · dados fictícios'],
  cardPins: [
    { x: 33, y: 38, title: 'KPIs do turno', text: '' },
    { x: 36, y: 66, title: 'Ocupação por posição', text: '' },
    { x: 74, y: 93, title: 'Mesma tela no coletor', text: '', side: 'left' },
  ],
  cardMetrics: [
    { value: '504', countTo: 504, label: 'posições de armazém mapeadas' },
    { value: '75', countTo: 75, label: 'commits em 15 dias, de 22/10 a 05/11/2026' },
    { value: 'v1.2', label: 'versão em operação real' },
    { value: 'Offline', label: 'fila de sincronização' },
  ],
  feature: {
    label: 'Meu melhor projeto',
    claim: [{ t: 'Software que aguenta o ' }, { t: 'chão de fábrica.', a: true }],
  },
  cardStack: ['React 19', 'TypeScript', 'Tailwind v4', 'Supabase', 'Vercel', 'NestJS'],
  stack: ['React 19', 'Vite 8', 'TypeScript', 'Tailwind v4', 'React Router 7', 'Supabase', 'Vercel', 'NestJS'],
  links: {
    live: { label: 'Sistema em produção · acesso restrito', href: 'https://wms-project-sigma.vercel.app/#/login' },
  },
  spec: [
    { label: 'Papel', value: 'Projeto, arquitetura e código', note: 'desenvolvimento solo' },
    { label: 'Período', value: '22/10 a 05/11/2026', note: '75 commits · versão 1.2' },
    { label: 'Onde roda', value: 'Honeywell ScanPal EDA52', note: 'e também celular e desktop' },
    { label: 'Dados e deploy', value: 'Supabase (PostgreSQL)', note: 'API serverless na Vercel' },
  ],
  seo: seoOf('wms-pro'),
};

export const wmsSaas: CaseMeta = {
  slug: 'wms-saas',
  index: 2,
  title: 'WMS SaaS',
  cardTitle: 'WMS SaaS · a próxima revisão',
  summary: 'A segunda versão do WMS: uma única instalação para várias empresas, com os dados de cada uma isolados no banco.',
  cardText: 'O mesmo WMS, agora para várias empresas ao mesmo tempo. Cada uma enxerga só os próprios dados, e a regra de isolamento vive no banco.',
  status: 'construcao',
  statusLabel: 'Em construção',
  privateCode: true,
  categories: ['sistemas'],
  coverFrameLabel: 'wms saas · isolamento',
  cardStageTag: ['case 02 · ', 'em construção'],
  heroFigure: ['fig. 01 · ', 'isolamento por empresa'],
  teaserLine: 'Multi-tenant · RLS · PIN por operador · FIFO/FEFO/LIFO',
  cardStack: ['PostgreSQL', 'Supabase', 'Express', 'React'],
  heroNote: { tone: 'notice', text: 'Este projeto está em andamento. O que aparece aqui é o desenho e o que já foi entregue, sem telas finais.' },
  stack: ['PostgreSQL', 'Supabase', 'Express', 'React', 'TypeScript', 'Vercel'],
  links: {},
  spec: [
    { label: 'Papel', value: 'Arquitetura e desenvolvimento' },
    { label: 'Estado', value: 'Sprints 0 a 2 concluídas', note: 'sprint 3 em andamento' },
    { label: 'Banco', value: 'PostgreSQL com RLS', note: 'chaves compostas por empresa' },
    { label: 'Servidor', value: 'Express serverless', note: 'Vercel' },
  ],
  seo: seoOf('wms-saas'),
};

export const pdiStudio: CaseMeta = {
  slug: 'pdi-studio',
  index: 3,
  title: 'PDI Studio',
  summary: 'Editor web de processamento digital de imagens com camadas, feito para aprender os algoritmos e não só aplicar os filtros.',
  cardText:
    'Editor web de processamento digital de imagens com camadas. Filtros, morfologia e cinco desafios de visão computacional, com exportação dos algoritmos em Python puro.',
  status: 'no-ar',
  statusLabel: 'No ar',
  privateCode: false,
  categories: ['visao', 'no-ar'],
  cover: media.pdi.editor,
  coverClip: media.pdi.editorClip,
  coverFrameLabel: 'pdistudio.vercel.app',
  cardStageTag: ['case 03 · ', 'no ar'],
  heroFigure: ['fig. 01 · ', 'editor', ' · camadas'],
  cardMetrics: [
    { value: '5', label: 'desafios de visão' },
    { value: '3', label: 'algoritmos de afinamento' },
    { value: '.zip', label: 'exportador acadêmico' },
  ],
  cardStack: ['React', 'FastAPI', 'OpenCV', 'NumPy'],
  heroNote: { tone: 'note', text: 'O servidor de processamento dorme quando ninguém usa. A primeira operação pode levar cerca de 50 segundos.' },
  stack: ['React', 'TypeScript', 'FastAPI', 'OpenCV', 'NumPy', 'Vercel', 'Render'],
  links: {
    live: { label: 'Abrir o PDI Studio', href: 'https://pdistudio.vercel.app' },
    repo: { label: 'Ver o código', href: 'https://github.com/MarcoSchenkelJr/PDI_STUDIO' },
    cardExternal: { label: 'pdistudio.vercel.app', href: 'https://pdistudio.vercel.app' },
  },
  spec: [
    { label: 'Contexto', value: 'Projeto acadêmico', note: 'disciplina de PDI · Feevale' },
    { label: 'Interface', value: 'React + TypeScript', note: 'Vercel' },
    { label: 'Processamento', value: 'FastAPI + OpenCV', note: 'Render' },
    { label: 'Código', value: 'Aberto', note: 'GitHub' },
  ],
  seo: seoOf('pdi-studio'),
};

export const antigravity: CaseMeta = {
  slug: 'antigravity',
  index: 4,
  title: 'Antigravity',
  summary: 'Um jogo de navegador para treinar pronúncia em inglês: a arma é a sua voz.',
  cardText:
    'Jogo de pronúncia em inglês: você fala a palavra no microfone e a nave destrói o asteroide. Reconhecimento de voz no navegador, sem servidor.',
  status: 'no-ar',
  statusLabel: 'No ar',
  privateCode: false,
  categories: ['jogos', 'no-ar'],
  cover: media.game.menu,
  coverClip: media.game.jogoClip,
  coverFrameLabel: 'antigravity · asteroid defense',
  cardStageTag: ['case 04 · ', 'jogável aqui'],
  heroFigure: ['fig. 01 · ', 'modo zen', ' · em jogo'],
  cardMetrics: [
    { value: '2', label: 'modos de jogo' },
    { value: '0', label: 'dependências' },
    { value: 'Voz', label: 'Web Speech API' },
  ],
  cardStack: ['JavaScript', 'Canvas 2D', 'Web Speech API'],
  stack: ['JavaScript', 'Canvas 2D', 'Web Speech API', 'GitHub Pages'],
  links: {
    live: { label: 'Jogar em tela cheia', href: 'https://marcoschenkeljr.github.io/antigravity-game/' },
    repo: { label: 'Ver o código', href: 'https://github.com/MarcoSchenkelJr/antigravity-game' },
    cardExternal: { label: 'jogar', href: 'https://marcoschenkeljr.github.io/antigravity-game/' },
  },
  spec: [
    { label: 'Tipo', value: 'Jogo de navegador', note: 'desktop e celular' },
    { label: 'Voz', value: 'Web Speech API', note: 'inglês (en-US)' },
    { label: 'Gráficos', value: 'Canvas 2D', note: 'sem biblioteca' },
    { label: 'Código', value: 'Aberto', note: 'JavaScript puro' },
  ],
  seo: seoOf('antigravity'),
};

export const cases: CaseMeta[] = [wmsPro, wmsSaas, pdiStudio, antigravity];
export const caseBySlug = Object.fromEntries(cases.map((c) => [c.slug, c])) as Record<CaseSlug, CaseMeta>;
export const isCaseSlug = (s: string | undefined): s is CaseSlug => !!s && s in caseBySlug;

export const sprints: SprintState[] = [
  { n: 0, title: 'Estrutura do projeto e modelo de empresas e usuários', state: 'done' },
  { n: 1, title: 'API com verificação de empresa e troca de operador por PIN', state: 'done' },
  { n: 2, title: 'Cadastro de empresas, armazéns e construtor de endereços em 5 níveis', state: 'done' },
  { n: 3, title: 'Recebimento com leitor a laser e câmera, e folha de identificação do pallet', state: 'doing' },
  { n: 4, title: 'Endereçamento rápido, busca de material e painel', state: 'todo' },
  { n: 5, title: 'Expedição com reserva automática, rota de separação e inventário cego', state: 'todo' },
  { n: 6, title: 'Migração assistida de dados de sistemas anteriores', state: 'todo' },
];
export const sprintSummary = 'Sprints 0 a 2 concluídas · 3 em andamento';
