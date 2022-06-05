#if !JSB_WITH_V8_BACKEND
using System;
using System.Runtime.InteropServices;
using System.Text;

namespace QuickJS.Native
{
    public partial class JSApi
    {
        #region module
        /* module_normalize = NULL is allowed and invokes the default module filename normalizer */
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        private static extern void JS_SetModuleLoaderFunc(JSRuntime rt, IntPtr module_normalize, IntPtr module_loader, IntPtr opaque);

        public static void JS_SetModuleLoaderFunc(JSRuntime rt, JSModuleNormalizeFunc module_normalize, JSModuleLoaderFunc module_loader, IntPtr opaque)
        {
#if JSB_UNITYLESS || (UNITY_WSA && !UNITY_EDITOR)
            GCHandle.Alloc(module_normalize);
            GCHandle.Alloc(module_loader);
#endif
            JS_SetModuleLoaderFunc(rt,
                module_normalize != null ? Marshal.GetFunctionPointerForDelegate(module_normalize) : IntPtr.Zero,
                module_loader != null ? Marshal.GetFunctionPointerForDelegate(module_loader) : IntPtr.Zero, opaque);
        }

        /* return the import.meta object of a module */
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JS_GetImportMeta(JSContext ctx, JSModuleDef m);
        #endregion
    }
}
#endif
