import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Caminhos relativos: o app funciona tanto na raiz quanto em subcaminhos como o GitHub Pages (/concursos/).
  base: './',
  // O bundle é grande só por causa do texto das ~700 perguntas; não há código a dividir.
  build: { chunkSizeWarningLimit: 800 },
});
