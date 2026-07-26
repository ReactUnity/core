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
        public static JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Color32 o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(byte) * 4);
            if (!JSApi.JS_IsException(val))
            {
                JSApi.jsb_set_byte_4(ctx, val, o.r, o.g, o.b, o.a);
            }
            return val;
        }

        public static bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Color32 o)
        {
            return JSApi.jsb_set_byte_4(ctx, this_obj, o.r, o.g, o.b, o.a) == 1;
        }

        public static JSValue js_push_structvalue(JSContext ctx, Color32 o)
        {
            var proto = FindPrototypeOf<Color32>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(byte) * 4);
            JSApi.jsb_set_byte_4(ctx, val, o.r, o.g, o.b, o.a);
            return val;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Color32 o)
        {
            byte r, g, b, a;
            var ret = JSApi.jsb_get_byte_4(ctx, val, out r, out g, out b, out a);
            o = new Color32((byte)r, (byte)g, (byte)b, (byte)a);
            return ret != 0;
        }

        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Color32? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }
            byte r, g, b, a;
            var ret = JSApi.jsb_get_byte_4(ctx, val, out r, out g, out b, out a);
            o = new Color32((byte)r, (byte)g, (byte)b, (byte)a);
            return ret != 0;
        }
        
        public static bool js_get_structvalue(JSContext ctx, JSValue val, out Color32[] o)
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
                o = new Color32[length];
                for (var i = 0U; i < length; i++)
                {
                    var eVal = JSApi.JS_GetPropertyUint32(ctx, val, i);
                    Color32 e;
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
            
            return js_get_classvalue<Color32[]>(ctx, val, out o);
        }
    }
}
#endif