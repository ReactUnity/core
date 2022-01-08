using ReactUnity.Types;

namespace ReactUnity.Styling.Functions
{
    internal class UrlFunction : ICssFunction
    {
        public string Name { get; } = "url";

        public UrlProtocol DefaultProtocol = UrlProtocol.Contextual;

        public object Call(string name, string[] args)
        {
            if (args.Length < 1) return null;

            var a1 = args[0];
            return new Url(Converters.StringConverter.Normalize(a1), DefaultProtocol);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
    }
}
