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

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
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
                    var val = AllConverters.ImageReferenceConverter.Parse(split);

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
