using System.Collections.Generic;
using ReactUnity.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    internal class TextStrokeShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }

        public TextStrokeShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                StyleProperties.textStrokeWidth,
                StyleProperties.textStrokeColor,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 2) return null;

            var sizeSet = false;
            var colorSet = false;

            var size = 0f;
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

            if (sizeSet) collection[StyleProperties.textStrokeWidth] = size;
            if (colorSet) collection[StyleProperties.textStrokeColor] = color;

            return ModifiedProperties;
        }
    }
}
