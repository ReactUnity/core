using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Functions
{
    internal class RadialGradientFunction : ICssFunction
    {
        static StyleConverterBase ShapeConverter = AllConverters.Get<RadialGradientShape>();
        static StyleConverterBase SizeHintConverter = AllConverters.Get<RadialGradientSizeHint>();
        static StyleConverterBase YogaValueConverter = AllConverters.YogaValueConverter;

        public string Name { get; } = "radial-gradient";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            var isRepeating = name.StartsWith("repeating-");

            IComputedValue shape = null;
            IComputedValue sizeHint = null;
            IComputedValue at = null;
            IComputedValue radius = null;


            var firstSplit = ParserHelpers.SplitWhitespace(first);

            for (int i = 0; i < firstSplit.Count; i++)
            {
                var sp = firstSplit[i];

                if (sp == "at")
                {
                    i++;
                    if (firstSplit.Count <= i) return null;

                    sp = string.Join(" ", firstSplit.ToArray(), i, firstSplit.Count - i);

                    if (!AllConverters.YogaValue2Converter.TryParse(sp, out at)) return null;

                    startIndex = 1;
                    break;
                }

                if (ShapeConverter.TryParse(sp, out shape))
                {
                    startIndex = 1;
                    continue;
                }

                if (SizeHintConverter.TryParse(sp, out sizeHint))
                {
                    startIndex = 1;
                    continue;
                }

                if (YogaValueConverter.TryParse(sp, out radius))
                {
                    sizeHint = new ComputedConstant(RadialGradientSizeHint.Custom);
                    startIndex = 1;
                    continue;
                }

                break;
            }

            if (args.Length - startIndex < 2) return null;

            var colors = LinearGradientFunction.GetColorKeys(args, startIndex, false);

            return ComputedCompound.Create(
                new List<IComputedValue> {
                    colors,
                    at ?? new ComputedConstant(YogaValue2.Center),
                    radius ?? new ComputedConstant(YogaValue.Undefined()),
                    sizeHint ?? new ComputedConstant(RadialGradientSizeHint.FarthestCorner),
                    shape ?? new ComputedConstant(RadialGradientShape.Ellipse),
                },
                new List<StyleConverterBase> { new TypedStyleConverterBase<List<BaseGradient.ColorKey>>(), AllConverters.YogaValue2Converter, AllConverters.YogaValueConverter, SizeHintConverter, ShapeConverter },
                (resolved) => {
                    if (
                        resolved[0] is List<BaseGradient.ColorKey> colorsRs &&
                        resolved[1] is YogaValue2 atRs &&
                        resolved[2] is YogaValue radiusRs &&
                        resolved[3] is RadialGradientSizeHint sizeHintRs &&
                        resolved[4] is RadialGradientShape shapeRs
                    )
                        return new RadialGradient(colorsRs, isRepeating, atRs, radiusRs, sizeHintRs, shapeRs);
                    return null;
                });
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;
    }
}
