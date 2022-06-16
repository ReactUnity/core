/**
 * Build: npx -p typescript tsc
 */

type PluginType = JSApiExternals & {
  $state: typeof state;
  $state__postset?: string;
}

const enum JSPropFlags {
  /* flags for object properties */
  JS_PROP_CONFIGURABLE = (1 << 0),
  JS_PROP_WRITABLE = (1 << 1),
  JS_PROP_ENUMERABLE = (1 << 2),
  JS_PROP_C_W_E = (JS_PROP_CONFIGURABLE | JS_PROP_WRITABLE | JS_PROP_ENUMERABLE),
  JS_PROP_LENGTH = (1 << 3) /* used internally in Arrays */,
  JS_PROP_TMASK = (3 << 4) /* mask for NORMAL, GETSET, VARREF, AUTOINIT */,
  JS_PROP_NORMAL = (0 << 4),
  JS_PROP_GETSET = (1 << 4),
  JS_PROP_VARREF = (2 << 4) /* used internally */,
  JS_PROP_AUTOINIT = (3 << 4) /* used internally */,

  /* flags for JS_DefineProperty */
  JS_PROP_HAS_SHIFT = 8,
  JS_PROP_HAS_CONFIGURABLE = (1 << 8),
  JS_PROP_HAS_WRITABLE = (1 << 9),
  JS_PROP_HAS_ENUMERABLE = (1 << 10),
  JS_PROP_HAS_GET = (1 << 11),
  JS_PROP_HAS_SET = (1 << 12),
  JS_PROP_HAS_VALUE = (1 << 13),

  /* throw an exception if false would be returned
     (JS_DefineProperty/JS_SetProperty) */
  JS_PROP_THROW = (1 << 14),

  /* throw an exception if false would be returned in strict mode
     (JS_SetProperty) */
  JS_PROP_THROW_STRICT = (1 << 15),

  JS_PROP_NO_ADD = (1 << 16) /* internal use */,
  JS_PROP_NO_EXOTIC = (1 << 17) /* internal use */,

  // custom values
  CONST_VALUE = JS_PROP_HAS_VALUE | JS_PROP_ENUMERABLE,
  DEFAULT = JS_PROP_CONFIGURABLE | JS_PROP_ENUMERABLE,
  NONE = 0,
}

const enum Constants {
  VERSION = 0x010704,
  CS_JSB_VERSION = 0xa,
  JS_TAG_FIRST = -11, /* first negative tag */
  JS_TAG_BIG_DECIMAL = -11,
  JS_TAG_BIG_INT = -10,
  JS_TAG_BIG_FLOAT = -9,
  JS_TAG_SYMBOL = -8,
  JS_TAG_STRING = -7,
  JS_TAG_MODULE = -3, /* used internally */
  JS_TAG_FUNCTION_BYTECODE = -2, /* used internally */
  JS_TAG_OBJECT = -1,
  JS_TAG_INT = 0,
  JS_TAG_BOOL = 1,
  JS_TAG_NULL = 2,
  JS_TAG_UNDEFINED = 3,
  JS_TAG_EXCEPTION = 6,
  JS_TAG_FLOAT64 = 7,
  JS_WRITE_OBJ_BYTECODE = 1 << 0, /* allow function/module */
  JS_WRITE_OBJ_BSWAP = 1 << 1, /* byte swapped output */
  JS_WRITE_OBJ_SAB = 1 << 2, /* allow SharedArrayBuffer */
  JS_WRITE_OBJ_REFERENCE = 1 << 3, /* allow object references to encode arbitrary object graph */
  JS_READ_OBJ_BYTECODE = 1 << 0, /* allow function/module */
  JS_READ_OBJ_ROM_DATA = 1 << 1, /* avoid duplicating 'buf' data */
  JS_READ_OBJ_SAB = 1 << 2, /* allow SharedArrayBuffer */
  JS_READ_OBJ_REFERENCE = 1 << 3, /* allow object references */
}

