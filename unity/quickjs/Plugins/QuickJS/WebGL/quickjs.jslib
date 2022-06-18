/**
 * Build with the following command:
 * npx -p typescript tsc
 */
var QuickJSPlugin = {
    $state__postset: 'state.atoms = state.createHeap(true);\n',
    $state: {
        createHeap: function (isAtom) {
            var getTag = function (object, allowNumbers) {
                if (allowNumbers === void 0) { allowNumbers = false; }
                if (object === undefined)
                    return 3 /* Tags.JS_TAG_UNDEFINED */;
                if (object === null)
                    return 2 /* Tags.JS_TAG_NULL */;
                if (allowNumbers && typeof object === 'number')
                    return 7 /* Tags.JS_TAG_FLOAT64 */;
                if (typeof object === 'boolean')
                    return 1 /* Tags.JS_TAG_BOOL */;
                if (typeof object === 'function')
                    return -2 /* Tags.JS_TAG_FUNCTION_BYTECODE */;
                if (typeof object === 'symbol')
                    return -8 /* Tags.JS_TAG_SYMBOL */;
                if (typeof object === 'string')
                    return -7 /* Tags.JS_TAG_STRING */;
                if (typeof object === 'bigint')
                    return -10 /* Tags.JS_TAG_BIG_INT */;
                if (object instanceof Error)
                    return 6 /* Tags.JS_TAG_EXCEPTION */;
                return -1 /* Tags.JS_TAG_OBJECT */;
            };
            var record = {};
            var map = new Map();
            var res = {
                record: record,
                lastId: 1,
                allocate: function (object, type, payload) {
                    if (isAtom)
                        return res.push(object, undefined, type, payload);
                    var ptr = _malloc(16 /* Sizes.JSValue */);
                    res.push(object, ptr, type, payload);
                    return ptr;
                },
                batchAllocate: function (objects) {
                    var size = isAtom ? 4 /* Sizes.JSAtom */ : 16 /* Sizes.JSValue */;
                    var arr = _malloc(size * objects.length);
                    for (var index = 0; index < objects.length; index++) {
                        var object = objects[index];
                        res.push(object, arr + (index * size));
                    }
                    return arr;
                },
                batchGet: function (ptrs, count) {
                    var size = (isAtom ? 4 /* Sizes.JSAtom */ : 16 /* Sizes.JSValue */);
                    var arr = new Array(count);
                    for (var index = 0; index < count; index++) {
                        var object = res.get(ptrs + index * size);
                        arr[index] = object;
                    }
                    return arr;
                },
                push: function (object, ptr, type, payload) {
                    if (typeof object === 'undefined') {
                        res.refIndex(0, 1, ptr);
                        return 0;
                    }
                    // if (!isAtom && typeof object === 'number') {
                    //   res.ref(object as any, 1, ptr);
                    //   return -1;
                    // }
                    var foundId = map.get(object);
                    if (foundId > 0) {
                        var found = record[foundId];
                        found.type = type || found.type;
                        found.payload = payload || found.payload;
                        res.refIndex(foundId, 1, ptr);
                        return foundId;
                    }
                    var id = res.lastId++;
                    record[id] = {
                        id: id,
                        refCount: 0,
                        value: object,
                        tag: getTag(object),
                        type: type || 0 /* BridgeObjectType.None */,
                        payload: payload,
                    };
                    map.set(object, id);
                    res.refIndex(id, 1, ptr);
                    return id;
                },
                get: function (val) {
                    var tag = isAtom ? undefined : Number(state.HEAP64()[(val >> 3) + 1]);
                    if (tag === 0 /* Tags.JS_TAG_INT */) {
                        return HEAP32[val >> 2];
                    }
                    else if (tag === 7 /* Tags.JS_TAG_FLOAT64 */) {
                        return HEAPF64[val >> 3];
                    }
                    else {
                        var id = isAtom ? val : HEAP32[val >> 2];
                        if (id === 0)
                            return undefined;
                        var ho = record[id];
                        return ho.value;
                    }
                },
                getRecord: function (val) {
                    var tag = isAtom ? undefined : Number(state.HEAP64()[(val >> 3) + 1]);
                    if (tag === 0 /* Tags.JS_TAG_INT */) {
                        var value = HEAP32[val >> 2];
                        return {
                            id: -1,
                            refCount: 0,
                            value: value,
                            tag: 0 /* Tags.JS_TAG_INT */,
                            type: 3 /* BridgeObjectType.ValueType */,
                            payload: value,
                        };
                    }
                    else if (tag === 7 /* Tags.JS_TAG_FLOAT64 */) {
                        var value = HEAPF64[val >> 3];
                        return {
                            id: -1,
                            refCount: 0,
                            value: value,
                            tag: 7 /* Tags.JS_TAG_FLOAT64 */,
                            type: 3 /* BridgeObjectType.ValueType */,
                            payload: value,
                        };
                    }
                    else {
                        var id = isAtom ? val : HEAP32[val >> 2];
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
                ref: function (obj, diff, ptr) {
                    var id = isAtom ? obj : HEAP32[obj >> 2];
                    return res.refIndex(id, diff, ptr);
                },
                refIndex: function (id, diff, ptr) {
                    if (id === 0) {
                        if (typeof ptr === 'number') {
                            HEAP32[ptr >> 2] = 0;
                            if (!isAtom) {
                                HEAP32[(ptr >> 2) + 1] = 0;
                                state.HEAP64()[(ptr >> 3) + 1] = BigInt(3 /* Tags.JS_TAG_UNDEFINED */);
                            }
                        }
                        return 0;
                    }
                    var ho = record[id];
                    ho.refCount += diff;
                    console.assert(ho.refCount >= 0);
                    if (ho.refCount <= 0) {
                        res.popIndex(id);
                    }
                    if (typeof ptr === 'number') {
                        HEAP32[ptr >> 2] = id;
                        if (!isAtom) {
                            HEAP32[(ptr >> 2) + 1] = 0;
                            state.HEAP64()[(ptr >> 3) + 1] = BigInt(ho.tag);
                        }
                    }
                    return ho.refCount;
                },
                popIndex: function (id) {
                    var rec = record[id];
                    record[id] = undefined;
                    map.delete(rec.value);
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
        dynCall: function () { return (typeof Runtime !== 'undefined' ? Runtime.dynCall : dynCall).apply(typeof Runtime !== 'undefined' ? Runtime : undefined, arguments); },
        runtimes: {},
        contexts: {},
        lastRuntimeId: 1,
        lastContextId: 1,
        getRuntime: function (rt) {
            var rtId = rt;
            return state.runtimes[rtId];
        },
        getContext: function (ctx) {
            var ctxId = ctx;
            return state.contexts[ctxId];
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
        var id = state.lastRuntimeId++;
        state.runtimes[id] = {
            id: id,
            contexts: {},
        };
        return id;
    },
    JSB_GetRuntimeOpaque: function (rtId) {
        return state.getRuntime(rtId).opaque;
    },
    JSB_SetRuntimeOpaque: function (rtId, opaque) {
        state.getRuntime(rtId).opaque = opaque;
    },
    JS_GetContextOpaque: function (ctx) {
        return state.getContext(ctx).opaque;
    },
    JS_SetContextOpaque: function (ctx, opaque) {
        state.getContext(ctx).opaque = opaque;
    },
    JSB_FreeRuntime: function (rtId) {
        var runtime = state.getRuntime(rtId);
        for (var key in runtime.contexts) {
            if (Object.hasOwnProperty.call(runtime.contexts, key)) {
                state.contexts[key] = undefined;
            }
        }
        state.runtimes[runtime.id] = undefined;
        return true;
    },
    JS_GetRuntime: function (ctxId) {
        var context = state.getContext(ctxId);
        return context.runtimeId;
    },
    JS_NewContext: function (rtId) {
        var id = state.lastContextId++;
        var runtime = state.getRuntime(rtId);
        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.head.appendChild(iframe);
        var window = iframe.contentWindow;
        window['parent'] = undefined;
        var execute = function (code) {
            var script = window.document.createElement('script');
            script.innerText = code;
            window.document.head.appendChild(script);
        };
        var evaluate = function (code) {
            return window['eval'](code);
        };
        var objects = state.createHeap(false);
        var context = {
            id: id,
            runtimeId: rtId,
            iframe: iframe,
            window: window,
            execute: execute,
            evaluate: evaluate,
            objects: objects,
        };
        runtime.contexts[id] = context;
        state.contexts[id] = context;
        return id;
    },
    JS_FreeContext: function (ctxId) {
        var context = state.getContext(ctxId);
        var runtime = state.runtimes[context.runtimeId];
        runtime.contexts[context.id] = undefined;
        state.contexts[context.id] = undefined;
    },
    JS_GetGlobalObject: function (returnValue, ctxId) {
        var context = state.getContext(ctxId);
        if (!context.globalId) {
            context.objects.push(context.window, returnValue);
        }
        else {
            context.objects.refIndex(context.globalId, 1, returnValue);
        }
    },
    JS_Eval: function (ptr, ctx, input, input_len, filename, eval_flags) {
        try {
            var context = state.getContext(ctx);
            var code = state.stringify(input, input_len);
            var res = context.evaluate(code);
            context.objects.push(res, ptr);
        }
        catch (err) {
            context.lastException = err;
            context.objects.push(err, ptr);
        }
    },
    JS_IsInstanceOf: function (ctxId, val, obj) {
        var context = state.getContext(ctxId);
        var valVal = context.objects.get(val);
        var ctorVal = context.objects.get(obj);
        return !!(valVal instanceof ctorVal);
    },
    JS_GetException: function (ptr, ctx) {
        var context = state.getContext(ctx);
        context.objects.push(context.lastException, ptr);
    },
    JSB_FreeValue: function (ctx, v) {
        var context = state.getContext(ctx);
        context.objects.ref(v, -1, undefined);
    },
    JSB_FreeValueRT: function (rt, v) {
        // TODO:
    },
    JS_FreeCString: function (ctx, ptr) {
        // TODO:
        // _free(ptr);
    },
    js_free: function (ctx, ptr) {
        // TODO:
        // _free(ptr);
    },
    JSB_FreePayload: function (ret, ctx, val) {
        var _a;
        var context = state.getContext(ctx);
        var rec = context.objects.getRecord(val);
        HEAP32[ret >> 2] = rec.type;
        HEAP32[(ret >> 2) + 1] = (_a = rec.payload) !== null && _a !== void 0 ? _a : -1;
        // TODO: free?
    },
    JSB_DupValue: function (ptr, ctx, v) {
        var context = state.getContext(ctx);
        context.objects.ref(v, 1, ptr);
    },
    JS_RunGC: function (rt) {
        // TODO: handle gracefully
        return 0;
    },
    JS_ComputeMemoryUsage: function (rt, s) {
        // TODO: https://blog.unity.com/technology/unity-webgl-memory-the-unity-heap
    },
    JS_GetPropertyUint32: function (ptr, ctxId, val, index) {
        var context = state.getContext(ctxId);
        var obj = context.objects.get(val);
        var res = obj[index];
        context.objects.push(res, ptr);
    },
    JS_GetPropertyInternal: function (ptr, ctxId, val, prop, receiver, throwRefError) {
        var context = state.getContext(ctxId);
        var valObj = context.objects.get(val);
        var receiverObj = context.objects.get(receiver);
        var propStr = state.atoms.get(prop);
        var res = Reflect.get(valObj, propStr, receiverObj);
        context.objects.push(res, ptr);
    },
    JS_GetPropertyStr: function (ptr, ctxId, val, prop) {
        var context = state.getContext(ctxId);
        var valObj = context.objects.get(val);
        var propStr = state.stringify(prop);
        var res = Reflect.get(valObj, propStr);
        context.objects.push(res, ptr);
    },
    JS_Invoke: function (ptr, ctx, this_obj, prop, argc, argv) {
        var context = state.getContext(ctx);
        var propVal = state.atoms.get(prop);
        var thisVal = context.objects.get(this_obj);
        var func = Reflect.get(thisVal, propVal);
        var args = context.objects.batchGet(argv, argc);
        var val = func.apply(thisVal, args);
        context.objects.push(val, ptr);
    },
    JS_Call: function (ptr, ctx, func_obj, this_obj, argc, argv) {
        var context = state.getContext(ctx);
        var func = context.objects.get(func_obj);
        var thisVal = context.objects.get(this_obj);
        var args = context.objects.batchGet(argv, argc);
        var val = func.apply(thisVal, args);
        context.objects.push(val, ptr);
    },
    JS_CallConstructor: function (ptr, ctx, func_obj, argc, argv) {
        var context = state.getContext(ctx);
        var func = context.objects.get(func_obj);
        var args = context.objects.batchGet(argv, argc);
        var val = Reflect.construct(func, args);
        context.objects.push(val, ptr);
    },
    JS_SetConstructor: function (ctx, ctor, proto) {
        var context = state.getContext(ctx);
        var ctorVal = context.objects.get(ctor);
        var protoVal = context.objects.get(proto);
        ctorVal.prototype = protoVal;
    },
    JS_SetPrototype: function (ctx, obj, proto) {
        var context = state.getContext(ctx);
        var objVal = context.objects.get(obj);
        var protoVal = context.objects.get(proto);
        Reflect.setPrototypeOf(objVal, protoVal);
        return true;
    },
    JS_DefineProperty: function (ctx, this_obj, prop, val, getter, setter, flags) {
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var getterVal = context.objects.get(getter);
        var setterVal = context.objects.get(setter);
        var valVal = context.objects.get(val);
        var propVal = state.atoms.get(prop);
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
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = state.atoms.get(prop);
        var configurable = !!(flags & 1 /* JSPropFlags.JS_PROP_CONFIGURABLE */);
        var hasConfigurable = configurable || !!(flags & 256 /* JSPropFlags.JS_PROP_HAS_CONFIGURABLE */);
        var enumerable = !!(flags & 4 /* JSPropFlags.JS_PROP_ENUMERABLE */);
        var hasEnumerable = enumerable || !!(flags & 1024 /* JSPropFlags.JS_PROP_HAS_ENUMERABLE */);
        var writable = !!(flags & 2 /* JSPropFlags.JS_PROP_WRITABLE */);
        var hasWritable = writable || !!(flags & 512 /* JSPropFlags.JS_PROP_HAS_WRITABLE */);
        var shouldThrow = !!(flags & 16384 /* JSPropFlags.JS_PROP_THROW */) || !!(flags & 32768 /* JSPropFlags.JS_PROP_THROW_STRICT */);
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
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var propVal = state.atoms.get(prop);
        var res = Reflect.has(thisVal, propVal);
        return !!res;
    },
    JS_SetPropertyInternal: function (ctx, this_obj, prop, val, flags) {
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = state.atoms.get(prop);
        var shouldThrow = !!(flags & 16384 /* JSPropFlags.JS_PROP_THROW */) || !!(flags & 32768 /* JSPropFlags.JS_PROP_THROW_STRICT */);
        try {
            return !!Reflect.set(thisVal, propVal, valVal);
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
    JS_SetPropertyUint32: function (ctx, this_obj, idx, val) {
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = idx;
        return !!Reflect.set(thisVal, propVal, valVal);
    },
    jsb_get_payload_header: function (ret, ctx, val) {
        var context = state.getContext(ctx);
        var rec = context.objects.getRecord(val);
        HEAP32[ret >> 2] = rec.type;
        HEAP32[(ret >> 2) + 1] = rec.payload || 0;
    },
    JS_ToCStringLen2: function (ctx, len, val, cesu8) {
        var context = state.getContext(ctx);
        var str = context.objects.get(val);
        if (typeof str === 'undefined') {
            HEAP32[(len >> 2)] = 0;
            return 0;
        }
        var _a = state.bufferify(str), buffer = _a[0], length = _a[1];
        HEAP32[(len >> 2)] = length;
        return buffer;
    },
    JS_GetArrayBuffer: function (ctx, psize, obj) {
        var context = state.getContext(ctx);
        var value = context.objects.get(obj);
        if (value instanceof ArrayBuffer) {
            HEAP32[psize >> 2] = value.byteLength;
            return value;
        }
        return 0;
    },
    // #region Atoms
    JS_NewAtomLen: function (ctx, str, len) {
        var context = state.getContext(ctx);
        var val = state.stringify(str, len);
        return state.atoms.push(val, undefined);
    },
    JS_AtomToString: function (ptr, ctx, atom) {
        var context = state.getContext(ctx);
        var str = state.atoms.get(atom);
        context.objects.push(str, ptr);
    },
    JS_FreeAtom: function (ctx, v) {
        var context = state.getContext(ctx);
        state.atoms.ref(v, -1, undefined);
    },
    JS_DupAtom: function (ctx, v) {
        var context = state.getContext(ctx);
        state.atoms.ref(v, 1, undefined);
        return v;
    },
    JSB_ATOM_constructor: function () {
        return state.atoms.push('constructor', undefined);
    },
    JSB_ATOM_Error: function () {
        return state.atoms.push('Error', undefined);
    },
    JSB_ATOM_fileName: function () {
        return state.atoms.push('fileName', undefined);
    },
    JSB_ATOM_Function: function () {
        return state.atoms.push('Function', undefined);
    },
    JSB_ATOM_length: function () {
        return state.atoms.push('length', undefined);
    },
    JSB_ATOM_lineNumber: function () {
        return state.atoms.push('lineNumber', undefined);
    },
    JSB_ATOM_message: function () {
        return state.atoms.push('message', undefined);
    },
    JSB_ATOM_name: function () {
        return state.atoms.push('name', undefined);
    },
    JSB_ATOM_Number: function () {
        return state.atoms.push('Number', undefined);
    },
    JSB_ATOM_prototype: function () {
        return state.atoms.push('prototype', undefined);
    },
    JSB_ATOM_Proxy: function () {
        return state.atoms.push('Proxy', undefined);
    },
    JSB_ATOM_stack: function () {
        return state.atoms.push('stack', undefined);
    },
    JSB_ATOM_String: function () {
        return state.atoms.push('String', undefined);
    },
    JSB_ATOM_Object: function () {
        return state.atoms.push('Object', undefined);
    },
    JSB_ATOM_Operators: function () {
        return state.atoms.push('Operators', undefined);
    },
    JSB_ATOM_Symbol_operatorSet: function () {
        return state.atoms.push('operatorSet', undefined);
    },
    // #endregion
    // #region Is
    JS_IsArray: function (ctx, val) {
        var context = state.getContext(ctx);
        var valVal = context.objects.get(val);
        var res = Array.isArray(valVal);
        return !!res;
    },
    JS_IsConstructor: function (ctx, val) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var res = !!obj.prototype && !!obj.prototype.constructor.name;
        return !!res;
    },
    JS_IsError: function (ctx, val) {
        var context = state.getContext(ctx);
        var valVal = context.objects.get(val);
        var res = valVal instanceof Error;
        return !!res;
    },
    JS_IsFunction: function (ctx, val) {
        var context = state.getContext(ctx);
        var valVal = context.objects.get(val);
        var res = typeof valVal === 'function';
        return !!res;
    },
    // #endregion
    JS_ParseJSON: function (ptr, ctx, buf, buf_len, filename) {
        var context = state.getContext(ctx);
        var str = state.stringify(buf, buf_len);
        var res = JSON.parse(str);
        context.objects.push(res, ptr);
    },
    JS_JSONStringify: function (ptr, ctx, obj, replacer, space) {
        var context = state.getContext(ctx);
        var objVal = context.objects.get(obj);
        var rpVal = context.objects.get(replacer);
        var spVal = context.objects.get(space);
        var res = JSON.stringify(objVal, rpVal, spVal);
        context.objects.push(res, ptr);
    },
    // #region New
    JS_NewArray: function (ptr, ctx) {
        var context = state.getContext(ctx);
        var res = [];
        context.objects.push(res, ptr);
    },
    JS_NewArrayBufferCopy: function (ptr, ctx, buf, len) {
        var context = state.getContext(ctx);
        var nptr = _malloc(len);
        var res = new Uint8Array(HEAPU8.buffer, nptr, len);
        var existing = new Uint8Array(HEAPU8.buffer, buf, len);
        res.set(existing);
        context.objects.push(res, ptr);
    },
    JSB_NewFloat64: function (ptr, ctx, d) {
        var context = state.getContext(ctx);
        // TODO: push literal
        context.objects.push(d, ptr);
    },
    JSB_NewInt64: function (ptr, ctx, d) {
        var context = state.getContext(ctx);
        context.objects.push(d, ptr);
    },
    JS_NewObject: function (ptr, ctx) {
        var context = state.getContext(ctx);
        var res = {};
        context.objects.push(res, ptr);
    },
    JS_NewString: function (ptr, ctx, str) {
        var context = state.getContext(ctx);
        var res = state.stringify(str);
        context.objects.push(res, ptr);
    },
    JS_NewStringLen: function (ptr, ctx, str, len) {
        var context = state.getContext(ctx);
        var val = state.stringify(str, len);
        context.objects.push(val, ptr);
    },
    JSB_NewEmptyString: function (ptr, ctx) {
        var context = state.getContext(ctx);
        var res = "";
        context.objects.push(res, ptr);
    },
    // #endregion
    // #region Bridge
    JSB_NewCFunction: function (ret, ctx, func, atom, length, cproto, magic) {
        var context = state.getContext(ctx);
        function jscFunction() {
            var args = arguments;
            var thisPtr = context.objects.allocate(this);
            var ret = _malloc(16 /* Sizes.JSValue */);
            if (cproto === 0 /* JSCFunctionEnum.JS_CFUNC_generic */) {
                var argc = args.length;
                var argv = context.objects.batchAllocate(Array.from(args));
                state.dynCall('viiiii', func, [ret, ctx, thisPtr, argc, argv]);
            }
            else if (cproto === 9 /* JSCFunctionEnum.JS_CFUNC_setter */) {
                var val = context.objects.allocate(args[0]);
                state.dynCall('viiii', func, [ret, ctx, thisPtr, val]);
            }
            else if (cproto === 8 /* JSCFunctionEnum.JS_CFUNC_getter */) {
                state.dynCall('viii', func, [ret, ctx, thisPtr]);
            }
            else {
                throw new Error('Unknown type of function specified: ' + cproto);
            }
            return context.objects.get(ret);
        }
        ;
        context.objects.push(jscFunction, ret);
    },
    JSB_NewCFunctionMagic: function (ret, ctx, func, atom, length, cproto, magic) {
        var context = state.getContext(ctx);
        function jscFunctionMagic() {
            var args = arguments;
            var thisPtr = context.objects.allocate(this);
            var ret = _malloc(16 /* Sizes.JSValue */);
            if (cproto === 1 /* JSCFunctionEnum.JS_CFUNC_generic_magic */) {
                var argc = args.length;
                var argv = context.objects.batchAllocate(Array.from(args));
                state.dynCall('viiiiii', func, [ret, ctx, thisPtr, argc, argv, magic]);
            }
            else if (cproto === 3 /* JSCFunctionEnum.JS_CFUNC_constructor_magic */) {
                var argc = args.length;
                var argv = context.objects.batchAllocate(Array.from(args));
                state.dynCall('viiiiii', func, [ret, ctx, thisPtr, argc, argv, magic]);
            }
            else if (cproto === 11 /* JSCFunctionEnum.JS_CFUNC_setter_magic */) {
                var val = context.objects.allocate(args[0]);
                state.dynCall('viiiii', func, [ret, ctx, thisPtr, val, magic]);
            }
            else if (cproto === 10 /* JSCFunctionEnum.JS_CFUNC_getter_magic */) {
                state.dynCall('viiii', func, [ret, ctx, thisPtr, magic]);
            }
            else {
                throw new Error('Unknown type of function specified: ' + cproto);
            }
            return context.objects.get(ret);
        }
        ;
        context.objects.push(jscFunctionMagic, ret);
    },
    jsb_new_bridge_object: function (ret, ctx, proto, object_id) {
        var context = state.getContext(ctx);
        var protoVal = context.objects.get(proto);
        var res = Object.create(protoVal);
        context.objects.push(res, ret, 2 /* BridgeObjectType.ObjectRef */, object_id);
    },
    jsb_new_bridge_value: function (ret, ctx, proto, size) {
        var context = state.getContext(ctx);
        var protoVal = context.objects.get(proto);
        var res = Object.create(protoVal);
        res.$$values = new Array(size).fill(0);
        context.objects.push(res, ret);
    },
    JSB_NewBridgeClassObject: function (ret, ctx, new_target, object_id) {
        var context = state.getContext(ctx);
        var res = context.objects.get(new_target);
        context.objects.push(res, ret, 2 /* BridgeObjectType.ObjectRef */, object_id);
    },
    JSB_NewBridgeClassValue: function (ret, ctx, new_target, size) {
        var context = state.getContext(ctx);
        var res = context.objects.get(new_target);
        res.$$values = new Array(size).fill(0);
        context.objects.push(res, ret);
    },
    JSB_GetBridgeClassID: function () {
        // TODO: I have no idea
        return 0;
    },
    jsb_construct_bridge_object: function (ret, ctx, ctor, object_id) {
        var context = state.getContext(ctx);
        var ctorVal = context.objects.get(ctor);
        var res = Reflect.construct(ctorVal, []);
        context.objects.push(res, ret, 2 /* BridgeObjectType.ObjectRef */, object_id);
    },
    jsb_crossbind_constructor: function (ret, ctx, new_target) {
        var context = state.getContext(ctx);
        var target = context.objects.get(new_target);
        // TODO: I have no idea
        var res = function () {
            return new target();
        };
        context.objects.push(res, ret);
    },
    // #endregion
    // #region Errors
    JSB_ThrowError: function (ret, ctx, buf, buf_len) {
        var context = state.getContext(ctx);
        var str = state.stringify(buf, buf_len);
        var err = new Error(str);
        console.error(err);
        context.objects.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowTypeError: function (ret, ctx, msg) {
        var context = state.getContext(ctx);
        var str = 'Type Error';
        var err = new Error(str);
        console.error(err);
        context.objects.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowRangeError: function (ret, ctx, msg) {
        var context = state.getContext(ctx);
        var str = 'Range Error';
        var err = new Error(str);
        console.error(err);
        context.objects.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowInternalError: function (ret, ctx, msg) {
        var context = state.getContext(ctx);
        var str = 'Internal Error';
        var err = new Error(str);
        console.error(err);
        context.objects.push(err, ret);
        // TODO: throw?
    },
    JSB_ThrowReferenceError: function (ret, ctx, msg) {
        var context = state.getContext(ctx);
        var str = 'Reference Error';
        var err = new Error(str);
        console.error(err);
        context.objects.push(err, ret);
        // TODO: throw?
    },
    // #endregion
    // #region Low level Set
    js_strndup: function (ctx, s, n) {
        var str = state.stringify(s, n);
        var buffer = state.bufferify(str)[0];
        return buffer;
    },
    jsb_set_floats: function (ctx, val, n, v0) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = n / 4 /* Sizes.Single */;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        for (var index = 0; index < count; index++) {
            var val_1 = HEAPF32[(v0 >> 2) + index];
            obj.$$values[index] = val_1;
        }
        return true;
    },
    jsb_set_bytes: function (ctx, val, n, v0) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = n / 4 /* Sizes.Single */;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        for (var index = 0; index < count; index++) {
            var val_2 = HEAP32[(v0 >> 2) + index];
            obj.$$values[index] = val_2;
        }
        return true;
    },
    jsb_set_byte_4: function (ctx, val, v0, v1, v2, v3) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 4;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAP32[(v0 >> 2)];
        obj.$$values[1] = HEAP32[(v1 >> 2)];
        obj.$$values[2] = HEAP32[(v2 >> 2)];
        obj.$$values[3] = HEAP32[(v3 >> 2)];
        return true;
    },
    jsb_set_float_2: function (ctx, val, v0, v1) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 2;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAPF32[(v0 >> 2)];
        obj.$$values[1] = HEAPF32[(v1 >> 2)];
        return true;
    },
    jsb_set_float_3: function (ctx, val, v0, v1, v2) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 3;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAPF32[(v0 >> 2)];
        obj.$$values[1] = HEAPF32[(v1 >> 2)];
        obj.$$values[2] = HEAPF32[(v2 >> 2)];
        return true;
    },
    jsb_set_float_4: function (ctx, val, v0, v1, v2, v3) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 4;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAPF32[(v0 >> 2)];
        obj.$$values[1] = HEAPF32[(v1 >> 2)];
        obj.$$values[2] = HEAPF32[(v2 >> 2)];
        obj.$$values[3] = HEAPF32[(v3 >> 2)];
        return true;
    },
    jsb_set_int_1: function (ctx, val, v0) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 1;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAP32[(v0 >> 2)];
        return true;
    },
    jsb_set_int_2: function (ctx, val, v0, v1) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 2;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAP32[(v0 >> 2)];
        obj.$$values[1] = HEAP32[(v1 >> 2)];
        return true;
    },
    jsb_set_int_3: function (ctx, val, v0, v1, v2) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 3;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAP32[(v0 >> 2)];
        obj.$$values[1] = HEAP32[(v1 >> 2)];
        obj.$$values[2] = HEAP32[(v2 >> 2)];
        return true;
    },
    jsb_set_int_4: function (ctx, val, v0, v1, v2, v3) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 4;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        obj.$$values[0] = HEAP32[(v0 >> 2)];
        obj.$$values[1] = HEAP32[(v1 >> 2)];
        obj.$$values[2] = HEAP32[(v2 >> 2)];
        obj.$$values[3] = HEAP32[(v3 >> 2)];
        return true;
    },
    // #endregion
    // #region Low Level Get
    jsb_get_bytes: function (ctx, val, n, v0) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = n / 4 /* Sizes.Single */;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        for (var index = 0; index < count; index++) {
            var val_3 = obj.$$values[index];
            HEAP32[(v0 >> 2) + index] = val_3;
        }
        return true;
    },
    jsb_get_floats: function (ctx, val, n, v0) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = n / 4 /* Sizes.Single */;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        for (var index = 0; index < count; index++) {
            var val_4 = obj.$$values[index];
            HEAPF32[(v0 >> 2) + index] = val_4;
        }
        return true;
    },
    jsb_get_byte_4: function (ctx, val, v0, v1, v2, v3) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 4;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAP32[(v0 >> 2)] = obj.$$values[0];
        HEAP32[(v1 >> 2)] = obj.$$values[1];
        HEAP32[(v2 >> 2)] = obj.$$values[2];
        HEAP32[(v3 >> 2)] = obj.$$values[3];
        return true;
    },
    jsb_get_float_2: function (ctx, val, v0, v1) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 2;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAPF32[(v0 >> 2)] = obj.$$values[0];
        HEAPF32[(v1 >> 2)] = obj.$$values[1];
        return true;
    },
    jsb_get_float_3: function (ctx, val, v0, v1, v2) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 3;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAPF32[(v0 >> 2)] = obj.$$values[0];
        HEAPF32[(v1 >> 2)] = obj.$$values[1];
        HEAPF32[(v2 >> 2)] = obj.$$values[2];
        return true;
    },
    jsb_get_float_4: function (ctx, val, v0, v1, v2, v3) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 4;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAPF32[(v0 >> 2)] = obj.$$values[0];
        HEAPF32[(v1 >> 2)] = obj.$$values[1];
        HEAPF32[(v2 >> 2)] = obj.$$values[2];
        HEAPF32[(v3 >> 2)] = obj.$$values[3];
        return true;
    },
    jsb_get_int_1: function (ctx, val, v0) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 1;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAP32[(v0 >> 2)] = obj.$$values[0];
        return true;
    },
    jsb_get_int_2: function (ctx, val, v0, v1) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 2;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAP32[(v0 >> 2)] = obj.$$values[0];
        HEAP32[(v1 >> 2)] = obj.$$values[1];
        return true;
    },
    jsb_get_int_3: function (ctx, val, v0, v1, v2) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 3;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAP32[(v0 >> 2)] = obj.$$values[0];
        HEAP32[(v1 >> 2)] = obj.$$values[1];
        HEAP32[(v2 >> 2)] = obj.$$values[2];
        return true;
    },
    jsb_get_int_4: function (ctx, val, v0, v1, v2, v3) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var count = 4;
        if (!Array.isArray(obj.$$values) || count >= obj.$$values.length)
            return false;
        HEAP32[(v0 >> 2)] = obj.$$values[0];
        HEAP32[(v1 >> 2)] = obj.$$values[1];
        HEAP32[(v2 >> 2)] = obj.$$values[2];
        HEAP32[(v3 >> 2)] = obj.$$values[3];
        return true;
    },
    // #endregion
    // #region To
    JS_ToFloat64: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPF64[pres >> 3] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToInt32: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAP32[pres >> 2] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToInt64: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            state.HEAP64()[pres >> 3] = BigInt(value);
            return true;
        }
        return false;
    },
    JS_ToBigInt64: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            state.HEAP64()[pres >> 3] = BigInt(value);
            return true;
        }
        return false;
    },
    JS_ToIndex: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            state.HEAPU64()[pres >> 3] = BigInt(value);
            return true;
        }
        return false;
    },
    JSB_ToUint32: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPU32[pres >> 2] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToBool: function (ctx, val) {
        var context = state.getContext(ctx);
        var objVal = context.objects.get(val);
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
    JS_SetModuleLoaderFunc: function (rt, module_normalize, module_loader, opaque) {
        // TODO:
    },
    JS_GetImportMeta: function (ret, ctx, m) {
        // TODO:
        return 0;
    },
    JS_ResolveModule: function (ctx, obj) {
        // TODO:
        return 0;
    },
    JS_AddIntrinsicOperators: function (ctx) {
        console.warn('Operator overloading is not supported in WebGL Backend');
    },
    JS_ExecutePendingJob: function (rt, pctx) {
        // Automatically handled by browsers
        return false;
    },
    JS_IsJobPending: function (rt, pctx) {
        // Automatically handled by browsers
        return false;
    },
    // #endregion
};
autoAddDeps(QuickJSPlugin, '$state');
mergeInto(LibraryManager.library, QuickJSPlugin);
