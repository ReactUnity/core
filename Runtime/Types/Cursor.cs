using System.Collections.Generic;
using System.Linq;

using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public class CursorList : CommaSeparatedList<Cursor>
    {
        public static readonly CursorList Default = new CursorList(Cursor.Default);
        public static readonly CursorList None = new CursorList(Cursor.None);
        public static readonly CursorList Pointer = new CursorList(Cursor.Pointer);
        public static readonly CursorList Text = new CursorList(Cursor.Text);

        public CursorList(string definition) : base(definition) { }
        public CursorList(Cursor item) : base(item) { }
        public CursorList(Cursor[] items) : base(items) { }

        protected override Cursor CreateItem(string definition)
        {
            return new Cursor(definition);
        }

        public string GetWebGLDefinition()
        {
            return string.Join(", ", Items.Where(x => x.Image == null || x.Image.Type == AssetReferenceType.Url).Select(x => x.Definition));
        }

        public class Converter : CommaSeparatedListConverter<CursorList, Cursor>
        {
            public override bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None || keyword == CssKeyword.Default;

            protected override StyleConverterBase SingleConverter { get; } = new Cursor.Converter();

            protected override CursorList CreateItems(params Cursor[] items)
            {
                if (items.Length == 0) return None;
                return new CursorList(items);
            }
        }
    }

    public class Cursor : ICommaSeparatedListItem
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
            if (image.Type == AssetReferenceType.Auto) Name = Definition = "default";
            else
            {
                Image = image;
                Offset = offset;
                Definition = "";
            }
        }


        public class Converter : TypedStyleConverterBase<Cursor>
        {
            public override bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None || keyword == CssKeyword.Default;

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
                        result = new ComputedMapper(imageResult, AllConverters.ImageReferenceConverter,
                            (object value, out IComputedValue res) => {
                                if (value is ImageReference iref)
                                {
                                    if (iref.Type == AssetReferenceType.Auto || iref.Type == AssetReferenceType.None)
                                        res = new ComputedConstant(new Cursor(splits[0]));
                                    else res = new ComputedConstant(new Cursor(iref, Vector2.zero));
                                    return true;
                                }

                                res = null;
                                return false;
                            });
                        return true;
                    }

                    result = new ComputedConstant(new Cursor(splits[0]));
                    return true;
                }

                var rest = string.Join(" ", splits, 1, splits.Count - 1);

                return ComputedCompound.Create(out result,
                    new List<object> { splits[0], rest },
                    new List<StyleConverterBase> { AllConverters.ImageReferenceConverter, AllConverters.Vector2Converter },
                    (List<object> resolvedValues, out IComputedValue res) => {
                        if (resolvedValues[0] is ImageReference iref && resolvedValues[1] is Vector2 v)
                        {
                            res = new ComputedConstant(new Cursor(iref, v));
                            return true;
                        }

                        res = null;
                        return false;
                    });
            }
        }
    }
}
