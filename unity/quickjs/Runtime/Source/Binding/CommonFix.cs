using System;
using System.Reflection;

namespace QuickJS.Binding
{
    using Native;

    public static class CommonFix
    {
        [MonoPInvokeCallbackAttribute(typeof(QuickJS.Native.JSCFunctionMagic))]
        public static JSValue CrossBindConstructor(JSContext ctx, JSValue new_target, int argc, JSValue[] argv, int magic)
        {
            try
            {
                if (argc == 0)
                {
                    return JSApi.jsb_crossbind_constructor(ctx, new_target);
                }
                throw new NoSuitableMethodException("constructor", argc);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
        }
    }
}
