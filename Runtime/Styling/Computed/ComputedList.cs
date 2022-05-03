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
        public delegate object CompoundCallback(List<object> values);

        public CompoundCallback Callback;
        public IList<IComputedValue> Values;
        public StyleConverterBase Converter;
        public object DefaultValue;

        public ComputedList(IList<IComputedValue> values, StyleConverterBase converter, CompoundCallback callback, object defaultValue = null)
        {
            Values = values;
            Converter = converter;
            Callback = callback;
            DefaultValue = defaultValue;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var count = Values.Count;
            var results = new List<object>(count);

            for (int i = 0; i < count; i++)
            {
                var value = Values[i];

                var computed = value == null ? DefaultValue : value.ResolveValue(prop, style, converter);

                if (computed == null) return null;
                results.Add(computed);
            }

            return Callback(results);
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
                allConstants &= partResult is IComputedConstant;
            }

            if (allConstants)
            {
                var res = callback(resultValues.OfType<IComputedConstant>().Select(x => x.ConstantValue).ToList());

                if (res != null)
                {
                    result = new ComputedConstant(res);
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
