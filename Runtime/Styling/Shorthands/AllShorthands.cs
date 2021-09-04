using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace ReactUnity.Styling.Shorthands
{
    public static class AllShorthands
    {
        public static readonly StyleShorthand Margin = new FourDirectionalShorthand("margin", FourDirectionalShorthand.PropertyType.Margin);
        public static readonly StyleShorthand Padding = new FourDirectionalShorthand("padding", FourDirectionalShorthand.PropertyType.Padding);
        public static readonly StyleShorthand Inset = new FourDirectionalShorthand("inset", FourDirectionalShorthand.PropertyType.Inset);
        public static readonly StyleShorthand BorderWidth = new FourDirectionalShorthand("border-width", FourDirectionalShorthand.PropertyType.BorderWidth);
        public static readonly StyleShorthand BorderColor = new FourDirectionalShorthand("border-color", FourDirectionalShorthand.PropertyType.BorderColor);
        public static readonly StyleShorthand BorderRadius = new FourDirectionalShorthand("border-radius", FourDirectionalShorthand.PropertyType.BorderRadius);
        public static readonly StyleShorthand Border = new BorderShorthand("border", BorderShorthand.BorderSide.All);
        public static readonly StyleShorthand BorderTop = new BorderShorthand("border-top", BorderShorthand.BorderSide.Top);
        public static readonly StyleShorthand BorderRight = new BorderShorthand("border-right", BorderShorthand.BorderSide.Right);
        public static readonly StyleShorthand BorderBottom = new BorderShorthand("border-bottom", BorderShorthand.BorderSide.Bottom);
        public static readonly StyleShorthand BorderLeft = new BorderShorthand("border-left", BorderShorthand.BorderSide.Left);
        public static readonly StyleShorthand Flex = new FlexShorthand("flex");
        public static readonly StyleShorthand FlexFlow = new FlexFlowShorthand("flex-flow");
        public static readonly StyleShorthand Font = new FontShorthand("font");
        public static readonly StyleShorthand Background = new BackgroundShorthand("background");
        public static readonly StyleShorthand Mask = new MaskShorthand("mask");
        public static readonly StyleShorthand TextStroke = new TextStrokeShorthand("text-stroke");

        public static readonly Dictionary<string, StyleShorthand> Map = new Dictionary<string, StyleShorthand>(StringComparer.InvariantCultureIgnoreCase);
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
