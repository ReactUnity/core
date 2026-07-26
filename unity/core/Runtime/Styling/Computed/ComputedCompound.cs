using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// Computed compund represents a comptued value where multiple items are required to construct the end result.
    /// Unlike ComputedList, items of a ComputedCompound can each have a different parser.
    /// </summary>
    public struct ComputedCompound : IComputedValue
    {
        public delegate object CompoundCallback(List<object> values);

        public CompoundCallback Callback;
        public List<IComputedValue> Values;
        public List<StyleConverterBase> Converters;

        public ComputedCompound(List<IComputedValue> values, List<StyleConverterBase> converters, CompoundCallback callback)
        {
            Values = values;
            Converters = converters;
            Callback = callback;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var count = Values.Count;
            var results = new List<object>(count);

            for (int i = 0; i < count; i++)
            {
                var value = Values[i];
                var cv = Converters[i];

                var computed = value?.ResolveValue(prop, style, cv);

                if (computed == null) return null;
                results.Add(computed);
            }

            return Callback(results);
        }

        public static bool Create(out IComputedValue result, List<object> values, List<StyleConverterBase> converters, CompoundCallback callback)
        {
            var resultValues = new List<IComputedValue>();
            var allConstants = true;

            for (int i = 0; i < values.Count; i++)
            {
                var value = values[i];
                var converter = converters[i];

                if (!converter.TryConvert(value, out var partResult))
                {
                    result = null;
                    return false;
                }

                resultValues.Add(partResult);
                allConstants &= partResult is IComputedConstant;
            }

            result = Create(resultValues, converters, callback, allConstants);
            return result != null;
        }

        public static IComputedValue Create(List<IComputedValue> values, List<StyleConverterBase> converters, CompoundCallback callback, bool? allConstants = null)
        {
            if (!allConstants.HasValue) allConstants = values.All(x => x is IComputedConstant);

            if (allConstants.Value)
            {
                var res = callback(values.OfType<IComputedConstant>().Select(x => x.ConstantValue).ToList());

                if (res != null)
                {
                    return new ComputedConstant(res);
                }
                return null;
            }

            return new ComputedCompound(values, converters, callback);
        }
    }
}
