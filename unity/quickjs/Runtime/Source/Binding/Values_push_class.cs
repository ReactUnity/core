using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    public partial class Values
    {
#if !JSB_UNITYLESS
        // variant push
        // explicitly call UnityEngine.Object.operator == 
        public static JSValue js_push_classvalue(JSContext ctx, UnityEngine.Object o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }

            return js_push_object(ctx, (object)o);
        }
#endif

        public static JSValue js_push_classvalue(JSContext ctx, ScriptValue o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_DupValue(ctx, o);
        }

        public static unsafe JSValue js_push_classvalue(JSContext ctx, Array o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }

            return js_push_object(ctx, (object)o);
        }

        public static JSValue js_push_classvalue(JSContext ctx, ScriptPromise promise)
        {
            if (promise == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_DupValue(ctx, promise);
        }

        public static JSValue js_push_classvalue(JSContext ctx, Type o)
        {
            var context = ScriptEngine.GetContext(ctx);
            var types = context.GetTypeDB();
            var jsVal = types.GetPrototypeOf(o);
            return JSApi.JS_DupValue(ctx, jsVal);
        }

        public static JSValue js_push_classvalue(JSContext ctx, object o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }

            return js_push_object(ctx, o);
        }

        // push 一个对象实例 
        public static JSValue js_push_object(JSContext ctx, object o)
        {
            var context = ScriptEngine.GetContext(ctx);
            return context.NewBridgeObjectBind(o);
        }
    }
}
