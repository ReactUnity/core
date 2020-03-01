using Jint;
using Jint.Native;
using UnityEngine;

namespace ReactUnity.Converters
{
    public static class RectOffsetConverter
    {
        public static RectOffset FromJsValue(JsValue obj)
        {
            if (obj == null || obj.IsNull() || obj.IsUndefined()) return null;

            if (obj.IsNumber())
            {
                var num = (int)obj.AsNumber();
                return new RectOffset(num, num, num, num);
            }

            if (obj.IsArray())
            {
                var len = obj.AsArray().Length;

                var v0 = obj.AsArray()[0];
                var v1 = obj.AsArray()[1];
                var v2 = obj.AsArray()[2];
                var v3 = obj.AsArray()[3];

                var top = v0.IsNumber() ? (int)v0.AsNumber() : 0;
                var right = v1.IsNumber() ? (int)v1.AsNumber() : (len < 2 ? top : 0);
                var bottom = v2.IsNumber() ? (int)v2.AsNumber() : top;
                var left = v3.IsNumber() ? (int)v3.AsNumber() : right;
                return new RectOffset(left, right, top, bottom);
            }

            if (obj.IsObject())
            {
                var ob = obj.AsObject();
                var vert = ob.Get("vertical");
                var hor = ob.Get("horizontal");

                var v0 = ob.Get("top");
                var v1 = ob.Get("right");
                var v2 = ob.Get("bottom");
                var v3 = ob.Get("left");

                var val1 = vert.IsNumber() ? (int)vert.AsNumber() : 0;
                var val2 = hor.IsNumber() ? (int)hor.AsNumber() : 0;

                var top = v0.IsNumber() ? (int)v0.AsNumber() : val1;
                var right = v1.IsNumber() ? (int)v1.AsNumber() : val2;
                var bottom = v2.IsNumber() ? (int)v2.AsNumber() : val1;
                var left = v3.IsNumber() ? (int)v3.AsNumber() : val2;

                return new RectOffset(left, right, top, bottom);
            }

            return null;
        }
    }
}
