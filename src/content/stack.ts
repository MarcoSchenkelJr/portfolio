/** 04 · Stack e método (DESIGN.md §11.11). */
import type { CaseSlug } from './types';

export interface StackGroup {
  label: string;
  items: { name: string; usedIn: (CaseSlug | 'site')[] | 'all'; note?: string }[];
}

export const stackSection = {
  n: '04',
  label: 'Stack e método',
  title: 'Ferramentas na bancada.',
  usedIn: 'usado em:',
  studying: 'em estudo',
  all: 'todos os projetos',
  hint: 'Passe o cursor ou foque uma tecnologia para ver onde ela foi usada.',
  projectNames: { 'wms-pro': 'WMS Pro', 'wms-saas': 'WMS SaaS', 'pdi-studio': 'PDI Studio', antigravity: 'Antigravity', site: 'este site' } as Record<CaseSlug | 'site', string>,
  groups: [
    { label: 'Linguagens', items: [
      { name: 'TypeScript', usedIn: ['wms-pro', 'wms-saas', 'pdi-studio'] },
      { name: 'JavaScript', usedIn: ['antigravity'] },
      { name: 'Python', usedIn: ['pdi-studio'] },
      { name: 'SQL', usedIn: ['wms-pro', 'wms-saas'] },
      { name: 'Java', usedIn: [], note: 'em estudo' },
    ] },
    { label: 'Front-end', items: [
      { name: 'React', usedIn: ['wms-pro', 'wms-saas', 'pdi-studio'] },
      { name: 'HTML', usedIn: 'all' },
      { name: 'CSS', usedIn: 'all' },
      { name: 'Tailwind', usedIn: ['wms-pro', 'wms-saas'] },
      { name: 'Vite', usedIn: ['wms-pro', 'wms-saas', 'pdi-studio'] },
    ] },
    { label: 'Back-end', items: [
      { name: 'Node.js', usedIn: ['wms-pro', 'wms-saas'] },
      { name: 'Express', usedIn: ['wms-saas'] },
      { name: 'NestJS', usedIn: ['wms-pro'] },
      { name: 'FastAPI', usedIn: ['pdi-studio'] },
    ] },
    { label: 'Dados e imagem', items: [
      { name: 'PostgreSQL', usedIn: ['wms-pro', 'wms-saas'] },
      { name: 'Supabase', usedIn: ['wms-pro', 'wms-saas'] },
      { name: 'Oracle SQL', usedIn: [], note: 'fora dos projetos deste site' },
      { name: 'JSON', usedIn: ['wms-pro', 'wms-saas', 'pdi-studio'] },
      { name: 'OpenCV', usedIn: ['pdi-studio'] },
      { name: 'NumPy', usedIn: ['pdi-studio'] },
    ] },
    { label: 'Entrega', items: [
      { name: 'Vercel', usedIn: ['wms-pro', 'wms-saas', 'pdi-studio'] },
      { name: 'Render', usedIn: ['pdi-studio'] },
      { name: 'GitHub Pages', usedIn: ['antigravity', 'site'] },
    ] },
    { label: 'Ambiente e método', items: [
      { name: 'Linux', usedIn: 'all' },
      { name: 'Git e GitHub', usedIn: 'all' },
      { name: 'Kanban e Scrum', usedIn: [], note: 'organização do trabalho' },
      { name: 'ERP SAP', usedIn: [], note: 'no dia a dia da operação logística' },
    ] },
  ] as StackGroup[],
  principles: [
    { n: '01', title: 'Sintoma antes da peça', text: 'Entendo o problema de quem usa antes de escolher a tecnologia.' },
    { n: '02', title: 'Testar onde vai rodar', text: 'Se o sistema é para um coletor, eu testo no coletor. Tela de desenvolvedor engana.' },
    { n: '03', title: 'Entregar pequeno, sempre', text: 'Setenta e cinco commits em quinze dias: prefiro muitas entregas curtas a uma grande que ninguém viu funcionar.' },
  ],
};
