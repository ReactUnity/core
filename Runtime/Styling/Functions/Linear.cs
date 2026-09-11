using System.Collections.Generic;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// The linear() easing: a list of output values, each with up to two input percentages. A stop
    /// with no percentage is spaced evenly between its neighbours that have one, the first and
    /// last defaulting to 0% and 100%.
    /// </summary>
    internal class LinearFunction : ICssFunction
    {
        public string Name { get; } = "linear";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var stops = new List<TimingFunctions.LinearStop>(args.Length);

            for (int i = 0; i < args.Length; i++)
            {
                var parts = ParserHelpers.SplitWhitespace(args[i]);
                if (parts.Count == 0 || parts.Count > 3) return null;
                if (!AllConverters.FloatConverter.TryGetConstantValue<float>(parts[0], out var output)) return null;

                if (parts.Count == 1)
                {
                    stops.Add(new TimingFunctions.LinearStop { Output = output, Input = float.NaN });
                    continue;
                }

                // Two percentages are two stops with the same output, which is how a plateau is written.
                for (int j = 1; j < parts.Count; j++)
                {
                    if (!AllConverters.PercentageConverter.TryGetConstantValue<float>(parts[j], out var input)) return null;
                    stops.Add(new TimingFunctions.LinearStop { Output = output, Input = input });
                }
            }

            return TimingFunctions.Linear(stops);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
    }
}
