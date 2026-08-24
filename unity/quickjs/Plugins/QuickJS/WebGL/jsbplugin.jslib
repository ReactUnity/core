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
var UnityJSBPlugin = {
    $unityJsbState__postset: 'unityJsbState.atoms = unityJsbState.createAtoms();\n',
    $unityJsbState: {
        createObjectReferences: function () {
            var getTag = function (object) {
                if (object === undefined)
                    return 3 /* Tags.JS_TAG_UNDEFINED */;
                if (object === null)
                    return 2 /* Tags.JS_TAG_NULL */;
                if (typeof object === 'number')
                    return 8 /* Tags.JS_TAG_FLOAT64 */;
                if (typeof object === 'boolean')
                    return 1 /* Tags.JS_TAG_BOOL */;
                if (typeof object === 'symbol')
                    return -8 /* Tags.JS_TAG_SYMBOL */;
                if (typeof object === 'string')
                    return -7 /* Tags.JS_TAG_STRING */;
                if (typeof object === 'bigint')
                    return -9 /* Tags.JS_TAG_BIG_INT */;
                if (object instanceof Error)
                    return 6 /* Tags.JS_TAG_EXCEPTION */;
                return -1 /* Tags.JS_TAG_OBJECT */;
            };
            var record = {};
            var map = new Map();
            var payloadMap = new Map();
            var res = {
                record: record,
                lastId: 0,
                allocate: function (object) {
                    var ptr = _malloc(16 /* Sizes.JSValue */);
                    var id = res.push(object, ptr);
                    return [ptr, id];
                },
                batchAllocate: function (objects) {
                    var size = 16 /* Sizes.JSValue */;
                    var len = objects.length;
                    var arr = _malloc(size * len);
                    var ids = Array(len);
                    for (var index = 0; index < len; index++) {
                        var object = objects[index];
                        var id = res.push(object, arr + (index * size));
                        ids[index] = id;
                    }
                    return [arr, ids];
                },
                batchGet: function (ptrs, count) {
                    var size = 16 /* Sizes.JSValue */;
                    var arr = new Array(count);
                    for (var index = 0; index < count; index++) {
                        var object = res.get(ptrs + index * size);
                        arr[index] = object;
                    }
                    return arr;
                },
                push: function (object, ptr) {
                    if (typeof object === 'undefined') {
                        res.duplicateId(0, ptr);
                        return;
                    }
                    if (typeof object === 'number') {
                        if (typeof ptr === 'number') {
                            HEAPF64[ptr >> 3] = object;
                            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(8 /* Tags.JS_TAG_FLOAT64 */);
                        }
                        return;
                    }
                    if (typeof object === 'boolean') {
                        if (typeof ptr === 'number') {
                            HEAP32[ptr >> 2] = object ? 1 : 0;
                            HEAP32[(ptr >> 2) + 1] = 0;
                            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(1 /* Tags.JS_TAG_BOOL */);
                        }
                        return;
                    }
                    var foundId = map.get(object);
                    if (foundId > 0) {
                        res.duplicateId(foundId, ptr);
                        return foundId;
                    }
                    var id = ++res.lastId;
                    record[id] = {
                        id: id,
                        refCount: 0,
                        value: object,
                        tag: getTag(object),
                    };
                    map.set(object, id);
                    res.duplicateId(id, ptr);
                    return id;
                },
                get: function (val) {
                    var tag = Number(unityJsbState.HEAP64()[(val >> 3) + 1]);
                    if (tag === 0 /* Tags.JS_TAG_INT */) {
                        return HEAP32[val >> 2];
                    }
                    else if (tag === 1 /* Tags.JS_TAG_BOOL */) {
                        return !!HEAP32[val >> 2];
                    }
                    else if (tag === 8 /* Tags.JS_TAG_FLOAT64 */) {
                        return HEAPF64[val >> 3];
                    }
                    else {
                        var id = HEAP32[val >> 2];
                        if (id === 0)
                            return undefined;
                        var ho = record[id];
                        return ho.value;
                    }
                },
                getRecord: function (val) {
                    var tag = Number(unityJsbState.HEAP64()[(val >> 3) + 1]);
                    if (tag === 0 /* Tags.JS_TAG_INT */) {
                        var value = HEAP32[val >> 2];
                        return {
                            id: -1,
                            refCount: 0,
                            value: value,
                            tag: tag,
                        };
                    }
                    else if (tag === 1 /* Tags.JS_TAG_BOOL */) {
                        var boolValue = !!HEAP32[val >> 2];
                        return {
                            id: -1,
                            refCount: 0,
                            value: boolValue,
                            tag: tag,
                        };
                    }
                    else if (tag === 8 /* Tags.JS_TAG_FLOAT64 */) {
                        var value = HEAPF64[val >> 3];
                        return {
                            id: -1,
                            refCount: 0,
                            value: value,
                            tag: tag,
                        };
                    }
                    else {
                        var id = HEAP32[val >> 2];
                        if (id === 0)
                            return {
                                id: 0,
                                refCount: 0,
                                value: undefined,
                                tag: 3 /* Tags.JS_TAG_UNDEFINED */,
                                type: 0 /* BridgeObjectType.None */,
                                payload: -1,
                            };
                        var ho = record[id];
                        return ho;
                    }
                },
                duplicate: function (obj, ptr) {
                    var tag = Number(unityJsbState.HEAP64()[(obj >> 3) + 1]);
                    if (tag === 8 /* Tags.JS_TAG_FLOAT64 */) {
                        if (typeof ptr === 'number') {
                            var val = HEAPF64[(obj >> 3)];
                            HEAPF64[ptr >> 3] = val;
                            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
                        }
                        return;
                    }
                    else if (tag === 0 /* Tags.JS_TAG_INT */) {
                        if (typeof ptr === 'number') {
                            var val = HEAP32[(obj >> 2)];
                            HEAP32[(ptr >> 2)] = val;
                            HEAP32[(ptr >> 2) + 1] = 0;
                            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
                        }
                        return;
                    }
                    else if (tag === 1 /* Tags.JS_TAG_BOOL */) {
                        if (typeof ptr === 'number') {
                            var valBool = !!HEAP32[(obj >> 2)];
                            HEAP32[(ptr >> 2)] = valBool ? 1 : 0;
                            HEAP32[(ptr >> 2) + 1] = 0;
                            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
                        }
                        return;
                    }
                    var id = HEAP32[obj >> 2];
                    res.duplicateId(id, ptr);
                },
                duplicateId: function (id, ptr) {
                    if (id === 0) {
                        if (typeof ptr === 'number') {
                            HEAP32[ptr >> 2] = 0;
                            HEAP32[(ptr >> 2) + 1] = 0;
                            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(3 /* Tags.JS_TAG_UNDEFINED */);
                        }
                        return;
                    }
                    var ho = record[id];
                    ho.refCount += 1;
                    if (typeof ptr === 'number') {
                        HEAP32[ptr >> 2] = id;
                        HEAP32[(ptr >> 2) + 1] = 0;
                        unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(ho.tag);
                    }
                },
                pop: function (obj) {
                    var tag = Number(unityJsbState.HEAP64()[(obj >> 3) + 1]);
                    if (tag === 8 /* Tags.JS_TAG_FLOAT64 */
                        || tag === 0 /* Tags.JS_TAG_INT */
                        || tag === 1 /* Tags.JS_TAG_BOOL */)
                        return;
                    var id = HEAP32[obj >> 2];
                    res.popId(id);
                },
                popId: function (id) {
                    if (!id)
                        return;
                    var ho = record[id];
                    ho.refCount -= 1;
                    console.assert(ho.refCount >= 0);
                },
                deleteRecord: function (id) {
                    var rec = record[id];
                    delete record[id];
                    res.clearPayload(rec.value);
                    map.delete(rec.value);
                },
                payloadMap: payloadMap,
                setPayload: function (obj, type, payload) {
                    payloadMap.set(obj, {
                        type: type,
                        payload: payload,
                    });
                },
                getPayload: function (obj) {
                    var res = payloadMap.get(obj);
                    if (res)
                        return res;
                    else {
                        return {
                            type: 0 /* BridgeObjectType.None */,
                            payload: 0,
                        };
                    }
                },
                clearPayload: function (obj) {
                    payloadMap.delete(obj);
                },
            };
            return res;
        },
        createAtoms: function () {
            var record = {};
            var map = new Map();
            var res = {
                record: record,
                lastId: 0,
                get: function (ref) {
                    if (ref === 0)
                        return undefined;
                    return record[ref].value;
                },
                push: function (str) {
                    if (str === undefined)
                        return 0;
                    var mapped = map.get(str);
                    var id;
                    if (!mapped) {
                        id = ++res.lastId;
                        var item = record[id] = {
                            id: id,
                            value: str,
                            refCount: 1,
                        };
                        map.set(str, item);
                    }
                    else {
                        id = mapped.id;
                        mapped.refCount++;
                    }
                    return id;
                },
                pushId: function (id) {
                    if (id === 0)
                        return;
                    var recorded = record[id];
                    console.assert(!!recorded);
                    if (!recorded)
                        return 0;
                    recorded.refCount++;
                    return id;
                },
                pop: function (id) {
                    if (id === 0)
                        return;
                    var recorded = record[id];
                    console.assert(!!recorded);
                    if (!recorded)
                        return;
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
        stringify: function (ptr, bufferLength) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(ptr, bufferLength); },
        bufferify: function (arg) {
            var bufferSize = lengthBytesUTF8(arg) + 1;
            var buffer = _malloc(bufferSize);
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
        scanModule: function (source) {
            var edits = [];
            var bindings = {};
            var mentions = {};
            var len = source.length;
            // Keywords a regex literal can follow. Everything else that ends in a value position
            // makes the next `/` a division.
            var beforeRegex = {
                return: true, typeof: true, instanceof: true, in: true, of: true, new: true,
                delete: true, void: true, do: true, else: true, yield: true, await: true, throw: true,
                case: true,
            };
            var i = 0;
            var depth = 0;
            var afterValue = false;
            // Whether the previous token was `.`, which makes the next word a property name -
            // `obj.import(x)` is a method call, not a dynamic import.
            var afterDot = false;
            // The declaration being read at depth 0, and whether the next name in it binds.
            var declaring = null;
            var expectBinding = false;
            function isIdStart(c) {
                return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_' || c === '$' || c > '~';
            }
            function isIdPart(c) {
                return isIdStart(c) || (c >= '0' && c <= '9');
            }
            function skipTrivia(at) {
                while (at < len) {
                    var c = source.charAt(at);
                    if (c === ' ' || c === '\t' || c === '\r' || c === '\n') {
                        at++;
                        continue;
                    }
                    if (c === '/' && source.charAt(at + 1) === '/') {
                        while (at < len && source.charAt(at) !== '\n')
                            at++;
                        continue;
                    }
                    if (c === '/' && source.charAt(at + 1) === '*') {
                        var close_1 = source.indexOf('*/', at + 2);
                        at = close_1 < 0 ? len : close_1 + 2;
                        continue;
                    }
                    return at;
                }
                return at;
            }
            function skipString(at) {
                var quote = source.charAt(at);
                at++;
                while (at < len) {
                    var c = source.charAt(at);
                    if (c === '\\') {
                        at += 2;
                        continue;
                    }
                    at++;
                    if (c === quote)
                        return at;
                }
                return len;
            }
            function skipTemplate(at) {
                at++;
                while (at < len) {
                    var c = source.charAt(at);
                    if (c === '\\') {
                        at += 2;
                        continue;
                    }
                    if (c === '`')
                        return at + 1;
                    if (c === '$' && source.charAt(at + 1) === '{') {
                        at = skipBalanced(at + 1);
                        continue;
                    }
                    at++;
                }
                return len;
            }
            /** Past the bracket at `at` and everything it encloses. */
            function skipBalanced(at) {
                var open = source.charAt(at);
                var close = open === '{' ? '}' : open === '(' ? ')' : ']';
                var level = 0;
                while (at < len) {
                    var c = source.charAt(at);
                    if (c === '/' && (source.charAt(at + 1) === '/' || source.charAt(at + 1) === '*')) {
                        at = skipTrivia(at);
                        continue;
                    }
                    if (c === '"' || c === '\'') {
                        at = skipString(at);
                        continue;
                    }
                    if (c === '`') {
                        at = skipTemplate(at);
                        continue;
                    }
                    if (c === open) {
                        level++;
                        at++;
                        continue;
                    }
                    if (c === close) {
                        at++;
                        if (--level === 0)
                            return at;
                        continue;
                    }
                    at++;
                }
                return len;
            }
            function skipRegex(at) {
                at++;
                var inClass = false;
                while (at < len) {
                    var c = source.charAt(at);
                    if (c === '\\') {
                        at += 2;
                        continue;
                    }
                    // An unterminated one was a division after all; give up rather than eat the file.
                    if (c === '\n')
                        return at;
                    if (c === '[')
                        inClass = true;
                    else if (c === ']')
                        inClass = false;
                    else if (c === '/' && !inClass) {
                        at++;
                        while (at < len && isIdPart(source.charAt(at)))
                            at++;
                        return at;
                    }
                    at++;
                }
                return len;
            }
            function bind(name) {
                if (name)
                    bindings[name] = true;
            }
            /** Records the module specifier at `at`, if a string literal is what is there. */
            function readSpecifier(at) {
                at = skipTrivia(at);
                var c = source.charAt(at);
                if (c !== '"' && c !== '\'')
                    return at;
                var end = skipString(at);
                edits.push({
                    start: at,
                    end: end,
                    specifier: source.substring(at + 1, end - 1).replace(/\\(.)/g, '$1'),
                });
                return end;
            }
            /** The names an import clause binds: the last identifier of each comma-separated entry,
             *  so `{ a as b, c }` binds `b` and `c`. */
            function readClause(from, to) {
                var at = from;
                var entry = null;
                while (at < to) {
                    var c = source.charAt(at);
                    if (isIdStart(c)) {
                        var start = at;
                        while (at < to && isIdPart(source.charAt(at)))
                            at++;
                        var word = source.substring(start, at);
                        if (word !== 'as')
                            entry = word;
                        continue;
                    }
                    if (c === ',') {
                        bind(entry);
                        entry = null;
                    }
                    at++;
                }
                bind(entry);
            }
            /** An `import ... from '...'` declaration, from just past the keyword. */
            function readImport(at) {
                while (at < len) {
                    at = skipTrivia(at);
                    if (at >= len)
                        return at;
                    var c = source.charAt(at);
                    if (c === '"' || c === '\'')
                        return readSpecifier(at);
                    if (c === ';')
                        return at + 1;
                    if (c === '{') {
                        var end = skipBalanced(at);
                        readClause(at + 1, end - 1);
                        at = end;
                        continue;
                    }
                    if (isIdStart(c)) {
                        var start = at;
                        while (at < len && isIdPart(source.charAt(at)))
                            at++;
                        var word = source.substring(start, at);
                        // A default import, or the local name of `* as ns`; either way it binds.
                        if (word !== 'from' && word !== 'as')
                            bind(word);
                        continue;
                    }
                    at++;
                }
                return at;
            }
            /** An `export` declaration, from just past the keyword. Only a re-export carries a
             *  specifier; the rest declare names the main loop picks up on its own. */
            function readExport(at) {
                at = skipTrivia(at);
                var c = source.charAt(at);
                if (c === '*') {
                    // `export * from 'x'`, or `export * as ns from 'x'` - `ns` is an export name, not a
                    // local binding, so nothing here binds.
                    at++;
                    while (at < len) {
                        at = skipTrivia(at);
                        var d = source.charAt(at);
                        if (d === '"' || d === '\'')
                            return readSpecifier(at);
                        if (!isIdStart(d))
                            return at;
                        while (at < len && isIdPart(source.charAt(at)))
                            at++;
                    }
                    return at;
                }
                if (c === '{') {
                    var end = skipBalanced(at);
                    var next = skipTrivia(end);
                    // `export {a} from 'x'` re-exports; `export {a}` names bindings that already exist.
                    if (source.substring(next, next + 4) === 'from' && !isIdPart(source.charAt(next + 4))) {
                        return readSpecifier(next + 4);
                    }
                    return end;
                }
                return at;
            }
            while (i < len) {
                var c = source.charAt(i);
                if (c === ' ' || c === '\t' || c === '\r' || c === '\n') {
                    i++;
                    continue;
                }
                if (c === '/') {
                    var next = source.charAt(i + 1);
                    if (next === '/' || next === '*') {
                        i = skipTrivia(i);
                        continue;
                    }
                    afterDot = false;
                    if (!afterValue) {
                        i = skipRegex(i);
                        afterValue = true;
                        continue;
                    }
                    i++;
                    afterValue = false;
                    continue;
                }
                if (c === '"' || c === '\'') {
                    i = skipString(i);
                    afterValue = true;
                    afterDot = false;
                    continue;
                }
                if (c === '`') {
                    i = skipTemplate(i);
                    afterValue = true;
                    afterDot = false;
                    continue;
                }
                if (c === '(' || c === '[' || c === '{') {
                    depth++;
                    i++;
                    afterValue = false;
                    afterDot = false;
                    continue;
                }
                if (c === ')' || c === ']' || c === '}') {
                    depth--;
                    i++;
                    afterValue = true;
                    afterDot = false;
                    if (depth <= 0) {
                        depth = 0;
                        declaring = null;
                        expectBinding = false;
                    }
                    continue;
                }
                if (c >= '0' && c <= '9') {
                    while (i < len && (isIdPart(source.charAt(i)) || source.charAt(i) === '.'))
                        i++;
                    afterValue = true;
                    afterDot = false;
                    continue;
                }
                if (isIdStart(c)) {
                    var start = i;
                    var wasProperty = afterDot;
                    while (i < len && isIdPart(source.charAt(i)))
                        i++;
                    var word = source.substring(start, i);
                    afterValue = !beforeRegex[word];
                    afterDot = false;
                    // A property, not a keyword: `obj.import(x)` and `obj.export` are neither. It is
                    // not a free name either, so the globals prelude has no reason to declare it.
                    if (wasProperty)
                        continue;
                    mentions[word] = true;
                    if (word === 'import') {
                        var at = skipTrivia(i);
                        var after = source.charAt(at);
                        if (after === '(') {
                            // Dynamic. Left to the browser it would resolve against the blob url and fetch
                            // it itself, which is not where this backend's modules live.
                            edits.push({ start: start, end: i, specifier: null });
                            continue;
                        }
                        // import.meta, which the prelude fills in.
                        if (after === '.')
                            continue;
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
                        if (source.charAt(skipTrivia(i)) !== ':')
                            bind(word);
                        expectBinding = false;
                    }
                    continue;
                }
                if (depth === 0 && declaring) {
                    if (c === ',')
                        expectBinding = true;
                    else if (c === '=')
                        expectBinding = false;
                    else if (c === ';') {
                        declaring = null;
                        expectBinding = false;
                    }
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
        createModuleRegistry: function (context) {
            var state = unityJsbState;
            var records = {};
            var urls = [];
            // The context's own Promise, so a graph still in flight when the context dies stops
            // where the rest of its microtasks do.
            var Promise = context.contentWindow.Promise;
            function fail(message) {
                return Promise.reject(new Error(message));
            }
            /** The host's answer for a specifier written inside `referrer`. */
            function resolve(referrer, specifier) {
                var runtime = context.runtime;
                var normalize = runtime.moduleNormalize;
                if (!normalize)
                    return specifier;
                var referrerBuffer = state.bufferify(referrer || '');
                var specifierBuffer = state.bufferify(specifier);
                var result;
                try {
                    result = {{{ makeDynCall('iiiii', 'normalize') }}}(context.id, referrerBuffer[0], specifierBuffer[0], runtime.moduleOpaque);
                }
                finally {
                    _free(referrerBuffer[0]);
                    _free(specifierBuffer[0]);
                }
                if (!result)
                    return null;
                var name = state.stringify(result);
                // The caller frees what the normalizer returns, as the engine does; the host allocated
                // it through js_strndup, which is _malloc here.
                _free(result);
                return name;
            }
            /** Hands a module to the host to fetch, and settles when it comes back. */
            function request(name) {
                var runtime = context.runtime;
                var loader = runtime.moduleLoader;
                if (!loader)
                    return fail('No module loader is installed, so \'' + name + '\' cannot be fetched');
                return new Promise(function (resolveSource, rejectSource) {
                    // Registered before the call: the host is allowed to settle from inside it, and the
                    // error paths do exactly that.
                    var ticket = ++runtime.lastModuleLoadId;
                    runtime.pendingModuleLoads[ticket] = { resolve: resolveSource, reject: rejectSource };
                    var nameBuffer = state.bufferify(name);
                    // Import attributes, which nothing here reads; the host's loader ignores them too.
                    var attributes = runtime.refs.allocate(undefined);
                    try {
                        {{{ makeDynCall('viiiii', 'loader') }}}(context.id, nameBuffer[0], attributes[0], runtime.moduleOpaque, ticket);
                    }
                    finally {
                        _free(nameBuffer[0]);
                        _free(attributes[0]);
                    }
                });
            }
            /** Fetches `name` and everything below it. `stack` is the path that asked for it. */
            function load(name, stack) {
                var existing = records[name];
                if (existing)
                    return existing.ready;
                var record = records[name] = {
                    name: name, source: null, scan: null, deps: {}, ready: null, url: null,
                };
                record.ready = request(name).then(function (source) {
                    return link(record, source, stack);
                });
                return record.ready;
            }
            function link(record, source, stack) {
                record.source = source;
                record.scan = state.scanModule(source);
                var waiting = [];
                record.scan.edits.forEach(function (edit) {
                    if (edit.specifier === null || record.deps[edit.specifier])
                        return;
                    var resolved = resolve(record.name, edit.specifier);
                    if (!resolved)
                        throw new Error('Could not resolve \'' + edit.specifier + '\' from \'' + record.name + '\'');
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
            function urlFor(record) {
                if (record.url)
                    return record.url;
                var depUrls = {};
                Object.keys(record.deps).forEach(function (specifier) {
                    depUrls[specifier] = urlFor(records[record.deps[specifier]]);
                });
                var url = context.createBlobUrl(assemble(record, depUrls));
                urls.push(url);
                record.url = url;
                return url;
            }
            function assemble(record, depUrls) {
                var source = record.source;
                var parts = [];
                var at = 0;
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
            function prelude(record) {
                var scan = record.scan;
                var reserved = state.moduleReservedNames;
                var names = [];
                Object.keys(context.hostGlobals).forEach(function (name) {
                    // Only names the module mentions as a free identifier. That keeps the declaration
                    // short, and keeps out a name the module declares in a way scanModule does not parse
                    // - which would otherwise be a redeclaration error rather than a shadowed global.
                    if (!scan.mentions[name] || scan.bindings[name])
                        return;
                    if (reserved[name] || name === state.moduleImportHook)
                        return;
                    if (!/^[A-Za-z_$][A-Za-z_0-9$]*$/.test(name))
                        return;
                    names.push(name);
                });
                // A bare identifier, not `globalThis[...]`. `globalThis` is itself one of the host
                // globals - it is the proxy, not the realm's - so a module that mentions it gets a `var`
                // for it, which hoists over the whole module and would leave the initializer below
                // reading a property of `undefined`. The registry key cannot be shadowed that way
                // because it is never one of the names declared here.
                var entry = state.moduleRegistryKey + '[' + context.id + ']';
                var parts = [];
                // `var`, not `const`: a module is free to declare `var URL` itself, and two `var`
                // declarations of one name are legal where two lexical ones are a SyntaxError.
                if (names.length)
                    parts.push('var {' + names.join(',') + '} = ' + entry + '.globals;');
                parts.push('var ' + state.moduleImportHook + ' = ' + entry + '.dynamicImport(' + JSON.stringify(record.name) + ');');
                // The host's JS_SetModuleMetaFunc hook cannot serve this backend - there is no
                // JSModuleDef for it to name a module by - so import.meta is filled in here instead.
                parts.push('import.meta.url = ' + JSON.stringify(record.name) + ';');
                parts.push('import.meta.main = false;');
                return parts.join('');
            }
            function release(record) {
                if (!record)
                    return;
                if (record.url) {
                    var index = urls.indexOf(record.url);
                    if (index >= 0)
                        urls.splice(index, 1);
                    context.revokeBlobUrl(record.url);
                }
                delete records[record.name];
            }
            return {
                evaluate: function (name, source) {
                    // A root evaluated again is a reload, and has to be a new module rather than the
                    // cached one: the browser keys its module cache on the url, so re-importing the same
                    // blob would resolve without running anything.
                    release(records[name]);
                    var root = records[name] = {
                        name: name, source: null, scan: null, deps: {}, ready: null, url: null,
                    };
                    root.ready = Promise.resolve().then(function () { return link(root, source, [name]); });
                    return root.ready.then(function () { return context.importModule(urlFor(root)); });
                },
                dynamicImport: function (referrer) {
                    return function (specifier) {
                        var resolved;
                        try {
                            resolved = resolve(referrer, String(specifier));
                        }
                        catch (err) {
                            return Promise.reject(err);
                        }
                        if (!resolved)
                            return fail('Could not resolve \'' + specifier + '\' from \'' + (referrer || 'a script') + '\'');
                        var existing = records[resolved];
                        var ready = existing ? existing.ready : load(resolved, [resolved]);
                        return ready.then(function () { return context.importModule(urlFor(records[resolved])); });
                    };
                },
                /** Points a script's dynamic imports at the host loader.
                 *
                 * `import()` in eval code is legal and would work - against the page's base url and the
                 * browser's fetcher, which is not where this backend's modules live. The desktop
                 * engine's loader gets the call, so it has to here too.
                 */
                rewriteScript: function (code) {
                    if (code.indexOf('import') < 0)
                        return code;
                    var edits = state.scanModule(code).edits;
                    var parts = [];
                    var at = 0;
                    edits.forEach(function (edit) {
                        // Only the dynamic ones: a static import is not legal in a script at all, and
                        // rewriting a specifier there would hide the syntax error rather than fix it.
                        if (edit.specifier !== null)
                            return;
                        parts.push(code.substring(at, edit.start));
                        parts.push(state.moduleImportHook);
                        at = edit.end;
                    });
                    if (!parts.length)
                        return code;
                    parts.push(code.substring(at));
                    return parts.join('');
                },
                free: function () {
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
            var rtId = rt;
            return unityJsbState.runtimes[rtId];
        },
        getContext: function (ctx) {
            var ctxId = ctx;
            return unityJsbState.contexts[ctxId];
        },
        /* Resolves a JSValue with no context to resolve it against. ng dropped the JSContext
           from JS_IsArray and JS_IsError, and references are kept per runtime, so there is
           nothing left to look one up in. Every live runtime is searched and the one holding
           that id answers; ambiguity needs two live runtimes, which needs JSWorker, which
           needs threads WebGL does not have. Primitives carry their value in the JSValue
           itself, so for those any runtime decodes alike. */
        getAnyValue: function (val) {
            var ids = Object.keys(unityJsbState.runtimes);
            var first;
            for (var i = 0; i < ids.length; i++) {
                var runtime = unityJsbState.runtimes[ids[i]];
                if (!runtime || runtime.isDestroyed)
                    continue;
                if (!first)
                    first = runtime;
                if (runtime.refs.record[HEAP32[val >> 2]])
                    return runtime.refs.get(val);
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
    JSB_Init: function () {
        return 10 /* Constants.CS_JSB_VERSION */;
    },
    JSB_NewRuntime: function (finalizer) {
        // TODO: understand what to do with finalizer
        var id = unityJsbState.lastRuntimeId++;
        var refs = unityJsbState.createObjectReferences();
        unityJsbState.runtimes[id] = {
            id: id,
            contexts: {},
            refs: refs,
            isDestroyed: false,
            garbageCollect: function () {
                var lastId = refs.lastId;
                var record = refs.record;
                var aliveItemCount = 0;
                for (var index = 0; index <= lastId; index++) {
                    var element = record[index];
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
    JSB_GetRuntimeOpaque: function (rtId) {
        return unityJsbState.getRuntime(rtId).opaque;
    },
    JSB_SetRuntimeOpaque: function (rtId, opaque) {
        unityJsbState.getRuntime(rtId).opaque = opaque;
    },
    JS_GetContextOpaque: function (ctx) {
        return unityJsbState.getContext(ctx).opaque;
    },
    JS_SetContextOpaque: function (ctx, opaque) {
        unityJsbState.getContext(ctx).opaque = opaque;
    },
    JSB_FreeRuntime: function (rtId) {
        var runtime = unityJsbState.getRuntime(rtId);
        var ctxIds = Object.keys(runtime.contexts);
        for (var index = 0; index < ctxIds.length; index++) {
            var ctxId = ctxIds[index];
            var context = runtime.contexts[ctxId];
            context.free();
        }
        var aliveItemCount = runtime.garbageCollect();
        runtime.isDestroyed = true;
        delete unityJsbState.runtimes[runtime.id];
        return aliveItemCount === 0;
    },
    JS_GetRuntime: function (ctxId) {
        var context = unityJsbState.getContext(ctxId);
        return context.runtimeId;
    },
    JS_NewContext: function (rtId) {
        var _a, _b;
        var id = unityJsbState.lastContextId++;
        var runtime = unityJsbState.getRuntime(rtId);
        var iframe = document.createElement('iframe');
        iframe.name = 'reactunity-context-' + id;
        iframe.style.display = 'none';
        document.head.appendChild(iframe);
        var contentWindow = iframe.contentWindow;
        var fetch = contentWindow.fetch.bind(contentWindow);
        var URL = contentWindow.URL;
        var XMLHttpRequest = contentWindow.XMLHttpRequest;
        var XMLHttpRequestUpload = contentWindow.XMLHttpRequestUpload;
        var WebSocket = contentWindow.WebSocket;
        var baseTag = null;
        // #region Promise monkey patch
        // This patches the Promise so that microtasks are not run after the context is destroyed
        var Promise = contentWindow.Promise;
        var originalThen = Promise.prototype.then;
        var originalCatch = Promise.prototype.catch;
        var originalFinally = Promise.prototype.finally;
        Promise.prototype.then = function promiseThenPatch(onFulfilled, onRejected) {
            return originalThen.call(this, !onFulfilled ? undefined : function onFulfilledPatch() { if (!context.isDestroyed)
                return onFulfilled.apply(this, arguments); }, !onRejected ? undefined : function onRejectedPatch() { if (!context.isDestroyed)
                return onRejected.apply(this, arguments); });
        };
        Promise.prototype.catch = function promiseCatchPatch(onRejected) {
            return originalCatch.call(this, !onRejected ? undefined : function onRejectedPatch() { if (!context.isDestroyed)
                return onRejected.apply(this, arguments); });
        };
        if (originalFinally) {
            Promise.prototype.finally = function promiseFinallyPatch(onFinally) {
                return originalFinally.call(this, !onFinally ? undefined : function onFinallyPatch() { if (!context.isDestroyed)
                    return onFinally.apply(this, arguments); });
            };
        }
        // #endregion
        var extraGlobals = {
            location: undefined,
            document: undefined,
            addEventListener: undefined,
            btoa: (_a = window.btoa) === null || _a === void 0 ? void 0 : _a.bind(window),
            atob: (_b = window.atob) === null || _b === void 0 ? void 0 : _b.bind(window),
            $$webglWindow: window,
            WebSocket: WebSocket,
            fetch: fetch,
            URL: URL,
            XMLHttpRequest: XMLHttpRequest,
            XMLHttpRequestUpload: XMLHttpRequestUpload,
            Promise: Promise,
        };
        var globals = new Proxy(extraGlobals, {
            get: function (target, p, receiver) {
                if (p in target)
                    return target[p];
                var res = window[p];
                return res;
            },
            set: function (target, p, val, receiver) {
                target[p] = val;
                return true;
            },
            has: function (target, key) {
                return (key in window) || (key in target);
            },
        });
        extraGlobals.globalThis =
            extraGlobals.global =
                extraGlobals.window =
                    extraGlobals.parent =
                        extraGlobals.self =
                            extraGlobals.this =
                                globals;
        var evaluate = function (code, filename) {
            var sourceUrlSuffix = !filename ? '' : '\n//# sourceURL=reactunity:///' + filename;
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
        var importModule = new Function('url', 'return import(url);');
        // Modules are handed to the browser as blob urls, so the page - not the iframe - is what
        // has to hold them: it is the realm doing the importing, and it outlives the iframe.
        var pageRegistry = window[unityJsbState.moduleRegistryKey] ||
            (window[unityJsbState.moduleRegistryKey] = {});
        var context = {
            id: id,
            runtime: runtime,
            runtimeId: rtId,
            window: window,
            globalObject: globals,
            hostGlobals: extraGlobals,
            evaluate: evaluate,
            importModule: importModule,
            iframe: iframe,
            contentWindow: contentWindow,
            isDestroyed: false,
            modules: null,
            createBlobUrl: function (text) {
                return window.URL.createObjectURL(new window.Blob([text], { type: 'text/javascript' }));
            },
            revokeBlobUrl: function (url) {
                window.URL.revokeObjectURL(url);
            },
            free: function () {
                if (iframe.parentNode)
                    iframe.parentNode.removeChild(iframe);
                context.modules.free();
                delete pageRegistry[context.id];
                context.isDestroyed = true;
                delete runtime.contexts[context.id];
                delete unityJsbState.contexts[context.id];
            },
            setBaseUrl: function (url) {
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
    JS_FreeContext: function (ctxId) {
        var context = unityJsbState.getContext(ctxId);
        context.free();
    },
    JS_SetBaseUrl: function (ctxId, url) {
        var context = unityJsbState.getContext(ctxId);
        var urlStr = unityJsbState.stringify(url);
        context.setBaseUrl(urlStr);
    },
    JS_GetGlobalObject: function (returnValue, ctxId) {
        var context = unityJsbState.getContext(ctxId);
        if (!context.globalObjectId) {
            context.runtime.refs.push(context.globalObject, returnValue);
        }
        else {
            context.runtime.refs.duplicateId(context.globalObjectId, returnValue);
        }
    },
    JS_Eval: function (ptr, ctx, input, input_len, filename, eval_flags) {
        var context = unityJsbState.getContext(ctx);
        try {
            var code = unityJsbState.stringify(input, input_len);
            var filenameStr = unityJsbState.stringify(filename);
            var res = context.evaluate(context.modules.rewriteScript(code), filenameStr);
            context.runtime.refs.push(res, ptr);
        }
        catch (err) {
            context.lastException = err;
            context.runtime.refs.push(err, ptr);
            console.error(err);
        }
    },
    JS_IsInstanceOf: function (ctxId, val, obj) {
        var context = unityJsbState.getContext(ctxId);
        var valVal = context.runtime.refs.get(val);
        var ctorVal = context.runtime.refs.get(obj);
        return !!(valVal instanceof ctorVal);
    },
    JS_GetException: function (ptr, ctx) {
        var context = unityJsbState.getContext(ctx);
        context.runtime.refs.push(context.lastException, ptr);
    },
    JSB_FreeValue: function (ctx, v) {
        var context = unityJsbState.getContext(ctx);
        context.runtime.refs.pop(v);
    },
    JSB_FreeValueRT: function (rt, v) {
        var runtime = unityJsbState.getRuntime(rt);
        runtime.refs.pop(v);
    },
    JSB_DupValue: function (ptr, ctx, v) {
        var context = unityJsbState.getContext(ctx);
        context.runtime.refs.duplicate(v, ptr);
    },
    JS_RunGC: function (rt) {
        var runtime = unityJsbState.getRuntime(rt);
        runtime.garbageCollect();
    },
    JS_ComputeMemoryUsage: function (rt, s) {
        // TODO: https://blog.unity.com/technology/unity-webgl-memory-the-unity-heap
    },
    JS_GetPropertyUint32: function (ptr, ctxId, val, index) {
        var context = unityJsbState.getContext(ctxId);
        var obj = context.runtime.refs.get(val);
        var res = obj[index];
        context.runtime.refs.push(res, ptr);
    },
    JS_GetProperty: function (ptr, ctxId, val, prop) {
        var context = unityJsbState.getContext(ctxId);
        var valObj = context.runtime.refs.get(val);
        var propStr = unityJsbState.atoms.get(prop);
        var res = valObj[propStr];
        context.runtime.refs.push(res, ptr);
    },
    JS_GetPropertyStr: function (ptr, ctxId, val, prop) {
        var context = unityJsbState.getContext(ctxId);
        var valObj = context.runtime.refs.get(val);
        var propStr = unityJsbState.stringify(prop);
        var res = valObj[propStr];
        context.runtime.refs.push(res, ptr);
    },
    JS_Invoke: function (ptr, ctx, this_obj, prop, argc, argv) {
        var context = unityJsbState.getContext(ctx);
        var propVal = unityJsbState.atoms.get(prop);
        var thisVal = context.runtime.refs.get(this_obj);
        var func = thisVal[propVal];
        var args = context.runtime.refs.batchGet(argv, argc);
        var res;
        try {
            res = func.apply(thisVal, args);
        }
        catch (err) {
            context.lastException = err;
            res = err;
        }
        context.runtime.refs.push(res, ptr);
    },
    JS_Call: function (ptr, ctx, func_obj, this_obj, argc, argv) {
        var context = unityJsbState.getContext(ctx);
        var func = context.runtime.refs.get(func_obj);
        var thisVal = context.runtime.refs.get(this_obj);
        var args = context.runtime.refs.batchGet(argv, argc);
        var res;
        try {
            res = func.apply(thisVal, args);
        }
        catch (err) {
            context.lastException = err;
            res = err;
        }
        context.runtime.refs.push(res, ptr);
    },
    JS_CallConstructor: function (ptr, ctx, func_obj, argc, argv) {
        var context = unityJsbState.getContext(ctx);
        var func = context.runtime.refs.get(func_obj);
        var args = context.runtime.refs.batchGet(argv, argc);
        var res;
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
    JS_SetConstructor: function (ctx, ctor, proto) {
        var context = unityJsbState.getContext(ctx);
        var ctorVal = context.runtime.refs.get(ctor);
        var protoVal = context.runtime.refs.get(proto);
        ctorVal.prototype = protoVal;
        protoVal.constructor = ctorVal;
        var ctorPayload = context.runtime.refs.getPayload(ctorVal);
        if (ctorPayload.type === 1 /* BridgeObjectType.TypeRef */) {
            context.runtime.refs.setPayload(protoVal, ctorPayload.type, ctorPayload.payload);
        }
        return 0;
    },
    JS_SetPrototype: function (ctx, obj, proto) {
        var context = unityJsbState.getContext(ctx);
        var objVal = context.runtime.refs.get(obj);
        var protoVal = context.runtime.refs.get(proto);
        Reflect.setPrototypeOf(objVal, protoVal);
        return true;
    },
    JS_DefineProperty: function (ctx, this_obj, prop, val, getter, setter, flags) {
        var context = unityJsbState.getContext(ctx);
        var thisVal = context.runtime.refs.get(this_obj);
        var getterVal = context.runtime.refs.get(getter);
        var setterVal = context.runtime.refs.get(setter);
        var valVal = context.runtime.refs.get(val);
        var propVal = unityJsbState.atoms.get(prop);
        var configurable = !!(flags & 1 /* JSPropFlags.JS_PROP_CONFIGURABLE */);
        var hasConfigurable = configurable || !!(flags & 256 /* JSPropFlags.JS_PROP_HAS_CONFIGURABLE */);
        var enumerable = !!(flags & 4 /* JSPropFlags.JS_PROP_ENUMERABLE */);
        var hasEnumerable = enumerable || !!(flags & 1024 /* JSPropFlags.JS_PROP_HAS_ENUMERABLE */);
        var writable = !!(flags & 2 /* JSPropFlags.JS_PROP_WRITABLE */);
        var hasWritable = writable || !!(flags & 512 /* JSPropFlags.JS_PROP_HAS_WRITABLE */);
        var shouldThrow = !!(flags & 16384 /* JSPropFlags.JS_PROP_THROW */) || !!(flags & 32768 /* JSPropFlags.JS_PROP_THROW_STRICT */);
        try {
            var opts = {
                get: getterVal,
                set: setterVal,
            };
            if (!getter && !setter) {
                opts.value = valVal;
            }
            if (hasConfigurable)
                opts.configurable = configurable;
            if (hasEnumerable)
                opts.enumerable = enumerable;
            if (!getter && !setter && hasWritable)
                opts.writable = writable;
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
    JS_DefinePropertyValue: function (ctx, this_obj, prop, val, flags) {
        var context = unityJsbState.getContext(ctx);
        var runtime = context.runtime;
        var thisVal = runtime.refs.get(this_obj);
        var valVal = runtime.refs.get(val);
        var propVal = unityJsbState.atoms.get(prop);
        var configurable = !!(flags & 1 /* JSPropFlags.JS_PROP_CONFIGURABLE */);
        var hasConfigurable = configurable || !!(flags & 256 /* JSPropFlags.JS_PROP_HAS_CONFIGURABLE */);
        var enumerable = !!(flags & 4 /* JSPropFlags.JS_PROP_ENUMERABLE */);
        var hasEnumerable = enumerable || !!(flags & 1024 /* JSPropFlags.JS_PROP_HAS_ENUMERABLE */);
        var writable = !!(flags & 2 /* JSPropFlags.JS_PROP_WRITABLE */);
        var hasWritable = writable || !!(flags & 512 /* JSPropFlags.JS_PROP_HAS_WRITABLE */);
        var shouldThrow = !!(flags & 16384 /* JSPropFlags.JS_PROP_THROW */) || !!(flags & 32768 /* JSPropFlags.JS_PROP_THROW_STRICT */);
        // SetProperty frees the value automatically
        runtime.refs.pop(val);
        try {
            var opts = {
                value: valVal,
            };
            if (hasConfigurable)
                opts.configurable = configurable;
            if (hasEnumerable)
                opts.enumerable = enumerable;
            if (hasWritable)
                opts.writable = writable;
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
    JS_HasProperty: function (ctx, this_obj, prop) {
        var context = unityJsbState.getContext(ctx);
        var thisVal = context.runtime.refs.get(this_obj);
        var propVal = unityJsbState.atoms.get(prop);
        var res = Reflect.has(thisVal, propVal);
        return !!res;
    },
    // ng's JS_SetProperty is JS_SetPropertyInternal with JS_PROP_THROW, which is the only
    // flag combination the C# ever passed, so the flags argument is gone with the wrapper.
    // -1 on exception, otherwise true/false.
    JS_SetProperty: function (ctx, this_obj, prop, val) {
        var context = unityJsbState.getContext(ctx);
        var runtime = context.runtime;
        var thisVal = runtime.refs.get(this_obj);
        var valVal = runtime.refs.get(val);
        var propVal = unityJsbState.atoms.get(prop);
        // SetProperty frees the value automatically
        runtime.refs.pop(val);
        try {
            thisVal[propVal] = valVal;
            return 1;
        }
        catch (err) {
            context.lastException = err;
            console.error(err);
            return -1;
        }
    },
    JS_SetPropertyUint32: function (ctx, this_obj, idx, val) {
        var context = unityJsbState.getContext(ctx);
        var runtime = context.runtime;
        var thisVal = context.runtime.refs.get(this_obj);
        var valVal = context.runtime.refs.get(val);
        var propVal = idx;
        // SetProperty frees the value automatically
        runtime.refs.pop(val);
        try {
            thisVal[propVal] = valVal;
            return true;
        }
        catch (err) {
            context.lastException = err;
        }
        return false;
    },
    jsb_get_payload_header: function (ret, ctx, val) {
        var context = unityJsbState.getContext(ctx);
        var obj = context.runtime.refs.get(val);
        var rec = context.runtime.refs.getPayload(obj);
        HEAP32[ret >> 2] = rec.type;
        HEAP32[(ret >> 2) + 1] = rec.payload;
    },
    JS_ToCStringLen2: function (ctx, len, val, cesu8) {
        var context = unityJsbState.getContext(ctx);
        var str = context.runtime.refs.get(val);
        if (typeof str === 'undefined') {
            HEAP32[(len >> 2)] = 0;
            return 0;
        }
        var _a = unityJsbState.bufferify(str), buffer = _a[0], length = _a[1];
        HEAP32[(len >> 2)] = length - 1;
        return buffer;
    },
    JS_FreeCString: function (ctx, ptr) {
        _free(ptr);
    },
    JS_GetArrayBuffer: function (ctx, psize, obj) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(obj);
        if (value instanceof ArrayBuffer) {
            HEAP32[psize >> 2] = value.byteLength;
            return value;
        }
        return 0;
    },
    // #region Atoms
    JS_NewAtomLen: function (ctx, str, len) {
        var context = unityJsbState.getContext(ctx);
        var val = unityJsbState.stringify(str, len);
        return unityJsbState.atoms.push(val);
    },
    JS_AtomToString: function (ptr, ctx, atom) {
        var context = unityJsbState.getContext(ctx);
        var str = unityJsbState.atoms.get(atom);
        context.runtime.refs.push(str, ptr);
    },
    JS_FreeAtom: function (ctx, v) {
        unityJsbState.atoms.pop(v);
    },
    JS_DupAtom: function (ctx, v) {
        return unityJsbState.atoms.pushId(v);
    },
    JSB_ATOM_constructor: function () {
        return unityJsbState.atoms.push('constructor');
    },
    JSB_ATOM_Error: function () {
        return unityJsbState.atoms.push('Error');
    },
    JSB_ATOM_length: function () {
        return unityJsbState.atoms.push('length');
    },
    JSB_ATOM_message: function () {
        return unityJsbState.atoms.push('message');
    },
    JSB_ATOM_name: function () {
        return unityJsbState.atoms.push('name');
    },
    JSB_ATOM_Number: function () {
        return unityJsbState.atoms.push('Number');
    },
    JSB_ATOM_prototype: function () {
        return unityJsbState.atoms.push('prototype');
    },
    JSB_ATOM_Proxy: function () {
        return unityJsbState.atoms.push('Proxy');
    },
    JSB_ATOM_stack: function () {
        return unityJsbState.atoms.push('stack');
    },
    JSB_ATOM_String: function () {
        return unityJsbState.atoms.push('String');
    },
    JSB_ATOM_Object: function () {
        return unityJsbState.atoms.push('Object');
    },
    // #endregion
    // #region Is
    // No JSContext, and no -1: ng returns a plain bool, having moved the proxy case that
    // needed the tri-state behind JS_IsProxy.
    JS_IsArray: function (val) {
        var valVal = unityJsbState.getAnyValue(val);
        return !!Array.isArray(valVal);
    },
    JS_IsConstructor: function (ctx, val) {
        var context = unityJsbState.getContext(ctx);
        var obj = context.runtime.refs.get(val);
        var res = !!obj.prototype && !!obj.prototype.constructor.name;
        return !!res;
    },
    JS_IsError: function (val) {
        var valVal = unityJsbState.getAnyValue(val);
        return !!(valVal instanceof Error);
    },
    JS_IsFunction: function (ctx, val) {
        var context = unityJsbState.getContext(ctx);
        var valVal = context.runtime.refs.get(val);
        var res = typeof valVal === 'function';
        return !!res;
    },
    // #endregion
    JS_ParseJSON: function (ptr, ctx, buf, buf_len, filename) {
        var context = unityJsbState.getContext(ctx);
        var str = unityJsbState.stringify(buf, buf_len);
        var res = JSON.parse(str);
        context.runtime.refs.push(res, ptr);
    },
    JS_JSONStringify: function (ptr, ctx, obj, replacer, space) {
        var context = unityJsbState.getContext(ctx);
        var objVal = context.runtime.refs.get(obj);
        var rpVal = context.runtime.refs.get(replacer);
        var spVal = context.runtime.refs.get(space);
        var res = JSON.stringify(objVal, rpVal, spVal);
        context.runtime.refs.push(res, ptr);
    },
    // #region New
    JS_NewArray: function (ptr, ctx) {
        var context = unityJsbState.getContext(ctx);
        var res = [];
        context.runtime.refs.push(res, ptr);
    },
    JS_NewArrayBufferCopy: function (ptr, ctx, buf, len) {
        var context = unityJsbState.getContext(ctx);
        var nptr = _malloc(len);
        var res = new Uint8Array(HEAPU8.buffer, nptr, len);
        var existing = new Uint8Array(HEAPU8.buffer, buf, len);
        res.set(existing);
        context.runtime.refs.push(res, ptr);
    },
    JSB_NewFloat64: function (ptr, ctx, d) {
        var context = unityJsbState.getContext(ctx);
        context.runtime.refs.push(d, ptr);
    },
    JSB_NewInt64: function (ptr, ctx, d) {
        var context = unityJsbState.getContext(ctx);
        context.runtime.refs.push(d, ptr);
    },
    JS_NewObject: function (ptr, ctx) {
        var context = unityJsbState.getContext(ctx);
        var res = {};
        context.runtime.refs.push(res, ptr);
    },
    JS_NewStringLen: function (ptr, ctx, str, len) {
        var context = unityJsbState.getContext(ctx);
        var val = unityJsbState.stringify(str, len);
        context.runtime.refs.push(val, ptr);
    },
    JSB_NewEmptyString: function (ptr, ctx) {
        var context = unityJsbState.getContext(ctx);
        var res = "";
        context.runtime.refs.push(res, ptr);
    },
    // #endregion
    // #region Bridge
    JSB_NewCFunction: function (ret, ctx, func, atom, length, cproto, magic) {
        var context = unityJsbState.getContext(ctx);
        var refs = context.runtime.refs;
        var name = unityJsbState.atoms.get(atom) || 'jscFunction';
        function jscFunction() {
            var args = arguments;
            var thisObj = this === window ? context.globalObject : this;
            var _a = refs.allocate(thisObj), thisPtr = _a[0], thisId = _a[1];
            var ret = _malloc(16 /* Sizes.JSValue */);
            if (cproto === 0 /* JSCFunctionEnum.JS_CFUNC_generic */) {
                var argc = args.length;
                var _b = refs.batchAllocate(Array.from(args)), argv = _b[0], argIds = _b[1];
                {{{ makeDynCall('viiiii', 'func') }}}(ret, ctx, thisPtr, argc, argv);
                argIds.forEach(refs.popId);
                _free(argv);
            }
            else if (cproto === 9 /* JSCFunctionEnum.JS_CFUNC_setter */) {
                var _c = refs.allocate(args[0]), val = _c[0], valId = _c[1];
                {{{ makeDynCall('viiii', 'func') }}}(ret, ctx, thisPtr, val);
                refs.popId(valId);
                _free(val);
            }
            else if (cproto === 8 /* JSCFunctionEnum.JS_CFUNC_getter */) {
                {{{ makeDynCall('viii', 'func') }}}(ret, ctx, thisPtr);
            }
            else {
                throw new Error("Unknown type of function specified: name=".concat(name, " type=").concat(cproto));
            }
            refs.popId(thisId);
            _free(thisPtr);
            var returnValue = refs.get(ret);
            refs.pop(ret);
            _free(ret);
            return returnValue;
        }
        jscFunction['$$csharpFunctionName'] = name;
        refs.push(jscFunction, ret);
    },
    JSB_NewCFunctionMagic: function (ret, ctx, func, atom, length, cproto, magic) {
        var context = unityJsbState.getContext(ctx);
        var refs = context.runtime.refs;
        var name = unityJsbState.atoms.get(atom) || 'jscFunctionMagic';
        function jscFunctionMagic() {
            var args = arguments;
            var thisObj = this === window ? context.globalObject : this;
            var _a = refs.allocate(thisObj), thisPtr = _a[0], thisId = _a[1];
            var ret = _malloc(16 /* Sizes.JSValue */);
            if (cproto === 1 /* JSCFunctionEnum.JS_CFUNC_generic_magic */) {
                var argc = args.length;
                var _b = refs.batchAllocate(Array.from(args)), argv = _b[0], argIds = _b[1];
                {{{ makeDynCall('viiiiii', 'func') }}}(ret, ctx, thisPtr, argc, argv, magic);
                argIds.forEach(refs.popId);
                _free(argv);
            }
            else if (cproto === 3 /* JSCFunctionEnum.JS_CFUNC_constructor_magic */) {
                var argc = args.length;
                var _c = refs.batchAllocate(Array.from(args)), argv = _c[0], argIds = _c[1];
                {{{ makeDynCall('viiiiii', 'func') }}}(ret, ctx, thisPtr, argc, argv, magic);
                argIds.forEach(refs.popId);
                _free(argv);
            }
            else if (cproto === 11 /* JSCFunctionEnum.JS_CFUNC_setter_magic */) {
                var _d = refs.allocate(args[0]), val = _d[0], valId = _d[1];
                {{{ makeDynCall('viiiii', 'func') }}}(ret, ctx, thisPtr, val, magic);
                refs.popId(valId);
                _free(val);
            }
            else if (cproto === 10 /* JSCFunctionEnum.JS_CFUNC_getter_magic */) {
                {{{ makeDynCall('viiii', 'func') }}}(ret, ctx, thisPtr, magic);
            }
            else {
                throw new Error("Unknown type of function specified: name=".concat(name, " type=").concat(cproto));
            }
            refs.popId(thisId);
            _free(thisPtr);
            var returnValue = refs.get(ret);
            refs.pop(ret);
            _free(ret);
            return returnValue;
        }
        ;
        jscFunctionMagic['$$csharpFunctionName'] = name;
        refs.push(jscFunctionMagic, ret);
        if (cproto === 3 /* JSCFunctionEnum.JS_CFUNC_constructor_magic */) {
            refs.setPayload(jscFunctionMagic, 1 /* BridgeObjectType.TypeRef */, magic);
        }
    },
    jsb_new_bridge_object: function (ret, ctx, proto, object_id) {
        var context = unityJsbState.getContext(ctx);
        var protoVal = context.runtime.refs.get(proto);
        var res = Object.create(protoVal);
        context.runtime.refs.push(res, ret);
        context.runtime.refs.setPayload(res, 2 /* BridgeObjectType.ObjectRef */, object_id);
    },
    jsb_new_bridge_value: function (ret, ctx, proto, size) {
        var context = unityJsbState.getContext(ctx);
        var protoVal = context.runtime.refs.get(proto);
        var res = Object.create(protoVal);
        res.$$values = new Array(size).fill(0);
        context.runtime.refs.push(res, ret);
    },
    JSB_NewBridgeClassObject: function (ret, ctx, new_target, object_id) {
        var context = unityJsbState.getContext(ctx);
        var res = context.runtime.refs.get(new_target);
        context.runtime.refs.push(res, ret);
        context.runtime.refs.setPayload(res, 2 /* BridgeObjectType.ObjectRef */, object_id);
    },
    JSB_NewBridgeClassValue: function (ret, ctx, new_target, size) {
        var context = unityJsbState.getContext(ctx);
        var res = context.runtime.refs.get(new_target);
        res.$$values = new Array(size).fill(0);
        context.runtime.refs.push(res, ret);
    },
    jsb_crossbind_constructor: function (ret, ctx, new_target) {
        var context = unityJsbState.getContext(ctx);
        var target = context.runtime.refs.get(new_target);
        // TODO: I have no idea
        var res = function () {
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
    JSB_ThrowError: function (ret, ctx, buf, buf_len) {
        var context = unityJsbState.getContext(ctx);
        var str = unityJsbState.stringify(buf, buf_len);
        var err = new Error(str);
        console.error(err);
        context.lastException = err;
        context.runtime.refs.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowTypeError: function (ret, ctx, msg) {
        var context = unityJsbState.getContext(ctx);
        var err = new TypeError(unityJsbState.stringify(msg) || 'Type Error');
        console.error(err);
        context.lastException = err;
        context.runtime.refs.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowRangeError: function (ret, ctx, msg) {
        var context = unityJsbState.getContext(ctx);
        var err = new RangeError(unityJsbState.stringify(msg) || 'Range Error');
        console.error(err);
        context.lastException = err;
        context.runtime.refs.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowInternalError: function (ret, ctx, msg) {
        var context = unityJsbState.getContext(ctx);
        var err = new Error(unityJsbState.stringify(msg) || 'Internal Error');
        console.error(err);
        context.lastException = err;
        context.runtime.refs.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowReferenceError: function (ret, ctx, msg) {
        var context = unityJsbState.getContext(ctx);
        var err = new ReferenceError(unityJsbState.stringify(msg) || 'Reference Error');
        console.error(err);
        context.lastException = err;
        context.runtime.refs.push(err, ret);
        // TODO: throw?
    },
    // #endregion
    // #region Low level Set
    js_strndup: function (ctx, s, n) {
        var buffer = _malloc(n + 1);
        _memcpy(buffer, s, n);
        HEAPU8[buffer + n] = 0;
        return buffer;
    },
    jsb_set_bytes: function (ctx, val, n, v0) {
        var context = unityJsbState.getContext(ctx);
        var obj = context.runtime.refs.get(val);
        var count = n / 4 /* Sizes.Single */;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        for (var index = 0; index < count; index++) {
            var val_1 = HEAP32[(v0 >> 2) + index];
            obj.$$values[index] = val_1;
        }
        return true;
    },
    // #endregion
    // #region Low Level Get
    jsb_get_bytes: function (ctx, val, n, v0) {
        var context = unityJsbState.getContext(ctx);
        var obj = context.runtime.refs.get(val);
        var count = n / 4 /* Sizes.Single */;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        for (var index = 0; index < count; index++) {
            var val_2 = obj.$$values[index];
            HEAP32[(v0 >> 2) + index] = val_2;
        }
        return true;
    },
    // #endregion
    // #region To
    JS_ToFloat64: function (ctx, pres, val) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPF64[pres >> 3] = Number(value);
            return false;
        }
        return -1;
    },
    JS_ToInt32: function (ctx, pres, val) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAP32[pres >> 2] = Number(value);
            return false;
        }
        return -1;
    },
    JS_ToInt64: function (ctx, pres, val) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            unityJsbState.HEAP64()[pres >> 3] = BigInt(value);
            return false;
        }
        return -1;
    },
    JS_ToBigInt64: function (ctx, pres, val) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            unityJsbState.HEAP64()[pres >> 3] = BigInt(value);
            return false;
        }
        return -1;
    },
    JS_ToIndex: function (ctx, pres, val) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            unityJsbState.HEAPU64()[pres >> 3] = BigInt(value);
            return false;
        }
        return -1;
    },
    JSB_ToUint32: function (ctx, pres, val) {
        var context = unityJsbState.getContext(ctx);
        var value = context.runtime.refs.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPU32[pres >> 2] = Number(value);
            return false;
        }
        return -1;
    },
    JS_ToBool: function (ctx, val) {
        var context = unityJsbState.getContext(ctx);
        var objVal = context.runtime.refs.get(val);
        return !!objVal;
    },
    // #endregion
    // #region Bytecode
    JS_ReadObject: function (ptr, ctx, buf, buf_len, flags) {
        console.warn('Bytecode is not supported in WebGL Backend');
    },
    JS_WriteObject: function (ctx, psize, obj, flags) {
        console.warn('Bytecode is not supported in WebGL Backend');
        return 0;
    },
    JS_EvalFunction: function (ptr, ctx, fun_obj) {
        console.warn('Bytecode is not supported in WebGL Backend');
    },
    js_free: function (ctx, ptr) {
        // TODO: Not sure what this is but seems related to Bytecode
    },
    // #endregion
    // #region Misc features
    JS_NewPromiseCapability: function (ret, ctx, resolving_funcs) {
        // TODO
        return 0;
    },
    JS_SetHostPromiseRejectionTracker: function (rt, cb, opaque) {
        // TODO:
    },
    JS_SetInterruptHandler: function (rt, cb, opaque) {
        // TODO:
    },
    JS_SetMaxStackSize: function (rt, stack_size) {
        // Nothing to cap. Scripts run on the browser's own engine, which enforces its own call
        // stack limit and raises a catchable RangeError - the thing the native backends need this
        // for is already true here.
    },
    JS_SetModuleLoaderFunc: function (rt, module_normalize, module_loader, opaque) {
        // TODO:
    },
    /* The asynchronous module loader, which is what makes ES modules work here at all.
       The host's half is identical to the desktop one - QuickJSModuleLoader resolves and
       fetches, and settles each load through JS_FulfillModuleLoad - so an `import` resolves
       against ReactUnity's own paths on both. What differs is who links and evaluates: there
       is no QuickJS here, so the graph is assembled into blob urls and handed to the browser.
       unityJsbState.createModuleRegistry is the whole of it. */
    JS_SetModuleLoaderFuncAsync: function (rt, module_normalize, module_loader, module_check_attrs, opaque) {
        var runtime = unityJsbState.getRuntime(rt);
        runtime.moduleNormalize = module_normalize;
        runtime.moduleLoader = module_loader;
        runtime.moduleOpaque = opaque;
        runtime.pendingModuleLoads = {};
        runtime.lastModuleLoadId = 0;
        // module_check_attrs is ignored, as it is by the host: nothing here reads an import
        // attribute, and the host passes a null pointer for it.
    },
    JS_SetModuleMetaFunc: function (rt, func, opaque) {
        // Never called back. The hook identifies a module by its JSModuleDef, and this backend
        // has none to hand out - so a module's prelude sets import.meta.url from the name the
        // normalizer resolved, which is the same value the host's hook would have written.
    },
    JS_FulfillModuleLoad: function (ctx, handle, source, source_len) {
        var context = unityJsbState.getContext(ctx);
        var pending = context.runtime.pendingModuleLoads[handle];
        // Already settled, or settled after the runtime went away.
        if (!pending)
            return -1;
        delete context.runtime.pendingModuleLoads[handle];
        pending.resolve(unityJsbState.stringify(source, source_len));
        return 0;
    },
    JS_RejectModuleLoad: function (ctx, handle, error) {
        var context = unityJsbState.getContext(ctx);
        var pending = context.runtime.pendingModuleLoads[handle];
        if (!pending)
            return -1;
        delete context.runtime.pendingModuleLoads[handle];
        var value = context.runtime.refs.get(error);
        pending.reject(value instanceof Error ? value : new Error(String(value)));
        return 0;
    },
    JS_EvalModuleAsync: function (ret, ctx, input, input_len, filename) {
        var context = unityJsbState.getContext(ctx);
        var code = unityJsbState.stringify(input, input_len);
        var name = unityJsbState.stringify(filename);
        // A promise, always - including for a graph that fails, which the host reports by
        // attaching to it. Pushing an Error here instead would be read as a parse error in the
        // root and thrown from EvalModuleAsync.
        context.runtime.refs.push(context.modules.evaluate(name, code), ret);
    },
    JS_GetModuleName: function (ctx, m) {
        // JS_ATOM_NULL. Only the import.meta hook asks, and that hook is never installed here.
        return 0;
    },
    JS_GetImportMeta: function (ret, ctx, m) {
        // TODO:
        return 0;
    },
    JS_ResolveModule: function (ctx, obj) {
        // TODO:
        return 0;
    },
    JS_ExecutePendingJob: function (rt, pctx) {
        // Automatically handled by browsers
        return false;
    },
    JS_IsJobPending: function (rt) {
        // Automatically handled by browsers
        return false;
    },
    // #endregion
};
autoAddDeps(UnityJSBPlugin, '$unityJsbState');
mergeInto(LibraryManager.library, UnityJSBPlugin);
