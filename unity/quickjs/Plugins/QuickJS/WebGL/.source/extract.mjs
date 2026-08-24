/*
 * Pulls pieces of the generated jslib out so Node can run them.
 *
 * The jslib cannot be imported: it is an Emscripten library object, its members are
 * stringified into the build output rather than executed here, and it carries `{{{ }}}`
 * macros that are not JavaScript at all. But the module machinery is ordinary code, and
 * testing the generated artifact is worth more than testing a parallel copy of it -- the
 * whole point of the .source directory is that nobody edits the jslib by hand.
 *
 * So: read the file, substitute the macros for a direct call, and cut out the members the
 * tests need by brace matching.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const JSLIB = fileURLToPath(new URL('../jsbplugin.jslib', import.meta.url));

/** `{{{ makeDynCall('viiiii', 'loader') }}}(a, b)` -> `loader(a, b)`.
 *
 * Faithful for this purpose: a dyncall is a plain call through a function table, and a stub
 * standing in for the host takes the same arguments in the same order. What it cannot check
 * is that the signature string matches the host's real ABI. */
function expandMacros(text) {
  return text.replace(/\{\{\{\s*makeDynCall\('\w+',\s*'([A-Za-z0-9_$]+)'\)\s*\}\}\}/g, '$1');
}

/** The source of `name: 'value',` from an object literal. */
function stringMember(text, name) {
  const found = new RegExp('^\\s*' + name + ":\\s*'((?:[^'\\\\]|\\\\.)*)'", 'm').exec(text);
  if (!found) throw new Error(`no string member ${name} in the jslib`);
  return `${name}: '${found[1]}'`;
}

