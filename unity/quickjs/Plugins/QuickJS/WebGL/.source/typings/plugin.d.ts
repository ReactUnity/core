export { };

declare global {
  var unityJsbState: PluginState;

  export declare type PluginState = {
    stringify: ((ptr: number | Pointer<string>, bufferLength?: number) => string);
    bufferify: ((str: string) => [number, number]);
    runtimes: Record<string, PluginRuntime | undefined>;
    contexts: Record<string, PluginContext | undefined>;
    lastRuntimeId: number;
    lastContextId: number;
    atoms?: AtomReferences;
    createObjectReferences: () => ObjectReferences;
    createAtoms: () => AtomReferences;

    getRuntime: (ctx: JSRuntime) => PluginRuntime;
    getContext: (ctx: JSContext) => PluginContext;
    getAnyValue: (val: JSValue) => any;

    moduleRegistryKey: string;
    moduleImportHook: string;
    moduleReservedNames: Record<string, boolean>;
    scanModule: (source: string) => ModuleScan;
    createModuleRegistry: (context: PluginContext) => ModuleRegistry;

    HEAP64: () => BigInt64Array;
    HEAPU64: () => BigUint64Array;
  }

  export declare type PluginRuntime = {
    id: number;
    opaque?: any;
    contexts: Record<string, PluginContext | undefined>;
    refs: ObjectReferences;
    isDestroyed: boolean;
    garbageCollect(): number;

    /** The host's asynchronous module loader, as installed by JS_SetModuleLoaderFuncAsync. */
    moduleNormalize?: IntPtr;
    moduleLoader?: IntPtr;
    moduleOpaque?: IntPtr;
    /** Loads handed to the host and not settled yet, by ticket. */
    pendingModuleLoads?: Record<number, ModuleLoadPending>;
    lastModuleLoadId?: number;
  };

  export declare type ModuleLoadPending = {
    resolve: (source: string) => void;
    reject: (error: any) => void;
  };

  /** A rewrite the assembled module text has to carry. */
  // `specifier` is the specifier as written, or null for the keyword of a dynamic import.
  export declare type ModuleEdit = {
    start: number;
    end: number;
    specifier: string | null;
  };

  export declare type ModuleScan = {
    edits: ModuleEdit[];
    /** Names declared at the module's top level, which the globals prelude must not shadow. */
    bindings: Record<string, boolean>;
    /** Every name the module uses as a free identifier - not after a `.`, not inside a string
     *  or a comment. The globals prelude declares nothing outside this set. */
    mentions: Record<string, boolean>;
  };

  export declare type ModuleRecord = {
    name: string;
    source: string;
    scan: ModuleScan;
    /** Specifier as written -> resolved module name. */
    deps: Record<string, string>;
    /** Settles once this module and everything below it has been fetched. */
    ready: Promise<ModuleRecord>;
    url: string;
  };

  export declare type ModuleRegistry = {
    /** Loads, links and evaluates a graph from the root's source. */
    evaluate: (name: string, source: string) => Promise<any>;
    /** The `import()` a module or script of the given referrer gets. */
    dynamicImport: (referrer: string) => (specifier: string) => Promise<any>;
    /** Points a script's dynamic imports at the host loader. */
    rewriteScript: (code: string) => string;
    free: () => void;
  };

  export declare type PluginContext = {
    id: number;
    opaque?: any;
    runtime: PluginRuntime;
    runtimeId: number;
    isDestroyed: boolean;

    window: Window;
    iframe: HTMLIFrameElement;
    contentWindow: Window;

    globalObject: Window;
    globalObjectId?: number;
    /** The object the host's own globals are installed on, behind the globalObject proxy. */
    hostGlobals: Record<string, any>;

    evaluate: ((script: string, filename?: string) => any);
    /** Native dynamic import, in the same realm `evaluate` runs in. */
    importModule: ((url: string) => Promise<any>);
    lastException?: Error;

    modules: ModuleRegistry;

    free(): void;
    setBaseUrl(url: string): void;
    createBlobUrl(text: string): string;
    revokeBlobUrl(url: string): void;
  };

  export declare type AtomReferences = {
    record: Record<number, AtomReference>;
    get: ((ref: JSAtom) => string);
    lastId: number;
    push: ((str: string) => JSAtom);
    pushId: ((id: JSAtom) => JSAtom);
    pop: ((ref: JSAtom) => void);
  };

  export declare type AtomReference = {
    id: number;
    value: string;
    refCount: number;
  }

  export declare type ObjectReferences = {
    deleteRecord: (id: number) => void;
    record: Record<number, ObjectReference>;
    get: ((ref: JSValue) => any);
    getRecord: ((ref: JSValue) => ObjectReference);
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
    getPayload: ((obj: any) => ObjectReferencePayload);
    clearPayload: ((obj: any) => void);
    payloadMap: Map<any, ObjectReferencePayload>;
  };

  export declare type ObjectReference = {
    id: number;
    refCount: number;
    tag: Tags;
    value: any;
  };

  export declare type ObjectReferencePayload = {
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
    JS_PROP_DEFINE_PROPERTY = (1 << 18) /* internal use */,
    JS_PROP_REFLECT_DEFINE_PROPERTY = (1 << 19) /* internal use */,

    // custom values
    CONST_VALUE = JS_PROP_HAS_VALUE | JS_PROP_ENUMERABLE,
    DEFAULT = JS_PROP_CONFIGURABLE | JS_PROP_ENUMERABLE,
    NONE = 0,
  }

  /* Transcribed from quickjs-ng's enum, and the same block as JSApi.cs: ng dropped
     BigDecimal and BigFloat and added STRING_ROPE and SHORT_BIG_INT, which moved five of
     these. SHORT_BIG_INT took 7, the slot FLOAT64 used to hold, so a stale copy of this
     writes every number with the tag the C# side reads as a bigint. */
  const enum Tags {
    JS_TAG_FIRST = -9, /* first negative tag */
    JS_TAG_BIG_INT = -9,
    JS_TAG_SYMBOL = -8,
    JS_TAG_STRING = -7,
    JS_TAG_STRING_ROPE = -6, /* lazily concatenated string; never produced here */
    JS_TAG_MODULE = -3, /* used internally */
    JS_TAG_FUNCTION_BYTECODE = -2, /* used internally */
    JS_TAG_OBJECT = -1,
    JS_TAG_INT = 0,
    JS_TAG_BOOL = 1,
    JS_TAG_NULL = 2,
    JS_TAG_UNDEFINED = 3,
    JS_TAG_UNINITIALIZED = 4,
    JS_TAG_CATCH_OFFSET = 5,
    JS_TAG_EXCEPTION = 6,
    JS_TAG_SHORT_BIG_INT = 7,
    JS_TAG_FLOAT64 = 8,
  }

  const enum Constants {
    VERSION = 0x010704,
    CS_JSB_VERSION = 0xa,

    JS_WRITE_OBJ_BYTECODE = 1 << 0, /* allow function/module */
    JS_WRITE_OBJ_BSWAP = 0, /* obsolete in ng, handled transparently */
    JS_WRITE_OBJ_SAB = 1 << 2, /* allow SharedArrayBuffer */
    JS_WRITE_OBJ_REFERENCE = 1 << 3, /* allow object references to encode arbitrary object graph */
    JS_WRITE_OBJ_STRIP_SOURCE = 1 << 4, /* do not write source code information */
    JS_WRITE_OBJ_STRIP_DEBUG = 1 << 5, /* do not write debug information */
    JS_READ_OBJ_BYTECODE = 1 << 0, /* allow function/module */
    JS_READ_OBJ_ROM_DATA = 0, /* obsolete in ng, broken by ICs */
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

    /* Bit 4 was 'strip' mode in Bellard's. In ng it asks for the module to come back with
       its dependencies unresolved, for the async loader to fetch them. */
    JS_EVAL_FLAG_ASYNC_LOAD = (1 << 4),

    /* compile but do not run. The result is an object with a
       JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
       with JS_EvalFunction(). */
    JS_EVAL_FLAG_COMPILE_ONLY = (1 << 5),

    /* don't include the stack frames before this eval in the Error() backtraces */
    JS_EVAL_FLAG_BACKTRACE_BARRIER = (1 << 6),

    /* allow top-level await in a normal script; JS_Eval then returns a promise */
    JS_EVAL_FLAG_ASYNC = (1 << 7),
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
