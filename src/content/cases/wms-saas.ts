/** Case 02 · WMS SaaS (DESIGN.md §11.7). Teaser: sem telas e sem código, só os diagramas. */
export const notice = 'Este projeto está em andamento. O que aparece aqui é o desenho e o que já foi entregue, sem telas finais.';

export const symptom = {
  title: 'Sintoma',
  paragraphs: [
    [
      { t: 'O WMS Pro resolve um armazém. Para atender o segundo, o terceiro e o décimo, não dá para copiar o sistema inteiro a cada cliente. Era preciso um só sistema em que ' },
      { t: 'nenhuma empresa enxergue o dado da outra, nem por engano', b: true },
      { t: '.' },
    ],
  ],
};

export const diagnosis = [
  { title: 'O isolamento mora no banco', text: 'Toda tabela carrega o identificador da empresa, e as chaves estrangeiras são compostas com ele. As regras de segurança por linha (RLS) do PostgreSQL filtram os dados antes de qualquer consulta chegar à aplicação.' },
  { title: 'O coletor muda de mão', text: 'No turno, o mesmo aparelho passa por várias pessoas. A troca de operador é feita por matrícula e PIN, em segundos, sem sair do sistema.' },
  { title: 'Quem sai primeiro é regra da empresa', text: 'Cada empresa escolhe a política de separação: o mais antigo primeiro (FIFO), o que vence primeiro (FEFO) ou o mais recente primeiro (LIFO). A escolha roda no banco, numa função.' },
];

export const tenants = [
  { id: 'A', name: 'Empresa A', color: '#FF8A5C' },
  { id: 'B', name: 'Empresa B', color: '#7FB6EE' },
  { id: 'C', name: 'Empresa C', color: '#6FD49A' },
];

export const tenantDiagram = {
  title: 'Uma tabela, três empresas',
  selectorLabel: 'Quem está logado',
  caption: 'A regra vive no banco (RLS), não na tela.',
  table: 'estoque',
  rows: [
    { tenant: 'A', sku: 'MAT-10021', pos: 'A-01-03' },
    { tenant: 'B', sku: 'MAT-20110', pos: 'A-01-01' },
    { tenant: 'C', sku: 'MAT-30007', pos: 'B-02-04' },
    { tenant: 'A', sku: 'MAT-10045', pos: 'A-02-02' },
    { tenant: 'C', sku: 'MAT-40099', pos: 'C-01-01' },
    { tenant: 'B', sku: 'MAT-20180', pos: 'B-01-03' },
    { tenant: 'A', sku: 'MAT-20110', pos: 'A-03-01' },
    { tenant: 'B', sku: 'MAT-10021', pos: 'C-02-02' },
    { tenant: 'C', sku: 'MAT-10045', pos: 'B-03-01' },
  ],
};

export const pickingDemo = {
  title: 'Qual pallet sai primeiro?',
  badge: 'Sai primeiro',
  policies: [
    { value: 'FIFO', label: 'FIFO', caption: 'Sai o que entrou primeiro.' },
    { value: 'FEFO', label: 'FEFO', caption: 'Sai o que vence primeiro.' },
    { value: 'LIFO', label: 'LIFO', caption: 'Sai o que entrou por último.' },
  ] as const,
  pallets: [
    { id: 'P-01', lote: 'L2611', entrada: '2026-09-02', validade: '2027-03-10' },
    { id: 'P-02', lote: 'L2612', entrada: '2026-09-15', validade: '2026-12-20' },
    { id: 'P-03', lote: 'L2613', entrada: '2026-10-01', validade: '2027-06-01' },
    { id: 'P-04', lote: 'L2614', entrada: '2026-10-20', validade: '2026-11-30' },
    { id: 'P-05', lote: 'L2615', entrada: '2026-11-04', validade: '2027-01-15' },
  ],
  labels: { entrada: 'entrada', validade: 'validade' },
};

export const schema = { title: 'Esquema' };

export const roadmap = {
  title: 'Roteiro',
  states: { done: 'concluída', doing: 'em andamento', todo: 'a fazer' },
  closing: 'Quando o recebimento estiver pronto, esta página ganha telas e uma demonstração.',
};
