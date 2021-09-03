using System.Linq;
using ReactUnity.Converters;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Types
{
    public class BoxShadowList : CommaSeparatedList<BoxShadow>
    {
        public BoxShadowList(string definition) : base(definition) { }
        public BoxShadowList(BoxShadow item) : base(item) { }
        public BoxShadowList(BoxShadow[] items) : base(items) { }

        protected override BoxShadow CreateItem(string definition)
        {
            return new BoxShadow(definition);
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Convert(object value)
            {
                if (value is BoxShadowList f) return f;
                if (value is BoxShadow t) return new BoxShadowList(t);
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return null;
                return new BoxShadowList(value);
            }
        }
    }

    public class BoxShadow : ICommaSeparatedListItem
    {
        public static ColorConverter ColorParser = new ColorConverter();
        public static FloatConverter FloatParser = new LengthConverter();

        public static BoxShadow Invalid = new BoxShadow("");
        public static BoxShadow Default = new BoxShadow(Vector2.zero, Vector2.zero, Vector2.zero, Color.clear, false);
        public static BoxShadow DefaultInset = new BoxShadow(Vector2.zero, Vector2.zero, Vector2.zero, Color.clear, true);

        public Vector2 offset { get; }
        public Vector2 spread { get; }
        public Color color { get; } = Color.black;
        public Vector2 blur { get; }
        public bool inset { get; }

        public bool Valid { get; }
        public string Definition { get; }


        public BoxShadow(string definition)
        {
            Definition = definition;

            // Example:
            // <xOffset> <yOffset> [blur] [spread] [color] [inset]
            // <xOffset> <yOffset> [xBlur] [yBlur] [xSpread] [ySpread] [color] [inset]
            // 1px 1px 3px 4px -2px -4px black inset

            var splits = ParserHelpers.SplitWhitespace(definition);
            if (splits.Count < 1)
            {
                Valid = false;
                return;
            }

            var insetIndex = splits.IndexOf("inset");
            var isInset = insetIndex >= 0;
            if (isInset) splits.Remove("inset");

            var last = splits[splits.Count - 1];
            var lastSegmentFirstChar = last.FirstOrDefault();
            var lastIsNumber = char.IsDigit(lastSegmentFirstChar) || lastSegmentFirstChar == '-';
            Color color;

            if (lastIsNumber) color = Color.black;
            else if (ColorParser.FromString(last) is Color c) color = c;
            else color = Color.black;

            if (!lastIsNumber) splits.RemoveAt(splits.Count - 1);

            var lengths = splits.Select(x => FloatParser.FromString(x)).ToList();

            if (lengths.Count < 2 || lengths.Count > 6 || lengths.Count == 5 || lengths.Any(x => x.Equals(CssKeyword.Invalid)))
            {
                Valid = false;
                return;
            }

            var sizes = lengths.OfType<float>().ToList();

            var dx = sizes[0];
            var dy = sizes[1];
            var blurx = sizes.ElementAtOrDefault(2);
            var blury = sizes.ElementAtOrDefault(3);
            var spreadx = sizes.ElementAtOrDefault(4);
            var spready = sizes.ElementAtOrDefault(5);
            if (sizes.Count < 5)
            {
                spready = spreadx = blury;
                blury = blurx;
            }

            offset = new Vector2(dx, dy);
            spread = new Vector2(spreadx, spready);
            this.color = color;
            blur = new Vector2(blurx, blury);
            inset = isInset;
            Valid = true;
        }

        public BoxShadow(Vector2 offset, Vector2 blur, Vector2 spread, Color color, bool inset = false)
        {
            this.offset = offset;
            this.spread = spread;
            this.color = color;
            this.blur = blur;
            this.inset = inset;

            Valid = true;

            var blurString = blur.x == blur.y ? $"{blur.x}px" : $"{blur.x}px {blur.y}px";
            var spreadString = spread.x == spread.y ? $"{spread.x}px" : $"{spread.x}px {spread.y}px";

            Definition = $"{offset.x}px {offset.y}px {blurString} {spreadString} #{ColorUtility.ToHtmlStringRGBA(color)} {(inset ? "inset" : "")}";
        }
    }
}