/** The source of `name: function (...) {...}` or `name: {...}`, from an object literal. */
function member(text, name) {
  const start = text.search(new RegExp('^\\s*' + name + ':', 'm'));
  if (start < 0) throw new Error(`no member ${name} in the jslib`);

  let i = text.indexOf(':', start) + 1;
  // Past whitespace and any `function (...)` header to the body's opening brace.
  const open = text.indexOf('{', i);
  let depth = 0;

  for (i = open; i < text.length; i++) {
    const c = text[i];
    if (c === '"' || c === "'") {
      i = skipString(text, i);
      continue;
    }
    if (c === '/' && text[i + 1] === '/') {
      i = text.indexOf('\n', i);
      continue;
    }
    if (c === '/' && text[i + 1] === '*') {
      i = text.indexOf('*/', i) + 1;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return text.slice(start, i + 1).trim();
  }

  throw new Error(`unterminated member ${name}`);
}

function skipString(text, at) {
  const quote = text[at];
  for (let i = at + 1; i < text.length; i++) {
    if (text[i] === '\\') i++;
    else if (text[i] === quote) return i;
  }
  return text.length;
}

/**
 * Builds a `unityJsbState` carrying the real module machinery, over stubs for everything
 * that only exists inside an Emscripten module.
 *
 * `heap` is the fake one: bufferify/stringify move strings through it by id rather than
 * bytes, which is all the module code does with them. Every allocation is tracked, so a
 * test can assert the code frees what it takes.
 */
export function loadModuleMachinery() {
  const jslib = expandMacros(readFileSync(JSLIB, 'utf8'));

  const members = [
    stringMember(jslib, 'moduleRegistryKey'),
    stringMember(jslib, 'moduleImportHook'),
    ...['moduleReservedNames', 'scanModule', 'createModuleRegistry'].map((name) => member(jslib, name)),
  ];

  const entries = ['JS_FulfillModuleLoad', 'JS_RejectModuleLoad'].map((name) => member(jslib, name));

  const heap = new Map();
  let nextPtr = 1;
  const live = new Set();

  const stubs = {
    _malloc(size) {
      const ptr = nextPtr++;
      heap.set(ptr, size);
      live.add(ptr);
      return ptr;
    },
    _free(ptr) {
      if (!live.delete(ptr)) throw new Error(`double free or bad free of ${ptr}`);
      heap.delete(ptr);
    },
    /** A pointer the host owns, for a stub standing in for js_strndup. */
    hostString(value) {
      const ptr = nextPtr++;
      heap.set(ptr, value);
      live.add(ptr);
      return ptr;
    },
    read(ptr) {
      return heap.get(ptr);
    },
    live,
  };

  // `lengthBytesUTF8`/`stringToUTF8` are not stubbed, because bufferify is: it is replaced
  // wholesale below rather than run over a fake heap byte by byte.
  const factory = new Function(
    '_malloc',
    '_free',
    'hostString',
    'heap',
    `
    var unityJsbState = {
      bufferify: function (value) {
        var ptr = _malloc(1);
        heap.set(ptr, String(value));
        return [ptr, 1];
      },
      stringify: function (ptr) {
        return ptr ? heap.get(ptr) : '';
      },
      getContext: function (id) { return unityJsbState.contexts[id]; },
      contexts: {},
      ${members.join(',\n      ')},
      entryPoints: {
        ${entries.join(',\n        ')}
      }
    };
    return unityJsbState;
    `
  );

  const state = factory(stubs._malloc, stubs._free, stubs.hostString, heap);
  return { state, stubs };
}

/**
 * A PluginContext with the browser swapped for what Node can do.
 *
 * Only two things change. Modules become `data:` urls rather than blob urls, because Node's
 * loader refuses a `blob:` one -- and data urls have the property under test anyway, an
 * opaque base that no relative specifier can resolve against. And the host's normalizer and
 * loader are the test's own.
 */
export function createTestContext(state, stubs, { resolve, load, id = 3, hostGlobals = {} }) {
  const runtime = {
    moduleOpaque: 0,
    pendingModuleLoads: {},
    lastModuleLoadId: 0,
    refs: {
      allocate: () => [stubs._malloc(16), undefined],
      get: (ptr) => stubs.read(ptr),
    },
  };

  runtime.moduleNormalize = (ctx, referrerPtr, specifierPtr, opaque) => {
    const resolved = resolve(stubs.read(referrerPtr), stubs.read(specifierPtr));
    return resolved == null ? 0 : stubs.hostString(resolved);
  };

  runtime.moduleLoader = (ctx, namePtr, attributesPtr, opaque, ticket) => {
    const name = stubs.read(namePtr);
    Promise.resolve()
      .then(() => load(name))
      .then(
        (source) => {
          const ptr = stubs.hostString(source);
          state.entryPoints.JS_FulfillModuleLoad(id, ticket, ptr, source.length);
          stubs._free(ptr);
        },
        (error) => {
          const ptr = stubs.hostString(error instanceof Error ? error : new Error(String(error)));
          state.entryPoints.JS_RejectModuleLoad(id, ticket, ptr);
          stubs._free(ptr);
        }
      );
  };

  const globals = new Proxy(hostGlobals, {
    get: (target, p) => (p in target ? target[p] : globalThis[p]),
    set: (target, p, value) => {
      target[p] = value;
      return true;
    },
    has: (target, p) => p in target || p in globalThis,
  });

  // The same aliases JS_NewContext installs, and for the same reason: a bundle reaches the
  // global object by one of these names, and it has to be the proxy rather than the realm's.
  for (const alias of ['globalThis', 'global', 'window', 'parent', 'self', 'this']) {
    hostGlobals[alias] = globals;
  }

  const context = {
    id,
    runtime,
    hostGlobals,
    globalObject: globals,
    contentWindow: { Promise },
    importModule: (url) => import(url),
    createBlobUrl: (text) => `data:text/javascript;base64,${Buffer.from(text, 'utf8').toString('base64')}`,
    revokeBlobUrl: () => {},
  };

  context.modules = state.createModuleRegistry(context);
  state.contexts[id] = context;

  const registry = (globalThis[state.moduleRegistryKey] ||= {});
  registry[id] = { globals, dynamicImport: context.modules.dynamicImport };
  hostGlobals[state.moduleImportHook] = context.modules.dynamicImport('');

  return context;
}
