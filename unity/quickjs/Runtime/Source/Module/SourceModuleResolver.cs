using System;
using System.Collections.Generic;

namespace QuickJS.Module
{
    using Utils;
    using Native;

    public class SourceModuleResolver : PathBasedModuleResolver
    {
        private const string LoadModuleEmptySourceError = "failed to load module with empty source";
        private const string LoadModuleTypeError = "es6 module can not be loaded by require";

        [Serializable]
        public class PackageConfig
        {
            public string main;
        }

        // a json converter for package.json parsing
        private IJsonConverter _jsonConv;

        public SourceModuleResolver(IJsonConverter jsonConv)
        {
            _jsonConv = jsonConv;
        }

        public override void Release()
        {
        }

        protected override bool OnValidating(string module_id)
        {
            // 接受无后缀路径
            return true;
        }

        protected override bool OnResolvingFile(IFileSystem fileSystem, IPathResolver pathResolver, string fileName, out string searchPath, out string resolvedFileName)
        {
            if (pathResolver.ResolvePath(fileSystem, fileName, out searchPath, out resolvedFileName))
            {
                return true;
            }

            // try resolve bytecode file
            if (pathResolver.ResolvePath(fileSystem, fileName + ".js.bytes", out searchPath, out resolvedFileName))
            {
                return true;
            }

            if (pathResolver.ResolvePath(fileSystem, fileName + ".js", out searchPath, out resolvedFileName))
            {
                return true;
            }

            if (pathResolver.ResolvePath(fileSystem, PathUtils.Combine(fileName, "index.js"), out searchPath, out resolvedFileName))
            {
                return true;
            }

            if (_jsonConv != null && pathResolver.ResolvePath(fileSystem, PathUtils.Combine(fileName, "package.json"), out searchPath, out resolvedFileName))
            {
                var packageDataBytes = fileSystem.ReadAllBytes(resolvedFileName);
                if (packageDataBytes != null)
                {
                    var packageData = System.Text.Encoding.UTF8.GetString(packageDataBytes);
                    var packageConfig = _jsonConv.Deserialize(packageData, typeof(PackageConfig)) as PackageConfig;
                    if (packageConfig != null && !string.IsNullOrEmpty(packageConfig.main))
                    {
                        var main = PathUtils.Combine(searchPath, fileName, packageConfig.main);
                        if (!main.EndsWith(".js"))
                        {
                            main += ".js";
                        }
                        main = PathUtils.ExtractPath(main, '/');
                        if (fileSystem.Exists(main))
                        {
                            resolvedFileName = main;
                            return true;
                        }
                    }
                }
            }

            resolvedFileName = null;
            return false;
        }

        public override bool ReloadModule(ScriptContext context, string resolved_id, JSValue module_obj, out JSValue exports_obj)
        {
            exports_obj = _ReloadModule(context, resolved_id, JSApi.JS_DupValue(context, module_obj));
            if (exports_obj.IsException())
            {
                JSNative.print_exception(context);
                exports_obj = JSApi.JS_UNDEFINED;
                return false;
            }
            
            return true;
        }

        private JSValue _ReloadModule(ScriptContext context, string resolved_id, JSValue module_obj)
        {
            var fileSystem = context.GetRuntime().GetFileSystem();
            var source = fileSystem.ReadAllBytes(resolved_id);
            var ctx = (JSContext)context;

            if (source == null)
            {
                return ctx.ThrowInternalError(LoadModuleEmptySourceError);
            }

            var tagValue = ScriptRuntime.TryReadByteCodeTagValue(source);

            if (tagValue == ScriptRuntime.BYTECODE_ES6_MODULE_TAG)
            {
                return ctx.ThrowInternalError(LoadModuleTypeError);
            }

            var filename = fileSystem.GetFullPath(resolved_id) ?? resolved_id;
            JSApi.JS_SetProperty(ctx, module_obj, context.GetAtom("loaded"), JSApi.JS_NewBool(ctx, false));
            return context.LoadModuleFromSource(source, resolved_id, filename, module_obj);
        }

        public override JSValue LoadModule(ScriptContext context, string parent_module_id, string resolved_id, bool set_as_main)
        {
            var fileSystem = context.GetRuntime().GetFileSystem();
            var source = fileSystem.ReadAllBytes(resolved_id);
            var ctx = (JSContext)context;

            if (source == null)
            {
                return ctx.ThrowInternalError(LoadModuleEmptySourceError);
            }

            var tagValue = ScriptRuntime.TryReadByteCodeTagValue(source);

            if (tagValue == ScriptRuntime.BYTECODE_ES6_MODULE_TAG)
            {
                return ctx.ThrowInternalError(LoadModuleTypeError);
            }

            var exports_obj = JSApi.JS_UNDEFINED;
            var module_obj = JSApi.JS_UNDEFINED;
            if (context.TryGetModuleForReloading(resolved_id, out module_obj))
            {
                if (ReloadModule(context, resolved_id, module_obj, out exports_obj))
                {
                    JSApi.JS_FreeValue(ctx, module_obj);
                    return exports_obj;
                }
                JSApi.JS_FreeValue(ctx, module_obj);
            }

            var filename = fileSystem.GetFullPath(resolved_id) ?? resolved_id;
            exports_obj = JSApi.JS_NewObject(ctx); 
            module_obj = context._new_commonjs_script_module(parent_module_id, resolved_id, filename, exports_obj, false, set_as_main);
            JSApi.JS_FreeValue(ctx, exports_obj);
            return context.LoadModuleFromSource(source, resolved_id, filename, module_obj);
        }
    }
}
