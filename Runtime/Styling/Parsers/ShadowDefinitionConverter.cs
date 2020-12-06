using ReactUnity.Styling.Types;
using System.Linq;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class ShadowDefinitionConverter : IStyleParser, IStyleConverter
    {
        public ColorConverter ColorParser = new ColorConverter();
        public FloatConverter FloatParser = new FloatConverter();

        public object Convert(object value)
        {
            if (value is ShadowDefinition t) return t;
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            // Example:
            // 1px 1px 3px -2px -4px black inset

            var splits = value.Split(new char[] { ' ' }, System.StringSplitOptions.RemoveEmptyEntries).ToList();
            if (splits.Count < 1) return SpecialNames.CantParse;

            var insetIndex = splits.IndexOf("inset");
            var isInset = insetIndex >= 0;
            splits.Remove("inset");

            var last = splits[splits.Count - 1];
            var lastSegmentFirstChar = last.FirstOrDefault();
            var lastIsNumber = char.IsDigit(lastSegmentFirstChar) || lastSegmentFirstChar == '-';
            var color = lastIsNumber ? Color.black : (Color?) ColorParser.FromString(last) ?? Color.black;

            if (!lastIsNumber) splits.RemoveAt(splits.Count - 1);

            var lengths = splits.Select(x => FloatParser.FromString(x)).ToList();

            if (lengths.Count < 2 || lengths.Any(x => x.Equals(SpecialNames.CantParse))) return SpecialNames.CantParse;


            var sizes = lengths.OfType<float>().ToList();

            var dx = sizes[0];
            var dy = sizes[1];
            var blur = sizes.ElementAtOrDefault(2);
            var spreadx = sizes.ElementAtOrDefault(3);
            var spready = sizes.ElementAtOrDefault(4);
            if (sizes.Count < 5) spready = spreadx;

            return new ShadowDefinition(new Vector2(dx, dy), new Vector2(spreadx, spready), color, blur, isInset);
        }
    }
}
