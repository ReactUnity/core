using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// The two arms of a light-dark(). Which one applies is the element's <c>color-scheme</c> when it
    /// names a single scheme, else the <c>prefers-color-scheme</c> value the media provider reports.
    /// </summary>
    public struct ComputedLightDark : IComputedValue
    {
        public IComputedValue Light { get; }
        public IComputedValue Dark { get; }

        public ComputedLightDark(IComputedValue light, IComputedValue dark)
        {
            Light = light;
            Dark = dark;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            return IsDark(style) ? Dark : Light;
        }

        public static bool IsDark(NodeStyle style)
        {
            if (style == null) return false;

            var scheme = style.GetStyleValue(StyleProperties.colorScheme);
            if (scheme == ColorScheme.Dark) return true;
            if (scheme == ColorScheme.Light) return false;

            var preferred = style.Context?.MediaProvider?.GetValue("prefers-color-scheme");
            return string.Equals(preferred, "dark", System.StringComparison.OrdinalIgnoreCase);
        }
    }
}
