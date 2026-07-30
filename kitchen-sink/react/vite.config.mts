import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
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
      // iife only for real builds. `bundledDev` bundles the dev server output with these same
      // options, and under iife rolldown rewrites `import.meta` to `{}` — which makes the Vite
      // HMR client throw on `new URL(import.meta.url)` before it ever opens its socket. The dev
      // bundle is left as-is instead; ReactUnity rewrites the module-only syntax it contains for
      // the engines that need it (only ClearScript runs real modules).
      output: command === 'build' ? { format: 'iife', inlineDynamicImports: true } : {},
    },
  },
  experimental: {
    bundledDev: true,
  },
}));
