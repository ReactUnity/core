/*
 * Tests the module machinery in the generated jslib.
 *
 *     node --test unity/quickjs/Plugins/QuickJS/WebGL/.source
 *
 * There is no QuickJS on WebGL, and no way to run the jslib outside a browser either -- so
 * the part that carries real risk is tested here instead: the scanner that decides what in a
 * module's source has to be rewritten, and the graph loader that turns a source into modules
 * a JS engine can import. Both run on the generated artifact (see extract.mjs), against the
 * platform's own dynamic import.
 *
 * What this cannot cover is the C boundary: the dyncall signatures, the JSValue layout, and
 * whether Unity's WebGL build lets `new Function` and blob urls through. That needs a player.
 */
import assert from 'node:assert/strict';
import { before, describe, it } from 'node:test';
import { createTestContext, loadModuleMachinery } from './extract.mjs';

let state;
let stubs;

before(() => {
  ({ state, stubs } = loadModuleMachinery());
});

/** The specifiers a scan found, in source order. */
function specifiers(source) {
  return state
    .scanModule(source)
    .edits.filter((edit) => edit.specifier !== null)
    .map((edit) => edit.specifier);
}

/** The count of dynamic imports a scan found. */
function dynamics(source) {
  return state.scanModule(source).edits.filter((edit) => edit.specifier === null).length;
}

function bindings(source) {
  return Object.keys(state.scanModule(source).bindings).sort();
}

describe('scanModule: static imports and exports', () => {
  it('finds every declaration form', () => {
    assert.deepEqual(specifiers("import './a';"), ['./a']);
    assert.deepEqual(specifiers("import d from './a';"), ['./a']);
    assert.deepEqual(specifiers("import * as ns from './a';"), ['./a']);
    assert.deepEqual(specifiers("import { a, b as c } from './a';"), ['./a']);
    assert.deepEqual(specifiers("import d, { a } from './a';"), ['./a']);
    assert.deepEqual(specifiers("import d, * as ns from './a';"), ['./a']);
    assert.deepEqual(specifiers("export * from './a';"), ['./a']);
    assert.deepEqual(specifiers("export * as ns from './a';"), ['./a']);
    assert.deepEqual(specifiers("export { a, b as c } from './a';"), ['./a']);
  });

  it('keeps them in source order, and keeps duplicates', () => {
    assert.deepEqual(specifiers("import 'a';\nimport 'b';\nexport * from 'a';"), ['a', 'b', 'a']);
  });

  it('reads both quote styles, and no separating whitespace', () => {
    assert.deepEqual(specifiers('import d from"./a";'), ['./a']);
    assert.deepEqual(specifiers("import'./a'"), ['./a']);
  });

  it('leaves an export that declares rather than re-exports alone', () => {
    assert.deepEqual(specifiers('export const a = 1;'), []);
    assert.deepEqual(specifiers('export default function () {}'), []);
    assert.deepEqual(specifiers('const a = 1; export { a };'), []);
  });

  it('ignores anything that is not a declaration at the top level', () => {
    // A nested `import` cannot be a declaration, so it is not one here either.
    assert.deepEqual(specifiers("function f() { const x = 'import \"./a\"'; }"), []);
    assert.deepEqual(specifiers("// import './a';"), []);
    assert.deepEqual(specifiers("/* import './a'; */"), []);
    assert.deepEqual(specifiers("const s = \"import './a'\";"), []);
    assert.deepEqual(specifiers("const s = 'import \"./a\"';"), []);
    assert.deepEqual(specifiers('const s = `import "./a"`;'), []);
  });

  it('does not mistake import.meta for a declaration', () => {
    assert.deepEqual(specifiers("const u = import.meta.url; import './a';"), ['./a']);
    assert.equal(dynamics('const u = import.meta.url;'), 0);
  });
});

