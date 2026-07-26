using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    public delegate JSValue RawModuleBind(ScriptContext context);

    /// <summary>
    /// 返回值注册为模块对象
    /// </summary>
    public class RawModuleRegister : IModuleRegister
    {
        private RawModuleBind _bind;

        public bool isReloadSupported => true;

        public RawModuleRegister(RawModuleBind bind)
        {
            _bind = bind;
        }

        public void Unload()
        {
        }

        public JSValue Load(ScriptContext context, string resolved_id, JSValue module_obj, JSValue exports_obj)
        {
            var v = _bind(context);
            var ctx = (JSContext)context;
            var key_atom = context.GetAtom("exports");
            JSApi.JS_SetProperty(ctx, module_obj, key_atom, JSApi.JS_DupValue(ctx, v));
            return v;
        }
    }
}
