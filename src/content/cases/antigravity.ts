/** Case 04 · Antigravity (DESIGN.md §11.9). */
import { mediaCase as media } from '../media-case';

export const symptom = {
  title: 'Sintoma',
  paragraphs: [
    [
      { t: 'Treinar pronúncia sozinho é chato e não dá retorno: você fala, e ninguém diz se entendeu. Eu queria um jeito de praticar em que ' },
      { t: 'errar tivesse consequência imediata e acertar desse vontade de continuar', b: true },
      { t: '.' },
    ],
  ],
};

export const diagnosis = [
  { title: 'O navegador já sabe ouvir', text: 'A Web Speech API transcreve a fala no próprio navegador. O jogo normaliza o que foi reconhecido e compara com as palavras dos asteroides na tela.' },
  { title: 'Sem framework, de propósito', text: 'Nave, asteroide, laser e partículas são classes em JavaScript puro, desenhadas num canvas a cada quadro. O jogo inteiro cabe em um arquivo HTML e um JS.' },
];

export const game = {
  title: 'Teste de rodagem',
  cta: 'Jogar aqui',
  iframeTitle: 'Antigravity: jogo de pronúncia em inglês',
  src: 'https://marcoschenkeljr.github.io/antigravity-game/',
  note: 'O navegador vai pedir acesso ao microfone. Nada é gravado nem enviado.',
  unsupported: 'O reconhecimento de voz precisa do Chrome ou do Edge. Veja o jogo em ação ou abra no Chrome.',
  mobile: 'Jogar em tela cheia',
  mobileNote: 'No celular, o jogo abre em tela cheia, onde joga melhor.',
  poster: media.game.menu,
  clip: media.game.jogoClip,
};

export const speech = {
  heading: 'Teste a ideia em dez segundos',
  button: 'Falar',
  listening: 'Ouvindo…',
  heard: 'Entendi:',
  success: 'Isso!',
  say: 'Diga:',
  denied: 'Sem acesso ao microfone. Libere a permissão no navegador para testar.',
  words: ['rocket', 'planet', 'gravity', 'shield', 'engine'],
};

export const delivery = {
  title: 'Entrega',
  heading: 'O que está no ar',
  items: [
    { title: 'Dois modos', text: 'Zen, um asteroide por vez. Caótico, uma onda que acelera.' },
    { title: 'Estatísticas por palavra', text: 'O jogo guarda acertos e erros e mostra o que você precisa treinar.' },
    { title: 'Recordes', text: 'A melhor pontuação de cada modo fica salva no navegador.' },
    { title: 'Celular', text: 'Escala e microfone ajustados para tela em pé.' },
  ],
  stats: media.game.estatisticas,
};
