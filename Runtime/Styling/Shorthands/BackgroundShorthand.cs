using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    public class BackgroundShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.backgroundColor,
            StyleProperties.backgroundImage,
        };

        public BackgroundShorthand(string name) : base(name) { }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            var commas = ParserHelpers.SplitComma(value?.ToString());
            var count = commas.Count;

            var colorSet = false;
            var color = Color.clear;

            var last = commas[count - 1];

            if (AllConverters.ColorConverter.Convert(last) is Color cv)
            {
                color = cv;
                colorSet = true;
                count -= 1;
            };

            var images = new ImageDefinition[count];

            for (int ci = 0; ci < count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitWhitespace(comma);

                var isLast = ci == count - 1;

                var imageSet = false;

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    if (isLast && !colorSet)
                    {
                        var val = AllConverters.ColorConverter.Convert(split);

                        if (val is Color c)
                        {
                            color = c;
                            colorSet = true;
                            continue;
                        }
                    }

                    if (!imageSet)
                    {
                        var val = AllConverters.ImageDefinitionConverter.Convert(split);

                        if (val is ImageDefinition v)
                        {
                            images[ci] = v;
                            imageSet = true;
                            continue;
                        }
                    }

                    return null;
                }
            }

            collection[StyleProperties.backgroundColor] = color;
            collection[StyleProperties.backgroundImage] = new CssValueList<ImageDefinition>(images);
            return ModifiedProperties;
        }
    }
}
