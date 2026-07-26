using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
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

            IComputedValue size = new ComputedConstant(0f);
            IComputedValue color = new ComputedConstant(Color.clear);

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!sizeSet)
                {
                    if (AllConverters.FontSizeConverter.TryParse(split, out var v))
                    {
                        size = v;
                        sizeSet = true;
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

            if (sizeSet) collection[StyleProperties.textStrokeWidth] = size;
            if (colorSet) collection[StyleProperties.textStrokeColor] = color;

            return ModifiedProperties;
        }
    }
}
