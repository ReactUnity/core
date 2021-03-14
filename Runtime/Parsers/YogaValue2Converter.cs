using System.Collections;
using UnityEngine;
using ReactUnity.Styling.Types;
using System.Linq;
using Facebook.Yoga;
using ReactUnity.Types;

namespace ReactUnity.Styling.Parsers
{
    public class YogaValue2Converter : IStyleParser, IStyleConverter
    {
        IStyleConverter YogaValueParser = ParserMap.YogaValueConverter;
        char[] splitters = new char[] { ' ', ',' };

        public object FromString(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return SpecialNames.CantParse;

            var sp = ParseFromPositioningLiteral(value);
            if (sp is YogaValue2 s) return s;

            var values = value.Split(splitters);

            if (values.Length == 1)
            {
                var pr = YogaValueParser.Convert(values[0]);
                if (pr is YogaValue fl) return new YogaValue2(fl, fl);
            }

            if (values.Length == 2)
            {
                var pr1 = YogaValueParser.Convert(values[0]);
                var pr2 = YogaValueParser.Convert(values[1]);
                if (pr1 is YogaValue fl1)
                    if (pr2 is YogaValue fl2)
                        return new YogaValue2(fl1, fl2);
            }

            return SpecialNames.CantParse;
        }

        public object Convert(object value)
        {
            if (value is YogaValue2 o) return o;
            if (value is double d) return new YogaValue2((float)d, (float)d);
            if (value is float f) return new YogaValue2(f, f);
            if (value is int i) return new YogaValue2(i, i);
            if (value is YogaValue v) return new YogaValue2(v, v);
            if (value is Vector2 v2) return new YogaValue2(v2.x, v2.y);
            if (!(value is string) && (value is IEnumerable e)) return FromArray(e);
            return FromString(value?.ToString());
        }

        private object FromArray(IEnumerable obj)
        {
            var arr = obj.OfType<object>().ToArray();
            var len = arr.Length;

            if (len == 0) return YogaValue2.Zero;

            var v0 = arr.ElementAtOrDefault(0);
            var v1 = arr.ElementAtOrDefault(1);


            var v0f = YogaValueParser.Convert(v0);
            var v1f = YogaValueParser.Convert(v1);

            var r = v0f as YogaValue? ?? 0;
            var g = v1f as YogaValue? ?? 0;

            return new YogaValue2(r, g);
        }

        private object ParseFromPositioningLiteral(string str)
        {
            float x, y;

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
            else if (str.Contains("center"))
            {
                x = 0.5f;
                y = 0.5f;
            }
            else
            {
                return SpecialNames.CantParse;
            }

            return new YogaValue2(YogaValue.Percent(x * 100), YogaValue.Percent(y * 100));
        }
    }
}
