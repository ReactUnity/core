using System;
using System.Runtime.InteropServices;

namespace QuickJS.Native
{
    using JSValueConst = JSValue;

    /// <summary>One module load in flight.</summary>
    // Opaque, and consumed: the engine frees it inside whichever of JS_FulfillModuleLoad
    // and JS_RejectModuleLoad is called first, so settling one twice is a use-after-free.
    [StructLayout(LayoutKind.Sequential)]
    public struct JSModuleLoadHandle
    {
        private unsafe void* _value;

        public static readonly JSModuleLoadHandle Null;

        public unsafe bool IsValid()
        {
            return _value != (void*)0;
        }
    }

    public partial class JSApi
    {
        #region asynchronous module loading

        /// <summary>Asks the host for the source of a module. Nothing is returned: the load is
        /// settled through <paramref name="handle"/>, from this call or any later turn.</summary>
        // module_name is a raw pointer rather than a marshalled string so it can be decoded as
        // UTF-8 -- the default marshalling for `char*` is the ANSI code page.
        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        public delegate void JSModuleLoaderAsyncFunc(JSContext ctx, IntPtr module_name, JSValueConst attributes,
            IntPtr opaque, JSModuleLoadHandle handle);

        /// <summary>Fills in the import.meta object of a module, the first time that module
        /// evaluates `import.meta`.</summary>
        // ECMA-262's HostGetImportMetaProperties. With an async loader this is the only hook for
        // import.meta.url: the engine compiles the source the host delivers, so the host never
        // holds the JSModuleDef the synchronous loaders hand it. Identify the module with
        // JS_GetModuleName.
        [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
        public delegate void JSModuleMetaFunc(JSContext ctx, JSModuleDef m, JSValueConst meta_obj, IntPtr opaque);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern void JS_SetModuleLoaderFuncAsync(JSRuntime rt, IntPtr module_normalize,
            IntPtr module_loader, IntPtr module_check_attrs, IntPtr opaque);

        /// <summary>Installs an async loader. Mutually exclusive with JS_SetModuleLoaderFunc:
        /// whichever is called last wins.</summary>
        // The delegates are rooted for good, the way JS_SetModuleLoaderFunc roots its own:
        // GetFunctionPointerForDelegate does not keep one alive, and a collected thunk is a hard
        // crash the first time the engine calls back.
        public static void JS_SetModuleLoaderFuncAsync(JSRuntime rt, JSModuleNormalizeFunc module_normalize,
            JSModuleLoaderAsyncFunc module_loader, IntPtr opaque)
        {
            if (module_normalize != null) GCHandle.Alloc(module_normalize);
            if (module_loader != null) GCHandle.Alloc(module_loader);
            JS_SetModuleLoaderFuncAsync(rt,
                module_normalize != null ? Marshal.GetFunctionPointerForDelegate(module_normalize) : IntPtr.Zero,
                module_loader != null ? Marshal.GetFunctionPointerForDelegate(module_loader) : IntPtr.Zero,
                IntPtr.Zero, opaque);
        }

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern void JS_SetModuleMetaFunc(JSRuntime rt, IntPtr func, IntPtr opaque);

        public static void JS_SetModuleMetaFunc(JSRuntime rt, JSModuleMetaFunc func, IntPtr opaque)
        {
            if (func != null) GCHandle.Alloc(func);
            JS_SetModuleMetaFunc(rt, func != null ? Marshal.GetFunctionPointerForDelegate(func) : IntPtr.Zero, opaque);
        }

        /// <summary>Settles a load with the module's source, which has to be null-terminated -
        /// this reaches JS_Eval. Consumes the handle.</summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe int JS_FulfillModuleLoad(JSContext ctx, JSModuleLoadHandle handle,
            byte* source, size_t source_len);

        /// <summary>Settles a load as failed, rejecting every graph waiting on it. Consumes the
        /// handle.</summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern int JS_RejectModuleLoad(JSContext ctx, JSModuleLoadHandle handle, JSValueConst error);

        /// <summary>Loads, links and evaluates a module graph from the root's source. Returns a
        /// promise for the root's namespace object; every dependency is fetched through the async
        /// loader.</summary>
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JSValue JS_EvalModuleAsync(JSContext ctx, byte* input, size_t input_len,
            byte* filename);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSAtom JS_GetModuleName(JSContext ctx, JSModuleDef m);

        #endregion
    }
}
