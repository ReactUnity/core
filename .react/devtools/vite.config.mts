import reactUnity from '@reactunity/renderer/vite';
import { defineConfig } from 'vite';

// DevToolsWindow loads ReactUnity/editor/devtools/index out of the core package's Editor
// resources, and points at this port instead when the window's dev server toggle is on
// (REACT_UNITY_DEVELOPER builds only).
//
// outDir is spelled out because the plugin's discovery has nothing to find: the output
// belongs to a UPM package, not to a Unity project.
export default defineConfig({
  server: { port: 4000, strictPort: true },
  plugins: [reactUnity()],
  build: { outDir: '../../Editor/Resources/ReactUnity/editor/devtools' },
});
