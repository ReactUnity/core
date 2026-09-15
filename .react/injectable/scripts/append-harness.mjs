// Writes harness.js next to the bundle vite just built, and checks the two still fit together.
//
// The harness is not bundled and no longer appended either: /*INJECT_CODE*/ is a marker
// TestHelpers replaces with a fixture's code at runtime, and no bundler is obliged to keep a
// comment. Everything the harness needs is left on globalThis by src/index.ts.
//
// The two are kept apart because index.js is the same 200 KB of React for every test in the
// suite while the harness is a few KB that differ per fixture. Splicing them made one string
// an engine had to parse from scratch every time -- 172 ms per test on Jint, where the parse
// is eight times the cost of running the result. Apart, the bundle is one constant text an
// engine can hold a parse of.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = '/*INJECT_CODE*/';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '../../../Tests/Runtime/Resources/ReactUnity/tests/injectable');

const harness = fs.readFileSync(path.join(here, 'harness.js'), 'utf8');
const bundle = fs.readFileSync(path.join(outDir, 'index.js'), 'utf8');

// TestHelpers replaces every occurrence, so a second one -- even inside a comment -- splices
// the fixture's code somewhere it does not parse.
const markers = harness.split(MARKER).length - 1;
if (markers !== 1) throw new Error(`harness.js must contain exactly one ${MARKER}, found ${markers}.`);

// The bundle is executed on its own before the harness, and the only thing that carries across
// is this global.
if (!bundle.includes('__reactUnityInjectable')) {
  throw new Error('index.js does not set __reactUnityInjectable. Run `vite build` first.');
}

fs.writeFileSync(path.join(outDir, 'harness.js'), harness);
fs.rmSync(path.join(outDir, 'rerender.js'), { force: true });
