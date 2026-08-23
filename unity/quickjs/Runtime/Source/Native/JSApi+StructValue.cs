using System;
using System.Runtime.InteropServices;
using System.Text;

namespace QuickJS.Native
{
    using int32_t = Int32;
    using uint32_t = UInt32;
    using JS_BOOL = Int32;

    public partial class JSApi
    {
        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue jsb_new_bridge_object(JSContext ctx, JSValue proto, int object_id);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JSB_NewBridgeClassObject(JSContext ctx, JSValue new_target, int object_id);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue jsb_new_bridge_value(JSContext ctx, JSValue proto, uint32_t size);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSValue JSB_NewBridgeClassValue(JSContext ctx, JSValue new_target, int32_t size);

        public static bool JSB_SetBridgeType(JSContext ctx, JSValue obj, JSAtom key, int32_t type)
        {
            if (obj.tag == JS_TAG_OBJECT)
            {
                JS_DefinePropertyValue(ctx, obj, key, JS_NewInt32(ctx, type));
                return true;
            }

            return false;
        }

        public static int32_t JSB_GetBridgeType(JSContext ctx, JSValue obj, JSAtom key)
        {
            if (obj.tag == JS_TAG_OBJECT)
            {
                var val = JS_GetProperty(ctx, obj, key);
                int32_t pres;
                if (JS_ToInt32(ctx, out pres, val) == 0)
                {
                    JS_FreeValue(ctx, val);
                    return pres;
                }
                JS_FreeValue(ctx, val);
            }

            return -1;
        }

        // !!!

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern JSPayloadHeader jsb_get_payload_header(JSContext ctx, JSValue val);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JS_BOOL jsb_get_bytes(JSContext ctx, JSValue val, int n, byte* v0);

        [DllImport(JSBDLL, CallingConvention = CallingConvention.Cdecl)]
        public static extern unsafe JS_BOOL jsb_set_bytes(JSContext ctx, JSValue val, int n, byte* v0);

        public static unsafe JS_BOOL jsb_get_bytes(JSContext ctx, JSValue val, out long v0)
        {
            long v;
            var ret = jsb_get_bytes(ctx, val, sizeof(long), (byte*)&v);
            v0 = v;
            return ret;
        }

        public static unsafe JS_BOOL jsb_set_bytes(JSContext ctx, JSValue val, long v0)
        {
            long* p = &v0;
            return JSApi.jsb_set_bytes(ctx, val, sizeof(long), (byte*)p);
        }
    }
}
