using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using QuickJS.Native;
using System.Threading;

namespace QuickJS
{
    using Utils;

    public partial class ScriptRuntime
    {
        public const uint BYTECODE_COMMONJS_MODULE_TAG = ScriptEngine.VERSION << 8 | 0x23;
        public const uint BYTECODE_ES6_MODULE_TAG = ScriptEngine.VERSION << 8 | 0xfe;

        public static uint TryReadByteCodeTagValue(byte[] bytes)
        {
            if (bytes != null && bytes.Length > sizeof(uint))
            {
                return TextUtils.ToHostByteOrder(BitConverter.ToUInt32(bytes, 0));
            }
            return 0;
        }

        /// <summary>
        /// the 'define' function for minimalistic AMD module support
        /// </summary>
        [MonoPInvokeCallback(typeof(JSCFunction))]
        public static unsafe JSValue module_define(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            if (argc != 3 || !argv[0].IsString() || JSApi.JS_IsArray(ctx, argv[1]) != 1 || JSApi.JS_IsFunction(ctx, argv[2]) != 1)
            {
                return ctx.ThrowInternalError("unsupported 'define' invocation");
            }

            string[] deps;
            if (!Binding.Values.js_get_primitive(ctx, argv[1], out deps))
            {
                return ctx.ThrowInternalError("unsupported 'define' invocation");
            }
            var module_id = JSApi.GetString(ctx, argv[0]);
            if (string.IsNullOrEmpty(module_id))
            {
                return ctx.ThrowInternalError("unsupported 'define' invocation");
            }

            var runtime = ScriptEngine.GetRuntime(ctx);
            var staticModuleResolver = runtime.FindModuleResolver<Module.StaticModuleResolver>();
            if (staticModuleResolver != null)
            {
                var amd = new Module.AMDModuleRegister(ctx, deps, argv[2]);
                staticModuleResolver.AddStaticModule(module_id, amd);
            }
            else
            {
                return ctx.ThrowInternalError("no static module resolver");
            }

            return JSApi.JS_UNDEFINED;
        }

        public static unsafe JSValue EvalSource(JSContext ctx, string source, string fileName, bool bModule)
        {
            return EvalSource(ctx, Utils.TextUtils.GetNullTerminatedBytes(source), fileName, bModule);
        }

        public static unsafe JSValue EvalSource(JSContext ctx, byte[] source, string fileName, bool bModule)
        {
            if (source == null || source.Length == 0)
            {
                return JSApi.JS_UNDEFINED;
            }

            var tagValue = TryReadByteCodeTagValue(source);

            if (tagValue == BYTECODE_ES6_MODULE_TAG)
            {
                return ctx.ThrowInternalError("eval does not support es6 module bytecode");
            }

            if (tagValue == BYTECODE_COMMONJS_MODULE_TAG)
            {
                fixed (byte* intput_ptr = source)
                {
                    var bytecodeFunc = JSApi.JS_ReadByteCode(ctx, intput_ptr + sizeof(uint), source.Length - sizeof(uint));

                    if (bytecodeFunc.IsFunctionByteCode())
                    {
                        var func_val = JSApi.JS_EvalFunction(ctx, bytecodeFunc); // it's CallFree (bytecodeFunc)
                        if (JSApi.JS_IsFunction(ctx, func_val) != 1)
                        {
                            JSApi.JS_FreeValue(ctx, func_val);
                            return ctx.ThrowInternalError("failed to eval bytecode module");
                        }

                        var rval = JSApi.JS_Call(ctx, func_val, JSApi.JS_UNDEFINED);
                        JSApi.JS_FreeValue(ctx, func_val);
                        return rval;
                    }

                    JSApi.JS_FreeValue(ctx, bytecodeFunc);
                    return ctx.ThrowInternalError("failed to eval bytecode module");
                }
            }

            var input_bytes = Utils.TextUtils.GetNullTerminatedBytes(source);
            var fn_bytes = Utils.TextUtils.GetNullTerminatedBytes(fileName);

            fixed (byte* input_ptr = input_bytes)
            fixed (byte* fn_ptr = fn_bytes)
            {
                var input_len = (size_t)(input_bytes.Length - 1);

                if (bModule)
                {
                    return JSApi.JS_EvalModule(ctx, input_ptr, input_len, fn_ptr);
                }
                return JSApi.JS_EvalSource(ctx, input_ptr, input_len, fn_ptr);

            }
        }

#if !JSB_WITH_V8_BACKEND
        [MonoPInvokeCallback(typeof(JSModuleNormalizeFunc))]
        public static IntPtr module_normalize(JSContext ctx, string module_base_name, string module_name, IntPtr opaque)
        {
            try
            {
                var runtime = ScriptEngine.GetRuntime(ctx);
                var resolve_to = runtime.ResolveFilePath(module_base_name, module_name);
                return ctx.NewCString(resolve_to);
            }
            catch (Exception exception)
            {
                ctx.ThrowInternalError(exception.Message);
                return IntPtr.Zero;
            }
        }

