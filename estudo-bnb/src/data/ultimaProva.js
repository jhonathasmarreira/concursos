// Informações do último concurso (BNB 2024) e simulado no mesmo formato.
// As questões são inéditas, no estilo Cesgranrio, respeitando a proporção da prova real
// (10 PT + 10 MAT + 40 CB → aqui 5 + 5 + 20).
import { embaralhar } from './embaralhar.js';

export const infoConcurso = {
  titulo: 'Concurso BNB 2024 – Analista Bancário 1',
  banca: 'Fundação Cesgranrio',
  dataProva: '28/04/2024',
  vagas: '410 imediatas + 300 cadastro de reserva',
  salario: 'R$ 3.788,16',
  escolaridade: 'Nível médio',
  estrutura: [
    { disciplina: 'Língua Portuguesa', questoes: 10, peso: 1 },
    { disciplina: 'Matemática/Raciocínio Lógico e Quantitativo', questoes: 10, peso: 1 },
    { disciplina: 'Conhecimentos Bancários', questoes: 40, peso: 2 },
  ],
  situacaoAtual:
    'Em 2025 o BNB zerou o cadastro de reserva do concurso de 2024. Um novo edital está em estudo para 2026, ainda sem banca definida.',
};

const PT = 'Língua Portuguesa';
const MAT = 'Matemática';
const CB = 'Conhecimentos Bancários';

export const disciplinasProva = [
  { nome: PT, peso: 1 },
  { nome: MAT, peso: 1 },
  { nome: CB, peso: 2 },
];

