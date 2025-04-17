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
        const source = resolve(__dirname, '../components/dist/bundle.js');
        const destination = resolve(__dirname, 'dist/assets/lit-bundle.js');
        const destDir = dirname(destination);
        mkdirSync(destDir, { recursive: true });
        copyFileSync(source, destination);
        console.log('Lit bundle copied to assets folder');
      },
    },
  ],
  base: '/kb-component-lib/',
});