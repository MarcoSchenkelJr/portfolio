/** Case 01 · WMS Pro (DESIGN.md §11.6, com a terminologia nova do sistema). */
import { mediaCase as media } from '../media-case';
import type { PinData, TourScreen } from '../types';

/**
 * Demonstração com login de convidado (DESIGN.md §11.6).
 * Vazio = caixa "Em breve". Preenchendo as três variáveis, o botão ativa sozinho.
 */
export const demo: { url?: string; user?: string; password?: string } = {
  url: undefined,
  user: undefined,
  password: undefined,
};

export const demoText = {
  title: 'Demonstração com login de convidado',
  soon: 'Em breve',
  pending: 'Estou preparando um acesso de convidado com dados fictícios. Enquanto isso, use o simulador mais abaixo.',
  ready: 'Ambiente de demonstração com dados fictícios. O que você fizer ali não afeta a operação real.',
  button: 'Abrir a demonstração',
  url: 'endereço',
  user: 'usuário',
  password: 'senha',
};

export const symptom = {
  title: 'Sintoma',
  paragraphs: [
    [
      { t: 'No armazém, cada pallet que chega precisa ser conferido, contado e guardado em um endereço. Quando isso depende de papel e memória, ' },
      { t: 'o estoque do sistema deixa de bater com o estoque da prateleira', b: true },
      { t: '.' },
    ],
    [{ t: 'O coletor estava lá, a rede nem sempre. O sistema precisava funcionar com o gatilho do leitor, na mão de quem está com luva, e não podia parar quando o sinal caísse.' }],
  ],
};

export const diagnosis = [
  { title: 'O gatilho é o teclado', text: 'O leitor do coletor se comporta como um teclado muito rápido. A tela de Recebimento mantém o campo de leitura sempre em foco e trata cada disparo como uma etiqueta inteira, sem ninguém tocar na tela.' },
  { title: 'A rede vai cair', text: 'Em vez de torcer para o sinal aguentar, cada leitura é gravada primeiro no próprio aparelho e entra numa fila. Quando a conexão volta, a fila sobe sozinha para o banco.' },
  { title: 'Quem conta é a pessoa', text: 'O sistema reconhece o material, mas não confia na etiqueta para a quantidade. O pallet só é salvo depois que o conferente informa o total de volumes.' },
];

// Coordenadas em % das capturas atuais (painel-1600, entrada-1600 etc., redesign do WMS).
const pinsPainel: PinData[] = [
  { x: 38, y: 34, title: 'KPIs do turno', text: 'Pallets aguardando endereçamento, armazenados, unidades e peso em estoque.' },
  { x: 31, y: 74, title: 'Ocupação física', text: 'Medidor em meia-lua com as posições ocupadas, em triagem e livres.' },
  { x: 76, y: 74, title: 'Recebimentos em 7 dias', text: 'Pallets recebidos por dia, comparados com a semana anterior.' },
  { x: 77, y: 21, title: 'Interruptor de atualização', text: 'Liga a atualização automática do painel, no estilo dos interruptores do iOS.' },
  { x: 76, y: 4, title: 'Estado da conexão', text: 'Mostra se o coletor está online ou gravando localmente.' },
];
const pinsRecebimento: PinData[] = [
  { x: 35, y: 21, title: 'Código lido pelo gatilho', text: 'O leitor do coletor escreve o código direto no campo. Não precisa tocar na tela.' },
  { x: 66, y: 9, title: 'Material identificado', text: 'SKU, lote e descrição saem da etiqueta lida e do cadastro.' },
  { x: 47, y: 70, title: 'Conferência obrigatória', text: 'O pallet só é registrado depois que alguém conta e informa a quantidade.' },
  { x: 61, y: 87, title: 'Registrar recebimento', text: 'O pallet entra na fila "Aguardando endereçamento".' },
];
const pinsEnderecamento: PinData[] = [
  { x: 35, y: 33, title: 'Aguardando endereçamento', text: 'Tudo o que foi conferido e ainda não tem lugar.' },
  { x: 57, y: 41, title: 'Leitura por câmera', text: 'No celular, a câmera faz o papel do leitor para escolher o pallet.' },
  { x: 82, y: 73, title: 'Endereço de destino', text: 'São 504 posições. O código digitado vira corredor, estante, andar e box.' },
  { x: 82, y: 92, title: 'Posições frequentes', text: 'Atalhos para os endereços mais usados no turno.' },
];
const pinsExpedicao: PinData[] = [
  { x: 34, y: 52, title: 'Controle segmentado', text: 'Alterna entre os pallets prontos para expedição e o histórico.' },
  { x: 54, y: 59, title: 'Busca por leitura', text: 'O gatilho preenche a busca; também aceita SKU, lote ou endereço.' },
  { x: 45, y: 70, title: 'Filtro por depósito', text: 'Recorta a lista pelo setor do armazém.' },
  { x: 34, y: 90, title: 'Pallet pronto para sair', text: 'Cada cartão mostra material, lote, depósito e quantidade antes da baixa, que libera o endereço.' },
];
const pinsSync: PinData[] = [
  { x: 37, y: 25, title: 'Conexão com o banco', text: 'Latência e contagens direto do banco de dados.' },
  { x: 42, y: 45, title: 'Fila de sincronização', text: 'Leituras feitas sem rede esperam aqui e sobem sozinhas.' },
  { x: 42, y: 63, title: 'Terminal e operador', text: 'Quem está no coletor, qual leitor está em uso e por qual caminho os dados trafegam.' },
];

