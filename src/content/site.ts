/**
 * Textos da home, links e dados de contato (DESIGN.md §11).
 *
 * Para acrescentar depois, sem mexer em componente nenhum:
 *  - e-mail:     preencha `contact.email` (aparece na lista de contato com o botão Copiar);
 *  - currículo:  coloque o PDF em public/ e preencha `contact.resume` (aparece no Contato e no Sobre);
 *  - foto:       coloque a imagem em public/media/sobre/ e preencha `about.photo` (substitui o monograma).
 */
import type { ImageSource, Metric } from './types';

export const links = {
  linkedin: 'https://www.linkedin.com/in/marcoschenkel/',
  github: 'https://github.com/MarcoSchenkelJr',
  siteRepo: 'https://github.com/MarcoSchenkelJr/portfolio',
} as const;

export const site = {
  name: 'Marco Schenkel Jr.',
  url: 'https://marcoschenkeljr.github.io/portfolio',
  brand: { prefix: '~/', full: 'marco-schenkel-jr', short: 'marco-schenkel' },
  title: 'Marco Schenkel Jr. · Desenvolvedor full stack',
  description:
    'Desenvolvedor full stack e estudante de Ciência da Computação. Criei um sistema de gestão de armazém que roda em operação industrial real, com coletor de código de barras e modo offline.',
  ogImage: 'media/og/home.png',
};

export const nav = {
  items: [
    { id: 'sobre', n: '01', label: 'Sobre' },
    { id: 'projetos', n: '02', label: 'Projetos' },
    { id: 'dados', n: '03', label: 'Laboratório' },
    { id: 'stack', n: '04', label: 'Stack' },
    { id: 'contato', n: '05', label: 'Contato' },
  ],
  cta: 'Falar comigo',
  skip: 'Ir para o conteúdo',
  themeToDark: 'Mudar para o tema escuro',
  themeToLight: 'Mudar para o tema claro',
  menuOpen: 'Abrir o menu',
  menuClose: 'Fechar o menu',
};

export const hero = {
  availability: 'Disponível para estágio e vaga júnior',
  /** linhas do título; `a: true` = trecho em zarcão */
  titleLines: [
    [{ t: 'Software que' }],
    [{ t: 'aguenta o ' }, { t: 'chão', a: true }],
    [{ t: 'de fábrica.', a: true }],
  ] as { t: string; a?: boolean }[][],
  title: 'Software que aguenta o chão de fábrica.',
  lead: [
    { t: 'Sou o ' },
    { t: 'Marco Schenkel Jr.', b: true },
    { t: ', desenvolvedor full stack e estudante de Ciência da Computação. Antes do código eu consertava motor, e o método ficou: ouvir o sintoma, achar a causa, só então trocar a peça. Meu sistema de armazém roda hoje em uma ' },
    { t: 'operação industrial real', b: true },
    { t: '.' },
  ],
  ctaPrimary: 'Ver o case WMS Pro',
  ctaSecondary: 'Todos os projetos',
  whoamiPrompt: 'whoami',
  whoami: 'ciência da computação · feevale | técnico em mecânica automotiva | linux no dia a dia',
  figure: ['fig. 01 · ', 'wms pro', ' · painel + coletor'],
  frameLabel: 'wms pro · demonstração',
  stageLabel: 'Telas do WMS Pro: painel no computador e no coletor',
  pins: [
    { x: 33, y: 38, title: 'KPIs do turno' },
    { x: 36, y: 66, title: 'Ocupação por posição' },
    { x: 74, y: 93, title: 'Mesma tela no coletor', side: 'left' as const },
  ],
};

export const metrics: Metric[] = [
  { label: 'Em produção', value: '1', detail: 'sistema rodando em operação industrial real' },
  { label: 'Endereçamento', value: '504', countTo: 504, detail: 'posições de armazém mapeadas no WMS' },
  { label: 'Ritmo', value: '75', countTo: 75, unit: 'commits', detail: 'em 15 dias, de 22/10 a 05/11/2026' },
  { label: 'No ar', value: '3', detail: 'projetos com link para testar agora' },
];

