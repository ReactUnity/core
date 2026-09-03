import reactUnity from '@reactunity/renderer/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 3100, strictPort: true },
  plugins: [reactUnity()],
});
