using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Functions
{
    public class RadialGradientFunction : ICssFunction
    {
        static IStyleConverter ShapeConverter = AllConverters.Get<RadialGradientShape>();
        static IStyleConverter SizeHintConverter = AllConverters.Get<RadialGradientSize>();

        public string Name { get; } = "radial-gradient";

        public object Call(string name, string[] args)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            var shape = RadialGradientShape.Ellipse;
            var sizeHint = RadialGradientSize.FarthestCorner;
            var at = YogaValue2.Center;
            var isRepeating = name.StartsWith("repeating-");


            var firstSplit = ParserHelpers.SplitWhitespace(first);

            for (int i = 0; i < firstSplit.Count; i++)
            {
                var sp = firstSplit[i];

                if (sp == "at")
                {
                    i++;
                    if (firstSplit.Count <= i) return null;

                    sp = firstSplit[i];

                    var cAt = AllConverters.YogaValue2Converter.Convert(sp);

                    if (cAt is YogaValue2 cvAt)
                    {
                        at = cvAt;
                    }
                    else return null;

                    startIndex = 1;
                    continue;
                }

                var shp = ShapeConverter.Convert(sp);

                if (shp is RadialGradientShape shpv)
                {
                    shape = shpv;
                    startIndex = 1;
                    continue;
                }

                var sz = SizeHintConverter.Convert(sp);

                if (sz is RadialGradientSize szv)
                {
                    sizeHint = szv;
                    startIndex = 1;
                    continue;
                }
            }

            if (args.Length - startIndex < 2) return null;

            var colors = LinearGradientFunction.GetColorKeys(args, startIndex, false);

            var def = new RadialGradient
            {
                Keys = colors,
                At = at,
                Repeating = isRepeating,
                SizeHint = sizeHint,
                Shape = shape,
            };

            if (def.ProcessKeys()) return def;
            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;
    }
}
