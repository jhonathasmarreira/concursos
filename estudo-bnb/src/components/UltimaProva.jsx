import { useEffect, useState } from 'react';
import { infoConcurso, questoesProva, disciplinasProva } from '../data/ultimaProva.js';
import { LETRAS, useLocalStorage } from '../useLocalStorage.js';
import { formatarTempo } from '../tempo.js';

function Apresentacao({ onIniciar }) {
  return (
    <div>
      <h1>📋 Última prova: BNB 2024</h1>
      <p className="subtitulo">{infoConcurso.situacaoAtual}</p>

      <div className="info-grade">
        <div><small>Banca</small><strong>{infoConcurso.banca}</strong></div>
        <div><small>Data da prova</small><strong>{infoConcurso.dataProva}</strong></div>
        <div><small>Vagas</small><strong>{infoConcurso.vagas}</strong></div>
        <div><small>Salário inicial</small><strong>{infoConcurso.salario}</strong></div>
      </div>

      <h2>Estrutura da prova real</h2>
      <table className="tabela">
        <thead>
          <tr><th>Disciplina</th><th>Questões</th><th>Peso</th></tr>
        </thead>
        <tbody>
          {infoConcurso.estrutura.map((e) => (
            <tr key={e.disciplina}><td>{e.disciplina}</td><td>{e.questoes}</td><td>{e.peso}</td></tr>
          ))}
        </tbody>
      </table>

      <div className="aviso">
        Este simulado tem <strong>{questoesProva.length} questões inéditas</strong> no estilo Cesgranrio, na mesma
        proporção e com os mesmos pesos da prova de 2024 (5 de Português, 5 de Matemática e 20 de Conhecimentos
        Bancários). Responda tudo e clique em <strong>Finalizar e corrigir</strong> para ver sua nota.
      </div>

      <button className="btn btn-primario btn-grande" onClick={onIniciar}>
        Iniciar simulado
      </button>
    </div>
  );
}

