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
    'Desenvolvedor full stack e estudante de Ciência da Computação. Criei um sistema de gestão de armazém e automações de processo que rodam em uma operação logística industrial real, e atendo como freelancer desde 2025.',
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
    { t: ', desenvolvedor full stack e estudante de Ciência da Computação. Criei o WMS e as automações que hoje rodam na ' },
    { t: 'operação logística industrial', b: true },
    { t: ' onde trabalho, e atendo como freelancer desde 2025. O método vem da oficina: ouvir o sintoma, achar a causa, só então trocar a peça.' },
  ],
  ctaPrimary: 'Ver o case WMS Pro',
  ctaSecondary: 'Todos os projetos',
  whoamiPrompt: 'whoami',
  whoami: 'ciência da computação · feevale | técnico em informática · certificado em mecânica automotiva | full stack freelancer desde 2025',
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
  'TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'React', 'Tailwind', 'Vite', 'FastAPI', 'OpenCV',
  'NumPy', 'Node.js', 'Express', 'NestJS', 'Supabase', 'PostgreSQL', 'Vercel', 'Render', 'Linux', 'Git',
];

export const about = {
  n: '01',
  label: 'Sobre',
  title: 'Quem escreve o código conhece a operação.',
  /** parágrafos com trechos em negrito (`b: true`) */
  paragraphs: [
    [
      { t: 'Sou desenvolvedor full stack e estudo Ciência da Computação na Universidade Feevale. Há mais de dez anos trabalho dentro de uma ' },
      { t: 'operação logística industrial', b: true },
      { t: ': ERP SAP, integridade de dados de estoque, processos que não podem parar e decisões tomadas sob pressão, com prestadores e prazos do outro lado da mesa.' },
    ],
    [
      { t: 'Foi ali que o código deixou de ser estudo e virou ferramenta. Vi de perto onde o processo travava e ' },
      { t: 'criei o WMS Pro e outras automações de processo para a empresa onde trabalho', b: true },
      { t: '. Hoje o WMS roda em operação real, no coletor, na mão de quem confere os pallets.' },
    ],
    [
      { t: 'Desde 2025 também atendo como freelancer: frontend e backend para pequenas empresas e clientes particulares, integrações com inteligência artificial e correção de bugs em produção. Agora procuro meu lugar num time de tecnologia, onde essa bagagem de operação vire software melhor.' },
    ],
  ] as { t: string; b?: boolean }[][],
  /** linha curta e humana depois dos parágrafos */
  aside: 'Nas horas vagas mexo em carro antigo (tenho certificado em mecânica automotiva, um Gol e um Fusca na garagem) e levo de lá o método: ouvir o sintoma, achar a causa, só então trocar a peça.',
  /** ficha técnica do Sobre */
  facts: [
    { label: 'Base', value: 'RS, Brasil' },
    { label: 'Formação', value: 'Ciência da Computação', note: 'Feevale · previsão 12/2028' },
    { label: 'Idiomas', value: 'Inglês e espanhol', note: 'intermediário · leitura técnica e escrita em inglês' },
    { label: 'Perfil', value: 'Analítico', note: 'comunicação para negociações complexas, foco em entregar resultado e gosto por ambiente colaborativo' },
  ],
  ctas: { case: 'Ver o case WMS Pro', linkedin: 'LinkedIn', email: 'E-mail' },
  experienceTitle: 'Experiência',
  educationTitle: 'Formação',
  certsTitle: 'Certificações',
  languagesTitle: 'Idiomas',
  /** ordem de serviço da carreira: `weight` controla o peso visual */
  experience: [
    {
      period: '2026 · em operação',
      title: 'WMS Pro e automações de processo',
      org: 'Para a empresa do setor industrial onde trabalho',
      weight: 'strong' as const,
      current: true,
      items: [
        'Sistema de gestão de armazém completo: recebimento, endereçamento, expedição e painel, no coletor e sem depender da rede.',
        'Outras automações de processo criadas no mesmo contexto.',
      ],
      link: { label: 'Ver o case WMS Pro', slug: 'wms-pro' as const },
    },
    {
      period: '01/2025 – atual',
      title: 'Desenvolvedor full stack · freelancer',
      org: 'Remoto',
      weight: 'strong' as const,
      items: [
        'Desenvolvimento e manutenção de frontend e backend com boas práticas e padrões de projeto.',
        'Otimização de integrações e ferramentas com inteligência artificial.',
        'Dados estruturados em JSON e lógicas complexas.',
        'Correção de bugs em produção, para pequenas empresas e clientes particulares.',
      ],
    },
    {
      period: '05/2016 – atual',
      title: 'Operações logísticas e sistemas internos',
      org: 'Empresa do setor industrial',
      weight: 'muted' as const,
      items: [
        'Operação diária de WMS com ERP SAP e integridade de dados.',
        'Otimização de processos, negociação operacional e resolução de conflitos com prestadores.',
        'Decisão sob pressão.',
      ],
    },
  ],
  education: [
    { period: '02/2023 – 12/2028 (previsto)', title: 'Ciência da Computação', org: 'Universidade Feevale · bacharelado', current: true },
    { period: 'concluído em 12/2015', title: 'Técnico em Informática', org: 'Escola de Educação Profissional Informatize' },
    { period: 'até 12/2018', title: 'Engenharia Eletrônica', org: 'Unisinos · bacharelado não concluído', discreet: true },
  ],
  certifications: [
    { title: 'CCNA: Introdução às Redes', date: '07/2024' },
    { title: 'MTA: Introduction to Programming Using Python', date: '12/2023', lang: 'en' },
    { title: 'Mecânica Automotiva', date: '12/2022' },
    { title: 'Injeção Eletrônica', date: '01/2018' },
  ],
  languages: [
    { title: 'Inglês', level: 'intermediário · leitura técnica e escrita' },
    { title: 'Espanhol', level: 'intermediário' },
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
  email: 'marco.a.schenkel@gmail.com' as string | undefined,
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
