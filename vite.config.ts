mport { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify('elite-tint-project'),
    'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify('us-central1'),
    // Esta es la llave final que pide la librería de Google para dejarnos compilar
    'process.env.PROXY_HEADER': JSON.stringify('x-proxy-header')
  }
});
