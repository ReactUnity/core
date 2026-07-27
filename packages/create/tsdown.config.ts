import { defineConfig } from 'tsdown';

/*
 * tsc no longer emits anything in this repo -- it is the type checker, tsdown is the
 * bundler. See the note in package.json.
 *
 * This package is a CLI, so there is nothing to declare: no `types` field, no consumer
 * importing it, hence `dts: false`. Output moved from the package root (where `tsc` put a
 * gitignored index.js next to the source) into dist/, which is where `files`, .gitignore
 * and Biome's ignore list already expect build output to be.
 */
export default defineConfig({
  entry: ['index.ts'],
  outDir: 'dist',
  format: 'esm',
  platform: 'node',
  target: 'node20.11',
  dts: false,
  sourcemap: true,
  clean: true,
  // tsdown defaults to .mjs for ESM. This package is `"type": "module"`, so .js already
  // means ESM here, and keeping the extension tsc used means `bin`/`main` do not have to
  // care which bundler produced the file.
  fixedExtension: false,
});
