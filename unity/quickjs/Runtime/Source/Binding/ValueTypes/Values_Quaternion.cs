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
        public static JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Quaternion o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(float) * 4);
            if (!JSApi.JS_IsException(val))
            {
                JSApi.jsb_set_float_4(ctx, val, o.x, o.y, o.z, o.w);
            }
            return val;
        }

        public static bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Quaternion o)
        {
            return JSApi.jsb_set_float_4(ctx, this_obj, o.x, o.y, o.z, o.w) == 1;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Quaternion o)
        {
            float x, y, z, w;
            var ret = JSApi.jsb_get_float_4(ctx, val, out x, out y, out z, out w);
            o = new Quaternion(x, y, z, w);
            return ret != 0;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Quaternion? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }
            float x, y, z, w;
            var ret = JSApi.jsb_get_float_4(ctx, val, out x, out y, out z, out w);
            o = new Quaternion(x, y, z, w);
            return ret != 0;
        }

        public static JSValue js_push_structvalue(JSContext ctx, Quaternion o)
        {
            var proto = FindPrototypeOf<Quaternion>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(float) * 4);
            JSApi.jsb_set_float_4(ctx, val, o.x, o.y, o.z, o.w);
            return val;
        }

    }
}
#endif