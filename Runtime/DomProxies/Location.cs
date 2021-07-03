using System;
using System.Linq;

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

        public Location(string href, ReactContext ctx = null)
        {
            this.ctx = ctx;

            var hashSplit = href.Split('#');
            var hashless = hashSplit[0];
            var hash = hashSplit.Length > 1 ? "#" + hashSplit[1] : "";

            var searchSplit = hashless.Split('?');
            var search = searchSplit.Length > 1 ? "?" + searchSplit[1] : "";
            var searchless = searchSplit[0];

            var hrefSplit = searchless.Split(new string[] { "//" }, 2, StringSplitOptions.None);

            var hasProtocol = hrefSplit.Length > 1;
            var protocol = hasProtocol ? hrefSplit.First() : null;

            var hrefWithoutProtocol = string.Join("//", hrefSplit.Skip(hasProtocol ? 1 : 0));
            var hrefWithoutProtocolSplit = hrefWithoutProtocol.Split(new string[] { "/" }, 2, StringSplitOptions.None);


            var hostCandidate = hrefWithoutProtocolSplit.FirstOrDefault();
            var hasHost = hasProtocol || hostCandidate.Contains(":") || (hostCandidate.IndexOf(".") > 0);


            var host = hasHost ? hrefWithoutProtocolSplit.FirstOrDefault() : null;
            var hostSplit = host?.Split(new string[] { ":" }, 2, StringSplitOptions.None);
            var hostName = hostSplit?.First();
            var port = hostSplit != null ? (hostSplit.ElementAtOrDefault(1) ?? "") : null;

            var origin = hasHost ? (protocol + "//" + host) : null;
            var pathName = "/" + string.Join("/", hrefWithoutProtocolSplit.Skip(hasHost ? 1 : 0));

            this.href = href;
            this.protocol = protocol;
            this.hostname = hostName;
            this.origin = origin;
            this.host = host;
            this.port = port;
            this.search = search;
            this.hash = hash;
            this.pathname = pathName;
            this.restart = ctx?.OnRestart;
        }

        public Location(ReactContext ctx) : this(ctx.Script.GetResolvedSourceUrl(), ctx) { }

        public void reload()
        {
            ctx?.Dispatcher.OnceUpdate(restart);
        }
    }
}
