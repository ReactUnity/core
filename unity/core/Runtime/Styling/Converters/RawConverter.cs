using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    public class RawConverter : IStyleConverter
    {
        public IComputedValue Convert(object value)
        {
            return new ComputedConstant(value);
        }

        public string Stringify(object value)
        {
            return value?.ToString();
        }
    }
}
