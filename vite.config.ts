import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Solo definimos la API KEY aquí. Las demás variables están en index.html
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});
