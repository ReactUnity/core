using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class CubicBezierFunction : ICssFunction
    {
        public string Name { get; } = "cubic-bezier";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (ComputedList.Create(out var result,
                args.OfType<object>().ToList(),
                AllConverters.FloatConverter,
                (resolved) => {
                    if (resolved[0] is float f1 &&
                        resolved[1] is float f2 &&
                        resolved[2] is float f3 &&
                        resolved[3] is float f4)
                        return TimingFunctions.CubicBezier.Create(f1, f2, f3, f4);

                    return null;
                })) return result;

            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 4;
    }
}
