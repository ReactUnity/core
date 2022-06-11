using System;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

// Default Marshaling for Strings
// https://docs.microsoft.com/en-us/dotnet/framework/interop/default-marshaling-for-strings

// Marshaling a Delegate as a Callback Method
// https://docs.microsoft.com/en-us/dotnet/framework/interop/marshaling-a-delegate-as-a-callback-method

namespace QuickJS.Native
{
    using JSValueConst = JSValue;
    using JS_BOOL = Int32;
    using int32_t = Int32;
    using uint32_t = UInt32;
    using int64_t = Int64;
    using uint64_t = UInt64;

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate int JSInterruptHandler(JSRuntime rt, IntPtr opaque);

    /* is_handled = TRUE means that the rejection is handled */
#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate void JSHostPromiseRejectionTracker(JSContext ctx, JSValueConst promise, JSValueConst reason, JS_BOOL is_handled, IntPtr opaque);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public unsafe delegate IntPtr JSModuleNormalizeFunc(JSContext ctx, [MarshalAs(UnmanagedType.LPStr)] string module_base_name, [MarshalAs(UnmanagedType.LPStr)] string module_name, IntPtr opaque);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSModuleDef JSModuleLoaderFunc(JSContext ctx, [MarshalAs(UnmanagedType.LPStr)] string module_name, IntPtr opaque);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate void JSGCObjectFinalizer(JSRuntime rt, JSPayloadHeader header);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSValue JSCFunction(JSContext ctx, JSValueConst this_obj, int argc, [MarshalAs(UnmanagedType.LPArray, SizeParamIndex = 2)] JSValueConst[] argv);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSValue JSCFunctionMagic(JSContext ctx, JSValueConst this_obj, int argc, [MarshalAs(UnmanagedType.LPArray, SizeParamIndex = 2)] JSValueConst[] argv, int magic);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSValue JSSetterCFunction(JSContext ctx, JSValueConst this_val, JSValueConst val);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSValue JSSetterCFunctionMagic(JSContext ctx, JSValueConst this_val, JSValueConst val, int magic);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSValue JSGetterCFunction(JSContext ctx, JSValueConst this_val);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate JSValue JSGetterCFunctionMagic(JSContext ctx, JSValueConst this_val, int magic);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate void JSLogCFunction(int level, [MarshalAs(UnmanagedType.LPStr)] string line);

#if UNITY_EDITOR_WIN || UNITY_STANDALONE_WIN || JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
#endif
    public delegate void JSWaitingForDebuggerCFunction(JSContext ctx);

    public partial class JSApi
    {
        public const int VERSION = 0x010704;
        public const int CS_JSB_VERSION = 0xa; // expected dll version
        public static readonly int SO_JSB_VERSION; // actual dll version

#if JSB_NO_BIGNUM || ((UNITY_WSA || UNITY_WEBGL) && !UNITY_EDITOR) || JSB_WITH_V8_BACKEND
        public const bool IsOperatorOverloadingSupported = false;
#else
        public const bool IsOperatorOverloadingSupported = true;
#endif

#if (UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR
	    public const string JSBDLL = "__Internal";
#else
#if JSB_WITH_V8_BACKEND
        public const string JSBDLL = "v8-bridge";
#else
        public const string JSBDLL = "quickjs";
#endif
#endif

        public const int JS_TAG_FIRST = -11; /* first negative tag */
        public const int JS_TAG_BIG_DECIMAL = -11;
        public const int JS_TAG_BIG_INT = -10;
        public const int JS_TAG_BIG_FLOAT = -9;
        public const int JS_TAG_SYMBOL = -8;
        public const int JS_TAG_STRING = -7;
        public const int JS_TAG_MODULE = -3; /* used internally */
        public const int JS_TAG_FUNCTION_BYTECODE = -2; /* used internally */
        public const int JS_TAG_OBJECT = -1;

