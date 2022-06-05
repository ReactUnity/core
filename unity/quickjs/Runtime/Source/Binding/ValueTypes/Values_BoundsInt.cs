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
        public static unsafe JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, BoundsInt o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(int) * 6);
            if (!JSApi.JS_IsException(val))
            {
                js_rebind_this(ctx, val, ref o);
            }
            return val;
        }

        public static unsafe bool js_rebind_this(JSContext ctx, JSValue this_obj, ref BoundsInt o)
        {
            var data = stackalloc int[6];
            var position = o.position;
            var size = o.size;
            data[0] = position.x;
            data[1] = position.y;
            data[2] = position.z;
            data[3] = size.x;
            data[4] = size.y;
            data[5] = size.z;
            return JSApi.jsb_set_bytes(ctx, this_obj, sizeof(int) * 6, (byte*)data) == 1;
        }

        public static JSValue js_push_structvalue(JSContext ctx, BoundsInt o)
        {
            var proto = FindPrototypeOf<BoundsInt>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(int) * 6);
            js_rebind_this(ctx, val, ref o);
            return val;
        }

        public static JSValue js_push_structvalue(JSContext ctx, BoundsInt? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            var proto = FindPrototypeOf<BoundsInt>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(int) * 6);
            var v = (BoundsInt)o;
            js_rebind_this(ctx, val, ref v);
            return val;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out BoundsInt o)
        {
            var data = stackalloc int[6];
            var ret = JSApi.jsb_get_bytes(ctx, val, sizeof(int) * 6, (byte*)data);
            o = new BoundsInt(new Vector3Int(data[0], data[1], data[2]), new Vector3Int(data[3], data[4], data[5]));
            return ret != 0;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out BoundsInt? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }
            var data = stackalloc int[6];
            var ret = JSApi.jsb_get_bytes(ctx, val, sizeof(int) * 6, (byte*)data);
            o = new BoundsInt(new Vector3Int(data[0], data[1], data[2]), new Vector3Int(data[3], data[4], data[5]));
            return ret != 0;
        }
    }
}
#endif