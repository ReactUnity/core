using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Types;
using TMPro;

namespace ReactUnity.Styling.Shorthands
{
    public class FontShorthand : StyleShorthand
    {
        private static GeneralConverter WeightConverter = AllConverters.Get<FontWeight>();
        private static GeneralConverter StylesConverter = AllConverters.Get<FontStyles>();

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
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            var str = value.ToString();
            var splits = ParserHelpers.SplitShorthand(str);

            if (splits.Count == 0) return null;

            var styleSet = false;
            var weightSet = false;
            var sizeSet = false;
            var lineHeightSet = false;
            var familySet = false;

            var style = FontStyles.Normal;
            var weight = FontWeight.Regular;
            object size = null;
            object lineHeight = null;
            var family = FontReference.None;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (familySet) return null;

                if (!weightSet)
                {
                    var val = WeightConverter.Parse(split);

                    if (val is FontWeight v)
                    {
                        weight = v;
                        weightSet = true;
                        continue;
                    }
                }

                if (!styleSet)
                {
                    var val = StylesConverter.Parse(split);

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

                    var val = AllConverters.LengthConverter.Parse(slashSplit[0]);

                    if (!Equals(val, CssKeyword.Invalid))
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

                            var lh = AllConverters.LengthConverter.Parse(lineSplit);

                            if (!Equals(lh, CssKeyword.Invalid))
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
                    var val = AllConverters.FontReferenceConverter.Parse(split);

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
