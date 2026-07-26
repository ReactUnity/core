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
        public static JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Color o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(float) * 4);
            if (!JSApi.JS_IsException(val))
            {
                JSApi.jsb_set_float_4(ctx, val, o.r, o.g, o.b, o.a);
            }
            return val;
        }

        public static bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Color o)
        {
            return JSApi.jsb_set_float_4(ctx, this_obj, o.r, o.g, o.b, o.a) == 1;
        }

        public static JSValue js_push_structvalue(JSContext ctx, Color o)
        {
            var proto = FindPrototypeOf<Color>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(float) * 4);
            JSApi.jsb_set_float_4(ctx, val, o.r, o.g, o.b, o.a);
            return val;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Color o)
        {
            float r, g, b, a;
            var ret = JSApi.jsb_get_float_4(ctx, val, out r, out g, out b, out a);
            if (ret != 0)
            {
                o = new Color(r, g, b, a);
                return true;
            }

            float[] batch;
            if (js_get_primitive(ctx, val, out batch))
            {
                var len = batch.Length;
                switch (len)
                {
                    case 4: o = new Color(batch[0], batch[1], batch[2], batch[3]); return true;
                    case 3: o = new Color(batch[0], batch[1], batch[2]); return true;
                    case 2: o = new Color(batch[0], batch[1], 1.0f); return true;
                    case 1: o = new Color(batch[0], 1.0f, 1.0f); return true;
                    default: o = new Color(); return true;
                }
            }
            o = new Color(); 
            return false;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Color? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }

            Color v;
            var rval = js_get_structvalue(ctx, val, out v);
            o = v;
            return rval;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Color[] o)
        {
            var isArray = JSApi.JS_IsArray(ctx, val);
            if (isArray == 1)
            {
                var lengthVal = JSApi.JS_GetProperty(ctx, val, JSApi.JS_ATOM_length);
                if (JSApi.JS_IsException(lengthVal))
                {
                    o = null;
                    return WriteScriptError(ctx);
                }
                int length;
                JSApi.JS_ToInt32(ctx, out length, lengthVal);
                JSApi.JS_FreeValue(ctx, lengthVal);
                o = new Color[length];
                for (var i = 0U; i < length; i++)
                {
                    var eVal = JSApi.JS_GetPropertyUint32(ctx, val, i);
                    Color e;
                    if (js_get_structvalue(ctx, eVal, out e))
                    {
                        o[i] = e;
                        JSApi.JS_FreeValue(ctx, eVal);
                    }
                    else
                    {
                        o = null;
                        JSApi.JS_FreeValue(ctx, eVal);
                        return false;
                    }
                }
                return true;
            }

            if (isArray == -1)
            {
                o = null;
                return false;
            }

            return js_get_classvalue<Color[]>(ctx, val, out o);
        }
    }
}
#endif