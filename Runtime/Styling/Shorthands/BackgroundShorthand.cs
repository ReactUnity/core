using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Shorthands
{
    public class BackgroundShorthand : StyleShorthand
    {
        private static GeneralConverter RepeatConverter = AllConverters.Get<BackgroundRepeat>();

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.backgroundColor,
            StyleProperties.backgroundImage,
            StyleProperties.backgroundPosition,
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
            var sizes = new BackgroundSize[count];
            var repeatXs = new BackgroundRepeat[count];
            var repeatYs = new BackgroundRepeat[count];

            for (int ci = 0; ci < count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitShorthand(comma);

                var isLast = ci == (count - 1);

                var imageSet = false;
                var posXSet = false;
                var posYSet = false;
                YogaValue posX = YogaValue.Undefined();
                YogaValue posY = YogaValue.Undefined();

                var sizeXSet = false;
                var sizeYSet = false;
                YogaValue sizeX = YogaValue.Auto();
                YogaValue sizeY = YogaValue.Auto();

                var sizeSetByKeyword = false;
                BackgroundSize size = BackgroundSize.Auto;

                var repeatXSet = false;
                var repeatYSet = false;

                var canSetSize = -1;

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
                        var val = YogaValueConverter.Horizontal.Parse(split);

                        if (val is YogaValue v)
                        {
                            posX = v;
                            posXSet = true;
                            if (!posYSet) posY = YogaValue.Percent(50);
                            continue;
                        }
                    }

                    if (!posYSet)
                    {
                        var val = YogaValueConverter.Vertical.Parse(split);

                        if (val is YogaValue v)
                        {
                            posY = v;
                            posYSet = true;
                            if (!posXSet) posX = YogaValue.Percent(50);
                            continue;
                        }
                    }

                    if (!repeatXSet && !repeatYSet)
                    {
                        if (split == "repeat-x")
                        {
                            repeatXSet = repeatYSet = true;
                            repeatXs[ci] = BackgroundRepeat.Repeat;
                            repeatYs[ci] = BackgroundRepeat.NoRepeat;
                            continue;
                        }
                        else if (split == "repeat-y")
                        {
                            repeatXSet = repeatYSet = true;
                            repeatXs[ci] = BackgroundRepeat.NoRepeat;
                            repeatYs[ci] = BackgroundRepeat.Repeat;
                            continue;
                        }
                    }

                    var rptVal = RepeatConverter.Parse(split);

                    if (rptVal is BackgroundRepeat rpt)
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
                            size = BackgroundSize.Cover;
                            continue;
                        }

                        if (split == "contain")
                        {
                            sizeSetByKeyword = sizeXSet = sizeYSet = true;
                            size = BackgroundSize.Contain;
                            continue;
                        }

                        if (!sizeXSet)
                        {
                            var val = AllConverters.YogaValueConverter.Parse(split);

                            if (val is YogaValue v)
                            {
                                sizeX = v;
                                sizeXSet = true;
                                canSetSize = i + 1;
                                continue;
                            }
                        }

                        if (!sizeYSet)
                        {
                            var val = AllConverters.YogaValueConverter.Parse(split);

                            if (val is YogaValue v)
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

                if (posXSet || posYSet) positions[ci] = new YogaValue2(posX, posY);

                if (sizeSetByKeyword) sizes[ci] = size;
                else if (sizeXSet) sizes[ci] = new BackgroundSize(new YogaValue2(sizeX, sizeY));
            }

            collection[StyleProperties.backgroundColor] = color;
            collection[StyleProperties.backgroundImage] = new CssValueList<ImageDefinition>(images);
            collection[StyleProperties.backgroundPosition] = new CssValueList<YogaValue2>(positions);
            collection[StyleProperties.backgroundSize] = new CssValueList<BackgroundSize>(sizes);
            collection[StyleProperties.backgroundRepeatX] = new CssValueList<BackgroundRepeat>(repeatXs);
            collection[StyleProperties.backgroundRepeatY] = new CssValueList<BackgroundRepeat>(repeatYs);
            return ModifiedProperties;
        }
    }
}
