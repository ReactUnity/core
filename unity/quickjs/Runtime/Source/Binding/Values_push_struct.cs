using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    public partial class Values
    {
        public static JSValue js_push_structvalue<T>(JSContext ctx, T o)
            where T : struct
        {
            return js_push_classvalue(ctx, o);
        }

        public static JSValue js_push_structvalue<T>(JSContext ctx, T? o)
            where T : struct
        {
            return js_push_classvalue(ctx, o);
        }
    }
}
