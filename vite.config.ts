import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    // Simulamos las variables que exige Vertex AI para evitar el Error 500
    'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify('elite-tint-project'),
    'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify('us-central1')
  },
  build: {
    outDir: 'dist',
    target: 'esnext'
  },
});