        [MonoPInvokeCallback(typeof(JSModuleLoaderFunc))]
        public static unsafe JSModuleDef module_loader(JSContext ctx, string module_name, IntPtr opaque)
        {
            // Debug.LogFormat("module_loader: {0}", module_name);
            var runtime = ScriptEngine.GetRuntime(ctx);
            var fileSystem = runtime._fileSystem;
            if (!fileSystem.Exists(module_name))
            {
                ctx.ThrowReferenceError("module not found");
                return JSModuleDef.Null;
            }

            var source = fileSystem.ReadAllBytes(module_name);
            var tagValue = TryReadByteCodeTagValue(source);

            if (tagValue == BYTECODE_COMMONJS_MODULE_TAG)
            {
                ctx.ThrowReferenceError("commonjs module can not be loaded by import");
                return JSModuleDef.Null;
            }

            if (tagValue == BYTECODE_ES6_MODULE_TAG)
            {
                // bytecode
                fixed (byte* intput_ptr = source)
                {
                    var modObj = JSApi.JS_ReadByteCode(ctx, intput_ptr + sizeof(uint), source.Length - sizeof(uint));
                    if (!modObj.IsModule())
                    {
                        JSApi.JS_FreeValue(ctx, modObj);
                        ctx.ThrowReferenceError("unsupported module object");
                        return JSModuleDef.Null;
                    }

                    if (JSApi.JS_ResolveModule(ctx, modObj) < 0)
                    {
                        // fail
                        JSApi.JS_FreeValue(ctx, modObj);
                        ctx.ThrowReferenceError("module resolve failed");
                        return JSModuleDef.Null;
                    }

                    return _NewModuleDef(ctx, modObj, module_name);
                }
            }

            // source 
            var input_bytes = TextUtils.GetNullTerminatedBytes(source);
            var fn_bytes = TextUtils.GetNullTerminatedBytes(module_name);

            fixed (byte* input_ptr = input_bytes)
            fixed (byte* fn_ptr = fn_bytes)
            {
                var input_len = (size_t)(input_bytes.Length - 1);
                var func_val = JSApi.JS_CompileModule(ctx, input_ptr, input_len, fn_ptr);

                if (JSApi.JS_IsException(func_val))
                {
                    ctx.print_exception();
                    ctx.ThrowReferenceError("module error");
                    return JSModuleDef.Null;
                }

                if (func_val.IsNullish())
                {
                    ctx.ThrowReferenceError("module is null");
                    return JSModuleDef.Null;
                }

                return _NewModuleDef(ctx, func_val, module_name);
            }
        }

        private static JSModuleDef _NewModuleDef(JSContext ctx, JSValue func_val, string module_name)
        {
            var context = ScriptEngine.GetContext(ctx);
            var mod = new JSModuleDef(func_val.u.ptr);
            var meta = JSApi.JS_GetImportMeta(ctx, mod);
            JSApi.JS_DefinePropertyValue(ctx, meta, context.GetAtom("url"), ctx.NewString($"file://{module_name}"));
            JSApi.JS_DefinePropertyValue(ctx, meta, context.GetAtom("main"), JSApi.JS_NewBool(ctx, false));
            JSApi.JS_FreeValue(ctx, meta);
            return mod;
        }
#endif
    }
}