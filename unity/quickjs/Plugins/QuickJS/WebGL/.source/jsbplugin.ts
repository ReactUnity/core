/**
 * Build with the following command:
 * npx -p typescript@5 tsc && node postbuild.mjs
 *
 * The version is pinned because TypeScript 7 removed every option this build
 * needs -- target ES5, outFile, module none, baseUrl, moduleResolution node --
 * and has no ES5 emit at all, which Emscripten still requires. A bare
 * `npx -p typescript tsc` fails on the config rather than producing anything.
 *
 * BEWARE: Using some syntaxes will make Emscripten fail while building
 * Such known syntaxes: Object spread (...), BigInt literals
 * The output is targeted for es5 as Emscripten only understands that syntax
 *
 * ES5 rules out more than syntax: anything tsc downlevels through a helper is unusable
 * here. `async`/`await` and generators become `__awaiter`/`__generator`, spread becomes
 * `__spreadArray`, `for...of` over an iterator becomes `__values`, and `class` with a base
 * becomes `__extends` -- and tsc emits those as top-level functions, of which Emscripten
 * emits nothing. It stringifies the library object's own members and drops the rest of the
 * file, so a helper reference is `undefined` the first time it runs. Plain `.then()`
 * chains, `forEach`, and functions.
 *
 * For the same reason a helper function has to live *on* `$unityJsbState` rather than at
 * the top of this file: only what is reachable from the library object survives.
 *
 * Also of note: `native/quickjs/check-jslib.py` reads `^    Name: function` out of the
 * generated jslib to find the entry points, and fails on one nothing declares. Members of
 * `$unityJsbState` are a level deeper and so invisible to it, which is what makes them the
 * right home for a helper.
 */

type PluginType = JSApiExternals & {
  $unityJsbState: typeof unityJsbState;
  $unityJsbState__postset?: string;
}

