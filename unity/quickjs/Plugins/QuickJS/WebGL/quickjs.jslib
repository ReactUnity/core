/**
 * Build with the following command:
 * npx -p typescript tsc
 */
var QuickJSPlugin = {
    $state__postset: 'state.atoms = state.createHeap(true);',
    $state: {
        createHeap: function (isAtom) {
            var getTag = function (object) {
                if (object === undefined)
                    return 3 /* Tags.JS_TAG_UNDEFINED */;
                if (object === null)
                    return 2 /* Tags.JS_TAG_NULL */;
                if (typeof object === 'number')
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
                    return -9 /* Tags.JS_TAG_BIG_FLOAT */;
                if (object instanceof Error)
                    return 6 /* Tags.JS_TAG_EXCEPTION */;
                return -1 /* Tags.JS_TAG_OBJECT */;
            };
            var record = {};
            var res = {
                record: record,
                lastId: 1,
                push: function (object, ptr) {
                    if (typeof object === 'undefined')
                        return 0;
                    var id = res.lastId++;
                    record[id] = {
                        refCount: 0,
                        value: object,
                        tag: getTag(object),
                    };
                    res.refIndex(id, 1, ptr);
                    return id;
                },
                get: function (id) {
                    var ho = record[id];
                    return ho.value;
                },
                ref: function (obj, diff, ptr) {
                    var id = HEAP32[obj >> 2];
                    return res.refIndex(id, diff, ptr);
                },
                refIndex: function (id, diff, ptr) {
                    var ho = record[id];
                    ho.refCount += diff;
                    console.assert(ho.refCount >= 0);
                    if (ho.refCount <= 0) {
                        record[id] = undefined;
                    }
                    if (typeof ptr === 'number' && ptr > 0) {
                        HEAP32[ptr >> 2] = id;
                        if (!isAtom)
                            HEAP32[ptr >> 2 + 2] = ho.tag;
                    }
                    return ho.refCount;
                },
            };
            return res;
        },
        stringify: function (arg) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(arg); },
        bufferify: function (arg) {
            var bufferSize = lengthBytesUTF8(arg) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(arg, buffer, bufferSize);
            return [buffer, bufferSize];
        },
        stringifyBuffer: function (buffer, bufferLength) {
            var buf = new ArrayBuffer(bufferLength);
            var arr = new Uint32Array(buf);
            for (var i = 0; i < bufferLength; i++)
                arr[i] = HEAP32[(buffer >> 2) + i];
            var val = state.stringify(arr);
            return val;
        },
        dynCall: function () { return (typeof Runtime !== 'undefined' ? Runtime.dynCall : dynCall).apply(typeof Runtime !== 'undefined' ? Runtime : undefined, arguments); },
        runtimes: {},
        contexts: {},
        lastRuntimeId: 1,
        lastContextId: 1,
        getRuntime: function (rt) {
            var rtId = HEAP32[rt >> 2];
            return state.runtimes[rtId];
        },
        getContext: function (ctx) {
            var ctxId = HEAP32[ctx >> 2];
            return state.contexts[ctxId];
        },
    },
    JSB_Init: function () {
        return 10 /* Constants.CS_JSB_VERSION */;
    },
    JSB_NewRuntime: function (ptr, finalizer) {
        console.log(finalizer);
        var id = state.lastRuntimeId++;
        state.runtimes[id] = {
            id: id,
            contexts: {},
        };
        HEAP32[ptr >> 2] = id;
    },
    /**
     *
     * @param rtId
     * @returns
     */
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
        return 1;
    },
    JS_GetRuntime: function (ptr, ctxId) {
        var context = state.getContext(ctxId);
        HEAP32[ptr >> 2] = context.runtimeId;
    },
    JS_NewContext: function (ptr, rtId) {
        var id = state.lastContextId++;
        var runtime = state.getRuntime(rtId);
        var iframe = document.createElement('iframe');
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
        var context = state.getContext(ctx);
        var code = state.stringifyBuffer(input, input_len);
        var res = context.evaluate(code);
        context.objects.push(res, ptr);
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
    JSB_FreeValueRT: function (ctx, v) {
        // TODO:
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
        var arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        var propVal = state.atoms.get(prop);
        var thisVal = context.objects.get(this_obj);
        var func = Reflect.get(thisVal, propVal);
        var args = arr.map(context.objects.get);
        var val = func.apply(thisVal, args);
        context.objects.push(val, ptr);
    },
    JS_Call: function (ptr, ctx, func_obj, this_obj, argc, argv) {
        var context = state.getContext(ctx);
        var arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        var func = context.objects.get(func_obj);
        var thisVal = context.objects.get(this_obj);
        var args = arr.map(context.objects.get);
        var val = func.apply(thisVal, args);
        context.objects.push(val, ptr);
    },
    JS_CallConstructor: function (ptr, ctx, func_obj, argc, argv) {
        var context = state.getContext(ctx);
        var arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        var func = context.objects.get(func_obj);
        var args = arr.map(context.objects.get);
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
        var opts = {
            get: getterVal,
            set: setterVal,
            value: valVal,
        };
        if (hasConfigurable)
            opts.configurable = configurable;
        if (hasEnumerable)
            opts.enumerable = enumerable;
        if (hasWritable)
            opts.writable = writable;
        Object.defineProperty(thisVal, propVal, opts);
        return 1;
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
        return 1;
    },
    JS_HasProperty: function (ctx, this_obj, prop) {
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var propVal = state.atoms.get(prop);
        var res = Reflect.has(thisVal, propVal);
        return !!res;
    },
    JS_SetPropertyInternal: function (ctx, this_obj, prop, val, flags) {
        // TODO: throw error if property exists
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
        return 1;
    },
    JS_SetPropertyUint32: function (ctx, this_obj, idx, val) {
        // TODO: throw error if property exists
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = idx;
        Reflect.set(thisVal, propVal, valVal);
        return 1;
    },
    jsb_get_payload_header: function (ctx, val) {
        // TODO:
        return 0;
    },
    JS_ToCStringLen2: function (ctx, len, val, cesu8) {
        var context = state.getContext(ctx);
        var str = context.objects.get(val);
        var _a = state.bufferify(str), buffer = _a[0], length = _a[1];
        HEAP32[(len >> 2)] = length;
        return buffer;
    },
    JS_FreeCString: function (ctx, ptr) {
        // TODO:
    },
    js_free: function (ctx, ptr) {
        // TODO:
    },
    JSB_FreePayload: function (ctx, val) {
        // TODO:
        return 0;
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
    JS_NewAtomLen: function (ptr, ctx, str, len) {
        var context = state.getContext(ctx);
        var buf = new ArrayBuffer(len);
        var arr = new Uint32Array(buf);
        for (var i = 0; i < len; i++)
            arr[i] = HEAP32[(str >> 2) + i];
        var val = state.stringify(arr);
        state.atoms.push(val, ptr);
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
    JS_DupAtom: function (ptr, ctx, v) {
        var context = state.getContext(ctx);
        state.atoms.ref(v, 1, ptr);
    },
    JSB_ATOM_constructor: function (ptr) {
        state.atoms.push('constructor', ptr);
    },
    JSB_ATOM_Error: function (ptr) {
        state.atoms.push('Error', ptr);
    },
    JSB_ATOM_fileName: function (ptr) {
        state.atoms.push('fileName', ptr);
    },
    JSB_ATOM_Function: function (ptr) {
        state.atoms.push('Function', ptr);
    },
    JSB_ATOM_length: function (ptr) {
        state.atoms.push('length', ptr);
    },
    JSB_ATOM_lineNumber: function (ptr) {
        state.atoms.push('lineNumber', ptr);
    },
    JSB_ATOM_message: function (ptr) {
        state.atoms.push('message', ptr);
    },
    JSB_ATOM_name: function (ptr) {
        state.atoms.push('name', ptr);
    },
    JSB_ATOM_Number: function (ptr) {
        state.atoms.push('Number', ptr);
    },
    JSB_ATOM_prototype: function (ptr) {
        state.atoms.push('prototype', ptr);
    },
    JSB_ATOM_Proxy: function (ptr) {
        state.atoms.push('Proxy', ptr);
    },
    JSB_ATOM_stack: function (ptr) {
        state.atoms.push('stack', ptr);
    },
    JSB_ATOM_String: function (ptr) {
        state.atoms.push('String', ptr);
    },
    JSB_ATOM_Object: function (ptr) {
        state.atoms.push('Object', ptr);
    },
    JSB_ATOM_Operators: function (ptr) {
        state.atoms.push('Operators', ptr);
    },
    JSB_ATOM_Symbol_operatorSet: function (ptr) {
        state.atoms.push('operatorSet', ptr);
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
        var str = state.stringifyBuffer(buf, buf_len);
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
        res.set(new Uint8Array(buf));
        context.objects.push(res, ptr);
    },
    JSB_NewFloat64: function (ptr, ctx, d) {
        var context = state.getContext(ctx);
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
        var val = state.stringifyBuffer(str, len);
        context.objects.push(val, ptr);
    },
    JSB_NewEmptyString: function (ptr, ctx) {
        var context = state.getContext(ctx);
        var res = "";
        context.objects.push(res, ptr);
    },
    // #endregion
    // #region Bridge
    JSB_NewCFunction: function (ctx, func, atom, length, cproto, magic) {
        // TODO: Priority
        return 0;
    },
    JSB_NewCFunctionMagic: function (ctx, func, atom, length, cproto, magic) {
        // TODO: Priority
        return 0;
    },
    jsb_new_bridge_object: function (ctx, proto, object_id) {
        // TODO: Priority
        return 0;
    },
    jsb_new_bridge_value: function (ctx, proto, size) {
        // TODO: Priority
        return 0;
    },
    JSB_NewBridgeClassObject: function (ctx, new_target, object_id) {
        // TODO: Priority
        return 0;
    },
    JSB_NewBridgeClassValue: function (ctx, new_target, size) {
        // TODO: Priority
        return 0;
    },
    JSB_GetBridgeClassID: function () {
        // TODO: priority
        return 0;
    },
    jsb_construct_bridge_object: function (ctx, proto, object_id) {
        // TODO: priority
        return 0;
    },
    jsb_crossbind_constructor: function (ctx, new_target) {
        // TODO: I have no idea
        return 0;
    },
    // #endregion
    // #region Errors
    JSB_ThrowError: function (ctx, buf, buf_len) {
        // TODO:
        var str = state.stringifyBuffer(buf, buf_len);
        console.error(str);
        return -1;
    },
    JSB_ThrowTypeError: function (ctx, msg) {
        // TODO:
        console.error('Type error');
        return -1;
    },
    JSB_ThrowRangeError: function (ctx, msg) {
        // TODO:
        console.error('Range error');
        return -1;
    },
    JSB_ThrowInternalError: function (ctx, msg) {
        // TODO:
        console.error('Internal error');
        return -1;
    },
    JSB_ThrowReferenceError: function (ctx, msg) {
        // TODO:
        console.error('Reference error');
        return -1;
    },
    // #endregion
    // #region Low level Set
    js_strndup: function (ctx, s, n) {
        var str = state.stringifyBuffer(s, n);
        var buffer = state.bufferify(str)[0];
        return buffer;
    },
    jsb_get_bytes: function (ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_get_floats: function (ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_set_byte_4: function (ctx, val, v0, v1, v2, v3) {
        // TODO:
        return 0;
    },
    jsb_set_bytes: function (ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_set_float_2: function (ctx, val, v0, v1) {
        // TODO:
        return 0;
    },
    jsb_set_float_3: function (ctx, val, v0, v1, v2) {
        // TODO:
        return 0;
    },
    jsb_set_float_4: function (ctx, val, v0, v1, v2, v3) {
        // TODO:
        return 0;
    },
    jsb_set_floats: function (ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_set_int_1: function (ctx, val, v0) {
        // TODO:
        return 0;
    },
    jsb_set_int_2: function (ctx, val, v0, v1) {
        // TODO:
        return 0;
    },
    jsb_set_int_3: function (ctx, val, v0, v1, v2) {
        // TODO:
        return 0;
    },
    jsb_set_int_4: function (ctx, val, v0, v1, v2, v3) {
        // TODO:
        return 0;
    },
    // #endregion
    // #region Low Level Get
    jsb_get_byte_4: function (ctx, val, v0, v1, v2, v3) {
        return false;
    },
    jsb_get_float_2: function (ctx, val, v0, v1) {
        return false;
    },
    jsb_get_float_3: function (ctx, val, v0, v1, v2) {
        return false;
    },
    jsb_get_float_4: function (ctx, val, v0, v1, v2, v3) {
        return false;
    },
    jsb_get_int_1: function (ctx, val, v0) {
        return false;
    },
    jsb_get_int_2: function (ctx, val, v0, v1) {
        return false;
    },
    jsb_get_int_3: function (ctx, val, v0, v1, v2) {
        return false;
    },
    jsb_get_int_4: function (ctx, val, v0, v1, v2, v3) {
        return false;
    },
    // #endregion
    // #region To
    JS_ToBigInt64: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number') {
            HEAP32[(pres >> 2)] = 0;
            HEAP32[(pres >> 2) + 1] = value;
            return true;
        }
        if (typeof value === 'bigint') {
            var bg = BigInt('0x100000000000000000000000000000000');
            HEAP32[(pres >> 2)] = Number(value / bg);
            HEAP32[(pres >> 2) + 1] = Number(value % bg);
            return true;
        }
        return false;
    },
    JS_ToFloat64: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPF64[pres >> 3] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToIndex: function (ctx, pres, val) {
        var context = state.getContext(ctx);
        var value = context.objects.get(val);
        if (typeof value === 'number') {
            HEAPU32[(pres >> 2)] = 0;
            HEAPU32[(pres >> 2) + 1] = value;
            return true;
        }
        if (typeof value === 'bigint') {
            var bg = BigInt('0x100000000000000000000000000000000');
            HEAPU32[(pres >> 2)] = Number(value / bg);
            HEAPU32[(pres >> 2) + 1] = Number(value % bg);
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
        if (typeof value === 'number') {
            HEAP32[(pres >> 2)] = 0;
            HEAP32[(pres >> 2) + 1] = value;
            return true;
        }
        if (typeof value === 'bigint') {
            var bg = BigInt('0x100000000000000000000000000000000');
            HEAP32[(pres >> 2)] = Number(value / bg);
            HEAP32[(pres >> 2) + 1] = Number(value % bg);
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
    JS_NewPromiseCapability: function (ptr, ctx, resolving_funcs) {
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
    JS_GetImportMeta: function (ctx, m) {
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
