using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedKeyword : IComputedValue
    {
        public CssKeyword Keyword { get; }

        public static ComputedKeyword Revert { get; } = new ComputedKeyword(CssKeyword.Revert);

        public ComputedKeyword(CssKeyword keyword)
        {
            Keyword = keyword;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            switch (Keyword)
            {
                case CssKeyword.Inherit:
                    return InheritedValue(prop, style, converter);
                case CssKeyword.Unset:
                    if (prop != null && prop.inherited)
                        return InheritedValue(prop, style, converter);
                    return prop.defaultValue;
                case CssKeyword.Initial:
                case CssKeyword.Auto:
                case CssKeyword.None:
                case CssKeyword.Default:
                    return prop.defaultValue;
                case CssKeyword.Revert:
                // A revert-layer that reaches here had no earlier layer to roll back to, which
                // per CSS Cascade 5 means it rolls back past this origin instead.
                case CssKeyword.RevertLayer:
                    // Not every framework has one -- UIToolkit has nothing to read a value back from.
                    return style?.RevertCalculator?.GetRevertValue(prop, style, converter);
                default:
                    return null;
            }
        }

        private object InheritedValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var val = style?.Parent?.GetRawStyleValue(prop, true);
            if (val is IComputedValue d) val = d.ResolveValue(prop, style.Parent, converter);
            return val;
        }
    }
}
