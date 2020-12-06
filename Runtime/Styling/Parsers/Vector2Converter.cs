using Jint;
using Jint.Native;
using ReactUnity.Styling.Types;
using System.Collections;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class Vector2Converter : IStyleParser, IStyleConverter
    {
        IStyleConverter FloatParser = ParserMap.FloatConverter;
        char[] splitters = new char[] { ' ', ',' };

        public object FromString(string value)
        {
            var values = value.Split(splitters);

            if (values.Length == 1)
            {
                var pr = FloatParser.Convert(values[0]);
                if (pr is float fl) return new Vector2(fl, fl);
            }

            if (values.Length == 2)
            {
                var pr1 = FloatParser.Convert(values[0]);
                var pr2 = FloatParser.Convert(values[1]);
                if (pr1 is float fl1)
                    if (pr2 is float fl2)
                        return new Vector2(fl1, fl2);
            }

            return SpecialNames.CantParse;
        }

        public object Convert(object value)
        {
            if (value is double d) return new Vector2((float) d, (float) d);
            if (value is float f) return new Vector2(f, f);
            if (value is int i) return new Vector2(i, i);
            if (!(value is string) && (value is IEnumerable e)) return FromArray(e);
            return FromString(value?.ToString());
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
    }
}
