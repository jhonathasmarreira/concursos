import { useState } from 'react';
import { LETRAS } from '../useLocalStorage.js';

function MaterialEstudo({ topico, numero, aberto, onAlternar }) {
  return (
    <section className={`material ${aberto ? 'aberto' : ''}`}>
      <button className="material-cabecalho" onClick={onAlternar}>
        <span>
          📖 Material de estudo · Tópico {numero}: {topico.titulo}
        </span>
        <span>{aberto ? '▲' : '▼'}</span>
      </button>
      {aberto && (
        <div className="material-corpo">
          {topico.texto.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <h4>Pontos-chave</h4>
          <ul>
            {topico.pontos.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <div className="dica">💡 {topico.dica}</div>
        </div>
      )}
    </section>
  );
}

// Itens certo/errado (Cebraspe) usam as marcações C e E no lugar das letras.
const rotulosDe = (pergunta) => (pergunta.tipo === 'ce' ? ['C', 'E'] : LETRAS);

function Questao({ pergunta, numero, total, resposta, onResponder }) {
  const [selecionada, setSelecionada] = useState(null);
  const respondida = resposta !== undefined;
  const ehCE = pergunta.tipo === 'ce';
  const rotulos = rotulosDe(pergunta);
  const gabaritoCE = pergunta.correta === 0 ? 'CERTO' : 'ERRADO';

  const classeAlternativa = (i) => {
    if (!respondida) return i === selecionada ? 'selecionada' : '';
    if (i === pergunta.correta) return 'certa';
    if (i === resposta) return 'errada';
    return 'apagada';
  };

  return (
    <section className="questao">
      <h3>
        {ehCE ? 'Item' : 'Pergunta'} {numero} de {total}
      </h3>
      {ehCE && <p className="comando">Julgue o item a seguir.</p>}
      <p className="enunciado">{pergunta.enunciado}</p>
      <div className={`alternativas ${ehCE ? 'alternativas-ce' : ''}`}>
        {pergunta.alternativas.map((alt, i) => (
          <button
            key={i}
            className={`alternativa ${classeAlternativa(i)}`}
            disabled={respondida}
            onClick={() => setSelecionada(i)}
          >
            <span className="letra">{rotulos[i]}</span>
            <span>{alt}</span>
          </button>
        ))}
      </div>

      {!respondida ? (
        <button className="btn btn-primario" disabled={selecionada === null} onClick={() => onResponder(selecionada)}>
          Responder
        </button>
      ) : (
        <div className={`feedback ${resposta === pergunta.correta ? 'ok' : 'erro'}`}>
          <strong>
            {ehCE
              ? resposta === pergunta.correta
                ? `✅ Correto! O item está ${gabaritoCE}.`
                : `❌ Incorreto. O item está ${gabaritoCE}.`
              : resposta === pergunta.correta
                ? '✅ Correto!'
                : `❌ Incorreto. Resposta certa: ${LETRAS[pergunta.correta]}`}
          </strong>
          <p>{pergunta.explicacao}</p>
        </div>
      )}
    </section>
  );
}

export default function MateriaView({ materia, respostas, onResponder, onLimpar }) {
  const { perguntas, topicos } = materia;
  const [atual, setAtual] = useState(() => {
    const primeiraPendente = perguntas.findIndex((p) => respostas[p.id] === undefined);
    return primeiraPendente === -1 ? 0 : primeiraPendente;
  });
  const [materialAberto, setMaterialAberto] = useState(true);

  const pergunta = perguntas[atual];
  const total = perguntas.length;
  const respondidas = perguntas.filter((p) => respostas[p.id] !== undefined);
  const acertos = respondidas.filter((p) => respostas[p.id] === p.correta).length;
  const erradas = respondidas.filter((p) => respostas[p.id] !== p.correta);
  // No estilo Cebraspe, cada item errado anula um certo.
  const ehCE = perguntas[0]?.tipo === 'ce';
  const saldo = acertos - erradas.length;

  const irPara = (i) => {
    // Ao mudar de tópico, o material do novo tópico abre automaticamente.
    if (perguntas[i].topico !== pergunta.topico) setMaterialAberto(true);
    setAtual(i);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const proximaPendente = () => {
    for (let k = 1; k <= total; k++) {
      const i = (atual + k) % total;
      if (respostas[perguntas[i].id] === undefined) return i;
    }
    return -1;
  };
  const pendente = proximaPendente();

  const estadoDe = (p) => {
    const r = respostas[p.id];
    return r === undefined ? '' : r === p.correta ? 'ok' : 'erro';
  };

  return (
    <div>
      <h1>
        {materia.icone} {materia.nome}
      </h1>
      <p className="subtitulo">{materia.descricao}</p>

      <div className="progresso-materia">
        <span>
          {respondidas.length}/{total} respondidas · {acertos} acertos
          {ehCE && ` · ${erradas.length} erros · saldo líquido ${saldo}`}
        </span>
        <div className="barra">
          <div className="barra-preenchida" style={{ width: `${(respondidas.length / total) * 100}%` }} />
        </div>
      </div>

      <div className="topicos">
        {topicos.map((t, ti) => {
          const doTopico = perguntas.filter((p) => p.topico === ti);
          const feitas = doTopico.filter((p) => respostas[p.id] !== undefined).length;
          const primeira = perguntas.indexOf(doTopico[0]);
          return (
            <div key={ti} className={`topico ${pergunta.topico === ti ? 'ativo' : ''}`}>
              <button className="topico-titulo" onClick={() => irPara(primeira)}>
                <span>
                  {ti + 1}. {t.titulo}
                </span>
                <small>
                  {feitas}/{doTopico.length}
                </small>
              </button>
              <div className="topico-numeros">
                {doTopico.map((p) => {
                  const i = perguntas.indexOf(p);
                  return (
                    <button
                      key={p.id}
                      className={`num ${estadoDe(p)} ${i === atual ? 'atual' : ''}`}
                      onClick={() => irPara(i)}
                      aria-label={`Pergunta ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <MaterialEstudo
        topico={topicos[pergunta.topico]}
        numero={pergunta.topico + 1}
        aberto={materialAberto}
        onAlternar={() => setMaterialAberto(!materialAberto)}
      />

      <Questao
        key={pergunta.id}
        pergunta={pergunta}
        numero={atual + 1}
        total={total}
        resposta={respostas[pergunta.id]}
        onResponder={(idx) => onResponder(pergunta.id, idx)}
      />

      <div className="navegacao">
        <button className="btn" disabled={atual === 0} onClick={() => irPara(atual - 1)}>
          ← Anterior
        </button>
        {pendente !== -1 && pendente !== atual + 1 && (
          <button className="btn" onClick={() => irPara(pendente)}>
            Próxima não respondida
          </button>
        )}
        <button className="btn" disabled={atual === total - 1} onClick={() => irPara(atual + 1)}>
          Próxima →
        </button>
      </div>

      {respondidas.length === total && (
        <div className="resumo-materia">
          <strong>
            Matéria concluída: {acertos} de {total} acertos ({Math.round((acertos / total) * 100)}%)
            {ehCE && ` · nota líquida ${saldo} de ${total}`}
          </strong>
          <p>
            {erradas.length === 0
              ? 'Excelente! Você acertou tudo. Siga para a próxima matéria.'
              : 'Revise os materiais dos tópicos em que errou e refaça as perguntas erradas.'}
          </p>
          <div className="acoes">
            {erradas.length > 0 && (
              <button
                className="btn btn-primario"
                onClick={() => {
                  onLimpar(erradas.map((p) => p.id));
                  irPara(perguntas.indexOf(erradas[0]));
                  setMaterialAberto(true);
                }}
              >
                Refazer as {erradas.length} erradas
              </button>
            )}
            <button
              className="btn"
              onClick={() => {
                onLimpar(perguntas.map((p) => p.id));
                irPara(0);
                setMaterialAberto(true);
              }}
            >
              ↺ Refazer tudo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
