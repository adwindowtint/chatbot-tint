import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Inyectamos las variables directamente en el proceso de Node.js de Vercel
// Esto evita que la librería de Google GenAI colapse durante el "npm run build"
process.env.GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || 'elite-tint-project';
process.env.GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify(process.env.GOOGLE_CLOUD_PROJECT),
    'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify(process.env.GOOGLE_CLOUD_LOCATION)
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
});