const UnityJSBPlugin: PluginType = {
  $unityJsbState__postset: 'unityJsbState.atoms = unityJsbState.createAtoms();\n',
  $unityJsbState: {
    createObjectReferences: function (): ObjectReferences {
      const getTag = function (object): Tags {
        if (object === undefined) return Tags.JS_TAG_UNDEFINED;
        if (object === null) return Tags.JS_TAG_NULL;
        if (typeof object === 'number') return Tags.JS_TAG_FLOAT64;
        if (typeof object === 'boolean') return Tags.JS_TAG_BOOL;
        if (typeof object === 'symbol') return Tags.JS_TAG_SYMBOL;
        if (typeof object === 'string') return Tags.JS_TAG_STRING;
        if (typeof object === 'bigint') return Tags.JS_TAG_BIG_INT;
        if (object instanceof Error) return Tags.JS_TAG_EXCEPTION;
        return Tags.JS_TAG_OBJECT;
      };

      const record: ObjectReferences['record'] = {};

      const map = new Map<any, number>();

      const payloadMap: ObjectReferences['payloadMap'] = new Map();

      const res: ObjectReferences = {
        record,
        lastId: 0,

        allocate(object) {
          const ptr = _malloc(Sizes.JSValue) as JSValue;
          const id = res.push(object, ptr);
          return [ptr as JSValue, id];
        },
        batchAllocate(objects) {
          const size = Sizes.JSValue;
          const len = objects.length;
          const arr = _malloc(size * len) as PointerArray<JSValue>;
          const ids = Array(len);

          for (let index = 0; index < len; index++) {
            const object = objects[index];
            const id = res.push(object, arr + (index * size) as JSValue);
            ids[index] = id;
          }

          return [arr, ids];
        },
        batchGet(ptrs, count) {
          const size = Sizes.JSValue;

          const arr = new Array(count);
          for (let index = 0; index < count; index++) {
            const object = res.get(ptrs + index * size as JSValue);
            arr[index] = object;
          }

          return arr;
        },
        push(object, ptr) {
          if (typeof object === 'undefined') {
            res.duplicateId(0, ptr);
            return;
          }

          if (typeof object === 'number') {
            if (typeof ptr === 'number') {
              HEAPF64[ptr >> 3] = object;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(Tags.JS_TAG_FLOAT64);
            }

            return;
          }

          if (typeof object === 'boolean') {
            if (typeof ptr === 'number') {
              HEAP32[ptr >> 2] = object ? 1 : 0;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(Tags.JS_TAG_BOOL);
            }

            return;
          }

          const foundId = map.get(object);

          if (foundId > 0) {
            res.duplicateId(foundId, ptr);
            return foundId;
          }

          const id = ++res.lastId;

          record[id] = {
            id,
            refCount: 0,
            value: object,
            tag: getTag(object),
          };

          map.set(object, id);

          res.duplicateId(id, ptr);

          return id;
        },
        get(val) {
          const tag = Number(unityJsbState.HEAP64()[(val >> 3) + 1]);

          if (tag === Tags.JS_TAG_INT) {
            return HEAP32[val >> 2];
          }
          else if (tag === Tags.JS_TAG_BOOL) {
            return !!HEAP32[val >> 2];
          }
          else if (tag === Tags.JS_TAG_FLOAT64) {
            return HEAPF64[val >> 3];
          }
          else {
            const id = HEAP32[val >> 2];
            if (id === 0) return undefined;
            const ho = record[id];
            return ho.value;
          }
        },
        getRecord(val) {
          const tag = Number(unityJsbState.HEAP64()[(val >> 3) + 1]);

          if (tag === Tags.JS_TAG_INT) {
            const value = HEAP32[val >> 2];
            return {
              id: -1,
              refCount: 0,
              value,
              tag,
            };
          }
          else if (tag === Tags.JS_TAG_BOOL) {
            const boolValue = !!HEAP32[val >> 2];
            return {
              id: -1,
              refCount: 0,
              value: boolValue,
              tag,
            };
          }
          else if (tag === Tags.JS_TAG_FLOAT64) {
            const value = HEAPF64[val >> 3];
            return {
              id: -1,
              refCount: 0,
              value,
              tag,
            };
          }
          else {
            const id = HEAP32[val >> 2];
            if (id === 0) return {
              id: 0,
              refCount: 0,
              value: undefined,
              tag: Tags.JS_TAG_UNDEFINED,
              type: BridgeObjectType.None,
              payload: -1,
            };
            const ho = record[id];
            return ho;
          }
        },
        duplicate(obj, ptr) {
          const tag = Number(unityJsbState.HEAP64()[(obj >> 3) + 1]);

          if (tag === Tags.JS_TAG_FLOAT64) {
            if (typeof ptr === 'number') {
              const val = HEAPF64[(obj >> 3)];
              HEAPF64[ptr >> 3] = val;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
            }
            return;
          }
          else if (tag === Tags.JS_TAG_INT) {
            if (typeof ptr === 'number') {
              const val = HEAP32[(obj >> 2)];
              HEAP32[(ptr >> 2)] = val;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
            }
            return;
          }
          else if (tag === Tags.JS_TAG_BOOL) {
            if (typeof ptr === 'number') {
              const valBool = !!HEAP32[(obj >> 2)];
              HEAP32[(ptr >> 2)] = valBool ? 1 : 0;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
            }
            return;
          }

          const id = HEAP32[obj >> 2];
          res.duplicateId(id, ptr);
        },
        duplicateId(id, ptr) {
          if (id === 0) {
            if (typeof ptr === 'number') {
              HEAP32[ptr >> 2] = 0;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(Tags.JS_TAG_UNDEFINED);
            }
            return;
          }

          const ho = record[id];

          ho.refCount += 1;

          if (typeof ptr === 'number') {
            HEAP32[ptr >> 2] = id;
            HEAP32[(ptr >> 2) + 1] = 0;
            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(ho.tag);
          }
        },
        pop(obj) {
          const tag = Number(unityJsbState.HEAP64()[(obj >> 3) + 1]);

          if (tag === Tags.JS_TAG_FLOAT64
            || tag === Tags.JS_TAG_INT
            || tag === Tags.JS_TAG_BOOL) return;

          const id = HEAP32[obj >> 2];
          res.popId(id);
        },
        popId(id) {
          if (!id) return;
          const ho = record[id];
          ho.refCount -= 1;
          console.assert(ho.refCount >= 0);
        },
        deleteRecord(id) {
          const rec = record[id];
          delete record[id];
          res.clearPayload(rec.value);
          map.delete(rec.value);
        },
        payloadMap,
        setPayload(obj, type, payload) {
          payloadMap.set(obj, {
            type,
            payload,
          });
        },
        getPayload(obj) {
          const res = payloadMap.get(obj);

          if (res) return res;
          else {
            return {
              type: BridgeObjectType.None,
              payload: 0,
            };
          }
        },
        clearPayload(obj) {
          payloadMap.delete(obj);
        },
      };

      return res;
    },
    createAtoms(): AtomReferences {
      const record: AtomReferences['record'] = {};
      const map = new Map<string, AtomReference>();

      const res: AtomReferences = {
        record,
        lastId: 0,
        get(ref) {
          if (ref === 0) return undefined;
          return record[ref].value;
        },
        push(str) {
          if (str === undefined) return 0;
          const mapped = map.get(str);
          let id;

          if (!mapped) {
            id = ++res.lastId;
            const item = record[id] = {
              id,
              value: str,
              refCount: 1,
            };
            map.set(str, item);
          } else {
            id = mapped.id;
            mapped.refCount++;
          }

          return id;
        },
        pushId(id) {
          if (id === 0) return;

          const recorded = record[id];
          console.assert(!!recorded);
          if (!recorded) return 0;
          recorded.refCount++;

          return id;
        },
        pop(id) {
          if (id === 0) return;

          const recorded = record[id];
          console.assert(!!recorded);
          if (!recorded) return;

          recorded.refCount--;
          console.assert(recorded.refCount >= 0);

          if (recorded.refCount == 0) {
            map.delete(recorded.value);
            delete record[id];
          }
        },
      };

      return res;
    },
    stringify: function (ptr: number | Pointer<number>, bufferLength?: number) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(ptr, bufferLength); },
    bufferify: function (arg: string) {
      const bufferSize = lengthBytesUTF8(arg) + 1;
      const buffer = _malloc(bufferSize);
      stringToUTF8(arg, buffer, bufferSize);
      return [buffer, bufferSize];
    },

    // #region ES modules

    /** The page-level object a generated module reaches its context through. */
    // A module cannot see the globals proxy the rest of this backend runs inside: `with` is
    // illegal in module code, and a module's globalThis is its realm's, which the proxy is not.
    // So the proxy is published here and every module opens with a `var` destructuring of the
    // names it mentions.
    moduleRegistryKey: '__reactunity_jsb__',

    /** What a dynamic `import(...)` is rewritten to call. */
    moduleImportHook: '$$reactunityImport',

    /** Names the globals prelude can never declare, whatever the host installed. */
    // `this` is in here because the host really does install one - extraGlobals.this is the
    // proxy, so that `this` at the top of a script is the global object.
    moduleReservedNames: {
      arguments: true, await: true, break: true, case: true, catch: true, class: true,
      const: true, continue: true, debugger: true, default: true, delete: true, do: true,
      else: true, enum: true, eval: true, export: true, extends: true, false: true,
      finally: true, for: true, function: true, if: true, implements: true, import: true,
      in: true, instanceof: true, interface: true, let: true, new: true, null: true,
      package: true, private: true, protected: true, public: true, return: true, static: true,
      super: true, switch: true, this: true, throw: true, true: true, try: true, typeof: true,
      var: true, void: true, while: true, with: true, yield: true,
    },

    /** Everything in a module's source that has to change before a browser can run it.
     *
     * Rewriting is not a choice: a module reaches the browser as a blob url, and a blob has no
     * base for a relative specifier to resolve against, so every specifier has to be absolute
     * by then. The same pass finds the dynamic imports, which have to reach the host's loader
     * rather than the browser's own fetcher, and the names declared at the top level, which the
     * globals prelude must not redeclare.
     */
    // A scanner rather than a regex: `import` inside a string, a comment or a regex literal is
    // not an import, and generated bundles are full of all three. It is not a parser either --
    // it tracks bracket depth and skips anything quoted, which is enough to find declarations
    // at the top level and nothing deeper.
    scanModule: function (source: string): ModuleScan {
      const edits: ModuleEdit[] = [];
      const bindings: Record<string, boolean> = {};
      const mentions: Record<string, boolean> = {};
      const len = source.length;

      // Keywords a regex literal can follow. Everything else that ends in a value position
      // makes the next `/` a division.
      const beforeRegex = {
        return: true, typeof: true, instanceof: true, in: true, of: true, new: true,
        delete: true, void: true, do: true, else: true, yield: true, await: true, throw: true,
        case: true,
      };

      let i = 0;
      let depth = 0;
      let afterValue = false;
      // Whether the previous token was `.`, which makes the next word a property name -
      // `obj.import(x)` is a method call, not a dynamic import.
      let afterDot = false;
      // The declaration being read at depth 0, and whether the next name in it binds.
      let declaring: string = null;
      let expectBinding = false;

      function isIdStart(c: string) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || c === '$' || c > '~';
      }

      function isIdPart(c: string) {
        return isIdStart(c) || (c >= '0' && c <= '9');
      }

      function skipTrivia(at: number) {
        while (at < len) {
          const c = source.charAt(at);
          if (c === ' ' || c === '\t' || c === '\r' || c === '\n') { at++; continue; }
          if (c === '/' && source.charAt(at + 1) === '/') {
            while (at < len && source.charAt(at) !== '\n') at++;
            continue;
          }
          if (c === '/' && source.charAt(at + 1) === '*') {
            const close = source.indexOf('*/', at + 2);
            at = close < 0 ? len : close + 2;
            continue;
          }
          return at;
        }
        return at;
      }

      function skipString(at: number) {
        const quote = source.charAt(at);
        at++;
        while (at < len) {
          const c = source.charAt(at);
          if (c === '\\') { at += 2; continue; }
          at++;
          if (c === quote) return at;
        }
        return len;
      }

      function skipTemplate(at: number) {
        at++;
        while (at < len) {
          const c = source.charAt(at);
          if (c === '\\') { at += 2; continue; }
          if (c === '`') return at + 1;
          if (c === '$' && source.charAt(at + 1) === '{') { at = skipBalanced(at + 1); continue; }
          at++;
        }
        return len;
      }

      /** Past the bracket at `at` and everything it encloses. */
      function skipBalanced(at: number) {
        const open = source.charAt(at);
        const close = open === '{' ? '}' : open === '(' ? ')' : ']';
        let level = 0;

        while (at < len) {
          const c = source.charAt(at);
          if (c === '/' && (source.charAt(at + 1) === '/' || source.charAt(at + 1) === '*')) { at = skipTrivia(at); continue; }
          if (c === '"' || c === '\'') { at = skipString(at); continue; }
          if (c === '`') { at = skipTemplate(at); continue; }
          if (c === open) { level++; at++; continue; }
          if (c === close) { at++; if (--level === 0) return at; continue; }
          at++;
        }
        return len;
      }

      function skipRegex(at: number) {
        at++;
        let inClass = false;
        while (at < len) {
          const c = source.charAt(at);
          if (c === '\\') { at += 2; continue; }
          // An unterminated one was a division after all; give up rather than eat the file.
          if (c === '\n') return at;
          if (c === '[') inClass = true;
          else if (c === ']') inClass = false;
          else if (c === '/' && !inClass) {
            at++;
            while (at < len && isIdPart(source.charAt(at))) at++;
            return at;
          }
          at++;
        }
        return len;
      }

      function bind(name: string) {
        if (name) bindings[name] = true;
      }

      /** Records the module specifier at `at`, if a string literal is what is there. */
      function readSpecifier(at: number) {
        at = skipTrivia(at);
        const c = source.charAt(at);
        if (c !== '"' && c !== '\'') return at;

        const end = skipString(at);
        edits.push({
          start: at,
          end: end,
          specifier: source.substring(at + 1, end - 1).replace(/\\(.)/g, '$1'),
        });
        return end;
      }

      /** The names an import clause binds: the last identifier of each comma-separated entry,
       *  so `{ a as b, c }` binds `b` and `c`. */
      function readClause(from: number, to: number) {
        let at = from;
        let entry: string = null;

        while (at < to) {
          const c = source.charAt(at);
          if (isIdStart(c)) {
            const start = at;
            while (at < to && isIdPart(source.charAt(at))) at++;
            const word = source.substring(start, at);
            if (word !== 'as') entry = word;
            continue;
          }
          if (c === ',') { bind(entry); entry = null; }
          at++;
        }

        bind(entry);
      }

      /** An `import ... from '...'` declaration, from just past the keyword. */
      function readImport(at: number) {
        while (at < len) {
          at = skipTrivia(at);
          if (at >= len) return at;

          const c = source.charAt(at);
          if (c === '"' || c === '\'') return readSpecifier(at);
          if (c === ';') return at + 1;
          if (c === '{') {
            const end = skipBalanced(at);
            readClause(at + 1, end - 1);
            at = end;
            continue;
          }
          if (isIdStart(c)) {
            const start = at;
            while (at < len && isIdPart(source.charAt(at))) at++;
            const word = source.substring(start, at);
            // A default import, or the local name of `* as ns`; either way it binds.
            if (word !== 'from' && word !== 'as') bind(word);
            continue;
          }
          at++;
        }
        return at;
      }

      /** An `export` declaration, from just past the keyword. Only a re-export carries a
       *  specifier; the rest declare names the main loop picks up on its own. */
      function readExport(at: number) {
        at = skipTrivia(at);
        const c = source.charAt(at);

        if (c === '*') {
          // `export * from 'x'`, or `export * as ns from 'x'` - `ns` is an export name, not a
          // local binding, so nothing here binds.
          at++;
          while (at < len) {
            at = skipTrivia(at);
            const d = source.charAt(at);
            if (d === '"' || d === '\'') return readSpecifier(at);
            if (!isIdStart(d)) return at;
            while (at < len && isIdPart(source.charAt(at))) at++;
          }
          return at;
        }

        if (c === '{') {
          const end = skipBalanced(at);
          const next = skipTrivia(end);
          // `export {a} from 'x'` re-exports; `export {a}` names bindings that already exist.
          if (source.substring(next, next + 4) === 'from' && !isIdPart(source.charAt(next + 4))) {
            return readSpecifier(next + 4);
          }
          return end;
        }

        return at;
      }

      while (i < len) {
        const c = source.charAt(i);

        if (c === ' ' || c === '\t' || c === '\r' || c === '\n') { i++; continue; }

        if (c === '/') {
          const next = source.charAt(i + 1);
          if (next === '/' || next === '*') { i = skipTrivia(i); continue; }
          afterDot = false;
          if (!afterValue) { i = skipRegex(i); afterValue = true; continue; }
          i++;
          afterValue = false;
          continue;
        }

        if (c === '"' || c === '\'') { i = skipString(i); afterValue = true; afterDot = false; continue; }
        if (c === '`') { i = skipTemplate(i); afterValue = true; afterDot = false; continue; }

        if (c === '(' || c === '[' || c === '{') { depth++; i++; afterValue = false; afterDot = false; continue; }
        if (c === ')' || c === ']' || c === '}') {
          depth--;
          i++;
          afterValue = true;
          afterDot = false;
          if (depth <= 0) { depth = 0; declaring = null; expectBinding = false; }
          continue;
        }

        if (c >= '0' && c <= '9') {
          while (i < len && (isIdPart(source.charAt(i)) || source.charAt(i) === '.')) i++;
          afterValue = true;
          afterDot = false;
          continue;
        }

        if (isIdStart(c)) {
          const start = i;
          const wasProperty = afterDot;
          while (i < len && isIdPart(source.charAt(i))) i++;
          const word = source.substring(start, i);
          afterValue = !beforeRegex[word];
          afterDot = false;

          // A property, not a keyword: `obj.import(x)` and `obj.export` are neither. It is
          // not a free name either, so the globals prelude has no reason to declare it.
          if (wasProperty) continue;

          mentions[word] = true;

          if (word === 'import') {
            const at = skipTrivia(i);
            const after = source.charAt(at);

            if (after === '(') {
              // Dynamic. Left to the browser it would resolve against the blob url and fetch
              // it itself, which is not where this backend's modules live.
              edits.push({ start: start, end: i, specifier: null });
              continue;
            }
            // import.meta, which the prelude fills in.
            if (after === '.') continue;
            if (depth === 0) {
              i = readImport(i);
              declaring = null;
              expectBinding = false;
            }
            continue;
          }

          if (word === 'export' && depth === 0) {
            i = readExport(i);
            continue;
          }

          // `var` is deliberately absent: the prelude declares with `var` too, and two `var`
          // declarations of one name are legal, so that collision needs no avoiding.
          if (depth === 0 && (word === 'let' || word === 'const' || word === 'class' || word === 'function')) {
            declaring = word;
            expectBinding = true;
            continue;
          }

          if (depth === 0 && declaring && expectBinding) {
            // `{a: b}` - a key, not a binding. Patterns are not parsed further, so a
            // destructured top-level name is missed, and a prelude that collides with one is a
            // loud redeclaration error rather than a silent wrong answer.
            if (source.charAt(skipTrivia(i)) !== ':') bind(word);
            expectBinding = false;
          }

          continue;
        }

        if (depth === 0 && declaring) {
          if (c === ',') expectBinding = true;
          else if (c === '=') expectBinding = false;
          else if (c === ';') { declaring = null; expectBinding = false; }
        }

        afterValue = false;
        afterDot = c === '.';
        i++;
      }

      return { edits: edits, bindings: bindings, mentions: mentions };
    },

    /** Loads, links and evaluates ES module graphs for one context.
     *
     * The browser does the linking and the evaluating. Every module in the graph becomes a blob
     * url whose specifiers point at the blob urls of its dependencies, so importing the root
     * hands the whole graph to the engine the page already runs - which is where live bindings,
     * cycles within one module's own imports and top-level await come from for free.
     *
     * What this owns is getting the sources, and they come from the host's asynchronous loader:
     * the same `QuickJSModuleLoader` the desktop backend drives, so `import './x'` resolves
     * against Unity's own paths on both.
     */
    createModuleRegistry: function (context: PluginContext): ModuleRegistry {
      const state = unityJsbState;
      const records: Record<string, ModuleRecord> = {};
      const urls: string[] = [];
      // The context's own Promise, so a graph still in flight when the context dies stops
      // where the rest of its microtasks do.
      const Promise = (context.contentWindow as any).Promise as PromiseConstructor;

      function fail(message: string) {
        return Promise.reject(new Error(message));
      }

      /** The host's answer for a specifier written inside `referrer`. */
      function resolve(referrer: string, specifier: string) {
        const runtime = context.runtime;
        const normalize = runtime.moduleNormalize;
        if (!normalize) return specifier;

        const referrerBuffer = state.bufferify(referrer || '');
        const specifierBuffer = state.bufferify(specifier);
        let result: number;

        try {
          result = makeDynCallMacro<typeof JSApiDelegates.JSModuleNormalizeFunc>('iiiii', normalize)(
            context.id as any, referrerBuffer[0] as any, specifierBuffer[0] as any, runtime.moduleOpaque);
        } finally {
          _free(referrerBuffer[0]);
          _free(specifierBuffer[0]);
        }

        if (!result) return null;
        const name = state.stringify(result);
        // The caller frees what the normalizer returns, as the engine does; the host allocated
        // it through js_strndup, which is _malloc here.
        _free(result);
        return name;
      }

      /** Hands a module to the host to fetch, and settles when it comes back. */
      function request(name: string) {
        const runtime = context.runtime;
        const loader = runtime.moduleLoader;
        if (!loader) return fail('No module loader is installed, so \'' + name + '\' cannot be fetched');

        return new Promise<string>(function (resolveSource, rejectSource) {
          // Registered before the call: the host is allowed to settle from inside it, and the
          // error paths do exactly that.
          const ticket = ++runtime.lastModuleLoadId;
          runtime.pendingModuleLoads[ticket] = { resolve: resolveSource, reject: rejectSource };

          const nameBuffer = state.bufferify(name);
          // Import attributes, which nothing here reads; the host's loader ignores them too.
          const attributes = runtime.refs.allocate(undefined);

          try {
            makeDynCallMacro<typeof JSApiDelegates.JSModuleLoaderAsyncFunc>('viiiii', loader)(
              context.id as any, nameBuffer[0] as any, attributes[0] as any, runtime.moduleOpaque, ticket as any);
          } finally {
            _free(nameBuffer[0]);
            _free(attributes[0] as any);
          }
        });
      }

      /** Fetches `name` and everything below it. `stack` is the path that asked for it. */
      function load(name: string, stack: string[]) {
        const existing = records[name];
        if (existing) return existing.ready;

        const record = records[name] = {
          name: name, source: null, scan: null, deps: {}, ready: null, url: null,
        } as ModuleRecord;

        record.ready = request(name).then(function (source) {
          return link(record, source, stack);
        });

        return record.ready;
      }

      function link(record: ModuleRecord, source: string, stack: string[]) {
        record.source = source;
        record.scan = state.scanModule(source);

        const waiting: Promise<ModuleRecord>[] = [];

        record.scan.edits.forEach(function (edit) {
          if (edit.specifier === null || record.deps[edit.specifier]) return;

          const resolved = resolve(record.name, edit.specifier);
          if (!resolved) throw new Error('Could not resolve \'' + edit.specifier + '\' from \'' + record.name + '\'');

          record.deps[edit.specifier] = resolved;

          // A blob url can only be minted for text that is already final, and a cycle's text
          // is not: each side needs the other's url first. Reported here, where the path that
          // closes the cycle is still known, rather than as a deadlocked import.
          if (stack.indexOf(resolved) >= 0) {
            throw new Error('Circular imports are not supported on WebGL: ' + stack.concat([resolved]).join(' -> '));
          }

          waiting.push(load(resolved, stack.concat([resolved])));
        });

        return Promise.all(waiting).then(function () { return record; });
      }

      /** The blob url for a fetched module, building its dependencies' first. */
      function urlFor(record: ModuleRecord) {
        if (record.url) return record.url;

        const depUrls: Record<string, string> = {};
        Object.keys(record.deps).forEach(function (specifier) {
          depUrls[specifier] = urlFor(records[record.deps[specifier]]);
        });

        const url = context.createBlobUrl(assemble(record, depUrls));
        urls.push(url);
        record.url = url;
        return url;
      }

      function assemble(record: ModuleRecord, depUrls: Record<string, string>) {
        const source = record.source;
        const parts: string[] = [];
        let at = 0;

        record.scan.edits.forEach(function (edit) {
          parts.push(source.substring(at, edit.start));
          parts.push(edit.specifier === null
            ? state.moduleImportHook
            : JSON.stringify(depUrls[edit.specifier]));
          at = edit.end;
        });
        parts.push(source.substring(at));

        // No newline between them, deliberately: the prelude rides on the source's own first
        // line, so no line number moves. That matters most for the source map the bundle
        // arrived with, which cannot be corrected from here once it is off by one.
        return prelude(record) + parts.join('') + '\n//# sourceURL=' + record.name;
      }

      /** The globals a module opens with, and its import.meta. */
      function prelude(record: ModuleRecord) {
        const scan = record.scan;
        const reserved = state.moduleReservedNames;
        const names: string[] = [];

        Object.keys(context.hostGlobals).forEach(function (name) {
          // Only names the module mentions as a free identifier. That keeps the declaration
          // short, and keeps out a name the module declares in a way scanModule does not parse
          // - which would otherwise be a redeclaration error rather than a shadowed global.
          if (!scan.mentions[name] || scan.bindings[name]) return;
          if (reserved[name] || name === state.moduleImportHook) return;
          if (!/^[A-Za-z_$][A-Za-z_0-9$]*$/.test(name)) return;

          names.push(name);
        });

        // A bare identifier, not `globalThis[...]`. `globalThis` is itself one of the host
        // globals - it is the proxy, not the realm's - so a module that mentions it gets a `var`
        // for it, which hoists over the whole module and would leave the initializer below
        // reading a property of `undefined`. The registry key cannot be shadowed that way
        // because it is never one of the names declared here.
        const entry = state.moduleRegistryKey + '[' + context.id + ']';
        const parts: string[] = [];

        // `var`, not `const`: a module is free to declare `var URL` itself, and two `var`
        // declarations of one name are legal where two lexical ones are a SyntaxError.
        if (names.length) parts.push('var {' + names.join(',') + '} = ' + entry + '.globals;');

        parts.push('var ' + state.moduleImportHook + ' = ' + entry + '.dynamicImport(' + JSON.stringify(record.name) + ');');
        // The host's JS_SetModuleMetaFunc hook cannot serve this backend - there is no
        // JSModuleDef for it to name a module by - so import.meta is filled in here instead.
        parts.push('import.meta.url = ' + JSON.stringify(record.name) + ';');
        parts.push('import.meta.main = false;');

        return parts.join('');
      }

      function release(record: ModuleRecord) {
        if (!record) return;
        if (record.url) {
          const index = urls.indexOf(record.url);
          if (index >= 0) urls.splice(index, 1);
          context.revokeBlobUrl(record.url);
        }
        delete records[record.name];
      }

      return {
        evaluate(name, source) {
          // A root evaluated again is a reload, and has to be a new module rather than the
          // cached one: the browser keys its module cache on the url, so re-importing the same
          // blob would resolve without running anything.
          release(records[name]);

          const root = records[name] = {
            name: name, source: null, scan: null, deps: {}, ready: null, url: null,
          } as ModuleRecord;

          root.ready = Promise.resolve().then(function () { return link(root, source, [name]); });

          return root.ready.then(function () { return context.importModule(urlFor(root)); });
        },

        dynamicImport(referrer) {
          return function (specifier) {
            let resolved: string;
            try {
              resolved = resolve(referrer, String(specifier));
            } catch (err) {
              return Promise.reject(err);
            }

            if (!resolved) return fail('Could not resolve \'' + specifier + '\' from \'' + (referrer || 'a script') + '\'');

            const existing = records[resolved];
            const ready = existing ? existing.ready : load(resolved, [resolved]);

            return ready.then(function () { return context.importModule(urlFor(records[resolved])); });
          };
        },

        /** Points a script's dynamic imports at the host loader.
         *
         * `import()` in eval code is legal and would work - against the page's base url and the
         * browser's fetcher, which is not where this backend's modules live. The desktop
         * engine's loader gets the call, so it has to here too.
         */
        rewriteScript(code) {
          if (code.indexOf('import') < 0) return code;

          const edits = state.scanModule(code).edits;
          const parts: string[] = [];
          let at = 0;

          edits.forEach(function (edit) {
            // Only the dynamic ones: a static import is not legal in a script at all, and
            // rewriting a specifier there would hide the syntax error rather than fix it.
            if (edit.specifier !== null) return;
            parts.push(code.substring(at, edit.start));
            parts.push(state.moduleImportHook);
            at = edit.end;
          });

          if (!parts.length) return code;

          parts.push(code.substring(at));
          return parts.join('');
        },

        free() {
          urls.forEach(function (url) { context.revokeBlobUrl(url); });
          urls.length = 0;
        },
      };
    },

    // #endregion

    runtimes: {},
    contexts: {},
    lastRuntimeId: 1,
    lastContextId: 1,
    getRuntime: function (rt) {
      const rtId = rt;
      return unityJsbState.runtimes[rtId];
    },
    getContext: function (ctx) {
      const ctxId = ctx;
      return unityJsbState.contexts[ctxId];
    },
    /* Resolves a JSValue with no context to resolve it against. ng dropped the JSContext
       from JS_IsArray and JS_IsError, and references are kept per runtime, so there is
       nothing left to look one up in. Every live runtime is searched and the one holding
       that id answers; ambiguity needs two live runtimes, which needs JSWorker, which
       needs threads WebGL does not have. Primitives carry their value in the JSValue
       itself, so for those any runtime decodes alike. */
    getAnyValue: function (val) {
      const ids = Object.keys(unityJsbState.runtimes);
      let first: PluginRuntime | undefined;

      for (let i = 0; i < ids.length; i++) {
        const runtime = unityJsbState.runtimes[ids[i]];
        if (!runtime || runtime.isDestroyed) continue;
        if (!first) first = runtime;
        if (runtime.refs.record[HEAP32[val >> 2]]) return runtime.refs.get(val);
      }

      return first ? first.refs.get(val) : undefined;
    },
    HEAP64: function () {
      return new BigInt64Array(HEAPF64.buffer);
    },
    HEAPU64: function () {
      return new BigUint64Array(HEAPF64.buffer);
    },
  },

  JSB_Init() {
    return Constants.CS_JSB_VERSION;
  },

  JSB_NewRuntime(finalizer) {
    // TODO: understand what to do with finalizer

    const id = unityJsbState.lastRuntimeId++;
    const refs = unityJsbState.createObjectReferences();

    unityJsbState.runtimes[id] = {
      id,
      contexts: {},
      refs,
      isDestroyed: false,
      garbageCollect() {
        const lastId = refs.lastId;
        const record = refs.record;

        let aliveItemCount = 0;

        for (let index = 0; index <= lastId; index++) {
          const element = record[index];

          if (element) {
            if (element.refCount <= 0) {
              refs.deleteRecord(index);
            }
            else {
              aliveItemCount++;
            }
          }
        }

        return aliveItemCount;
      },
    };

    return id;
  },

  JSB_GetRuntimeOpaque(rtId) {
    return unityJsbState.getRuntime(rtId).opaque;
  },

  JSB_SetRuntimeOpaque(rtId, opaque) {
    unityJsbState.getRuntime(rtId).opaque = opaque;
  },

  JS_GetContextOpaque(ctx) {
    return unityJsbState.getContext(ctx).opaque;
  },

  JS_SetContextOpaque(ctx, opaque) {
    unityJsbState.getContext(ctx).opaque = opaque;
  },

  JSB_FreeRuntime(rtId) {
    const runtime = unityJsbState.getRuntime(rtId);
    const ctxIds = Object.keys(runtime.contexts);

    for (let index = 0; index < ctxIds.length; index++) {
      const ctxId = ctxIds[index];
      const context = runtime.contexts[ctxId];
      context.free();
    }

    const aliveItemCount = runtime.garbageCollect();

    runtime.isDestroyed = true;
    delete unityJsbState.runtimes[runtime.id];

    return aliveItemCount === 0;
  },

  JS_GetRuntime(ctxId) {
    const context = unityJsbState.getContext(ctxId);
    return context.runtimeId;
  },

  JS_NewContext(rtId) {
    const id = unityJsbState.lastContextId++;
    const runtime = unityJsbState.getRuntime(rtId);

    const iframe = document.createElement('iframe');
    iframe.name = 'reactunity-context-' + id;
    iframe.style.display = 'none';
    document.head.appendChild(iframe);

    const contentWindow = iframe.contentWindow! as typeof window;
    const fetch = contentWindow.fetch.bind(contentWindow);
    const URL = contentWindow.URL;
    const XMLHttpRequest = contentWindow.XMLHttpRequest;
    const XMLHttpRequestUpload = contentWindow.XMLHttpRequestUpload;
    const WebSocket = contentWindow.WebSocket;

    let baseTag: HTMLBaseElement = null;


    // #region Promise monkey patch

    // This patches the Promise so that microtasks are not run after the context is destroyed

    const Promise = contentWindow.Promise;
    const originalThen = Promise.prototype.then;
    const originalCatch = Promise.prototype.catch;
    const originalFinally = Promise.prototype.finally;

    Promise.prototype.then = function promiseThenPatch(onFulfilled, onRejected) {
      return originalThen.call(
        this,
        !onFulfilled ? undefined : function onFulfilledPatch() { if (!context.isDestroyed) return onFulfilled.apply(this, arguments); },
        !onRejected ? undefined : function onRejectedPatch() { if (!context.isDestroyed) return onRejected.apply(this, arguments); },
      );
    };

    Promise.prototype.catch = function promiseCatchPatch(onRejected) {
      return originalCatch.call(
        this,
        !onRejected ? undefined : function onRejectedPatch() { if (!context.isDestroyed) return onRejected.apply(this, arguments); },
      );
    };

    if (originalFinally) {
      Promise.prototype.finally = function promiseFinallyPatch(onFinally) {
        return originalFinally.call(
          this,
          !onFinally ? undefined : function onFinallyPatch() { if (!context.isDestroyed) return onFinally.apply(this, arguments); },
        );
      };
    }

    // #endregion


    const extraGlobals: any = {
      location: undefined,
      document: undefined,
      addEventListener: undefined,
      btoa: window.btoa?.bind(window),
      atob: window.atob?.bind(window),
      $$webglWindow: window,
      WebSocket,
      fetch,
      URL,
      XMLHttpRequest,
      XMLHttpRequestUpload,
      Promise,
    };

    const globals: typeof window = new Proxy(extraGlobals, {
      get(target, p, receiver) {
        if (p in target) return target[p];
        const res = window[p];
        return res;
      },
      set(target, p, val, receiver) {
        target[p] = val;
        return true;
      },
      has(target, key) {
        return (key in window) || (key in target);
      },
    }) as any;

    extraGlobals.globalThis =
      extraGlobals.global =
      extraGlobals.window =
      extraGlobals.parent =
      extraGlobals.self =
      extraGlobals.this =
      globals;

    const evaluate = function (code: string, filename?: string) {
      const sourceUrlSuffix = !filename ? '' : '\n//# sourceURL=reactunity:///' + filename;

      return (function (evalCode) {
        //@ts-ignore
        with (globals) {
          return eval(evalCode);
        }
      }).call(globals, code + sourceUrlSuffix);
    };

    // Native dynamic import, which is how a module graph actually gets evaluated here. Built
    // with `new Function` rather than written as `import(url)` for two reasons: tsc targets ES5
    // for this file and rejects the syntax outright, and a string is opaque to whatever
    // minifier the WebGL build runs over the generated JS afterwards.
    //
    // Deliberately this realm and not the iframe's: `evaluate` runs its `eval` here too, so a
    // module and a script produce objects of the same realm - and `instanceof Error` all over
    // this plugin depends on that.
    const importModule = new Function('url', 'return import(url);') as (url: string) => Promise<any>;

    // Modules are handed to the browser as blob urls, so the page - not the iframe - is what
    // has to hold them: it is the realm doing the importing, and it outlives the iframe.
    const pageRegistry = window[unityJsbState.moduleRegistryKey] ||
      (window[unityJsbState.moduleRegistryKey] = {});

    const context: PluginContext = {
      id,
      runtime,
      runtimeId: rtId,
      window,
      globalObject: globals,
      hostGlobals: extraGlobals,
      evaluate,
      importModule,
      iframe,
      contentWindow,
      isDestroyed: false,
      modules: null,

      createBlobUrl(text: string) {
        return window.URL.createObjectURL(new window.Blob([text], { type: 'text/javascript' }));
      },

      revokeBlobUrl(url: string) {
        window.URL.revokeObjectURL(url);
      },

      free() {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);

        context.modules.free();
        delete pageRegistry[context.id];

        context.isDestroyed = true;
        delete runtime.contexts[context.id];
        delete unityJsbState.contexts[context.id];
      },

      setBaseUrl(url: string) {
        if (!baseTag) {
          baseTag = document.createElement('base');
        }

        baseTag.setAttribute('href', url);

        if (baseTag.parentNode && !url) {
          baseTag.parentNode.removeChild(baseTag);
        }
        else if (!baseTag.parentNode && url) {
          iframe.contentWindow.document.head.appendChild(baseTag);
        }
      },
    };

    context.modules = unityJsbState.createModuleRegistry(context);
    pageRegistry[id] = { globals: globals, dynamicImport: context.modules.dynamicImport };

    // A script's dynamic imports are rewritten to call this; a module's prelude declares its
    // own, bound to that module's url so a relative specifier resolves against it. A script has
    // no url, and an empty referrer is what sends the host to ReactUnity's own path resolution.
    extraGlobals[unityJsbState.moduleImportHook] = context.modules.dynamicImport('');

    runtime.contexts[id] = context;
    unityJsbState.contexts[id] = context;
    return id;
  },

  JS_FreeContext(ctxId) {
    const context = unityJsbState.getContext(ctxId);
    context.free();
  },

  JS_SetBaseUrl(ctxId, url) {
    const context = unityJsbState.getContext(ctxId);
    const urlStr = unityJsbState.stringify(url);

    context.setBaseUrl(urlStr);
  },

  JS_GetGlobalObject(returnValue, ctxId) {
    const context = unityJsbState.getContext(ctxId);

    if (!context.globalObjectId) {
      context.runtime.refs.push(context.globalObject, returnValue);
    }
    else {
      context.runtime.refs.duplicateId(context.globalObjectId, returnValue);
    }
  },

  JS_Eval(ptr, ctx, input, input_len, filename, eval_flags) {
    const context = unityJsbState.getContext(ctx);
    try {
      const code = unityJsbState.stringify(input, input_len);
      const filenameStr = unityJsbState.stringify(filename);

      const res = context.evaluate(context.modules.rewriteScript(code), filenameStr);

      context.runtime.refs.push(res, ptr);
    } catch (err) {
      context.lastException = err;
      context.runtime.refs.push(err, ptr);
      console.error(err);
    }
  },

  JS_IsInstanceOf(ctxId, val, obj) {
    const context = unityJsbState.getContext(ctxId);
    const valVal = context.runtime.refs.get(val);
    const ctorVal = context.runtime.refs.get(obj);
    return !!(valVal instanceof ctorVal);
  },

  JS_GetException(ptr, ctx) {
    const context = unityJsbState.getContext(ctx);

    context.runtime.refs.push(context.lastException, ptr);
  },

  JSB_FreeValue(ctx, v) {
    const context = unityJsbState.getContext(ctx);
    context.runtime.refs.pop(v);
  },

  JSB_FreeValueRT(rt, v) {
    const runtime = unityJsbState.getRuntime(rt);
    runtime.refs.pop(v);
  },

  JSB_DupValue(ptr, ctx, v) {
    const context = unityJsbState.getContext(ctx);
    context.runtime.refs.duplicate(v, ptr);
  },

  JS_RunGC(rt) {
    const runtime = unityJsbState.getRuntime(rt);

    runtime.garbageCollect();
  },

  JS_ComputeMemoryUsage(rt, s) {
    // TODO: https://blog.unity.com/technology/unity-webgl-memory-the-unity-heap
  },

  JS_GetPropertyUint32(ptr, ctxId, val, index) {
    const context = unityJsbState.getContext(ctxId);
    const obj = context.runtime.refs.get(val);
    const res = obj[index];

    context.runtime.refs.push(res, ptr);
  },

  JS_GetProperty(ptr, ctxId, val, prop) {
    const context = unityJsbState.getContext(ctxId);
    const valObj = context.runtime.refs.get(val);
    const propStr = unityJsbState.atoms.get(prop);
    const res = valObj[propStr];

    context.runtime.refs.push(res, ptr);
  },

  JS_GetPropertyStr(ptr, ctxId, val, prop) {
    const context = unityJsbState.getContext(ctxId);
    const valObj = context.runtime.refs.get(val);
    const propStr = unityJsbState.stringify(prop);
    const res = valObj[propStr];

    context.runtime.refs.push(res, ptr);
  },

  JS_Invoke(ptr, ctx, this_obj, prop, argc, argv) {
    const context = unityJsbState.getContext(ctx);
    const propVal = unityJsbState.atoms.get(prop);
    const thisVal = context.runtime.refs.get(this_obj);
    const func = thisVal[propVal];

    const args = context.runtime.refs.batchGet(argv, argc);

    let res;
    try {
      res = func.apply(thisVal, args);
    }
    catch (err) {
      context.lastException = err;
      res = err;
    }

    context.runtime.refs.push(res, ptr);
  },

  JS_Call(ptr, ctx, func_obj, this_obj, argc, argv) {
    const context = unityJsbState.getContext(ctx);
    const func = context.runtime.refs.get(func_obj);
    const thisVal = context.runtime.refs.get(this_obj);

    const args = context.runtime.refs.batchGet(argv, argc);

    let res;
    try {
      res = func.apply(thisVal, args);
    }
    catch (err) {
      context.lastException = err;
      res = err;
    }

    context.runtime.refs.push(res, ptr);
  },

  JS_CallConstructor(ptr, ctx, func_obj, argc, argv) {
    const context = unityJsbState.getContext(ctx);
    const func = context.runtime.refs.get(func_obj);

    const args = context.runtime.refs.batchGet(argv, argc);

    let res;
    try {
      res = Reflect.construct(func, args);
    }
    catch (err) {
      context.lastException = err;
      res = err;
    }

    context.runtime.refs.push(res, ptr);
  },

  // Returns 0/-1 in ng rather than nothing; nothing here can fail, so it is always 0.
  JS_SetConstructor(ctx, ctor, proto) {
    const context = unityJsbState.getContext(ctx);
    const ctorVal = context.runtime.refs.get(ctor);
    const protoVal = context.runtime.refs.get(proto);
    ctorVal.prototype = protoVal;
    protoVal.constructor = ctorVal;

    var ctorPayload = context.runtime.refs.getPayload(ctorVal);
    if (ctorPayload.type === BridgeObjectType.TypeRef) {
      context.runtime.refs.setPayload(protoVal, ctorPayload.type, ctorPayload.payload);
    }

    return 0;
  },

  JS_SetPrototype(ctx, obj, proto) {
    const context = unityJsbState.getContext(ctx);
    const objVal = context.runtime.refs.get(obj);
    const protoVal = context.runtime.refs.get(proto);
    Reflect.setPrototypeOf(objVal, protoVal);

    return true;
  },

  JS_DefineProperty(ctx, this_obj, prop, val, getter, setter, flags) {
    const context = unityJsbState.getContext(ctx);

    const thisVal = context.runtime.refs.get(this_obj);
    const getterVal = context.runtime.refs.get(getter);
    const setterVal = context.runtime.refs.get(setter);
    const valVal = context.runtime.refs.get(val);
    const propVal = unityJsbState.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    const shouldThrow = !!(flags & JSPropFlags.JS_PROP_THROW) || !!(flags & JSPropFlags.JS_PROP_THROW_STRICT);


    try {
      const opts: PropertyDescriptor = {
        get: getterVal,
        set: setterVal,
      };

      if (!getter && !setter) {
        opts.value = valVal;
      }

      if (hasConfigurable) opts.configurable = configurable;
      if (hasEnumerable) opts.enumerable = enumerable;
      if (!getter && !setter && hasWritable) opts.writable = writable;

      Object.defineProperty(thisVal, propVal, opts);

      return true;
    } catch (err) {
      context.lastException = err;
      if (shouldThrow) {
        console.error(err);
        return -1;
      }
    }

    return false;
  },

  JS_DefinePropertyValue(ctx, this_obj, prop, val, flags) {
    const context = unityJsbState.getContext(ctx);
    const runtime = context.runtime;

    const thisVal = runtime.refs.get(this_obj);
    const valVal = runtime.refs.get(val);
    const propVal = unityJsbState.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    const shouldThrow = !!(flags & JSPropFlags.JS_PROP_THROW) || !!(flags & JSPropFlags.JS_PROP_THROW_STRICT);

    // SetProperty frees the value automatically
    runtime.refs.pop(val);

    try {
      const opts: PropertyDescriptor = {
        value: valVal,
      };

      if (hasConfigurable) opts.configurable = configurable;
      if (hasEnumerable) opts.enumerable = enumerable;
      if (hasWritable) opts.writable = writable;

      Object.defineProperty(thisVal, propVal, opts);
      return true;
    }
    catch (err) {
      context.lastException = err;
      if (shouldThrow) {
        console.error(err);
        return -1;
      }
    }

    return false;
  },

  JS_HasProperty(ctx, this_obj, prop) {
    const context = unityJsbState.getContext(ctx);
    const thisVal = context.runtime.refs.get(this_obj);
    const propVal = unityJsbState.atoms.get(prop);

    const res = Reflect.has(thisVal, propVal);

    return !!res;
  },

  // ng's JS_SetProperty is JS_SetPropertyInternal with JS_PROP_THROW, which is the only
  // flag combination the C# ever passed, so the flags argument is gone with the wrapper.
  // -1 on exception, otherwise true/false.
  JS_SetProperty(ctx, this_obj, prop, val) {
    const context = unityJsbState.getContext(ctx);
    const runtime = context.runtime;

    const thisVal = runtime.refs.get(this_obj);
    const valVal = runtime.refs.get(val);
    const propVal = unityJsbState.atoms.get(prop);

    // SetProperty frees the value automatically
    runtime.refs.pop(val);

    try {
      thisVal[propVal] = valVal;
      return 1;
    } catch (err) {
      context.lastException = err;
      console.error(err);
      return -1;
    }
  },

  JS_SetPropertyUint32(ctx, this_obj, idx, val) {
    const context = unityJsbState.getContext(ctx);
    const runtime = context.runtime;

    const thisVal = context.runtime.refs.get(this_obj);
    const valVal = context.runtime.refs.get(val);
    const propVal = idx;

    // SetProperty frees the value automatically
    runtime.refs.pop(val);

    try {
      thisVal[propVal] = valVal;
      return true;
    } catch (err) {
      context.lastException = err;
    }

    return false;
  },

  jsb_get_payload_header(ret, ctx, val) {

    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val);

    const rec = context.runtime.refs.getPayload(obj);

    HEAP32[ret >> 2] = rec.type;
    HEAP32[(ret >> 2) + 1] = rec.payload;
  },

  JS_ToCStringLen2(ctx, len, val, cesu8) {
    const context = unityJsbState.getContext(ctx);

    const str = context.runtime.refs.get(val);


    if (typeof str === 'undefined') {
      HEAP32[(len >> 2)] = 0;
      return 0 as IntPtr;
    }

    const [buffer, length] = unityJsbState.bufferify(str);
    HEAP32[(len >> 2)] = length - 1;
    return buffer as IntPtr;
  },

  JS_FreeCString(ctx, ptr) {
    _free(ptr);
  },

  JS_GetArrayBuffer(ctx, psize, obj) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(obj);

    if (value instanceof ArrayBuffer) {
      HEAP32[psize >> 2] = value.byteLength;

      return value as any;
    }

    return 0 as IntPtr;
  },

  // #region Atoms

  JS_NewAtomLen(ctx, str, len) {
    const context = unityJsbState.getContext(ctx);
    const val = unityJsbState.stringify(str, len);

    return unityJsbState.atoms.push(val);
  },

  JS_AtomToString(ptr, ctx, atom) {
    const context = unityJsbState.getContext(ctx);

    const str = unityJsbState.atoms.get(atom);

    context.runtime.refs.push(str, ptr);
  },

  JS_FreeAtom(ctx, v) {
    unityJsbState.atoms.pop(v);
  },

  JS_DupAtom(ctx, v) {
    return unityJsbState.atoms.pushId(v);
  },

  JSB_ATOM_constructor() {
    return unityJsbState.atoms.push('constructor');
  },

  JSB_ATOM_Error() {
    return unityJsbState.atoms.push('Error');
  },

  JSB_ATOM_length() {
    return unityJsbState.atoms.push('length');
  },

  JSB_ATOM_message() {
    return unityJsbState.atoms.push('message');
  },

  JSB_ATOM_name() {
    return unityJsbState.atoms.push('name');
  },

  JSB_ATOM_Number() {
    return unityJsbState.atoms.push('Number');
  },

  JSB_ATOM_prototype() {
    return unityJsbState.atoms.push('prototype');
  },

  JSB_ATOM_Proxy() {
    return unityJsbState.atoms.push('Proxy');
  },

  JSB_ATOM_stack() {
    return unityJsbState.atoms.push('stack');
  },

  JSB_ATOM_String() {
    return unityJsbState.atoms.push('String');
  },

  JSB_ATOM_Object() {
    return unityJsbState.atoms.push('Object');
  },

  // #endregion

  // #region Is

  // No JSContext, and no -1: ng returns a plain bool, having moved the proxy case that
  // needed the tri-state behind JS_IsProxy.
  JS_IsArray(val) {
    const valVal = unityJsbState.getAnyValue(val);
    return !!Array.isArray(valVal);
  },

  JS_IsConstructor(ctx, val) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val);
    const res = !!obj.prototype && !!obj.prototype.constructor.name;
    return !!res;
  },

  JS_IsError(val) {
    const valVal = unityJsbState.getAnyValue(val);
    return !!(valVal instanceof Error);
  },

  JS_IsFunction(ctx, val) {
    const context = unityJsbState.getContext(ctx);
    const valVal = context.runtime.refs.get(val);
    const res = typeof valVal === 'function';
    return !!res;
  },

  // #endregion

  JS_ParseJSON(ptr, ctx, buf, buf_len, filename) {
    const context = unityJsbState.getContext(ctx);
    const str = unityJsbState.stringify(buf as any, buf_len);
    const res = JSON.parse(str);
    context.runtime.refs.push(res, ptr);
  },

  JS_JSONStringify(ptr, ctx, obj, replacer, space) {
    const context = unityJsbState.getContext(ctx);
    const objVal = context.runtime.refs.get(obj);
    const rpVal = context.runtime.refs.get(replacer);
    const spVal = context.runtime.refs.get(space);

    const res = JSON.stringify(objVal, rpVal, spVal);
    context.runtime.refs.push(res, ptr);
  },

  // #region New

  JS_NewArray(ptr, ctx) {
    const context = unityJsbState.getContext(ctx);
    const res = [];
    context.runtime.refs.push(res, ptr);
  },

  JS_NewArrayBufferCopy(ptr, ctx, buf, len) {
    const context = unityJsbState.getContext(ctx);

    const nptr = _malloc(len);
    const res = new Uint8Array(HEAPU8.buffer, nptr, len);
    const existing = new Uint8Array(HEAPU8.buffer, buf, len);
    res.set(existing);

    context.runtime.refs.push(res, ptr);
  },

  JSB_NewFloat64(ptr, ctx, d) {
    const context = unityJsbState.getContext(ctx);
    context.runtime.refs.push(d, ptr);
  },

  JSB_NewInt64(ptr, ctx, d) {
    const context = unityJsbState.getContext(ctx);
    context.runtime.refs.push(d, ptr);
  },

  JS_NewObject(ptr, ctx) {
    const context = unityJsbState.getContext(ctx);
    const res = {};
    context.runtime.refs.push(res, ptr);
  },

  JS_NewStringLen(ptr, ctx, str, len) {
    const context = unityJsbState.getContext(ctx);

    const val = unityJsbState.stringify(str as any, len);

    context.runtime.refs.push(val, ptr);
  },

  JSB_NewEmptyString(ptr, ctx) {
    const context = unityJsbState.getContext(ctx);
    const res = "";
    context.runtime.refs.push(res, ptr);
  },

  // #endregion

  // #region Bridge

  JSB_NewCFunction(ret, ctx, func, atom, length, cproto, magic) {
    const context = unityJsbState.getContext(ctx);
    const refs = context.runtime.refs;

    const name = unityJsbState.atoms.get(atom) || 'jscFunction';

    function jscFunction() {
      const args = arguments;

      const thisObj = this === window ? context.globalObject : this;
      const [thisPtr, thisId] = refs.allocate(thisObj);
      const ret = _malloc(Sizes.JSValue) as JSValue;

      if (cproto === JSCFunctionEnum.JS_CFUNC_generic) {
        const argc = args.length;
        const [argv, argIds] = refs.batchAllocate(Array.from(args));
        makeDynCallMacro<typeof JSApiDelegates.JSCFunction>('viiiii', func)(ret, ctx, thisPtr, argc, argv);
        argIds.forEach(refs.popId);
        _free(argv);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_setter) {
        const [val, valId] = refs.allocate(args[0]);
        makeDynCallMacro<typeof JSApiDelegates.JSSetterCFunction>('viiii', func)(ret, ctx, thisPtr, val);
        refs.popId(valId);
        _free(val);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_getter) {
        makeDynCallMacro<typeof JSApiDelegates.JSGetterCFunction>('viii', func)(ret, ctx, thisPtr);
      }
      else {
        throw new Error(`Unknown type of function specified: name=${name} type=${cproto}`);
      }
      refs.popId(thisId);
      _free(thisPtr);

      const returnValue = refs.get(ret);
      refs.pop(ret);
      _free(ret);
      return returnValue;
    }

    jscFunction['$$csharpFunctionName'] = name;
    refs.push(jscFunction, ret);
  },

  JSB_NewCFunctionMagic(ret, ctx, func, atom, length, cproto, magic) {
    const context = unityJsbState.getContext(ctx);
    const refs = context.runtime.refs;

    const name = unityJsbState.atoms.get(atom) || 'jscFunctionMagic';

    function jscFunctionMagic() {
      const args = arguments;

      const thisObj = this === window ? context.globalObject : this;
      const [thisPtr, thisId] = refs.allocate(thisObj);
      const ret = _malloc(Sizes.JSValue) as JSValue;

      if (cproto === JSCFunctionEnum.JS_CFUNC_generic_magic) {
        const argc = args.length;
        const [argv, argIds] = refs.batchAllocate(Array.from(args));
        makeDynCallMacro<typeof JSApiDelegates.JSCFunctionMagic>('viiiiii', func)(ret, ctx, thisPtr, argc, argv, magic);
        argIds.forEach(refs.popId);
        _free(argv);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_constructor_magic) {
        const argc = args.length;
        const [argv, argIds] = refs.batchAllocate(Array.from(args));
        makeDynCallMacro<typeof JSApiDelegates.JSCFunctionMagic>('viiiiii', func)(ret, ctx, thisPtr, argc, argv, magic);
        argIds.forEach(refs.popId);
        _free(argv);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_setter_magic) {
        const [val, valId] = refs.allocate(args[0]);
        makeDynCallMacro<typeof JSApiDelegates.JSSetterCFunctionMagic>('viiiii', func)(ret, ctx, thisPtr, val, magic);
        refs.popId(valId);
        _free(val);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_getter_magic) {
        makeDynCallMacro<typeof JSApiDelegates.JSGetterCFunctionMagic>('viiii', func)(ret, ctx, thisPtr, magic);
      }
      else {
        throw new Error(`Unknown type of function specified: name=${name} type=${cproto}`);
      }
      refs.popId(thisId);
      _free(thisPtr);

      const returnValue = refs.get(ret);
      refs.pop(ret);
      _free(ret);
      return returnValue;
    };
    jscFunctionMagic['$$csharpFunctionName'] = name;
    refs.push(jscFunctionMagic, ret);

    if (cproto === JSCFunctionEnum.JS_CFUNC_constructor_magic) {
      refs.setPayload(jscFunctionMagic, BridgeObjectType.TypeRef, magic);
    }
  },

  jsb_new_bridge_object(ret, ctx, proto, object_id) {
    const context = unityJsbState.getContext(ctx);
    const protoVal = context.runtime.refs.get(proto);
    const res = Object.create(protoVal);
    context.runtime.refs.push(res, ret);
    context.runtime.refs.setPayload(res, BridgeObjectType.ObjectRef, object_id);
  },

  jsb_new_bridge_value(ret, ctx, proto, size) {
    const context = unityJsbState.getContext(ctx);
    const protoVal = context.runtime.refs.get(proto);
    const res = Object.create(protoVal) as BridgeStruct;
    res.$$values = new Array(size).fill(0);
    context.runtime.refs.push(res, ret);
  },

  JSB_NewBridgeClassObject(ret, ctx, new_target, object_id) {
    const context = unityJsbState.getContext(ctx);
    const res = context.runtime.refs.get(new_target);

    context.runtime.refs.push(res, ret);
    context.runtime.refs.setPayload(res, BridgeObjectType.ObjectRef, object_id);
  },

  JSB_NewBridgeClassValue(ret, ctx, new_target, size) {
    const context = unityJsbState.getContext(ctx);
    const res = context.runtime.refs.get(new_target) as BridgeStruct;
    res.$$values = new Array(size).fill(0);
    context.runtime.refs.push(res, ret);
  },

  jsb_crossbind_constructor(ret, ctx, new_target) {
    const context = unityJsbState.getContext(ctx);
    const target = context.runtime.refs.get(new_target);
    // TODO: I have no idea
    const res = function () {
      return new target();
    };
    context.runtime.refs.push(res, ret);
  },

  // #endregion

  // #region Errors

  /* Each of these records the error as the context's pending exception as well as returning
     it. The host throws and takes straight back - ThrowInternalError then JS_GetException is
     how AsyncModuleLoader builds the error it rejects a module load with - so an exception
     that is returned and not recorded reaches the host as whatever was thrown before it. */
  JSB_ThrowError(ret, ctx, buf, buf_len) {
    const context = unityJsbState.getContext(ctx);
    const str = unityJsbState.stringify(buf as any, buf_len);
    const err = new Error(str);
    console.error(err);
    context.lastException = err;
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowTypeError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const err = new TypeError(unityJsbState.stringify(msg as any) || 'Type Error');
    console.error(err);
    context.lastException = err;
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowRangeError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const err = new RangeError(unityJsbState.stringify(msg as any) || 'Range Error');
    console.error(err);
    context.lastException = err;
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowInternalError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const err = new Error(unityJsbState.stringify(msg as any) || 'Internal Error');
    console.error(err);
    context.lastException = err;
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowReferenceError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const err = new ReferenceError(unityJsbState.stringify(msg as any) || 'Reference Error');
    console.error(err);
    context.lastException = err;
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  // #endregion

  // #region Low level Set

  js_strndup(ctx, s, n) {
    const buffer = _malloc(n + 1);
    _memcpy(buffer, s, n);
    HEAPU8[buffer + n] = 0;
    return buffer as IntPtr;
  },

  jsb_set_bytes(ctx, val, n, v0) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = HEAP32[(v0 >> 2) + index];
      obj.$$values[index] = val;
    }

    return true;
  },

  // #endregion

  // #region Low Level Get

  jsb_get_bytes(ctx, val, n, v0) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = obj.$$values[index];
      HEAP32[(v0 >> 2) + index] = val;
    }

    return true;
  },

  // #endregion

  // #region To

  JS_ToFloat64(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(val);

    if (typeof value === 'number' || typeof value === 'bigint') {
      HEAPF64[pres >> 3] = Number(value);
      return false;
    }
    return -1;
  },


  JS_ToInt32(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(val);

    if (typeof value === 'number' || typeof value === 'bigint') {
      HEAP32[pres >> 2] = Number(value);
      return false;
    }

    return -1;
  },

  JS_ToInt64(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(val);
    if (typeof value === 'number' || typeof value === 'bigint') {
      unityJsbState.HEAP64()[pres >> 3] = BigInt(value);
      return false;
    }
    return -1;
  },

  JS_ToBigInt64(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(val);
    if (typeof value === 'number' || typeof value === 'bigint') {
      unityJsbState.HEAP64()[pres >> 3] = BigInt(value);
      return false;
    }
    return -1;
  },

  JS_ToIndex(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(val);
    if (typeof value === 'number' || typeof value === 'bigint') {
      unityJsbState.HEAPU64()[pres >> 3] = BigInt(value);
      return false;
    }
    return -1;
  },

  JSB_ToUint32(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.refs.get(val);

    if (typeof value === 'number' || typeof value === 'bigint') {
      HEAPU32[pres >> 2] = Number(value);
      return false;
    }
    return -1;
  },

  JS_ToBool(ctx, val) {
    const context = unityJsbState.getContext(ctx);
    const objVal = context.runtime.refs.get(val);
    return !!objVal;
  },

  // #endregion

  // #region Bytecode

  JS_ReadObject(ptr, ctx, buf, buf_len, flags) {
    console.warn('Bytecode is not supported in WebGL Backend');
  },

  JS_WriteObject(ctx, psize, obj, flags) {
    console.warn('Bytecode is not supported in WebGL Backend');
    return 0 as IntPtr;
  },

  JS_EvalFunction(ptr, ctx, fun_obj) {
    console.warn('Bytecode is not supported in WebGL Backend');
  },

  js_free(ctx, ptr) {
    // TODO: Not sure what this is but seems related to Bytecode
  },

  // #endregion

  // #region Misc features

  JS_NewPromiseCapability(ret, ctx, resolving_funcs) {
    // TODO
    return 0;
  },

  JS_SetHostPromiseRejectionTracker(rt, cb, opaque) {
    // TODO:
  },

  JS_SetInterruptHandler(rt, cb, opaque) {
    // TODO:
  },

  JS_SetModuleLoaderFunc(rt, module_normalize, module_loader, opaque) {
    // TODO:
  },

  /* The asynchronous module loader, which is what makes ES modules work here at all.
     The host's half is identical to the desktop one - QuickJSModuleLoader resolves and
     fetches, and settles each load through JS_FulfillModuleLoad - so an `import` resolves
     against ReactUnity's own paths on both. What differs is who links and evaluates: there
     is no QuickJS here, so the graph is assembled into blob urls and handed to the browser.
     unityJsbState.createModuleRegistry is the whole of it. */
  JS_SetModuleLoaderFuncAsync(rt, module_normalize, module_loader, module_check_attrs, opaque) {
    const runtime = unityJsbState.getRuntime(rt);

    runtime.moduleNormalize = module_normalize;
    runtime.moduleLoader = module_loader;
    runtime.moduleOpaque = opaque;
    runtime.pendingModuleLoads = {};
    runtime.lastModuleLoadId = 0;

    // module_check_attrs is ignored, as it is by the host: nothing here reads an import
    // attribute, and the host passes a null pointer for it.
  },

  JS_SetModuleMetaFunc(rt, func, opaque) {
    // Never called back. The hook identifies a module by its JSModuleDef, and this backend
    // has none to hand out - so a module's prelude sets import.meta.url from the name the
    // normalizer resolved, which is the same value the host's hook would have written.
  },

  JS_FulfillModuleLoad(ctx, handle, source, source_len) {
    const context = unityJsbState.getContext(ctx);
    const pending = context.runtime.pendingModuleLoads[handle as any];
    // Already settled, or settled after the runtime went away.
    if (!pending) return -1;

    delete context.runtime.pendingModuleLoads[handle as any];
    pending.resolve(unityJsbState.stringify(source as any, source_len));
    return 0;
  },

  JS_RejectModuleLoad(ctx, handle, error) {
    const context = unityJsbState.getContext(ctx);
    const pending = context.runtime.pendingModuleLoads[handle as any];
    if (!pending) return -1;

    delete context.runtime.pendingModuleLoads[handle as any];

    const value = context.runtime.refs.get(error);
    pending.reject(value instanceof Error ? value : new Error(String(value)));
    return 0;
  },

  JS_EvalModuleAsync(ret, ctx, input, input_len, filename) {
    const context = unityJsbState.getContext(ctx);
    const code = unityJsbState.stringify(input as any, input_len);
    const name = unityJsbState.stringify(filename as any);

    // A promise, always - including for a graph that fails, which the host reports by
    // attaching to it. Pushing an Error here instead would be read as a parse error in the
    // root and thrown from EvalModuleAsync.
    context.runtime.refs.push(context.modules.evaluate(name, code), ret);
  },

  JS_GetModuleName(ctx, m) {
    // JS_ATOM_NULL. Only the import.meta hook asks, and that hook is never installed here.
    return 0;
  },

  JS_GetImportMeta(ret, ctx, m) {
    // TODO:
    return 0;
  },

  JS_ResolveModule(ctx, obj) {
    // TODO:
    return 0;
  },

  JS_ExecutePendingJob(rt, pctx) {
    // Automatically handled by browsers
    return false;
  },

  JS_IsJobPending(rt) {
    // Automatically handled by browsers
    return false;
  },

  // #endregion

};

autoAddDeps(UnityJSBPlugin, '$unityJsbState');
mergeInto(LibraryManager.library, UnityJSBPlugin);
