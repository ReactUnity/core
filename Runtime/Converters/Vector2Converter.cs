using Jint;
using Jint.Native;
using UnityEngine;

namespace ReactUnity.Converters
{
    public static class Vector2Converter
    {
        public static Vector2? FromJsValue(JsValue obj)
        {
            if (obj == null || obj.IsNull() || obj.IsUndefined()) return null;

            if (obj.IsNumber())
            {
                var num = (float)obj.AsNumber();
                return new Vector2(num, num);
            }

            if (obj.IsArray())
            {
                var v0 = obj.AsArray()[0];
                var v1 = obj.AsArray()[1];

                var x = v0.IsNumber() ? (float)v0.AsNumber() : 0;
                var y = v1.IsNumber() ? (float)v1.AsNumber() : 0;
                return new Vector2(x, y);
            }

            if (obj.IsObject())
            {
                var ob = obj.AsObject();

                var v0 = ob.Get("x");
                var v1 = ob.Get("y");

                var x = v0.IsNumber() ? (float)v0.AsNumber() : 0;
                var y = v1.IsNumber() ? (float)v1.AsNumber() : 0;

                return new Vector2(x, y);
            }

            return null;
        }
    }
}
