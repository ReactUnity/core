using Jint;
using Jint.Native;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Converters
{
    public static class ColorConverter
    {
        public static Color? FromJsValue(JsValue obj)
        {
            if (obj == null || obj.IsNull() || obj.IsUndefined()) return null;

            if (obj.IsString())
            {
                var s = obj.ToString();
                ColorUtility.TryParseHtmlString(s, out var color);
                return color;
            }

            if (obj.IsNumber())
            {
                var num = (float)obj.AsNumber();
                return new Color(num, num, num, 1);
            }

            if (obj.IsArray())
            {
                var len = obj.AsArray().Length;

                if (len == 0) return Color.clear;

                var v0 = obj.AsArray()[0];
                var v1 = obj.AsArray()[1];
                var v2 = obj.AsArray()[2];
                var v3 = obj.AsArray()[3];

                if (v0 != null && !v0.IsNumber() && !v0.IsNull() && !v0.IsUndefined())
                {
                    var start = FromJsValue(v0) ?? Color.clear;
                    var end = FromJsValue(v2);
                    if (end.HasValue)
                    {
                        var t = v1.IsNumber() ? (float)v1.AsNumber() : 0;
                        return Color.LerpUnclamped(start, end.Value, t);
                    }
                    else
                    {
                        var t = v1.IsNumber() ? (float)v1.AsNumber() : 1;
                        start.a = t;
                        return start;
                    }
                }

                var r = v0.IsNumber() ? (float)v0.AsNumber() : 0;
                var g = v1.IsNumber() ? (float)v1.AsNumber() : 0;
                var b = v2.IsNumber() ? (float)v2.AsNumber() : 0;
                var a = v3.IsNumber() ? (float)v3.AsNumber() : 1;

                return new Color(r, g, b, a);
            }

            if (obj.IsObject())
            {
                var ob = obj.AsObject();

                var v0 = ob.Get("r");
                var v1 = ob.Get("g");
                var v2 = ob.Get("b");
                var v3 = ob.Get("a");

                var r = v0.IsNumber() ? (float)v0.AsNumber() : 0;
                var g = v1.IsNumber() ? (float)v1.AsNumber() : 0;
                var b = v2.IsNumber() ? (float)v2.AsNumber() : 0;
                var a = v3.IsNumber() ? (float)v3.AsNumber() : 1;

                return new Color(r, g, b, a);
            }

            return null;
        }
    }
}
