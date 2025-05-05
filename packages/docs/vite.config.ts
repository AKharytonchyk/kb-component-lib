import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve, dirname } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    {
      name: 'copy-lit-bundle',
      writeBundle() {
        const source = resolve(__dirname, '../components/dist/bundle.min.js');
        const destination = resolve(__dirname, 'dist/assets/lit-bundle.js');
        const htmlSource = resolve(__dirname, '../components/dist/index.html');
        const htmlDestination = resolve(__dirname, 'dist/assets/e-index.html');
        const destDir = dirname(destination);
        mkdirSync(destDir, { recursive: true });
        copyFileSync(source, destination);
        copyFileSync(htmlSource, htmlDestination);
        console.log('Lit bundle copied to assets folder');
      },
    },
  ],
  base: process.env.NODE_ENV === 'production' ? '/kb-component-lib/' : '/',
});