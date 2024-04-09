using System.Collections.Generic;
using Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    internal class BorderImageShorthand : StyleShorthand
    {
        private static StyleConverterBase SourceConverter = AllConverters.Get<ImageDefinition>();
        private static StyleConverterBase SliceConverter = AllConverters.Get<BorderImageSlice>();
        private static StyleConverterBase RepeatConverter = new CssFourDirectional<BackgroundRepeat>.Converter();
        private static StyleConverterBase SizeConverter = new CssFourDirectional<YogaValue>.Converter();

        public override List<IStyleProperty> ModifiedProperties { get; }

        public BorderImageShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                StyleProperties.borderImageSource,
                StyleProperties.borderImageSlice,
                StyleProperties.borderImageWidth,
                StyleProperties.borderImageOutset,
                StyleProperties.borderImageRepeat,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value.ToString();
            var splits = ParserHelpers.SplitShorthand(str);

            if (splits.Count == 0) return null;

            var sliceSet = false;
            var widthSet = false;
            var outsetSet = false;
            var repeatSet = false;

            IComputedValue source;
            IComputedValue slice = null;
            IComputedValue width = null;
            IComputedValue outset = null;
            IComputedValue repeat = null;

            if (splits.Count == 0) return null;

            var firstSplit = splits[0];

            if (SourceConverter.TryParse(firstSplit, out var sv))
            {
                source = sv;
            }
            else return null;

            if (splits.Count > 1)
            {
                splits = ParserHelpers.SplitSlash(string.Join(" ", splits.ToArray(), 1, splits.Count - 1));

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    if (repeatSet) return null;

                    if (!sliceSet)
                    {
                        if (SliceConverter.TryParse(split, out var v))
                        {
                            slice = v;
                            sliceSet = true;
                            continue;
                        }
                    }

                    if (!widthSet)
                    {
                        if (SizeConverter.TryParse(split, out var val))
                        {
                            width = val;
                            widthSet = true;
                            continue;
                        }
                    }

                    if (!outsetSet)
                    {
                        if (SizeConverter.TryParse(split, out var val))
                        {
                            outset = val;
                            outsetSet = true;
                            continue;
                        }
                    }

                    if (!repeatSet)
                    {
                        if (RepeatConverter.TryParse(split, out var v))
                        {
                            repeat = v;
                            repeatSet = true;
                            continue;
                        }
                    }

                    return null;
                }
            }

            collection[StyleProperties.borderImageSource] = source;
            collection[StyleProperties.borderImageSlice] = slice;
            collection[StyleProperties.borderImageWidth] = width;
            collection[StyleProperties.borderImageOutset] = outset;
            collection[StyleProperties.borderImageRepeat] = repeat;

            return ModifiedProperties;
        }
    }
}
