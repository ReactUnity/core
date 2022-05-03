using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    internal class BackgroundShorthand : StyleShorthand
    {
        private static StyleConverterBase RepeatConverter = AllConverters.Get<BackgroundRepeat>();

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.backgroundColor,
            StyleProperties.backgroundImage,
            StyleProperties.backgroundPositionX,
            StyleProperties.backgroundPositionY,
            StyleProperties.backgroundSize,
            StyleProperties.backgroundRepeatX,
            StyleProperties.backgroundRepeatY,
        };

        public BackgroundShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var commas = ParserHelpers.SplitComma(value?.ToString());
            var count = commas.Count;

            var colorSet = false;
            IComputedValue color = new ComputedConstant(Color.clear);

            var last = commas[count - 1];

            if (AllConverters.ColorConverter.TryParse(last, out var cv))
            {
                color = cv;
                colorSet = true;
                count -= 1;
            };

            var images = new IComputedValue[count];
            var positionsX = new IComputedValue[count];
            var positionsY = new IComputedValue[count];
            var sizes = new IComputedValue[count];
            var repeatXs = new IComputedValue[count];
            var repeatYs = new IComputedValue[count];

            for (int ci = 0; ci < count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitShorthand(comma);

                var isLast = ci == (count - 1);

                var imageSet = false;
                var posXSet = false;
                var posYSet = false;
                IComputedValue posX = new ComputedConstant(YogaValue.Undefined());
                IComputedValue posY = new ComputedConstant(YogaValue.Undefined());

                var sizeXSet = false;
                var sizeYSet = false;
                IComputedValue sizeX = new ComputedConstant(YogaValue.Auto());
                IComputedValue sizeY = new ComputedConstant(YogaValue.Auto());

                var sizeSetByKeyword = false;
                IComputedValue size = new ComputedConstant(BackgroundSize.Auto);

                var repeatXSet = false;
                var repeatYSet = false;

                var canSetSize = -1;

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    if (!imageSet)
                    {
                        if (AllConverters.ImageDefinitionConverter.TryParse(split, out var v))
                        {
                            images[ci] = v;
                            imageSet = true;
                            continue;
                        }
                    }

                    if (!posXSet)
                    {
                        if (YogaValueConverter.Horizontal.TryParse(split, out var v))
                        {
                            posX = v;
                            posXSet = true;
                            if (!posYSet) posY = new ComputedConstant(YogaValue.Percent(50));
                            continue;
                        }
                    }

                    if (!posYSet)
                    {
                        if (YogaValueConverter.Vertical.TryParse(split, out var v))
                        {
                            posY = v;
                            posYSet = true;
                            if (!posXSet) posX = new ComputedConstant(YogaValue.Percent(50));
                            continue;
                        }
                    }

                    if (!repeatXSet && !repeatYSet)
                    {
                        if (split == "repeat-x")
                        {
                            repeatXSet = repeatYSet = true;
                            repeatXs[ci] = new ComputedConstant(BackgroundRepeat.Repeat);
                            repeatYs[ci] = new ComputedConstant(BackgroundRepeat.NoRepeat);
                            continue;
                        }
                        else if (split == "repeat-y")
                        {
                            repeatXSet = repeatYSet = true;
                            repeatXs[ci] = new ComputedConstant(BackgroundRepeat.NoRepeat);
                            repeatYs[ci] = new ComputedConstant(BackgroundRepeat.Repeat);
                            continue;
                        }
                    }

                    if (RepeatConverter.TryParse(split, out var rpt))
                    {
                        if (!repeatXSet)
                        {
                            repeatXs[ci] = repeatYs[ci] = rpt;
                            repeatXSet = true;
                            continue;
                        }
                        else if (!repeatYSet)
                        {
                            repeatYs[ci] = rpt;
                            repeatYSet = true;
                            continue;
                        }
                        else return null;
                    }

                    if (split == "/")
                    {
                        if (posXSet)
                        {
                            posYSet = true;
                            canSetSize = i + 1;
                            continue;
                        }
                        else if (posYSet)
                        {
                            posXSet = true;
                            canSetSize = i + 1;
                            continue;
                        }
                        return null;
                    }

                    if (canSetSize == i)
                    {
                        if (split == "cover")
                        {
                            sizeSetByKeyword = sizeXSet = sizeYSet = true;
                            size = new ComputedConstant(BackgroundSize.Cover);
                            continue;
                        }

                        if (split == "contain")
                        {
                            sizeSetByKeyword = sizeXSet = sizeYSet = true;
                            size = new ComputedConstant(BackgroundSize.Contain);
                            continue;
                        }

                        if (!sizeXSet)
                        {
                            if (AllConverters.YogaValueConverter.TryParse(split, out var v))
                            {
                                sizeX = v;
                                sizeXSet = true;
                                canSetSize = i + 1;
                                continue;
                            }
                        }

                        if (!sizeYSet)
                        {
                            if (AllConverters.YogaValueConverter.TryParse(split, out var v))
                            {
                                sizeY = v;
                                sizeYSet = true;
                                continue;
                            }
                        }

                        if (!sizeXSet) return null;
                    }


                    if (isLast && !colorSet)
                    {
                        if (AllConverters.ColorConverter.TryParse(split, out var c))
                        {
                            color = c;
                            colorSet = true;
                            continue;
                        }
                    }

                    return null;
                }

                if (posXSet || posYSet)
                {
                    positionsX[ci] = new ComputedConstant(posX);
                    positionsY[ci] = new ComputedConstant(posY);
                }

                if (sizeSetByKeyword) sizes[ci] = new ComputedConstant(size);
                else if (sizeXSet) sizes[ci] = new ComputedList(new List<IComputedValue> { sizeX, sizeY }, AllConverters.YogaValueConverter,
                    (resolved) => {
                        if (resolved[0] is YogaValue xv && resolved[1] is YogaValue yv) return new BackgroundSize(new YogaValue2(xv, yv));
                        return null;
                    });
            }

            collection[StyleProperties.backgroundColor] = color;
            collection[StyleProperties.backgroundImage] = StyleProperties.backgroundImage.Converter.FromList(images);
            collection[StyleProperties.backgroundPositionX] = StyleProperties.backgroundPositionX.Converter.FromList(positionsX);
            collection[StyleProperties.backgroundPositionY] = StyleProperties.backgroundPositionY.Converter.FromList(positionsY);
            collection[StyleProperties.backgroundSize] = StyleProperties.backgroundSize.Converter.FromList(sizes);
            collection[StyleProperties.backgroundRepeatX] = StyleProperties.backgroundRepeatX.Converter.FromList(repeatXs);
            collection[StyleProperties.backgroundRepeatY] = StyleProperties.backgroundRepeatY.Converter.FromList(repeatYs);
            return ModifiedProperties;
        }
    }
}
