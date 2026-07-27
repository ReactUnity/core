import { defineConfig } from 'tsdown';

/*
 * tsc type checks (`pnpm typecheck`), tsdown builds. See packages/renderer/tsdown.config.ts
 * for why the target is es2015 rather than the ES5 that tsc used to emit -- rolldown
 * refuses anything older, and Jint 4 / QuickJS / ClearScript all handle es2015.
 *
 * The entry glob is deliberate rather than a hand-written list. package.json maps the
 * subpath wildcard onto `dist/src/<name>/index.js`, so every directory under src/ that has
 * an index is a public subpath -- `@reactunity/material/accordion` and so on. (Spelling
 * that mapping out literally here would close this comment early: the pattern contains a
 * star followed by a slash.) Globbing means adding a
 * component keeps that promise without anyone remembering to edit this file. src/util is
 * the one directory with no index, so it stays internal and gets bundled into whatever
 * imports it, exactly as before.
 *
 * .scss is still copied by `copy-files` afterwards (tsdown cleans dist, so the order in
 * the build script matters): ./styles resolves to dist/src/styles/index.scss for consumers
 * whose bundler understands the "style" condition.
 */
export default defineConfig({
  entry: ['index.ts', 'src/*/index.ts', 'src/*/index.tsx'],
  outDir: 'dist',
  format: 'esm',
  target: 'es2015',
  dts: true,
  sourcemap: true,
  clean: true,
  /*
   * The .scss imports stay imports. These are ReactUnity stylesheets, not web CSS -- the
   * consumer's react-unity-scripts build runs them through sass-loader and hands the result
   * to Unity's own styling layer -- so anything that pre-processed them here would be
   * wrong, and tsdown's css-guard otherwise stops the build asking for `@tsdown/css`.
   * tsc simply preserved these specifiers, which is why `copy-files` mirrors the .scss into
   * dist/src; every one of them lives in an entry's own directory and is imported as
   * `./index.module.scss`, so the copied file sits right next to the chunk that asks for it.
   */
  external: [/\.scss$/],
  // No `"type": "module"` here either -- keep the .js the exports map already points at.
  outExtensions: () => ({ js: '.js' }),
});
