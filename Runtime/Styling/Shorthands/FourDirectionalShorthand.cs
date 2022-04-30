using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class FourDirectionalShorthand : StyleShorthand
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
                    Converter = new GeneralConverter(AllConverters.YogaValueConverter);
                    break;
                case PropertyType.Padding:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.PaddingTop,
                        LayoutProperties.PaddingRight,
                        LayoutProperties.PaddingBottom,
                        LayoutProperties.PaddingLeft,
                    };
                    Converter = new GeneralConverter(AllConverters.YogaValueConverter);
                    break;
                case PropertyType.Inset:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.Top,
                        LayoutProperties.Right,
                        LayoutProperties.Bottom,
                        LayoutProperties.Left,
                    };
                    Converter = new GeneralConverter(AllConverters.YogaValueConverter);
                    break;
                case PropertyType.BorderWidth:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderTopWidth,
                        LayoutProperties.BorderRightWidth,
                        LayoutProperties.BorderBottomWidth,
                        LayoutProperties.BorderLeftWidth,
                    };
                    Converter = new GeneralConverter(AllConverters.LengthConverter);
                    break;
                case PropertyType.BorderColor:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        StyleProperties.borderTopColor,
                        StyleProperties.borderRightColor,
                        StyleProperties.borderBottomColor,
                        StyleProperties.borderLeftColor,
                    };
                    Converter = new GeneralConverter(AllConverters.ColorConverter);
                    break;
                case PropertyType.BorderRadius:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        StyleProperties.borderTopLeftRadius,
                        StyleProperties.borderTopRightRadius,
                        StyleProperties.borderBottomRightRadius,
                        StyleProperties.borderBottomLeftRadius,
                    };
                    Converter = new GeneralConverter(AllConverters.BorderRadiusConverter);
                    break;
                default:
                    break;
            }
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool CanHandleKeyword(CssKeyword keyword) => Converter.CanHandleKeyword(keyword);

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (!(value is string))
            {
                var converted = Converter.Convert(value);
                if (!Equals(converted, CssKeyword.Invalid))
                {
                    collection[ModifiedProperties[0]] = collection[ModifiedProperties[1]] =
                        collection[ModifiedProperties[2]] = collection[ModifiedProperties[3]] = converted;
                    return ModifiedProperties;
                }
            }

            var str = value.ToString();
            var isBorderRadius = Type == PropertyType.BorderRadius;
            var splits = ParserHelpers.SplitWhitespace(str, isBorderRadius ? '/' : default);

            if (isBorderRadius)
            {
                var sepIndex = splits.IndexOf("/");
                if (sepIndex >= 1 && splits.Count > sepIndex + 1)
                {
                    var splitsLhs = new string[sepIndex];
                    var splitsRhs = new string[splits.Count - sepIndex - 1];
                    splits.CopyTo(0, splitsLhs, 0, sepIndex);
                    splits.CopyTo(sepIndex + 1, splitsRhs, 0, splitsRhs.Length);

                    var topLhs = splitsLhs[0];
                    var rightLhs = splitsLhs.Length > 1 ? splitsLhs[1] : topLhs;
                    var bottomLhs = splitsLhs.Length > 2 ? splitsLhs[2] : topLhs;
                    var leftLhs = splitsLhs.Length > 3 ? splitsLhs[3] : rightLhs;


                    var topRhs = splitsRhs[0];
                    var rightRhs = splitsRhs.Length > 1 ? splitsRhs[1] : topRhs;
                    var bottomRhs = splitsRhs.Length > 2 ? splitsRhs[2] : topRhs;
                    var leftRhs = splitsRhs.Length > 3 ? splitsRhs[3] : rightRhs;

                    splits = new List<string>()
                    {
                        topLhs + " " + topRhs,
                        rightLhs + " " + rightRhs,
                        bottomLhs + " " + bottomRhs,
                        leftLhs + " " + leftRhs,
                    };

                }
            }

            if (splits.Count == 0) return null;

            var top = Converter.Parse(splits[0]);
            var right = splits.Count > 1 ? Converter.Parse(splits[1]) : top;
            var bottom = splits.Count > 2 ? Converter.Parse(splits[2]) : top;
            var left = splits.Count > 3 ? Converter.Parse(splits[3]) : right;

            collection[ModifiedProperties[0]] = top;
            collection[ModifiedProperties[1]] = right;
            collection[ModifiedProperties[2]] = bottom;
            collection[ModifiedProperties[3]] = left;

            return ModifiedProperties;
        }
    }
}
