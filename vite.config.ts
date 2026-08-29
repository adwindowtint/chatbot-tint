import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Vite inyectará tu API_KEY secreta de Vercel directamente en el código al compilar
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});
