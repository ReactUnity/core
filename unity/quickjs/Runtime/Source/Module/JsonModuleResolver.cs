using System;
using System.Collections.Generic;

namespace QuickJS.Module
{
    using Utils;
    using Native;

    public class JsonModuleResolver : PathBasedModuleResolver
    {
        public JsonModuleResolver()
        {
        }

        public override void Release()
        {
        }

        protected override bool OnValidating(string module_id)
        {
            // 必须指明后缀
            return module_id.EndsWith(".json") || module_id.EndsWith(".jsonc");
        }

        protected override bool OnResolvingFile(IFileSystem fileSystem, IPathResolver pathResolver, string fileName, out string searchPath, out string resolvedFileName)
        {
            if (pathResolver.ResolvePath(fileSystem, fileName, out searchPath, out resolvedFileName))
            {
                return true;
            }

            return false;
        }

        public override bool ReloadModule(ScriptContext context, string resolved_id, JSValue module_obj, out JSValue exports_obj)
        {
            exports_obj = LoadModule(context, null, resolved_id, false);
            if (exports_obj.IsException())
            {
                JSNative.print_exception(context);
                exports_obj = JSApi.JS_UNDEFINED;
                return false;
            }
            
            return true;
        }

        public override unsafe JSValue LoadModule(ScriptContext context, string parent_module_id, string resolved_id, bool set_as_main)
        {
            var fileSystem = context.GetRuntime().GetFileSystem();
            var resolved_id_bytes = Utils.TextUtils.GetNullTerminatedBytes(resolved_id);
            // var dirname = PathUtils.GetDirectoryName(resolved_id);
            var source = fileSystem.ReadAllBytes(resolved_id);
            var ctx = (JSContext)context;

            if (source == null)
            {
                return ctx.ThrowInternalError("require module load failed");
            }

            var input_bytes = TextUtils.GetNullTerminatedBytes(source);
            var input_bom = TextUtils.GetBomSize(source);

            fixed (byte* input_ptr = &input_bytes[input_bom])
            fixed (byte* filename_ptr = resolved_id_bytes)
            {
                var rval = JSApi.JS_ParseJSON(ctx, input_ptr, input_bytes.Length - 1 - input_bom, filename_ptr);
                if (rval.IsException())
                {
                    return rval;
                }

                var module_obj = context._new_commonjs_resolver_module(resolved_id, "json", rval, true, set_as_main);
                JSApi.JS_FreeValue(ctx, module_obj);

                return rval;
            }
        }
    }
}
