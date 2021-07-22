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
        public static readonly StyleShorthand borderWidth = new FourDirectionalShorthand("border-width", FourDirectionalShorthand.PropertyType.BorderWidth);
        public static readonly StyleShorthand borderColor = new FourDirectionalShorthand("border-color", FourDirectionalShorthand.PropertyType.BorderColor);
        public static readonly StyleShorthand borderRadius = new FourDirectionalShorthand("border-radius", FourDirectionalShorthand.PropertyType.BorderRadius);
        public static readonly StyleShorthand border = new BorderShorthand("border", BorderShorthand.BorderSide.All);
        public static readonly StyleShorthand borderTop = new BorderShorthand("border-top", BorderShorthand.BorderSide.Top);
        public static readonly StyleShorthand borderRight = new BorderShorthand("border-right", BorderShorthand.BorderSide.Right);
        public static readonly StyleShorthand borderBottom = new BorderShorthand("border-bottom", BorderShorthand.BorderSide.Bottom);
        public static readonly StyleShorthand borderLeft = new BorderShorthand("border-left", BorderShorthand.BorderSide.Left);

        public static readonly Dictionary<string, StyleShorthand> Map = new Dictionary<string, StyleShorthand>();
        public static readonly StyleShorthand[] List;

        static AllShorthands()
        {
            var type = typeof(AllShorthands);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => typeof(StyleShorthand).IsAssignableFrom(x.FieldType));

            foreach (var style in styleFields)
            {
                var prop = style.GetValue(type) as StyleShorthand;
                Map[style.Name] = Map[prop.Name] = prop;
            }

            List = Map.Values.Distinct().ToArray();
        }

        public static StyleShorthand GetShorthand(string name)
        {
            Map.TryGetValue(name, out var style);
            return style;
        }
    }
}
