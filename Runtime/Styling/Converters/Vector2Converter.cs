using System.Collections;
using System.Collections.Generic;
using System.Linq;

using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public class Vector2Converter : StyleConverterBase
    {
        static StyleConverterBase FloatParser = AllConverters.FloatConverter;

        private static HashSet<string> DefaultAllowedFunctions = new HashSet<string> { "vector2" };
        protected override HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

        protected override System.Type TargetType => typeof(Vector2);

        public bool AllowLiterals { get; } = true;

        public Vector2Converter(bool allowLiterals = true)
        {
            AllowLiterals = allowLiterals;
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (ParseFromPositioningLiteral(value, out result)) return true;

            var values = ParserHelpers.SplitWhitespace(value);

            if (values.Count == 1) return SinglePositional(values[0], out result);

            if (values.Count == 2) return TwoPositional(values[0], values[1], out result);

            return base.ParseInternal(value, out result);

        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            if (value is Vector3 v3) return Constant(new Vector2(v3.x, v3.y), out result);
            if (value is Vector4 v4) return Constant(new Vector2(v4.x, v4.y), out result);
            if (value is double d) return Constant(new Vector2((float) d, (float) d), out result);
            if (value is float f) return Constant(new Vector2(f, f), out result);
            if (value is int i) return Constant(new Vector2(i, i), out result);
            if (value is IEnumerable e) return FromArray(e, out result);
            return base.ConvertInternal(value, out result);
        }

        private bool SinglePositional(object pos1, out IComputedValue result)
        {
            if (FloatParser.TryConvert(pos1, out var res))
            {
                result = new ComputedCompound(
                    new List<IComputedValue> { res },
                    new List<StyleConverterBase> { FloatParser },
                    (resolvedValues) => {
                        if (resolvedValues[0] is float fl) return new Vector2(fl, fl);
                        return null;
                    });

                return true;
            }

            result = null;
            return false;
        }

        private bool TwoPositional(object pos1, object pos2, out IComputedValue result)
        {
            return ComputedList.Create(out result,
                new List<object> { pos1, pos2 },
                FloatParser,
                (resolvedValues) => {
                    if (resolvedValues[0] is float fl1 && resolvedValues[1] is float fl2)
                        return new Vector2(fl1, fl2);
                    return null;
                });
        }

        private bool FromArray(IEnumerable obj, out IComputedValue result)
        {
            var arr = obj.OfType<object>().ToArray();
            var len = arr.Length;

            if (len == 0) return Constant(Vector2.zero, out result);

            var v0 = arr.ElementAtOrDefault(0);
            var v1 = arr.ElementAtOrDefault(1);

            return TwoPositional(v0, v1, out result);
        }

        private bool ParseFromPositioningLiteral(string str, out IComputedValue result)
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
                result = null;
                return false;
            }

            result = new ComputedConstant(new Vector2(x, y));
            return true;
        }
    }
}
