// Último concurso de nível superior do BNB (2022 – Especialista Técnico / Analista de Sistemas – Cebraspe)
// e simulado no mesmo formato: itens certo/errado, em que cada item errado anula um certo.
// A prova real tinha 120 itens (P1: 50 gerais; P2: 70 específicos do perfil). O simulado mantém a
// proporção com 60 itens: P1 com 25 (15 PT + 10 RLQ) e P2 com 35 do perfil escolhido.
import { ce, C, E } from './superior/ce.js';

export const infoConcursoSuperior = {
  titulo: 'Concurso BNB 2022 – Especialista Técnico (Analista de Sistemas)',
  banca: 'Cebraspe',
  dataProva: '04/12/2022',
  vagas: '6 imediatas + 200 cadastro de reserva',
  salario: 'R$ 6.269,76 (valor de 2022)',
  perfis: [
    { id: 1, nome: 'Desenvolvimento de Sistemas', vagas: '4 imediatas + 120 CR' },
    { id: 2, nome: 'Infraestrutura e Segurança da Informação', vagas: '2 imediatas + 80 CR' },
  ],
  estrutura: [
    { prova: 'P1 – Conhecimentos gerais', conteudo: 'Língua Portuguesa e Raciocínio Lógico e Quantitativo', itens: 50, minimo: 10 },
    { prova: 'P2 – Conhecimentos específicos', conteudo: 'Conteúdo do perfil escolhido', itens: 70, minimo: 21 },
  ],
  minimoTotal: 36,
  duracao: '3h30',
  situacaoAtual:
    'O BNB prepara um edital próprio de nível superior, com 90 vagas previstas para Especialista Técnico em TI (salário inicial de R$ 6.556,92), separado do concurso de Analista Bancário. Banca e datas ainda não foram divulgadas.',
};

// Critérios de eliminação da prova real, aplicados proporcionalmente ao tamanho do simulado.
export const criteriosSimulado = {
  p1: { itens: 25, minimo: 5 }, // 10/50 = 20%
  p2: { itens: 35, minimo: 10.5 }, // 21/70 = 30%
  total: { itens: 60, minimo: 18 }, // 36/120 = 30%
};

const PT = 'Língua Portuguesa';
const RLQ = 'Raciocínio Lógico e Quantitativo';

const textoPT = [
  'A inclusão financeira deixou de ser apenas uma meta de política pública para se tornar parte da estratégia das instituições bancárias. Nas últimas décadas, a combinação entre crédito orientado e tecnologia permitiu que milhões de pequenos empreendedores, antes invisíveis ao sistema financeiro, passassem a movimentar contas, obter empréstimos e formalizar seus negócios.',
  'No Nordeste, onde boa parte da economia se apoia em atividades informais e de pequena escala, esse movimento tem impacto particular. O microcrédito produtivo orientado, que associa o empréstimo ao acompanhamento de um agente de crédito, mostrou que é possível emprestar a quem não tem garantias reais sem que a inadimplência se torne incontrolável. A proximidade com o cliente, e não a exigência de bens, passou a ser o principal instrumento de gestão do risco.',
  'A digitalização, contudo, impõe novos desafios. Se, por um lado, aplicativos e pagamentos instantâneos reduzem custos e ampliam o alcance dos serviços, por outro, exigem que os clientes tenham acesso à internet e familiaridade com a tecnologia — condições que ainda não estão presentes em muitas comunidades do interior. Sem políticas de educação financeira e digital, a inovação corre o risco de reproduzir as desigualdades que pretendia combater.',
];

