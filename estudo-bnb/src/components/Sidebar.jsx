import { niveis } from '../data/niveis.js';

export default function Sidebar({ nivel, tela, respostas, aberto, onNavegar, onTrocarNivel }) {
  const ativo = (tipo, id) => tela.tipo === tipo && (id === undefined || tela.id === id);

  // Agrupa as matérias pelo campo "grupo" (nível superior); sem grupo, tudo fica em "Matérias".
  const grupos = [];
  nivel.materias.forEach((m) => {
    const nome = m.grupo ?? 'Matérias';
    let grupo = grupos.find((g) => g.nome === nome);
    if (!grupo) grupos.push((grupo = { nome, materias: [] }));
    grupo.materias.push(m);
  });

  return (
    <nav className={`sidebar ${aberto ? 'aberto' : ''}`}>
      <div className="sidebar-marca">
        <strong>Estudo BNB</strong>
        <small>{nivel.cargo}</small>
      </div>

      <div className="nivel-toggle" role="tablist" aria-label="Nível do concurso">
        {Object.values(niveis).map((n) => (
          <button
            key={n.id}
            role="tab"
            aria-selected={n.id === nivel.id}
            className={n.id === nivel.id ? 'ativo' : ''}
            onClick={() => onTrocarNivel(n.id)}
          >
            {n.nome}
          </button>
        ))}
      </div>

      <button className={`nav-item ${ativo('inicio') ? 'ativo' : ''}`} onClick={() => onNavegar({ tipo: 'inicio' })}>
        <span>🏠</span> Início
      </button>

      {grupos.map((g) => (
        <div key={g.nome}>
          <div className="nav-secao">{g.nome}</div>
          {g.materias.map((m) => {
            const feitas = m.perguntas.filter((p) => respostas[p.id] !== undefined).length;
            return (
              <button
                key={m.id}
                className={`nav-item ${ativo('materia', m.id) ? 'ativo' : ''}`}
                onClick={() => onNavegar({ tipo: 'materia', id: m.id })}
              >
                <span>{m.icone}</span>
                <span className="nav-nome">{m.nome}</span>
                <span className={`nav-badge ${feitas === m.perguntas.length ? 'completo' : ''}`}>
                  {feitas}/{m.perguntas.length}
                </span>
              </button>
            );
          })}
        </div>
      ))}

      <div className="nav-secao">Simulado</div>
      <button
        className={`nav-item destaque ${ativo('prova') ? 'ativo' : ''}`}
        onClick={() => onNavegar({ tipo: 'prova' })}
      >
        <span>📋</span> {nivel.rotuloProva}
      </button>
    </nav>
  );
}
