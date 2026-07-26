using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// ComputedMapper the computed value of a type to another type based on the callback passed to it.
    /// </summary>
    public struct ComputedMapper : IComputedValue
    {
        public delegate object MapCallback(object value);

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

            return Callback(computed);
        }

        public static bool Create(out IComputedValue result, object value, StyleConverterBase converter, MapCallback callback)
        {
            if (!converter.TryConvert(value, out var partResult))
            {
                result = null;
                return false;
            }

            result = Create(partResult, converter, callback);
            return result != null;
        }

        public static IComputedValue Create(IComputedValue value, StyleConverterBase converter, MapCallback callback)
        {
            if (StylingUtils.UnboxConstant(value, out var cc))
            {
                var res = callback(cc);

                if (res != null)
                {
                    return new ComputedConstant(res);
                }
                return null;
            }

            return new ComputedMapper(value, converter, callback);
        }
    }
}
