using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using TMPro;

namespace ReactUnity.Styling.Shorthands
{
    internal class FontShorthand : StyleShorthand
    {
        private static StyleConverterBase WeightConverter = AllConverters.Get<FontWeight>();
        private static StyleConverterBase StylesConverter = AllConverters.Get<FontStyles>();

        public override List<IStyleProperty> ModifiedProperties { get; }

        public FontShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                StyleProperties.fontStyle,
                StyleProperties.fontWeight,
                StyleProperties.fontSize,
                StyleProperties.lineHeight,
                StyleProperties.fontFamily,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value.ToString();
            var splits = ParserHelpers.SplitShorthand(str);

            if (splits.Count == 0) return null;

            var styleSet = false;
            var weightSet = false;
            var sizeSet = false;
            var lineHeightSet = false;
            var familySet = false;

            IComputedValue style = new ComputedConstant(FontStyles.Normal);
            IComputedValue weight = new ComputedConstant(FontWeight.Regular);
            IComputedValue size = null;
            IComputedValue lineHeight = null;
            IComputedValue family = new ComputedConstant(FontReference.None);

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (familySet) return null;

                if (!weightSet)
                {
                    if (WeightConverter.TryParse(split, out var v))
                    {
                        weight = v;
                        weightSet = true;
                        continue;
                    }
                }

                if (!styleSet)
                {
                    if (StylesConverter.TryParse(split, out var v))
                    {
                        style = v;
                        styleSet = true;
                        continue;
                    }
                }

                if (!sizeSet)
                {
                    var slashSplit = split.Split('/');

                    if (AllConverters.FontSizeConverter.TryParse(slashSplit[0], out var val))
                    {
                        size = val;
                        sizeSet = true;

                        var hasLine = false;
                        string lineSplit = null;

                        if (splits.Count > i + 2 && splits[i + 1] == "/")
                        {
                            hasLine = true;
                            lineSplit = splits[i + 2];
                            i += 2;
                        }

                        if (hasLine)
                        {
                            if (lineHeightSet) return null;

                            if (AllConverters.FontSizeConverter.TryParse(lineSplit, out var lh))
                            {
                                lineHeight = lh;
                                lineHeightSet = true;
                            }
                            else return null;
                        }

                        continue;
                    }
                }

                if (!familySet)
                {
                    if (AllConverters.FontReferenceConverter.TryParse(split, out var v))
                    {
                        family = v;
                        familySet = true;
                        continue;
                    }
                }

                return null;
            }

            if (styleSet) collection[StyleProperties.fontStyle] = style;
            if (weightSet) collection[StyleProperties.fontWeight] = weight;
            if (sizeSet) collection[StyleProperties.fontSize] = size;
            if (lineHeightSet) collection[StyleProperties.lineHeight] = lineHeight;
            if (familySet) collection[StyleProperties.fontFamily] = family;

            return ModifiedProperties;
        }
    }
}