describe('scanModule: dynamic imports', () => {
  it('finds one at any depth', () => {
    assert.equal(dynamics("import('./a')"), 1);
    assert.equal(dynamics("function f() { return import('./a'); }"), 1);
    assert.equal(dynamics("const p = cond ? import('./a') : import('./b');"), 2);
    assert.equal(dynamics("await import('./a')"), 1);
  });

  it('spans exactly the keyword, so the call is left as written', () => {
    const source = "const p = import('./a');";
    const [edit] = state.scanModule(source).edits;
    assert.equal(source.slice(edit.start, edit.end), 'import');
  });

  it('is not confused by a property named import', () => {
    assert.equal(dynamics('obj.import(x)'), 0);
    assert.equal(dynamics('obj . import ( x )'), 0);
  });

  it('ignores the word inside a string or a comment', () => {
    assert.equal(dynamics("throw new Error('the result of a dynamic import() call')"), 0);
    assert.equal(dynamics('// import(x)'), 0);
    assert.equal(dynamics('const re = /import\\(/;'), 0);
  });
});

describe('scanModule: top-level bindings', () => {
  it('collects lexical declarations, which a prelude cannot shadow', () => {
    assert.deepEqual(bindings('const URL = 1;'), ['URL']);
    assert.deepEqual(bindings('let a, b;'), ['a', 'b']);
    assert.deepEqual(bindings('const a = 1, b = 2;'), ['a', 'b']);
    assert.deepEqual(bindings('function f() {}'), ['f']);
    assert.deepEqual(bindings('class C extends D {}'), ['C']);
    assert.deepEqual(bindings('export const fetch = 1;'), ['fetch']);
  });

  it('leaves `var` out, because two var declarations of one name are legal', () => {
    assert.deepEqual(bindings('var URL = 1;'), []);
  });

  it('does not collect names from an initializer', () => {
    assert.deepEqual(bindings('const a = fetch(URL);'), ['a']);
    assert.deepEqual(bindings('const a = b ? c : d, e = f;'), ['a', 'e']);
  });

  it('does not collect what is declared inside a function', () => {
    assert.deepEqual(bindings('function f() { const URL = 1; }'), ['f']);
  });

  it('collects the names an import declaration binds, renames included', () => {
    assert.deepEqual(bindings("import fetch from './a';"), ['fetch']);
    assert.deepEqual(bindings("import { a as URL } from './a';"), ['URL']);
    assert.deepEqual(bindings("import { a, b } from './a';"), ['a', 'b']);
    assert.deepEqual(bindings("import * as URL from './a';"), ['URL']);
    // A re-export names exports, not local bindings.
    assert.deepEqual(bindings("export { a as URL } from './a';"), []);
  });
});

describe('scanModule: staying in sync with the source', () => {
  it('is byte-exact about where a specifier sits', () => {
    const source = "import a from './dep';\n";
    const [edit] = state.scanModule(source).edits;
    assert.equal(source.slice(edit.start, edit.end), "'./dep'");
  });

  it('survives a regex literal that contains a quote or a brace', () => {
    const source = "const re = /['\"{]/g;\nimport './a';";
    assert.deepEqual(specifiers(source), ['./a']);
  });

  it('survives a template with a substitution', () => {
    assert.deepEqual(specifiers("const s = `a${ {x: 1} }b`;\nimport './a';"), ['./a']);
  });

  it('unescapes a specifier', () => {
    assert.deepEqual(specifiers("import 'a\\u0062'"), ['au0062']);
  });
});

/** Runs a graph through the registry and returns the root's namespace. */
async function evaluate(sources, { root = 'root', hostGlobals = {} } = {}) {
  const context = createTestContext(state, stubs, {
    hostGlobals,
    // Absolute names already; the tests write the graph flat.
    resolve: (referrer, specifier) => (specifier in sources || specifier === root ? specifier : null),
    load: (name) => {
      // A null source stands in for a request that came back a failure.
      if (sources[name] == null) throw new Error(`no such module ${name}`);
      return sources[name];
    },
  });

  return context.modules.evaluate(root, sources[root]);
}

