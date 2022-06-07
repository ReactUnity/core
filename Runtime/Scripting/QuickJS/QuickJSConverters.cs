#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
using QuickJS;
using QuickJS.Binding;
using QuickJS.Native;
using ReactUnity.Helpers;

namespace ReactUnity.Scripting
{
    public static class QuickJSConverters
    {
        public static void RegisterAllConverters()
        {
            Values.register_type_caster<Array>(js_push_array);
            Values.register_type_caster<Delegate>(js_push_delegate);
            Values.register_type_caster<object>(js_get_classvalue);
            Values.register_type_caster<Callback>(js_get_classvalue);
        }

        public static JSValue js_push_array(JSContext ctx, Array o)
        {
            if (o == null) return JSApi.JS_NULL;
            return Values.PushArray(ctx, o);
        }

        public static JSValue js_push_delegate(JSContext ctx, Delegate o)
        {
            if (o == null) return JSApi.JS_NULL;

            var dDelegate = o.Target as ScriptDelegate;
            if (dDelegate != null) return JSApi.JS_DupValue(ctx, dDelegate);

            var context = ScriptEngine.GetContext(ctx);
            var db = context.GetTypeDB();
            var delegateVal = db.NewDynamicDelegate(context.GetAtom(o.Method.Name ?? "dynamicDelegate"), o);
            return delegateVal;
        }

        public static bool js_get_classvalue(JSContext ctx, JSValue val, out object o)
        {
            if (Values.js_get_classvalue(ctx, val, out ScriptValue sv))
            {
                o = sv;
                return true;
            }

            o = null;
            return false;
        }

        public static bool js_get_classvalue(JSContext ctx, JSValue val, out Callback o)
        {
            if (Values.js_get_classvalue(ctx, val, out ScriptValue sv))
            {
                o = Callback.From(sv);
                return true;
            }

            o = null;
            return false;
        }
    }
}
#endif
