using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// min(), max() and clamp(). Every argument is a calc() expression, so `min(100% - 8px, 40rem)`
    /// works, and `none` leaves a clamp() bound out.
    /// </summary>
    internal class MinMaxFunction : ICssFunction
    {
        public string Name { get; } = "min";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var mode = name == "clamp" ? ComputedMinMax.Mode.Clamp : name == "max" ? ComputedMinMax.Mode.Max : ComputedMinMax.Mode.Min;
            var values = new List<IComputedValue>(args.Length);

            for (int i = 0; i < args.Length; i++)
            {
                var arg = args[i].Trim();

                if (mode == ComputedMinMax.Mode.Clamp && i != 1 && arg == "none")
                {
                    values.Add(null);
                    continue;
                }

                if (!(CalcFunction.Parse(arg, converter) is IComputedValue parsed)) return null;
                values.Add(parsed);
            }

            return ComputedMinMax.Create(values, mode);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => name == "clamp" ? count == 3 : count >= 1;
    }
}