export const techs = [
  'Python', 'Java', 'SQL', 'TypeScript', 'React', 'Tailwind', 'Vite', 'FastAPI', 'OpenCV',
  'NumPy', 'Node.js', 'Express', 'NestJS', 'Supabase', 'PostgreSQL', 'Vercel', 'Render', 'Linux',
];

export const about = {
  n: '01',
  label: 'Sobre',
  title: 'Da bancada ao terminal.',
  paragraphs: [
    'Me formei em mecânica automotiva e passei anos com a mão no motor. Na oficina, ninguém troca peça no chute: você escuta, mede, isola a causa e só depois abre. Quando comecei a programar, percebi que depurar um sistema é o mesmo trabalho com outra ferramenta.',
    'Hoje curso Ciência da Computação na Universidade Feevale e trabalho no Linux, pelo terminal. Gosto de problema que tem chão: gente usando, equipamento de verdade, rede que cai.',
    'Nas horas vagas ainda mexo em carro antigo. Tenho um Gol e um Fusca na garagem, e os dois me lembram que coisa bem-feita é a que continua funcionando.',
  ],
  timeline: [
    { title: 'Mecânica automotiva', text: 'Formação técnica e anos de bancada. Diagnóstico antes de qualquer conserto.' },
    { title: 'Ciência da Computação · Feevale', text: 'Em curso. Algoritmos, banco de dados, processamento de imagens.' },
    { title: 'Primeiros projetos no ar', text: 'PDI Studio, um editor de imagens, e Antigravity, um jogo controlado por voz.' },
    { title: 'WMS Pro em produção', text: 'Um sistema de armazém usado todos os dias em uma operação industrial real.', current: true },
  ],
  figure: 'fig. 02 · marco',
  /** Sem foto por enquanto: o Sobre mostra o monograma. */
  photo: undefined as ImageSource | undefined,
  monogram: 'MS',
};

export const projectsSection = {
  n: '02',
  label: 'Projetos',
  title: 'Um sistema em produção e o que veio antes dele.',
  lead: 'Cada cartão abre uma ordem de serviço completa: o sintoma, o diagnóstico, o que foi feito e o que dá para testar ao vivo.',
  filterLabel: 'Filtrar projetos por categoria',
  filters: [
    { value: 'all', label: 'Todos' },
    { value: 'sistemas', label: 'Sistemas' },
    { value: 'visao', label: 'Visão computacional' },
    { value: 'jogos', label: 'Jogos' },
    { value: 'no-ar', label: 'No ar' },
  ] as const,
  open: 'Abrir o case',
  openTeaser: 'Ver o que vem aí',
  announce: (n: number) => (n === 1 ? '1 projeto' : `${n} projetos`),
};

export const contact = {
  n: '05',
  label: 'Contato',
  title: 'Tem um problema que precisa de diagnóstico?',
  text: 'Procuro estágio ou vaga júnior em desenvolvimento. Se o seu time tem um sistema para construir ou um defeito difícil de achar, me chame.',
  cta: { label: 'Chamar no LinkedIn', href: links.linkedin },
  items: [
    { label: 'LinkedIn', value: '/in/marcoschenkel', href: links.linkedin },
    { label: 'GitHub', value: '/MarcoSchenkelJr', href: links.github },
  ],
  /** Preencha para exibir. Ex.: 'marco@exemplo.com' */
  email: undefined as string | undefined,
  /** Preencha para exibir. Ex.: { href: '/curriculo-marco-schenkel-jr.pdf' } */
  resume: undefined as { href: string } | undefined,
};

export const footer = {
  copyright: '© 2026 Marco Schenkel Jr.',
  madeWith: 'Feito com React, Vite e Motion.',
  repoLabel: 'Código deste site',
};

export const notFound = {
  title: 'Esse endereço não existe.',
  text: 'O link pode estar errado ou a página mudou de lugar.',
  cta: 'Voltar ao início',
  seoTitle: 'Página não encontrada · Marco Schenkel Jr.',
};
