using System.Collections.Generic;
using System.Linq;

using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public class Cursor
    {
        public static readonly Cursor Default = new Cursor("default");
        public static readonly Cursor None = new Cursor("none");
        public static readonly Cursor Pointer = new Cursor("pointer");
        public static readonly Cursor Text = new Cursor("text");

        public Vector2 Offset { get; }
        public string Name { get; }
        public ImageReference Image { get; }
        public string Definition { get; }
        public bool Valid { get; } = true;

        // Example:
        // url(res:cursors/game)
        // url(res:cursors/hand) 5 5
        // default
        // pointer

        public Cursor(string name)
        {
            Name = Definition = name;
        }

        public Cursor(ImageReference image, Vector2 offset)
        {
            if (image.Type == AssetReferenceType.None) Name = Definition = "none";
            else if (image.Type == AssetReferenceType.Auto) Name = Definition = "default";
            else
            {
                Image = image;
                Offset = offset;
                Definition = "";
            }
        }


        public class Converter : TypedStyleConverterBase<Cursor>
        {
            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(None, out result);
                if (keyword == CssKeyword.Default) return Constant(Default, out result);

                return base.HandleKeyword(keyword, out result);
            }

            protected override bool ParseInternal(string definition, out IComputedValue result)
            {
                var splits = ParserHelpers.SplitWhitespace(definition);
                if (splits.Count == 0)
                {
                    result = null;
                    return false;
                }

                if (splits.Count == 1)
                {
                    if (AllConverters.ImageReferenceConverter.TryParse(splits[0], out var imageResult))
                    {
                        result = ComputedMapper.Create(imageResult, AllConverters.ImageReferenceConverter,
                            (value) => {
                                if (value is ImageReference iref)
                                {
                                    if (iref.Type == AssetReferenceType.Auto || iref.Type == AssetReferenceType.None)
                                        return new Cursor(splits[0]);
                                    return new Cursor(iref, Vector2.zero);
                                }

                                return null;
                            });
                        return true;
                    }

                    result = new ComputedConstant(new Cursor(splits[0]));
                    return true;
                }

                var rest = string.Join(" ", splits.ToArray(), 1, splits.Count - 1);

                return ComputedCompound.Create(out result,
                    new List<object> { splits[0], rest },
                    new List<StyleConverterBase> { AllConverters.ImageReferenceConverter, AllConverters.Vector2Converter },
                    (resolvedValues) => {
                        if (resolvedValues[0] is ImageReference iref && resolvedValues[1] is Vector2 v)
                            return new Cursor(iref, v);
                        return null;
                    });
            }
        }
    }
}
