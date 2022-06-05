using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    // [experimental][NOT_IMPLEMENTED] caster for hotfix
    public partial class Values
    {
        public static JSValue hotfix_push_classvalue(JSContext ctx, Type type)
        {
            if (type == null)
            {
                return JSApi.JS_NULL;
            }

            var runtime = ScriptEngine.GetRuntime(ctx);
            var db = runtime.GetTypeDB();

            return db.GetConstructorOf(type);
        }

        // 用于热更 C# 代码中传入的 this
        public static JSValue hotfix_push_classvalue(JSContext ctx, object this_obj)
        {
            if (this_obj == null)
            {
                return JSApi.JS_NULL;
            }

            return js_push_object(ctx, this_obj);
        }
    }
}
