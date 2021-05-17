using ReactUnity.Styling.Types;
using System;
using System.Collections;
using System.Linq;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class Vector3Converter : IStyleParser, IStyleConverter
    {
        IStyleConverter FloatParser = Converters.FloatConverter;
        char[] splitters = new char[] { ' ', ',' };

        private Func<float, Vector3> SingleValueMode;

        public Vector3Converter(Func<float, Vector3> singleValueMode = null, IStyleConverter floatParser = null)
        {
            SingleValueMode = singleValueMode ?? ((float v) => new Vector3(v, v, v));

            if (floatParser != null) FloatParser = floatParser;
        }

        public object FromString(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return SpecialNames.CantParse;

            var values = value.Split(splitters);

            if (values.Length == 1)
            {
                var pr = FloatParser.Convert(values[0]);
                if (pr is float fl) return SingleValueMode(fl);
            }

            if (values.Length == 2)
            {
                var pr1 = FloatParser.Convert(values[0]);
                var pr2 = FloatParser.Convert(values[1]);
                if (pr1 is float fl1)
                    if (pr2 is float fl2)
                        return new Vector3(fl1, fl2, 0);
            }

            if (values.Length == 3)
            {
                var pr1 = FloatParser.Convert(values[0]);
                var pr2 = FloatParser.Convert(values[1]);
                var pr3 = FloatParser.Convert(values[2]);
                if (pr1 is float fl1)
                    if (pr2 is float fl2)
                        if (pr3 is float fl3)
                            return new Vector3(fl1, fl2, fl3);
            }

            return SpecialNames.CantParse;
        }

        public object Convert(object value)
        {
            if (value is Vector2 v) return new Vector3(v.x, v.y);
            if (value is Vector3 v3) return v3;
            if (value is Vector4 v4) return new Vector3(v4.x, v4.y, v4.z);
            if (value is double d) return SingleValueMode((float)d);
            if (value is float f) return SingleValueMode(f);
            if (value is int i) return SingleValueMode(i);
            if (!(value is string) && (value is IEnumerable e)) return FromArray(e);
            return FromString(value?.ToString());
        }

        private object FromArray(IEnumerable obj)
        {
            var arr = obj.OfType<object>().ToArray();
            var len = arr.Length;

            if (len == 0) return Vector3.zero;

            var v0 = arr.ElementAtOrDefault(0);
            var v0f = FloatParser.Convert(v0);
            var x = v0f as float? ?? 0;

            if (len == 1) return SingleValueMode(x);

            var v1 = arr.ElementAtOrDefault(1);
            var v2 = arr.ElementAtOrDefault(2);

            var v1f = FloatParser.Convert(v1);
            var v2f = FloatParser.Convert(v2);

            var y = v1f as float? ?? 0;
            var z = v2f as float? ?? 0;

            return new Vector3(x, y, z);
        }
    }
}
