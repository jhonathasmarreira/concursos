# Estudo BNB

App React (Vite) para estudar para os concursos do Banco do Nordeste. No topo do menu, escolha o nível:

### Nível médio: Analista Bancário
- **Matérias**: 9 matérias alinhadas ao conteúdo programático do edital de 2024 (Anexo IV), com 40 a 61 perguntas de múltipla escolha cada (391 no total, estilo Cesgranrio), divididas em tópicos de 5 perguntas. Conhecimentos básicos: Língua Portuguesa e Matemática/Raciocínio Lógico. Conhecimentos bancários: SFN, Operações de Crédito, Serviços Bancários, Aspectos Jurídicos, Banco do Nordeste, Ética/Integridade/ASG (com o Código de Conduta do BNB) e Atualidades. Cada tópico tem seu material de estudo, exibido junto de cada pergunta.
- **Última prova (2024)**: simulado de 30 questões na proporção e com os pesos da prova Cesgranrio de 2024, com correção e nota no final.

### Nível superior: Especialista Técnico em TI
- **Matérias**: 10 matérias com 40 itens de certo/errado cada (400 no total, estilo Cebraspe), separadas em conhecimentos gerais, Perfil 1 (Desenvolvimento de Sistemas), Perfil 2 (Infraestrutura e Segurança) e Banco de dados, comum aos dois perfis. O placar mostra o saldo líquido (um erro anula um acerto).
- **Última prova (2022)**: simulado de 60 itens (25 gerais + 35 do perfil escolhido), com nota Cebraspe (+1/−1/0), opção de deixar em branco e critérios de eliminação proporcionais aos do edital.

O progresso fica salvo no navegador (localStorage).

## Como rodar

1. Instale o Node.js LTS: https://nodejs.org
2. No terminal, dentro desta pasta:

```bash
npm install
npm run dev
```

3. Abra o endereço mostrado (normalmente http://localhost:5173).

## Onde editar o conteúdo

- `src/data/materias/*.js`: matérias do nível médio (tópicos, materiais e perguntas)
- `src/data/ultimaProva.js`: dados do concurso de 2024 e questões do simulado de nível médio
- `src/data/superior/*.js`: matérias do nível superior (itens criados com `ce(afirmação, C ou E, explicação)`)
- `src/data/provaSuperior.js`: dados do concurso de 2022 e itens do simulado de nível superior
- `src/data/niveis.js`: textos e configuração de cada nível
