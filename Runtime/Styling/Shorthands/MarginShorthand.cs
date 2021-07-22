using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;

namespace ReactUnity.Styling.Shorthands
{
    public class FourDirectionalShorthand : StyleShorthand
    {
        public enum PropertyType
        {
            None = 0,
            Margin = 1,
            Padding = 2,
            Inset = 3,
            BorderWidth = 4,
            BorderColor = 5,
            BorderRadius = 6,
        }


        public override List<IStyleProperty> ModifiedProperties { get; }
        public PropertyType Type { get; }
        public IStyleConverter Converter { get; }

        public FourDirectionalShorthand(string name, PropertyType propertyType) : base(name)
        {
            Type = propertyType;

            switch (Type)
            {
                case PropertyType.None:
                    break;
                case PropertyType.Margin:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.MarginTop,
                        LayoutProperties.MarginRight,
                        LayoutProperties.MarginBottom,
                        LayoutProperties.MarginLeft,
                    };
                    Converter = AllConverters.YogaValueConverter;
                    break;
                case PropertyType.Padding:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.PaddingTop,
                        LayoutProperties.PaddingRight,
                        LayoutProperties.PaddingBottom,
                        LayoutProperties.PaddingLeft,
                    };
                    Converter = AllConverters.YogaValueConverter;
                    break;
                case PropertyType.Inset:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.Top,
                        LayoutProperties.Right,
                        LayoutProperties.Bottom,
                        LayoutProperties.Left,
                    };
                    Converter = AllConverters.YogaValueConverter;
                    break;
                case PropertyType.BorderWidth:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderTopWidth,
                        LayoutProperties.BorderRightWidth,
                        LayoutProperties.BorderBottomWidth,
                        LayoutProperties.BorderLeftWidth,
                    };
                    Converter = AllConverters.FloatConverter;
                    break;
                case PropertyType.BorderColor:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        StyleProperties.borderTopColor,
                        StyleProperties.borderRightColor,
                        StyleProperties.borderBottomColor,
                        StyleProperties.borderLeftColor,
                    };
                    Converter = AllConverters.ColorConverter;
                    break;
                case PropertyType.BorderRadius:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        StyleProperties.borderTopLeftRadius,
                        StyleProperties.borderTopRightRadius,
                        StyleProperties.borderBottomRightRadius,
                        StyleProperties.borderBottomLeftRadius,
                    };
                    Converter = AllConverters.LengthConverter;
                    break;
                default:
                    break;
            }
        }


        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (value == null) return null;

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0) return null;

            var top = Converter.Convert(splits[0]);
            var right = splits.Count > 1 ? Converter.Convert(splits[0]) : top;
            var bottom = splits.Count > 2 ? Converter.Convert(splits[0]) : top;
            var left = splits.Count > 3 ? Converter.Convert(splits[0]) : right;

            collection[ModifiedProperties[0]] = top;
            collection[ModifiedProperties[1]] = right;
            collection[ModifiedProperties[2]] = bottom;
            collection[ModifiedProperties[3]] = left;

            return ModifiedProperties;
        }
    }
}
