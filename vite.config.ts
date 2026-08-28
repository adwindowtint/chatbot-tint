import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Tomamos las variables directamente del panel de Vercel
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify(process.env.GOOGLE_CLOUD_PROJECT || 'elite-tint-project'),
    'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify(process.env.GOOGLE_CLOUD_LOCATION || 'us-central1')
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
});
