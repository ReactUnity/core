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
            if (value is double d) return new YogaValue2((float) d, (float) d);
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
    }
}