function Resultado({ respostas, tempo, onRefazer }) {
  const [soErradas, setSoErradas] = useState(false);

  const porDisciplina = disciplinasProva.map((d) => {
    const qs = questoesProva.filter((q) => q.disciplina === d.nome);
    const acertos = qs.filter((q) => respostas[q.id] === q.correta).length;
    return { ...d, total: qs.length, acertos, pontos: acertos * d.peso, maximo: qs.length * d.peso };
  });
  const pontos = porDisciplina.reduce((s, d) => s + d.pontos, 0);
  const maximo = porDisciplina.reduce((s, d) => s + d.maximo, 0);
  const acertos = porDisciplina.reduce((s, d) => s + d.acertos, 0);
  const pct = Math.round((pontos / maximo) * 100);
  const lista = soErradas ? questoesProva.filter((q) => respostas[q.id] !== q.correta) : questoesProva;

  return (
    <div>
      <h1>Resultado do simulado</h1>

      <div className={`nota ${pct >= 70 ? 'ok' : pct >= 50 ? 'medio' : 'erro'}`}>
        <span className="nota-valor">{pct}%</span>
        <span>
          {pontos} de {maximo} pontos · {acertos} de {questoesProva.length} acertos · tempo {formatarTempo(tempo)}
        </span>
        <span className="nota-msg">
          {pct >= 70
            ? 'Ótimo desempenho! Continue revisando para manter o nível.'
            : pct >= 50
              ? 'Bom caminho. Reforce as matérias com mais erros.'
              : 'Volte aos materiais de estudo das matérias e refaça o simulado.'}
        </span>
      </div>

      <table className="tabela">
        <thead>
          <tr><th>Disciplina</th><th>Acertos</th><th>Pontos</th><th>Aproveitamento</th></tr>
        </thead>
        <tbody>
          {porDisciplina.map((d) => (
            <tr key={d.nome}>
              <td>{d.nome}</td>
              <td>{d.acertos}/{d.total}</td>
              <td>{d.pontos}/{d.maximo}</td>
              <td>
                <div className="barra">
                  <div className="barra-preenchida" style={{ width: `${(d.acertos / d.total) * 100}%` }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="revisao-topo">
        <h2>Correção questão a questão</h2>
        <label>
          <input type="checkbox" checked={soErradas} onChange={(e) => setSoErradas(e.target.checked)} /> Mostrar só
          erradas/em branco
        </label>
      </div>

      {lista.map((q) => {
        const r = respostas[q.id];
        const certo = r === q.correta;
        return (
          <div key={q.id} className={`revisao ${certo ? 'ok' : 'erro'}`}>
            <div className="revisao-cabecalho">
              <span>Questão {q.id} · {q.disciplina}</span>
              <strong>{certo ? '✅ Certa' : r === undefined ? '⚪ Em branco' : '❌ Errada'}</strong>
            </div>
            <p className="enunciado">{q.enunciado}</p>
            <div className="alternativas">
              {q.alternativas.map((alt, i) => (
                <div
                  key={i}
                  className={`alternativa ${i === q.correta ? 'certa' : i === r ? 'errada' : 'apagada'}`}
                >
                  <span className="letra">{LETRAS[i]}</span>
                  <span>{alt}</span>
                </div>
              ))}
            </div>
            <p className="explicacao">📖 {q.explicacao}</p>
          </div>
        );
      })}

      <button className="btn btn-primario btn-grande" onClick={onRefazer}>
        ↺ Refazer simulado
      </button>
    </div>
  );
}

export default function UltimaProva() {
  // v3: questões revisadas para o conteúdo programático do edital de 2024.
  const [estado, setEstado] = useLocalStorage('bnb-prova-v3', { fase: 'inicio', respostas: {}, tempo: 0 });
  const { fase, respostas, tempo } = estado;

  useEffect(() => {
    if (fase !== 'fazendo') return;
    const t = setInterval(() => setEstado((e) => ({ ...e, tempo: e.tempo + 1 })), 1000);
    return () => clearInterval(t);
  }, [fase, setEstado]);

  const responder = (id, idx) => setEstado((e) => ({ ...e, respostas: { ...e.respostas, [id]: idx } }));
  const iniciar = () => {
    setEstado({ fase: 'fazendo', respostas: {}, tempo: 0 });
    window.scrollTo(0, 0);
  };

  if (fase === 'inicio') return <Apresentacao onIniciar={iniciar} />;
  if (fase === 'resultado') return <Resultado respostas={respostas} tempo={tempo} onRefazer={iniciar} />;

  const respondidas = Object.keys(respostas).length;
  const finalizar = () => {
    const faltam = questoesProva.length - respondidas;
    if (faltam > 0 && !window.confirm(`Você deixou ${faltam} questão(ões) em branco. Deseja finalizar mesmo assim?`))
      return;
    setEstado((e) => ({ ...e, fase: 'resultado' }));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="prova-barra">
        <span>⏱ {formatarTempo(tempo)}</span>
        <span>
          {respondidas}/{questoesProva.length} respondidas
        </span>
        <button className="btn btn-primario" onClick={finalizar}>
          Finalizar e corrigir
        </button>
      </div>

      <h1>Simulado: BNB 2024</h1>

      <div className="mapa-questoes">
        {questoesProva.map((q) => (
          <a key={q.id} href={`#q${q.id}`} className={respostas[q.id] !== undefined ? 'feita' : ''}>
            {q.id}
          </a>
        ))}
      </div>

      {disciplinasProva.map((d) => (
        <section key={d.nome}>
          <h2 className="titulo-disciplina">
            {d.nome} <small>(peso {d.peso})</small>
          </h2>
          {questoesProva
            .filter((q) => q.disciplina === d.nome)
            .map((q) => (
              <div key={q.id} id={`q${q.id}`} className="questao">
                <h3>Questão {q.id}</h3>
                <p className="enunciado">{q.enunciado}</p>
                <div className="alternativas">
                  {q.alternativas.map((alt, i) => (
                    <button
                      key={i}
                      className={`alternativa ${respostas[q.id] === i ? 'selecionada' : ''}`}
                      onClick={() => responder(q.id, i)}
                    >
                      <span className="letra">{LETRAS[i]}</span>
                      <span>{alt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </section>
      ))}

      <button className="btn btn-primario btn-grande" onClick={finalizar}>
        Finalizar e corrigir
      </button>
    </div>
  );
}
