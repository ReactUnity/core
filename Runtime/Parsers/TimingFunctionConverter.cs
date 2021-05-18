using ReactUnity.Animations;
using System.Collections.Generic;

namespace ReactUnity.Styling.Parsers
{
    public class TimingFunctionConverter : IStyleParser, IStyleConverter
    {
        static private HashSet<string> AllowedFunctions = new HashSet<string> { "steps", "cubic-bezier" };
        static private IStyleConverter TypeConverter = new EnumConverter<TimingFunctionType>(false);

        public object Convert(object value)
        {
            if (value is TimingFunction f) return f;

            var type = TypeConverter.Convert(value);

            if (type is TimingFunctionType tt)
                return TimingFunctions.Get(tt);

            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (CssFunctions.TryCall(value, out var result, AllowedFunctions)) return result;
            return null;
        }
    }
}
