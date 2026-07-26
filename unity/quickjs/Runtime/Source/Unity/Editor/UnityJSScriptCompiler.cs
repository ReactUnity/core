#if !JSB_UNITYLESS
using System;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace QuickJS.Unity
{
    using Native;

    /// utility helps to compile js source into bytecode
    public class UnityJSScriptCompiler : IDisposable
    {
        private JSRuntime _rt;
        private JSContext _ctx;
        private Utils.IScriptLogger _logger = new Utils.DefaultScriptLogger();

        public UnityJSScriptCompiler()
        {
            _rt = JSApi.JSB_NewRuntime(ScriptRuntime.class_finalizer);
            _ctx = JSApi.JS_NewContext(_rt);
            JSApi.JS_AddIntrinsicOperators(_ctx);
        }

        ~UnityJSScriptCompiler()
        {
            Dispose(false);
        }

        public unsafe byte[] Compile(string filename, byte[] input_bytes, bool commonJSModule)
        {
            byte[] outputBytes = null;
            try
            {
                byte[] fn_bytes = null;
                if (commonJSModule)
                {
                    input_bytes = Utils.TextUtils.GetShebangNullTerminatedCommonJSBytes(input_bytes);
                }

                fn_bytes = Utils.TextUtils.GetNullTerminatedBytes(filename);
                fixed (byte* input_ptr = input_bytes)
                fixed (byte* fn_ptr = fn_bytes)
                {
                    var input_len = (size_t)(input_bytes.Length - 1);
                    JSValue rval;
                    if (commonJSModule)
                    {
                        rval = JSApi.JS_CompileSource(_ctx, input_ptr, input_len, fn_ptr);
                    }
                    else
                    {
                        rval = JSApi.JS_CompileModule(_ctx, input_ptr, input_len, fn_ptr);
                    }

                    if (JSApi.JS_IsException(rval))
                    {
                        JSNative.print_exception(_ctx, _logger, Utils.LogLevel.Error, "[ScriptCompiler]");
                    }
                    else
                    {
                        size_t psize;
                        var byteCode = JSApi.JS_WriteByteCode(_ctx, out psize, rval);
                        JSApi.JS_FreeValue(_ctx, rval);
                        if (byteCode != IntPtr.Zero)
                        {
                            var tagSize = sizeof(uint);
                            uint tagValue = commonJSModule ? ScriptRuntime.BYTECODE_COMMONJS_MODULE_TAG : ScriptRuntime.BYTECODE_ES6_MODULE_TAG;

                            outputBytes = new byte[psize + tagSize];
                            Buffer.BlockCopy(BitConverter.GetBytes(Utils.TextUtils.ToNetworkByteOrder(tagValue)), 0, outputBytes, 0, tagSize);
                            Marshal.Copy(byteCode, outputBytes, tagSize, psize);
                        }
                        JSApi.js_free(_ctx, byteCode);
                    }
                }
                return outputBytes;
            }
            catch (Exception exception)
            {
                _logger.WriteException(exception);
                return null;
            }
        }

        public virtual void Dispose(bool bManaged)
        {
            if (_ctx.IsValid())
            {
                JSApi.JS_FreeContext(_ctx);
                _ctx = JSContext.Null;
            }

            if (_rt.IsValid())
            {
                JSApi.JSB_FreeRuntime(_rt);
                _rt = JSRuntime.Null;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
#endif