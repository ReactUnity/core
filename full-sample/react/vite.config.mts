import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = path.resolve(import.meta.dirname);

export default defineConfig({
  server: {
    port: 3100,
    strictPort: true,
    hmr: { host: 'localhost', clientPort: 3100, overlay: false },
  },
  devtools: false,
  plugins: [react()],
  build: {
    sourcemap: 'inline',
    manifest: true,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true },
    },
  },
  experimental: {
    bundledDev: true,
  },
});
