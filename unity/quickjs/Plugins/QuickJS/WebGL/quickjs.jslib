/**
 * Build with the following command:
 * npx -p typescript tsc
 */
var QuickJSPlugin = {
    $state__postset: 'state.atoms = state.createHeap(true);',
    $state: {
        createHeap(isAtom) {
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
            const res = {
                record,
                lastId: 1,
                push(object, ptr) {
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
                get(id) {
                    var ho = record[id];
                    return ho.value;
                },
                ref(obj, diff, ptr) {
                    var id = HEAP32[obj >> 2];
                    return res.refIndex(id, diff, ptr);
                },
                refIndex(id, diff, ptr) {
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
        stringify(arg) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(arg); },
        bufferify(arg) {
            var returnStr = "bla";
            var bufferSize = lengthBytesUTF8(returnStr) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(returnStr, buffer, bufferSize);
            return [buffer, bufferSize];
        },
        stringifyBuffer(buffer, bufferLength) {
            var buf = new ArrayBuffer(bufferLength);
            var arr = new Uint32Array(buf);
            for (var i = 0; i < bufferLength; i++)
                arr[i] = HEAP32[(buffer >> 2) + i];
            var val = state.stringify(arr);
            return val;
        },
        dynCall() { return (typeof Runtime !== 'undefined' ? Runtime.dynCall : dynCall).apply(typeof Runtime !== 'undefined' ? Runtime : undefined, arguments); },
        runtimes: {},
        contexts: {},
        lastRuntimeId: 1,
        lastContextId: 1,
        getRuntime(rt) {
            var rtId = HEAP32[rt >> 2];
            return state.runtimes[rtId];
        },
        getContext(ctx) {
            var ctxId = HEAP32[ctx >> 2];
            return state.contexts[ctxId];
        },
    },
    JSB_Init() {
        return 10 /* Constants.CS_JSB_VERSION */;
    },
    JSB_NewRuntime(ptr, finalizer) {
        console.log(finalizer);
        var id = state.lastRuntimeId++;
        state.runtimes[id] = {
            id,
            contexts: {},
        };
        HEAP32[ptr >> 2] = id;
    },
    /**
     *
     * @param rtId
     * @returns
     */
    JSB_GetRuntimeOpaque(rtId) {
        return state.getRuntime(rtId).opaque;
    },
    JSB_SetRuntimeOpaque(rtId, opaque) {
        state.getRuntime(rtId).opaque = opaque;
    },
    JS_GetContextOpaque(ctx) {
        return state.getContext(ctx).opaque;
    },
    JS_SetContextOpaque(ctx, opaque) {
        state.getContext(ctx).opaque = opaque;
    },
    JSB_FreeRuntime(rtId) {
        var runtime = state.getRuntime(rtId);
        for (const key in runtime.contexts) {
            if (Object.hasOwnProperty.call(runtime.contexts, key)) {
                state.contexts[key] = undefined;
            }
        }
        state.runtimes[runtime.id] = undefined;
        return 1;
    },
    JS_GetRuntime(ptr, ctxId) {
        var context = state.getContext(ctxId);
        HEAP32[ptr >> 2] = context.runtimeId;
    },
    JS_NewContext(ptr, rtId) {
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
            id,
            runtimeId: rtId,
            iframe,
            window,
            execute,
            evaluate,
            objects,
        };
        runtime.contexts[id] = context;
        state.contexts[id] = context;
        return id;
    },
    JS_FreeContext(ctxId) {
        var context = state.getContext(ctxId);
        var runtime = state.runtimes[context.runtimeId];
        runtime.contexts[context.id] = undefined;
        state.contexts[context.id] = undefined;
    },
    JS_GetGlobalObject(returnValue, ctxId) {
        var context = state.getContext(ctxId);
        if (!context.globalId) {
            context.objects.push(context.window, returnValue);
        }
        else {
            context.objects.refIndex(context.globalId, 1, returnValue);
        }
    },
    JS_Eval(ptr, ctx, input, input_len, filename, eval_flags) {
        var context = state.getContext(ctx);
        var code = state.stringifyBuffer(input, input_len);
        var res = context.evaluate(code);
        context.objects.push(res, ptr);
    },
    JS_IsInstanceOf(ctxId, val, obj) {
        var context = state.getContext(ctxId);
        var valVal = context.objects.get(val);
        var ctorVal = context.objects.get(obj);
        return !!(valVal instanceof ctorVal);
    },
    JS_GetException(ptr, ctx) {
        var context = state.getContext(ctx);
        context.objects.push(context.lastException, ptr);
    },
    JSB_FreeValue(ctx, v) {
        var context = state.getContext(ctx);
        context.objects.ref(v, -1, undefined);
    },
    JSB_FreeValueRT(ctx, v) {
        // TODO:
    },
    JSB_DupValue(ptr, ctx, v) {
        var context = state.getContext(ctx);
        context.objects.ref(v, 1, ptr);
    },
    JS_RunGC(rt) {
        // TODO: handle gracefully
        return 0;
    },
    JS_ComputeMemoryUsage(rt, s) {
        // TODO: https://blog.unity.com/technology/unity-webgl-memory-the-unity-heap
    },
    JS_GetPropertyUint32(ptr, ctxId, val, index) {
        var context = state.getContext(ctxId);
        var obj = context.objects.get(val);
        var res = obj[index];
        context.objects.push(res, ptr);
    },
    JS_GetPropertyInternal(ptr, ctxId, val, prop, receiver, throwRefError) {
        var context = state.getContext(ctxId);
        var valObj = context.objects.get(val);
        var receiverObj = context.objects.get(receiver);
        var propStr = state.atoms.get(prop);
        var res = Reflect.get(valObj, propStr, receiverObj);
        context.objects.push(res, ptr);
    },
    JS_GetPropertyStr(ptr, ctxId, val, prop) {
        var context = state.getContext(ctxId);
        var valObj = context.objects.get(val);
        var propStr = state.stringify(prop);
        var res = Reflect.get(valObj, propStr);
        context.objects.push(res, ptr);
    },
    JS_Invoke(ptr, ctx, this_obj, prop, argc, argv) {
        var context = state.getContext(ctx);
        const arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        const propVal = state.atoms.get(prop);
        const thisVal = context.objects.get(this_obj);
        const func = Reflect.get(thisVal, propVal);
        const args = arr.map(context.objects.get);
        const val = func.apply(thisVal, args);
        context.objects.push(val, ptr);
    },
    JS_Call(ptr, ctx, func_obj, this_obj, argc, argv) {
        var context = state.getContext(ctx);
        const arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        const func = context.objects.get(func_obj);
        const thisVal = context.objects.get(this_obj);
        const args = arr.map(context.objects.get);
        const val = func.apply(thisVal, args);
        context.objects.push(val, ptr);
    },
    JS_CallConstructor(ptr, ctx, func_obj, argc, argv) {
        var context = state.getContext(ctx);
        const arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        const func = context.objects.get(func_obj);
        const args = arr.map(context.objects.get);
        const val = Reflect.construct(func, args);
        context.objects.push(val, ptr);
    },
    JS_SetConstructor(ctx, ctor, proto) {
        var context = state.getContext(ctx);
        var ctorVal = context.objects.get(ctor);
        var protoVal = context.objects.get(proto);
        ctorVal.prototype = protoVal;
    },
    JS_SetPrototype(ctx, obj, proto) {
        var context = state.getContext(ctx);
        var objVal = context.objects.get(obj);
        var protoVal = context.objects.get(proto);
        Reflect.setPrototypeOf(objVal, protoVal);
        return true;
    },
    JS_DefineProperty(ctx, this_obj, prop, val, getter, setter, flags) {
        var context = state.getContext(ctx);
        const thisVal = context.objects.get(this_obj);
        const getterVal = context.objects.get(getter);
        const setterVal = context.objects.get(setter);
        const valVal = context.objects.get(val);
        const propVal = state.atoms.get(prop);
        const configurable = !!(flags & 1 /* JSPropFlags.JS_PROP_CONFIGURABLE */);
        const hasConfigurable = configurable || !!(flags & 256 /* JSPropFlags.JS_PROP_HAS_CONFIGURABLE */);
        const enumerable = !!(flags & 4 /* JSPropFlags.JS_PROP_ENUMERABLE */);
        const hasEnumerable = enumerable || !!(flags & 1024 /* JSPropFlags.JS_PROP_HAS_ENUMERABLE */);
        const writable = !!(flags & 2 /* JSPropFlags.JS_PROP_WRITABLE */);
        const hasWritable = writable || !!(flags & 512 /* JSPropFlags.JS_PROP_HAS_WRITABLE */);
        Object.defineProperty(thisVal, propVal, Object.assign(Object.assign(Object.assign({ get: getterVal, set: setterVal, value: valVal }, hasConfigurable && { configurable }), hasEnumerable && { enumerable }), hasWritable && { writable }));
        return 1;
    },
    JS_DefinePropertyValue(ctx, this_obj, prop, val, flags) {
        var context = state.getContext(ctx);
        const thisVal = context.objects.get(this_obj);
        const valVal = context.objects.get(val);
        const propVal = state.atoms.get(prop);
        const configurable = !!(flags & 1 /* JSPropFlags.JS_PROP_CONFIGURABLE */);
        const hasConfigurable = configurable || !!(flags & 256 /* JSPropFlags.JS_PROP_HAS_CONFIGURABLE */);
        const enumerable = !!(flags & 4 /* JSPropFlags.JS_PROP_ENUMERABLE */);
        const hasEnumerable = enumerable || !!(flags & 1024 /* JSPropFlags.JS_PROP_HAS_ENUMERABLE */);
        const writable = !!(flags & 2 /* JSPropFlags.JS_PROP_WRITABLE */);
        const hasWritable = writable || !!(flags & 512 /* JSPropFlags.JS_PROP_HAS_WRITABLE */);
        Object.defineProperty(thisVal, propVal, Object.assign(Object.assign(Object.assign({ value: valVal }, hasConfigurable && { configurable }), hasEnumerable && { enumerable }), hasWritable && { writable }));
        return 1;
    },
    JS_HasProperty(ctx, this_obj, prop) {
        var context = state.getContext(ctx);
        var thisVal = context.objects.get(this_obj);
        var propVal = state.atoms.get(prop);
        var res = Reflect.has(thisVal, propVal);
        return !!res;
    },
    JS_SetPropertyInternal(ctx, this_obj, prop, val, flags) {
        // TODO: throw error if property exists
        var context = state.getContext(ctx);
        const thisVal = context.objects.get(this_obj);
        const valVal = context.objects.get(val);
        const propVal = state.atoms.get(prop);
        const configurable = !!(flags & 1 /* JSPropFlags.JS_PROP_CONFIGURABLE */);
        const hasConfigurable = configurable || !!(flags & 256 /* JSPropFlags.JS_PROP_HAS_CONFIGURABLE */);
        const enumerable = !!(flags & 4 /* JSPropFlags.JS_PROP_ENUMERABLE */);
        const hasEnumerable = enumerable || !!(flags & 1024 /* JSPropFlags.JS_PROP_HAS_ENUMERABLE */);
        const writable = !!(flags & 2 /* JSPropFlags.JS_PROP_WRITABLE */);
        const hasWritable = writable || !!(flags & 512 /* JSPropFlags.JS_PROP_HAS_WRITABLE */);
        Object.defineProperty(thisVal, propVal, Object.assign(Object.assign(Object.assign({ value: valVal }, hasConfigurable && { configurable }), hasEnumerable && { enumerable }), hasWritable && { writable }));
        return 1;
    },
    JS_SetPropertyUint32(ctx, this_obj, idx, val) {
        // TODO: throw error if property exists
        var context = state.getContext(ctx);
        const thisVal = context.objects.get(this_obj);
        const valVal = context.objects.get(val);
        const propVal = idx;
        Reflect.set(thisVal, propVal, valVal);
        return 1;
    },
    jsb_get_payload_header(ctx, val) {
        // TODO:
        return 0;
    },
    JS_ToCStringLen2(ctx, len, val, cesu8) {
        var context = state.getContext(ctx);
        var str = context.objects.get(val);
        var [buffer, length] = state.bufferify(str);
        HEAP32[(len >> 2)] = length;
        return buffer;
    },
    JS_FreeCString(ctx, ptr) {
        // TODO:
    },
    js_free(ctx, ptr) {
        // TODO:
    },
    JSB_FreePayload(ctx, val) {
        // TODO:
        return 0;
    },
    JS_GetArrayBuffer(ctx, psize, obj) {
        const context = state.getContext(ctx);
        const value = context.objects.get(obj);
        if (value instanceof ArrayBuffer) {
            HEAP32[psize >> 2] = value.byteLength;
            return value;
        }
        return 0;
    },
    // #region Atoms
    JS_NewAtomLen(ptr, ctx, str, len) {
        var context = state.getContext(ctx);
        var buf = new ArrayBuffer(len);
        var arr = new Uint32Array(buf);
        for (var i = 0; i < len; i++)
            arr[i] = HEAP32[(str >> 2) + i];
        var val = state.stringify(arr);
        state.atoms.push(val, ptr);
    },
    JS_AtomToString(ptr, ctx, atom) {
        var context = state.getContext(ctx);
        var str = state.atoms.get(atom);
        context.objects.push(str, ptr);
    },
    JS_FreeAtom(ctx, v) {
        var context = state.getContext(ctx);
        state.atoms.ref(v, -1, undefined);
    },
    JS_DupAtom(ptr, ctx, v) {
        var context = state.getContext(ctx);
        state.atoms.ref(v, 1, ptr);
    },
    JSB_ATOM_constructor(ptr) {
        state.atoms.push('constructor', ptr);
    },
    JSB_ATOM_Error(ptr) {
        state.atoms.push('Error', ptr);
    },
    JSB_ATOM_fileName(ptr) {
        state.atoms.push('fileName', ptr);
    },
    JSB_ATOM_Function(ptr) {
        state.atoms.push('Function', ptr);
    },
    JSB_ATOM_length(ptr) {
        state.atoms.push('length', ptr);
    },
    JSB_ATOM_lineNumber(ptr) {
        state.atoms.push('lineNumber', ptr);
    },
    JSB_ATOM_message(ptr) {
        state.atoms.push('message', ptr);
    },
    JSB_ATOM_name(ptr) {
        state.atoms.push('name', ptr);
    },
    JSB_ATOM_Number(ptr) {
        state.atoms.push('Number', ptr);
    },
    JSB_ATOM_prototype(ptr) {
        state.atoms.push('prototype', ptr);
    },
    JSB_ATOM_Proxy(ptr) {
        state.atoms.push('Proxy', ptr);
    },
    JSB_ATOM_stack(ptr) {
        state.atoms.push('stack', ptr);
    },
    JSB_ATOM_String(ptr) {
        state.atoms.push('String', ptr);
    },
    JSB_ATOM_Object(ptr) {
        state.atoms.push('Object', ptr);
    },
    JSB_ATOM_Operators(ptr) {
        state.atoms.push('Operators', ptr);
    },
    JSB_ATOM_Symbol_operatorSet(ptr) {
        state.atoms.push('operatorSet', ptr);
    },
    // #endregion
    // #region Is
    JS_IsArray(ctx, val) {
        var context = state.getContext(ctx);
        var valVal = context.objects.get(val);
        var res = Array.isArray(valVal);
        return !!res;
    },
    JS_IsConstructor(ctx, val) {
        var context = state.getContext(ctx);
        var obj = context.objects.get(val);
        var res = !!obj.prototype && !!obj.prototype.constructor.name;
        return !!res;
    },
    JS_IsError(ctx, val) {
        var context = state.getContext(ctx);
        var valVal = context.objects.get(val);
        var res = valVal instanceof Error;
        return !!res;
    },
    JS_IsFunction(ctx, val) {
        var context = state.getContext(ctx);
        var valVal = context.objects.get(val);
        var res = typeof valVal === 'function';
        return !!res;
    },
    // #endregion
    JS_ParseJSON(ptr, ctx, buf, buf_len, filename) {
        var context = state.getContext(ctx);
        var str = state.stringifyBuffer(buf, buf_len);
        var res = JSON.parse(str);
        context.objects.push(res, ptr);
    },
    JS_JSONStringify(ptr, ctx, obj, replacer, space) {
        var context = state.getContext(ctx);
        var objVal = context.objects.get(obj);
        var rpVal = context.objects.get(replacer);
        var spVal = context.objects.get(space);
        var res = JSON.stringify(objVal, rpVal, spVal);
        context.objects.push(res, ptr);
    },
    // #region New
    JS_NewArray(ptr, ctx) {
        var context = state.getContext(ctx);
        var res = [];
        context.objects.push(res, ptr);
    },
    JS_NewArrayBufferCopy(ptr, ctx, buf, len) {
        var context = state.getContext(ctx);
        var nptr = _malloc(len);
        var res = new Uint8Array(HEAPU8.buffer, nptr, len);
        res.set(new Uint8Array(buf));
        context.objects.push(res, ptr);
    },
    JSB_NewFloat64(ptr, ctx, d) {
        var context = state.getContext(ctx);
        context.objects.push(d, ptr);
    },
    JSB_NewInt64(ptr, ctx, d) {
        var context = state.getContext(ctx);
        context.objects.push(d, ptr);
    },
    JS_NewObject(ptr, ctx) {
        var context = state.getContext(ctx);
        var res = {};
        context.objects.push(res, ptr);
    },
    JS_NewString(ptr, ctx, str) {
        var context = state.getContext(ctx);
        var res = state.stringify(str);
        context.objects.push(res, ptr);
    },
    JS_NewStringLen(ptr, ctx, str, len) {
        var context = state.getContext(ctx);
        var val = state.stringifyBuffer(str, len);
        context.objects.push(val, ptr);
    },
    JSB_NewEmptyString(ptr, ctx) {
        var context = state.getContext(ctx);
        var res = "";
        context.objects.push(res, ptr);
    },
    // #endregion
    // #region Bridge
    JSB_NewCFunction(ctx, func, atom, length, cproto, magic) {
        // TODO: Priority
        return 0;
    },
    JSB_NewCFunctionMagic(ctx, func, atom, length, cproto, magic) {
        // TODO: Priority
        return 0;
    },
    jsb_new_bridge_object(ctx, proto, object_id) {
        // TODO: Priority
        return 0;
    },
    jsb_new_bridge_value(ctx, proto, size) {
        // TODO: Priority
        return 0;
    },
    JSB_NewBridgeClassObject(ctx, new_target, object_id) {
        // TODO: Priority
        return 0;
    },
    JSB_NewBridgeClassValue(ctx, new_target, size) {
        // TODO: Priority
        return 0;
    },
    JSB_GetBridgeClassID() {
        // TODO: priority
        return 0;
    },
    jsb_construct_bridge_object(ctx, proto, object_id) {
        // TODO: priority
        return 0;
    },
    jsb_crossbind_constructor(ctx, new_target) {
        // TODO: I have no idea
        return 0;
    },
    // #endregion
    // #region Errors
    JSB_ThrowError(ctx, buf, buf_len) {
        // TODO:
        var str = state.stringifyBuffer(buf, buf_len);
        console.error(str);
        return -1;
    },
    JSB_ThrowTypeError(ctx, msg) {
        // TODO:
        console.error('Type error');
        return -1;
    },
    JSB_ThrowRangeError(ctx, msg) {
        // TODO:
        console.error('Range error');
        return -1;
    },
    JSB_ThrowInternalError(ctx, msg) {
        // TODO:
        console.error('Internal error');
        return -1;
    },
    JSB_ThrowReferenceError(ctx, msg) {
        // TODO:
        console.error('Reference error');
        return -1;
    },
    // #endregion
    // #region Low level Set
    js_strndup(ctx, s, n) {
        var str = state.stringifyBuffer(s, n);
        var [buffer] = state.bufferify(str);
        return buffer;
    },
    jsb_get_bytes(ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_get_floats(ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_set_byte_4(ctx, val, v0, v1, v2, v3) {
        // TODO:
        return 0;
    },
    jsb_set_bytes(ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_set_float_2(ctx, val, v0, v1) {
        // TODO:
        return 0;
    },
    jsb_set_float_3(ctx, val, v0, v1, v2) {
        // TODO:
        return 0;
    },
    jsb_set_float_4(ctx, val, v0, v1, v2, v3) {
        // TODO:
        return 0;
    },
    jsb_set_floats(ctx, val, n, v0) {
        // TODO:
        return 0;
    },
    jsb_set_int_1(ctx, val, v0) {
        // TODO:
        return 0;
    },
    jsb_set_int_2(ctx, val, v0, v1) {
        // TODO:
        return 0;
    },
    jsb_set_int_3(ctx, val, v0, v1, v2) {
        // TODO:
        return 0;
    },
    jsb_set_int_4(ctx, val, v0, v1, v2, v3) {
        // TODO:
        return 0;
    },
    // #endregion
    // #region Low Level Get
    jsb_get_byte_4(ctx, val, v0, v1, v2, v3) {
        return false;
    },
    jsb_get_float_2(ctx, val, v0, v1) {
        return false;
    },
    jsb_get_float_3(ctx, val, v0, v1, v2) {
        return false;
    },
    jsb_get_float_4(ctx, val, v0, v1, v2, v3) {
        return false;
    },
    jsb_get_int_1(ctx, val, v0) {
        return false;
    },
    jsb_get_int_2(ctx, val, v0, v1) {
        return false;
    },
    jsb_get_int_3(ctx, val, v0, v1, v2) {
        return false;
    },
    jsb_get_int_4(ctx, val, v0, v1, v2, v3) {
        return false;
    },
    // #endregion
    // #region To
    JS_ToBigInt64(ctx, pres, val) {
        const context = state.getContext(ctx);
        const value = context.objects.get(val);
        if (typeof value === 'number') {
            HEAP32[(pres >> 2)] = 0;
            HEAP32[(pres >> 2) + 1] = value;
            return true;
        }
        if (typeof value === 'bigint') {
            var bg = (BigInt(2) ** BigInt(32));
            HEAP32[(pres >> 2)] = Number(value / bg);
            HEAP32[(pres >> 2) + 1] = Number(value % bg);
            return true;
        }
        return false;
    },
    JS_ToFloat64(ctx, pres, val) {
        const context = state.getContext(ctx);
        const value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPF64[pres >> 3] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToIndex(ctx, pres, val) {
        const context = state.getContext(ctx);
        const value = context.objects.get(val);
        if (typeof value === 'number') {
            HEAPU32[(pres >> 2)] = 0;
            HEAPU32[(pres >> 2) + 1] = value;
            return true;
        }
        if (typeof value === 'bigint') {
            var bg = (BigInt(2) ** BigInt(32));
            HEAPU32[(pres >> 2)] = Number(value / bg);
            HEAPU32[(pres >> 2) + 1] = Number(value % bg);
            return true;
        }
        return false;
    },
    JS_ToInt32(ctx, pres, val) {
        const context = state.getContext(ctx);
        const value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAP32[pres >> 2] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToInt64(ctx, pres, val) {
        const context = state.getContext(ctx);
        const value = context.objects.get(val);
        if (typeof value === 'number') {
            HEAP32[(pres >> 2)] = 0;
            HEAP32[(pres >> 2) + 1] = value;
            return true;
        }
        if (typeof value === 'bigint') {
            var bg = (BigInt(2) ** BigInt(32));
            HEAP32[(pres >> 2)] = Number(value / bg);
            HEAP32[(pres >> 2) + 1] = Number(value % bg);
            return true;
        }
        return false;
    },
    JSB_ToUint32(ctx, pres, val) {
        const context = state.getContext(ctx);
        const value = context.objects.get(val);
        if (typeof value === 'number' || typeof value === 'bigint') {
            HEAPU32[pres >> 2] = Number(value);
            return true;
        }
        return false;
    },
    JS_ToBool(ctx, val) {
        var context = state.getContext(ctx);
        var objVal = context.objects.get(val);
        return !!objVal;
    },
    // #endregion
    // #region Bytecode
    JS_ReadObject(ptr, ctx, buf, buf_len, flags) {
        console.warn('Bytecode is not supported in WebGL Backend');
    },
    JS_WriteObject(ctx, psize, obj, flags) {
        console.warn('Bytecode is not supported in WebGL Backend');
        return 0;
    },
    JS_EvalFunction(ptr, ctx, fun_obj) {
        console.warn('Bytecode is not supported in WebGL Backend');
    },
    // #endregion
    // #region Misc features
    JS_NewPromiseCapability(ptr, ctx, resolving_funcs) {
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
    JS_GetImportMeta(ctx, m) {
        // TODO:
        return 0;
    },
    JS_ResolveModule(ctx, obj) {
        // TODO:
        return 0;
    },
    JS_AddIntrinsicOperators(ctx) {
        console.warn('Operator overloading is not supported in WebGL Backend');
    },
    JS_ExecutePendingJob(rt, pctx) {
        // Automatically handled by browsers
        return false;
    },
    JS_IsJobPending(rt, pctx) {
        // Automatically handled by browsers
        return false;
    },
    // #endregion
};
autoAddDeps(QuickJSPlugin, '$state');
mergeInto(LibraryManager.library, QuickJSPlugin);