const blocosP1 = [
  {
    disciplina: PT,
    texto: textoPT,
    comando: 'A respeito das ideias do texto apresentado, julgue os itens a seguir.',
    itens: [
      ce('De acordo com o texto, o microcrédito produtivo orientado dispensa a gestão do risco de inadimplência.',
        E, 'O texto diz que o risco continua sendo gerido, agora pela proximidade com o cliente, e não pela exigência de bens.'),
      ce('Infere-se do texto que, no modelo de microcrédito descrito, o relacionamento com o cliente substitui as garantias reais como principal forma de controle do risco.',
        C, '"A proximidade com o cliente, e não a exigência de bens, passou a ser o principal instrumento de gestão do risco."'),
      ce('O autor defende que a digitalização dos serviços bancários seja interrompida até que todas as comunidades do interior tenham acesso à internet.',
        E, 'Extrapolação. O texto aponta desafios e pede políticas de educação financeira e digital, sem propor a interrupção.'),
      ce('O texto é predominantemente dissertativo, e o último parágrafo apresenta uma ressalva quanto aos efeitos da digitalização.',
        C, 'O texto expõe e argumenta. O terceiro parágrafo, introduzido por "contudo", traz a ressalva.'),
      ce('Segundo o texto, a inclusão financeira sempre integrou a estratégia das instituições bancárias.',
        E, '"Deixou de ser apenas uma meta de política pública para se tornar parte da estratégia" indica que antes não fazia parte.'),
      ce('Depreende-se do segundo parágrafo que a economia nordestina é integralmente composta por atividades informais.',
        E, 'O texto fala em "boa parte da economia", não em sua totalidade.'),
    ],
  },
  {
    disciplina: PT,
    comando: 'No que se refere aos aspectos linguísticos do texto, julgue os itens que se seguem.',
    itens: [
      ce('No segundo parágrafo, o vocábulo "que", em "que associa o empréstimo ao acompanhamento de um agente de crédito", retoma "O microcrédito produtivo orientado".',
        C, 'É pronome relativo, com antecedente "O microcrédito produtivo orientado".'),
      ce('No terceiro parágrafo, a substituição de "contudo" por "portanto" preservaria o sentido original do texto.',
        E, '"Contudo" é adversativo; "portanto" é conclusivo. A relação lógica mudaria.'),
      ce('No primeiro parágrafo, a forma verbal "passassem" está no pretérito imperfeito do subjuntivo e mantém correlação com "permitiu".',
        C, '"Permitiu que... passassem": pretérito perfeito do indicativo seguido de imperfeito do subjuntivo.'),
      ce('A conjunção "Se", no terceiro parágrafo, poderia ser substituída por "Caso", sem necessidade de nenhum outro ajuste no período.',
        E, 'Ali o "Se" estrutura um contraste ("por um lado... por outro"). Além disso, "Caso" exigiria o subjuntivo ("reduzam", "ampliem").'),
      ce('No terceiro parágrafo, o termo "condições" retoma, de forma resumitiva, "acesso à internet" e "familiaridade com a tecnologia".',
        C, 'É um caso de encapsulamento anafórico.'),
      ce('No trecho "as desigualdades que pretendia combater", o sujeito da forma verbal "pretendia" é "as desigualdades".',
        E, 'Quem "pretendia combater" é "a inovação". "As desigualdades" é o antecedente do "que", com função de objeto.'),
      ce('O vocábulo "invisíveis", no primeiro parágrafo, foi empregado em sentido figurado, para indicar que os empreendedores estavam à margem do sistema financeiro.',
        C, 'Não se trata de invisibilidade literal, e sim de exclusão.'),
      ce('No segundo parágrafo, seria correto empregar o sinal indicativo de crase em "a quem", no trecho "emprestar a quem não tem garantias reais".',
        E, 'Não há crase antes do pronome "quem", que não admite artigo.'),
      ce('A substituição da forma verbal "exigem", no terceiro parágrafo, por "exige" manteria a correção gramatical do texto.',
        E, 'O sujeito é composto e está anteposto ao verbo ("aplicativos e pagamentos instantâneos"), por isso o verbo deve ir para o plural.'),
    ],
  },
  {
    disciplina: RLQ,
    comando:
      'Considere a proposição P: "Se o sistema for atualizado e o backup for realizado, então a equipe será dispensada no fim de semana". Com base nessa proposição, julgue os itens a seguir.',
    itens: [
      ce('A tabela-verdade da proposição P possui 8 linhas.',
        C, 'São 3 proposições simples: 2³ = 8.'),
      ce('A negação de P pode ser expressa como "O sistema é atualizado, o backup é realizado e a equipe não é dispensada no fim de semana".',
        C, '¬(A → B) ≡ A ∧ ¬B, com A = "atualizado e backup".'),
      ce('A proposição P é equivalente a "Se a equipe não for dispensada no fim de semana, então o sistema não foi atualizado ou o backup não foi realizado".',
        C, 'Contrapositiva com De Morgan: ¬B → ¬(X ∧ Y) ≡ ¬B → (¬X ∨ ¬Y).'),
      ce('Se o sistema não for atualizado, a proposição P será necessariamente falsa.',
        E, 'Com o antecedente falso, a condicional é verdadeira.'),
    ],
  },
  {
    disciplina: RLQ,
    comando:
      'Em um departamento de 12 analistas, 7 atuam em desenvolvimento, 6 atuam em infraestrutura e 3 atuam nas duas áreas. Com base nessa situação, julgue os itens seguintes.',
    itens: [
      ce('Exatamente 2 analistas desse departamento não atuam em nenhuma das duas áreas.',
        C, 'n(D ∪ I) = 7 + 6 − 3 = 10. Sobram 12 − 10 = 2.'),
      ce('Exatamente 4 analistas atuam somente em desenvolvimento.',
        C, '7 − 3 = 4.'),
      ce('A quantidade de maneiras distintas de escolher uma dupla desses analistas para um plantão é igual a 132.',
        E, 'Dupla não tem ordem: C(12, 2) = 66. O valor 132 seria um arranjo.'),
    ],
  },
  {
    disciplina: RLQ,
    comando:
      'Uma senha é formada por duas letras distintas, escolhidas entre A, B, C, D e E, seguidas de um algarismo de 0 a 9. Com base nessas informações, julgue os itens a seguir.',
    itens: [
      ce('É possível formar 200 senhas distintas.',
        C, '5 × 4 × 10 = 200.'),
      ce('Escolhendo-se uma dessas senhas ao acaso, a probabilidade de que ela comece pela letra A é igual a 1/4.',
        E, 'Senhas iniciadas por A: 1 × 4 × 10 = 40. 40/200 = 1/5.'),
      ce('Escolhendo-se uma dessas senhas ao acaso, a probabilidade de que o algarismo seja par é igual a 1/2.',
        C, 'Cinco dos dez algarismos são pares (0, 2, 4, 6, 8).'),
    ],
  },
];

