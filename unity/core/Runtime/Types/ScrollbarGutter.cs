using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    /// <summary>
    /// The <c>scrollbar-gutter</c> property. ReactUnity's scrollbars overlay the viewport, so <c>stable</c>
    /// reserves their thickness and keeps content out from under them; <c>both-edges</c> mirrors the gutter.
    /// </summary>
    public enum ScrollbarGutter
    {
        Auto = 0,
        Stable = 1,
        StableBothEdges = 2,
    }

    public class ScrollbarGutterConverter : TypedStyleConverterBase<ScrollbarGutter>
    {
        public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
        {
            if (keyword == CssKeyword.Auto) return Constant(ScrollbarGutter.Auto, out result);
            return base.HandleKeyword(keyword, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var stable = false;
            var bothEdges = false;

            foreach (var word in ParserHelpers.SplitWhitespace(value))
            {
                if (!stable && word.Equals("stable", StringComparison.OrdinalIgnoreCase)) stable = true;
                else if (!bothEdges && word.Equals("both-edges", StringComparison.OrdinalIgnoreCase)) bothEdges = true;
                else return Fail(out result);
            }

            if (!stable) return Fail(out result);
            return Constant(bothEdges ? ScrollbarGutter.StableBothEdges : ScrollbarGutter.Stable, out result);
        }

        public override string StringifyTyped(ScrollbarGutter value)
        {
            switch (value)
            {
                case ScrollbarGutter.Stable: return "stable";
                case ScrollbarGutter.StableBothEdges: return "stable both-edges";
                default: return "auto";
            }
        }
    }
}