var QuickJSPlugin: PluginType = {
  $state__postset: 'state.atoms = state.createHeap();',
  $state: {
    createHeap<T = any>(): PluginHeap<T> {
      var push = function (object) {
        if (typeof object === 'undefined') return 0;

        var id = res.lastId++;

        record[id] = {
          refCount: 1,
          value: object,
        };

        return id;
      };

      var record: PluginHeap['record'] = {};

      const res = {
        record,
        lastId: 1,
        push,
        get(id) {
          var ho = record[id];
          return ho.value;
        },
        ref(id, diff) {
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
    },

    stringify(arg) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(arg); },
    bufferify(arg: string) {
      var returnStr = "bla";
      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      return [buffer, bufferSize];
    },

    stringifyBuffer(buffer: number | Pointer<number>, bufferLength: number) {
      var buf = new ArrayBuffer(bufferLength);
      var arr = new Uint32Array(buf);
      for (var i = 0; i < bufferLength; i++)
        arr[i] = HEAP32[(buffer as any >> 2) + i];
      var val = state.stringify(arr);
      return val;
    },

    dynCall() { return (typeof Runtime !== 'undefined' ? Runtime.dynCall : dynCall).apply(typeof Runtime !== 'undefined' ? Runtime : undefined, arguments); },
    runtimes: {},
    contexts: {},
    lastRuntimeId: 1,
    lastContextId: 1,
  },

  JSB_Init() {
    return Constants.CS_JSB_VERSION;
  },

  JSB_NewRuntime(finalizer) {
    console.log(finalizer);

    var id = state.lastRuntimeId++;

    state.runtimes[id] = {
      id,
      contexts: {},
    };

    return id;
  },

  /**
   *
   * @param rtId
   * @returns
   */
  JSB_GetRuntimeOpaque(rtId) {
    return state.runtimes[rtId].opaque;
  },

  JSB_SetRuntimeOpaque(rtId, opaque) {
    state.runtimes[rtId].opaque = opaque;
  },

  JS_GetContextOpaque(ctx) {
    return state.contexts[ctx].opaque;
  },

  JS_SetContextOpaque(ctx, opaque) {
    state.contexts[ctx].opaque = opaque;
  },

  JSB_FreeRuntime(rtId) {
    var runtime = state.runtimes[rtId];

    for (const key in runtime.contexts) {
      if (Object.hasOwnProperty.call(runtime.contexts, key)) {
        state.contexts[key] = undefined;
      }
    }

    state.runtimes[rtId] = undefined;

    return 1;
  },

  JS_GetRuntime(ctxId) {
    var context = state.contexts[ctxId];
    return context.runtimeId;
  },

  JS_NewContext(rtId) {
    var id = state.lastContextId++;
    var runtime = state.runtimes[rtId];


    var iframe = document.createElement('iframe');
    var window = iframe.contentWindow!;

    window['parent' as any] = undefined;

    var execute = function (code) {
      var script = window.document.createElement('script');
      script.innerText = code;
      window.document.head.appendChild(script);
    };

    var evaluate = function (code) {
      return (window['eval' as any] as any)(code);
    };

    var objects = state.createHeap();

    var globalId = objects.push(window);

    var context: PluginContext = {
      id,
      runtimeId: rtId,
      iframe,
      window,
      execute,
      evaluate,
      globalId,
      objects,
    };

    runtime.contexts[id] = context;
    state.contexts[id] = context;
    return id;
  },

  JS_FreeContext(ctxId) {
    var context = state.contexts[ctxId];
    var runtime = state.runtimes[context.runtimeId];

    runtime.contexts[ctxId] = undefined;
    state.contexts[ctxId] = undefined;
  },

  JS_GetGlobalObject(ctxId) {
    var context = state.contexts[ctxId];
    context.objects.ref(context.globalId, 1);
    return context.globalId;
  },

  JS_IsInstanceOf(ctxId, val, obj) {
    var context = state.contexts[ctxId];
    return (context.objects.get(val) instanceof context.objects.get(obj)) ? 1 : 0;
  },

  JS_NewPromiseCapability() {
    // TODO
    return 0;
  },

  JS_GetPropertyUint32(ctxId, val, index) {
    var context = state.contexts[ctxId];
    var obj = context.objects.get(val);
    var res = obj[index];

    return context.objects.push(res);
  },

  JS_GetPropertyInternal(ctxId, val, prop, receiver, throwRefError) {
    var context = state.contexts[ctxId];
    var valObj = context.objects.get(val);
    var receiverObj = context.objects.get(receiver);
    // TODO: get atom
    var res = Reflect.get(valObj, prop, receiverObj);

    return context.objects.get(res);
  },

  JS_GetPropertyStr(ctxId, val, prop) {
    var context = state.contexts[ctxId];
    var valObj = context.objects.get(val);
    var propStr = state.stringify(prop);
    var res = Reflect.get(valObj, propStr);

    return context.objects.push(res);
  },

  JSB_FreeValue(ctx, v) {
    var context = state.contexts[ctx];
    context.objects.ref(v, -1);
  },

  JSB_FreeValueRT(ctx, v) {
    // TODO:
  },

  JSB_DupValue(ctx, v) {
    var context = state.contexts[ctx];
    context.objects.ref(v, 1);
    return v;
  },

  JS_AddIntrinsicOperators(ctx) {
    // TODO: handle gracefully
  },

  JS_Invoke(ctx, this_obj, prop, argc, argv) {
    var context = state.contexts[ctx];
    const arr = new Array(argc);

    for (var i = 0; i < argc; i++)
      arr[i] = HEAP32[(argv as any >> 2) + i];

    const propVal = state.atoms.get(prop);
    const thisVal = context.objects.get(this_obj);
    const func = Reflect.get(thisVal, propVal);

    const args = arr.map(context.objects.get);

    const val = func.apply(thisVal, args);

    return state.atoms.push(val);
  },

  JS_Call(ctx, func_obj, this_obj, argc, argv) {
    var context = state.contexts[ctx];
    const arr = new Array(argc);

    for (var i = 0; i < argc; i++)
      arr[i] = HEAP32[(argv as any >> 2) + i];

    const func = context.objects.get(func_obj);
    const thisVal = context.objects.get(this_obj);

    const args = arr.map(context.objects.get);

    const val = func.apply(thisVal, args);

    return state.atoms.push(val);
  },

  JS_CallConstructor(ctx, func_obj, argc, argv) {
    var context = state.contexts[ctx];
    const arr = new Array(argc);

    for (var i = 0; i < argc; i++)
      arr[i] = HEAP32[(argv as any >> 2) + i];

    const func = context.objects.get(func_obj);

    const args = arr.map(context.objects.get);

    const val = Reflect.construct(func, args);

    return state.atoms.push(val);
  },

  JS_ComputeMemoryUsage(rt, s) {
    // TODO
  },

  JS_DefineProperty(ctx, this_obj, prop, val, getter, setter, flags) {
    var context = state.contexts[ctx];

    const thisVal = context.objects.get(this_obj);
    const getterVal = context.objects.get(getter);
    const setterVal = context.objects.get(setter);
    const valVal = context.objects.get(val);
    const propVal = state.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    Object.defineProperty(thisVal, propVal, {
      get: getterVal,
      set: setterVal,
      value: valVal,
      ...hasConfigurable && { configurable },
      ...hasEnumerable && { enumerable },
      ...hasWritable && { writable },
    });

    return 1;
  },

  JS_DefinePropertyValue(ctx, this_obj, prop, val, flags) {
    var context = state.contexts[ctx];

    const thisVal = context.objects.get(this_obj);
    const valVal = context.objects.get(val);
    const propVal = state.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    Object.defineProperty(thisVal, propVal, {
      value: valVal,
      ...hasConfigurable && { configurable },
      ...hasEnumerable && { enumerable },
      ...hasWritable && { writable },
    });

    return 1;
  },


  JS_SetPropertyInternal(ctx, this_obj, prop, val, flags) {
    // TODO: throw error if property exists

    var context = state.contexts[ctx];

    const thisVal = context.objects.get(this_obj);
    const valVal = context.objects.get(val);
    const propVal = state.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    Object.defineProperty(thisVal, propVal, {
      value: valVal,
      ...hasConfigurable && { configurable },
      ...hasEnumerable && { enumerable },
      ...hasWritable && { writable },
    });

    return 1;
  },

  JS_SetPropertyUint32(ctx, this_obj, idx, val) {
    // TODO: throw error if property exists

    var context = state.contexts[ctx];

    const thisVal = context.objects.get(this_obj);
    const valVal = context.objects.get(val);
    const propVal = idx;

    Reflect.set(thisVal, propVal, valVal);

    return 1;
  },


  JS_Eval(ctx, input, input_len, filename, eval_flags) {
    // TODO:
    return 0;
  },

  JS_EvalFunction(ctx, fun_obj) {
    // TODO:
    return 0;
  },

  jsb_get_payload_header(ctx, val) {
    // TODO:

    return 0;
  },

  JS_ToCStringLen2(ctx, len, val, cesu8) {
    var context = state.contexts[ctx];

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

  // #region Atoms

  JS_NewAtomLen(ctx, str, len) {
    var context = state.contexts[ctx];

    var buf = new ArrayBuffer(len);
    var arr = new Uint32Array(buf);
    for (var i = 0; i < len; i++)
      arr[i] = HEAP32[(str as any >> 2) + i];

    var val = state.stringify(arr);

    return state.atoms.push(val);
  },

  JS_AtomToString(ctx, atom) {
    var context = state.contexts[ctx];

    var str = state.atoms.get(atom);

    return context.objects.push(str);
  },

  JS_FreeAtom(ctx, v) {
    var context = state.contexts[ctx];
    state.atoms.ref(v, -1);
  },

  JS_DupAtom(ctx, v) {
    var context = state.contexts[ctx];
    state.atoms.ref(v, 1);
    return v;
  },

  JSB_ATOM_constructor() {
    return state.atoms.push('constructor');
  },

  JSB_ATOM_Error() {
    return state.atoms.push('Error');
  },

  JSB_ATOM_fileName() {
    return state.atoms.push('fileName');
  },

  JSB_ATOM_Function() {
    return state.atoms.push('Function');
  },

  JSB_ATOM_length() {
    return state.atoms.push('length');
  },

  JSB_ATOM_lineNumber() {
    return state.atoms.push('lineNumber');
  },

  JSB_ATOM_message() {
    return state.atoms.push('message');
  },

  JSB_ATOM_name() {
    return state.atoms.push('name');
  },

  JSB_ATOM_Number() {
    return state.atoms.push('Number');
  },

  JSB_ATOM_prototype() {
    return state.atoms.push('prototype');
  },

  JSB_ATOM_Proxy() {
    return state.atoms.push('Proxy');
  },

  JSB_ATOM_stack() {
    return state.atoms.push('stack');
  },

  JSB_ATOM_String() {
    return state.atoms.push('String');
  },

  JSB_ATOM_Object() {
    return state.atoms.push('Object');
  },

  JSB_ATOM_Operators() {
    return state.atoms.push('Operators');
  },

  JSB_ATOM_Symbol_operatorSet() {
    return state.atoms.push('operatorSet');
  },

  // #endregion

  JS_GetException(ctx) {
    var context = state.contexts[ctx];

    return context.objects.push(context.lastException);
  },

  JS_GetImportMeta(ctx, m) {
    // TODO:
    return 0;
  },

  JS_HasProperty(ctx, this_obj, prop) {
    var context = state.contexts[ctx];
    var thisVal = context.objects.get(this_obj);
    var propVal = state.atoms.get(prop);

    var res = Reflect.has(thisVal, propVal);

    return res ? 1 : 0;
  },

  // #region Is

  JS_IsArray(ctx, val) {
    var context = state.contexts[ctx];
    var valVal = context.objects.get(val);
    var res = Array.isArray(valVal);
    return res ? 1 : 0;
  },

  JS_IsConstructor(ctx, val) {
    var context = state.contexts[ctx];
    var obj = context.objects.get(val);
    var res = !!obj.prototype && !!obj.prototype.constructor.name;
    return res ? 1 : 0;
  },

  JS_IsError(ctx, val) {
    var context = state.contexts[ctx];
    var valVal = context.objects.get(val);
    var res = valVal instanceof Error;
    return res ? 1 : 0;
  },

  JS_IsFunction(ctx, val) {
    var context = state.contexts[ctx];
    var valVal = context.objects.get(val);
    var res = typeof valVal === 'function';
    return res ? 1 : 0;
  },

  // #endregion

  JS_JSONStringify(ctx, obj, replacer, space0) {
    // TODO: Priority

    return 0;
  },

  // #region New

  JS_NewArray(ctx) {
    var context = state.contexts[ctx];
    var res = [];
    return context.objects.push(res);
  },

  JS_NewArrayBufferCopy(ctx, buf, len) {
    // TODO:
    return 0;
  },

  JSB_NewFloat64(ctx, d) {
    return d;
  },

  JSB_NewInt64(ctx, d) {
    return d;
  },

  JS_NewObject(ctx) {
    var context = state.contexts[ctx];
    var res = {};
    return context.objects.push(res);
  },

  JS_NewString(ctx, str) {
    var context = state.contexts[ctx];
    var res = state.stringify(str);
    return context.objects.push(res);
  },

  JS_NewStringLen(ctx, str, len) {
    var context = state.contexts[ctx];

    var val = state.stringifyBuffer(str as any, len);

    return context.objects.push(val);
  },

  JSB_NewEmptyString(ctx) {
    var context = state.contexts[ctx];
    var res = "";
    return context.objects.push(res);
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

  // #endregion

  JS_ParseJSON(ctx, buf, buf_len, filename) {
    var context = state.contexts[ctx];
    var str = state.stringifyBuffer(buf as any, buf_len);
    var res = JSON.parse(str);
    return context.objects.push(res);
  },

  JS_ReadObject(ctx, buf, buf_len, flags) {
    // TODO:
    return 0;
  },

  JS_ResolveModule(ctx, obj) {
    // TODO:
    return 0;
  },

  JS_RunGC(rt) {
    // TODO: handle gracefully
    return 0;
  },

  JS_SetConstructor(ctx, ctor, proto) {
    var context = state.contexts[ctx];
    var ctorVal = context.objects.get(ctor);
    var protoVal = context.objects.get(proto);
    ctorVal.prototype = protoVal;
  },

  JS_SetPrototype(ctx, obj, proto) {
    var context = state.contexts[ctx];
    var objVal = context.objects.get(obj);
    var protoVal = context.objects.get(proto);
    Reflect.setPrototypeOf(objVal, protoVal);

    return 1;
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

  JS_ToBool(ctx, val) {
    var context = state.contexts[ctx];
    var objVal = context.objects.get(val);
    return objVal ? 1 : 0;
  },

  js_strndup(ctx, s, n) {
    var str = state.stringifyBuffer(s as any, n);

    var [buffer] = state.bufferify(str);
    return buffer;
  },

  jsb_crossbind_constructor(ctx, new_target) {
    // TODO:
    return 0;
  },

  // #region Errors

  JSB_ThrowError(ctx, buf, buf_len) {
    // TODO:
    var str = state.stringifyBuffer(buf as any, buf_len);
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


  // #region Low level

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
};

// var context = state.contexts[ctx];

// var runtime = state.runtimes[ctx];


autoAddDeps(QuickJSPlugin, '$state');
mergeInto(LibraryManager.library, QuickJSPlugin);
