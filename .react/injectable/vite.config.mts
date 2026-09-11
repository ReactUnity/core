import reactUnity from '@reactunity/renderer/vite';
import { defineConfig, type Plugin } from 'vite';

// The stylesheets material's components import have nowhere to go here: the output is one
// script, and an extracted .css beside it is a file nothing would ever load. Under webpack
// they were injected at runtime by style-loader; no fixture in the suite renders a styled
// material component, so they are dropped instead.
const dropExtractedCss: Plugin = {
  name: 'injectable:drop-extracted-css',
  // Post: Vite's own css plugin adds the asset in its generateBundle, so an unordered
  // hook here can run before there is anything to remove.
  generateBundle: {
    order: 'post',
    handler(_options, bundle) {
      for (const file of Object.keys(bundle)) {
        if (file.endsWith('.css')) delete bundle[file];
      }
    },
  },
};

// TestHelpers loads this bundle's text, substitutes a fixture's code into the
// /*INJECT_CODE*/ marker and runs the result as one plain script -- so unlike the other
// apps here it has to end up as a single non-module file under a fixed name. Library mode
// in `iife` format is what produces that; an app build would emit an index.html pointing at
// a chunk.
//
// The marker lives in scripts/harness.js, which scripts/append-harness.mjs appends after
// this build rather than bundling -- which is what lets the bundle itself be minified.
export default defineConfig({
  // No JSX here any more: src/index.ts only hands the bundled libraries to the harness.
  plugins: [reactUnity({ react: false, preserve: ['rerender.js'] }), dropExtractedCss],
  // An app build substitutes this itself; a library build leaves it to the consumer, and
  // this one's consumer is a JS engine inside Unity with no process object to read. React's
  // package entries branch on it, so without this the harness throws before it renders.
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    // Spelled out because the plugin's discovery has nothing to find: the output belongs to
    // a UPM package, not to a Unity project.
    outDir: '../../Tests/Runtime/Resources/ReactUnity/tests/injectable',
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      name: 'ReactUnityInjectable',
      fileName: () => 'index.js',
    },
  },
});
