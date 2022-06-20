/**
 * Build with the following command:
 * npx -p typescript tsc
 */

type PluginType = JSApiExternals & {
  $unityJsbState: typeof unityJsbState;
  $unityJsbState__postset?: string;
}

var UnityJSBPlugin: PluginType = {
  $unityJsbState__postset: 'unityJsbState.atoms = unityJsbState.createAtoms();\n',
  $unityJsbState: {
    createObjects: function (): PluginObjects {
      var getTag = function (object): Tags {
        if (object === undefined) return Tags.JS_TAG_UNDEFINED;
        if (object === null) return Tags.JS_TAG_NULL;
        if (typeof object === 'number') return Tags.JS_TAG_FLOAT64;
        if (typeof object === 'boolean') return Tags.JS_TAG_BOOL;
        if (typeof object === 'function') return Tags.JS_TAG_FUNCTION_BYTECODE;
        if (typeof object === 'symbol') return Tags.JS_TAG_SYMBOL;
        if (typeof object === 'string') return Tags.JS_TAG_STRING;
        if (typeof object === 'bigint') return Tags.JS_TAG_BIG_INT;
        if (object instanceof Error) return Tags.JS_TAG_EXCEPTION;
        return Tags.JS_TAG_OBJECT;
      };

      var record: PluginObjects['record'] = {};

      const map = new Map<any, number>();

      var payloadMap: PluginObjects['payloadMap'] = new Map();

      const res: PluginObjects = {
        record,
        lastId: 0,

        allocate(object) {
          var ptr = _malloc(Sizes.JSValue) as JSValue;
          res.push(object, ptr);
          return ptr as JSValue;
        },
        batchAllocate(objects) {
          var size = Sizes.JSValue;
          var arr = _malloc(size * objects.length) as PointerArray<JSValue>;

          for (let index = 0; index < objects.length; index++) {
            const object = objects[index];
            res.push(object, arr + (index * size) as JSValue);
          }

          return arr;
        },
        batchGet(ptrs, count) {
          var size = Sizes.JSValue;

          var arr = new Array(count);
          for (let index = 0; index < count; index++) {
            const object = res.get(ptrs + index * size as JSValue);
            arr[index] = object;
          }

          return arr;
        },
        push(object, ptr) {
          if (typeof object === 'undefined') {
            res.refIndex(0, 1, ptr);
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
            res.refIndex(foundId, 1, ptr);
            return;
          }

          var id = ++res.lastId;

          record[id] = {
            id,
            refCount: 0,
            value: object,
            tag: getTag(object),
          };

          map.set(object, id);

          res.refIndex(id, 1, ptr);

          return id;
        },
        get(val) {
          var tag = Number(unityJsbState.HEAP64()[(val >> 3) + 1]);

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
            var id = HEAP32[val >> 2];
            if (id === 0) return undefined;
            var ho = record[id];
            return ho.value;
          }
        },
        getRecord(val) {
          var tag = Number(unityJsbState.HEAP64()[(val >> 3) + 1]);

          if (tag === Tags.JS_TAG_INT) {
            var value = HEAP32[val >> 2];
            return {
              id: -1,
              refCount: 0,
              value,
              tag,
            };
          }
          else if (tag === Tags.JS_TAG_BOOL) {
            var boolValue = !!HEAP32[val >> 2];
            return {
              id: -1,
              refCount: 0,
              value: boolValue,
              tag,
            };
          }
          else if (tag === Tags.JS_TAG_FLOAT64) {
            var value = HEAPF64[val >> 3];
            return {
              id: -1,
              refCount: 0,
              value,
              tag,
            };
          }
          else {
            var id = HEAP32[val >> 2];
            if (id === 0) return {
              id: 0,
              refCount: 0,
              value: undefined,
              tag: Tags.JS_TAG_UNDEFINED,
              type: BridgeObjectType.None,
              payload: -1,
            };
            var ho = record[id];
            return ho;
          }
        },
        ref(obj, diff, ptr) {
          var tag = Number(unityJsbState.HEAP64()[(obj >> 3) + 1]);

          if (tag === Tags.JS_TAG_FLOAT64) {
            if (typeof ptr === 'number') {
              var val = HEAPF64[(obj >> 3)];
              HEAPF64[ptr >> 3] = val;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
            }
            return;
          }
          else if (tag === Tags.JS_TAG_INT) {
            if (typeof ptr === 'number') {
              var val = HEAP32[(obj >> 2)];
              HEAP32[(ptr >> 2)] = val;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
            }
            return;
          }
          else if (tag === Tags.JS_TAG_BOOL) {
            if (typeof ptr === 'number') {
              var valBool = !!HEAP32[(obj >> 2)];
              HEAP32[(ptr >> 2)] = valBool ? 1 : 0;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(tag);
            }
            return;
          }

          var id = HEAP32[obj >> 2];
          res.refIndex(id, diff, ptr);
        },
        refIndex(id, diff, ptr) {
          if (id === 0) {
            if (typeof ptr === 'number') {
              HEAP32[ptr >> 2] = 0;
              HEAP32[(ptr >> 2) + 1] = 0;
              unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(Tags.JS_TAG_UNDEFINED);
            }
            return;
          }

          var ho = record[id];

          ho.refCount += diff;

          console.assert(ho.refCount >= 0);

          if (typeof ptr === 'number') {
            HEAP32[ptr >> 2] = id;
            HEAP32[(ptr >> 2) + 1] = 0;
            unityJsbState.HEAP64()[(ptr >> 3) + 1] = BigInt(ho.tag);
          }
        },
        deleteIndex(id) {
          var rec = record[id];
          delete record[id];
          map.delete(rec.value);
        },
        payloadMap,
        setPayload(obj, type, payload) {
          payloadMap.set(obj, {
            type: BridgeObjectType.None || type,
            payload,
          });
        },
        getPayload(obj) {
          var res = payloadMap.get(obj);

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
    createAtoms(): PluginAtoms {
      var record: PluginAtoms['record'] = {};
      var map: PluginAtoms['map'] = {};

      var res: PluginAtoms = {
        record,
        map,
        lastId: 0,
        get(ref) {
          if (ref === 0) return undefined;
          return record[ref].value;
        },
        push(str) {
          if (str === undefined) return 0;
          var mapped = map[str];
          var id;

          if (!mapped) {
            id = ++res.lastId;
            map[str] = record[id] = {
              id,
              value: str,
              refCount: 1,
            };
          } else {
            id = mapped.id;
            mapped.refCount++;
          }

          return id;
        },
        pushId(id) {
          if (id === 0) return;

          var recorded = record[id];
          console.assert(!!recorded);
          if (!recorded) return 0;
          recorded.refCount++;

          return id;
        },
        pop(id) {
          if (id === 0) return;

          var recorded = record[id];
          console.assert(!!recorded);
          if (!recorded) return;

          recorded.refCount--;
          console.assert(recorded.refCount >= 0);

          if (recorded.refCount == 0) {
            delete map[recorded.value];
            delete record[id];
          }
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
      return unityJsbState.runtimes[rtId];
    },
    getContext: function (ctx) {
      var ctxId = ctx;
      return unityJsbState.contexts[ctxId];
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

    var id = unityJsbState.lastRuntimeId++;
    var objects = unityJsbState.createObjects();

    unityJsbState.runtimes[id] = {
      id,
      contexts: {},
      objects,
      garbageCollect() {
        var lastId = objects.lastId;
        var record = objects.record;

        var aliveItemCount = 0;

        for (let index = 0; index < lastId; index++) {
          const element = record[index];

          if (element) {
            if (element.refCount <= 0) {
              objects.deleteIndex(index);
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
    var runtime = unityJsbState.getRuntime(rtId);
    var aliveItemCount = runtime.garbageCollect();

    for (const key in runtime.contexts) {
      if (Object.hasOwnProperty.call(runtime.contexts, key)) {
        delete unityJsbState.contexts[key];
      }
    }

    delete unityJsbState.runtimes[runtime.id];

    return aliveItemCount === 0;
  },

  JS_GetRuntime(ctxId) {
    var context = unityJsbState.getContext(ctxId);
    return context.runtimeId;
  },

  JS_NewContext(rtId) {
    var id = unityJsbState.lastContextId++;
    var runtime = unityJsbState.getRuntime(rtId);

    var extraGlobals: any = {
      location: undefined,
      document: undefined,
      btoa: window.btoa?.bind(window),
      atob: window.atob?.bind(window),
      $$webglWindow: window,
    };

    var globals: typeof window = new Proxy(extraGlobals, {
      get(target, p, receiver) {
        if (p in target) return target[p];
        else return window[p];
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

    var evaluate = function (code: string, filename?: string) {
      var sourceMap = !filename ? '' : '\n//# sourceURL=unity-jsb:///' + filename;

      return (function (evalCode) {
        //@ts-ignore
        with (globals) {
          return eval(evalCode);
        }
      }).call(globals, code + sourceMap);
    };


    var context: PluginContext = {
      id,
      runtime,
      runtimeId: rtId,
      window,
      globalObject: globals,
      evaluate,
    };

    runtime.contexts[id] = context;
    unityJsbState.contexts[id] = context;
    return id;
  },

  JS_FreeContext(ctxId) {
    var context = unityJsbState.getContext(ctxId);
    var runtime = unityJsbState.runtimes[context.runtimeId];

    delete runtime.contexts[context.id];
    delete unityJsbState.contexts[context.id];
  },

  JS_GetGlobalObject(returnValue, ctxId) {
    var context = unityJsbState.getContext(ctxId);

    if (!context.globalObjectId) {
      context.runtime.objects.push(context.globalObject, returnValue);
    }
    else {
      context.runtime.objects.refIndex(context.globalObjectId, 1, returnValue);
    }
  },

  JS_Eval(ptr, ctx, input, input_len, filename, eval_flags) {
    try {
      var context = unityJsbState.getContext(ctx);
      var code = unityJsbState.stringify(input, input_len);
      var filenameStr = unityJsbState.stringify(filename);

      var res = context.evaluate(code, filenameStr);

      context.runtime.objects.push(res, ptr);
    } catch (err) {
      context.lastException = err;
      context.runtime.objects.push(err, ptr);
      console.error(err);
    }
  },

  JS_IsInstanceOf(ctxId, val, obj) {
    var context = unityJsbState.getContext(ctxId);
    var valVal = context.runtime.objects.get(val);
    var ctorVal = context.runtime.objects.get(obj);
    return !!(valVal instanceof ctorVal);
  },

  JS_GetException(ptr, ctx) {
    var context = unityJsbState.getContext(ctx);

    context.runtime.objects.push(context.lastException, ptr);
  },

  JSB_FreeValue(ctx, v) {
    var context = unityJsbState.getContext(ctx);
    context.runtime.objects.ref(v, -1, undefined);
  },

  JSB_FreeValueRT(rt, v) {
    var runtime = unityJsbState.getRuntime(rt);
    runtime.objects.ref(v, -1, undefined);
  },

  JSB_FreePayload(ret, ctx, val) {
    var context = unityJsbState.getContext(ctx);
    var obj = context.runtime.objects.get(val);

    var payload = context.runtime.objects.getPayload(obj);
    HEAP32[ret >> 2] = payload.type;
    HEAP32[(ret >> 2) + 1] = payload.payload;

    context.runtime.objects.clearPayload(obj);
  },

  JSB_DupValue(ptr, ctx, v) {
    var context = unityJsbState.getContext(ctx);
    context.runtime.objects.ref(v, 1, ptr);
  },

  JS_RunGC(rt) {
    var runtime = unityJsbState.getRuntime(rt);

    runtime.garbageCollect();
  },

  JS_ComputeMemoryUsage(rt, s) {
    // TODO: https://blog.unity.com/technology/unity-webgl-memory-the-unity-heap
  },

  JS_GetPropertyUint32(ptr, ctxId, val, index) {
    var context = unityJsbState.getContext(ctxId);
    var obj = context.runtime.objects.get(val);
    var res = obj[index];

    context.runtime.objects.push(res, ptr);
  },

  JS_GetPropertyInternal(ptr, ctxId, val, prop, receiver, throwRefError) {
    var context = unityJsbState.getContext(ctxId);
    var valObj = context.runtime.objects.get(val);
    var receiverObj = context.runtime.objects.get(receiver);
    var propStr = unityJsbState.atoms.get(prop);
    var res = valObj[propStr];
    // var res = Reflect.get(valObj, propStr, receiverObj);

    context.runtime.objects.push(res, ptr);
  },

  JS_GetPropertyStr(ptr, ctxId, val, prop) {
    var context = unityJsbState.getContext(ctxId);
    var valObj = context.runtime.objects.get(val);
    var propStr = unityJsbState.stringify(prop);
    var res = valObj[propStr];
    // var res = Reflect.get(valObj, propStr);

    context.runtime.objects.push(res, ptr);
  },

  JS_Invoke(ptr, ctx, this_obj, prop, argc, argv) {
    var context = unityJsbState.getContext(ctx);
    const propVal = unityJsbState.atoms.get(prop);
    const thisVal = context.runtime.objects.get(this_obj);
    const func = thisVal[propVal];
    // const func = Reflect.get(thisVal, propVal);

    const args = context.runtime.objects.batchGet(argv, argc);

    const val = func.apply(thisVal, args);

    context.runtime.objects.push(val, ptr);
  },

  JS_Call(ptr, ctx, func_obj, this_obj, argc, argv) {
    var context = unityJsbState.getContext(ctx);
    const func = context.runtime.objects.get(func_obj);
    const thisVal = context.runtime.objects.get(this_obj);

    const args = context.runtime.objects.batchGet(argv, argc);

    const val = func.apply(thisVal, args);

    context.runtime.objects.push(val, ptr);
  },

  JS_CallConstructor(ptr, ctx, func_obj, argc, argv) {
    var context = unityJsbState.getContext(ctx);
    const func = context.runtime.objects.get(func_obj);

    const args = context.runtime.objects.batchGet(argv, argc);

    const val = Reflect.construct(func, args);

    context.runtime.objects.push(val, ptr);
  },

  JS_SetConstructor(ctx, ctor, proto) {
    var context = unityJsbState.getContext(ctx);
    var ctorVal = context.runtime.objects.get(ctor);
    var protoVal = context.runtime.objects.get(proto);
    ctorVal.prototype = protoVal;
  },

  JS_SetPrototype(ctx, obj, proto) {
    var context = unityJsbState.getContext(ctx);
    var objVal = context.runtime.objects.get(obj);
    var protoVal = context.runtime.objects.get(proto);
    Reflect.setPrototypeOf(objVal, protoVal);

    return true;
  },

  JS_DefineProperty(ctx, this_obj, prop, val, getter, setter, flags) {
    var context = unityJsbState.getContext(ctx);

    const thisVal = context.runtime.objects.get(this_obj);
    const getterVal = context.runtime.objects.get(getter);
    const setterVal = context.runtime.objects.get(setter);
    const valVal = context.runtime.objects.get(val);
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
    var context = unityJsbState.getContext(ctx);

    const thisVal = context.runtime.objects.get(this_obj);
    const valVal = context.runtime.objects.get(val);
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
    var context = unityJsbState.getContext(ctx);
    var thisVal = context.runtime.objects.get(this_obj);
    var propVal = unityJsbState.atoms.get(prop);

    var res = Reflect.has(thisVal, propVal);

    return !!res;
  },

  JS_SetPropertyInternal(ctx, this_obj, prop, val, flags) {
    var context = unityJsbState.getContext(ctx);

    const thisVal = context.runtime.objects.get(this_obj);
    const valVal = context.runtime.objects.get(val);
    const propVal = unityJsbState.atoms.get(prop);

    const shouldThrow = !!(flags & JSPropFlags.JS_PROP_THROW) || !!(flags & JSPropFlags.JS_PROP_THROW_STRICT);

    try {
      // return !!Reflect.set(thisVal, propVal, valVal);
      thisVal[propVal] = valVal;
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

  JS_SetPropertyUint32(ctx, this_obj, idx, val) {
    var context = unityJsbState.getContext(ctx);

    const thisVal = context.runtime.objects.get(this_obj);
    const valVal = context.runtime.objects.get(val);
    const propVal = idx;

    // return !!Reflect.set(thisVal, propVal, valVal);
    thisVal[propVal] = valVal;
    return true;
  },

  jsb_get_payload_header(ret, ctx, val) {

    var context = unityJsbState.getContext(ctx);
    var obj = context.runtime.objects.get(val);

    var rec = context.runtime.objects.getPayload(obj);

    HEAP32[ret >> 2] = rec.type;
    HEAP32[(ret >> 2) + 1] = rec.payload;
  },

  JS_ToCStringLen2(ctx, len, val, cesu8) {
    var context = unityJsbState.getContext(ctx);

    var str = context.runtime.objects.get(val);


    if (typeof str === 'undefined') {
      HEAP32[(len >> 2)] = 0;
      return 0 as IntPtr;
    }

    var [buffer, length] = unityJsbState.bufferify(str);
    HEAP32[(len >> 2)] = length - 1;
    return buffer as IntPtr;
  },

  JS_FreeCString(ctx, ptr) {
    _free(ptr);
  },

  JS_GetArrayBuffer(ctx, psize, obj) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(obj);

    if (value instanceof ArrayBuffer) {
      HEAP32[psize >> 2] = value.byteLength;

      return value as any;
    }

    return 0 as IntPtr;
  },

  // #region Atoms

  JS_NewAtomLen(ctx, str, len) {
    var context = unityJsbState.getContext(ctx);
    var val = unityJsbState.stringify(str, len);

    return unityJsbState.atoms.push(val);
  },

  JS_AtomToString(ptr, ctx, atom) {
    var context = unityJsbState.getContext(ctx);

    var str = unityJsbState.atoms.get(atom);

    context.runtime.objects.push(str, ptr);
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

  JSB_ATOM_fileName() {
    return unityJsbState.atoms.push('fileName');
  },

  JSB_ATOM_Function() {
    return unityJsbState.atoms.push('Function');
  },

  JSB_ATOM_length() {
    return unityJsbState.atoms.push('length');
  },

  JSB_ATOM_lineNumber() {
    return unityJsbState.atoms.push('lineNumber');
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

  JSB_ATOM_Operators() {
    return unityJsbState.atoms.push('Operators');
  },

  JSB_ATOM_Symbol_operatorSet() {
    return unityJsbState.atoms.push('operatorSet');
  },

  // #endregion

  // #region Is

  JS_IsArray(ctx, val) {
    var context = unityJsbState.getContext(ctx);
    var valVal = context.runtime.objects.get(val);
    var res = Array.isArray(valVal);
    return !!res;
  },

  JS_IsConstructor(ctx, val) {
    var context = unityJsbState.getContext(ctx);
    var obj = context.runtime.objects.get(val);
    var res = !!obj.prototype && !!obj.prototype.constructor.name;
    return !!res;
  },

  JS_IsError(ctx, val) {
    var context = unityJsbState.getContext(ctx);
    var valVal = context.runtime.objects.get(val);
    var res = valVal instanceof Error;
    return !!res;
  },

  JS_IsFunction(ctx, val) {
    var context = unityJsbState.getContext(ctx);
    var valVal = context.runtime.objects.get(val);
    var res = typeof valVal === 'function';
    return !!res;
  },

  // #endregion

  JS_ParseJSON(ptr, ctx, buf, buf_len, filename) {
    var context = unityJsbState.getContext(ctx);
    var str = unityJsbState.stringify(buf as any, buf_len);
    var res = JSON.parse(str);
    context.runtime.objects.push(res, ptr);
  },

  JS_JSONStringify(ptr, ctx, obj, replacer, space) {
    var context = unityJsbState.getContext(ctx);
    var objVal = context.runtime.objects.get(obj);
    var rpVal = context.runtime.objects.get(replacer);
    var spVal = context.runtime.objects.get(space);

    var res = JSON.stringify(objVal, rpVal, spVal);
    context.runtime.objects.push(res, ptr);
  },

  // #region New

  JS_NewArray(ptr, ctx) {
    var context = unityJsbState.getContext(ctx);
    var res = [];
    context.runtime.objects.push(res, ptr);
  },

  JS_NewArrayBufferCopy(ptr, ctx, buf, len) {
    var context = unityJsbState.getContext(ctx);

    var nptr = _malloc(len);
    var res = new Uint8Array(HEAPU8.buffer, nptr, len);
    var existing = new Uint8Array(HEAPU8.buffer, buf, len);
    res.set(existing);

    context.runtime.objects.push(res, ptr);
  },

  JSB_NewFloat64(ptr, ctx, d) {
    var context = unityJsbState.getContext(ctx);
    context.runtime.objects.push(d, ptr);
  },

  JSB_NewInt64(ptr, ctx, d) {
    var context = unityJsbState.getContext(ctx);
    context.runtime.objects.push(d, ptr);
  },

  JS_NewObject(ptr, ctx) {
    var context = unityJsbState.getContext(ctx);
    var res = {};
    context.runtime.objects.push(res, ptr);
  },

  JS_NewString(ptr, ctx, str) {
    var context = unityJsbState.getContext(ctx);
    var res = unityJsbState.stringify(str);
    context.runtime.objects.push(res, ptr);
  },

  JS_NewStringLen(ptr, ctx, str, len) {
    var context = unityJsbState.getContext(ctx);

    var val = unityJsbState.stringify(str as any, len);

    context.runtime.objects.push(val, ptr);
  },

  JSB_NewEmptyString(ptr, ctx) {
    var context = unityJsbState.getContext(ctx);
    var res = "";
    context.runtime.objects.push(res, ptr);
  },

  // #endregion

  // #region Bridge

  JSB_NewCFunction(ret, ctx, func, atom, length, cproto, magic) {
    var context = unityJsbState.getContext(ctx);

    var name = unityJsbState.atoms.get(atom) || 'jscFunction';

    function jscFunction() {
      void name;
      const args = arguments;

      const thisObj = this === window ? context.globalObject : this;
      const thisPtr = context.runtime.objects.allocate(thisObj);
      const ret = _malloc(Sizes.JSValue) as JSValue;

      if (cproto === JSCFunctionEnum.JS_CFUNC_generic) {
        const argc = args.length;
        const argv = context.runtime.objects.batchAllocate(Array.from(args));
        unityJsbState.dynCall<typeof JSApiDelegates.JSCFunction>('viiiii', func, [ret, ctx, thisPtr, argc, argv]);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_setter) {
        const val = context.runtime.objects.allocate(args[0]);
        unityJsbState.dynCall<typeof JSApiDelegates.JSSetterCFunction>('viiii', func, [ret, ctx, thisPtr, val]);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_getter) {
        unityJsbState.dynCall<typeof JSApiDelegates.JSGetterCFunction>('viii', func, [ret, ctx, thisPtr]);
      }
      else {
        throw new Error('Unknown type of function specified: ' + cproto);
      }

      return context.runtime.objects.get(ret);
    };

    context.runtime.objects.push(jscFunction, ret);
  },

  JSB_NewCFunctionMagic(ret, ctx, func, atom, length, cproto, magic) {
    var context = unityJsbState.getContext(ctx);

    var name = unityJsbState.atoms.get(atom) || 'jscFunctionMagic';

    function jscFunctionMagic() {
      void name;
      const args = arguments;

      const thisObj = this === window ? context.globalObject : this;
      const thisPtr = context.runtime.objects.allocate(thisObj);
      const ret = _malloc(Sizes.JSValue) as JSValue;

      if (cproto === JSCFunctionEnum.JS_CFUNC_generic_magic) {
        const argc = args.length;
        const argv = context.runtime.objects.batchAllocate(Array.from(args));
        unityJsbState.dynCall<typeof JSApiDelegates.JSCFunctionMagic>('viiiiii', func, [ret, ctx, thisPtr, argc, argv, magic]);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_constructor_magic) {
        const argc = args.length;
        const argv = context.runtime.objects.batchAllocate(Array.from(args));
        unityJsbState.dynCall<typeof JSApiDelegates.JSCFunctionMagic>('viiiiii', func, [ret, ctx, thisPtr, argc, argv, magic]);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_setter_magic) {
        const val = context.runtime.objects.allocate(args[0]);
        unityJsbState.dynCall<typeof JSApiDelegates.JSSetterCFunctionMagic>('viiiii', func, [ret, ctx, thisPtr, val, magic]);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_getter_magic) {
        unityJsbState.dynCall<typeof JSApiDelegates.JSGetterCFunctionMagic>('viiii', func, [ret, ctx, thisPtr, magic]);
      }
      else {
        throw new Error('Unknown type of function specified: ' + cproto);
      }

      return context.runtime.objects.get(ret);
    };

    context.runtime.objects.push(jscFunctionMagic, ret);
  },

  jsb_new_bridge_object(ret, ctx, proto, object_id) {
    var context = unityJsbState.getContext(ctx);
    var protoVal = context.runtime.objects.get(proto);
    var res = Object.create(protoVal);
    context.runtime.objects.push(res, ret);
    context.runtime.objects.setPayload(res, BridgeObjectType.ObjectRef, object_id);
  },

  jsb_new_bridge_value(ret, ctx, proto, size) {
    var context = unityJsbState.getContext(ctx);
    var protoVal = context.runtime.objects.get(proto);
    var res = Object.create(protoVal) as BridgeStruct;
    res.$$values = new Array(size).fill(0);
    context.runtime.objects.push(res, ret);
  },

  JSB_NewBridgeClassObject(ret, ctx, new_target, object_id) {
    var context = unityJsbState.getContext(ctx);
    var res = context.runtime.objects.get(new_target);

    context.runtime.objects.push(res, ret);
    context.runtime.objects.setPayload(res, BridgeObjectType.ObjectRef, object_id);
  },

  JSB_NewBridgeClassValue(ret, ctx, new_target, size) {
    var context = unityJsbState.getContext(ctx);
    var res = context.runtime.objects.get(new_target) as BridgeStruct;
    res.$$values = new Array(size).fill(0);
    context.runtime.objects.push(res, ret);
  },

  JSB_GetBridgeClassID() {
    // TODO: I have no idea
    return 0;
  },

  jsb_construct_bridge_object(ret, ctx, ctor, object_id) {
    var context = unityJsbState.getContext(ctx);
    var ctorVal = context.runtime.objects.get(ctor);
    var res = Reflect.construct(ctorVal, []);
    context.runtime.objects.push(res, ret);
    context.runtime.objects.setPayload(res, BridgeObjectType.ObjectRef, object_id);
  },

  jsb_crossbind_constructor(ret, ctx, new_target) {
    var context = unityJsbState.getContext(ctx);
    var target = context.runtime.objects.get(new_target);
    // TODO: I have no idea
    var res = function () {
      return new target();
    };
    context.runtime.objects.push(res, ret);
  },

  // #endregion

  // #region Errors

  JSB_ThrowError(ret, ctx, buf, buf_len) {
    var context = unityJsbState.getContext(ctx);
    var str = unityJsbState.stringify(buf as any, buf_len);
    var err = new Error(str);
    console.error(err);
    context.runtime.objects.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowTypeError(ret, ctx, msg) {
    var context = unityJsbState.getContext(ctx);
    var str = 'Type Error';
    var err = new Error(str);
    console.error(err);
    context.runtime.objects.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowRangeError(ret, ctx, msg) {
    var context = unityJsbState.getContext(ctx);
    var str = 'Range Error';
    var err = new Error(str);
    console.error(err);
    context.runtime.objects.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowInternalError(ret, ctx, msg) {
    var context = unityJsbState.getContext(ctx);
    var str = 'Internal Error';
    var err = new Error(str);
    console.error(err);
    context.runtime.objects.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowReferenceError(ret, ctx, msg) {
    var context = unityJsbState.getContext(ctx);
    var str = 'Reference Error';
    var err = new Error(str);
    console.error(err);
    context.runtime.objects.push(err, ret);
    // TODO: throw?
  },

  // #endregion

  // #region Low level Set

  js_strndup(ctx, s, n) {
    var buffer = _malloc(n + 1);
    _memcpy(buffer, s, n);
    HEAPU8[buffer + n] = 0;
    return buffer as IntPtr;
  },

  jsb_set_floats(ctx, val, n, v0) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = HEAPF32[(v0 >> 2) + index];
      obj.$$values[index] = val;
    }

    return true;
  },

  jsb_set_bytes(ctx, val, n, v0) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = HEAP32[(v0 >> 2) + index];
      obj.$$values[index] = val;
    }

    return true;
  },

  jsb_set_byte_4(ctx, val, v0, v1, v2, v3) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];
    obj.$$values[2] = HEAP32[(v2 >> 2)];
    obj.$$values[3] = HEAP32[(v3 >> 2)];

    return true;
  },

  jsb_set_float_2(ctx, val, v0, v1) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAPF32[(v0 >> 2)];
    obj.$$values[1] = HEAPF32[(v1 >> 2)];

    return true;
  },

  jsb_set_float_3(ctx, val, v0, v1, v2) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAPF32[(v0 >> 2)];
    obj.$$values[1] = HEAPF32[(v1 >> 2)];
    obj.$$values[2] = HEAPF32[(v2 >> 2)];

    return true;
  },

  jsb_set_float_4(ctx, val, v0, v1, v2, v3) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAPF32[(v0 >> 2)];
    obj.$$values[1] = HEAPF32[(v1 >> 2)];
    obj.$$values[2] = HEAPF32[(v2 >> 2)];
    obj.$$values[3] = HEAPF32[(v3 >> 2)];

    return true;
  },

  jsb_set_int_1(ctx, val, v0) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 1;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];

    return true;
  },

  jsb_set_int_2(ctx, val, v0, v1) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];

    return true;
  },

  jsb_set_int_3(ctx, val, v0, v1, v2) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];
    obj.$$values[2] = HEAP32[(v2 >> 2)];

    return true;
  },

  jsb_set_int_4(ctx, val, v0, v1, v2, v3) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];
    obj.$$values[2] = HEAP32[(v2 >> 2)];
    obj.$$values[3] = HEAP32[(v3 >> 2)];

    return true;
  },

  // #endregion

  // #region Low Level Get

  jsb_get_bytes(ctx, val, n, v0) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = obj.$$values[index];
      HEAP32[(v0 >> 2) + index] = val;
    }

    return true;
  },

  jsb_get_floats(ctx, val, n, v0) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = obj.$$values[index];
      HEAPF32[(v0 >> 2) + index] = val;
    }

    return true;
  },

  jsb_get_byte_4(ctx, val, v0, v1, v2, v3) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];
    HEAP32[(v2 >> 2)] = obj.$$values[2];
    HEAP32[(v3 >> 2)] = obj.$$values[3];

    return true;
  },

  jsb_get_float_2(ctx, val, v0, v1) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAPF32[(v0 >> 2)] = obj.$$values[0];
    HEAPF32[(v1 >> 2)] = obj.$$values[1];

    return true;
  },

  jsb_get_float_3(ctx, val, v0, v1, v2) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAPF32[(v0 >> 2)] = obj.$$values[0];
    HEAPF32[(v1 >> 2)] = obj.$$values[1];
    HEAPF32[(v2 >> 2)] = obj.$$values[2];

    return true;
  },

  jsb_get_float_4(ctx, val, v0, v1, v2, v3) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAPF32[(v0 >> 2)] = obj.$$values[0];
    HEAPF32[(v1 >> 2)] = obj.$$values[1];
    HEAPF32[(v2 >> 2)] = obj.$$values[2];
    HEAPF32[(v3 >> 2)] = obj.$$values[3];

    return true;
  },

  jsb_get_int_1(ctx, val, v0) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 1;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];

    return true;
  },

  jsb_get_int_2(ctx, val, v0, v1) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];

    return true;
  },

  jsb_get_int_3(ctx, val, v0, v1, v2) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];
    HEAP32[(v2 >> 2)] = obj.$$values[2];

    return true;
  },

  jsb_get_int_4(ctx, val, v0, v1, v2, v3) {
    var context = unityJsbState.getContext(ctx);
    const obj = context.runtime.objects.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];
    HEAP32[(v2 >> 2)] = obj.$$values[2];
    HEAP32[(v3 >> 2)] = obj.$$values[3];

    return true;
  },

  // #endregion

  // #region To

  JS_ToFloat64(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(val);

    if (typeof value === 'number' || typeof value === 'bigint') {
      HEAPF64[pres >> 3] = Number(value);
      return false;
    }
    return -1;
  },


  JS_ToInt32(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(val);

    if (typeof value === 'number' || typeof value === 'bigint') {
      HEAP32[pres >> 2] = Number(value);
      return false;
    }

    return -1;
  },

  JS_ToInt64(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(val);
    if (typeof value === 'number' || typeof value === 'bigint') {
      unityJsbState.HEAP64()[pres >> 3] = BigInt(value);
      return false;
    }
    return -1;
  },

  JS_ToBigInt64(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(val);
    if (typeof value === 'number' || typeof value === 'bigint') {
      unityJsbState.HEAP64()[pres >> 3] = BigInt(value);
      return false;
    }
    return -1;
  },

  JS_ToIndex(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(val);
    if (typeof value === 'number' || typeof value === 'bigint') {
      unityJsbState.HEAPU64()[pres >> 3] = BigInt(value);
      return false;
    }
    return -1;
  },

  JSB_ToUint32(ctx, pres, val) {
    const context = unityJsbState.getContext(ctx);
    const value = context.runtime.objects.get(val);

    if (typeof value === 'number' || typeof value === 'bigint') {
      HEAPU32[pres >> 2] = Number(value);
      return false;
    }
    return -1;
  },

  JS_ToBool(ctx, val) {
    var context = unityJsbState.getContext(ctx);
    var objVal = context.runtime.objects.get(val);
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

autoAddDeps(UnityJSBPlugin, '$unityJsbState');
mergeInto(LibraryManager.library, UnityJSBPlugin);
