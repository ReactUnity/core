using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    public class ValueModuleRegister : IModuleRegister
    {
        private ScriptRuntime _runtime;
        private JSValue _rawValue;

        public bool isReloadSupported => false;

        public ValueModuleRegister(ScriptRuntime runtime, JSValue bind)
        {
            _runtime = runtime;
            _rawValue = JSApi.JS_DupValue(_runtime.GetMainContext(), bind);
        }

        public void Unload()
        {
            if (!_rawValue.IsUndefined())
            {
                var rawValue = _rawValue;
                _rawValue = JSApi.JS_UNDEFINED;
                _runtime.FreeValue(rawValue);
            }
        }

        public JSValue Load(ScriptContext context, string resolved_id, JSValue module_obj, JSValue exports_obj)
        {
            var ctx = (JSContext)context;
            var key_atom = context.GetAtom("exports");
            JSApi.JS_SetProperty(ctx, module_obj, key_atom, JSApi.JS_DupValue(ctx, _rawValue));
            return JSApi.JS_DupValue(ctx, _rawValue);
        }
    }
}
