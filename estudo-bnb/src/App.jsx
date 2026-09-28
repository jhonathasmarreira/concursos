import { useState } from 'react';
import { niveis } from './data/niveis.js';
import { useLocalStorage } from './useLocalStorage.js';
import Sidebar from './components/Sidebar.jsx';
import Inicio from './components/Inicio.jsx';
import MateriaView from './components/MateriaView.jsx';
import UltimaProva from './components/UltimaProva.jsx';
import ProvaSuperior from './components/ProvaSuperior.jsx';

export default function App() {
  const [nivelId, setNivelId] = useLocalStorage('bnb-nivel', 'medio');
  const nivel = niveis[nivelId] ?? niveis.medio;
  const [tela, setTela] = useState({ tipo: 'inicio' });
  const [menuAberto, setMenuAberto] = useState(false);
  // respostas de estudo dos dois níveis: { [perguntaId]: indiceEscolhido } (os ids não se repetem entre níveis)
  const [respostas, setRespostas] = useLocalStorage('bnb-estudo-respostas', {});

  const navegar = (novaTela) => {
    setTela(novaTela);
    setMenuAberto(false);
    window.scrollTo(0, 0);
  };

  const trocarNivel = (id) => {
    setNivelId(id);
    navegar({ tipo: 'inicio' });
  };

  const materiaAtual = tela.tipo === 'materia' ? nivel.materias.find((m) => m.id === tela.id) : null;

  return (
    <div className="app">
      <header className="topbar">
        <button className="menu-btn" onClick={() => setMenuAberto(!menuAberto)} aria-label="Abrir menu">
          ☰
        </button>
        <span className="topbar-titulo">Estudo BNB · {nivel.nome}</span>
      </header>

      <Sidebar
        nivel={nivel}
        tela={tela}
        respostas={respostas}
        aberto={menuAberto}
        onNavegar={navegar}
        onTrocarNivel={trocarNivel}
      />
      {menuAberto && <div className="overlay" onClick={() => setMenuAberto(false)} />}

      <main className="conteudo">
        {tela.tipo === 'inicio' && (
          <Inicio nivel={nivel} respostas={respostas} onNavegar={navegar} onTrocarNivel={trocarNivel} />
        )}
        {materiaAtual && (
          <MateriaView
            key={materiaAtual.id}
            materia={materiaAtual}
            respostas={respostas}
            onResponder={(id, idx) => setRespostas((r) => ({ ...r, [id]: idx }))}
            onLimpar={(ids) =>
              setRespostas((r) => {
                const novo = { ...r };
                ids.forEach((id) => delete novo[id]);
                return novo;
              })
            }
          />
        )}
        {tela.tipo === 'prova' && (nivel.id === 'superior' ? <ProvaSuperior /> : <UltimaProva />)}
      </main>
    </div>
  );
}
