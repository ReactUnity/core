using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace ReactUnity.Styling.Shorthands
{
    public static class AllShorthands
    {
        public static readonly StyleShorthand margin = new FourDirectionalShorthand("margin", FourDirectionalShorthand.PropertyType.Margin);
        public static readonly StyleShorthand padding = new FourDirectionalShorthand("padding", FourDirectionalShorthand.PropertyType.Padding);
        public static readonly StyleShorthand inset = new FourDirectionalShorthand("inset", FourDirectionalShorthand.PropertyType.Inset);
        public static readonly StyleShorthand borderWidth = new FourDirectionalShorthand("borderWidth", FourDirectionalShorthand.PropertyType.BorderWidth);
        public static readonly StyleShorthand borderColor = new FourDirectionalShorthand("borderColor", FourDirectionalShorthand.PropertyType.BorderColor);
        public static readonly StyleShorthand borderRadius = new FourDirectionalShorthand("borderRadius", FourDirectionalShorthand.PropertyType.BorderRadius);

        public static readonly Dictionary<string, StyleShorthand> CssPropertyMap = new Dictionary<string, StyleShorthand>()
        {
            { "border-width", borderWidth },
            { "border-color", borderColor },
            { "border-radius", borderRadius },
        };
        public static StyleShorthand[] AllProperties { get; }

        static AllShorthands()
        {
            var type = typeof(AllShorthands);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => typeof(StyleShorthand).IsAssignableFrom(x.FieldType));

            foreach (var style in styleFields)
            {
                var prop = style.GetValue(type) as StyleShorthand;
                CssPropertyMap[style.Name] = prop;
            }

            AllProperties = CssPropertyMap.Values.Distinct().ToArray();
        }

        public static StyleShorthand GetShorthand(string name)
        {
            CssPropertyMap.TryGetValue(name, out var style);
            return style;
        }
    }
}
