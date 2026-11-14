/** 03 · Laboratório de dados (DESIGN.md §11.10, com o crédito aprovado). */
import { media } from './media';
import type { MediaSource } from './types';

export interface LabItem {
  title: string;
  text: string;
  thumb: MediaSource;
  stack: string[];
  links: { label: string; href: string }[];
  author: string;
}

export const lab = {
  n: '03',
  label: 'Laboratório de dados',
  title: 'Projetos desenvolvidos em parceria com Mário Schenkel.',
  text: 'Três projetos de engenharia e análise de dados feitos em parceria com meu irmão, Mário Schenkel, analista de dados: um modelo de churn com painel, uma stack de dados com dbt e Metabase, e um BI com dados públicos da Anatel.',
  creditTitle: 'Parceria',
  credit: 'Projetos desenvolvidos em parceria com Mário Schenkel. Os repositórios ficam no GitHub dele.',
  creditLink: { label: 'Portfólio do Mário', href: 'https://schenkel94.github.io/portfolio/' },
  items: [
    {
      title: 'Previsão de churn',
      text: 'Modelo que estima a chance de cada cliente cancelar e um painel para priorizar a retenção.',
      thumb: media.lab.churn,
      stack: ['Python', 'Databricks', 'Dash'],
      links: [
        { label: 'Painel', href: 'https://churn-7uiy.onrender.com/dashboard/' },
        { label: 'Código', href: 'https://github.com/schenkel94/churn' },
      ],
      author: 'Em parceria com Mário Schenkel',
    },
    {
      title: 'Stack dbt + Metabase',
      text: 'Dados de e-commerce transformados e testados com dbt, guardados em DuckDB e apresentados no Metabase.',
      thumb: media.lab.dbtClip,
      stack: ['dbt', 'DuckDB', 'Metabase'],
      links: [{ label: 'Código', href: 'https://github.com/schenkel94/DBT-Metabase-Stack' }],
      author: 'Em parceria com Mário Schenkel',
    },
    {
      title: 'BI Anatel M2M',
      text: 'Análise dos acessos móveis entre máquinas no Brasil, a partir de dados públicos da Anatel.',
      thumb: media.lab.anatel,
      stack: ['Python', 'DuckDB', 'Metabase'],
      links: [{ label: 'Código', href: 'https://github.com/schenkel94/bi-anatel-m2m' }],
      author: 'Em parceria com Mário Schenkel',
    },
  ] as LabItem[],
};
