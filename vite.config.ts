import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Definimos las variables UNA POR UNA para no borrar las variables internas que necesita React (como NODE_ENV)
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify('elite-tint-project'),
    'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify('us-central1')
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
});
