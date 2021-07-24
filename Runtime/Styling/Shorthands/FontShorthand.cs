using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Types;
using TMPro;

namespace ReactUnity.Styling.Shorthands
{
    public class FontShorthand : StyleShorthand
    {
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

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (value == null) return null;

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str.Replace("/", " / "));

            if (splits.Count == 0) return null;

            var styleSet = false;
            var weightSet = false;
            var sizeSet = false;
            var lineHeightSet = false;
            var familySet = false;

            var style = FontStyles.Normal;
            var weight = FontWeight.Regular;
            var size = YogaValue.Undefined();
            var lineHeight = YogaValue.Undefined();
            var family = FontReference.None;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (familySet) return null;

                if (!weightSet)
                {
                    var val = AllConverters.Get<FontWeight>().Convert(split);

                    if (val is FontWeight v)
                    {
                        weight = v;
                        weightSet = true;
                        continue;
                    }
                }

                if (!styleSet)
                {
                    var val = AllConverters.Get<FontStyles>().Convert(split);

                    if (val is FontStyles v)
                    {
                        style = v;
                        styleSet = true;
                        continue;
                    }
                }

                if (!sizeSet)
                {
                    var slashSplit = split.Split('/');

                    var val = AllConverters.YogaValueConverter.Convert(slashSplit[0]);

                    if (val is YogaValue v)
                    {
                        size = v;
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

                            var lh = AllConverters.YogaValueConverter.Convert(lineSplit);

                            if (lh is YogaValue l)
                            {
                                lineHeight = l;
                                lineHeightSet = true;
                            }
                            else return null;
                        }

                        continue;
                    }
                }

                if (!familySet)
                {
                    var val = AllConverters.FontReferenceConverter.Convert(split);

                    if (val is FontReference v)
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
