using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    public class MaskShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.maskImage,
        };

        public MaskShorthand(string name) : base(name) { }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (value == null) return null;

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 1) return null;

            var imageSet = false;

            var image = ImageReference.None;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

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

            if (imageSet) collection[StyleProperties.maskImage] = image;

            return ModifiedProperties;
        }
    }
}
