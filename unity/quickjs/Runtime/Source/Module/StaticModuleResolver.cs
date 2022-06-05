using System;
using System.Collections.Generic;

namespace QuickJS.Module
{
    using Utils;
    using Native;

    public class StaticModuleResolver : IModuleResolver
    {
        private Dictionary<string, IModuleRegister> _modRegisters = new Dictionary<string, IModuleRegister>();

        public void Release()
        {
            var count = _modRegisters.Count;
            if (count > 0)
            {
                var values = new IModuleRegister[count];
                _modRegisters.Values.CopyTo(values, 0);
                _modRegisters.Clear();
                for (var i = 0; i < count; ++i)
                {
                    values[i].Unload();
                }
            }
        }

        public StaticModuleResolver AddStaticModule(string module_id, ModuleExportsBind bind)
        {
            return AddStaticModule(module_id, new FuncModuleRegister(bind));
        }

        public StaticModuleResolver AddStaticModule(string module_id, RawModuleBind bind)
        {
            return AddStaticModule(module_id, new RawModuleRegister(bind));
        }

        public StaticModuleResolver AddStaticModule(string module_id, IModuleRegister moduleRegister)
        {
            IModuleRegister oldRegister;
            if (_modRegisters.TryGetValue(module_id, out oldRegister))
            {
                oldRegister.Unload();
            }
            _modRegisters[module_id] = moduleRegister;
            return this;
        }

        public bool ContainsModule(IFileSystem fileSystem, IPathResolver pathResolver, string resolved_id)
        {
            return _modRegisters.ContainsKey(resolved_id);
        }

        public bool ResolveModule(IFileSystem fileSystem, IPathResolver pathResolver, string parent_module_id, string module_id, out string resolved_id)
        {
            if (_modRegisters.ContainsKey(module_id))
            {
                resolved_id = module_id;
                return true;
            }
            resolved_id = null;
            return false;
        }

        public bool ReloadModule(ScriptContext context, string resolved_id, JSValue module_obj, out JSValue exports_obj)
        {
            exports_obj = JSApi.JS_UNDEFINED;
            IModuleRegister moduleRegister;
            if (_modRegisters.TryGetValue(resolved_id, out moduleRegister) && moduleRegister.isReloadSupported)
            {
                var ctx = (JSContext)context;
                var old_exports_obj = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("exports"));

                exports_obj = moduleRegister.Load(context, resolved_id, module_obj, old_exports_obj);

                JSApi.JS_FreeValue(ctx, old_exports_obj);
                JSApi.JS_SetProperty(ctx, module_obj, context.GetAtom("loaded"), JSApi.JS_NewBool(ctx, true));
                return true;
            }

            return false;
        }

        public JSValue LoadModule(ScriptContext context, string parent_module_id, string resolved_id, bool set_as_main)
        {
            IModuleRegister moduleRegister;
            var ctx = (JSContext)context;
            if (_modRegisters.TryGetValue(resolved_id, out moduleRegister))
            {
                var exports_obj = JSApi.JS_NewObject(ctx);
                var module_obj = context._new_commonjs_resolver_module(resolved_id, "static", exports_obj, false, set_as_main);

                var rval = moduleRegister.Load(context, resolved_id, module_obj, exports_obj);

                JSApi.JS_SetProperty(ctx, module_obj, context.GetAtom("loaded"), JSApi.JS_NewBool(ctx, true));
                JSApi.JS_FreeValue(ctx, exports_obj);
                JSApi.JS_FreeValue(ctx, module_obj);
                return rval;
            }

            return ctx.ThrowInternalError("invalid static module loader");
        }

        public T GetModuleRegister<T>(string module_id) where T : class, IModuleRegister
        {
            IModuleRegister moduleRegister;
            if (_modRegisters.TryGetValue(module_id, out moduleRegister))
            {
                return moduleRegister as T;
            }
            return default(T);
        }
    }
}
