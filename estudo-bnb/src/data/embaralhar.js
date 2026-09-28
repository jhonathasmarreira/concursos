// Embaralha as alternativas de forma determinística (mesma ordem a cada carregamento),
// para que o gabarito não se concentre numa letra. Respostas salvas continuam válidas.
// Alternativas numéricas (valores, percentuais, frações) mantêm a ordem original, como nas provas.

const ehNumerica = (alt) => /^[−-]?(R\$\s*)?\d/.test(alt);

// Hash simples do id → semente do gerador pseudoaleatório.
function semente(texto) {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function gerador(s) {
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function embaralhar(pergunta, id) {
  if (pergunta.alternativas.every(ehNumerica)) return pergunta;
  const aleatorio = gerador(semente(String(id)));
  const ordem = pergunta.alternativas.map((_, i) => i);
  for (let i = ordem.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
  }
  return {
    ...pergunta,
    alternativas: ordem.map((i) => pergunta.alternativas[i]),
    correta: ordem.indexOf(pergunta.correta),
  };
}
