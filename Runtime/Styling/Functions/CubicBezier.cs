using ReactUnity.Animations;
using ReactUnity.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class CubicBezierFunction : ICssFunction
    {
        public string Name { get; } = "cubic-bezier";

        public object Call(string name, string[] args)
        {
            var a1 = AllConverters.FloatConverter.Parse(args[0]);
            var a2 = AllConverters.FloatConverter.Parse(args[1]);
            var a3 = AllConverters.FloatConverter.Parse(args[2]);
            var a4 = AllConverters.FloatConverter.Parse(args[3]);

            if (a1 is float f1 &&
                a2 is float f2 &&
                a3 is float f3 &&
                a4 is float f4)
                return TimingFunctions.CubicBezier.Create(f1, f2, f3, f4);

            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 4;
    }
}
