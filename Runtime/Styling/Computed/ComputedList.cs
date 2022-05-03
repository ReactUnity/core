using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// Computed list represents a comptued value where every item of a list is parsed by the same parser
    /// </summary>
    public struct ComputedList : IComputedValue
    {
        public delegate bool CompoundCallback(List<object> values, out IComputedValue result);

        public CompoundCallback Callback;
        public IList<IComputedValue> Values;
        public StyleConverterBase Converter;

        public ComputedList(IList<IComputedValue> values, StyleConverterBase converter, CompoundCallback callback)
        {
            Values = values;
            Converter = converter;
            Callback = callback;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var count = Values.Count;
            var results = new List<object>(count);

            for (int i = 0; i < count; i++)
            {
                var value = Values[i];

                var computed = value.ResolveValue(prop, style, converter);

                if (computed == null) return null;
                results.Add(computed);
            }

            if (Callback(results, out var res)) return res;
            return null;
        }

        public static bool Create(out IComputedValue result, List<object> values, StyleConverterBase converter, CompoundCallback callback)
        {
            var resultValues = new List<IComputedValue>();
            var allConstants = true;

            for (int i = 0; i < values.Count; i++)
            {
                var value = values[i];

                if (!converter.TryConvert(value, out var partResult))
                {
                    result = null;
                    return false;
                }

                resultValues.Add(partResult);
                allConstants &= partResult is ComputedConstant;
            }

            if (allConstants)
            {
                if (callback(resultValues.OfType<ComputedConstant>().Select(x => x.Value).ToList(), out var constantResult))
                {
                    result = new ComputedConstant(constantResult);
                    return true;
                }

                result = null;
                return false;
            }

            result = new ComputedList(resultValues, converter, callback);
            return true;
        }
    }
}