describe('the module graph', () => {
  it('evaluates a root with no dependencies', async () => {
    const ns = await evaluate({ root: 'export const answer = 42;' });
    assert.equal(ns.answer, 42);
  });

  it('links a dependency the host fetched', async () => {
    const ns = await evaluate({
      root: "import { n } from 'dep';\nexport const answer = n * 2;",
      dep: 'export const n = 21;',
    });
    assert.equal(ns.answer, 42);
  });

  it('links a diamond once, so a shared dependency evaluates once', async () => {
    const tally = { evaluations: 0 };
    const ns = await evaluate(
      {
        root: "import { a } from 'left';\nimport { b } from 'right';\nexport const answer = a + b;",
        left: "import { count } from 'shared';\nexport const a = count;",
        right: "import { count } from 'shared';\nexport const b = count;",
        shared: 'tally.evaluations++;\nexport const count = 21;',
      },
      { hostGlobals: { tally } }
    );

    assert.equal(ns.answer, 42);
    assert.equal(tally.evaluations, 1);
  });

  it('keeps live bindings, because the platform does the linking', async () => {
    const ns = await evaluate({
      root: "export { value, bump } from 'dep';",
      dep: 'export let value = 1;\nexport function bump() { value++; }',
    });

    assert.equal(ns.value, 1);
    ns.bump();
    assert.equal(ns.value, 2);
  });

  it('rejects, naming the path, when the graph has a cycle', async () => {
    await assert.rejects(
      evaluate({ root: "import 'a';", a: "import 'b';", b: "import 'a';" }),
      /Circular imports are not supported on WebGL: root -> a -> b -> a/
    );
  });

  it('rejects, naming the specifier, when the host cannot resolve one', async () => {
    await assert.rejects(evaluate({ root: "import './nope';" }), /Could not resolve '\.\/nope' from 'root'/);
  });

  it('rejects, naming the module, when the host cannot fetch one', async () => {
    await assert.rejects(evaluate({ root: "import 'dep';", dep: null }), /no such module dep/);
  });

  it('frees every pointer it takes from the host', async () => {
    const before = stubs.live.size;
    await evaluate({ root: "import 'dep';\nexport const ok = true;", dep: 'export const n = 1;' });
    assert.equal(stubs.live.size, before);
  });
});

describe('import.meta', () => {
  it('reports the name the host resolved, not the url the module was assembled at', async () => {
    const ns = await evaluate(
      { 'https://host/app.js': 'export const here = import.meta.url;' },
      { root: 'https://host/app.js' }
    );
    assert.equal(ns.here, 'https://host/app.js');
  });

  it('is set on a dependency too', async () => {
    const ns = await evaluate({
      root: "export { where } from 'https://host/dep.js';",
      'https://host/dep.js': 'export const where = import.meta.url;',
    });
    assert.equal(ns.where, 'https://host/dep.js');
  });
});

/** Host globals that record which of them the prelude actually declared.
 *
 * The prelude reads each name off the globals proxy, which reads it off this object, so a
 * getter is how "was this name declared" becomes observable from outside. */
function probeGlobals(names) {
  const seen = [];
  const hostGlobals = {};

  for (const name of names) {
    Object.defineProperty(hostGlobals, name, {
      enumerable: true,
      configurable: true,
      get() {
        seen.push(name);
        return () => 1;
      },
    });
  }

  return { hostGlobals, read: () => seen.slice().sort() };
}

