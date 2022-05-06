using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedKeyword : IComputedValue
    {
        public CssKeyword Keyword { get; }

        public ComputedKeyword(CssKeyword keyword)
        {
            Keyword = keyword;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            switch (Keyword)
            {
                case CssKeyword.Inherit:
                    var val = style?.Parent?.GetRawStyleValue(prop, true);
                    if (val is IComputedValue d) val = d.ResolveValue(prop, style.Parent, converter);
                    return val;
                case CssKeyword.Initial:
                case CssKeyword.Auto:
                case CssKeyword.None:
                case CssKeyword.Unset:
                case CssKeyword.Default:
                    return prop.defaultValue;
                default:
                    return null;
            }
        }
    }
}
