using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// light-dark(): one of two values, chosen by the element's <c>color-scheme</c> and, where that
    /// leaves the choice open, by the <c>prefers-color-scheme</c> media feature.
    /// </summary>
    internal class LightDarkFunction : ICssFunction
    {
        public string Name { get; } = "light-dark";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var parser = converter ?? AllConverters.ColorConverter;
            if (!parser.TryParse(args[0].Trim(), out var light) || !parser.TryParse(args[1].Trim(), out var dark)) return null;
            return new ComputedLightDark(light, dark);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 2;
    }
}
