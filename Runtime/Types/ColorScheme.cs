using System;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    /// <summary>
    /// The <c>color-scheme</c> property. A single scheme decides every light-dark() below the element;
    /// <c>normal</c> and the two-scheme forms leave that to <c>prefers-color-scheme</c>.
    /// </summary>
    public enum ColorScheme
    {
        Normal = 0,
        Light = 1,
        Dark = 2,
        LightDark = 3,
    }

    public class ColorSchemeConverter : TypedStyleConverterBase<ColorScheme>
    {
        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var light = false;
            var dark = false;

            foreach (var word in ParserHelpers.SplitWhitespace(value))
            {
                // `only` asks the browser not to override the choice, which nothing here does anyway.
                if (word.Equals("only", StringComparison.OrdinalIgnoreCase)) continue;
                if (word.Equals("light", StringComparison.OrdinalIgnoreCase)) light = true;
                else if (word.Equals("dark", StringComparison.OrdinalIgnoreCase)) dark = true;
                else if (word.Equals("normal", StringComparison.OrdinalIgnoreCase)) { }
                else return Fail(out result);
            }

            var scheme = light && dark ? ColorScheme.LightDark : light ? ColorScheme.Light : dark ? ColorScheme.Dark : ColorScheme.Normal;
            return Constant(scheme, out result);
        }

        public override string StringifyTyped(ColorScheme value)
        {
            switch (value)
            {
                case ColorScheme.Light: return "light";
                case ColorScheme.Dark: return "dark";
                case ColorScheme.LightDark: return "light dark";
                default: return "normal";
            }
        }
    }
}
