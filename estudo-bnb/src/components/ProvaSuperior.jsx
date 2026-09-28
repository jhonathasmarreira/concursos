import { useEffect, useMemo, useState } from 'react';
import { infoConcursoSuperior as info, criteriosSimulado, montarSimulado } from '../data/provaSuperior.js';
import { useLocalStorage } from '../useLocalStorage.js';
import { formatarTempo } from '../tempo.js';

const ROTULOS = ['C', 'E'];
const nomeProva = { P1: 'P1 · Conhecimentos gerais', P2: 'P2 · Conhecimentos específicos' };

// Nota Cebraspe: +1 por item certo, −1 por item errado, 0 em branco.
const pontuar = (itens, respostas) => {
  const acertos = itens.filter((i) => respostas[i.id] === i.correta).length;
  const brancos = itens.filter((i) => respostas[i.id] === undefined).length;
  const erros = itens.length - acertos - brancos;
  return { total: itens.length, acertos, erros, brancos, nota: acertos - erros };
};

function TextoApoio({ bloco }) {
  return (
    <>
      {bloco.texto && (
        <div className="texto-apoio">
          {bloco.texto.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      {bloco.codigo && <pre className="codigo">{bloco.codigo}</pre>}
      <p className="comando">{bloco.comando}</p>
    </>
  );
}

function Apresentacao({ perfil, onPerfil, onIniciar }) {
  return (
    <div>
      <h1>📋 Última prova de nível superior: BNB 2022</h1>
      <p className="subtitulo">{info.situacaoAtual}</p>

      <div className="info-grade">
        <div><small>Banca</small><strong>{info.banca}</strong></div>
        <div><small>Data da prova</small><strong>{info.dataProva}</strong></div>
        <div><small>Vagas</small><strong>{info.vagas}</strong></div>
        <div><small>Remuneração inicial</small><strong>{info.salario}</strong></div>
      </div>

      <h2>Estrutura da prova real</h2>
      <table className="tabela">
        <thead>
          <tr><th>Prova</th><th>Conteúdo</th><th>Itens</th><th>Nota mínima</th></tr>
        </thead>
        <tbody>
          {info.estrutura.map((e) => (
            <tr key={e.prova}><td>{e.prova}</td><td>{e.conteudo}</td><td>{e.itens}</td><td>{e.minimo}</td></tr>
          ))}
          <tr><td colSpan={2}>Total (duração de {info.duracao})</td><td>120</td><td>{info.minimoTotal}</td></tr>
        </tbody>
      </table>

      <div className="aviso">
        Os itens são de <strong>certo ou errado</strong>. Cada item certo vale +1, cada item errado vale −1 e o item em
        branco vale 0, ou seja, <strong>um erro anula um acerto</strong>. Este simulado tem 60 itens inéditos na mesma
        proporção da prova: 25 de conhecimentos gerais (15 de Português e 10 de Raciocínio Lógico) e 35 do perfil
        escolhido. As notas mínimas são aplicadas proporcionalmente: P1 ≥ {criteriosSimulado.p1.minimo}, P2 ≥{' '}
        {criteriosSimulado.p2.minimo} e total ≥ {criteriosSimulado.total.minimo}.
      </div>

      <h2>Escolha o perfil</h2>
      <div className="perfis">
        {info.perfis.map((p) => (
          <button key={p.id} className={`perfil ${perfil === p.id ? 'ativo' : ''}`} onClick={() => onPerfil(p.id)}>
            <strong>Perfil {p.id}: {p.nome}</strong>
            <small>Vagas em 2022: {p.vagas}</small>
          </button>
        ))}
      </div>

      <button className="btn btn-primario btn-grande" onClick={onIniciar}>
        Iniciar simulado
      </button>
    </div>
  );
}

function Resultado({ simulado, perfil, respostas, tempo, onRefazer }) {
  const [soErradas, setSoErradas] = useState(false);
  const { blocos, itens } = simulado;
  const p1 = pontuar(itens.filter((i) => i.prova === 'P1'), respostas);
  const p2 = pontuar(itens.filter((i) => i.prova === 'P2'), respostas);
  const total = pontuar(itens, respostas);
  const falhas = [
    p1.nota < criteriosSimulado.p1.minimo && `P1 abaixo do mínimo (${criteriosSimulado.p1.minimo})`,
    p2.nota < criteriosSimulado.p2.minimo && `P2 abaixo do mínimo (${criteriosSimulado.p2.minimo})`,
    total.nota < criteriosSimulado.total.minimo && `total abaixo do mínimo (${criteriosSimulado.total.minimo})`,
  ].filter(Boolean);
  const pct = Math.max(0, Math.round((total.nota / total.total) * 100));
  const disciplinas = [...new Set(itens.map((i) => i.disciplina))].map((d) => ({
    nome: d,
    ...pontuar(itens.filter((i) => i.disciplina === d), respostas),
  }));
  const lista = soErradas ? itens.filter((i) => respostas[i.id] !== i.correta) : itens;
  const perfilNome = info.perfis.find((p) => p.id === perfil).nome;

  return (
    <div>
      <h1>Resultado do simulado</h1>
      <p className="subtitulo">Perfil {perfil}: {perfilNome}</p>

      <div className={`nota ${falhas.length ? 'erro' : pct >= 60 ? 'ok' : 'medio'}`}>
        <span className="nota-valor">{total.nota} pontos</span>
        <span>
          {total.acertos} certos · {total.erros} errados · {total.brancos} em branco · de {total.total} itens · tempo{' '}
          {formatarTempo(tempo)}
        </span>
        <span className="nota-msg">
          {falhas.length
            ? `Pelos critérios da prova real, você seria eliminado: ${falhas.join('; ')}.`
            : 'Você passaria nos critérios de eliminação. Na classificação, conta a nota total: continue treinando!'}
        </span>
      </div>

      <table className="tabela">
        <thead>
          <tr><th>Prova</th><th>Certos</th><th>Errados</th><th>Branco</th><th>Nota</th><th>Mínimo</th></tr>
        </thead>
        <tbody>
          {[['P1', p1, criteriosSimulado.p1.minimo], ['P2', p2, criteriosSimulado.p2.minimo]].map(([nome, r, min]) => (
            <tr key={nome} className={r.nota < min ? 'linha-erro' : ''}>
              <td>{nomeProva[nome]}</td><td>{r.acertos}</td><td>{r.erros}</td><td>{r.brancos}</td>
              <td><strong>{r.nota}</strong></td><td>{min}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Desempenho por disciplina</h2>
      <table className="tabela">
        <thead>
          <tr><th>Disciplina</th><th>Certos</th><th>Errados</th><th>Nota líquida</th></tr>
        </thead>
        <tbody>
          {disciplinas.map((d) => (
            <tr key={d.nome}>
              <td>{d.nome}</td><td>{d.acertos}/{d.total}</td><td>{d.erros}</td><td>{d.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="revisao-topo">
        <h2>Correção item a item</h2>
        <label>
          <input type="checkbox" checked={soErradas} onChange={(e) => setSoErradas(e.target.checked)} /> Mostrar só
          errados/em branco
        </label>
      </div>

      {lista.map((item) => {
        const r = respostas[item.id];
        const certo = r === item.correta;
        const bloco = blocos.find((b) => b.itens.includes(item));
        return (
          <div key={item.id} className={`revisao ${certo ? 'ok' : 'erro'}`}>
            <div className="revisao-cabecalho">
              <span>Item {item.numero} · {item.disciplina}</span>
              <strong>{certo ? '✅ Certo (+1)' : r === undefined ? '⚪ Em branco (0)' : '❌ Errado (−1)'}</strong>
            </div>
            {bloco.codigo && <pre className="codigo">{bloco.codigo}</pre>}
            <p className="enunciado">{item.enunciado}</p>
            <p>
              Gabarito: <strong>{item.correta === 0 ? 'CERTO' : 'ERRADO'}</strong>
              {r !== undefined && <> · sua resposta: {r === 0 ? 'CERTO' : 'ERRADO'}</>}
            </p>
            <p className="explicacao">📖 {item.explicacao}</p>
          </div>
        );
      })}

      <button className="btn btn-primario btn-grande" onClick={onRefazer}>
        ↺ Refazer simulado
      </button>
    </div>
  );
}

export default function ProvaSuperior() {
  const [estado, setEstado] = useLocalStorage('bnb-prova-sup-v1', { fase: 'inicio', perfil: 1, respostas: {}, tempo: 0 });
  const { fase, perfil, respostas, tempo } = estado;
  const simulado = useMemo(() => montarSimulado(perfil), [perfil]);

  useEffect(() => {
    if (fase !== 'fazendo') return;
    const t = setInterval(() => setEstado((e) => ({ ...e, tempo: e.tempo + 1 })), 1000);
    return () => clearInterval(t);
  }, [fase, setEstado]);

  // Clicar de novo na marcação escolhida deixa o item em branco (estratégia comum no Cebraspe).
  const marcar = (id, idx) =>
    setEstado((e) => {
      const novas = { ...e.respostas };
      if (novas[id] === idx) delete novas[id];
      else novas[id] = idx;
      return { ...e, respostas: novas };
    });
  const iniciar = () => {
    setEstado((e) => ({ ...e, fase: 'fazendo', respostas: {}, tempo: 0 }));
    window.scrollTo(0, 0);
  };
  const voltarInicio = () => {
    setEstado((e) => ({ ...e, fase: 'inicio' }));
    window.scrollTo(0, 0);
  };

  if (fase === 'inicio')
    return <Apresentacao perfil={perfil} onPerfil={(p) => setEstado((e) => ({ ...e, perfil: p }))} onIniciar={iniciar} />;
  if (fase === 'resultado')
    return <Resultado simulado={simulado} perfil={perfil} respostas={respostas} tempo={tempo} onRefazer={voltarInicio} />;

  const { blocos, itens } = simulado;
  const marcados = itens.filter((i) => respostas[i.id] !== undefined).length;
  const finalizar = () => {
    const brancos = itens.length - marcados;
    if (brancos > 0 && !window.confirm(`${brancos} item(ns) em branco (valem 0). Deseja finalizar e corrigir?`)) return;
    setEstado((e) => ({ ...e, fase: 'resultado' }));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="prova-barra">
        <span>⏱ {formatarTempo(tempo)}</span>
        <span>
          {marcados}/{itens.length} marcados
        </span>
        <button className="btn btn-primario" onClick={finalizar}>
          Finalizar e corrigir
        </button>
      </div>

      <h1>Simulado: BNB 2022 · Perfil {perfil}</h1>
      <p className="subtitulo">
        Marque C (certo) ou E (errado). Para deixar um item em branco, clique de novo na marcação escolhida. Um erro
        anula um acerto.
      </p>

      <div className="mapa-questoes">
        {itens.map((i) => (
          <a key={i.id} href={`#${i.id}`} className={respostas[i.id] !== undefined ? 'feita' : ''}>
            {i.numero}
          </a>
        ))}
      </div>

      {blocos.map((b, bi) => (
        <section key={bi}>
          {(bi === 0 || blocos[bi - 1].prova !== b.prova) && <h2 className="titulo-prova">{nomeProva[b.prova]}</h2>}
          {(bi === 0 || blocos[bi - 1].disciplina !== b.disciplina) && (
            <h3 className="titulo-disciplina">{b.disciplina}</h3>
          )}
          <TextoApoio bloco={b} />
          {b.itens.map((item) => (
            <div key={item.id} id={item.id} className="item-ce">
              <p className="enunciado">
                <strong>{item.numero}</strong> {item.enunciado}
              </p>
              <div className="marcacao-ce">
                {ROTULOS.map((r, idx) => (
                  <button
                    key={r}
                    className={`marca ${respostas[item.id] === idx ? 'selecionada' : ''}`}
                    onClick={() => marcar(item.id, idx)}
                    aria-label={`Item ${item.numero}: ${idx === 0 ? 'certo' : 'errado'}`}
                  >
                    {r}
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
