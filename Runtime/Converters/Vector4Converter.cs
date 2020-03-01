using Jint;
using Jint.Native;
using UnityEngine;

namespace ReactUnity.Converters
{
    public static class Vector4Converter
    {
        public static Vector4? FromJsValue(JsValue obj)
        {
            if (obj == null || obj.IsNull() || obj.IsUndefined()) return null;

            if (obj.IsNumber())
            {
                var num = (float)obj.AsNumber();
                return new Vector4(num, num, num, num);
            }

            if (obj.IsArray())
            {
                var len = obj.AsArray().Length;

                var v0 = obj.AsArray()[0];
                var v1 = obj.AsArray()[1];
                var v2 = obj.AsArray()[2];
                var v3 = obj.AsArray()[3];

                var x = v0.IsNumber() ? (float)v0.AsNumber() : 0;
                var y = v1.IsNumber() ? (float)v1.AsNumber() : 0;
                var z = v2.IsNumber() ? (float)v2.AsNumber() : 0;
                var w = v3.IsNumber() ? (float)v3.AsNumber() : 0;
                return new Vector4(x, y, z, w);
            }

            if (obj.IsObject())
            {
                var ob = obj.AsObject();

                var v0 = ob.Get("x");
                var v1 = ob.Get("y");
                var v2 = ob.Get("z");
                var v3 = ob.Get("w");

                var x = v0.IsNumber() ? (float)v0.AsNumber() : 0;
                var y = v1.IsNumber() ? (float)v1.AsNumber() : 0;
                var z = v2.IsNumber() ? (float)v2.AsNumber() : 0;
                var w = v3.IsNumber() ? (float)v3.AsNumber() : 0;

                return new Vector4(x, y, z, w);
            }

            return null;
        }
    }
}
