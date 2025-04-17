import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import './index.scss';

const router = createRouter({ 
  routeTree,
  basepath: (import.meta as any).env.MODE === 'production' ? '/kb-component-lib' : '/',
 });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}