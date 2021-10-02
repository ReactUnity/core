using ReactUnity.Types;

namespace ReactUnity.Styling.Functions
{
    internal class UrlFunction : ICssFunction
    {
        public string Name { get; } = "url";

        public object Call(string name, string[] args)
        {
            if (args.Length < 1) return null;

            var a1 = string.Join(",", args);

            return new Url(a1);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
    }
}
