using Jint.Native;
using ReactUnity.Styling.Types;
using Jint;
using UnityEngine;
using System.Collections;
using System.Linq;

namespace ReactUnity.Styling.Parsers
{
    public class ColorConverter : IStyleParser, IStyleConverter
    {
        IStyleConverter floatDs = ParserMap.FloatConverter;

        public object FromString(string value)
        {
            if (value == null) return SpecialNames.CantParse;
            if (ColorUtility.TryParseHtmlString(value, out var color)) return color;
            if (value.Contains(",")) return FromArray(value.Split(','));
            return SpecialNames.CantParse;
        }

        public object Convert(object value)
        {
            if (value is Color c) return c;
            if (value is string s)
            {
                var res = FromString(s);
                if (res is Color) return res;
            }
            else if (value is IEnumerable en) return FromArray(en);

            if (value == null) return SpecialNames.CantParse;
            var fl = floatDs.Convert(value);
            if (fl is float f) return new Color(f, f, f);
            return FromString(value?.ToString());
        }

        private object FromArray(IEnumerable obj)
        {
            var arr = obj.OfType<object>().ToArray();
            var len = arr.Length;

            if (len == 0) return Color.clear;

            var v0 = arr.ElementAtOrDefault(0);
            var v1 = arr.ElementAtOrDefault(1);
            var v2 = arr.ElementAtOrDefault(2);
            var v3 = arr.ElementAtOrDefault(3);


            var v0f = floatDs.Convert(v0);
            var v1f = floatDs.Convert(v1);
            var v2f = floatDs.Convert(v2);
            var v3f = floatDs.Convert(v3);

            if (!(v0f is float))
            {
                if (len == 2 || len == 3)
                {
                    var startColor = Convert(v0);
                    var endColor = Convert(v2);

                    if (startColor is Color s)
                    {
                        if (endColor is Color e)
                        {
                            var t = v1f as float? ?? 0.5f;
                            return Color.LerpUnclamped(s, e, t);
                        }
                        else
                        {
                            var t = v1f as float? ?? 1;
                            s.a = t;
                            return s;
                        }
                    }
                }
            }

            var r = v0f as float? ?? 0;
            var g = v1f as float? ?? 0;
            var b = v2f as float? ?? 0;
            var a = v3f as float? ?? 1;

            return new Color(r, g, b, a);
        }
    }
}
