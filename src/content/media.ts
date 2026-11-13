/**
 * Registro de mídias (DESIGN.md §9.2 e §9.3).
 * Caminhos, dimensões e textos alternativos alinhados com public/media/manifest.json.
 * Se um arquivo faltar, os componentes de mídia mostram o palco neutro com a legenda.
 */
import type { ImageSource, VideoSource } from './types';
import { asset } from '../lib/paths';

export const DESKTOP = [960, 1600];
export const MOBILE = [390, 780];

export const img = (src: string, width: number, height: number, alt: string, widths = DESKTOP): ImageSource => ({
  kind: 'image',
  src,
  width,
  height,
  alt,
  widths,
});

export const clip = (src: string, width: number, height: number, alt: string, durationSec: number, posterWidths = [width]): VideoSource => ({
  kind: 'video',
  src,
  width,
  height,
  alt,
  durationSec,
  poster: img(`${src}-poster`, width, height, '', posterWidths),
});

export const W = asset('media/wms-pro');
export const P = asset('media/pdi-studio');
export const G = asset('media/antigravity');
export const L = asset('media/lab');

export const media = {
  wms: {
    painel: img(`${W}/painel`, 1280, 800, 'Painel "Visão geral do armazém" do WMS Pro com dados fictícios: 4 pallets aguardando endereçamento, 7 armazenados, 744 unidades e 6.080 kg em estoque, medidor de ocupação em 6% e gráfico de recebimentos dos últimos 7 dias. No topo, o indicador "Supabase online" e o usuário "Usuário Demo".'),
    painelClip: clip(`${W}/painel-clip`, 1280, 800, 'Clipe do painel do WMS Pro: o menu lateral desliza de Recebimento para Visão geral, os contadores sobem até 4, 7, 744 e 6.080, o cursor passa pelos indicadores e alterna o filtro de movimentações entre Em triagem, Armazenados e Todos (dados fictícios).', 8.1),
    painelColetor: img(`${W}/painel-coletor`, 390, 844, 'Painel do WMS Pro na tela do coletor (celular), com os indicadores de pallets e a barra de navegação inferior Início, Receber, Endereçar, Expedir e Consultar (dados fictícios).', MOBILE),
    coletorClip: clip(`${W}/coletor-clip`, 780, 1688, 'Clipe do Recebimento no coletor (celular): o código é lido, os dados do material se preenchem, a quantidade 40 é digitada e o pallet é registrado na triagem (dados fictícios).', 9.8),
  },
  pdi: {
    editor: img(`${P}/editor`, 1440, 900, 'Editor do PDI Studio (tema escuro) com uma imagem de teste sintética (engrenagens, montanhas e o texto "PDI Studio · Teste 01") à esquerda e, à direita, o resultado com detecção de bordas; o painel de camadas lista Passa Alta, Filtro Gauss e Tons de Cinza sobre a imagem original.'),
    editorClip: clip(`${P}/editor-clip`, 1280, 800, 'Clipe do PDI Studio: uma imagem de teste é aberta, o filtro Tons de Cinza é aplicado e depois o Passa Alta (bordas); as camadas aparecem na lista e a camada de bordas é desligada e religada, alternando o resultado entre cinza e bordas.', 13.9),
  },
  game: {
    menu: img(`${G}/menu`, 1440, 900, 'Tela inicial do jogo Antigravity em fundo espacial escuro: título "Antigravity · Asteroid Defense", botões Zen Mode, Chaotic Mode e Word Stats, e os recordes dos dois modos.'),
    jogoClip: clip(`${G}/jogo-clip`, 1280, 800, 'Clipe do modo Zen do Antigravity: asteroides com ícones de palavras em inglês descem em direção à nave; a cada palavra reconhecida, a nave dispara um laser, o asteroide explode e o contador "Streak" sobe de 0 a 3.', 11.6),
  },
  lab: {
    churn: img(`${L}/churn`, 960, 600, '', [480, 960]),
    dbtClip: clip(`${L}/dbt-metabase-clip`, 960, 600, 'Clipe do painel "Performance de E-commerce" no Metabase (projeto de Mário Schenkel): indicadores de receita, pedidos, ticket médio e cancelamento, gráficos de receita e pedidos por mês, top produtos e receita por categoria, com a tela rolando.', 8),
    anatel: img(`${L}/anatel`, 960, 600, '', [480, 960]),
  },
} as const;
