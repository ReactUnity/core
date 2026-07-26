using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    public delegate ClassDecl ModuleExportsBind(TypeRegister register);

    public interface IModuleRegister
    {
        bool isReloadSupported { get; }

        /// <summary>
        /// setup module members and return the final exports object (usually equals to exports_obj, but with an additional reference counting)
        /// </summary>
        JSValue Load(ScriptContext context, string resolved_id, JSValue module_obj, JSValue exports_obj);
        void Unload();
    }
}
