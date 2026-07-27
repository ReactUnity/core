import { defineConfig } from 'tsdown';

/*
 * tsc is the type checker here, not the compiler -- `pnpm typecheck` runs it with
 * `noEmit`, and this file owns the build.
 *
 * Two things about this config are load-bearing, and both are consequences of what the
 * old `tsc` output looked like rather than free choices:
 *
 * `target: 'es2015'`. The published dist used to be ES5 so it would run on every engine
 * ReactUnity supports without the consumer's bundler having to transpile node_modules.
 * Rolldown cannot produce that -- it rejects the option outright ("Rolldown only supports
 * ES2015 (ES6) and later"), so es2015 is the floor and this is as close as a bundler gets.
 * What makes that safe here: the Jint package ships Jint 4 (Plugins/Jint carries
 * Acornima.dll, the parser Jint 4 replaced Esprima.NET with), which handles ES2015+;
 * QuickJS is ES2020 and ClearScript is V8. And react-unity-scripts already runs Babel over
 * node_modules (`babel-preset-react-app/dependencies` in config/webpack.config.js), so an
 * app built the documented way lowers this again on the way to Unity.
 *
 * The explicit `entry` map. package.json's exports has wildcard subpaths --
 * "./ugui/*": "./dist/ugui/*.js" -- so the file *names* under dist are the public API.
 * Listing entries as an object pins each output path instead of letting rolldown infer a
 * common base and shift everything up a directory.
 */
export default defineConfig({
  entry: {
    index: 'index.ts',
    tests: 'tests.ts',
    'webgl-compat': 'webgl-compat.ts',
    'ugui/index': 'ugui/index.ts',
    'ugui/jsx-runtime': 'ugui/jsx-runtime.ts',
    'ugui/jsx-dev-runtime': 'ugui/jsx-dev-runtime.ts',
    'uitoolkit/index': 'uitoolkit/index.ts',
    'uitoolkit/jsx-runtime': 'uitoolkit/jsx-runtime.ts',
    'uitoolkit/jsx-dev-runtime': 'uitoolkit/jsx-dev-runtime.ts',
    'editor/index': 'editor/index.ts',
    'editor/jsx-runtime': 'editor/jsx-runtime.ts',
    'editor/jsx-dev-runtime': 'editor/jsx-dev-runtime.ts',
  },
  outDir: 'dist',
  format: 'esm',
  target: 'es2015',
  /*
   * tsdown externalises `dependencies` and `peerDependencies` automatically, but
   * react-unity-webgl is a *devDependency* -- src/webgl-compat uses it for types only and
   * re-exports them as part of this package's own surface. Left to bundle, the dts step
   * follows it into node_modules and dies on a broken relative import inside the published
   * package (declarations/unity-instance.d.ts imports "../source/types/…", which 9.9.0
   * does not ship). Externalising it also reproduces what tsc did: emit a bare
   * `from 'react-unity-webgl'` and let the consumer supply the types, which is the
   * arrangement /webgl-compat has always had.
   *
   * A regex rather than the bare name: src/webgl-compat imports deep subpaths for the
   * types that package does not re-export from its root
   * ('react-unity-webgl/declarations/unity-instance',
   * 'react-unity-webgl/distribution/types/unity-context-hook'), and an exact-match entry
   * leaves those to be bundled.
   */
  external: [/^react-unity-webgl(\/|$)/],
  dts: true,
  sourcemap: true,
  clean: true,
  // The package has no `"type": "module"`, so tsdown would name ESM output .mjs. Every
  // path in the exports map ends in .js, which is what tsc emitted -- consumers resolve
  // these through a bundler, which reads the ESM in them regardless of extension.
  outExtensions: () => ({ js: '.js' }),
});
