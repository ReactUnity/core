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
        public static JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Ray o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(float) * 6);
            if (!JSApi.JS_IsException(val))
            {
                js_rebind_this(ctx, val, ref o);
            }
            return val;
        }

        public static unsafe bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Ray o)
        {
            var buffer = stackalloc float[6];
            var origin = o.origin;
            var direction = o.direction;
            buffer[0] = origin.x;
            buffer[1] = origin.y;
            buffer[2] = origin.z;
            buffer[3] = direction.x;
            buffer[4] = direction.y;
            buffer[5] = direction.z;
            return JSApi.jsb_set_floats(ctx, this_obj, 6, buffer) == 1;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out Ray o)
        {
            var buffer = stackalloc float[6];
            var ret = JSApi.jsb_get_floats(ctx, val, 6, buffer);
            o = new Ray(new Vector3(buffer[0], buffer[1], buffer[2]), 
                new Vector3(buffer[3], buffer[4], buffer[5]));
            return ret != 0;
        }

        public static unsafe JSValue js_push_structvalue(JSContext ctx, Ray o)
        {
            var proto = FindPrototypeOf<Ray>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(float) * 6);
            var buffer = stackalloc float[6];
            var origin = o.origin;
            var direction = o.direction;
            buffer[0] = origin.x;
            buffer[1] = origin.y;
            buffer[2] = origin.z;
            buffer[3] = direction.x;
            buffer[4] = direction.y;
            buffer[5] = direction.z;
            JSApi.jsb_set_floats(ctx, val, 6, buffer);
            return val;
        }

    }
}
#endif