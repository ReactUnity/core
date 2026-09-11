using System.Collections.Generic;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// min(), max() or clamp() over values that are not all known until resolve time. A clamp() bound
    /// given as `none` is a null entry.
    /// </summary>
    public struct ComputedMinMax : IComputedValue
    {
        public enum Mode { Min, Max, Clamp }

        public IList<IComputedValue> Values { get; }
        public Mode Kind { get; }

        public ComputedMinMax(IList<IComputedValue> values, Mode kind)
        {
            Values = values;
            Kind = kind;
        }

        public static IComputedValue Create(IList<IComputedValue> values, Mode kind)
        {
            var constants = new List<object>(values.Count);

            for (int i = 0; i < values.Count; i++)
            {
                var value = values[i];
                if (value == null) constants.Add(null);
                else if (value is IComputedConstant c) constants.Add(c.ConstantValue);
                else return new ComputedMinMax(values, kind);
            }

            var res = Evaluate(constants, kind);
            return res.HasValue ? new ComputedConstant(res.Value) : null;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var resolved = new List<object>(Values.Count);
            for (int i = 0; i < Values.Count; i++) resolved.Add(Values[i]?.ResolveValue(prop, style, converter));

            var res = Evaluate(resolved, Kind);
            return res.HasValue ? (object) res.Value : null;
        }

        private static float? Evaluate(IList<object> values, Mode kind)
        {
            if (kind == Mode.Clamp)
            {
                if (values.Count != 3 || !(values[1] is float v)) return null;
                // Like the spec's max(MIN, min(VAL, MAX)): a lower bound above the upper one wins.
                if (values[2] is float hi) v = Mathf.Min(v, hi);
                else if (values[2] != null) return null;
                if (values[0] is float lo) v = Mathf.Max(v, lo);
                else if (values[0] != null) return null;
                return v;
            }

            if (values.Count == 0 || !(values[0] is float acc)) return null;

            for (int i = 1; i < values.Count; i++)
            {
                if (!(values[i] is float f)) return null;
                acc = kind == Mode.Min ? Mathf.Min(acc, f) : Mathf.Max(acc, f);
            }

            return acc;
        }
    }
}
