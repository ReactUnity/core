using System;

namespace ReactUnity.Scripting.DomProxies
{
    public class WebSocketProxy : IDisposable
    {
        public WebSocket socket;

        public static int CONNECTING = 0;
        public static int OPEN = 1;
        public static int CLOSING = 2;
        public static int CLOSED = 3;

        public string url { get; }
        public int readyState => (int) socket.GetState();

        public string binaryType = "blob";

        public ReactContext context { get; private set; }

        public object onopen
        {
            get => eventTarget.GetEventListener("open");
            set => eventTarget.SetEventListener("open", value);
        }

        public object onmessage
        {
            get => eventTarget.GetEventListener("message");
            set => eventTarget.SetEventListener("message", value);
        }

        public object onerror
        {
            get => eventTarget.GetEventListener("error");
            set => eventTarget.SetEventListener("error", value);
        }

        public object onclose
        {
            get => eventTarget.GetEventListener("close");
            set => eventTarget.SetEventListener("close", value);
        }

        public bool IsDisposed => context == null || context.IsDisposed;

        private EventTarget eventTarget = new EventTarget();

        public WebSocketProxy(ReactContext context, string url) : this(context, url, new string[0]) { }

        public WebSocketProxy(ReactContext context, string url, string protocol) : this(context, url, string.IsNullOrEmpty(protocol) ? new string[0] : protocol.Split(',')) { }

        public WebSocketProxy(ReactContext context, string url, params string[] protocols)
        {
            this.url = ResolveUrl(context, url);
            this.context = context;
            socket = WebSocketFactory.CreateInstance(this.url, protocols);
            context.Disposables.Add(Dispose);

            socket.OnOpen += () => {
                if (IsDisposed) return;

                context.Dispatcher.OnceUpdate(() => {
                    eventTarget.DispatchEvent("open", context);
                });
            };

            socket.OnMessage += (rawData) => {
                if (IsDisposed) return;

                var arg = new { data = System.Text.Encoding.UTF8.GetString(rawData).TrimEnd('\0') };
                context.Dispatcher.OnceUpdate(() =>
                    eventTarget.DispatchEvent("message", context, EventPriority.Unknown, arg));
            };

            socket.OnError += (message) => {
                if (IsDisposed) return;

                var arg = new { message };
                context.Dispatcher.OnceUpdate(() =>
                    eventTarget.DispatchEvent("error", context, EventPriority.Unknown, arg));
            };

            socket.OnClose += (code, reason) => {
                if (IsDisposed) return;

                var arg = new { code = (int) code, reason };
                context.Dispatcher.OnceUpdate(() =>
                    eventTarget.DispatchEvent("close", context, EventPriority.Unknown, arg));
            };

            socket.Connect();
        }

        /// The URL half of `new WebSocket(url)`, which WebSocketSharp skips: resolve against the
        /// page url and map http(s) onto ws(s). Browsers accept `/hmr` and `http://host/hmr`;
        /// WebSocketSharp demands an absolute ws:// url and dev-server clients send both forms.
        internal static string ResolveUrl(ReactContext context, string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                throw new WebSocketInvalidArgumentException("The WebSocket url is empty.");

            var baseUrl = context?.Location?.href;
            var resolved = string.IsNullOrWhiteSpace(baseUrl) ? new URL(url) : new URL(url, baseUrl);
            var against = string.IsNullOrWhiteSpace(baseUrl)
                ? " There is no page url to complete it from either."
                : $" It was resolved against the page url '{baseUrl}'.";

            var scheme = resolved.protocol;
            if (scheme == "http:") scheme = "ws:";
            else if (scheme == "https:") scheme = "wss:";

            if (scheme != "ws:" && scheme != "wss:")
                throw new WebSocketInvalidArgumentException(
                    $"The WebSocket url '{url}' resolves to the scheme '{(string.IsNullOrEmpty(scheme) ? "(none)" : scheme)}'." +
                    $" Only ws, wss, http and https can be used.{against}");

            if (string.IsNullOrEmpty(resolved.host))
                throw new WebSocketInvalidArgumentException($"The WebSocket url '{url}' has no host.{against}");

            // A SyntaxError in the browser too.
            if (!string.IsNullOrEmpty(resolved.hash))
                throw new WebSocketInvalidArgumentException($"The WebSocket url '{url}' has a fragment, which is not allowed.");

            return scheme + "//" + resolved.host + resolved.pathname + resolved.search;
        }

        public void close(int? code = null, string reason = null)
        {
            if (socket.GetState() == WebSocketState.Closing || socket.GetState() == WebSocketState.Closed) return;
            socket.Close((WebSocketCloseCode) (code ?? ((int) WebSocketCloseCode.Normal)), reason);
        }

        public void send(object data)
        {
            if (data == null) throw new ArgumentNullException("data");
            else if (data is byte[] bytes) socket.Send(bytes);
            else if (data is string str) socket.Send(str);
            else UnityEngine.Debug.LogWarning($"Unknown data type in WebSocketProxy ({data.GetType()})");
        }

        public void Dispose()
        {
            if (socket != null && socket.GetState() == WebSocketState.Open)
            {
                socket.Close(WebSocketCloseCode.Normal, "dispose");
                socket = null;
            }
            context = null;
        }

        public void addEventListener(string eventType, object callback, object options = null)
        {
            // TODO: handle options
            eventTarget.AddEventListener(eventType, callback);
        }

        public void removeEventListener(string eventType, object callback, object options = null)
        {
            eventTarget.RemoveEventListener(eventType, callback);
        }
    }
}