describe('the globals prelude', () => {
  it('gives a module the host globals it mentions', async () => {
    const ns = await evaluate({ root: 'export const answer = UnityBridge.answer;' }, { hostGlobals: { UnityBridge: { answer: 42 } } });
    assert.equal(ns.answer, 42);
  });

  it('shadows a global the host hid, rather than leaking the realm\'s own', async () => {
    // `location` is `undefined` on purpose in this backend, and a module has to see that
    // rather than the page's.
    globalThis.location ??= { href: 'https://the-page/' };
    const ns = await evaluate({ root: 'export const seen = typeof location;' }, { hostGlobals: { location: undefined } });
    assert.equal(ns.seen, 'undefined');
  });

  it('does not shadow a name the module declares itself', async () => {
    const ns = await evaluate(
      { root: 'const fetch = () => 42;\nexport const answer = fetch();' },
      { hostGlobals: { fetch: () => 1 } }
    );
    assert.equal(ns.answer, 42);
  });

  it('lets a module redeclare a host global with var, and win', async () => {
    const ns = await evaluate(
      { root: 'var fetch = () => 42;\nexport const answer = fetch();' },
      { hostGlobals: { fetch: () => 1 } }
    );
    assert.equal(ns.answer, 42);
  });

  it('declares only the names the module mentions', async () => {
    const { hostGlobals, read } = probeGlobals(['console', 'fetch', 'UnityBridge']);
    await evaluate({ root: 'export const answer = fetch(1);' }, { hostGlobals });

    // A name the module never writes costs a `var` binding and a property read for nothing,
    // and every name declared is a name that could collide with one of the module's own.
    assert.deepEqual(read(), ['fetch']);
  });

  it('does not declare a name that only ever appears after a dot', async () => {
    const { hostGlobals, read } = probeGlobals(['fetch']);
    const ns = await evaluate({ root: 'const obj = { n: 42 };\nexport const answer = obj.fetch ?? obj.n;' }, { hostGlobals });

    assert.deepEqual(read(), []);
    assert.equal(ns.answer, 42);
  });

  it('gives a module the globals proxy as globalThis, not the realm\'s own', async () => {
    // The trap this guards: `globalThis` is one of the host globals, so a module that mentions
    // it gets a `var` for it - and a `var` hoists over the whole module, including the prelude
    // that has to read the registry off the real global object first.
    const hostGlobals = { marker: 'the proxy' };
    const ns = await evaluate(
      { root: 'export const seen = globalThis.marker;\nglobalThis.written = 1;' },
      { hostGlobals }
    );

    assert.equal(ns.seen, 'the proxy');
    assert.equal(hostGlobals.written, 1, 'a write through globalThis should land on the host globals');
    assert.equal('written' in globalThis, false, 'and not on the realm');
  });

  it('does the same for window, which is the same object', async () => {
    const hostGlobals = { marker: 'the proxy' };
    const ns = await evaluate({ root: 'export const seen = window.marker;' }, { hostGlobals });
    assert.equal(ns.seen, 'the proxy');
  });

  it('never declares a reserved word, whatever the host installed', async () => {
    // extraGlobals really does carry a `this`, so the filter is not hypothetical.
    const ns = await evaluate({ root: 'export const ok = true;' }, { hostGlobals: { this: {}, class: 1 } });
    assert.equal(ns.ok, true);
  });

  it('moves no line number, so stack traces and the bundle\'s own source map stay right', async () => {
    // The prelude rides on the source's first line rather than taking one of its own, which
    // is the only reason this holds - see `assemble`.
    const ns = await evaluate({ root: '\n\n\nexport const line = new Error().stack;' });
    assert.match(ns.line, /:4:/);
  });
});

describe('dynamic import', () => {
  it('resolves through the host, and returns the real namespace', async () => {
    const ns = await evaluate({
      root: "export const load = () => import('dep');",
      dep: 'export const n = 42;',
    });

    const dep = await ns.load();
    assert.equal(dep.n, 42);
  });

  it('resolves relative to the module that wrote it', async () => {
    const seen = [];
    const context = createTestContext(state, stubs, {
      resolve: (referrer, specifier) => {
        seen.push([referrer, specifier]);
        return 'dep';
      },
      load: () => 'export const n = 42;',
    });

    const ns = await context.modules.evaluate('https://host/app.js', "export const load = () => import('./rel');");
    await ns.load();

    assert.deepEqual(seen.at(-1), ['https://host/app.js', './rel']);
  });

  it('rejects rather than throwing when the host cannot resolve one', async () => {
    const context = createTestContext(state, stubs, { resolve: () => null, load: () => '' });
    const ns = await context.modules.evaluate('root', "export const load = () => import('./nope');");
    await assert.rejects(ns.load(), /Could not resolve '\.\/nope' from 'root'/);
  });
});

describe('rewriteScript', () => {
  it('points a script\'s dynamic imports at the host hook', () => {
    const context = createTestContext(state, stubs, { resolve: (r, s) => s, load: () => '' });
    assert.equal(context.modules.rewriteScript("import('./a')"), `${state.moduleImportHook}('./a')`);
  });

  it('leaves a script with nothing to rewrite exactly as it was', () => {
    const context = createTestContext(state, stubs, { resolve: (r, s) => s, load: () => '' });
    const code = 'const a = 1; // no imports here\n';
    assert.equal(context.modules.rewriteScript(code), code);
    assert.equal(context.modules.rewriteScript('obj.import(x)'), 'obj.import(x)');
  });

  it('does not touch line count, so a script\'s stack traces stay right', () => {
    const context = createTestContext(state, stubs, { resolve: (r, s) => s, load: () => '' });
    const code = "a();\nimport('./a');\nb();";
    const lines = (text) => text.split('\n').length;
    assert.equal(lines(context.modules.rewriteScript(code)), lines(code));
  });
});
