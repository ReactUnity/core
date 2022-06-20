export { };

declare global {
  var unityJsbState: PluginState;

  export declare type PluginState = {
    stringify: ((ptr: number | Pointer<number>, bufferLength?: number) => string);
    bufferify: ((str: string) => [number, number]);
    dynCall: typeof dynCall;
    runtimes: Record<string, PluginRuntime | undefined>;
    contexts: Record<string, PluginContext | undefined>;
    lastRuntimeId: number;
    lastContextId: number;
    atoms?: PluginAtoms;
    createObjects: () => PluginObjects;
    createAtoms: () => PluginAtoms;

    getRuntime: (ctx: JSRuntime) => PluginRuntime;
    getContext: (ctx: JSContext) => PluginContext;

    HEAP64: () => BigInt64Array;
    HEAPU64: () => BigUint64Array;
  }

  export declare type PluginRuntime = {
    id: number;
    opaque?: any;
    contexts: Record<string, PluginContext | undefined>;
    objects: PluginObjects;
    garbageCollect(): number;
  };

  export declare type PluginContext = {
    id: number;
    opaque?: any;
    runtime: PluginRuntime;
    runtimeId: number;

    window: Window;
    globalObject: Window;
    globalObjectId?: number;

    evaluate: ((script: string, filename?: string) => any);
    lastException?: Error;
  };

  export declare type PluginAtoms = {
    record: Record<number, PluginAtom>;
    map: Record<string, PluginAtom>;
    get: ((ref: JSAtom) => string);
    lastId: number;
    push: ((str: string) => JSAtom);
    pushId: ((id: JSAtom) => JSAtom);
    pop: ((ref: JSAtom) => void);
  };

  export declare type PluginAtom = {
    id: number;
    value: string;
    refCount: number;
  }

  export declare type PluginObjects = {
    deleteRecord: (id: number) => void;
    record: Record<string | number, PluginObject>;
    get: ((ref: JSValue) => any);
    getRecord: ((ref: JSValue) => PluginObject);
    push: ((obj: any, ptr: JSValue) => number | undefined);
    duplicate: ((obj: JSValue, ptr: JSValue) => void);
    duplicateId: ((id: number, ptr: JSValue) => void);
    pop: ((obj: JSValue) => void);
    popId: ((id: number | undefined) => void);
    allocate: ((obj: any) => [JSValue, number | undefined]);
    batchAllocate: ((objs: any[]) => [PointerArray<JSValue>, (number | undefined)[]]);
    batchGet: ((arr: PointerArray<JSValue>, count: number) => any[]);
    lastId: number;
    setPayload: ((obj: any, type: BridgeObjectType, payload: number) => void);
    getPayload: ((obj: any) => PluginObjectPayload);
    clearPayload: ((obj: any) => void);
    payloadMap: Map<any, PluginObjectPayload>;
  };

  export declare type PluginObject = {
    id: number;
    refCount: number;
    tag: Tags;
    value: any;
  };

  export declare type PluginObjectPayload = {
    type: BridgeObjectType;
    payload: number;
  };

  export declare type BridgeStruct = {
    $$values: number[];
  };

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

  const enum Tags {
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
  }

  const enum Constants {
    VERSION = 0x010704,
    CS_JSB_VERSION = 0xa,

    JS_WRITE_OBJ_BYTECODE = 1 << 0, /* allow function/module */
    JS_WRITE_OBJ_BSWAP = 1 << 1, /* byte swapped output */
    JS_WRITE_OBJ_SAB = 1 << 2, /* allow SharedArrayBuffer */
    JS_WRITE_OBJ_REFERENCE = 1 << 3, /* allow object references to encode arbitrary object graph */
    JS_READ_OBJ_BYTECODE = 1 << 0, /* allow function/module */
    JS_READ_OBJ_ROM_DATA = 1 << 1, /* avoid duplicating 'buf' data */
    JS_READ_OBJ_SAB = 1 << 2, /* allow SharedArrayBuffer */
    JS_READ_OBJ_REFERENCE = 1 << 3, /* allow object references */
  }

  const enum JSEvalFlags {
    JS_EVAL_TYPE_GLOBAL = (0 << 0) /* global code (default) */,
    JS_EVAL_TYPE_MODULE = (1 << 0) /* module code */,
    JS_EVAL_TYPE_DIRECT = (2 << 0) /* direct call (internal use) */,
    JS_EVAL_TYPE_INDIRECT = (3 << 0) /* indirect call (internal use) */,
    JS_EVAL_TYPE_MASK = (3 << 0),

    JS_EVAL_FLAG_STRICT = (1 << 3) /* force 'strict' mode */,
    JS_EVAL_FLAG_STRIP = (1 << 4) /* force 'strip' mode */,

    /* compile but do not run. The result is an object with a
       JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
       with JS_EvalFunction(). */
    JS_EVAL_FLAG_COMPILE_ONLY = (1 << 5),

    /* don't include the stack frames before this eval in the Error() backtraces */
    JS_EVAL_FLAG_BACKTRACE_BARRIER = (1 << 6),
  }


  const enum BridgeObjectType {
    None = 0,
    TypeRef = 1,
    ObjectRef = 2,
    ValueType = 3,
  }

  const enum JSCFunctionEnum {
    /* XXX: should rename for namespace isolation */
    JS_CFUNC_generic = 0,
    JS_CFUNC_generic_magic = 1,
    JS_CFUNC_constructor = 2, // unused in jsb
    JS_CFUNC_constructor_magic = 3,
    JS_CFUNC_constructor_or_func = 4, // unused in jsb
    JS_CFUNC_constructor_or_func_magic = 5, // unused in jsb
    JS_CFUNC_f_f = 6, // unused in jsb
    JS_CFUNC_f_f_f = 7, // unused in jsb
    JS_CFUNC_getter = 8,
    JS_CFUNC_setter = 9,
    JS_CFUNC_getter_magic = 10,
    JS_CFUNC_setter_magic = 11,
    JS_CFUNC_iterator_next = 12, // unused in jsb
  }


  const enum Sizes {
    JSPayloadHeader = 8,
    JSValueUnion = 8,
    JSValue = 16,
    JSAtom = 4,
    Single = 4,
    Double = 8,
  }
}
