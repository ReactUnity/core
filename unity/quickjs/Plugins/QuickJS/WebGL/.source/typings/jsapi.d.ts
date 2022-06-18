export { };

declare global {
  // export type Pointer<T> = number & {
  //   type?: T;
  //   __pointer: true;
  // };

  export type Pointer<T> = number & {
    type?: T;
    __pointer: true;
  };

  export type PointerArray<T> = number & {
    type?: T;
    __pointerArray: true;
  };

  export type Out<T> = number & {
    type?: T;
    __out: true;
  };

  export type Boolish = boolean | -1;

  export type int = number;
  export type Byte = number;
  export type Int64 = number;
  export type UInt32 = number;

  export type IntPtr = Pointer<'IntPtr'>;
  export type JSPayloadHeader = Pointer<'JSPayloadHeader'>;
  export type JSValue = Pointer<'JSValue'>;
  export type JSValueConst = JSValue;
  export type JSAtom = UInt32;
  export type JSContext = UInt32;
  export type JSRuntime = UInt32;
  export type JSModuleDef = UInt32;
  export type JSClassID = UInt32;
  export type JSMemoryUsage = Pointer<'JSMemoryUsage'>;
  export type size_t = number;

  export declare interface JSApiExternals {
    static JS_SetModuleLoaderFunc(rt: JSRuntime, module_normalize: IntPtr, module_loader: IntPtr, opaque: IntPtr): void;
    static JS_GetImportMeta(returnValue: JSValue, ctx: JSContext, m: JSModuleDef);
    static JSB_GetBridgeClassID(): JSClassID;
    static jsb_construct_bridge_object(returnValue: JSValue, ctx: JSContext, proto: JSValue, object_id: number);
    static jsb_new_bridge_object(returnValue: JSValue, ctx: JSContext, proto: JSValue, object_id: number);
    static JSB_NewBridgeClassObject(returnValue: JSValue, ctx: JSContext, new_target: JSValue, object_id: number);
    static jsb_new_bridge_value(returnValue: JSValue, ctx: JSContext, proto: JSValue, size: UInt32);
    static JSB_NewBridgeClassValue(returnValue: JSValue, ctx: JSContext, new_target: JSValue, size: number);
    static JSB_FreePayload(returnValue: JSPayloadHeader, ctx: JSContext, val: JSValue);
    static jsb_get_payload_header(returnValue: JSPayloadHeader, ctx: JSContext, val: JSValue);
    static JSB_NewRuntime(class_finalizer: IntPtr): JSRuntime;
    static JSB_GetRuntimeOpaque(rt: JSRuntime): IntPtr;
    static JSB_SetRuntimeOpaque(rt: JSRuntime, opaque: IntPtr): void;
    static JSB_FreeRuntime(rt: JSRuntime): Boolish;
    static JS_GetRuntime(ctx: JSContext): JSRuntime;
    static JS_NewContext(rt: JSRuntime): JSContext;
    static JS_FreeContext(ctx: JSContext): void;
    static JS_GetGlobalObject(returnValue: JSValue, ctx: JSContext);
    static JS_IsInstanceOf(ctx: JSContext, val: JSValue, obj: JSValue): Boolish;
    static JS_NewPromiseCapability(returnValue: JSValue, ctx: JSContext, resolving_funcs: Pointer<JSValue>);
    static JS_SetHostPromiseRejectionTracker(rt: JSRuntime, cb: IntPtr, opaque: IntPtr): void;
    static JS_GetPropertyUint32(returnValue: JSValue, ctx: JSContext, this_obj: JSValue, idx: UInt32);
    static JS_GetPropertyInternal(returnValue: JSValue, ctx: JSContext, obj: JSValue, prop: JSAtom, receiver: JSValue, throw_ref_error: number);
    static JS_GetPropertyStr(returnValue: JSValue, ctx: JSContext, this_obj: JSValue, prop: Pointer<string>);
    static JS_DefineProperty(ctx: JSContext, this_obj: JSValue, prop: JSAtom, val: JSValue, getter: JSValue, setter: JSValue, flags: JSPropFlags): Boolish;
    static JS_DefinePropertyValue(ctx: JSContext, this_obj: JSValue, prop: JSAtom, val: JSValue, flags: JSPropFlags): Boolish;
    static JS_GetException(returnValue: JSValue, ctx: JSContext);
    static JS_IsError(ctx: JSContext, val: JSValue): Boolish;
    static JSB_ThrowError(returnValue: JSValue, ctx: JSContext, buf: Pointer<Byte>, buf_len: size_t);
    static JSB_ThrowTypeError(returnValue: JSValue, ctx: JSContext, msg: Pointer<Byte>);
    static JSB_ThrowInternalError(returnValue: JSValue, ctx: JSContext, msg: Pointer<Byte>);
    static JSB_ThrowRangeError(returnValue: JSValue, ctx: JSContext, msg: Pointer<Byte>);
    static JSB_ThrowReferenceError(returnValue: JSValue, ctx: JSContext, msg: Pointer<Byte>);
    static JSB_NewEmptyString(returnValue: JSValue, ctx: JSContext);
    static JS_NewString(returnValue: JSValue, ctx: JSContext, str: Pointer<Byte>);
    static JS_NewStringLen(returnValue: JSValue, ctx: JSContext, buf: Pointer<Byte>, buf_len: size_t);
    static JSB_NewInt64(returnValue: JSValue, ctx: JSContext, val: Int64);
    static JSB_NewFloat64(returnValue: JSValue, ctx: JSContext, d: number);
    static JS_NewAtomLen(ctx: JSContext, str: Pointer<Byte>, len: size_t): JSAtom;
    static JS_DupAtom(ctx: JSContext, v: JSAtom): JSAtom;
    static JS_FreeAtom(ctx: JSContext, v: JSAtom): void;
    static JS_AtomToString(returnValue: JSValue, ctx: JSContext, atom: JSAtom);
    static jsb_crossbind_constructor(returnValue: JSValue, ctx: JSContext, new_target: JSValue);
    static JS_NewObject(returnValue: JSValue, ctx: JSContext);
    static JS_IsFunction(ctx: JSContext, val: JSValue): Boolish;
    static JS_IsConstructor(ctx: JSContext, val: JSValue): Boolish;
    static JS_NewArray(returnValue: JSValue, ctx: JSContext);
    static JS_IsArray(ctx: JSContext, val: JSValue): Boolish;
    static JS_GetContextOpaque(ctx: JSContext): IntPtr;
    static JS_SetContextOpaque(ctx: JSContext, opaque: IntPtr): void;
    static JSB_NewCFunctionMagic(returnValue: JSValue, ctx: JSContext, func: IntPtr, atom: JSAtom, length: number, cproto: JSCFunctionEnum, magic: number);
    static JSB_NewCFunction(returnValue: JSValue, ctx: JSContext, func: IntPtr, atom: JSAtom, length: number, cproto: JSCFunctionEnum, magic: number);
    static JS_SetConstructor(ctx: JSContext, func_obj: JSValue, proto: JSValue): void;
    static JS_SetPropertyInternal(ctx: JSContext, this_obj: JSValue, prop: JSAtom, val: JSValue, flags: number): Boolish;
    static JS_SetPropertyUint32(ctx: JSContext, this_obj: JSValue, idx: UInt32, val: JSValue): Boolish;
    static JS_HasProperty(ctx: JSContext, this_obj: JSValue, prop: JSAtom): Boolish;
    static JS_ParseJSON(returnValue: JSValue, ctx: JSContext, buf: Pointer<Byte>, buf_len: size_t, filename: Pointer<Byte>);
    static JS_JSONStringify(returnValue: JSValue, ctx: JSContext, obj: JSValue, replacer: JSValue, space0: JSValue);
    static JS_CallConstructor(returnValue: JSValue, ctx: JSContext, func_obj: JSValue, argc: number, argv: PointerArray<JSValue>);
    static JS_Call(returnValue: JSValue, ctx: JSContext, func_obj: JSValue, this_obj: JSValue, argc: number, argv: PointerArray<JSValue>);
    static JS_Invoke(returnValue: JSValue, ctx: JSContext, this_val: JSValue, atom: JSAtom, argc: number, argv: PointerArray<JSValue>);
    static JS_SetPrototype(ctx: JSContext, obj: JSValue, proto_val: JSValue): Boolish;
    static JS_RunGC(rt: JSRuntime): void;
    static JS_ToBool(ctx: JSContext, val: JSValue): Boolish;
    static js_free(ctx: JSContext, ptr: IntPtr): void;
    static JS_ReadObject(returnValue: JSValue, ctx: JSContext, buf: Pointer<Byte>, buf_len: size_t, flags: number);
    static JS_Eval(returnValue: JSValue, ctx: JSContext, input: Pointer<Byte>, input_len: size_t, filename: Pointer<Byte>, eval_flags: JSEvalFlags);
    static JS_EvalFunction(returnValue: JSValue, ctx: JSContext, fun_obj: JSValue);
    static JS_ResolveModule(ctx: JSContext, obj: JSValue): number;
    static JSB_DupValue(returnValue: JSValue, ctx: JSContext, v: JSValue);
    static JSB_FreeValue(ctx: JSContext, v: JSValue): void;
    static JSB_FreeValueRT(rt: JSRuntime, v: JSValue): void;
    static JS_AddIntrinsicOperators(ctx: JSContext): void;
    static JSB_ATOM_Proxy(): JSAtom;
    static JSB_ATOM_constructor(): JSAtom;
    static JSB_ATOM_Number(): JSAtom;
    static JSB_ATOM_Object(): JSAtom;
    static JSB_ATOM_String(): JSAtom;
    static JSB_ATOM_Function(): JSAtom;
    static JSB_ATOM_Error(): JSAtom;
    static JSB_ATOM_Operators(): JSAtom;
    static JSB_ATOM_Symbol_operatorSet(): JSAtom;
    static JSB_ATOM_name(): JSAtom;
    static JSB_ATOM_message(): JSAtom;
    static JSB_ATOM_fileName(): JSAtom;
    static JSB_ATOM_lineNumber(): JSAtom;
    static JSB_ATOM_length(): JSAtom;
    static JSB_ATOM_stack(): JSAtom;
    static JSB_ATOM_prototype(): JSAtom;
    static JSB_Init(): number;
    static JS_FreeCString(ctx: JSContext, ptr: IntPtr): void;
    static js_strndup(ctx: JSContext, s: Pointer<Byte>, n: size_t): IntPtr;
    static JS_NewArrayBufferCopy(returnValue: JSValue, ctx: JSContext, buf: Pointer<Byte>, len: size_t);
    static JS_ComputeMemoryUsage(rt: JSRuntime, s: Pointer<JSMemoryUsage>): void;
    static JS_SetInterruptHandler(rt: JSRuntime, cb: IntPtr, opaque: IntPtr): void;

    static JS_IsJobPending(rt: JSRuntime, pctx: Out<JSContext>): Boolish;
    static JS_ExecutePendingJob(rt: JSRuntime, pctx: Out<JSContext>): Boolish;
    static JS_ToInt32(ctx: JSContext, pres: Out<number>, val: JSValue): Boolish;
    static JS_ToInt64(ctx: JSContext, pres: Out<number>, val: JSValue): Boolish;
    static JS_ToBigInt64(ctx: JSContext, pres: Out<number>, val: JSValue): Boolish;
    static JS_ToIndex(ctx: JSContext, plen: Out<number>, val: JSValue): Boolish;
    static JS_ToFloat64(ctx: JSContext, pres: Out<number>, val: JSValue): Boolish;
    static JSB_ToUint32(ctx: JSContext, pres: Out<number>, val: JSValue): Boolish;
    static JS_WriteObject(ctx: JSContext, psize: Out<number>, obj: JSValue, flags: number): IntPtr;
    static JS_ToCStringLen2(ctx: JSContext, len: Out<number>, val: JSValue, cesu8: boolean): IntPtr;
    static JS_GetArrayBuffer(ctx: JSContext, psize: Out<size_t>, obj: JSValue): IntPtr;

    static jsb_get_float_2(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>): Boolish;
    static jsb_get_float_3(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>, v2: Out<number>): Boolish;
    static jsb_get_float_4(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>, v2: Out<number>, v3: Out<number>): Boolish;
    static jsb_get_int_1(ctx: JSContext, val: JSValue, v0: Out<number>): Boolish;
    static jsb_get_int_2(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>): Boolish;
    static jsb_get_int_3(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>, v2: Out<number>): Boolish;
    static jsb_get_int_4(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>, v2: Out<number>, v3: Out<number>): Boolish;
    static jsb_get_byte_4(ctx: JSContext, val: JSValue, v0: Out<number>, v1: Out<number>, v2: Out<number>, v3: Out<number>): Boolish;
    static jsb_get_floats(ctx: JSContext, val: JSValue, n: number, v0: Pointer<number>): Boolish;
    static jsb_get_bytes(ctx: JSContext, val: JSValue, n: number, v0: Pointer<Byte>): Boolish;

    static jsb_set_floats(ctx: JSContext, val: JSValue, n: number, v0: Pointer<number>): Boolish;
    static jsb_set_float_2(ctx: JSContext, val: JSValue, v0: number, v1: number): Boolish;
    static jsb_set_float_3(ctx: JSContext, val: JSValue, v0: number, v1: number, v2: number): Boolish;
    static jsb_set_float_4(ctx: JSContext, val: JSValue, v0: number, v1: number, v2: number, v3: number): Boolish;
    static jsb_set_int_1(ctx: JSContext, val: JSValue, v0: number): Boolish;
    static jsb_set_int_2(ctx: JSContext, val: JSValue, v0: number, v1: number): Boolish;
    static jsb_set_int_3(ctx: JSContext, val: JSValue, v0: number, v1: number, v2: number): Boolish;
    static jsb_set_int_4(ctx: JSContext, val: JSValue, v0: number, v1: number, v2: number, v3: number): Boolish;
    static jsb_set_byte_4(ctx: JSContext, val: JSValue, v0: Byte, v1: Byte, v2: Byte, v3: Byte): Boolish;
    static jsb_set_bytes(ctx: JSContext, val: JSValue, n: number, v0: Pointer<Byte>): Boolish;
  }

  export declare class JSApiDelegates {
    static JSInterruptHandler(rt: JSRuntime, opaque: IntPtr): int;
    static JSHostPromiseRejectionTracker(ctx: JSContext, promise: JSValueConst, reason: JSValueConst, is_handled: bool, opaque: IntPtr): void;
    static JSModuleNormalizeFunc(ctx: JSContext, module_base_name: Pointer<string>, module_name: Pointer<string>, opaque: IntPtr): IntPtr;
    static JSModuleLoaderFunc(ctx: JSContext, module_name: Pointer<string>, opaque: IntPtr): JSModuleDef;
    static JSGCObjectFinalizer(rt: JSRuntime, header: JSPayloadHeader): void;
    static JSCFunction(returnValue: JSValue, ctx: JSContext, this_obj: JSValueConst, argc: int, argv: PointerArray<JSValueConst>);
    static JSCFunctionMagic(returnValue: JSValue, ctx: JSContext, this_obj: JSValueConst, argc: int, argv: PointerArray<JSValueConst>, magic: int);
    static JSSetterCFunction(returnValue: JSValue, ctx: JSContext, this_val: JSValueConst, val: JSValueConst);
    static JSSetterCFunctionMagic(returnValue: JSValue, ctx: JSContext, this_val: JSValueConst, val: JSValueConst, magic: int);
    static JSGetterCFunction(returnValue: JSValue, ctx: JSContext, this_val: JSValueConst);
    static JSGetterCFunctionMagic(returnValue: JSValue, ctx: JSContext, this_val: JSValueConst, magic: int);
    static JSLogCFunction(level: number, line: Pointer<string>): void;
    static JSWaitingForDebuggerCFunction(ctx: JSContext): void;
  }
}
