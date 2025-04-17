import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    {
      name: 'copy-lit-bundle',
      buildEnd() {
        const source = resolve(__dirname, '../components/dist/bundle.js');
        const destination = resolve(__dirname, 'dist/assets/lit-bundle.js');
        copyFileSync(source, destination);
        console.log('Lit bundle copied to assets folder');
      },
    },
  ],
  base: '/kb-component-lib/'
});