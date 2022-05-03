using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public class Vector3Converter : TypedStyleConverterBase<Vector3>
    {
        private static HashSet<string> DefaultAllowedFunctions = new HashSet<string> { "vector3" };
        protected override HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

        private StyleConverterBase FloatParser = AllConverters.FloatConverter;
        private Func<float, Vector3> SingleValueMode;
        private float DefaultZValue = 0;

        public Vector3Converter(Func<float, Vector3> singleValueMode = null, StyleConverterBase floatParser = null, float defaultZValue = 0)
        {
            SingleValueMode = singleValueMode ?? ((float v) => new Vector3(v, v, v));

            if (floatParser != null) FloatParser = floatParser;

            DefaultZValue = defaultZValue;
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var values = ParserHelpers.SplitWhitespace(value);

            if (values.Count == 1) return SinglePositional(values[0], out result);
            if (values.Count == 2) return TwoPositional(values[0], values[1], out result);
            if (values.Count == 3) return ThreePositional(values[0], values[1], values[2], out result);

            return base.ParseInternal(value, out result);
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            if (value is Vector2 v) return Constant(new Vector3(v.x, v.y), out result);
            if (value is Vector4 v4) return Constant(new Vector3(v4.x, v4.y, v4.z), out result);
            if (value is double d) return Constant(SingleValueMode((float) d), out result);
            if (value is float f) return Constant(SingleValueMode(f), out result);
            if (value is int i) return Constant(SingleValueMode(i), out result);
            if (value is IEnumerable e) return FromArray(e, out result);

            return base.ConvertInternal(value, out result);

        }

        private bool FromArray(IEnumerable obj, out IComputedValue result)
        {
            var arr = obj.OfType<object>().ToArray();
            var len = arr.Length;

            if (len == 0) return Constant(Vector3.zero, out result);
            if (len == 1) return SinglePositional(arr.ElementAt(0), out result);
            if (len == 2) return TwoPositional(arr.ElementAt(0), arr.ElementAt(1), out result);

            return ThreePositional(arr.ElementAt(0), arr.ElementAt(1), arr.ElementAt(2), out result);
        }


        private bool SinglePositional(object pos1, out IComputedValue result)
        {
            return ComputedMapper.Create(out result,
                pos1,
                FloatParser,
                (resolvedValue) => {
                    if (resolvedValue is float fl) return SingleValueMode(fl);
                    return null;
                });
        }

        private bool TwoPositional(object pos1, object pos2, out IComputedValue result)
        {
            return ComputedList.Create(out result,
                new List<object> { pos1, pos2 },
                FloatParser,
                (resolvedValues) => {
                    if (resolvedValues[0] is float fl1 && resolvedValues[1] is float fl2)
                        return new Vector3(fl1, fl2, DefaultZValue);
                    return null;
                });

        }

        private bool ThreePositional(object pos1, object pos2, object pos3, out IComputedValue result)
        {
            return ComputedList.Create(out result,
                new List<object> { pos1, pos2, pos3 },
                FloatParser,
                (resolvedValues) => {
                    if (resolvedValues[0] is float fl1 && resolvedValues[1] is float fl2 && resolvedValues[2] is float fl3)
                        return new Vector3(fl1, fl2, fl3);
                    return null;
                });
        }
    }
}
