using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// ComputedMapper the computed value of a type to another type based on the callback passed to it.
    /// </summary>
    public struct ComputedMapper : IComputedValue
    {
        public delegate bool MapCallback(object value, out IComputedValue result);

        public MapCallback Callback;
        public IComputedValue Value;
        public StyleConverterBase Converter;

        public ComputedMapper(IComputedValue value, StyleConverterBase converter, MapCallback callback)
        {
            Value = value;
            Converter = converter;
            Callback = callback;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var computed = Value.ResolveValue(prop, style, Converter);

            if (computed == null) return null;

            if (Callback(computed, out var res)) return res;
            return null;
        }

        public static bool Create(out IComputedValue result, object value, StyleConverterBase converter, MapCallback callback)
        {
            if (!converter.TryConvert(value, out var partResult))
            {
                result = null;
                return false;
            }

            if (partResult is ComputedConstant cc)
            {
                if (callback(cc.Value, out var connstantResult))
                {
                    result = new ComputedConstant(connstantResult);
                    return true;
                }

                result = null;
                return false;
            }

            result = new ComputedMapper(partResult, converter, callback);
            return true;
        }
    }
}
