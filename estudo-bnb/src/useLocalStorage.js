import { useEffect, useState } from 'react';

// Estado persistido no navegador; se o storage não estiver disponível, funciona só em memória.
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? JSON.parse(salvo) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      /* storage indisponível */
    }
  }, [chave, valor]);

  return [valor, setValor];
}

export const LETRAS = ['A', 'B', 'C', 'D', 'E'];
