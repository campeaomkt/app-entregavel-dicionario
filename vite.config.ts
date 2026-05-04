import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Dicionário de Acordes',
          short_name: 'Acordes',
          description: 'Dicionário de acordes de piano por Eliab Teclas',
          theme_color: '#1a1a1a',
          background_color: '#1a1a1a',
          display: 'standalone',
          icons: [
            {
              src: 'https://eliabcamposteclas.com/wp-content/uploads/2026/05/ChatGPT-Image-4-de-mai.-de-2026-14_04_42.jpg',
              sizes: '192x192',
              type: 'image/jpeg'
            },
            {
              src: 'https://eliabcamposteclas.com/wp-content/uploads/2026/05/ChatGPT-Image-4-de-mai.-de-2026-14_04_42.jpg',
              sizes: '512x512',
              type: 'image/jpeg'
            },
            {
              src: 'https://eliabcamposteclas.com/wp-content/uploads/2026/05/ChatGPT-Image-4-de-mai.-de-2026-14_04_42.jpg',
              sizes: '512x512',
              type: 'image/jpeg',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
