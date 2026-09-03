// Appends harness.js to the built bundle, and writes it out on its own as rerender.js.
//
// It is appended rather than spliced into the bundle, which is what happened under webpack:
// the harness has to reach Unity verbatim, because /*INJECT_CODE*/ is a marker TestHelpers
// replaces with a fixture's code at runtime and no bundler is obliged to keep a comment.
// Everything the harness needs is left on globalThis by src/index.ts.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = '/*INJECT_CODE*/';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, '../../../Tests/Runtime/Resources/ReactUnity/tests/injectable');

const harness = fs.readFileSync(path.join(here, 'harness.js'), 'utf8');
const bundlePath = path.join(outDir, 'index.js');
const bundle = fs.readFileSync(bundlePath, 'utf8');

// Appending twice would give the fixture two harnesses and one marker each.
if (bundle.includes(MARKER)) throw new Error(`${bundlePath} already carries a harness. Run \`vite build\` first.`);

// TestHelpers replaces every occurrence, so a second one -- even inside a comment -- splices
// the fixture's code somewhere it does not parse.
const markers = harness.split(MARKER).length - 1;
if (markers !== 1) throw new Error(`harness.js must contain exactly one ${MARKER}, found ${markers}.`);

fs.writeFileSync(bundlePath, `${bundle}\n${harness}`);
fs.writeFileSync(path.join(outDir, 'rerender.js'), harness);
