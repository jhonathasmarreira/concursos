// Matérias do nível superior, baseadas no edital do último concurso de nível superior do BNB
// (2022 – Especialista Técnico / Analista de Sistemas – Cebraspe). Itens no formato certo/errado.
import portugues from './portugues.js';
import raciocinio from './raciocinio.js';
import programacao from './programacao.js';
import arquitetura from './arquitetura.js';
import engenharia from './engenharia.js';
import bancoDados from './banco-dados.js';
import seguranca from './seguranca.js';
import redes from './redes.js';
import infraestrutura from './infraestrutura.js';
import gestaoTi from './gestao-ti.js';

// Itens certo/errado não são embaralhados: "Certo" fica sempre antes de "Errado", como na folha de respostas.
const montar = (materia) => ({
  ...materia,
  perguntas: materia.topicos.flatMap((topico, ti) =>
    topico.perguntas.map((p, pi) => ({ ...p, id: `${materia.id}-${ti + 1}-${pi + 1}`, topico: ti }))
  ),
});

export const materiasSuperior = [
  portugues,
  raciocinio,
  programacao,
  arquitetura,
  engenharia,
  bancoDados,
  seguranca,
  redes,
  infraestrutura,
  gestaoTi,
].map(montar);
