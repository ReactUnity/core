using ReactUnity.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class RgbaFunction : ICssFunction
    {
        public string Name { get; } = "rgba";

        public object Call(string name, string[] args, string argsCombined)
        {
            float[] vals;
            if (args.Length == 1) vals = ParserHelpers.ParseSpaceSeparatedColor(args[0]);
            else if (args.Length == 3 || args.Length == 4) vals = ParserHelpers.ParseCommaSeparatedColor(args);
            else return null;

            if (vals == null) return null;
            return new UnityEngine.Color(vals[0] / 255f, vals[1] / 255f, vals[2] / 255f, vals.Length > 3 ? vals[3] : 1);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }

}
