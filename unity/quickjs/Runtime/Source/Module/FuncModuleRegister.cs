using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    // 一个绑定函数代表一个类型注册为一个模块
    public class FuncModuleRegister : IModuleRegister
    {
        private ModuleExportsBind _bind;

        public bool isReloadSupported => true;

        public FuncModuleRegister(ModuleExportsBind bind)
        {
            _bind = bind;
        }

        public void Unload()
        {
        }

        public JSValue Load(ScriptContext context, string resolved_id, JSValue module_obj, JSValue exports_obj)
        {
            var register = context.CreateTypeRegister();
            var clazz = _bind(register);
            var rval = clazz.GetConstructor();
            var ctx = (JSContext)context;
            JSApi.JS_SetProperty(ctx, module_obj, register.GetAtom("exports"), JSApi.JS_DupValue(ctx, rval));
            register.Finish();
            return rval;
        }
    }
}
