// Cada nível tem suas próprias matérias, informações do último concurso e simulado.
import { materias } from './materias/index.js';
import { materiasSuperior } from './superior/index.js';
import { infoConcurso } from './ultimaProva.js';
import { infoConcursoSuperior } from './provaSuperior.js';

export const niveis = {
  medio: {
    id: 'medio',
    nome: 'Nível médio',
    cargo: 'Analista Bancário 1',
    titulo: 'Nível médio: Analista Bancário',
    info: infoConcurso,
    materias,
    rotuloProva: 'Última prova (2024)',
    passos: [
      'Escolha uma matéria no menu. Elas seguem o conteúdo programático do edital de 2024: conhecimentos básicos e conhecimentos bancários.',
      'Cada matéria tem de 40 a 60 perguntas de múltipla escolha (estilo Cesgranrio), divididas em tópicos, e cada pergunta vem com o material de estudo do seu tópico.',
      'Leia o material, responda e veja a explicação.',
      'No fim, faça o simulado da última prova (2024) e confira sua nota na correção.',
    ],
  },
  superior: {
    id: 'superior',
    nome: 'Nível superior',
    cargo: 'Especialista Técnico (TI)',
    titulo: 'Nível superior: Especialista Técnico em TI',
    info: infoConcursoSuperior,
    materias: materiasSuperior,
    rotuloProva: 'Última prova (2022)',
    passos: [
      'Escolha uma matéria no menu. As de conhecimentos gerais valem para os dois perfis; as específicas estão separadas por perfil.',
      'Cada matéria tem 40 itens de certo ou errado (estilo Cebraspe), divididos em 8 tópicos, com o material de estudo do tópico junto de cada item.',
      'Julgue o item como Certo ou Errado e leia a explicação. O placar mostra seu saldo líquido, em que cada erro anula um acerto, como na prova real.',
      'No fim, faça o simulado da última prova (2022) no perfil desejado e veja se passaria nos critérios de eliminação.',
    ],
  },
};