const blocosPerfil1 = [
  {
    disciplina: 'Lógica de programação',
    comando: 'Considere o código Python a seguir e julgue os itens subsequentes.',
    codigo: 'def f(n):\n    if n <= 1:\n        return 1\n    return n * f(n - 2)\n\nprint(f(7))',
    itens: [
      ce('A execução do código apresentará o valor 105.',
        C, 'f(7) = 7 × f(5) = 7 × 5 × f(3) = 7 × 5 × 3 × f(1) = 105.'),
      ce('Sem a condição n <= 1, a execução resultaria em recursão sem fim, até o estouro da pilha de chamadas.',
        C, 'O caso base é que interrompe a recursão.'),
      ce('Se a chamada fosse print(f(6)), o valor apresentado seria 720.',
        E, 'f(6) = 6 × 4 × 2 × f(0) = 48. O valor 720 seria 6!.'),
    ],
  },
  {
    disciplina: 'Linguagens e algoritmos',
    comando: 'Julgue os itens a seguir, acerca de orientação a objetos em Java e de algoritmos de pesquisa.',
    itens: [
      ce('Em Java, uma classe declarada como final não pode ser estendida por outras classes.',
        C, 'final em classe impede a herança (ex.: String).'),
      ce('Em Java, um atributo declarado como private pode ser acessado diretamente por subclasses localizadas em outros pacotes.',
        E, 'private restringe o acesso à própria classe. Subclasses acessam membros protected.'),
      ce('Em um vetor ordenado com 1.024 elementos, a busca binária exige, no pior caso, mais de 500 comparações.',
        E, 'log₂ 1.024 = 10. São cerca de 11 comparações no pior caso.'),
    ],
  },
  {
    disciplina: 'Arquitetura de software',
    comando: 'Com relação a APIs, padrões de projeto e microsserviços, julgue os itens seguintes.',
    itens: [
      ce('Em APIs REST, o método PATCH é empregado para a atualização parcial de um recurso.',
        C, 'O PUT substitui o recurso inteiro; o PATCH altera parte dele.'),
      ce('O código de status HTTP 201 indica que a requisição foi bem-sucedida e resultou na criação de um recurso.',
        C, '201 Created.'),
      ce('No padrão MVC, cabe ao Controller persistir diretamente os dados no banco de dados, sem participação do Model.',
        E, 'Dados e regras de negócio são responsabilidade do Model.'),
      ce('O padrão Facade fornece uma interface unificada e simplificada para um conjunto de interfaces de um subsistema.',
        C, 'É a definição do Facade (estrutural).'),
      ce('O padrão saga gerencia transações distribuídas entre microsserviços por meio de uma sequência de transações locais, com ações compensatórias em caso de falha.',
        C, 'Substitui o commit distribuído em duas fases.'),
      ce('Um documento JSON somente é considerado válido se houver a definição prévia de um esquema XSD.',
        E, 'XSD é esquema de XML. JSON válido depende só da sintaxe; esquema (JSON Schema) é opcional.'),
    ],
  },
  {
    disciplina: 'Engenharia de software',
    comando: 'Julgue os itens a seguir, relativos a métodos ágeis, testes e métricas de software.',
    itens: [
      ce('No Scrum, a Sprint Review é o evento em que o Scrum Team apresenta o resultado do trabalho às partes interessadas e discute o progresso em direção à Meta do Produto.',
        C, 'É um evento de inspeção do incremento.'),
      ce('No Scrum, o Scrum Master é o responsável por definir e comunicar a Meta do Produto.',
        E, 'A Meta do Produto é responsabilidade do Product Owner.'),
      ce('No TDD, após o teste passar (etapa verde), o código deve ser refatorado, e os testes devem continuar passando.',
        C, 'Vermelho → verde → refatorar.'),
      ce('O teste de carga avalia o sistema sob o volume de uso esperado, ao passo que o teste de estresse o submete a condições que excedem os limites previstos.',
        C, 'O estresse busca o ponto de ruptura.'),
      ce('Na APF, uma consulta que apenas recupera e exibe dados armazenados, sem cálculos, é classificada como Saída Externa.',
        E, 'Sem cálculo ou dado derivado, é Consulta Externa (CE).'),
      ce('Requisitos de segurança e de desempenho são exemplos típicos de requisitos funcionais.',
        E, 'São requisitos não funcionais (atributos de qualidade).'),
    ],
  },
  {
    disciplina: 'Banco de dados',
    comando:
      'Considere as tabelas Cliente(id, nome, cidade) e Conta(num, id_cliente, saldo), em que Conta.id_cliente referencia Cliente.id. Julgue os itens a seguir.',
    itens: [
      ce('A consulta SELECT c.nome FROM Cliente c INNER JOIN Conta k ON c.id = k.id_cliente retorna, inclusive, os clientes que não possuem conta.',
        E, 'O INNER JOIN só traz clientes com correspondência. Para incluir todos, seria LEFT JOIN.'),
      ce('A consulta SELECT c.cidade, AVG(k.saldo) FROM Cliente c JOIN Conta k ON c.id = k.id_cliente GROUP BY c.cidade HAVING AVG(k.saldo) > 1000 retorna as cidades cuja média de saldo das contas é superior a 1.000.',
        C, 'O HAVING filtra os grupos pela média agregada.'),
      ce('O comando TRUNCATE TABLE Conta remove do banco de dados a estrutura da tabela Conta.',
        E, 'O TRUNCATE remove as linhas e mantém a estrutura. Quem remove a tabela é o DROP.'),
      ce('A coluna Conta.id_cliente é uma chave estrangeira e contribui para garantir a integridade referencial entre as tabelas.',
        C, 'Impede contas vinculadas a clientes inexistentes.'),
      ce('Em bancos NoSQL orientados a documentos, todos os documentos de uma coleção devem obrigatoriamente seguir o mesmo esquema rígido.',
        E, 'O esquema é flexível: documentos da mesma coleção podem ter campos diferentes.'),
      ce('No nível de isolamento SERIALIZABLE, não ocorrem leituras fantasmas.',
        C, 'É o nível mais forte e evita todas as anomalias clássicas.'),
    ],
  },
  {
    disciplina: 'DevOps',
    comando: 'Julgue os itens seguintes, a respeito de containers, Git e integração contínua.',
    itens: [
      ce('Em um Dockerfile, a instrução FROM define a imagem base a partir da qual a nova imagem será construída.',
        C, 'Normalmente é a primeira instrução do Dockerfile.'),
      ce('Por padrão, o comando git pull corresponde à execução de git fetch seguida de git merge.',
        C, 'Com a opção --rebase, usa rebase em vez de merge.'),
      ce('Na entrega contínua, o software é mantido em condições de ser implantado em produção a qualquer momento.',
        C, 'A ida para produção fica a critério de uma decisão manual.'),
      ce('No Kubernetes, o Deployment mantém o número desejado de réplicas de pods e pode realizar atualizações graduais (rolling updates).',
        C, 'Ele gerencia ReplicaSets e as versões.'),
      ce('O comando git clone cria uma nova branch no repositório remoto.',
        E, 'O git clone copia um repositório remoto para a máquina local.'),
      ce('Cada container Docker inclui um sistema operacional completo, com kernel próprio.',
        E, 'Containers compartilham o kernel do host. Kernel próprio é característica de VM.'),
    ],
  },
  {
    disciplina: 'Nuvem, segurança e IA',
    comando: 'Com relação a computação em nuvem, criptografia e aprendizado de máquina, julgue os itens a seguir.',
    itens: [
      ce('Elasticidade é a capacidade de provisionar e liberar recursos automaticamente, de acordo com a demanda.',
        C, 'É uma das características essenciais da nuvem (NIST).'),
      ce('No modelo PaaS, o cliente é responsável pelo gerenciamento do hardware físico dos servidores.',
        E, 'No PaaS, o provedor cuida de hardware, SO e plataforma; o cliente cuida da aplicação.'),
      ce('O HTTPS utiliza o TLS, que combina criptografia assimétrica na negociação de chaves e criptografia simétrica na transmissão dos dados.',
        C, 'É a criptografia híbrida.'),
      ce('Uma função hash criptográfica gera saídas de tamanho variável, proporcional ao tamanho da entrada.',
        E, 'A saída do hash tem tamanho fixo (ex.: SHA-256 = 256 bits).'),
      ce('Em aprendizado de máquina, overfitting ocorre quando o modelo se ajusta excessivamente aos dados de treinamento e generaliza mal para dados novos.',
        C, 'É a definição de sobreajuste.'),
    ],
  },
];

