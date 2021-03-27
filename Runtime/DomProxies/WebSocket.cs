#if UNITY_EDITOR || REACT_DEV_SERVER_API

using Jint.Native;
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

        private ReactContext context;

        public JsValue Onmessage { set => onmessage = value; }
        public object onmessage
        {
            set { OnMessage += (sender, e) => context.Dispatcher.OnUpdate(() => new Callback(value)?.Call(e)); }
            get => null;
        }

        public JsValue Onclose { set => onclose = value; }
        public object onclose
        {
            set { OnClose += (sender, e) => context.Dispatcher.OnUpdate(() => new Callback(value)?.Call(e)); }
            get => null;
        }

        public JsValue Onopen { set => onopen = value; }
        public object onopen
        {
            set { OnOpen += (sender, e) => context.Dispatcher.OnUpdate(() => new Callback(value)?.Call(e)); }
            get => null;
        }

        public JsValue Onerror { set => onerror = value; }
        public object onerror
        {
            set { OnError += (sender, e) => context.Dispatcher.OnUpdate(() => new Callback(value)?.Call(e)); }
            get => null;
        }

        public WebSocketProxy(ReactContext context, string url) : base(url, "ws")
        {
            this.context = context;
            context.Disposables.Add(this);
            ConnectAsync();
        }

        public WebSocketProxy(ReactContext context, string url, params string[] protocols) : base(url, protocols)
        {
            this.context = context;
            context.Disposables.Add(this);
            ConnectAsync();
        }

        public void close(int code = (int) WebSocketSharp.CloseStatusCode.Normal, string reason = null)
        {
            CloseAsync((WebSocketSharp.CloseStatusCode) code, reason);
        }
    }
}

#endif
