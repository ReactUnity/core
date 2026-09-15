using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class RgbaFunction : ICssFunction
    {
        public string Name { get; } = "rgba";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (RelativeColor.IsRelative(args))
            {
                if (RelativeColor.TryParse(args[0], RelativeColor.RgbKeywords, ParserHelpers.RgbConverters,
                    RelativeColor.DecomposeRgb, ColorCallback, out var relative)) return relative;
                return null;
            }

            if (args.Length == 1)
            {
                if (ParserHelpers.ParseSpaceSeparatedColor(args[0], ColorCallback, false, out var rs)) return rs;
            }
            else if (args.Length == 3 || args.Length == 4)
            {
                if (ParserHelpers.ParseCommaSeparatedColor(args, ColorCallback, false, out var rs)) return rs;
            }

            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;

        // Every component is clamped to its own range, which is what CSS Color 4 asks of a
        // specified color: `rgb(300 0 0)` is red, not a color a third of the way out of gamut.
        private object ColorCallback(float r, float g, float b, float a) => new UnityEngine.Color(
            UnityEngine.Mathf.Clamp01(r / 255f),
            UnityEngine.Mathf.Clamp01(g / 255f),
            UnityEngine.Mathf.Clamp01(b / 255f),
            UnityEngine.Mathf.Clamp01(a));
    }

}