export const tour = {
  title: 'Vista explodida',
  intro: 'As telas, peça por peça. Passe o cursor nos itens para localizar cada parte.',
  caption: 'Capturas e clipes com dados fictícios, gravados num ambiente de demonstração com o servidor simulado no navegador. Nenhum dado da operação real aparece aqui.',
  introTouch: 'Toque nos itens para localizar cada parte.',
  screens: [
    { id: 'painel', label: 'Painel', desktop: media.wms.painel, mobile: media.wms.painelColetor, pinsDesktop: pinsPainel },
    { id: 'recebimento', label: 'Recebimento', desktop: media.wms.entrada, mobile: media.wms.entradaColetor, pinsDesktop: pinsRecebimento },
    { id: 'enderecamento', label: 'Endereçamento', desktop: media.wms.enderecamento, mobile: media.wms.enderecamentoColetor, pinsDesktop: pinsEnderecamento },
    { id: 'expedicao', label: 'Expedição', desktop: media.wms.saida, mobile: media.wms.saidaColetor, pinsDesktop: pinsExpedicao },
    { id: 'sincronizacao', label: 'Sincronização', desktop: media.wms.sincronizacao, pinsDesktop: pinsSync },
  ] as TourScreen[],
};

export const simulator = {
  title: 'Teste de rodagem',
  heading: 'Opere um pallet do começo ao fim.',
  text: 'Este simulador reproduz o fluxo do WMS com dados fictícios: ler a etiqueta, conferir os volumes, endereçar o pallet. Desligue a rede no meio do caminho e veja a fila trabalhar.',
  caption: 'Simulação com dados fictícios. O sistema real valida a etiqueta no servidor.',
  totalAddresses: 504,
  catalog: [
    { sku: 'MAT-10021', desc: 'Adesivo Base Água 25 KG', lote: 'L2611', volumes: 40 },
    { sku: 'MAT-10045', desc: 'Resina Acrílica Balde 18 L', lote: 'L2612', volumes: 32 },
    { sku: 'MAT-20110', desc: 'Cola Contato Lata 3,6 L', lote: 'L2613', volumes: 60 },
    { sku: 'MAT-20180', desc: 'Primer PU Galão 5 L', lote: 'L2614', volumes: 48 },
    { sku: 'MAT-30007', desc: 'Hot Melt Grão Saco 20 KG', lote: 'L2615', volumes: 50 },
    { sku: 'MAT-40099', desc: 'Selante Cartucho 280 ML', lote: 'L2618', volumes: 240 },
  ],
};

export const architecture = {
  title: 'Esquema',
  text: 'O navegador do coletor guarda cada leitura no próprio aparelho e a põe numa fila. Uma API sem servidor fixo, hospedada na Vercel, recebe a fila e grava no PostgreSQL do Supabase. A leitura das etiquetas acontece no servidor, não no navegador. Para quem precisa manter tudo dentro de casa, existe um servidor NestJS opcional que faz o mesmo papel.',
  caption: 'fig. 05 · caminho de uma leitura',
};

export const delivery = {
  title: 'Entrega',
  heading: 'O que está rodando hoje',
  items: [
    { title: 'Recebimento', text: 'Leitura contínua pelo coletor, reconhecimento do material e conferência obrigatória de volumes.' },
    { title: 'Endereçamento', text: '504 posições mapeadas, com validação do endereço, posições frequentes e a fila "Aguardando endereçamento" sempre à vista.' },
    { title: 'Expedição', text: 'Separação e baixa do pallet, com motivo, destino e conferente. O endereço é liberado na hora.' },
    { title: 'Consulta de Estoque', text: 'Onde está cada material, consultado pelo gatilho do leitor ou pela câmera.' },
    { title: 'Painel', text: 'Ocupação do armazém em medidor de meia-lua, movimentações dos últimos 7 dias e o que aguarda endereçamento.' },
    { title: 'Configurações', text: 'Preferências do sistema reunidas numa tela, com interruptores e controle segmentado.' },
    { title: 'Operação sem rede', text: 'Leituras gravadas no aparelho e sincronizadas quando a conexão volta.' },
  ],
  note: 'O sistema acabou de ganhar um redesign completo, no padrão de um SaaS bem acabado: fonte Inter, superfícies de vidro, indicador de navegação que desliza, painel animado com medidor em meia-lua e gráfico de 7 dias, interruptores no estilo iOS, controle segmentado e um kit de componentes próprio.',
};

export const nextRevision = {
  title: 'Próxima revisão',
  text: 'A versão seguinte já está em construção: o mesmo sistema, preparado para atender várias empresas ao mesmo tempo.',
  button: 'Ver o WMS SaaS',
};