        public const int JS_TAG_INT = 0;
        public const int JS_TAG_BOOL = 1;
        public const int JS_TAG_NULL = 2;
        public const int JS_TAG_UNDEFINED = 3;
        public const int JS_TAG_EXCEPTION = 6;
        public const int JS_TAG_FLOAT64 = 7;

        // #define JS_WRITE_OBJ_BYTECODE (1 << 0) /* allow function/module */
        public const int JS_WRITE_OBJ_BYTECODE = 1 << 0; /* allow function/module */
        public const int JS_WRITE_OBJ_BSWAP = 1 << 1; /* byte swapped output */
        public const int JS_WRITE_OBJ_SAB = 1 << 2; /* allow SharedArrayBuffer */
        public const int JS_WRITE_OBJ_REFERENCE = 1 << 3; /* allow object references to
                                                             encode arbitrary object
                                                             graph */
        public const int JS_READ_OBJ_BYTECODE = 1 << 0; /* allow function/module */
        public const int JS_READ_OBJ_ROM_DATA = 1 << 1; /* avoid duplicating 'buf' data */
        public const int JS_READ_OBJ_SAB = 1 << 2; /* allow SharedArrayBuffer */
        public const int JS_READ_OBJ_REFERENCE = 1 << 3; /* allow object references */

        public static readonly JSValue[] EmptyValues = new JSValue[0];

        private static JSValue JS_MKVAL(long tag, int val)
        {
            return new JSValue() { u = new JSValueUnion() { int32 = val }, tag = tag };
        }

        public static readonly JSValue JS_NULL = JS_MKVAL(JS_TAG_NULL, 0);
        public static readonly JSValue JS_UNDEFINED = JS_MKVAL(JS_TAG_UNDEFINED, 0);
        public static readonly JSValue JS_FALSE = JS_MKVAL(JS_TAG_BOOL, 0);
        public static readonly JSValue JS_TRUE = JS_MKVAL(JS_TAG_BOOL, 1);

        static JSApi()
        {
            SO_JSB_VERSION = JSB_Init();
        }

