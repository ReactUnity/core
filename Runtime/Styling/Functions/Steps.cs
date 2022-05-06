
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class StepsFunction : ICssFunction
    {
        static private StyleConverterBase StepConverter = new EnumConverter<StepsJumpMode>(true);

        public string Name { get; } = "steps";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (ComputedCompound.Create(out var result,
                args.OfType<object>().ToList(),
                new List<StyleConverterBase> { AllConverters.IntConverter, StepConverter },
                (resolved) => {

                    if (resolved[0] is int f1)
                    {
                        if (resolved.Count > 1)
                        {
                            if (resolved[1] is StepsJumpMode sj)
                                return TimingFunctions.Steps(f1, sj);
                        }
                        else return TimingFunctions.Steps(f1, StepsJumpMode.End);
                    }
                    return null;
                })) return result;

            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 2;
    }
}
