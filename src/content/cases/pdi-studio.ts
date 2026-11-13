/** Case 03 · PDI Studio (DESIGN.md §11.8). */
import { mediaCase as media } from '../media-case';
import type { TourScreen } from '../types';

export const serverNote = 'O servidor de processamento dorme quando ninguém usa. A primeira operação pode levar cerca de 50 segundos.';

export const symptom = {
  title: 'Sintoma',
  paragraphs: [
    [
      { t: 'Na disciplina de processamento de imagens, os exercícios viviam em scripts soltos: rodar, olhar o resultado, mudar um número, rodar de novo. Faltava um lugar para empilhar operações, comparar com o original e, principalmente, ' },
      { t: 'enxergar o algoritmo por trás de cada botão', b: true },
      { t: '.' },
    ],
  ],
};

export const diagnosis = [
  { title: 'Dois motores, de propósito', text: 'No servidor, as operações usam OpenCV e NumPy, porque é assim que se faz em produção: rápido e robusto. No arquivo que o estudante baixa, os mesmos algoritmos estão em Python puro, laço por laço, para estudar.' },
  { title: 'Camadas, como num editor de verdade', text: 'Cada operação vira uma camada. Dá para ligar, desligar e reordenar sem perder a imagem original.' },
];

export const tour = {
  title: 'Vista explodida',
  intro: 'O editor, peça por peça. Passe o cursor nos itens para localizar cada parte.',
  introTouch: 'Toque nos itens para localizar cada parte.',
  screens: [
    {
      id: 'editor',
      label: 'Editor',
      desktop: media.pdi.editor,
      frameLabel: 'pdistudio.vercel.app',
      pinsDesktop: [
        { x: 3, y: 8, title: 'Ferramentas', text: 'Transformações geométricas, filtros, morfologia e desafios.' },
        { x: 41, y: 50, title: 'Original e processada', text: 'Sempre lado a lado.' },
        { x: 90, y: 9, title: 'Propriedades', text: 'Os parâmetros da operação selecionada.' },
        { x: 90, y: 54, title: 'Camadas', text: 'A pilha de operações aplicadas.' },
      ],
    },
  ] as TourScreen[],
};

export const beforeAfter = {
  title: 'Teste de rodagem',
  heading: 'Arraste para comparar',
  original: 'Original',
  processed: 'Processada',
  sliderLabel: 'Divisor entre a imagem original e a processada',
  optionsLabel: 'Operação',
  pairs: [
    { id: 'cinza', label: 'Tons de cinza', before: media.pdi.ba.cinza[0], after: media.pdi.ba.cinza[1], note: 'Cada pixel vira uma média ponderada: Y = 0,299R + 0,587G + 0,114B.' },
    { id: 'bordas', label: 'Bordas (Sobel)', before: media.pdi.ba.bordas[0], after: media.pdi.ba.bordas[1], note: 'Filtro passa-alta de Sobel: realça onde a intensidade muda de repente.' },
    { id: 'limiar', label: 'Limiarização', before: media.pdi.ba.limiar[0], after: media.pdi.ba.limiar[1], note: 'Separa a imagem em preto e branco a partir de um limite.' },
    { id: 'afinamento', label: 'Afinamento (Steinfeld)', before: media.pdi.ba.afinamento[0], after: media.pdi.ba.afinamento[1], note: 'Erode, dilata e subtrai até sobrar só o esqueleto: as formas viram traços finos.' },
  ],
};

export const embed = {
  heading: 'O editor de verdade, aqui dentro',
  cta: 'Abrir o editor aqui',
  title: 'PDI Studio: editor de imagens',
  src: 'https://pdistudio.vercel.app',
  warming: 'Servidor acordando… ~50s',
  ready: 'Servidor pronto',
  down: 'Servidor indisponível agora. O comparador acima funciona sem ele.',
  smallScreen: 'O editor ao vivo aparece em telas a partir de 1024 px. Aqui, veja o editor em ação ou abra o PDI Studio em nova aba.',
  warmupUrl: 'https://pdi-studio-api.onrender.com/',
};

export const challenges = {
  title: 'Os cinco desafios',
  items: [
    { title: 'Relógio analógico', text: 'Encontra os ponteiros e lê a hora.', thumb: media.pdi.desafios.relogio },
    { title: 'Objetos coloridos', text: 'Separa e conta objetos pela cor.', thumb: media.pdi.desafios.objetos },
    { title: 'Letras', text: 'Isola e reconhece caracteres.', thumb: media.pdi.desafios.letras },
    { title: 'Placas', text: 'Localiza a placa na imagem.', thumb: media.pdi.desafios.placas },
    { title: 'Gráficos', text: 'Extrai os valores de um gráfico.', thumb: media.pdi.desafios.graficos },
  ],
};

export const delivery = {
  title: 'Entrega',
  heading: 'O exportador acadêmico',
  text: 'Ao salvar, o estudante baixa um arquivo .zip com a imagem original, a imagem processada e um arquivo Python com todos os algoritmos usados, comentados e sem biblioteca escondendo a conta.',
  filename: 'algoritmo_utilizado.py',
  codeCaption: 'Trecho real do arquivo exportado: o afinamento de Steinfeld, com a erosão feita laço por laço.',
};
