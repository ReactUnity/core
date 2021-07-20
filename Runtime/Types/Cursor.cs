using System.Linq;
using ReactUnity.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public class CursorList : CommaSeparatedList<Cursor>
    {
        public static readonly CursorList Default = new CursorList(Cursor.Default);
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

        public class Converter : IStyleParser, IStyleConverter
        {
            public object Convert(object value)
            {
                if (value is CursorList f) return f;
                if (value is Cursor t) return new CursorList(t);
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return null;
                return new CursorList(value);
            }
        }
    }

    public class Cursor : ICommaSeparatedListItem
    {
        public static readonly Cursor Invalid = new Cursor("");
        public static readonly Cursor Default = new Cursor("default");
        public static readonly Cursor Pointer = new Cursor("pointer");
        public static readonly Cursor Text = new Cursor("text");

        public Vector2 Offset { get; }
        public string Name { get; }
        public ImageReference Image { get; }
        public string Definition { get; }
        public bool Valid { get; } = true;


        public Cursor(string definition)
        {
            Definition = definition;

            // Example:
            // url(res:cursors/game)
            // url(res:cursors/hand) 5 5
            // default
            // pointer

            var splits = ParserHelpers.SplitWhitespace(definition);
            if (splits.Count != 1 && splits.Count != 3)
            {
                Valid = false;
                return;
            }

            if (splits.Count == 1)
            {
                Image = AllConverters.ImageReferenceConverter.Convert(splits[0]) as ImageReference;
                if (Image == null || Image.Type == AssetReferenceType.Auto)
                {
                    Image = null;
                    Name = splits[0];
                }
            }
            else if (splits.Count == 3)
            {
                Image = AllConverters.ImageReferenceConverter.Convert(splits[0]) as ImageReference;

                if (Image == null || Image.Type == AssetReferenceType.Auto)
                {
                    Valid = false;
                    return;
                }

                var x = AllConverters.FloatConverter.Convert(splits[1]);
                var y = AllConverters.FloatConverter.Convert(splits[2]);

                if (x is float hx && y is float hy) Offset = new Vector2(hx, hy);
                else Valid = false;
            }
            else
            {
                Valid = false;
            }
        }
    }
}