const questoesOriginais = [
  // ---------- Língua Portuguesa ----------
  {
    id: 1,
    disciplina: PT,
    enunciado: 'Assinale a frase em que a regência verbal está de acordo com a norma-padrão.',
    alternativas: [
      'Prefiro investir do que gastar.',
      'O cliente assistiu ao vídeo institucional do banco.',
      'Todos devem obedecer as normas internas.',
      'Ele aspira o cargo de gerente de agência.',
      'Esqueci-me o prazo de pagamento.',
    ],
    correta: 1,
    explicacao:
      '"Assistir" no sentido de ver é transitivo indireto: assistir ao vídeo. Correções: preferir algo A algo; obedecer às normas; aspirar ao cargo; esqueci-me DO prazo.',
  },
  {
    id: 2,
    disciplina: PT,
    enunciado: 'A vírgula está empregada de acordo com a norma-padrão em:',
    alternativas: [
      'Os clientes, compareceram à agência pela manhã.',
      'O gerente, que é muito experiente, aprovou o crédito.',
      'O banco ofereceu, crédito aos pequenos produtores.',
      'O relatório da auditoria, foi entregue ontem.',
      'Todos os funcionários da agência, participaram do treinamento.',
    ],
    correta: 1,
    explicacao:
      'A oração adjetiva explicativa "que é muito experiente" deve vir entre vírgulas. Nas demais, a vírgula separa indevidamente sujeito de verbo ou verbo de complemento.',
  },
  {
    id: 3,
    disciplina: PT,
    enunciado: 'A colocação do pronome oblíquo átono está de acordo com a norma-padrão em:',
    alternativas: [
      'Me informaram o saldo atualizado.',
      'Não esqueça-se de cadastrar a senha.',
      'Nunca se viu tanta procura por crédito.',
      'Informarei-lhe o resultado amanhã.',
      'Quem avisou-o sobre a mudança?',
    ],
    correta: 2,
    explicacao:
      'Advérbio de negação ("nunca") atrai o pronome: próclise. Correções: Informaram-me; Não se esqueça; Informar-lhe-ei (mesóclise); Quem o avisou.',
  },
  {
    id: 4,
    disciplina: PT,
    enunciado:
      'No trecho "A instituição procura mitigar os riscos de crédito por meio de garantias", a palavra "mitigar" tem sentido equivalente a:',
    alternativas: ['ampliar', 'atenuar', 'ignorar', 'transferir', 'calcular'],
    correta: 1,
    explicacao: 'Mitigar significa suavizar, reduzir, atenuar.',
  },
  {
    id: 5,
    disciplina: PT,
    enunciado: 'A concordância nominal está de acordo com a norma-padrão em:',
    alternativas: [
      'É proibido a entrada de pessoas não autorizadas.',
      'Seguem anexo os documentos solicitados.',
      'Elas mesmas assinaram o contrato de financiamento.',
      'O atendimento começa ao meio-dia e meio.',
      'Havia bastante clientes na fila.',
    ],
    correta: 2,
    explicacao:
      '"Mesmas" concorda com "elas". Correções: É proibida A entrada (com artigo, concorda); seguem anexos; meio-dia e meia (hora); bastantes clientes (adjetivo = muitos).',
  },

  // ---------- Matemática ----------
  {
    id: 6,
    disciplina: MAT,
    enunciado:
      'Um empréstimo de R$ 12.000,00 será pago em 12 prestações mensais pelo Sistema de Amortização Constante (SAC), à taxa de 1% ao mês. O valor da primeira prestação é:',
    alternativas: ['R$ 1.000,00', 'R$ 1.066,18', 'R$ 1.120,00', 'R$ 1.200,00', 'R$ 1.012,00'],
    correta: 2,
    explicacao:
      'No SAC, a amortização é constante: 12.000 / 12 = R$ 1.000. Juros do 1º mês: 1% de 12.000 = R$ 120. Prestação = 1.000 + 120 = R$ 1.120. (R$ 1.066,18 seria a prestação fixa da Tabela Price.)',
  },
  {
    id: 7,
    disciplina: MAT,
    enunciado: 'A taxa bimestral equivalente, no regime de juros compostos, a 1% ao mês é:',
    alternativas: ['2,00%', '2,01%', '2,10%', '1,99%', '2,02%'],
    correta: 1,
    explicacao: '(1,01)² − 1 = 1,0201 − 1 = 0,0201 = 2,01% ao bimestre.',
  },
  {
    id: 8,
    disciplina: MAT,
    enunciado:
      'Uma urna contém 3 bolas azuis e 2 vermelhas. Retirando-se 2 bolas, sucessivamente e sem reposição, a probabilidade de ambas serem azuis é:',
    alternativas: ['3/10', '9/25', '2/5', '1/2', '3/5'],
    correta: 0,
    explicacao: 'P = 3/5 × 2/4 = 6/20 = 3/10. (9/25 seria o resultado COM reposição.)',
  },
  {
    id: 9,
    disciplina: MAT,
    enunciado:
      'O lucro de R$ 12.000,00 de uma empresa será dividido entre três sócios em partes diretamente proporcionais aos capitais investidos: R$ 20 mil, R$ 30 mil e R$ 50 mil. O sócio que investiu mais receberá:',
    alternativas: ['R$ 2.400,00', 'R$ 3.600,00', 'R$ 4.000,00', 'R$ 6.000,00', 'R$ 5.000,00'],
    correta: 3,
    explicacao: 'Total de capital = 100 mil. O maior sócio tem 50% → 50% de 12.000 = R$ 6.000,00.',
  },
  {
    id: 10,
    disciplina: MAT,
    enunciado:
      'Uma aplicação rendeu 12% no ano, período em que a inflação foi de 5%. A taxa real de rendimento foi de, aproximadamente:',
    alternativas: ['7,00%', '6,67%', '17,60%', '5,50%', '6,00%'],
    correta: 1,
    explicacao: 'Taxa real = (1,12 / 1,05) − 1 ≈ 1,0667 − 1 = 6,67%. Não se subtrai simplesmente 12 − 5.',
  },

  // ---------- Conhecimentos Bancários ----------
  {
    id: 11,
    disciplina: CB,
    enunciado: 'Compete ao Banco Central do Brasil:',
    alternativas: [
      'fixar as diretrizes e normas da política monetária',
      'fiscalizar as sociedades seguradoras',
      'emitir moeda e fiscalizar as instituições financeiras',
      'regular a emissão pública de ações',
      'administrar os regimes próprios de previdência dos servidores',
    ],
    correta: 2,
    explicacao:
      'O BCB emite moeda, executa a política monetária e fiscaliza as instituições financeiras. Fixar diretrizes é do CMN; seguradoras são da Susep; ações são da CVM.',
  },
  {
    id: 12,
    disciplina: CB,
    enunciado:
      'Quando a meta da taxa Selic está acima de 8,5% ao ano, os depósitos de poupança feitos a partir de maio de 2012 são remunerados por:',
    alternativas: [
      '70% da Selic + TR',
      '0,5% ao mês + TR',
      '100% do CDI',
      '6% ao ano + IPCA',
      'TR apenas',
    ],
    correta: 1,
    explicacao: 'Com Selic acima de 8,5% a.a.: 0,5% a.m. + TR. Com Selic igual ou inferior a 8,5%: 70% da Selic + TR.',
  },
  {
    id: 13,
    disciplina: CB,
    enunciado: 'Na análise de crédito, o "C" que se refere às garantias oferecidas pelo tomador é o:',
    alternativas: ['caráter', 'capacidade', 'capital', 'colateral', 'condições'],
    correta: 3,
    explicacao:
      'Colateral = garantias. Caráter é a intenção de pagar; capacidade, a habilidade de gerar recursos; capital, a situação patrimonial; condições, os fatores externos.',
  },
  {
    id: 14,
    disciplina: CB,
    enunciado:
      'Pela Lei do Cheque (Lei nº 7.357/1985), o prazo de apresentação de um cheque emitido na mesma praça de pagamento é de:',
    alternativas: ['15 dias', '30 dias', '60 dias', '90 dias', '6 meses'],
    correta: 1,
    explicacao:
      'Mesma praça: 30 dias; praça diferente: 60 dias. A prescrição da ação de execução ocorre 6 meses após o fim do prazo de apresentação.',
  },
  {
    id: 15,
    disciplina: CB,
    enunciado:
      'A garantia em que a propriedade resolúvel do bem é transferida ao credor até a quitação da dívida, permanecendo o devedor com a posse direta, é a:',
    alternativas: ['fiança', 'hipoteca', 'alienação fiduciária', 'penhor', 'aval'],
    correta: 2,
    explicacao:
      'Na alienação fiduciária o credor detém a propriedade até a quitação. Muito usada em veículos e imóveis.',
  },
  {
    id: 16,
    disciplina: CB,
    enunciado: 'A respeito das garantias pessoais, é correto afirmar que:',
    alternativas: [
      'o aval é garantia típica de títulos de crédito, enquanto a fiança é garantia prestada em contratos',
      'a fiança só pode ser dada em títulos de crédito',
      'aval e fiança são garantias reais sobre bens móveis',
      'o aval dispensa a assinatura do avalista',
      'a fiança é sempre solidária e nunca admite benefício de ordem',
    ],
    correta: 0,
    explicacao:
      'Aval → títulos de crédito (nota promissória, cédulas); fiança → contratos. Ambos são garantias pessoais (fidejussórias). O fiador pode ter benefício de ordem, salvo renúncia.',
  },
  {
    id: 17,
    disciplina: CB,
    enunciado:
      'Um produtor rural solicitou financiamento para adquirir um trator. Segundo as finalidades do crédito rural, essa operação classifica-se como crédito de:',
    alternativas: ['custeio', 'investimento', 'comercialização', 'industrialização', 'capital de giro'],
    correta: 1,
    explicacao:
      'Investimento: bens ou serviços cujo uso se estende por vários ciclos produtivos (máquinas, tratores, benfeitorias). Custeio cobre despesas de um ciclo (sementes, adubos).',
  },
  {
    id: 18,
    disciplina: CB,
    enunciado: 'O Programa Nacional de Fortalecimento da Agricultura Familiar (Pronaf) destina-se a:',
    alternativas: [
      'grandes empresas exportadoras do agronegócio',
      'agricultores familiares e assentados da reforma agrária',
      'cooperativas de crédito urbanas',
      'indústrias de transformação de alimentos de grande porte',
      'investidores estrangeiros em terras agrícolas',
    ],
    correta: 1,
    explicacao:
      'O Pronaf financia agricultores familiares e assentados da reforma agrária, com juros reduzidos. No BNB, o Agroamigo opera parte dessas linhas.',
  },
  {
    id: 19,
    disciplina: CB,
    enunciado: 'A duplicata é título de crédito:',
    alternativas: [
      'causal, emitido pelo vendedor ou prestador de serviços com base em fatura de venda mercantil ou de prestação de serviços',
      'abstrato, emitido pelo comprador como promessa de pagamento',
      'que representa ordem de pagamento à vista dada contra um banco',
      'público, emitido pelo Tesouro Nacional',
      'sem qualquer vínculo com a operação que lhe deu origem',
    ],
    correta: 0,
    explicacao:
      'A duplicata (Lei 5.474/1968) é título causal, sacado pelo credor com base na fatura. A ordem de pagamento à vista contra banco é o cheque; a promessa de pagamento é a nota promissória.',
  },
  {
    id: 20,
    disciplina: CB,
    enunciado:
      'A operação em que o banco antecipa ao cliente o valor de duplicatas a vencer, cobrando juros e mantendo o direito de regresso contra o cliente caso o sacado não pague, denomina-se:',
    alternativas: ['desconto de títulos', 'conta garantida', 'capital de giro', 'crédito direto ao consumidor', 'arrendamento mercantil'],
    correta: 0,
    explicacao:
      'No desconto, o banco adianta o valor de recebíveis. Se o devedor do título não pagar, o banco cobra do cliente que descontou.',
  },
  {
    id: 21,
    disciplina: CB,
    enunciado: 'Os títulos de capitalização:',
    alternativas: [
      'são fiscalizados pela Susep e combinam formação de capital com sorteios, podendo o resgate antecipado ser inferior ao valor pago',
      'são garantidos pelo FGC até R$ 250 mil',
      'são regulados pela CVM e rendem sempre mais que a poupança',
      'não permitem resgate em nenhuma hipótese',
      'são títulos públicos federais',
    ],
    correta: 0,
    explicacao: 'Capitalização: normas do CNSP e fiscalização da Susep. Parte do valor pago custeia sorteios e despesas.',
  },
  {
    id: 22,
    disciplina: CB,
    enunciado: 'A linha BNDES Finame destina-se, principalmente, a:',
    alternativas: [
      'financiar habitação popular',
      'financiar a produção e a aquisição de máquinas e equipamentos novos, de fabricação nacional, credenciados no BNDES',
      'conceder crédito pessoal sem destinação específica',
      'financiar a importação de bens de consumo',
      'custear o seguro-desemprego',
    ],
    correta: 1,
    explicacao: 'Finame = máquinas e equipamentos novos e nacionais. O seguro-desemprego é custeado pelo FAT.',
  },
  {
    id: 23,
    disciplina: CB,
    enunciado: 'Segundo o Código de Conduta Ética e Integridade do Banco do Nordeste, podem ser aceitos brindes que:',
    alternativas: [
      'tenham qualquer valor, desde que oferecidos por clientes antigos',
      'sejam oferecidos pela mesma empresa a cada três meses',
      'tenham valor unitário inferior a 1% do teto remuneratório constitucional e sejam distribuídos de forma generalizada, como propaganda ou em datas comemorativas',
      'sejam entregues em dinheiro, em valor baixo',
      'sejam oferecidos por fornecedor com contrato em análise pelo empregado',
    ],
    correta: 2,
    explicacao:
      'Art. 44 do Código. Além disso, não se aceita brinde da mesma pessoa ou empresa em intervalo menor que 12 meses.',
  },
  {
    id: 24,
    disciplina: CB,
    enunciado: 'Quanto à natureza jurídica e à sede do Banco do Nordeste do Brasil S.A., é correto afirmar que ele é:',
    alternativas: [
      'empresa pública com sede em Recife (PE)',
      'autarquia federal com sede em Salvador (BA)',
      'sociedade de economia mista com sede em Fortaleza (CE)',
      'banco privado com sede em Brasília (DF)',
      'fundação pública com sede em São Luís (MA)',
    ],
    correta: 2,
    explicacao: 'O BNB é sociedade de economia mista de capital aberto, controlada pela União, com sede em Fortaleza (CE).',
  },
  {
    id: 25,
    disciplina: CB,
    enunciado: 'O programa de microcrédito rural do Banco do Nordeste, voltado a agricultores familiares, é o:',
    alternativas: ['Crediamigo', 'Agroamigo', 'Pronampe', 'Minha Casa, Minha Vida', 'Desenrola'],
    correta: 1,
    explicacao: 'Agroamigo é o microcrédito rural (Pronaf). Crediamigo é o microcrédito urbano.',
  },
  {
    id: 26,
    disciplina: CB,
    enunciado:
      'Os Fundos Constitucionais de Financiamento (FNO, FNE e FCO) são operados, respectivamente, pelos seguintes bancos:',
    alternativas: [
      'BNDES, BNB e Caixa',
      'Basa, BNB e Banco do Brasil',
      'BNB, Basa e BNDES',
      'Banco do Brasil, BNB e Basa',
      'Caixa, Banco do Brasil e BNB',
    ],
    correta: 1,
    explicacao: 'FNO → Banco da Amazônia (Basa); FNE → Banco do Nordeste; FCO → Banco do Brasil (Lei nº 7.827/1989).',
  },
  {
    id: 27,
    disciplina: CB,
    enunciado: 'A Estratégia ASG do Banco do Nordeste organiza-se em dois eixos de atuação. São eles:',
    alternativas: [
      'maximizar o lucro dos acionistas e reduzir o crédito rural',
      'captar recursos no exterior e distribuir dividendos',
      'ampliar a rede de agências e reduzir o microcrédito',
      'apoiar a sustentabilidade social e ambiental e a transição para uma economia de baixo carbono; e operar empresarialmente de forma ecoeficiente e socialmente responsável',
      'financiar exclusivamente grandes exportadores e concentrar o crédito nas capitais',
    ],
    correta: 3,
    explicacao: 'São os dois eixos da Estratégia ASG, que se desdobram em 10 linhas de ação alinhadas aos ODS.',
  },
  {
    id: 28,
    disciplina: CB,
    enunciado:
      'O risco de perdas resultantes de falhas, deficiências ou inadequação de processos internos, pessoas e sistemas, ou de eventos externos, denomina-se risco:',
    alternativas: ['de crédito', 'de mercado', 'operacional', 'de liquidez', 'sistêmico'],
    correta: 2,
    explicacao: 'É a definição de risco operacional, que inclui o risco legal (Resolução CMN 4.557/2017).',
  },
  {
    id: 29,
    disciplina: CB,
    enunciado:
      'A Política de Responsabilidade Social, Ambiental e Climática (PRSAC), que as instituições financeiras devem estabelecer, é disciplinada pela:',
    alternativas: [
      'Resolução CMN nº 4.945/2021',
      'Lei nº 7.357/1985',
      'Resolução CMN nº 4.893/2021',
      'Lei Complementar nº 105/2001',
      'Resolução CVM nº 175/2022',
    ],
    correta: 0,
    explicacao: 'A Resolução CMN nº 4.945/2021 trata da PRSAC. A Resolução CVM 175 é o marco dos fundos de investimento.',
  },
  {
    id: 30,
    disciplina: CB,
    enunciado: 'O Pix Automático, funcionalidade lançada pelo Banco Central em 2025, destina-se a:',
    alternativas: [
      'saques em espécie em estabelecimentos comerciais',
      'pagamentos recorrentes (como contas de consumo e assinaturas) mediante autorização prévia do pagador',
      'transferências internacionais em moeda estrangeira',
      'parcelamento de compras com juros no cartão de crédito',
      'devolução de valores em caso de fraude',
    ],
    correta: 1,
    explicacao:
      'O Pix Automático permite débitos recorrentes com uma única autorização prévia. Saques são o Pix Saque; devolução por fraude é o MED.',
  },
];

export const questoesProva = questoesOriginais.map((q) => embaralhar(q, `prova-${q.id}`));