const blocosPerfil2 = [
  {
    disciplina: 'Segurança da informação',
    comando: 'Acerca de segurança da informação, códigos maliciosos e privacidade, julgue os itens a seguir.',
    itens: [
      ce('A disponibilidade é o princípio que assegura que a informação não seja revelada a pessoas não autorizadas.',
        E, 'Isso é confidencialidade. Disponibilidade é o acesso quando necessário.'),
      ce('Ransomware é um código malicioso que torna inacessíveis os dados da vítima, geralmente por criptografia, e exige pagamento de resgate.',
        C, 'É a definição de ransomware.'),
      ce('A verificação de uma assinatura digital ICP-Brasil é realizada com a chave pública do signatário, contida em seu certificado digital.',
        C, 'Assina-se com a privada e verifica-se com a pública.'),
      ce('Um IPS posicionado em linha no tráfego de rede pode bloquear o tráfego malicioso detectado.',
        C, 'Esse é o diferencial do IPS em relação ao IDS.'),
      ce('O ataque de DNS spoofing consiste em inundar um servidor com requisições para torná-lo indisponível.',
        E, 'Isso é DoS/DDoS. O DNS spoofing falsifica respostas DNS para redirecionar vítimas.'),
      ce('Na ISO/IEC 27002:2022, os controles estão organizados em quatro temas: organizacionais, de pessoas, físicos e tecnológicos.',
        C, 'São 93 controles nesses quatro temas.'),
      ce('De acordo com a LGPD, o dado anonimizado é considerado dado pessoal sensível.',
        E, 'O dado anonimizado, em regra, nem é considerado dado pessoal (art. 12), salvo se a anonimização puder ser revertida.'),
    ],
  },
  {
    disciplina: 'Redes de computadores',
    comando: 'Julgue os itens seguintes, relativos a redes de computadores.',
    itens: [
      ce('A rede 192.168.10.0/28 comporta até 14 endereços utilizáveis para hosts.',
        C, '2⁴ − 2 = 14.'),
      ce('O DNS utiliza exclusivamente o protocolo TCP em todas as suas operações.',
        E, 'As consultas usam principalmente UDP 53; o TCP é usado em transferências de zona e respostas grandes.'),
      ce('O OSPF é um protocolo do tipo vetor de distância que utiliza a contagem de saltos como métrica.',
        E, 'O OSPF é de estado de enlace, com métrica de custo. A contagem de saltos é característica do RIP.'),
      ce('No padrão IEEE 802.1Q, os quadros que trafegam em enlaces tronco recebem uma marcação que identifica a VLAN.',
        C, 'A tag de 4 bytes contém o VLAN ID.'),
      ce('O HTTPS utiliza, por padrão, a porta TCP 443.',
        C, 'O HTTP usa a 80.'),
      ce('O SNMPv3 oferece mecanismos de autenticação e de criptografia das mensagens.',
        C, 'Recursos ausentes nas versões 1 e 2c.'),
      ce('O protocolo UDP realiza a retransmissão automática dos datagramas perdidos.',
        E, 'O UDP não tem confirmação nem retransmissão.'),
    ],
  },
  {
    disciplina: 'Sistemas operacionais',
    comando: 'Com relação a sistemas operacionais e virtualização, julgue os itens a seguir.',
    itens: [
      ce('No Linux, o comando chmod 644 arquivo concede permissão de escrita ao grupo proprietário do arquivo.',
        E, '644 = rw-r--r--. Só o dono tem escrita.'),
      ce('No escalonamento Round Robin, a adoção de um quantum muito grande faz o algoritmo se aproximar do comportamento do FIFO.',
        C, 'Com quantum enorme, cada processo roda até terminar, na ordem da fila.'),
      ce('Em domínios Active Directory, o Kerberos é o protocolo de autenticação padrão.',
        C, 'O NTLM fica para compatibilidade com sistemas legados.'),
      ce('Na memória virtual com paginação, a ocorrência de page fault implica o encerramento imediato do processo.',
        E, 'O page fault é tratado pelo SO, que carrega a página do disco e retoma o processo.'),
      ce('Hypervisores do tipo 2 são executados sobre um sistema operacional hospedeiro.',
        C, 'Ex.: VirtualBox e VMware Workstation.'),
    ],
  },
  {
    disciplina: 'Armazenamento e continuidade',
    comando: 'Julgue os itens a seguir, a respeito de armazenamento de dados e de backup.',
    itens: [
      ce('O RAID 1 espelha os dados entre os discos, oferecendo tolerância a falhas com aproveitamento de 50% da capacidade bruta.',
        C, 'Cada dado é gravado em dobro.'),
      ce('O NAS disponibiliza armazenamento em nível de bloco por meio do protocolo Fibre Channel.',
        E, 'O NAS fornece acesso a arquivos (NFS, SMB). Bloco via Fibre Channel é SAN.'),
      ce('O backup diferencial copia os dados alterados desde o último backup completo.',
        C, 'Por isso cresce a cada dia até o próximo full.'),
      ce('O RPO indica o tempo máximo para restabelecer um serviço após um desastre.',
        E, 'Esse é o RTO. O RPO é a perda máxima de dados tolerada.'),
      ce('O iSCSI permite transportar comandos SCSI sobre redes IP, viabilizando SAN sobre infraestrutura Ethernet.',
        C, 'É uma alternativa mais barata ao Fibre Channel.'),
    ],
  },
  {
    disciplina: 'Banco de dados e BI',
    comando: 'Julgue os itens seguintes, relativos a banco de dados e business intelligence.',
    itens: [
      ce('Uma relação na terceira forma normal admite dependências transitivas entre atributos não chave.',
        E, 'A 3FN elimina justamente as dependências transitivas.'),
      ce('A operação OLAP de drill-down permite detalhar os dados, como passar do total anual para os totais mensais.',
        C, 'O roll-up faz o caminho inverso.'),
      ce('A última fase do CRISP-DM é a implantação (deployment).',
        C, 'Fases: negócio, dados, preparação, modelagem, avaliação e implantação.'),
      ce('Stored procedures são executadas automaticamente pelo SGBD sempre que ocorre uma inserção em uma tabela.',
        E, 'Execução automática por evento é característica das triggers. Procedures são chamadas explicitamente.'),
    ],
  },
  {
    disciplina: 'Gestão de TI',
    comando: 'Acerca do PMBOK 7 e da ITIL 4, julgue os itens a seguir.',
    itens: [
      ce('Na ITIL 4, o gerenciamento de problema busca reduzir a probabilidade e o impacto de incidentes, identificando suas causas reais.',
        C, 'É o propósito da prática de gerenciamento de problema.'),
      ce('Na ITIL 4, a mudança normal é pré-autorizada e dispensa avaliação de risco.',
        E, 'A pré-autorizada é a mudança padrão. A normal precisa de avaliação e autorização.'),
      ce('O PMBOK 7 apresenta 12 princípios de gerenciamento de projetos.',
        C, 'Além de 8 domínios de desempenho.'),
      ce('"Progrida iterativamente com feedback" é um dos princípios orientadores da ITIL 4.',
        C, 'É um dos sete princípios orientadores.'),
    ],
  },
  {
    disciplina: 'DevOps e integração',
    comando: 'Julgue os itens a seguir, acerca de DevOps, mensageria e containers.',
    itens: [
      ce('O Terraform é uma ferramenta de infraestrutura como código que adota abordagem declarativa.',
        C, 'Descreve-se o estado desejado; a ferramenta calcula o plano.'),
      ce('No modelo publish/subscribe, cada mensagem publicada em um tópico é recebida por todos os assinantes desse tópico.',
        C, 'Diferentemente da fila, em que um único consumidor recebe cada mensagem.'),
      ce('Uma imagem Docker é uma instância em execução de um container.',
        E, 'É o contrário: o container é a instância em execução de uma imagem.'),
    ],
  },
];

// Monta o simulado para o perfil escolhido, numerando os itens de 1 a 60 como no caderno de prova.
export function montarSimulado(perfil) {
  let numero = 0;
  const numerar = (blocos, prova) =>
    blocos.map((b) => ({
      ...b,
      prova,
      itens: b.itens.map((item) => {
        numero += 1;
        const id = prova === 'P1' ? `sup-p1-${numero}` : `sup-p2-${perfil}-${numero}`;
        return { ...item, id, numero, prova, disciplina: b.disciplina };
      }),
    }));
  const blocos = [...numerar(blocosP1, 'P1'), ...numerar(perfil === 1 ? blocosPerfil1 : blocosPerfil2, 'P2')];
  return { blocos, itens: blocos.flatMap((b) => b.itens) };
}
