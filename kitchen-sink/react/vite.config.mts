import reactUnity from '@reactunity/renderer/vite';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: { port: 3100, strictPort: true },
  plugins: [
    // Components come from `?react`; a bare `.svg` import is still the asset URL, and `?raw`
    // the markup. svgo stays off, as it was under webpack -- it strips ids ReactUnity resolves.
    svgr({ svgrOptions: { ref: true, titleProp: true, svgo: false } }),
    tailwind(),
    reactUnity(),
  ],
});
