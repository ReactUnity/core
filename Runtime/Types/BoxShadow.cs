using System.Linq;
using ReactUnity.Converters;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Types
{
    public class BoxShadow
    {
        public static ColorConverter ColorParser = new ColorConverter();
        public static FloatConverter FloatParser = new LengthConverter();

        public static BoxShadow Default = new BoxShadow(Vector2.zero, Vector2.zero, Vector2.zero, Color.clear, false);
        public static BoxShadow DefaultInset = new BoxShadow(Vector2.zero, Vector2.zero, Vector2.zero, Color.clear, true);

        public Vector2 offset { get; }
        public Vector2 spread { get; }
        public Color color { get; } = Color.black;
        public Vector2 blur { get; }
        public bool inset { get; }
        public string Definition { get; }

        public BoxShadow(Vector2 offset, Vector2 blur, Vector2 spread, Color color, bool inset = false)
        {
            this.offset = offset;
            this.spread = spread;
            this.color = color;
            this.blur = blur;
            this.inset = inset;

            var blurString = blur.x == blur.y ? $"{blur.x}px" : $"{blur.x}px {blur.y}px";
            var spreadString = spread.x == spread.y ? $"{spread.x}px" : $"{spread.x}px {spread.y}px";

            Definition = $"{offset.x}px {offset.y}px {blurString} {spreadString} #{ColorUtility.ToHtmlStringRGBA(color)} {(inset ? "inset" : "")}";
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Parse(string value)
            {
                // Example:
                // <xOffset> <yOffset> [blur] [spread] [color] [inset]
                // <xOffset> <yOffset> [xBlur] [yBlur] [xSpread] [ySpread] [color] [inset]
                // 1px 1px 3px 4px -2px -4px black inset

                var splits = ParserHelpers.SplitWhitespace(value);
                if (splits.Count < 1) return CssKeyword.Invalid;

                var insetIndex = splits.IndexOf("inset");
                var isInset = insetIndex >= 0;
                if (isInset) splits.Remove("inset");

                var last = splits[splits.Count - 1];
                var lastSegmentFirstChar = last.FirstOrDefault();
                var lastIsNumber = char.IsDigit(lastSegmentFirstChar) || lastSegmentFirstChar == '-';
                Color color;

                if (lastIsNumber) color = Color.black;
                else if (ColorParser.Parse(last) is Color c) color = c;
                else color = Color.black;

                if (!lastIsNumber) splits.RemoveAt(splits.Count - 1);

                var lengths = splits.Select(x => FloatParser.Parse(x)).ToList();

                if (lengths.Count < 2 || lengths.Count > 6 || lengths.Count == 5 || lengths.Any(x => x.Equals(CssKeyword.Invalid)))
                    return CssKeyword.Invalid;

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

                var offset = new Vector2(dx, dy);
                var spread = new Vector2(spreadx, spready);
                var blur = new Vector2(blurx, blury);
                return new BoxShadow(offset, blur, spread, color, isInset);
            }

            public object Convert(object value)
            {
                if (value is string s) return Parse(s);
                if (value is BoxShadow b) return b;
                return CssKeyword.Invalid;
            }
        }
    }
}
