using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Module
{
    using Native;
    using Binding;

    /// <summary>
    /// a minimalistic implementation of AMD modules
    /// </summary>
    public class AMDModuleRegister : IModuleRegister
    {
        private JSContext _ctx;
        private string[] _deps;
        private JSValue _loader;

        public bool isReloadSupported => false;

        public AMDModuleRegister(JSContext ctx, string[] deps, JSValue loader)
        {
            _ctx = ctx;
            _deps = deps;
            _loader = JSApi.JS_DupValue(ctx, loader);
        }

        public void Unload()
        {
            if (_ctx.IsValid())
            {
                if (!_loader.IsUndefined())
                {
                    JSApi.JS_FreeValue(_ctx, _loader);
                    _loader = JSApi.JS_UNDEFINED;
                }

                _ctx = JSContext.Null;
            }
        }

        public unsafe JSValue Load(ScriptContext context, string resolved_id, JSValue module_obj, JSValue exports_obj)
        {
            var ctx = (JSContext)context;

            try
            {
                var len = _deps.Length;
                var values = stackalloc JSValue[len];
                var require_obj = context._CreateRequireFunction(resolved_id, module_obj);
                var filename_obj = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("filename"));
                var dirname_obj = JSApi.JS_NULL;
                var require_argv = stackalloc JSValue[5] { JSApi.JS_DupValue(ctx, exports_obj), JSApi.JS_DupValue(ctx, require_obj), JSApi.JS_DupValue(ctx, module_obj), filename_obj, dirname_obj, };
                var rval = JSApi.JS_UNDEFINED;

                for (var i = 0; i < len; ++i)
                {
                    var dep_id = _deps[i];
                    switch (dep_id)
                    {
                        case "require": values[i] = JSApi.JS_DupValue(ctx, require_obj); break;
                        case "exports": values[i] = JSApi.JS_DupValue(ctx, exports_obj); break;
                        default:
                            var dep_exports = context.GetRuntime().ResolveModule(context, "", dep_id, false);
                            if (dep_exports.IsException())
                            {
                                rval = dep_exports;
                            }
                            else
                            {
                                values[i] = dep_exports;
                            }
                            break;
                    }

                    if (!rval.IsUndefined())
                    {
                        break;
                    }
                }


                // call loader if all dependencies are successfully evaludated
                if (rval.IsUndefined())
                {
                    rval = JSApi.JS_Call(ctx, _loader, JSApi.JS_UNDEFINED, len, values);

                    if (!rval.IsException())
                    {
                        // drop the return value of 'define' call (the 'define' should returns 'undefined')
                        JSApi.JS_FreeValue(ctx, rval);
                        rval = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("exports"));
                    }
                }

                JSApi.JS_FreeValue(ctx, require_obj);
                for (var i = 0; i < len; ++i)
                {
                    JSApi.JS_FreeValue(ctx, values[i]);
                }
                for (var i = 0; i < 5; ++i)
                {
                    JSApi.JS_FreeValue(ctx, require_argv[i]);
                }

                return rval;
            }
            catch (Exception exception)
            {
                // unexpected exception (should never happen)
                return ctx.ThrowException(exception);
            }
        }
    }
}
