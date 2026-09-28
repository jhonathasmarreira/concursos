// Item no formato Cebraspe: uma afirmação que o candidato julga como CERTA ou ERRADA.
export const C = true;
export const E = false;

export const ce = (enunciado, certo, explicacao) => ({
  tipo: 'ce',
  enunciado,
  alternativas: ['Certo', 'Errado'],
  correta: certo ? 0 : 1,
  explicacao,
});
