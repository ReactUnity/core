using System;

namespace QuickJS
{
    using Native;
    using JSValueConst = Native.JSValue;
    using JS_BOOL = Int32;

    /// <summary>
    /// A thin layer wrapping the raw JSApi which depends on some methods from jsb.core module.
    /// the JSApi will be isolated from jsb.core module later.
    /// </summary>
    public static class JSNative
    {
        [MonoPInvokeCallback(typeof(JSCFunctionMagic))]
        public static JSValue class_private_ctor(JSContext ctx, JSValue new_target, int argc, JSValue[] argv, int magic)
        {
            return ctx.ThrowInternalError("cant call constructor on this type");
        }

        public static bool CheckFuncProperty(this JSValue self, ScriptContext context, string name)
        {
            if (context == null)
            {
                return false;
            }

            var ctx = (JSContext)context;
            var prop = JSApi.JS_GetProperty(ctx, self, context.GetAtom(name));
            var res = JSApi.JS_IsFunction(context, prop) == 1;
            
            JSApi.JS_FreeValue(ctx, prop);
            return res;
        }

        public static void print_exception(this JSContext ctx, Utils.LogLevel logLevel = Utils.LogLevel.Error, string title = "")
        {
            print_exception(ctx, ScriptEngine.GetLogger(ctx), logLevel, title);
        }

        public static void print_exception(JSContext ctx, Utils.IScriptLogger logger, Utils.LogLevel logLevel, string title)
        {
            var ex = JSApi.JS_GetException(ctx);

            try
            {
                if (logger != null)
                {
                    var message = ctx.FormatException(ex);

                    // Plain Write overload on purpose: JS messages contain braces, which
                    // string.Format would reinterpret or throw on.
                    logger.Write(logLevel, string.IsNullOrEmpty(title) ? message : title + " " + message);
                }
            }
            finally
            {
                JSApi.JS_FreeValue(ctx, ex);
            }
        }

        public static unsafe JSValue NewString(this JSContext ctx, string str)
        {
            if (str == null)
            {
                return JSApi.JS_NULL;
            }

            if (str.Length == 0)
            {
                return JSApi.JSB_NewEmptyString(ctx);
            }

            var bytes = Utils.TextUtils.GetBytes(str);
            fixed (byte* buf = bytes)
            {
                return JSApi.JS_NewStringLen(ctx, buf, bytes.Length);
            }
        }

        /// <summary>
        /// Get a cstring allocated on the heap (will not be automatically collected by GC)
        /// </summary>
        public static unsafe IntPtr NewCString(this JSContext ctx, string str)
        {
            var bytes = Utils.TextUtils.GetNullTerminatedBytes(str);
            fixed (byte* ptr = bytes)
            {
                return JSApi.js_strndup(ctx, ptr, bytes.Length - 1);
            }
        }

        public static unsafe JSValue ThrowException(this JSContext ctx, Exception exception)
        {
            return ThrowInternalError(ctx, exception.ToString());
        }

        public static unsafe JSValue ThrowTypeError(this JSContext ctx, string message)
        {
            var bytes = Utils.TextUtils.GetNullTerminatedBytes(message);
            fixed (byte* msg = bytes)
            {
                return JSApi.JSB_ThrowTypeError(ctx, msg);
            }
        }

        public static unsafe JSValue ThrowInternalError(this JSContext ctx, string message)
        {
            if (string.IsNullOrEmpty(message))
            {
                return JSApi.JSB_ThrowInternalError(ctx, (byte*)0);
            }

            var bytes = Utils.TextUtils.GetBytes(message);
            fixed (byte* buf = bytes)
            {
                return JSApi.JSB_ThrowError(ctx, buf, bytes.Length);
            }
        }

        public static unsafe JSValue ThrowRangeError(this JSContext ctx, string message)
        {
            var bytes = Utils.TextUtils.GetNullTerminatedBytes(message);
            fixed (byte* msg = bytes)
            {
                return JSApi.JSB_ThrowRangeError(ctx, msg);
            }
        }

        public static unsafe JSValue ThrowReferenceError(this JSContext ctx, string message)
        {
            var bytes = Utils.TextUtils.GetNullTerminatedBytes(message);
            fixed (byte* msg = bytes)
            {
                return JSApi.JSB_ThrowReferenceError(ctx, msg);
            }
        }

        [MonoPInvokeCallback(typeof(JSHostPromiseRejectionTracker))]
        public static void PromiseRejectionTracker(JSContext ctx, JSValueConst promise, JSValueConst reason, JS_BOOL is_handled, IntPtr opaque)
        {
            if (is_handled != 1)
            {
                var logger = ScriptEngine.GetLogger(ctx);
                if (logger != null)
                {
                    logger.Write(Utils.LogLevel.Error, "Unhandled promise rejection: " + ctx.FormatException(reason));
                }
            }
        }
    }
}