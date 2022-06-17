/**
 * Build with the following command:
 * npx -p typescript tsc
 */

type PluginType = JSApiExternals & {
  $state: typeof state;
  $state__postset?: string;
}

var QuickJSPlugin: PluginType = {
  $state__postset: 'state.atoms = state.createHeap(true);\n',
  $state: {
    createHeap: function <T = any>(isAtom: boolean): PluginHeap<T> {
      var getTag = function (object): Tags {
        if (object === undefined) return Tags.JS_TAG_UNDEFINED;
        if (object === null) return Tags.JS_TAG_NULL;
        if (typeof object === 'number') return Tags.JS_TAG_FLOAT64;
        if (typeof object === 'boolean') return Tags.JS_TAG_BOOL;
        if (typeof object === 'function') return Tags.JS_TAG_FUNCTION_BYTECODE;
        if (typeof object === 'symbol') return Tags.JS_TAG_SYMBOL;
        if (typeof object === 'string') return Tags.JS_TAG_STRING;
        if (typeof object === 'bigint') return Tags.JS_TAG_BIG_FLOAT;
        if (object instanceof Error) return Tags.JS_TAG_EXCEPTION;
        return Tags.JS_TAG_OBJECT;
      };

      var record: PluginHeap['record'] = {};

      const res: PluginHeap<T> = {
        record,
        lastId: 1,
        push(object, ptr) {
          if (typeof object === 'undefined') {
            res.refIndex(0, 1, ptr);
            return 0;
          }

          var id = res.lastId++;

          record[id] = {
            refCount: 0,
            value: object,
            tag: getTag(object),
          };

          res.refIndex(id, 1, ptr);

          return id;
        },
        get(val) {
          var id = isAtom ? val : HEAP32[val >> 2];
          if (id === 0) return undefined;
          var ho = record[id];
          return ho.value;
        },
        ref(obj, diff, ptr) {
          var id = isAtom ? obj : HEAP32[obj >> 2];
          return res.refIndex(id, diff, ptr);
        },
        refIndex(id, diff, ptr) {
          if (id === 0) {
            if (typeof ptr === 'number') {
              HEAP32[ptr >> 2] = 0;
              if (!isAtom) {
                var bu = new BigInt64Array(HEAPF64.buffer);
                bu[(ptr >> 3) + 1] = BigInt(Tags.JS_TAG_UNDEFINED);
                // HEAP32[(ptr >> 2) + 2] = Tags.JS_TAG_UNDEFINED;
              }
            }

            return 0;
          }

          var ho = record[id];

          ho.refCount += diff;

          console.assert(ho.refCount >= 0);

          if (ho.refCount <= 0) {
            record[id] = undefined;
          }

          if (typeof ptr === 'number') {
            HEAP32[ptr >> 2] = id;
            if (!isAtom) {
              // TODO: [Improvement] find out if there is an easier way to pass longs to C#
              var bu = new BigInt64Array(HEAPF64.buffer);
              bu[(ptr >> 3) + 1] = BigInt(ho.tag);
              // HEAP32[(ptr >> 2) + 2] = ho.tag;
            }
          }

          return ho.refCount;
        },
      };

      return res;
    },
    stringify: function (ptr: number | Pointer<number>, bufferLength?: number) { return (typeof UTF8ToString !== 'undefined' ? UTF8ToString : Pointer_stringify)(ptr, bufferLength); },
    bufferify: function (arg: string) {
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
  },

  JSB_Init() {
    return Constants.CS_JSB_VERSION;
  },

  JSB_NewRuntime(finalizer) {
    // TODO: understand what to do with finalizer

    var id = state.lastRuntimeId++;

    state.runtimes[id] = {
      id,
      contexts: {},
    };

    return id;
  },

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

    return true;
  },

  JS_GetRuntime(ctxId) {
    var context = state.getContext(ctxId);
    return context.runtimeId;
  },

  JS_NewContext(rtId) {
    var id = state.lastContextId++;
    var runtime = state.getRuntime(rtId);


    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.head.appendChild(iframe);
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

    var objects = state.createHeap(false);

    var context: PluginContext = {
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
    var code = state.stringify(input, input_len);

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
      arr[i] = HEAP32[(argv as any >> 2) + i];

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
      arr[i] = HEAP32[(argv as any >> 2) + i];

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
      arr[i] = HEAP32[(argv as any >> 2) + i];

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
        value: valVal,
      };

      if (hasConfigurable) opts.configurable = configurable;
      if (hasEnumerable) opts.enumerable = enumerable;
      if (hasWritable) opts.writable = writable;

      Object.defineProperty(thisVal, propVal, opts);

      return true;
    } catch (ex) {
      if (shouldThrow) {
        context.lastException = ex;
        return -1;
      }
    }

    return false;
  },

  JS_DefinePropertyValue(ctx, this_obj, prop, val, flags) {
    var context = state.getContext(ctx);

    const thisVal = context.objects.get(this_obj);
    const valVal = context.objects.get(val);
    const propVal = state.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    const shouldThrow = !!(flags & JSPropFlags.JS_PROP_THROW) || !!(flags & JSPropFlags.JS_PROP_THROW_STRICT);

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
      if (shouldThrow) {
        context.lastException = err;
        return -1;
      }
    }

    return false;
  },

  JS_HasProperty(ctx, this_obj, prop) {
    var context = state.getContext(ctx);
    var thisVal = context.objects.get(this_obj);
    var propVal = state.atoms.get(prop);

    var res = Reflect.has(thisVal, propVal);

    return !!res;
  },

  JS_SetPropertyInternal(ctx, this_obj, prop, val, flags) {
    var context = state.getContext(ctx);

    const thisVal = context.objects.get(this_obj);
    const valVal = context.objects.get(val);
    const propVal = state.atoms.get(prop);

    const configurable = !!(flags & JSPropFlags.JS_PROP_CONFIGURABLE);
    const hasConfigurable = configurable || !!(flags & JSPropFlags.JS_PROP_HAS_CONFIGURABLE);
    const enumerable = !!(flags & JSPropFlags.JS_PROP_ENUMERABLE);
    const hasEnumerable = enumerable || !!(flags & JSPropFlags.JS_PROP_HAS_ENUMERABLE);
    const writable = !!(flags & JSPropFlags.JS_PROP_WRITABLE);
    const hasWritable = writable || !!(flags & JSPropFlags.JS_PROP_HAS_WRITABLE);

    const shouldThrow = !!(flags & JSPropFlags.JS_PROP_THROW) || !!(flags & JSPropFlags.JS_PROP_THROW_STRICT);

    try {
      const opts: PropertyDescriptor = {
        value: valVal,
      };

      if (hasConfigurable) opts.configurable = configurable;
      if (hasEnumerable) opts.enumerable = enumerable;
      if (hasWritable) opts.writable = writable;

      Object.defineProperty(thisVal, propVal, opts);

      return true;
    } catch (err) {
      if (shouldThrow) {
        context.lastException = err;
        return -1;
      }
    }

    return false;
  },

  JS_SetPropertyUint32(ctx, this_obj, idx, val) {
    var context = state.getContext(ctx);

    const thisVal = context.objects.get(this_obj);
    const valVal = context.objects.get(val);
    const propVal = idx;

    return !!Reflect.set(thisVal, propVal, valVal);
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

    return buffer as IntPtr;
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

      return value as any;
    }

    return 0 as IntPtr;
  },

  // #region Atoms

  JS_NewAtomLen(ctx, str, len) {
    var context = state.getContext(ctx);
    var val = state.stringify(str, len);

    return state.atoms.push(val, undefined);
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

  JS_DupAtom(ctx, v) {
    var context = state.getContext(ctx);
    state.atoms.ref(v, 1, undefined);
    return v;
  },

  JSB_ATOM_constructor() {
    return state.atoms.push('constructor', undefined);
  },

  JSB_ATOM_Error() {
    return state.atoms.push('Error', undefined);
  },

  JSB_ATOM_fileName() {
    return state.atoms.push('fileName', undefined);
  },

  JSB_ATOM_Function() {
    return state.atoms.push('Function', undefined);
  },

  JSB_ATOM_length() {
    return state.atoms.push('length', undefined);
  },

  JSB_ATOM_lineNumber() {
    return state.atoms.push('lineNumber', undefined);
  },

  JSB_ATOM_message() {
    return state.atoms.push('message', undefined);
  },

  JSB_ATOM_name() {
    return state.atoms.push('name', undefined);
  },

  JSB_ATOM_Number() {
    return state.atoms.push('Number', undefined);
  },

  JSB_ATOM_prototype() {
    return state.atoms.push('prototype', undefined);
  },

  JSB_ATOM_Proxy() {
    return state.atoms.push('Proxy', undefined);
  },

  JSB_ATOM_stack() {
    return state.atoms.push('stack', undefined);
  },

  JSB_ATOM_String() {
    return state.atoms.push('String', undefined);
  },

  JSB_ATOM_Object() {
    return state.atoms.push('Object', undefined);
  },

  JSB_ATOM_Operators() {
    return state.atoms.push('Operators', undefined);
  },

  JSB_ATOM_Symbol_operatorSet() {
    return state.atoms.push('operatorSet', undefined);
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
    var str = state.stringify(buf as any, buf_len);
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

    var val = state.stringify(str as any, len);

    context.objects.push(val, ptr);
  },

  JSB_NewEmptyString(ptr, ctx) {
    var context = state.getContext(ctx);
    var res = "";
    context.objects.push(res, ptr);
  },

  // #endregion

  // #region Bridge

  JSB_NewCFunction(ret, ctx, func, atom, length, cproto, magic) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var fn = function () { };
    context.objects.push(fn, ret);
  },

  JSB_NewCFunctionMagic(ret, ctx, func, atom, length, cproto, magic) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var fn = function () { };
    context.objects.push(fn, ret);
  },

  jsb_new_bridge_object(ret, ctx, proto, object_id) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var res = {};
    context.objects.push(res, ret);
  },

  jsb_new_bridge_value(ret, ctx, proto, size) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var res = {};
    context.objects.push(res, ret);
  },

  JSB_NewBridgeClassObject(ret, ctx, new_target, object_id) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var res = {};
    context.objects.push(res, ret);
  },

  JSB_NewBridgeClassValue(ret, ctx, new_target, size) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var res = {};
    context.objects.push(res, ret);
  },

  JSB_GetBridgeClassID() {
    // TODO: priority
    return 0;
  },

  jsb_construct_bridge_object(ret, ctx, proto, object_id) {
    var context = state.getContext(ctx);
    // TODO: Priority
    var res = {};
    context.objects.push(res, ret);
  },

  jsb_crossbind_constructor(ret, ctx, new_target) {
    var context = state.getContext(ctx);
    // TODO: I have no idea
    var res = function () { };
    context.objects.push(res, ret);
  },

  // #endregion

  // #region Errors

  JSB_ThrowError(ctx, buf, buf_len) {
    // TODO:
    var str = state.stringify(buf as any, buf_len);
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
    var str = state.stringify(s as any, n);

    var [buffer] = state.bufferify(str);
    return buffer as IntPtr;
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
    return false
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
      var bg = BigInt('0x100000000000000000000000000000000');
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
      var bg = BigInt('0x100000000000000000000000000000000');
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
      var bg = BigInt('0x100000000000000000000000000000000');
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
    return 0 as IntPtr;
  },

  JS_EvalFunction(ptr, ctx, fun_obj) {
    console.warn('Bytecode is not supported in WebGL Backend');
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

  JS_GetImportMeta(ret, ctx, m) {
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
