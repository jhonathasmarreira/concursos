import { niveis } from '../data/niveis.js';

export default function Inicio({ nivel, respostas, onNavegar, onTrocarNivel }) {
  const { materias } = nivel;
  const todas = materias.flatMap((m) => m.perguntas);
  const respondidas = todas.filter((p) => respostas[p.id] !== undefined);
  const acertos = respondidas.filter((p) => respostas[p.id] === p.correta).length;
  const pct = Math.round((respondidas.length / todas.length) * 100);
  const outro = Object.values(niveis).find((n) => n.id !== nivel.id);

  return (
    <div>
      <h1>{nivel.titulo}</h1>
      <p className="subtitulo">{nivel.info.situacaoAtual}</p>

      <div className="resumo-cards">
        <div className="card-mini">
          <span className="card-mini-valor">{pct}%</span>
          <span className="card-mini-rotulo">do estudo concluído</span>
        </div>
        <div className="card-mini">
          <span className="card-mini-valor">
            {respondidas.length}/{todas.length}
          </span>
          <span className="card-mini-rotulo">perguntas respondidas</span>
        </div>
        <div className="card-mini">
          <span className="card-mini-valor">{acertos}</span>
          <span className="card-mini-rotulo">acertos no estudo</span>
        </div>
      </div>

      <h2>Como funciona</h2>
      <ol className="passos">
        {nivel.passos.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>

      <h2>Matérias</h2>
      <div className="grade-materias">
        {materias.map((m) => {
          const feitas = m.perguntas.filter((p) => respostas[p.id] !== undefined).length;
          return (
            <button key={m.id} className="card-materia" onClick={() => onNavegar({ tipo: 'materia', id: m.id })}>
              <span className="card-materia-icone">{m.icone}</span>
              <strong>{m.nome}</strong>
              {m.grupo && <span className="etiqueta">{m.grupo}</span>}
              <small>{m.descricao}</small>
              <div className="barra">
                <div className="barra-preenchida" style={{ width: `${(feitas / m.perguntas.length) * 100}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="acoes">
        <button className="btn btn-primario btn-grande" onClick={() => onNavegar({ tipo: 'prova' })}>
          📋 Fazer o simulado da {nivel.rotuloProva.toLowerCase()}
        </button>
        <button className="btn btn-grande" onClick={() => onTrocarNivel(outro.id)}>
          Ir para o {outro.nome.toLowerCase()}
        </button>
      </div>
    </div>
  );
}
