/**
 * Build with the following command:
 * npx -p typescript tsc
 *
 * BEWARE: Using some syntaxes will make Emscripten fail while building
 * Such known syntaxes: Object spread (...), BigInt literals
 * The output is targeted for es5 as Emscripten only understands that syntax
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

    dynCall: function () { return (typeof Runtime !== 'undefined' ? Runtime.dynCall : dynCall).apply(typeof Runtime !== 'undefined' ? Runtime : undefined, arguments); },
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
    iframe.name = 'unity-jsb-context-' + id;
    iframe.style.display = 'none';
    document.head.appendChild(iframe);

    const contentWindow = iframe.contentWindow! as typeof window;
    const fetch = contentWindow.fetch.bind(contentWindow);
    const URL = contentWindow.URL;
    const XMLHttpRequest = contentWindow.XMLHttpRequest;
    const XMLHttpRequestUpload = contentWindow.XMLHttpRequestUpload;
    const WebSocket = contentWindow.WebSocket;

    let baseTag: HTMLBaseElement = null;

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
      const sourceMap = !filename ? '' : '\n//# sourceURL=unity-jsb:///' + filename;

      return (function (evalCode) {
        //@ts-ignore
        with (globals) {
          return eval(evalCode);
        }
      }).call(globals, code + sourceMap);
    };


    const context: PluginContext = {
      id,
      runtime,
      runtimeId: rtId,
      window,
      globalObject: globals,
      evaluate,
      iframe,
      contentWindow,

      free() {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);

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

      const res = context.evaluate(code, filenameStr);

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

  JSB_FreePayload(ret, ctx, val) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val);

    const payload = context.runtime.refs.getPayload(obj);
    HEAP32[ret >> 2] = payload.type;
    HEAP32[(ret >> 2) + 1] = payload.payload;

    context.runtime.refs.clearPayload(obj);
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

  JS_GetPropertyInternal(ptr, ctxId, val, prop, receiver, throwRefError) {
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

  JS_SetPropertyInternal(ctx, this_obj, prop, val, flags) {
    const context = unityJsbState.getContext(ctx);
    const runtime = context.runtime;

    const thisVal = runtime.refs.get(this_obj);
    const valVal = runtime.refs.get(val);
    const propVal = unityJsbState.atoms.get(prop);

    // SetProperty frees the value automatically
    runtime.refs.pop(val);

    const shouldThrow = !!(flags & JSPropFlags.JS_PROP_THROW) || !!(flags & JSPropFlags.JS_PROP_THROW_STRICT);

    try {
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
    const context = unityJsbState.getContext(ctx);
    const valVal = context.runtime.refs.get(val);
    const res = Array.isArray(valVal);
    return !!res;
  },

  JS_IsConstructor(ctx, val) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val);
    const res = !!obj.prototype && !!obj.prototype.constructor.name;
    return !!res;
  },

  JS_IsError(ctx, val) {
    const context = unityJsbState.getContext(ctx);
    const valVal = context.runtime.refs.get(val);
    const res = valVal instanceof Error;
    return !!res;
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

  JS_NewString(ptr, ctx, str) {
    const context = unityJsbState.getContext(ctx);
    const res = unityJsbState.stringify(str);
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
        unityJsbState.dynCall<typeof JSApiDelegates.JSCFunction>('viiiii', func, [ret, ctx, thisPtr, argc, argv]);
        argIds.forEach(refs.popId);
        _free(argv);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_setter) {
        const [val, valId] = refs.allocate(args[0]);
        unityJsbState.dynCall<typeof JSApiDelegates.JSSetterCFunction>('viiii', func, [ret, ctx, thisPtr, val]);
        refs.popId(valId);
        _free(val);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_getter) {
        unityJsbState.dynCall<typeof JSApiDelegates.JSGetterCFunction>('viii', func, [ret, ctx, thisPtr]);
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
        unityJsbState.dynCall<typeof JSApiDelegates.JSCFunctionMagic>('viiiiii', func, [ret, ctx, thisPtr, argc, argv, magic]);
        argIds.forEach(refs.popId);
        _free(argv);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_constructor_magic) {
        const argc = args.length;
        const [argv, argIds] = refs.batchAllocate(Array.from(args));
        unityJsbState.dynCall<typeof JSApiDelegates.JSCFunctionMagic>('viiiiii', func, [ret, ctx, thisPtr, argc, argv, magic]);
        argIds.forEach(refs.popId);
        _free(argv);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_setter_magic) {
        const [val, valId] = refs.allocate(args[0]);
        unityJsbState.dynCall<typeof JSApiDelegates.JSSetterCFunctionMagic>('viiiii', func, [ret, ctx, thisPtr, val, magic]);
        refs.popId(valId);
        _free(val);
      }
      else if (cproto === JSCFunctionEnum.JS_CFUNC_getter_magic) {
        unityJsbState.dynCall<typeof JSApiDelegates.JSGetterCFunctionMagic>('viiii', func, [ret, ctx, thisPtr, magic]);
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

  JSB_GetBridgeClassID() {
    // TODO: I have no idea
    return 0;
  },

  jsb_construct_bridge_object(ret, ctx, ctor, object_id) {
    const context = unityJsbState.getContext(ctx);
    const ctorVal = context.runtime.refs.get(ctor);
    const res = Reflect.construct(ctorVal, []);
    context.runtime.refs.push(res, ret);
    context.runtime.refs.setPayload(res, BridgeObjectType.ObjectRef, object_id);
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

  JSB_ThrowError(ret, ctx, buf, buf_len) {
    const context = unityJsbState.getContext(ctx);
    const str = unityJsbState.stringify(buf as any, buf_len);
    const err = new Error(str);
    console.error(err);
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowTypeError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const str = 'Type Error';
    const err = new Error(str);
    console.error(err);
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowRangeError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const str = 'Range Error';
    const err = new Error(str);
    console.error(err);
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowInternalError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const str = 'Internal Error';
    const err = new Error(str);
    console.error(err);
    context.runtime.refs.push(err, ret);
    // TODO: throw?
  },

  JSB_ThrowReferenceError(ret, ctx, msg) {
    const context = unityJsbState.getContext(ctx);
    const str = 'Reference Error';
    const err = new Error(str);
    console.error(err);
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

  jsb_set_floats(ctx, val, n, v0) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = HEAPF32[(v0 >> 2) + index];
      obj.$$values[index] = val;
    }

    return true;
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

  jsb_set_byte_4(ctx, val, v0, v1, v2, v3) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];
    obj.$$values[2] = HEAP32[(v2 >> 2)];
    obj.$$values[3] = HEAP32[(v3 >> 2)];

    return true;
  },

  jsb_set_float_2(ctx, val, v0, v1) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAPF32[(v0 >> 2)];
    obj.$$values[1] = HEAPF32[(v1 >> 2)];

    return true;
  },

  jsb_set_float_3(ctx, val, v0, v1, v2) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAPF32[(v0 >> 2)];
    obj.$$values[1] = HEAPF32[(v1 >> 2)];
    obj.$$values[2] = HEAPF32[(v2 >> 2)];

    return true;
  },

  jsb_set_float_4(ctx, val, v0, v1, v2, v3) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAPF32[(v0 >> 2)];
    obj.$$values[1] = HEAPF32[(v1 >> 2)];
    obj.$$values[2] = HEAPF32[(v2 >> 2)];
    obj.$$values[3] = HEAPF32[(v3 >> 2)];

    return true;
  },

  jsb_set_int_1(ctx, val, v0) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 1;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];

    return true;
  },

  jsb_set_int_2(ctx, val, v0, v1) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];

    return true;
  },

  jsb_set_int_3(ctx, val, v0, v1, v2) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    obj.$$values[0] = HEAP32[(v0 >> 2)];
    obj.$$values[1] = HEAP32[(v1 >> 2)];
    obj.$$values[2] = HEAP32[(v2 >> 2)];

    return true;
  },

  jsb_set_int_4(ctx, val, v0, v1, v2, v3) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

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

  jsb_get_floats(ctx, val, n, v0) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = n / Sizes.Single;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    for (let index = 0; index < count; index++) {
      const val = obj.$$values[index];
      HEAPF32[(v0 >> 2) + index] = val;
    }

    return true;
  },

  jsb_get_byte_4(ctx, val, v0, v1, v2, v3) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];
    HEAP32[(v2 >> 2)] = obj.$$values[2];
    HEAP32[(v3 >> 2)] = obj.$$values[3];

    return true;
  },

  jsb_get_float_2(ctx, val, v0, v1) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAPF32[(v0 >> 2)] = obj.$$values[0];
    HEAPF32[(v1 >> 2)] = obj.$$values[1];

    return true;
  },

  jsb_get_float_3(ctx, val, v0, v1, v2) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAPF32[(v0 >> 2)] = obj.$$values[0];
    HEAPF32[(v1 >> 2)] = obj.$$values[1];
    HEAPF32[(v2 >> 2)] = obj.$$values[2];

    return true;
  },

  jsb_get_float_4(ctx, val, v0, v1, v2, v3) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 4;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAPF32[(v0 >> 2)] = obj.$$values[0];
    HEAPF32[(v1 >> 2)] = obj.$$values[1];
    HEAPF32[(v2 >> 2)] = obj.$$values[2];
    HEAPF32[(v3 >> 2)] = obj.$$values[3];

    return true;
  },

  jsb_get_int_1(ctx, val, v0) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 1;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];

    return true;
  },

  jsb_get_int_2(ctx, val, v0, v1) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 2;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];

    return true;
  },

  jsb_get_int_3(ctx, val, v0, v1, v2) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

    const count = 3;
    if (!Array.isArray(obj.$$values) || count >= obj.$$values.length) return false;

    HEAP32[(v0 >> 2)] = obj.$$values[0];
    HEAP32[(v1 >> 2)] = obj.$$values[1];
    HEAP32[(v2 >> 2)] = obj.$$values[2];

    return true;
  },

  jsb_get_int_4(ctx, val, v0, v1, v2, v3) {
    const context = unityJsbState.getContext(ctx);
    const obj = context.runtime.refs.get(val) as BridgeStruct;

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
