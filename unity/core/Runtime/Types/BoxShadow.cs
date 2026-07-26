using System.Collections.Generic;
using System.Linq;

using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Types
{
    public class BoxShadow : Interpolatable
    {
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

        public object Interpolate(object to, float t)
        {
            var tto = to as BoxShadow;
            if (tto == null) return t > 0.5 ? tto : this;

            if (inset != tto.inset && this != Default && tto != Default)
            {
                if (t < 0.5) return Interpolate(inset ? DefaultInset : Default, t * 2);
                else return (tto.inset ? DefaultInset : Default).Interpolate(tto, (t - 0.5f) * 2);
            }

            return new BoxShadow(
                Interpolater.Interpolate(offset, tto.offset, t),
                Interpolater.Interpolate(blur, tto.blur, t),
                Interpolater.Interpolate(spread, tto.spread, t),
                Interpolater.Interpolate(color, tto.color, t),
                this != Default ? inset : tto.inset
            );
        }

        public class Converter : StyleConverterBase
        {
            public static StyleConverterBase ColorParser = new ColorConverter();
            public static StyleConverterBase FloatParser = new LengthConverter();

            protected override System.Type TargetType => typeof(BoxShadow);

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                // Example:
                // <xOffset> <yOffset> [blur] [spread] [color] [inset]
                // <xOffset> <yOffset> [xBlur] [yBlur] [xSpread] [ySpread] [color] [inset]
                // 1px 1px 3px 4px -2px -4px black inset

                var splits = ParserHelpers.SplitWhitespace(value);
                if (splits.Count < 1) return Fail(out result);

                var insetIndex = splits.IndexOf("inset");
                var isInset = insetIndex >= 0;
                if (isInset) splits.Remove("inset");

                var last = splits[splits.Count - 1];
                var lastSegmentFirstChar = last.FirstOrDefault();

                if (ColorParser.TryParse(last, out var colorValue)) splits.RemoveAt(splits.Count - 1);
                else colorValue = new ComputedConstant(Color.black);

                if (splits.Count < 2 || splits.Count > 6 || splits.Count == 5) return Fail(out result);

                return ComputedCompound.Create(out result,
                    new List<object> { colorValue }.Concat(splits).ToList(),
                    new List<StyleConverterBase> { ColorParser, FloatParser, FloatParser, FloatParser, FloatParser, FloatParser, FloatParser },
                    (resolvedValues) => {

                        if (!(resolvedValues[0] is Color c)) return null;

                        var lengths = resolvedValues.Skip(1).Select(x => x is float f ? f : float.NaN).ToList();

                        if (lengths.Count != resolvedValues.Count - 1) return null;

                        var dx = lengths[0];
                        var dy = lengths[1];
                        var blurx = lengths.ElementAtOrDefault(2);
                        var blury = lengths.ElementAtOrDefault(3);
                        var spreadx = lengths.ElementAtOrDefault(4);
                        var spready = lengths.ElementAtOrDefault(5);
                        if (lengths.Count < 5)
                        {
                            spready = spreadx = blury;
                            blury = blurx;
                        }

                        var offset = new Vector2(dx, dy);
                        var spread = new Vector2(spreadx, spready);
                        var blur = new Vector2(blurx, blury);
                        return new BoxShadow(offset, blur, spread, c, isInset);
                    }
                );
            }
        }
    }
}
