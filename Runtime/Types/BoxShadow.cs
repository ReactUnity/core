using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using System;
using System.Linq;
using UnityEngine;

namespace ReactUnity.Types
{
    [Serializable]
    public class BoxShadow
    {
        public Vector2 offset;
        public Vector2 spread;
        public Color color = Color.black;
        public float blur;
        public bool inset;

        public BoxShadow() { }

        public BoxShadow(Vector2 offset, Vector2 spread, Color color, float blur, bool inset = false)
        {
            this.offset = offset;
            this.spread = spread;
            this.color = color;
            this.blur = blur;
            this.inset = inset;
        }


        public class Converter : IStyleParser, IStyleConverter
        {
            public ColorConverter ColorParser = new ColorConverter();
            public FloatConverter FloatParser = new LengthConverter();

            public object Convert(object value)
            {
                if (value is BoxShadow t) return t;
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                // Example:
                // 1px 1px 3px -2px -4px black inset

                var splits = ParserHelpers.SplitWhitespace(value);
                if (splits.Count < 1) return CssKeyword.Invalid;

                var insetIndex = splits.IndexOf("inset");
                var isInset = insetIndex >= 0;
                splits.Remove("inset");

                var last = splits[splits.Count - 1];
                var lastSegmentFirstChar = last.FirstOrDefault();
                var lastIsNumber = char.IsDigit(lastSegmentFirstChar) || lastSegmentFirstChar == '-';
                var color = lastIsNumber ? Color.black : (Color?) ColorParser.FromString(last) ?? Color.black;

                if (!lastIsNumber) splits.RemoveAt(splits.Count - 1);

                var lengths = splits.Select(x => FloatParser.FromString(x)).ToList();

                if (lengths.Count < 2 || lengths.Any(x => x.Equals(CssKeyword.Invalid))) return CssKeyword.Invalid;


                var sizes = lengths.OfType<float>().ToList();

                var dx = sizes[0];
                var dy = sizes[1];
                var blur = sizes.ElementAtOrDefault(2);
                var spreadx = sizes.ElementAtOrDefault(3);
                var spready = sizes.ElementAtOrDefault(4);
                if (sizes.Count < 5) spready = spreadx;

                return new BoxShadow(new Vector2(dx, dy), new Vector2(spreadx, spready), color, blur, isInset);
            }
        }
    }
}
