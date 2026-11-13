/**
 * Mídias usadas só dentro das páginas de case (ficam fora do bundle da home).
 * Mesmas convenções de ./media.ts, alinhadas com public/media/manifest.json.
 */
import { clip, img, media, G, MOBILE, P, W } from './media';

export const mediaCase = {
  wms: {
    ...media.wms,
    entrada: img(`${W}/entrada`, 1280, 800, 'Tela de Recebimento do WMS Pro preenchida após a leitura de uma etiqueta fictícia: material MAT-10021 identificado e cadastrado, lote L2611, descrição "Adesivo Base Água 25 KG", unidade Balde, 25 kg por unidade, depósito EX01 e 40 unidades conferidas, com peso total estimado de 1.000 kg.'),
    entradaClip: clip(`${W}/entrada-clip`, 1280, 800, 'Clipe do Recebimento: o código MAT-10021-L2611 é digitado no campo de leitura e confirmado com Enter, código, lote, descrição e peso se preenchem sozinhos, o operador digita 40 na quantidade e registra o pallet, que entra na área de triagem com aviso de sucesso (dados fictícios).', 9.3),
    enderecamento: img(`${W}/enderecamento`, 1280, 800, 'Tela de Endereçamento do WMS Pro com o pallet fictício "Selante Cartucho 280 ML" (MAT-40099, lote L2618, 240 unidades) selecionado na lista de triagem e o endereço 03.01.03.02 digitado, decomposto em Corredor 03, Estante 01, Andar 03 e Box 02.'),
    enderecamentoClip: clip(`${W}/enderecamento-clip`, 1280, 800, 'Clipe do Endereçamento: um pallet em triagem é selecionado, o endereço 03010302 é digitado e formatado como 03.01.03.02 com a decomposição em corredor, estante, andar e box, o endereçamento é confirmado e o pallet sai da área de triagem (dados fictícios).', 9),
    saida: img(`${W}/saida`, 1280, 800, 'Tela de Expedição do WMS Pro na aba "Prontos para expedição": indicadores de 7 pallets armazenados, 0 expedidos, 4,7 t disponíveis e 4 depósitos, campo de leitura e busca, filtro por depósito e os cartões dos pallets fictícios prontos para saída.'),
    saidaClip: clip(`${W}/saida-clip`, 1280, 800, 'Clipe da Expedição: busca por MAT-10021, clique em "Separar e expedir", a janela de confirmação abre e o destino é trocado para "Doca 02"; ao confirmar, o cartão some da lista e o indicador de expedidos sobe para 1 (dados fictícios).', 8.2),
    sincronizacao: img(`${W}/sincronizacao`, 1280, 800, 'Janela "Status do banco de dados" do WMS Pro: conexão Supabase PostgreSQL operacional com latência de 38 ms, 4 pallets em triagem e 7 armazenados, fila de sincronização com 0 pendentes e a mensagem de que todos os dados do coletor foram enviados; operador "Usuário Demo", internet conectada, leitor Honeywell EDA52 (dados fictícios).'),
    offlineClip: clip(`${W}/offline-clip`, 1280, 800, 'Clipe do modo offline: a rede cai e o indicador do topo muda para "Modo offline"; uma leitura é registrada e fica salva no aparelho ("1 no aparelho"); quando a rede volta, a fila sincroniza sozinha e o indicador volta a "Supabase online" (dados fictícios).', 12.6),
    login: img(`${W}/login`, 1280, 800, 'Tela de login do WMS Pro: à esquerda, o título "Do recebimento à expedição, sem perder um pallet." e três destaques (leitura contínua com coletor Honeywell, operação offline, endereçamento rastreável); à direita, o formulário vazio de e-mail e senha (dados fictícios).'),
    entradaColetor: img(`${W}/entrada-coletor`, 390, 844, 'Recebimento no coletor (celular) preenchido com o material fictício MAT-10021, lote L2611, descrição "Adesivo Base Água 25 KG" e quantidade conferida.', MOBILE),
    enderecamentoColetor: img(`${W}/enderecamento-coletor`, 390, 844, 'Endereçamento no coletor (celular): pallet "Selante Cartucho 280 ML" selecionado, endereço 03.01.03.02 decomposto em corredor, estante, andar e box, e as posições frequentes em botões grandes (dados fictícios).', MOBILE),
    saidaColetor: img(`${W}/saida-coletor`, 390, 844, 'Expedição no coletor (celular), com indicadores, campo de leitura e os cartões de pallets prontos para expedir (dados fictícios).', MOBILE),
  },
  pdi: {
    ...media.pdi,
    relogioClip: clip(`${P}/desafio-relogio-clip`, 1280, 800, 'Clipe do desafio do relógio no PDI Studio: a imagem de um relógio analógico é aberta, o desafio Relógio é aplicado e o sistema circula o mostrador, isola os ponteiros e escreve "HORA LIDA: 10:10".', 9.8),
    ba: {
      cinza: [img(`${P}/ba-cinza-antes`, 1200, 800, 'Imagem de teste original e colorida: engrenagens metálica e dourada, montanhas sob um céu de pôr do sol, formas geométricas e o texto "PDI Studio · Teste 01".', [600, 1200]), img(`${P}/ba-cinza-depois`, 1200, 800, 'A mesma imagem convertida em tons de cinza pelo PDI Studio.', [600, 1200])],
      bordas: [img(`${P}/ba-bordas-antes`, 1200, 800, 'Imagem de teste original e colorida, antes da detecção de bordas.', [600, 1200]), img(`${P}/ba-bordas-depois`, 1200, 800, 'Resultado da detecção de bordas (filtro passa-alta Sobel) do PDI Studio: contornos claros das engrenagens, montanhas e letras sobre fundo preto.', [600, 1200])],
      limiar: [img(`${P}/ba-limiar-antes`, 1200, 800, 'Imagem de teste original e colorida, antes da limiarização.', [600, 1200]), img(`${P}/ba-limiar-depois`, 1200, 800, 'Resultado da limiarização do PDI Studio (limiar 120): a imagem separada em preto e branco, com engrenagens, sol e formas em branco.', [600, 1200])],
      afinamento: [img(`${P}/ba-afinamento-antes`, 1200, 800, 'Formas pretas grossas em fundo claro: as letras "PDI", uma engrenagem, uma curva e uma barra vertical.', [600, 1200]), img(`${P}/ba-afinamento-depois`, 1200, 800, 'Resultado do afinamento (esqueletização, método Steinfeld) do PDI Studio: as mesmas formas reduzidas a traços finos.', [600, 1200])],
    },
    desafios: {
      relogio: img(`${P}/desafio-relogio`, 800, 600, '', [400, 800]),
      objetos: img(`${P}/desafio-objetos`, 800, 600, '', [400, 800]),
      letras: img(`${P}/desafio-letras`, 800, 600, '', [400, 800]),
      placas: img(`${P}/desafio-placas`, 800, 600, '', [400, 800]),
      graficos: img(`${P}/desafio-graficos`, 800, 600, '', [400, 800]),
    },
  },
  game: {
    ...media.game,
    estatisticas: img(`${G}/estatisticas`, 1440, 900, 'Tela "Word Stats" do Antigravity com a taxa de acerto por palavra (dados de demonstração): rocket 100%, coffee 83%, keyboard 80%, laptop 67%, wrench 60%, glasses 50%, shoes 33% e wheel 25%.'),
  },
  lab: media.lab,
};
