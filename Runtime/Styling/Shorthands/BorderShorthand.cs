using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    internal class BorderShorthand : StyleShorthand
    {
        private static StyleConverterBase BorderStyleConverter = AllConverters.Get<BorderStyle>();

        public enum BorderSide
        {
            All = 0,
            Top = 1,
            Right = 2,
            Bottom = 3,
            Left = 4,
        }

        public override List<IStyleProperty> ModifiedProperties { get; }
        public BorderSide Side { get; }

        public BorderShorthand(string name, BorderSide side) : base(name)
        {
            Side = side;
            switch (side)
            {
                case BorderSide.All:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderTopWidth,
                        StyleProperties.borderTopColor,
                        StyleProperties.borderTopStyle,
                        LayoutProperties.BorderRightWidth,
                        StyleProperties.borderRightColor,
                        StyleProperties.borderRightStyle,
                        LayoutProperties.BorderBottomWidth,
                        StyleProperties.borderBottomColor,
                        StyleProperties.borderBottomStyle,
                        LayoutProperties.BorderLeftWidth,
                        StyleProperties.borderLeftColor,
                        StyleProperties.borderLeftStyle,
                    };
                    break;
                case BorderSide.Top:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderTopWidth,
                        StyleProperties.borderTopColor,
                        StyleProperties.borderTopStyle,
                    };
                    break;
                case BorderSide.Right:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderRightWidth,
                        StyleProperties.borderRightColor,
                        StyleProperties.borderRightStyle,
                    };
                    break;
                case BorderSide.Bottom:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderBottomWidth,
                        StyleProperties.borderBottomColor,
                        StyleProperties.borderBottomStyle,
                    };
                    break;
                case BorderSide.Left:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderLeftWidth,
                        StyleProperties.borderLeftColor,
                        StyleProperties.borderLeftStyle,
                    };
                    break;
                default:
                    break;
            }
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 3) return null;

            var sizeSet = false;
            var styleSet = false;
            var colorSet = false;

            IComputedValue size = new ComputedConstant(0f);
            IComputedValue style = new ComputedConstant(BorderStyle.Solid);
            IComputedValue color = new ComputedConstant(Color.clear);

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!sizeSet)
                {
                    if (AllConverters.LengthConverter.TryParse(split, out var v))
                    {
                        size = v;
                        sizeSet = true;
                        continue;
                    }
                }

                if (!styleSet)
                {
                    if (BorderStyleConverter.TryParse(split, out var v))
                    {
                        style = v;
                        styleSet = true;
                        continue;
                    }
                }

                if (!colorSet)
                {
                    if (AllConverters.ColorConverter.TryParse(split, out var v))
                    {
                        color = v;
                        colorSet = true;
                        continue;
                    }
                }

                return null;
            }

            if (Side == BorderSide.All)
            {
                if (sizeSet)
                    collection[LayoutProperties.BorderTopWidth] = collection[LayoutProperties.BorderRightWidth] =
                    collection[LayoutProperties.BorderBottomWidth] = collection[LayoutProperties.BorderLeftWidth] = size;
                if (colorSet)
                    collection[StyleProperties.borderTopColor] = collection[StyleProperties.borderRightColor] =
                    collection[StyleProperties.borderBottomColor] = collection[StyleProperties.borderLeftColor] = color;
                if (styleSet)
                    collection[StyleProperties.borderTopStyle] = collection[StyleProperties.borderRightStyle] =
                    collection[StyleProperties.borderBottomStyle] = collection[StyleProperties.borderLeftStyle] = style;
            }
            else
            {
                if (sizeSet) collection[ModifiedProperties[0]] = size;
                if (colorSet) collection[ModifiedProperties[1]] = color;
                if (styleSet) collection[ModifiedProperties[2]] = style;
            }

            return ModifiedProperties;
        }
    }
}
