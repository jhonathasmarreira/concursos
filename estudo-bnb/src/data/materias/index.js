// Matérias baseadas no conteúdo programático do concurso BNB 2024 (Analista Bancário 1 – Cesgranrio), Anexo IV do edital.
// Cada matéria tem tópicos; cada tópico tem um material de estudo e suas perguntas.
import portugues from './portugues.js';
import matematica from './matematica.js';
import sfn from './sfn.js';
import credito from './credito.js';
import produtos from './produtos.js';
import juridico from './juridico.js';
import bnb from './bnb.js';
import etica from './etica.js';
import atualidades from './atualidades.js';
import { embaralhar } from '../embaralhar.js';

// Achata as perguntas de todos os tópicos, dando a cada uma um id estável e o índice do seu tópico.
const montar = (grupo) => (materia) => ({
  ...materia,
  grupo,
  perguntas: materia.topicos.flatMap((topico, ti) =>
    topico.perguntas.map((p, pi) => {
      const id = `${materia.id}-${ti + 1}-${pi + 1}`;
      return { ...embaralhar(p, id), id, topico: ti };
    })
  ),
});

export const materias = [
  ...[portugues, matematica].map(montar('Conhecimentos básicos')),
  ...[sfn, credito, produtos, juridico, bnb, etica, atualidades].map(montar('Conhecimentos bancários')),
];
