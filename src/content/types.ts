export type CaseSlug = 'wms-pro' | 'wms-saas' | 'pdi-studio' | 'antigravity';
export type Category = 'sistemas' | 'visao' | 'jogos' | 'no-ar';
export type Status = 'producao' | 'no-ar' | 'construcao';

/** Imagem publicada em várias larguras: `${src}-${w}.avif|webp`. */
export interface ImageSource {
  kind: 'image';
  /** base sem extensão nem largura: "/media/wms-pro/painel" */
  src: string;
  width: number;
  height: number;
  /** obrigatório; "" só se decorativo */
  alt: string;
  /** larguras publicadas, da menor para a maior */
  widths: number[];
}

/** Clipe em laço: `${src}.webm` + `${src}.mp4`, com pôster em imagem. */
export interface VideoSource {
  kind: 'video';
  /** base sem extensão: "/media/wms-pro/painel-clip" */
  src: string;
  width: number;
  height: number;
  /** roteiro em uma frase, usado como aria-label */
  alt: string;
  poster: ImageSource;
  durationSec?: number;
}

export type MediaSource = ImageSource | VideoSource;

export interface Metric {
  value: string;
  label: string;
  countTo?: number;
  unit?: string;
  detail?: string;
}

/** x, y em % da captura */
export interface PinData {
  x: number;
  y: number;
  title: string;
  text: string;
  side?: 'left' | 'right';
}

export interface TourScreen {
  id: string;
  label: string;
  desktop?: ImageSource;
  mobile?: ImageSource;
  pinsDesktop?: PinData[];
  pinsMobile?: PinData[];
  /** rótulo da barra da moldura */
  frameLabel?: string;
}

export interface SpecItem {
  label: string;
  value: string;
  note?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

/** Dados leves do case: entram no bundle da home (cartões) e no topo do detalhe. */
export interface CaseMeta {
  slug: CaseSlug;
  index: number;
  title: string;
  /** título do cartão quando difere (teaser) */
  cardTitle?: string;
  summary: string;
  cardText: string;
  status: Status;
  statusLabel: string;
  privateCode: boolean;
  categories: Category[];
  version?: string;
  /** capa do cartão e do detalhe (o WMS SaaS não tem) */
  cover?: MediaSource;
  /** clipe que toca na capa (hover no cartão, em laço no detalhe) */
  coverClip?: VideoSource;
  coverFrameLabel: string;
  /** legenda do palco no cartão: "case 01 · em produção" */
  cardStageTag: [string, string];
  /** legenda do palco no detalhe */
  heroFigure: [string, string, string?];
  cardPins?: PinData[];
  cardMetrics?: [Metric, Metric, Metric];
  teaserLine?: string;
  /** etiquetas do cartão */
  cardStack: string[];
  /** etiquetas do detalhe */
  stack: string[];
  links: { live?: LinkItem; repo?: LinkItem; cardExternal?: LinkItem };
  /** aviso no topo do detalhe: nota discreta ou aviso tracejado */
  heroNote?: { text: string; tone: 'note' | 'notice' };
  spec: SpecItem[];
  seo: CaseSeo;
}

export interface CaseSeo {
  title: string;
  description: string;
  ogImage: string;
  path: string;
  schemaType: 'CreativeWork' | 'SoftwareApplication';
  liveUrl?: string;
}

export interface SprintState {
  n: number;
  title: string;
  state: 'done' | 'doing' | 'todo';
}
