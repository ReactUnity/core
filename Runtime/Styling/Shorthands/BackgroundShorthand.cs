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

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 2) return null;

            var colorSet = false;
            var imageSet = false;

            var color = Color.clear;
            var image = ImageReference.None;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!colorSet)
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
                    var val = AllConverters.ImageReferenceConverter.Convert(split);

                    if (val is ImageReference v)
                    {
                        image = v;
                        imageSet = true;
                        continue;
                    }
                }

                return null;
            }

            if (colorSet) collection[StyleProperties.backgroundColor] = color;
            if (imageSet) collection[StyleProperties.backgroundImage] = image;

            return ModifiedProperties;
        }
    }
}
