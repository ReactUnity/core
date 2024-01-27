using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    public class StringConverter : TypedStyleConverterBase<string>
    {
        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            value = Normalize(value);
            return Constant(value, out result);
        }

        public static string Normalize(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return value;
            if ((value.FastStartsWith("\"") && value.FastEndsWith("\""))
                || (value.FastStartsWith("'") && value.FastEndsWith("'"))
                || (value.FastStartsWith("`") && value.FastEndsWith("`")))
                return value.Substring(1, value.Length - 2);
            return value;
        }
    }
}
