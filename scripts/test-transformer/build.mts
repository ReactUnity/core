/*
 * Bundles Sucrase into the single script the Unity test runner loads inside QuickJS to
 * turn each fixture's JSX snippet into something an engine can execute.
 *
 * Why this exists at all: the transform runs *inside* the engine under test, on Unity's
 * main thread, so its call depth is charged to a C stack that is already deep. Babel did
 * not fit there -- see the note in CodeTransformer.cs. Sucrase does, because it rewrites a
 * token stream instead of building and traversing an AST.
 *
 * `target: es2017` is the floor the three engines share, not a downlevel request. The
 * transform's *output* keeps whatever modern syntax the snippet used, deliberately.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');

const outfile = join(root, 'unity/core/Editor/Resources/ReactUnity/tests/scripts/sucrase-standalone.js');
const version = require('sucrase/package.json').version;

await build({
  entryPoints: [join(here, 'entry.js')],
  bundle: true,
  platform: 'browser',
  target: 'es2017',
  format: 'iife',
  outfile,
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});

// Provenance in the file itself, the way the vendored polyfills carry their source URL:
// this is a generated artifact, and a hand-edit would be overwritten without warning.
const banner = [
  '/*',
  ` * Generated from sucrase@${version} -- do not edit.`,
  ' * Regenerate with `pnpm build:test-transformer` (scripts/test-transformer/build.mts).',
  ' */',
  '',
].join('\n');

writeFileSync(outfile, banner + readFileSync(outfile, 'utf8'));

console.log(`sucrase@${version} -> ${outfile.slice(root.length + 1)}`);
