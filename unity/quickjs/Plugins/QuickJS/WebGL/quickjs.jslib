/**
 * Build: npx -p typescript tsc
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function createHeap() {
    var push = function (object) {
        if (typeof object === 'undefined')
            return 0;
        var id = res.lastId++;
        record[id] = {
            refCount: 1,
            value: object,
        };
        return id;
    };
    var record = {};
    var res = {
        record: record,
        lastId: 1,
        push: push,
        get: function (id) {
            var ho = record[id];
            return ho.value;
        },
        ref: function (id, diff) {
            var ho = record[id];
            ho.refCount += diff;
            console.assert(ho.refCount >= 0);
            if (ho.refCount <= 0) {
                record[id] = undefined;
            }
            return ho.refCount;
        },
    };
    return res;
}
var JSPropFlags;
(function (JSPropFlags) {
    /* flags for object properties */
    JSPropFlags[JSPropFlags["JS_PROP_CONFIGURABLE"] = 1] = "JS_PROP_CONFIGURABLE";
    JSPropFlags[JSPropFlags["JS_PROP_WRITABLE"] = 2] = "JS_PROP_WRITABLE";
    JSPropFlags[JSPropFlags["JS_PROP_ENUMERABLE"] = 4] = "JS_PROP_ENUMERABLE";
    JSPropFlags[JSPropFlags["JS_PROP_C_W_E"] = 7] = "JS_PROP_C_W_E";
    JSPropFlags[JSPropFlags["JS_PROP_LENGTH"] = 8] = "JS_PROP_LENGTH"; /* used internally in Arrays */
    JSPropFlags[JSPropFlags["JS_PROP_TMASK"] = 48] = "JS_PROP_TMASK"; /* mask for NORMAL, GETSET, VARREF, AUTOINIT */
    JSPropFlags[JSPropFlags["JS_PROP_NORMAL"] = 0] = "JS_PROP_NORMAL";
    JSPropFlags[JSPropFlags["JS_PROP_GETSET"] = 16] = "JS_PROP_GETSET";
    JSPropFlags[JSPropFlags["JS_PROP_VARREF"] = 32] = "JS_PROP_VARREF"; /* used internally */
    JSPropFlags[JSPropFlags["JS_PROP_AUTOINIT"] = 48] = "JS_PROP_AUTOINIT"; /* used internally */
    /* flags for JS_DefineProperty */
    JSPropFlags[JSPropFlags["JS_PROP_HAS_SHIFT"] = 8] = "JS_PROP_HAS_SHIFT";
    JSPropFlags[JSPropFlags["JS_PROP_HAS_CONFIGURABLE"] = 256] = "JS_PROP_HAS_CONFIGURABLE";
    JSPropFlags[JSPropFlags["JS_PROP_HAS_WRITABLE"] = 512] = "JS_PROP_HAS_WRITABLE";
    JSPropFlags[JSPropFlags["JS_PROP_HAS_ENUMERABLE"] = 1024] = "JS_PROP_HAS_ENUMERABLE";
    JSPropFlags[JSPropFlags["JS_PROP_HAS_GET"] = 2048] = "JS_PROP_HAS_GET";
    JSPropFlags[JSPropFlags["JS_PROP_HAS_SET"] = 4096] = "JS_PROP_HAS_SET";
    JSPropFlags[JSPropFlags["JS_PROP_HAS_VALUE"] = 8192] = "JS_PROP_HAS_VALUE";
    /* throw an exception if false would be returned
       (JS_DefineProperty/JS_SetProperty) */
    JSPropFlags[JSPropFlags["JS_PROP_THROW"] = 16384] = "JS_PROP_THROW";
    /* throw an exception if false would be returned in strict mode
       (JS_SetProperty) */
    JSPropFlags[JSPropFlags["JS_PROP_THROW_STRICT"] = 32768] = "JS_PROP_THROW_STRICT";
    JSPropFlags[JSPropFlags["JS_PROP_NO_ADD"] = 65536] = "JS_PROP_NO_ADD"; /* internal use */
    JSPropFlags[JSPropFlags["JS_PROP_NO_EXOTIC"] = 131072] = "JS_PROP_NO_EXOTIC"; /* internal use */
    // custom values
    JSPropFlags[JSPropFlags["CONST_VALUE"] = 8196] = "CONST_VALUE";
    JSPropFlags[JSPropFlags["DEFAULT"] = 5] = "DEFAULT";
    JSPropFlags[JSPropFlags["NONE"] = 0] = "NONE";
})(JSPropFlags || (JSPropFlags = {}));
var Constants = {
    VERSION: 0x010704,
    CS_JSB_VERSION: 0xa,
    JS_TAG_FIRST: -11,
    JS_TAG_BIG_DECIMAL: -11,
    JS_TAG_BIG_INT: -10,
    JS_TAG_BIG_FLOAT: -9,
    JS_TAG_SYMBOL: -8,
    JS_TAG_STRING: -7,
    JS_TAG_MODULE: -3,
    JS_TAG_FUNCTION_BYTECODE: -2,
    JS_TAG_OBJECT: -1,
    JS_TAG_INT: 0,
    JS_TAG_BOOL: 1,
    JS_TAG_NULL: 2,
    JS_TAG_UNDEFINED: 3,
    JS_TAG_EXCEPTION: 6,
    JS_TAG_FLOAT64: 7,
    JS_WRITE_OBJ_BYTECODE: 1 << 0,
    JS_WRITE_OBJ_BSWAP: 1 << 1,
    JS_WRITE_OBJ_SAB: 1 << 2,
    JS_WRITE_OBJ_REFERENCE: 1 << 3,
    JS_READ_OBJ_BYTECODE: 1 << 0,
    JS_READ_OBJ_ROM_DATA: 1 << 1,
    JS_READ_OBJ_SAB: 1 << 2,
    JS_READ_OBJ_REFERENCE: 1 << 3, /* allow object references */
};
function stringifyBuffer(buffer, bufferLength) {
    var buf = new ArrayBuffer(bufferLength);
    var arr = new Uint32Array(buf);
    for (var i = 0; i < bufferLength; i++)
        arr[i] = HEAP32[(buffer >> 2) + i];
    var val = state.stringify(arr);
    return val;
}
var QuickJSPlugin = {
    $state: {
        stringify: function (arg) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(arg); },
        bufferify: function (arg) {
            var returnStr = "bla";
            var bufferSize = lengthBytesUTF8(returnStr) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(returnStr, buffer, bufferSize);
            return [buffer, bufferSize];
        },
        dynCall: function () { return (typeof Runtime !== 'undefined' ? Runtime.dynCall : dynCall).apply(typeof Runtime !== 'undefined' ? Runtime : undefined, arguments); },
        runtimes: {},
        contexts: {},
        atoms: createHeap(),
        lastRuntimeId: 1,
        lastContextId: 1,
    },
    JSB_Init: function () {
        return Constants.CS_JSB_VERSION;
    },
    JSB_NewRuntime: function (finalizer) {
        console.log(finalizer);
        var id = state.lastRuntimeId++;
        state.runtimes[id] = {
            id: id,
            contexts: {},
        };
        return id;
    },
    /**
     *
     * @param rtId
     * @returns
     */
    JSB_GetRuntimeOpaque: function (rtId) {
        return state.runtimes[rtId].opaque;
    },
    JSB_SetRuntimeOpaque: function (rtId, opaque) {
        state.runtimes[rtId].opaque = opaque;
    },
    JS_GetContextOpaque: function (ctx) {
        return state.contexts[ctx].opaque;
    },
    JS_SetContextOpaque: function (ctx, opaque) {
        state.contexts[ctx].opaque = opaque;
    },
    JSB_FreeRuntime: function (rtId) {
        var runtime = state.runtimes[rtId];
        for (var key in runtime.contexts) {
            if (Object.hasOwnProperty.call(runtime.contexts, key)) {
                state.contexts[key] = undefined;
            }
        }
        state.runtimes[rtId] = undefined;
        return 1;
    },
    JS_GetRuntime: function (ctxId) {
        var context = state.contexts[ctxId];
        return context.runtimeId;
    },
    JS_NewContext: function (rtId) {
        var id = state.lastContextId++;
        var runtime = state.runtimes[rtId];
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
        var objects = createHeap();
        var globalId = objects.push(window);
        var context = {
            id: id,
            runtimeId: rtId,
            iframe: iframe,
            window: window,
            execute: execute,
            evaluate: evaluate,
            globalId: globalId,
            objects: objects,
        };
        runtime.contexts[id] = context;
        state.contexts[id] = context;
        return id;
    },
    JS_FreeContext: function (ctxId) {
        var context = state.contexts[ctxId];
        var runtime = state.runtimes[context.runtimeId];
        runtime.contexts[ctxId] = undefined;
        state.contexts[ctxId] = undefined;
    },
    JS_GetGlobalObject: function (ctxId) {
        var context = state.contexts[ctxId];
        context.objects.ref(context.globalId, 1);
        return context.globalId;
    },
    JS_IsInstanceOf: function (ctxId, val, obj) {
        var context = state.contexts[ctxId];
        return (context.objects.get(val) instanceof context.objects.get(obj)) ? 1 : 0;
    },
    JS_NewPromiseCapability: function () {
        // TODO
        return 0;
    },
    JS_GetPropertyUint32: function (ctxId, val, index) {
        var context = state.contexts[ctxId];
        var obj = context.objects.get(val);
        var res = obj[index];
        return context.objects.push(res);
    },
    JS_GetPropertyInternal: function (ctxId, val, prop, receiver, throwRefError) {
        var context = state.contexts[ctxId];
        var valObj = context.objects.get(val);
        var receiverObj = context.objects.get(receiver);
        // TODO: get atom
        var res = Reflect.get(valObj, prop, receiverObj);
        return context.objects.get(res);
    },
    JS_GetPropertyStr: function (ctxId, val, prop) {
        var context = state.contexts[ctxId];
        var valObj = context.objects.get(val);
        var propStr = state.stringify(prop);
        var res = Reflect.get(valObj, propStr);
        return context.objects.push(res);
    },
    JSB_FreeValue: function (ctx, v) {
        var context = state.contexts[ctx];
        context.objects.ref(v, -1);
    },
    JSB_FreeValueRT: function (ctx, v) {
        // TODO:
    },
    JSB_DupValue: function (ctx, v) {
        var context = state.contexts[ctx];
        context.objects.ref(v, 1);
        return v;
    },
    JS_AddIntrinsicOperators: function (ctx) {
        // TODO: handle gracefully
    },
    JS_Invoke: function (ctx, this_obj, prop, argc, argv) {
        var context = state.contexts[ctx];
        var arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        var propVal = state.atoms.get(prop);
        var thisVal = context.objects.get(this_obj);
        var func = Reflect.get(thisVal, propVal);
        var args = arr.map(context.objects.get);
        var val = func.apply(thisVal, args);
        return state.atoms.push(val);
    },
    JS_Call: function (ctx, func_obj, this_obj, argc, argv) {
        var context = state.contexts[ctx];
        var arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        var func = context.objects.get(func_obj);
        var thisVal = context.objects.get(this_obj);
        var args = arr.map(context.objects.get);
        var val = func.apply(thisVal, args);
        return state.atoms.push(val);
    },
    JS_CallConstructor: function (ctx, func_obj, argc, argv) {
        var context = state.contexts[ctx];
        var arr = new Array(argc);
        for (var i = 0; i < argc; i++)
            arr[i] = HEAP32[(argv >> 2) + i];
        var func = context.objects.get(func_obj);
        var args = arr.map(context.objects.get);
        var val = Reflect.construct(func, args);
        return state.atoms.push(val);
    },
    JS_ComputeMemoryUsage: function (rt, s) {
        // TODO
    },
    JS_DefineProperty: function (ctx, this_obj, prop, val, getter, setter, flags) {
        var context = state.contexts[ctx];
        var thisVal = context.objects.get(this_obj);
        var getterVal = context.objects.get(getter);
        var setterVal = context.objects.get(setter);
        var valVal = context.objects.get(val);
        var propVal = state.atoms.get(prop);
        var configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
        var hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
        var enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
        var hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
        var writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
        var hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);
        Object.defineProperty(thisVal, propVal, __assign(__assign(__assign({ get: getterVal, set: setterVal, value: valVal }, hasConfigurable && { configurable: configurable }), hasEnumerable && { enumerable: enumerable }), hasWritable && { writable: writable }));
        return 1;
    },
    JS_DefinePropertyValue: function (ctx, this_obj, prop, val, flags) {
        var context = state.contexts[ctx];
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = state.atoms.get(prop);
        var configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
        var hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
        var enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
        var hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
        var writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
        var hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);
        Object.defineProperty(thisVal, propVal, __assign(__assign(__assign({ value: valVal }, hasConfigurable && { configurable: configurable }), hasEnumerable && { enumerable: enumerable }), hasWritable && { writable: writable }));
        return 1;
    },
    JS_SetPropertyInternal: function (ctx, this_obj, prop, val, flags) {
        // TODO: throw error if property exists
        var context = state.contexts[ctx];
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = state.atoms.get(prop);
        var configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
        var hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
        var enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
        var hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
        var writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
        var hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);
        Object.defineProperty(thisVal, propVal, __assign(__assign(__assign({ value: valVal }, hasConfigurable && { configurable: configurable }), hasEnumerable && { enumerable: enumerable }), hasWritable && { writable: writable }));
        return 1;
    },
    JS_SetPropertyUint32: function (ctx, this_obj, idx, val) {
        // TODO: throw error if property exists
        var context = state.contexts[ctx];
        var thisVal = context.objects.get(this_obj);
        var valVal = context.objects.get(val);
        var propVal = idx;
        Reflect.set(thisVal, propVal, valVal);
        return 1;
    },
    JS_Eval: function (ctx, input, input_len, filename, eval_flags) {
        // TODO:
        return 0;
    },
    JS_EvalFunction: function (ctx, fun_obj) {
        // TODO:
        return 0;
    },
    jsb_get_payload_header: function (ctx, val) {
        // TODO:
        return 0;
    },
    JS_ToCStringLen2: function (ctx, len, val, cesu8) {
        var context = state.contexts[ctx];
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
    // #region Atoms
    JS_NewAtomLen: function (ctx, str, len) {
        var context = state.contexts[ctx];
        var buf = new ArrayBuffer(len);
        var arr = new Uint32Array(buf);
        for (var i = 0; i < len; i++)
            arr[i] = HEAP32[(str >> 2) + i];
        var val = state.stringify(arr);
        return state.atoms.push(val);
    },
    JS_AtomToString: function (ctx, atom) {
        var context = state.contexts[ctx];
        var str = state.atoms.get(atom);
        return context.objects.push(str);
    },
    JS_FreeAtom: function (ctx, v) {
        var context = state.contexts[ctx];
        state.atoms.ref(v, -1);
    },
    JS_DupAtom: function (ctx, v) {
        var context = state.contexts[ctx];
        state.atoms.ref(v, 1);
        return v;
    },
    JSB_ATOM_constructor: function () {
        return state.atoms.push('constructor');
    },
    JSB_ATOM_Error: function () {
        return state.atoms.push('Error');
    },
    JSB_ATOM_fileName: function () {
        return state.atoms.push('fileName');
    },
    JSB_ATOM_Function: function () {
        return state.atoms.push('Function');
    },
    JSB_ATOM_length: function () {
        return state.atoms.push('length');
    },
    JSB_ATOM_lineNumber: function () {
        return state.atoms.push('lineNumber');
    },
    JSB_ATOM_message: function () {
        return state.atoms.push('message');
    },
    JSB_ATOM_name: function () {
        return state.atoms.push('name');
    },
    JSB_ATOM_Number: function () {
        return state.atoms.push('Number');
    },
    JSB_ATOM_prototype: function () {
        return state.atoms.push('prototype');
    },
    JSB_ATOM_Proxy: function () {
        return state.atoms.push('Proxy');
    },
    JSB_ATOM_stack: function () {
        return state.atoms.push('stack');
    },
    JSB_ATOM_String: function () {
        return state.atoms.push('String');
    },
    JSB_ATOM_Object: function () {
        return state.atoms.push('Object');
    },
    JSB_ATOM_Operators: function () {
        return state.atoms.push('Operators');
    },
    JSB_ATOM_Symbol_operatorSet: function () {
        return state.atoms.push('operatorSet');
    },
    // #endregion
    JS_GetException: function (ctx) {
        var context = state.contexts[ctx];
        return context.objects.push(context.lastException);
    },
    JS_GetImportMeta: function (ctx, m) {
        // TODO:
        return 0;
    },
    JS_HasProperty: function (ctx, this_obj, prop) {
        var context = state.contexts[ctx];
        var thisVal = context.objects.get(this_obj);
        var propVal = state.atoms.get(prop);
        var res = Reflect.has(thisVal, propVal);
        return res ? 1 : 0;
    },
    // #region Is
    JS_IsArray: function (ctx, val) {
        var context = state.contexts[ctx];
        var valVal = context.objects.get(val);
        var res = Array.isArray(valVal);
        return res ? 1 : 0;
    },
    JS_IsConstructor: function (ctx, val) {
        var context = state.contexts[ctx];
        var obj = context.objects.get(val);
        var res = !!obj.prototype && !!obj.prototype.constructor.name;
        return res ? 1 : 0;
    },
    JS_IsError: function (ctx, val) {
        var context = state.contexts[ctx];
        var valVal = context.objects.get(val);
        var res = valVal instanceof Error;
        return res ? 1 : 0;
    },
    JS_IsFunction: function (ctx, val) {
        var context = state.contexts[ctx];
        var valVal = context.objects.get(val);
        var res = typeof valVal === 'function';
        return res ? 1 : 0;
    },
    // #endregion
    JS_JSONStringify: function (ctx, obj, replacer, space0) {
        // TODO: Priority
        return 0;
    },
    // #region New
    JS_NewArray: function (ctx) {
        var context = state.contexts[ctx];
        var res = [];
        return context.objects.push(res);
    },
    JS_NewArrayBufferCopy: function (ctx, buf, len) {
        // TODO:
        return 0;
    },
    JSB_NewFloat64: function (ctx, d) {
        return d;
    },
    JSB_NewInt64: function (ctx, d) {
        return d;
    },
    JS_NewObject: function (ctx) {
        var context = state.contexts[ctx];
        var res = {};
        return context.objects.push(res);
    },
    JS_NewString: function (ctx, str) {
        var context = state.contexts[ctx];
        var res = state.stringify(str);
        return context.objects.push(res);
    },
    JS_NewStringLen: function (ctx, str, len) {
        var context = state.contexts[ctx];
        var val = stringifyBuffer(str, len);
        return context.objects.push(val);
    },
    JSB_NewEmptyString: function (ctx) {
        var context = state.contexts[ctx];
        var res = "";
        return context.objects.push(res);
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
    // #endregion
    JS_ParseJSON: function (ctx, buf, buf_len, filename) {
        var context = state.contexts[ctx];
        var str = stringifyBuffer(buf, buf_len);
        var res = JSON.parse(str);
        return context.objects.push(res);
    },
    JS_ReadObject: function (ctx, buf, buf_len, flags) {
        // TODO:
        return 0;
    },
    JS_ResolveModule: function (ctx, obj) {
        // TODO:
        return 0;
    },
    JS_RunGC: function (rt) {
        // TODO: handle gracefully
        return 0;
    },
    JS_SetConstructor: function (ctx, ctor, proto) {
        var context = state.contexts[ctx];
        var ctorVal = context.objects.get(ctor);
        var protoVal = context.objects.get(proto);
        ctorVal.prototype = protoVal;
    },
    JS_SetPrototype: function (ctx, obj, proto) {
        var context = state.contexts[ctx];
        var objVal = context.objects.get(obj);
        var protoVal = context.objects.get(proto);
        Reflect.setPrototypeOf(objVal, protoVal);
        return 1;
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
    JS_ToBool: function (ctx, val) {
        var context = state.contexts[ctx];
        var objVal = context.objects.get(val);
        return objVal ? 1 : 0;
    },
    js_strndup: function (ctx, s, n) {
        var str = stringifyBuffer(s, n);
        var buffer = state.bufferify(str)[0];
        return buffer;
    },
    jsb_crossbind_constructor: function (ctx, new_target) {
        // TODO:
        return 0;
    },
    // #region Errors
    JSB_ThrowError: function (ctx, buf, buf_len) {
        // TODO:
        var str = stringifyBuffer(buf, buf_len);
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
    // #region Low level
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
};
// var context = state.contexts[ctx];
// var runtime = state.runtimes[ctx];
autoAddDeps(QuickJSPlugin, '$state');
mergeInto(LibraryManager.library, QuickJSPlugin);
