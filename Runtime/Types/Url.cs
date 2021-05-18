using ReactUnity.Styling;

namespace ReactUnity.Types
{
    public class Url
    {
        public UrlProtocol Protocol { get; }
        public string FullUrl { get; }
        public string NormalizedUrl { get; }

        public Url(string fullUrl)
        {
            fullUrl = Converters.StringConverter.Convert(fullUrl) as string;

            FullUrl = fullUrl;

            if (string.IsNullOrWhiteSpace(fullUrl))
            {
                Protocol = UrlProtocol.None;
                NormalizedUrl = "";
                return;
            }

            var splits = fullUrl.Split(new char[] { ':' }, 2);
            if (splits.Length == 1)
            {
                Protocol = UrlProtocol.Contextual;
                NormalizedUrl = fullUrl;
                return;
            }

            var protocol = splits[0];
            NormalizedUrl = splits[1];

            if (protocol == "ctx" || protocol == "context")
            {
                Protocol = UrlProtocol.Contextual;
            }
            else if (protocol == "http" || protocol == "https")
            {
                Protocol = UrlProtocol.Web;
                NormalizedUrl = fullUrl;
            }
            else if (protocol == "res" || protocol == "resource" || protocol == "resources")
            {
                Protocol = UrlProtocol.Resource;
            }
            else if (protocol == "file")
            {
                Protocol = UrlProtocol.File;
            }
            else if (protocol == "data")
            {
                Protocol = UrlProtocol.Data;
            }
            else if (protocol == "global" || protocol == "globals")
            {
                Protocol = UrlProtocol.Global;
            }
            else
            {
                Protocol = UrlProtocol.Contextual;
                NormalizedUrl = fullUrl;
            }
        }
    }

    public enum UrlProtocol
    {
        None = 0,
        Contextual = 1,
        Web = 2,
        Resource = 3,
        File = 4,
        Data = 5,
        Global = 6,
    }

}
