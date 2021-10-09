using System.Collections.Generic;
using Facebook.Yoga;
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
            StyleProperties.backgroundPosition,
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

            if (AllConverters.ColorConverter.Parse(last) is Color cv)
            {
                color = cv;
                colorSet = true;
                count -= 1;
            };

            var images = new ImageDefinition[count];
            var positions = new YogaValue2[count];

            for (int ci = 0; ci < count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitWhitespace(comma);

                var isLast = ci == (count - 1);

                var imageSet = false;
                var posXSet = false;
                var posYSet = false;
                YogaValue posX = YogaValue.Undefined();
                YogaValue posY = YogaValue.Undefined();

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    if (!imageSet)
                    {
                        var val = AllConverters.ImageDefinitionConverter.Parse(split);

                        if (val is ImageDefinition v)
                        {
                            images[ci] = v;
                            imageSet = true;
                            continue;
                        }
                    }

                    if (!posXSet)
                    {
                        var val = AllConverters.YogaValueConverter.Parse(split);

                        if (val is YogaValue v)
                        {
                            posX = v;
                            posY = YogaValue.Percent(50);
                            posXSet = true;
                            continue;
                        }
                    }

                    if (!posYSet)
                    {
                        var val = AllConverters.YogaValueConverter.Parse(split);

                        if (val is YogaValue v)
                        {
                            posY = v;
                            posYSet = true;
                            continue;
                        }
                    }

                    if (!posXSet && !posYSet)
                    {
                        var val = AllConverters.YogaValue2Converter.Parse(split);

                        if (val is YogaValue2 v)
                        {
                            posX = v.X;
                            posY = v.Y;
                            posXSet = posYSet = true;
                            continue;
                        }
                    }

                    if (isLast && !colorSet)
                    {
                        var val = AllConverters.ColorConverter.Parse(split);

                        if (val is Color c)
                        {
                            color = c;
                            colorSet = true;
                            continue;
                        }
                    }

                    return null;
                }

                if (posXSet) positions[ci] = new YogaValue2(posX, posY);
            }

            collection[StyleProperties.backgroundColor] = color;
            collection[StyleProperties.backgroundImage] = new CssValueList<ImageDefinition>(images);
            collection[StyleProperties.backgroundPosition] = new CssValueList<YogaValue2>(positions);
            return ModifiedProperties;
        }
    }
}
