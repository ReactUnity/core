#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using UnityEngine;
    using Native;

    public partial class Values
    {
        public static JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Vector2Int o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(int) * 2);
            if (!JSApi.JS_IsException(val))
            {
                JSApi.jsb_set_int_2(ctx, val, o.x, o.y);
            }
            return val;
        }

        public static bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Vector2Int o)
        {
            return JSApi.jsb_set_int_2(ctx, this_obj, o.x, o.y) == 1;
        }

        public static JSValue js_push_structvalue(JSContext ctx, Vector2Int o)
        {
            var proto = FindPrototypeOf<Vector2Int>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(int) * 2);
            JSApi.jsb_set_int_2(ctx, val, o.x, o.y);
            return val;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Vector2Int o)
        {
            int x, y;
            var ret = JSApi.jsb_get_int_2(ctx, val, out x, out y);
            o = new Vector2Int(x, y);
            return ret != 0;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Vector2Int? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }
            int x, y;
            var ret = JSApi.jsb_get_int_2(ctx, val, out x, out y);
            o = new Vector2Int(x, y);
            return ret != 0;
        }

    }
}
#endif