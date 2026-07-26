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
        public static unsafe JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Bounds o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(float) * 6);
            if (!JSApi.JS_IsException(val))
            {
                js_rebind_this(ctx, val, ref o);
            }
            return val;
        }

        public static unsafe bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Bounds o)
        {
            var data = stackalloc float[6];
            var center = o.center;
            var size = o.size;
            
            JSApi.MemoryCopy(&center.x, data, sizeof(float) * 3, sizeof(float) * 3);
            JSApi.MemoryCopy(&size.x, data + 3, sizeof(float) * 3, sizeof(float) * 3);
            return JSApi.jsb_set_floats(ctx, this_obj, 6, data) == 1;
        }

        public static JSValue js_push_structvalue(JSContext ctx, Bounds o)
        {
            var proto = FindPrototypeOf<Bounds>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(float) * 6);
            js_rebind_this(ctx, val, ref o);
            return val;
        }

        public static JSValue js_push_structvalue(JSContext ctx, Bounds? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            var proto = FindPrototypeOf<Bounds>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(float) * 6);
            var v = (Bounds)o;
            js_rebind_this(ctx, val, ref v);
            return val;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out Bounds o)
        {
            var data = stackalloc float[6];
            var ret = JSApi.jsb_get_floats(ctx, val, 6, data);
            o = new Bounds(new Vector3(data[0], data[1], data[2]), new Vector3(data[3], data[4], data[5]));
            return ret != 0;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out Bounds? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }
            var data = stackalloc float[6];
            var ret = JSApi.jsb_get_floats(ctx, val, 6, data);
            o = new Bounds(new Vector3(data[0], data[1], data[2]), new Vector3(data[3], data[4], data[5]));
            return ret != 0;
        }
    }
}
#endif