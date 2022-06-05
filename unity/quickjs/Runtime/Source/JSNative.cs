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
                    var err_fileName = JSApi.JS_GetProperty(ctx, ex, JSApi.JS_ATOM_fileName);
                    var err_lineNumber = JSApi.JS_GetProperty(ctx, ex, JSApi.JS_ATOM_lineNumber);
                    var err_message = JSApi.JS_GetProperty(ctx, ex, JSApi.JS_ATOM_message);
                    var err_stack = JSApi.JS_GetProperty(ctx, ex, JSApi.JS_ATOM_stack);

                    try
                    {
                        var fileName = err_fileName.IsNullish() ? "native" : JSApi.GetString(ctx, err_fileName);
                        var lineNumber = err_lineNumber.IsNullish() ? null : JSApi.GetString(ctx, err_lineNumber);
                        var message = JSApi.GetString(ctx, err_message);
                        var stack = JSApi.GetString(ctx, err_stack);

                        if (string.IsNullOrEmpty(lineNumber))
                        {
                            if (string.IsNullOrEmpty(stack))
                            {
                                logger.Write(logLevel, "[{0}] {1} {2}",
                                    fileName, title, message);
                            }
                            else
                            {
                                logger.Write(logLevel, "[{0}] {1} {2}\nJavascript stack:\n{3}",
                                    fileName, title, message, stack);
                            }
                        }
                        else
                        {
                            if (string.IsNullOrEmpty(stack))
                            {
                                logger.Write(logLevel, "[{0}:{1}] {2} {3}",
                                fileName, lineNumber, title, message);
                            }
                            else
                            {
                                logger.Write(logLevel, "[{0}:{1}] {2} {3}\nJavascript stack:\n{4}",
                                    fileName, lineNumber, title, message, stack);
                            }
                        }
                    }
                    finally
                    {
                        JSApi.JS_FreeValue(ctx, err_fileName);
                        JSApi.JS_FreeValue(ctx, err_lineNumber);
                        JSApi.JS_FreeValue(ctx, err_message);
                        JSApi.JS_FreeValue(ctx, err_stack);
                    }
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
                    var reasonStr = JSApi.GetString(ctx, reason);
                    var is_error = JSApi.JS_IsError(ctx, reason);

                    do
                    {
                        if (is_error == 1)
                        {
                            var val = JSApi.JS_GetPropertyStr(ctx, reason, "stack");
                            if (!JSApi.JS_IsUndefined(val))
                            {
                                var stack = JSApi.GetString(ctx, val);
                                JSApi.JS_FreeValue(ctx, val);
                                logger.Write(Utils.LogLevel.Error, "Unhandled promise rejection: {0}\n{1}", reasonStr, stack);
                                return;
                            }
                            JSApi.JS_FreeValue(ctx, val);
                        }
                        logger.Write(Utils.LogLevel.Error, "Unhandled promise rejection: {0}", reasonStr);
                    } while (false);
                }
            }
        }
    }
}