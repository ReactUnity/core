using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    public class BorderShorthand : StyleShorthand
    {
        private static GeneralConverter BorderStyleConverter = AllConverters.Get<BorderStyle>();

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
                        LayoutProperties.BorderRightWidth,
                        StyleProperties.borderRightColor,
                        LayoutProperties.BorderBottomWidth,
                        StyleProperties.borderBottomColor,
                        LayoutProperties.BorderLeftWidth,
                        StyleProperties.borderLeftColor,
                    };
                    break;
                case BorderSide.Top:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderTopWidth,
                        StyleProperties.borderTopColor,
                    };
                    break;
                case BorderSide.Right:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderRightWidth,
                        StyleProperties.borderRightColor,
                    };
                    break;
                case BorderSide.Bottom:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderBottomWidth,
                        StyleProperties.borderBottomColor,
                    };
                    break;
                case BorderSide.Left:
                    ModifiedProperties = new List<IStyleProperty>
                    {
                        LayoutProperties.BorderLeftWidth,
                        StyleProperties.borderLeftColor,
                    };
                    break;
                default:
                    break;
            }
        }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 3) return null;

            var sizeSet = false;
            var styleSet = false;
            var colorSet = false;

            var size = 0f;
            var style = BorderStyle.Solid;
            var color = Color.clear;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!sizeSet)
                {
                    var val = AllConverters.LengthConverter.Parse(split);

                    if (val is float v)
                    {
                        size = v;
                        sizeSet = true;
                        continue;
                    }
                }

                if (!styleSet)
                {
                    var val = BorderStyleConverter.Parse(split);

                    if (val is BorderStyle v)
                    {
                        style = v;
                        styleSet = true;
                        continue;
                    }
                }

                if (!colorSet)
                {
                    var val = AllConverters.ColorConverter.Parse(split);

                    if (val is Color v)
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
            }
            else
            {
                if (sizeSet) collection[ModifiedProperties[0]] = size;
                if (colorSet) collection[ModifiedProperties[1]] = color;
            }

            return ModifiedProperties;
        }
    }
}
