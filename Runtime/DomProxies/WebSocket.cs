#if UNITY_EDITOR

using ReactUnity.Interop;

namespace ReactUnity.DomProxies
{
    public class WebSocketProxy : WebSocketSharp.WebSocket
    {
        public static int CONNECTING = 0;
        public static int OPEN = 1;
        public static int CLOSING = 2;
        public static int CLOSED = 3;

        public string binaryType = "blob";

        public Callback onmessage
        {
            set { OnError += (sender, e) => { if (value != null) value.Call(e); }; }
            get => null;
        }

        public Callback onclose
        {
            set { OnError += (sender, e) => { if (value != null) value.Call(e); }; }
            get => null;
        }

        public Callback onopen
        {
            set { OnError += (sender, e) => { if (value != null) value.Call(e); }; }
            get => null;
        }

        public Callback onerror
        {
            set { OnError += (sender, e) => { if (value != null) value.Call(e); }; }
            get => null;
        }

        public WebSocketProxy(string url) : base(url, new string[] { "ws" })
        {
            ConnectAsync();
        }

        public WebSocketProxy(string url, params string[] protocols) : base(url, protocols)
        {
            ConnectAsync();
        }

        public void close(WebSocketSharp.CloseStatusCode code = WebSocketSharp.CloseStatusCode.Normal, string reason = null)
        {
            CloseAsync(code, reason);
        }
    }
}

#endif
