export { };

declare global {
  export interface Pointer<T> {
    type?: T;
    __pointer: true;
  }

  type Byte = number;

  export declare namespace System {
    export type Int64 = number;
    export type IntPtr = number;
    export type UInt32 = number;
  }

  export declare namespace QuickJS {
    export type JSPayloadHeader = number;

    export namespace Native {
      export type JSValue = number;
      export type JSAtom = number;
      export type JSContext = number;
      export type JSRuntime = number;
      export type JSModuleDef = number;
      export type JSClassID = number;
      export type JSMemoryUsage = number;
      export type size_t = number;
    }
  }

  export declare interface JSApiExternals {
    static JS_SetModuleLoaderFunc(rt: QuickJS.Native.JSRuntime, module_normalize: System.IntPtr, module_loader: System.IntPtr, opaque: System.IntPtr): void;
    static JS_GetImportMeta(ctx: QuickJS.Native.JSContext, m: QuickJS.Native.JSModuleDef): QuickJS.Native.JSValue;
    static JSB_GetBridgeClassID(): QuickJS.Native.JSClassID;
    static jsb_construct_bridge_object(ctx: QuickJS.Native.JSContext, proto: QuickJS.Native.JSValue, object_id: number): QuickJS.Native.JSValue;
    static jsb_new_bridge_object(ctx: QuickJS.Native.JSContext, proto: QuickJS.Native.JSValue, object_id: number): QuickJS.Native.JSValue;
    static JSB_NewBridgeClassObject(ctx: QuickJS.Native.JSContext, new_target: QuickJS.Native.JSValue, object_id: number): QuickJS.Native.JSValue;
    static jsb_new_bridge_value(ctx: QuickJS.Native.JSContext, proto: QuickJS.Native.JSValue, size: System.UInt32): QuickJS.Native.JSValue;
    static JSB_NewBridgeClassValue(ctx: QuickJS.Native.JSContext, new_target: QuickJS.Native.JSValue, size: number): QuickJS.Native.JSValue;
    static JSB_FreePayload(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): QuickJS.JSPayloadHeader;
    static jsb_get_payload_header(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): QuickJS.JSPayloadHeader;
    static jsb_get_floats(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, n: number, v0: Pointer<number>): number;
    static jsb_set_floats(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, n: number, v0: Pointer<number>): number;
    static jsb_set_float_2(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number, v1: number): number;
    static jsb_set_float_3(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number, v1: number, v2: number): number;
    static jsb_set_float_4(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number, v1: number, v2: number, v3: number): number;
    static jsb_set_int_1(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number): number;
    static jsb_set_int_2(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number, v1: number): number;
    static jsb_set_int_3(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number, v1: number, v2: number): number;
    static jsb_set_int_4(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: number, v1: number, v2: number, v3: number): number;
    static jsb_set_byte_4(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, v0: Byte, v1: Byte, v2: Byte, v3: Byte): number;
    static jsb_get_bytes(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, n: number, v0: Pointer<Byte>): number;
    static jsb_set_bytes(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, n: number, v0: Pointer<Byte>): number;
    static JSB_NewRuntime(class_finalizer: System.IntPtr): QuickJS.Native.JSRuntime;
    static JSB_GetRuntimeOpaque(rt: QuickJS.Native.JSRuntime): System.IntPtr;
    static JSB_SetRuntimeOpaque(rt: QuickJS.Native.JSRuntime, opaque: System.IntPtr): void;
    static JSB_FreeRuntime(rt: QuickJS.Native.JSRuntime): number;
    static JS_GetRuntime(ctx: QuickJS.Native.JSContext): QuickJS.Native.JSRuntime;
    static JS_NewContext(rt: QuickJS.Native.JSRuntime): QuickJS.Native.JSContext;
    static JS_FreeContext(ctx: QuickJS.Native.JSContext): void;
    static JS_GetGlobalObject(ctx: QuickJS.Native.JSContext): QuickJS.Native.JSValue;
    static JS_IsInstanceOf(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue, obj: QuickJS.Native.JSValue): number;
    static JS_NewPromiseCapability(ctx: QuickJS.Native.JSContext, resolving_funcs: Pointer<QuickJS.Native.JSValue>): QuickJS.Native.JSValue;
    static JS_SetHostPromiseRejectionTracker(rt: QuickJS.Native.JSRuntime, cb: System.IntPtr, opaque: System.IntPtr): void;
    static JS_GetPropertyUint32(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, idx: System.UInt32): QuickJS.Native.JSValue;
    static JS_GetPropertyInternal(ctx: QuickJS.Native.JSContext, obj: QuickJS.Native.JSValue, prop: QuickJS.Native.JSAtom, receiver: QuickJS.Native.JSValue, throw_ref_error: number): QuickJS.Native.JSValue;
    static JS_GetPropertyStr(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, prop: string): QuickJS.Native.JSValue;
    static JS_DefineProperty(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, prop: QuickJS.Native.JSAtom, val: QuickJS.Native.JSValue, getter: QuickJS.Native.JSValue, setter: QuickJS.Native.JSValue, flags: QuickJS.Native.JSPropFlags): number;
    static JS_DefinePropertyValue(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, prop: QuickJS.Native.JSAtom, val: QuickJS.Native.JSValue, flags: QuickJS.Native.JSPropFlags): number;
    static JS_GetException(ctx: QuickJS.Native.JSContext): QuickJS.Native.JSValue;
    static JS_IsError(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): number;
    static JSB_ThrowError(ctx: QuickJS.Native.JSContext, buf: Pointer<Byte>, buf_len: QuickJS.Native.size_t): QuickJS.Native.JSValue;
    static JSB_ThrowTypeError(ctx: QuickJS.Native.JSContext, msg: Pointer<Byte>): QuickJS.Native.JSValue;
    static JSB_ThrowInternalError(ctx: QuickJS.Native.JSContext, msg: Pointer<Byte>): QuickJS.Native.JSValue;
    static JSB_ThrowRangeError(ctx: QuickJS.Native.JSContext, msg: Pointer<Byte>): QuickJS.Native.JSValue;
    static JSB_ThrowReferenceError(ctx: QuickJS.Native.JSContext, msg: Pointer<Byte>): QuickJS.Native.JSValue;
    static JSB_NewEmptyString(ctx: QuickJS.Native.JSContext): QuickJS.Native.JSValue;
    static JS_NewString(ctx: QuickJS.Native.JSContext, str: Pointer<Byte>): QuickJS.Native.JSValue;
    static JS_NewStringLen(ctx: QuickJS.Native.JSContext, buf: Pointer<Byte>, buf_len: QuickJS.Native.size_t): QuickJS.Native.JSValue;
    static JSB_NewInt64(ctx: QuickJS.Native.JSContext, val: System.Int64): QuickJS.Native.JSValue;
    static JSB_NewFloat64(ctx: QuickJS.Native.JSContext, d: number): QuickJS.Native.JSValue;
    static JS_NewAtomLen(ctx: QuickJS.Native.JSContext, str: Pointer<Byte>, len: QuickJS.Native.size_t): QuickJS.Native.JSAtom;
    static JS_DupAtom(ctx: QuickJS.Native.JSContext, v: QuickJS.Native.JSAtom): QuickJS.Native.JSAtom;
    static JS_FreeAtom(ctx: QuickJS.Native.JSContext, v: QuickJS.Native.JSAtom): void;
    static JS_AtomToString(ctx: QuickJS.Native.JSContext, atom: QuickJS.Native.JSAtom): QuickJS.Native.JSValue;
    static jsb_crossbind_constructor(ctx: QuickJS.Native.JSContext, new_target: QuickJS.Native.JSValue): QuickJS.Native.JSValue;
    static JS_NewObject(ctx: QuickJS.Native.JSContext): QuickJS.Native.JSValue;
    static JS_IsFunction(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): number;
    static JS_IsConstructor(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): number;
    static JS_NewArray(ctx: QuickJS.Native.JSContext): QuickJS.Native.JSValue;
    static JS_IsArray(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): number;
    static JS_GetContextOpaque(ctx: QuickJS.Native.JSContext): System.IntPtr;
    static JS_SetContextOpaque(ctx: QuickJS.Native.JSContext, opaque: System.IntPtr): void;
    static JSB_NewCFunctionMagic(ctx: QuickJS.Native.JSContext, func: System.IntPtr, atom: QuickJS.Native.JSAtom, length: number, cproto: QuickJS.Native.JSCFunctionEnum, magic: number): QuickJS.Native.JSValue;
    static JSB_NewCFunction(ctx: QuickJS.Native.JSContext, func: System.IntPtr, atom: QuickJS.Native.JSAtom, length: number, cproto: QuickJS.Native.JSCFunctionEnum, magic: number): QuickJS.Native.JSValue;
    static JS_SetConstructor(ctx: QuickJS.Native.JSContext, func_obj: QuickJS.Native.JSValue, proto: QuickJS.Native.JSValue): void;
    static JS_SetPropertyInternal(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, prop: QuickJS.Native.JSAtom, val: QuickJS.Native.JSValue, flags: number): number;
    static JS_SetPropertyUint32(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, idx: System.UInt32, val: QuickJS.Native.JSValue): number;
    static JS_HasProperty(ctx: QuickJS.Native.JSContext, this_obj: QuickJS.Native.JSValue, prop: QuickJS.Native.JSAtom): number;
    static JS_ParseJSON(ctx: QuickJS.Native.JSContext, buf: Pointer<Byte>, buf_len: QuickJS.Native.size_t, filename: Pointer<Byte>): QuickJS.Native.JSValue;
    static JS_JSONStringify(ctx: QuickJS.Native.JSContext, obj: QuickJS.Native.JSValue, replacer: QuickJS.Native.JSValue, space0: QuickJS.Native.JSValue): QuickJS.Native.JSValue;
    static JS_CallConstructor(ctx: QuickJS.Native.JSContext, func_obj: QuickJS.Native.JSValue, argc: number, argv: Pointer<QuickJS.Native.JSValue>): QuickJS.Native.JSValue;
    static JS_Call(ctx: QuickJS.Native.JSContext, func_obj: QuickJS.Native.JSValue, this_obj: QuickJS.Native.JSValue, argc: number, argv: Pointer<QuickJS.Native.JSValue>): QuickJS.Native.JSValue;
    static JS_Invoke(ctx: QuickJS.Native.JSContext, this_val: QuickJS.Native.JSValue, atom: QuickJS.Native.JSAtom, argc: number, argv: Pointer<QuickJS.Native.JSValue>): QuickJS.Native.JSValue;
    static JS_SetPrototype(ctx: QuickJS.Native.JSContext, obj: QuickJS.Native.JSValue, proto_val: QuickJS.Native.JSValue): number;
    static JS_RunGC(rt: QuickJS.Native.JSRuntime): void;
    static JS_ToBool(ctx: QuickJS.Native.JSContext, val: QuickJS.Native.JSValue): number;
    static js_free(ctx: QuickJS.Native.JSContext, ptr: System.IntPtr): void;
    static JS_ReadObject(ctx: QuickJS.Native.JSContext, buf: Pointer<Byte>, buf_len: QuickJS.Native.size_t, flags: number): QuickJS.Native.JSValue;
    static JS_Eval(ctx: QuickJS.Native.JSContext, input: Pointer<Byte>, input_len: QuickJS.Native.size_t, filename: Pointer<Byte>, eval_flags: QuickJS.Native.JSEvalFlags): QuickJS.Native.JSValue;
    static JS_EvalFunction(ctx: QuickJS.Native.JSContext, fun_obj: QuickJS.Native.JSValue): QuickJS.Native.JSValue;
    static JS_ResolveModule(ctx: QuickJS.Native.JSContext, obj: QuickJS.Native.JSValue): number;
    static JSB_DupValue(ctx: QuickJS.Native.JSContext, v: QuickJS.Native.JSValue): QuickJS.Native.JSValue;
    static JSB_FreeValue(ctx: QuickJS.Native.JSContext, v: QuickJS.Native.JSValue): void;
    static JSB_FreeValueRT(rt: QuickJS.Native.JSRuntime, v: QuickJS.Native.JSValue): void;
    static JSB_ATOM_Proxy(): QuickJS.Native.JSAtom;
    static JSB_ATOM_constructor(): QuickJS.Native.JSAtom;
    static JSB_ATOM_Number(): QuickJS.Native.JSAtom;
    static JSB_ATOM_Object(): QuickJS.Native.JSAtom;
    static JSB_ATOM_String(): QuickJS.Native.JSAtom;
    static JSB_ATOM_Function(): QuickJS.Native.JSAtom;
    static JSB_ATOM_Error(): QuickJS.Native.JSAtom;
    static JS_AddIntrinsicOperators(ctx: QuickJS.Native.JSContext): void;
    static JSB_ATOM_Operators(): QuickJS.Native.JSAtom;
    static JSB_ATOM_Symbol_operatorSet(): QuickJS.Native.JSAtom;
    static JSB_ATOM_name(): QuickJS.Native.JSAtom;
    static JSB_ATOM_message(): QuickJS.Native.JSAtom;
    static JSB_ATOM_fileName(): QuickJS.Native.JSAtom;
    static JSB_ATOM_lineNumber(): QuickJS.Native.JSAtom;
    static JSB_ATOM_length(): QuickJS.Native.JSAtom;
    static JSB_ATOM_stack(): QuickJS.Native.JSAtom;
    static JSB_ATOM_prototype(): QuickJS.Native.JSAtom;
    static JSB_Init(): number;
    static JS_FreeCString(ctx: QuickJS.Native.JSContext, ptr: System.IntPtr): void;
    static js_strndup(ctx: QuickJS.Native.JSContext, s: Pointer<Byte>, n: QuickJS.Native.size_t): System.IntPtr;
    static JS_NewArrayBufferCopy(ctx: QuickJS.Native.JSContext, buf: Pointer<Byte>, len: QuickJS.Native.size_t): QuickJS.Native.JSValue;
    static JS_ComputeMemoryUsage(rt: QuickJS.Native.JSRuntime, s: Pointer<QuickJS.Native.JSMemoryUsage>): void;
    static JS_SetInterruptHandler(rt: QuickJS.Native.JSRuntime, cb: System.IntPtr, opaque: System.IntPtr): void;
  }
}
