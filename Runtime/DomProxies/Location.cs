using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace ReactUnity.DomProxies
{
    public class Location
    {
        public string href { get; }
        public string protocol { get; }
        public string hostname { get; }
        public string origin { get; }
        public string host { get; }
        public string port { get; }
        public string search { get; }
        public string hash { get; }
        public string pathname { get; }
        private Action restart { get; }

        ReactContext ctx;

        public Location(ReactContext ctx)
        {
            this.ctx = ctx;
            var href = ctx.Script.SourceLocation;

#if UNITY_WEBGL && !UNITY_EDITOR
            var abs = UnityEngine.Application.absoluteURL;
            if (!href.StartsWith("http") && abs != null)
            {
                var parsed = new Regex(@"^(.*:)//([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$").Match(abs);

                var parsedProto = parsed.Groups[1].Value;
                var parsedHost = parsed.Groups[2].Value;
                var parsedPort = parsed.Groups[3].Value;

                href = parsedProto + "//" + parsedHost + parsedPort + "/" + new Regex("^/").Replace(href, "");
            }
#endif

            var hashSplit = href.Split('#');
            var hashless = hashSplit[0];
            var hash = hashSplit.Length > 1 ? "#" + hashSplit[1] : "";

            var searchSplit = hashless.Split('?');
            var searchless = searchSplit[0];
            var search = searchSplit.Length > 1 ? "?" + searchSplit[1] : "";

            var hrefSplit = href.Split(new string[] { "//" }, 2, StringSplitOptions.None);

            var protocol = hrefSplit.Length > 1 ? hrefSplit.First() : null;

            var hrefWithoutProtocol = hrefSplit.Length > 1 ? string.Join("", hrefSplit.Skip(1)) : href;
            var hrefWithoutProtocolSplit = hrefWithoutProtocol.Split(new string[] { "/" }, 2, StringSplitOptions.None);

            var host = hrefWithoutProtocolSplit.FirstOrDefault();
            var hostSplit = host.Split(new string[] { ":" }, 2, StringSplitOptions.None);
            var hostName = hostSplit.First();
            var port = hostSplit.ElementAtOrDefault(1) ?? "";

            var origin = protocol + "//" + host;
            var pathName = string.Join("", hrefWithoutProtocolSplit.Skip(1));

            this.href = href;
            this.protocol = protocol;
            this.hostname = hostName;
            this.origin = origin;
            this.host = host;
            this.port = port;
            this.search = search;
            this.hash = hash;
            this.pathname = pathName;
            this.restart = ctx.OnRestart;
        }

        public void reload()
        {
            ctx.Dispatcher.OnceUpdate(restart);
        }
    }
}
