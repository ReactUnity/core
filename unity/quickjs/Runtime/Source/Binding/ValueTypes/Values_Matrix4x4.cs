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
        public static unsafe JSValue NewBridgeClassObject(JSContext ctx, JSValue new_target, Matrix4x4 o, int type_id, bool disposable)
        {
            var val = JSApi.JSB_NewBridgeClassValue(ctx, new_target, sizeof(float) * 4 * 4);
            if (!JSApi.JS_IsException(val))
            {
                js_rebind_this(ctx, val, ref o);
            }
            return val;
        }

        public static unsafe bool js_rebind_this(JSContext ctx, JSValue this_obj, ref Matrix4x4 o)
        {
            var _matrix_floats_buffer = stackalloc float[16];

            _matrix_floats_buffer[0] = o.m00;
            _matrix_floats_buffer[1] = o.m10;
            _matrix_floats_buffer[2] = o.m20;
            _matrix_floats_buffer[3] = o.m30;

            _matrix_floats_buffer[4] = o.m01;
            _matrix_floats_buffer[5] = o.m11;
            _matrix_floats_buffer[6] = o.m21;
            _matrix_floats_buffer[7] = o.m31;

            _matrix_floats_buffer[8] = o.m02;
            _matrix_floats_buffer[9] = o.m12;
            _matrix_floats_buffer[10] = o.m22;
            _matrix_floats_buffer[11] = o.m32;

            _matrix_floats_buffer[12] = o.m03;
            _matrix_floats_buffer[13] = o.m13;
            _matrix_floats_buffer[14] = o.m23;
            _matrix_floats_buffer[15] = o.m33;

            return JSApi.jsb_set_floats(ctx, this_obj, 4 * 4, _matrix_floats_buffer) == 1;
        }

        public static unsafe JSValue js_push_structvalue(JSContext ctx, Matrix4x4 o)
        {
            var proto = FindPrototypeOf<Matrix4x4>(ctx);
            JSValue val = JSApi.jsb_new_bridge_value(ctx, proto, sizeof(float) * 4 * 4);

            js_rebind_this(ctx, val, ref o);
            return val;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out Matrix4x4 o)
        {
            var _matrix_floats_buffer = stackalloc float[16];
            var ret = JSApi.jsb_get_floats(ctx, val, 16, _matrix_floats_buffer);
            var c0 = new Vector4(_matrix_floats_buffer[0], _matrix_floats_buffer[1], _matrix_floats_buffer[2], _matrix_floats_buffer[3]);
            var c1 = new Vector4(_matrix_floats_buffer[4], _matrix_floats_buffer[5], _matrix_floats_buffer[6], _matrix_floats_buffer[7]);
            var c2 = new Vector4(_matrix_floats_buffer[8], _matrix_floats_buffer[8], _matrix_floats_buffer[10], _matrix_floats_buffer[11]);
            var c3 = new Vector4(_matrix_floats_buffer[12], _matrix_floats_buffer[13], _matrix_floats_buffer[14], _matrix_floats_buffer[15]);
            o = new Matrix4x4(c0, c1, c2, c3);
            return ret != 0;
        }

        public static unsafe bool js_get_structvalue(JSContext ctx, JSValue val, out Matrix4x4? o)
        {
            if (val.IsNullish())
            {
                o = null;
                return true;
            }
            var _matrix_floats_buffer = stackalloc float[16];
            var ret = JSApi.jsb_get_floats(ctx, val, 16, _matrix_floats_buffer);
            var c0 = new Vector4(_matrix_floats_buffer[0], _matrix_floats_buffer[1], _matrix_floats_buffer[2], _matrix_floats_buffer[3]);
            var c1 = new Vector4(_matrix_floats_buffer[4], _matrix_floats_buffer[5], _matrix_floats_buffer[6], _matrix_floats_buffer[7]);
            var c2 = new Vector4(_matrix_floats_buffer[8], _matrix_floats_buffer[8], _matrix_floats_buffer[10], _matrix_floats_buffer[11]);
            var c3 = new Vector4(_matrix_floats_buffer[12], _matrix_floats_buffer[13], _matrix_floats_buffer[14], _matrix_floats_buffer[15]);
            o = new Matrix4x4(c0, c1, c2, c3);
            return ret != 0;
        }
    }
}
#endif