import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // O bundle é grande só por causa do texto das ~700 perguntas; não há código a dividir.
  build: { chunkSizeWarningLimit: 800 },
});
