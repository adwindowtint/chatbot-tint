import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Usamos jsxRuntime: 'classic' para evitar conflictos con el importmap de React
  plugins: [react({ jsxRuntime: 'classic' })],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify('elite-tint-project'),
    'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify('us-central1')
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      // ¡LA SOLUCIÓN A LA PANTALLA EN BLANCO!
      // Le decimos a Vite que NO empaquete estas librerías. 
      // El navegador las descargará traducidas y listas para usar gracias al importmap en index.html
      external: ['react', 'react-dom', 'react-dom/client', '@google/genai']
    }
  }
});