        public static bool IsValid()
        {
            return CS_JSB_VERSION == SO_JSB_VERSION;
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern JSRuntime JSB_NewRuntime(IntPtr class_finalizer);

        public static JSRuntime JSB_NewRuntime(JSGCObjectFinalizer class_finalizer)
        {
            if (class_finalizer != null)
            {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
                GCHandle.Alloc(class_finalizer);
#endif
                var fn = Marshal.GetFunctionPointerForDelegate(class_finalizer);
                return JSB_NewRuntime(fn);
            }
            return JSB_NewRuntime(IntPtr.Zero);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr JSB_GetRuntimeOpaque(JSRuntime rt);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JSB_SetRuntimeOpaque(JSRuntime rt, IntPtr opaque);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JSB_FreeRuntime(JSRuntime rt);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSRuntime JS_GetRuntime(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSContext JS_NewContext(JSRuntime rt);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_FreeContext(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_GetGlobalObject(JSContext ctx);

        /// <summary>
        /// return TRUE, FALSE or (-1) in case of exception
        /// </summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_IsInstanceOf(JSContext ctx, JSValueConst val, JSValueConst obj);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_NewPromiseCapability(JSContext ctx, JSValue* resolving_funcs);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern void JS_SetHostPromiseRejectionTracker(JSRuntime rt, IntPtr cb, IntPtr opaque);

        public static void JS_SetHostPromiseRejectionTracker(JSRuntime rt, JSHostPromiseRejectionTracker cb, IntPtr opaque)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(cb);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(cb);
            JS_SetHostPromiseRejectionTracker(rt, fn, opaque);
        }

        public static unsafe JSValue JS_NewPromiseCapability(JSContext ctx, JSValue[] resolving_funcs)
        {
            fixed (JSValue* ptr = resolving_funcs)
            {
                return JS_NewPromiseCapability(ctx, ptr);
            }
        }

        public static unsafe JSValue JS_NewPromiseCapability(JSContext ctx, out JSValue on_resolve, out JSValue on_reject)
        {
            var resolving_funcs = stackalloc[] { JS_UNDEFINED, JS_UNDEFINED };
            var promise = JS_NewPromiseCapability(ctx, resolving_funcs);
            on_resolve = resolving_funcs[0];
            on_reject = resolving_funcs[1];
            return promise;
        }

        #region property
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_GetPropertyUint32(JSContext ctx, JSValueConst this_obj, uint32_t idx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_GetPropertyInternal(JSContext ctx, JSValueConst obj, JSAtom prop,
            JSValueConst receiver, JS_BOOL throw_ref_error);

        // 增引用, 需要 FreeValue
        public static JSValue JS_GetProperty(JSContext ctx, JSValueConst this_obj, JSAtom prop)
        {
            return JS_GetPropertyInternal(ctx, this_obj, prop, this_obj, 0);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_GetPropertyStr(JSContext ctx, JSValueConst this_obj,
            [MarshalAs(UnmanagedType.LPStr)] string prop);

        ///<summary>
        /// 不会减引用, getter/setter 需要自己 FreeValue
        ///</summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern int JS_DefineProperty(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValueConst val, JSValueConst getter, JSValueConst setter, JSPropFlags flags);

        public static int JS_DefineProperty(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValueConst getter, JSValueConst setter)
        {
            var flags = JSPropFlags.JS_PROP_CONFIGURABLE | JSPropFlags.JS_PROP_ENUMERABLE;
            if (!getter.IsUndefined())
            {
                flags |= JSPropFlags.JS_PROP_HAS_GET;
            }
            if (!setter.IsUndefined())
            {
                flags |= JSPropFlags.JS_PROP_HAS_SET;
                flags |= JSPropFlags.JS_PROP_WRITABLE;
            }
            return JS_DefineProperty(ctx, this_obj, prop, JS_UNDEFINED, getter, setter, flags);
        }

        // flags |=  JS_PROP_HAS_VALUE | JS_PROP_HAS_CONFIGURABLE | JS_PROP_HAS_WRITABLE | JS_PROP_HAS_ENUMERABLE;
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern int JS_DefinePropertyValue(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValue val, JSPropFlags flags);

        public static int JS_DefinePropertyValue(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValue val)
        {
            return JS_DefinePropertyValue(ctx, this_obj, prop, val, JSPropFlags.JS_PROP_C_W_E);
        }

        public static int JS_DefineConstPropertyValue(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValue val)
        {
            return JS_DefinePropertyValue(ctx, this_obj, prop, val, JSPropFlags.NONE);
        }

        #endregion

        #region error handling

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_GetException(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JS_BOOL JS_IsError(JSContext ctx, JSValueConst val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JSB_ThrowError(JSContext ctx, byte* buf, size_t buf_len);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JSB_ThrowTypeError(JSContext ctx, byte* msg);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JSB_ThrowInternalError(JSContext ctx, byte* msg);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JSB_ThrowRangeError(JSContext ctx, byte* msg);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JSB_ThrowReferenceError(JSContext ctx, byte* msg);

        #endregion

        #region new values

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JSB_NewEmptyString(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_NewString(JSContext ctx, byte* str);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_NewStringLen(JSContext ctx, byte* buf, size_t buf_len);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JSB_NewInt64(JSContext ctx, int64_t val);

        public static JSValue JS_NewBool(JSContext ctx, bool val)
        {
            return val ? JS_TRUE : JS_FALSE;
        }

        public static JSValue JS_NewInt32(JSContext ctx, int val)
        {
            return JS_MKVAL(JS_TAG_INT, val);
        }

        public static JSValue __JS_NewFloat64(JSContext ctx, double d)
        {
            JSValue v = new JSValue();
            v.tag = JS_TAG_FLOAT64;
            v.u.float64 = d;
            return v;
        }

        public static JSValue JS_NewUint32(JSContext ctx, uint32_t val)
        {
            JSValue v;
            if (val <= 0x7fffffff)
            {
                v = JS_NewInt32(ctx, (int)val);
            }
            else
            {
                v = __JS_NewFloat64(ctx, val);
            }

            return v;
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl, EntryPoint = "JSB_NewFloat64")]
        public static extern JSValue JS_NewFloat64(JSContext ctx, double d);

        #endregion

        #region atom support

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSAtom JS_NewAtomLen(JSContext ctx, byte* str, size_t len);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JS_DupAtom(JSContext ctx, JSAtom v);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_FreeAtom(JSContext ctx, JSAtom v);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_AtomToString(JSContext ctx, JSAtom atom);

        #endregion

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue jsb_crossbind_constructor(JSContext ctx, JSValue new_target);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_NewObject(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JS_BOOL JS_IsFunction(JSContext ctx, JSValueConst val);

        /// <summary>
        /// return 1:true 0:false 
        /// </summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JS_BOOL JS_IsConstructor(JSContext ctx, JSValueConst val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_NewArray(JSContext ctx);

        /// <summary>
        /// return -1 if exception (proxy case) or TRUE/FALSE
        /// </summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_IsArray(JSContext ctx, JSValueConst val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr JS_GetContextOpaque(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_SetContextOpaque(JSContext ctx, IntPtr opaque);

        // 通过 Atom 命名创建函数
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern JSValue JSB_NewCFunctionMagic(JSContext ctx, IntPtr func, JSAtom atom, int length, JSCFunctionEnum cproto, int magic);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern JSValue JSB_NewCFunction(JSContext ctx, IntPtr func, JSAtom atom, int length, JSCFunctionEnum cproto, int magic);

        public static JSValue JSB_NewGetter(JSContext ctx, JSGetterCFunctionMagic func, JSAtom atom, int magic)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunctionMagic(ctx, fn, atom, 0, JSCFunctionEnum.JS_CFUNC_getter_magic, magic);
        }

        public static JSValue JSB_NewSetter(JSContext ctx, JSSetterCFunctionMagic func, JSAtom atom, int magic)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunctionMagic(ctx, fn, atom, 1, JSCFunctionEnum.JS_CFUNC_setter_magic, magic);
        }

        public static JSValue JSB_NewConstructor(JSContext ctx, JSCFunctionMagic func, JSAtom atom, int magic)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunctionMagic(ctx, fn, atom, 0, JSCFunctionEnum.JS_CFUNC_constructor_magic, magic);
        }

        public static JSValue JSB_NewCFunctionMagic(JSContext ctx, JSCFunctionMagic func, JSAtom atom, int length, int magic)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunctionMagic(ctx, fn, atom, length, JSCFunctionEnum.JS_CFUNC_generic_magic, magic);
        }

        public static JSValue JSB_NewGetter(JSContext ctx, JSGetterCFunction func, JSAtom atom)
        {
            if (func == null)
            {
                return JS_UNDEFINED;
            }
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunction(ctx, fn, atom, 0, JSCFunctionEnum.JS_CFUNC_getter, 0);
        }

        public static JSValue JSB_NewSetter(JSContext ctx, JSSetterCFunction func, JSAtom atom)
        {
            if (func == null)
            {
                return JS_UNDEFINED;
            }
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunction(ctx, fn, atom, 1, JSCFunctionEnum.JS_CFUNC_setter, 0);
        }

        public static JSValue JSB_NewCFunction(JSContext ctx, JSCFunction func, JSAtom atom, int length)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(func);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(func);
            return JSB_NewCFunction(ctx, fn, atom, length, JSCFunctionEnum.JS_CFUNC_generic, 0);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_SetConstructor(JSContext ctx, JSValueConst func_obj, JSValueConst proto);

        /* return -1 in case of exception or TRUE or FALSE. Warning: 'val' is
           freed by the function. 'flags' is a bitmask of JS_PROP_NO_ADD,
           JS_PROP_THROW or JS_PROP_THROW_STRICT. If JS_PROP_NO_ADD is set,
           the new property is not added and an error is raised. */
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_SetPropertyInternal(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValue val, int flags);

        public static int JS_SetProperty(JSContext ctx, JSValueConst this_obj, JSAtom prop, JSValue val)
        {
            return JS_SetPropertyInternal(ctx, this_obj, prop, val, (int)JSPropFlags.JS_PROP_THROW);
        }

        public static bool IsDebugMode()
        {
#if JSB_DEBUG
            return true;
#else
            return false;
#endif
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_SetPropertyUint32(JSContext ctx, JSValueConst this_obj, uint32_t idx, JSValue val);

        // [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        // public static extern int JS_SetPropertyStr(JSContext ctx, [In] JSValueConst this_obj, [MarshalAs(UnmanagedType.LPStr)] string prop, JSValue val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_HasProperty(JSContext ctx, JSValueConst this_obj, JSAtom prop);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_ParseJSON(JSContext ctx, byte* buf, size_t buf_len, byte* filename);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_JSONStringify(JSContext ctx, JSValueConst obj, JSValueConst replacer, JSValueConst space0);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern unsafe JSValue JS_CallConstructor(JSContext ctx, JSValueConst func_obj, int argc, JSValueConst* argv);

        public static unsafe JSValue JS_CallConstructor(JSContext ctx, JSValueConst func_obj)
        {
            return JS_CallConstructor(ctx, func_obj, 0, (JSValueConst*)0);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_Call(JSContext ctx, JSValueConst func_obj, JSValueConst this_obj, int argc, JSValueConst* argv);

        // [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        // public static extern JSValue JS_Call(JSContext ctx, JSValueConst func_obj, JSValueConst this_obj, int argc, [MarshalAs(UnmanagedType.LPArray, SizeParamIndex = 3)] JSValueConst[] argv);

        public static unsafe JSValue JS_Call(JSContext ctx, JSValueConst func_obj, JSValueConst this_obj)
        {
            return JS_Call(ctx, func_obj, this_obj, 0, (JSValueConst*)0);
        }

        public static unsafe JSValue JS_Call(JSContext ctx, JSValueConst func_obj)
        {
            return JS_Call(ctx, func_obj, JS_UNDEFINED, 0, (JSValueConst*)0);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_Invoke(JSContext ctx, JSValueConst this_val, JSAtom atom, int argc, JSValueConst* argv);

        public static unsafe JSValue JS_Invoke(JSContext ctx, JSValueConst this_val, JSAtom atom)
        {
            return JS_Invoke(ctx, this_val, atom, 0, (JSValueConst*)0);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_SetPrototype(JSContext ctx, JSValueConst obj, JSValueConst proto_val);

        // 2020-04-12: 返回值不需要 FreeValue
        // 2020-07-05: 返回值需要 FreeValue
        // [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        // public static extern JSValueConst JS_GetPrototype(JSContext ctx, JSValueConst val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_RunGC(JSRuntime rt);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ExecutePendingJob(JSRuntime rt, out JSContext pctx);

#if JSB_WITH_V8_BACKEND
        //TODO unity-jsb: [IMPORTANT] implement it in v8-bridge later
        public static int JS_IsJobPending(JSRuntime rt, out JSContext pctx) { return 0; }
#else
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_IsJobPending(JSRuntime rt, out JSContext pctx);
#endif

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ToBool(JSContext ctx, JSValueConst val);

        /// <summary>
        /// 返回 &lt; 0 表示失败, 0 表示成功
        /// </summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ToInt32(JSContext ctx, out int pres, JSValue val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ToInt64(JSContext ctx, out int64_t pres, JSValueConst val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ToBigInt64(JSContext ctx, out int64_t pres, JSValueConst val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ToIndex(JSContext ctx, out uint64_t plen, JSValueConst val);
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ToFloat64(JSContext ctx, out double pres, JSValueConst val);

        /* return 0 for success, otherwise -1 in case of exception */
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JS_BOOL JSB_ToUint32(JSContext ctx, out uint32_t pres, JSValueConst val);

        /* free raw memory directly allocated by jsruntime */
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void js_free(JSContext ctx, IntPtr ptr);

        //TODO [v8_integrating] get rid of using ReadObject/WriteObject for better compatibility between different backends
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern IntPtr JS_WriteObject(JSContext ctx, out size_t psize, JSValueConst obj, int flags);

        //TODO [v8_integrating] get rid of using ReadObject/WriteObject for better compatibility between different backends
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern unsafe JSValue JS_ReadObject(JSContext ctx, byte* buf, size_t buf_len, int flags);

        public static unsafe JSValue JS_ReadByteCode(JSContext ctx, byte* buf, size_t buf_len)
        {
            return JS_ReadObject(ctx, buf, buf_len, JS_READ_OBJ_BYTECODE);
        }

        public static unsafe IntPtr JS_WriteByteCode(JSContext ctx, out size_t psize, JSValueConst obj)
        {
            return JS_WriteObject(ctx, out psize, obj, JS_WRITE_OBJ_BYTECODE);
        }

        public static unsafe JSValue JSB_Deserialize(JSContext ctx, byte* buf, size_t buf_len)
        {
            return JS_ReadObject(ctx, buf, buf_len, JS_READ_OBJ_REFERENCE);
        }

        public static unsafe IntPtr JSB_Serialize(JSContext ctx, out size_t psize, JSValueConst obj)
        {
            return JS_WriteObject(ctx, out psize, obj, JS_WRITE_OBJ_REFERENCE);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern unsafe JSValue JS_Eval(JSContext ctx, byte* input, size_t input_len, byte* filename, JSEvalFlags eval_flags);

        //TODO [v8_integrating] this api is only for the es module which will be removed later
        public static unsafe JSValue JS_EvalModule(JSContext ctx, byte* input, size_t input_len, byte* filename)
        {
            return JS_Eval(ctx, input, input_len, filename, JSEvalFlags.JS_EVAL_TYPE_MODULE | JSEvalFlags.JS_EVAL_FLAG_STRICT);
        }

        //TODO [v8_integrating] this api is only for the es module which will be removed later 
        public static unsafe JSValue JS_CompileModule(JSContext ctx, byte* input, size_t input_len, byte* filename)
        {
            return JS_Eval(ctx, input, input_len, filename, JSEvalFlags.JS_EVAL_TYPE_MODULE | JSEvalFlags.JS_EVAL_FLAG_STRICT | JSEvalFlags.JS_EVAL_FLAG_COMPILE_ONLY);
        }

        public static unsafe JSValue JS_EvalSource(JSContext ctx, byte* input, size_t input_len, byte* filename)
        {
            return JS_Eval(ctx, input, input_len, filename, JSEvalFlags.JS_EVAL_TYPE_GLOBAL | JSEvalFlags.JS_EVAL_FLAG_STRICT);
        }

        public static unsafe JSValue JS_CompileSource(JSContext ctx, byte* input, size_t input_len, byte* filename)
        {
            return JS_Eval(ctx, input, input_len, filename, JSEvalFlags.JS_EVAL_TYPE_GLOBAL | JSEvalFlags.JS_EVAL_FLAG_STRICT | JSEvalFlags.JS_EVAL_FLAG_COMPILE_ONLY);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_EvalFunction(JSContext ctx, JSValue fun_obj);

        /* load the dependencies of the module 'obj'. Useful when JS_ReadObject()
           returns a module. */
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_ResolveModule(JSContext ctx, JSValueConst obj);

        public static bool JS_IsNumber(JSValueConst v)
        {
            var tag = v.tag;
            return tag == JS_TAG_INT || tag == JS_TAG_FLOAT64;
        }

        public static bool JS_IsBool(JSValueConst v)
        {
            return v.tag == JS_TAG_BOOL;
        }

        public static bool JS_IsNull(JSValueConst v)
        {
            return v.tag == JS_TAG_NULL;
        }

        public static bool JS_IsUndefined(JSValueConst v)
        {
            return v.tag == JS_TAG_UNDEFINED;
        }

        public static bool JS_IsException(JSValueConst v)
        {
            return (v.tag == JS_TAG_EXCEPTION);
        }

        public static bool JS_IsString(JSValueConst v)
        {
            return v.tag == JS_TAG_STRING;
        }

        public static bool JS_IsObject(JSValueConst v)
        {
            return v.tag == JS_TAG_OBJECT;
        }

        #region ref counting

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl, EntryPoint = "JSB_DupValue")]
        public static extern JSValue JS_DupValue(JSContext ctx, JSValueConst v);

        /// <summary>
        /// dereference a JSValue (must be called in the script thread only)
        /// </summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl, EntryPoint = "JSB_FreeValue")]
        public static extern void JS_FreeValue(JSContext ctx, JSValue v);

        /// <summary>
        /// dereference the JSValues (must be called in the script thread only)
        /// </summary>
        public static void JS_FreeValue(JSContext ctx, JSValue[] v)
        {
            for (int i = 0, len = v.Length; i < len; i++)
            {
                JS_FreeValue(ctx, v[i]);
            }
        }

        /// <summary>
        /// dereference the JSValues (must be called in the script thread only)
        /// </summary>
        public static unsafe void JS_FreeValue(JSContext ctx, int count, JSValue* vs)
        {
            for (int i = 0, len = count; i < len; i++)
            {
                JS_FreeValue(ctx, vs[i]);
            }
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JSB_FreeValueRT(JSRuntime rt, JSValue v);

        #endregion

        #region unity base

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Proxy();

        public static readonly JSAtom JS_ATOM_Proxy = JSB_ATOM_Proxy();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_constructor();

        public static readonly JSAtom JS_ATOM_constructor = JSB_ATOM_constructor();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Number();

        public static readonly JSAtom JS_ATOM_Number = JSB_ATOM_Number();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Object();

        public static readonly JSAtom JS_ATOM_Object = JSB_ATOM_Object();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_String();

        public static readonly JSAtom JS_ATOM_String = JSB_ATOM_String();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Function();

        public static readonly JSAtom JS_ATOM_Function = JSB_ATOM_Function();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Error();

        public static readonly JSAtom JS_ATOM_Error = JSB_ATOM_Error();

#if JSB_NO_BIGNUM || ((UNITY_WSA || UNITY_WEBGL) && !UNITY_EDITOR)
        public static void JS_AddIntrinsicOperators(JSContext ctx) {}
        public static readonly JSAtom JS_ATOM_Operators;
        public static readonly JSAtom JS_ATOM_Symbol_operatorSet;
#else 
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_AddIntrinsicOperators(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Operators();

        public static readonly JSAtom JS_ATOM_Operators = JSB_ATOM_Operators();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_Symbol_operatorSet();

        // only available CONFIG_BIGNUM
        public static readonly JSAtom JS_ATOM_Symbol_operatorSet = JSB_ATOM_Symbol_operatorSet();
#endif

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_name();

        public static readonly JSAtom JS_ATOM_name = JSB_ATOM_name();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_message();

        public static readonly JSAtom JS_ATOM_message = JSB_ATOM_message();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_fileName();

        public static readonly JSAtom JS_ATOM_fileName = JSB_ATOM_fileName();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_lineNumber();

        public static readonly JSAtom JS_ATOM_lineNumber = JSB_ATOM_lineNumber();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_length();

        public static readonly JSAtom JS_ATOM_length = JSB_ATOM_length();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_stack();

        public static readonly JSAtom JS_ATOM_stack = JSB_ATOM_stack();

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JSB_ATOM_prototype();

        public static readonly JSAtom JS_ATOM_prototype = JSB_ATOM_prototype();

        /// <summary>
        /// init the native library, return the version tag of it
        /// </summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern int JSB_Init();

        // [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        // private static extern JSClassID JSB_NewClass(JSRuntime rt, JSClassID class_id, [MarshalAs(UnmanagedType.LPStr)] string class_name, IntPtr finalizer);

        //         public static JSClassID JS_NewClass(JSRuntime rt, JSClassFinalizer class_finalizer)
        //         {
        // #if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
        //             GCHandle.Alloc(class_finalizer);
        // #endif
        //             var fn_ptr = Marshal.GetFunctionPointerForDelegate(class_finalizer);
        //             return JSApi.JSB_NewClass(rt, JSApi.JSB_GetBridgeClassID(), "CSharpClass", fn_ptr);
        //         }

        #endregion

        #region string

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr JS_ToCStringLen2(JSContext ctx, out size_t len, [In] JSValue val, [MarshalAs(UnmanagedType.Bool)] bool cesu8);

        public static IntPtr JS_ToCStringLen(JSContext ctx, out size_t len, JSValue val)
        {
            return JS_ToCStringLen2(ctx, out len, val, false);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern void JS_FreeCString(JSContext ctx, IntPtr ptr);

        #endregion

        #region critical

        /* return < 0, 0 or > 0 */
        // [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        // public static extern int js_string_compare(JSContext ctx, /*const JSString*/ IntPtr p1, /*const JSString*/ IntPtr p2);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe IntPtr js_strndup(JSContext ctx, byte* s, size_t n);

        #endregion

        #region array buffer

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern IntPtr JS_GetArrayBuffer(JSContext ctx, out size_t psize, JSValueConst obj);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_NewArrayBufferCopy(JSContext ctx, byte* buf, size_t len);

        #endregion

        #region diagnostics

#if JSB_WITH_V8_BACKEND
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe void JS_OpenDebugger(JSContext ctx, int port);
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JS_BOOL JS_IsDebuggerConnected(JSContext ctx);
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JS_BOOL JS_IsDebuggerOpen(JSContext ctx);
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe void JS_CloseDebugger(JSContext ctx);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern unsafe void JS_SetLogFunc(JSContext ctx, IntPtr func);
        public static void JS_SetLogFunc(JSContext ctx, JSLogCFunction cb)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(cb);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(cb);
            JS_SetLogFunc(ctx, fn);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern unsafe void JS_SetWaitingForDebuggerFunc(JSContext ctx, IntPtr func);
        public static void JS_SetWaitingForDebuggerFunc(JSContext ctx, JSWaitingForDebuggerCFunction cb)
        {
            if (cb != null)
            {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
                GCHandle.Alloc(cb);
#endif
                var fn = Marshal.GetFunctionPointerForDelegate(cb);
                JS_SetWaitingForDebuggerFunc(ctx, fn);
            }
            else
            {
                JS_SetWaitingForDebuggerFunc(ctx, IntPtr.Zero);
            }
        }
#else 
        public static void JS_OpenDebugger(JSContext ctx, int port) { }
        public static JS_BOOL JS_IsDebuggerConnected(JSContext ctx) { return 0; }
        public static JS_BOOL JS_IsDebuggerOpen(JSContext ctx) { return 0; }
        public static void JS_CloseDebugger(JSContext ctx) { }
        public static void JS_SetLogFunc(JSContext ctx, JSLogCFunction cb) { }
        public static void JS_SetWaitingForDebuggerFunc(JSContext ctx, JSWaitingForDebuggerCFunction cb) { }
#endif // end JSB_WITH_V8_BACKEND

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe void JS_ComputeMemoryUsage(JSRuntime rt, JSMemoryUsage* s);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern unsafe void JS_SetInterruptHandler(JSRuntime rt, IntPtr cb, IntPtr opaque);

        public static void JS_SetInterruptHandler(JSRuntime rt, JSInterruptHandler cb, IntPtr opaque)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(cb);
#endif
            var fn = Marshal.GetFunctionPointerForDelegate(cb);
            JS_SetInterruptHandler(rt, fn, opaque);
        }
        #endregion

    }
}
