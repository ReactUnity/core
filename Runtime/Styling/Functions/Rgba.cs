using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class RgbaFunction : ICssFunction
    {
        public string Name { get; } = "rgba";

        public object Call(string name, string[] args, string argsCombined)
        {
            if (args.Length == 1)
            {
                if (ParserHelpers.ParseSpaceSeparatedColor(args[0], ColorCallback, false, out var rs)) return rs;
            }
            else if (args.Length == 3 || args.Length == 4)
            {
                if (ParserHelpers.ParseCommaSeparatedColor(args, ColorCallback, false, out var rs)) return rs;
            }

            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;

        private object ColorCallback(float r, float g, float b, float a) => new UnityEngine.Color(r / 255f, g / 255f, b / 255f, a);
    }

}
