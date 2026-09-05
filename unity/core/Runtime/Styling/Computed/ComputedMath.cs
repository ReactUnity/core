using System;
using System.Collections.Generic;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// A CSS math function -- round(), mod(), the trigonometric and exponential set -- over operands
    /// that are not all known until resolve time. Each operand is a calc() expression already reduced
    /// to a number in the property's unit; the trigonometric ones arrive in radians.
    /// </summary>
    public struct ComputedMath : IComputedValue
    {
        public enum Op { Round, Mod, Rem, Abs, Sign, Sin, Cos, Tan, Asin, Acos, Atan, Atan2, Pow, Sqrt, Hypot, Log, Exp }

        public enum Rounding { Nearest, Up, Down, ToZero }

        public IList<IComputedValue> Values { get; }
        public Op Kind { get; }
        public Rounding Strategy { get; }

        public ComputedMath(IList<IComputedValue> values, Op kind, Rounding strategy)
        {
            Values = values;
            Kind = kind;
            Strategy = strategy;
        }

        public static IComputedValue Create(IList<IComputedValue> values, Op kind, Rounding strategy = Rounding.Nearest)
        {
            var constants = new List<object>(values.Count);

            for (int i = 0; i < values.Count; i++)
            {
                if (values[i] is IComputedConstant c) constants.Add(c.ConstantValue);
                else return new ComputedMath(values, kind, strategy);
            }

            var res = Evaluate(constants, kind, strategy);
            return res.HasValue ? new ComputedConstant(res.Value) : null;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var resolved = new List<object>(Values.Count);
            for (int i = 0; i < Values.Count; i++) resolved.Add(Values[i].ResolveValue(prop, style, converter));

            var res = Evaluate(resolved, Kind, Strategy);
            return res.HasValue ? (object) res.Value : null;
        }

        public static float? Evaluate(IList<object> values, Op kind, Rounding strategy)
        {
            if (values.Count == 0 || !(values[0] is float a)) return null;
            var hasB = values.Count > 1;
            if (hasB && !(values[1] is float)) return null;
            var b = hasB ? (float) values[1] : 0;

            switch (kind)
            {
                case Op.Round:
                    return Round(a, hasB ? b : 1, strategy);
                case Op.Mod:
                    // The result takes the sign of the divisor, where rem() keeps the dividend's.
                    return b == 0 ? float.NaN : a - b * Mathf.Floor(a / b);
                case Op.Rem:
                    return b == 0 ? float.NaN : a % b;
                case Op.Abs:
                    return Mathf.Abs(a);
                case Op.Sign:
                    return a > 0 ? 1 : a < 0 ? -1 : a;
                case Op.Sin:
                    return Mathf.Sin(a);
                case Op.Cos:
                    return Mathf.Cos(a);
                case Op.Tan:
                    return Mathf.Tan(a);
                case Op.Asin:
                    return Mathf.Asin(a) * Mathf.Rad2Deg;
                case Op.Acos:
                    return Mathf.Acos(a) * Mathf.Rad2Deg;
                case Op.Atan:
                    return Mathf.Atan(a) * Mathf.Rad2Deg;
                case Op.Atan2:
                    return hasB ? Mathf.Atan2(a, b) * Mathf.Rad2Deg : (float?) null;
                case Op.Pow:
                    return hasB ? Mathf.Pow(a, b) : (float?) null;
                case Op.Sqrt:
                    return Mathf.Sqrt(a);
                case Op.Hypot:
                {
                    double sum = 0;
                    for (int i = 0; i < values.Count; i++)
                    {
                        if (!(values[i] is float f)) return null;
                        sum += (double) f * f;
                    }
                    return (float) Math.Sqrt(sum);
                }
                case Op.Log:
                    return hasB ? Mathf.Log(a) / Mathf.Log(b) : Mathf.Log(a);
                case Op.Exp:
                    return Mathf.Exp(a);
                default:
                    return null;
            }
        }

        private static float Round(float a, float b, Rounding strategy)
        {
            if (b == 0 || float.IsNaN(a) || float.IsNaN(b)) return float.NaN;
            if (float.IsInfinity(a)) return a;
            // An infinite step leaves only the sign of the value, as the spec has it.
            if (float.IsInfinity(b))
            {
                if (strategy == Rounding.Up && a > 0) return float.PositiveInfinity;
                if (strategy == Rounding.Down && a < 0) return float.NegativeInfinity;
                return 0 * a;
            }

            var q = a / b;
            switch (strategy)
            {
                case Rounding.Up: q = Mathf.Ceil(q); break;
                case Rounding.Down: q = Mathf.Floor(q); break;
                case Rounding.ToZero: q = (float) Math.Truncate(q); break;
                // Halves go up, toward positive infinity, which is not what Mathf.Round does.
                default: q = Mathf.Floor(q + 0.5f); break;
            }
            return q * b;
        }
    }
}
