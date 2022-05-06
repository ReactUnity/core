using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Functions
{
    internal class UrlFunction : ICssFunction
    {
        public string Name { get; } = "url";

        public UrlProtocol DefaultProtocol = UrlProtocol.Contextual;

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (args.Length < 1) return null;
            return new Url(Converters.StringConverter.Normalize(argsCombined), DefaultProtocol);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
    }
}
