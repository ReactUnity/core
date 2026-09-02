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
  build: { outDir: '../Assets/Resources/react' },
}));
