using ReactUnity.Converters;
using ReactUnity.Styling.Animations;

namespace ReactUnity.Styling.Functions
{
    internal class StepsFunction : ICssFunction
    {
        static private IStyleConverter StepConverter = new EnumConverter<StepsJumpMode>(true);

        public string Name { get; } = "steps";

        public object Call(string name, string[] args)
        {
            var a1 = AllConverters.IntConverter.Parse(args[0]);
            var a2 = args.Length > 1 ? StepConverter.Parse(args[1]) : StepsJumpMode.End;

            var stepMode = a2 is StepsJumpMode s2 ? s2 : StepsJumpMode.End;

            if (a1 is int f1)
                return TimingFunctions.Steps(f1, stepMode);

            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 2;
    }
}
