import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Agrupamos todo en un solo objeto process.env para mayor compatibilidad en el navegador
    'process.env': {
      API_KEY: process.env.API_KEY || '',
      GOOGLE_CLOUD_PROJECT: 'elite-tint-project',
      GOOGLE_CLOUD_LOCATION: 'us-central1'
    }
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
});
