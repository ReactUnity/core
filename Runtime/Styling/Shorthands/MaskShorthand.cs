using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    internal class MaskShorthand : StyleShorthand
    {
        private static StyleConverterBase RepeatConverter = AllConverters.Get<BackgroundRepeat>();

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.maskImage,
            StyleProperties.maskPositionX,
            StyleProperties.maskPositionY,
            StyleProperties.maskSize,
            StyleProperties.maskRepeatX,
            StyleProperties.maskRepeatY,
        };

        public MaskShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var commas = ParserHelpers.SplitComma(value?.ToString());
            var count = commas.Count;

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

                    return null;
                }

                if (posXSet || posYSet)
                {
                    positionsX[ci] = new ComputedConstant(posX);
                    positionsY[ci] = new ComputedConstant(posY);
                }

                if (sizeSetByKeyword) sizes[ci] = new ComputedConstant(size);
                else if (sizeXSet) sizes[ci] = new ComputedList(new List<IComputedValue> { sizeX, sizeY }, AllConverters.YogaValueConverter,
                    (List<object> resolved, out IComputedValue rs) => {
                        if (resolved[0] is YogaValue xv && resolved[1] is YogaValue yv)
                        {
                            rs = new ComputedConstant(new BackgroundSize(new YogaValue2(xv, yv)));
                            return true;
                        }

                        rs = null;
                        return false;
                    });
            }

            collection[StyleProperties.maskImage] = StyleProperties.maskImage.Converter.FromList(images);
            collection[StyleProperties.maskPositionX] = StyleProperties.maskPositionX.Converter.FromList(positionsX);
            collection[StyleProperties.maskPositionY] = StyleProperties.maskPositionY.Converter.FromList(positionsY);
            collection[StyleProperties.maskSize] = StyleProperties.maskSize.Converter.FromList(sizes);
            collection[StyleProperties.maskRepeatX] = StyleProperties.maskRepeatX.Converter.FromList(repeatXs);
            collection[StyleProperties.maskRepeatY] = StyleProperties.maskRepeatY.Converter.FromList(repeatYs);

            return ModifiedProperties;
        }
    }
}
