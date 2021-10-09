using System.Collections;
using System.Linq;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Converters
{
    public class Vector2Converter : IStyleParser, IStyleConverter
    {
        IStyleConverter FloatParser = AllConverters.FloatConverter;
        char[] splitters = new char[] { ' ', ',' };

        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public object Parse(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return CssKeyword.Invalid;

            var sp = ParseFromPositioningLiteral(value);
            if (sp is Vector2 s) return s;

            var values = value.Split(splitters);

            if (values.Length == 1)
            {
                var pr = FloatParser.Parse(values[0]);
                if (pr is float fl) return new Vector2(fl, fl);
            }

            if (values.Length == 2)
            {
                var pr1 = FloatParser.Parse(values[0]);
                var pr2 = FloatParser.Parse(values[1]);
                if (pr1 is float fl1)
                    if (pr2 is float fl2)
                        return new Vector2(fl1, fl2);
            }

            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value is Vector2 v) return v;
            if (value is Vector3 v3) return new Vector2(v3.x, v3.y);
            if (value is Vector4 v4) return new Vector2(v4.x, v4.y);
            if (value is double d) return new Vector2((float) d, (float) d);
            if (value is float f) return new Vector2(f, f);
            if (value is int i) return new Vector2(i, i);
            if (!(value is string) && (value is IEnumerable e)) return FromArray(e);
            return Parse(value?.ToString());
        }

        private object FromArray(IEnumerable obj)
        {
            var arr = obj.OfType<object>().ToArray();
            var len = arr.Length;

            if (len == 0) return Vector2.zero;

            var v0 = arr.ElementAtOrDefault(0);
            var v1 = arr.ElementAtOrDefault(1);


            var v0f = FloatParser.Convert(v0);
            var v1f = FloatParser.Convert(v1);

            var r = v0f as float? ?? 0;
            var g = v1f as float? ?? 0;

            return new Vector2(r, g);
        }

        private object ParseFromPositioningLiteral(string str)
        {
            var x = 0f;
            var y = 0f;

            if (str.Contains("top"))
            {
                x = 0.5f;
                y = 1;
                if (str.Contains("left")) x = 0;
                if (str.Contains("right")) x = 1;
            }
            else if (str.Contains("bottom"))
            {
                x = 0.5f;
                y = 0;
                if (str.Contains("left")) x = 0;
                if (str.Contains("right")) x = 1;
            }
            else if (str.Contains("center"))
            {
                x = 0.5f;
                y = 0.5f;
                if (str.Contains("left")) x = 0;
                if (str.Contains("right")) x = 1;
            }
            else if (str.Contains("left"))
            {
                x = 0;
                y = 0.5f;
            }
            else if (str.Contains("right"))
            {
                x = 1;
                y = 0.5f;
            }
            else
            {
                return CssKeyword.Invalid;
            }

            return new Vector2(x, y);
        }
    }
}
