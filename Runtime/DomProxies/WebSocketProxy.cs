using System;
using Jint.Native;
using ReactUnity.Helpers;

namespace ReactUnity.DomProxies
{
    public class WebSocketProxy : IDisposable
    {
        public WebSocket socket;

        public static int CONNECTING = 0;
        public static int OPEN = 1;
        public static int CLOSING = 2;
        public static int CLOSED = 3;

        public string binaryType = "blob";

        private ReactContext context;

        public JsValue Onmessage { set => onmessage = value; }
        public object onmessage
        {
            set { socket.OnMessage += (rawData) => context.Dispatcher.OnceUpdate(() => new Callback(value)?.Call(new { data = System.Text.Encoding.UTF8.GetString(rawData) })); }
            get => null;
        }

        public JsValue Onclose { set => onclose = value; }
        public object onclose
        {
            set { socket.OnClose += (code, reason) => context.Dispatcher.OnceUpdate(() => new Callback(value)?.Call(new { code, reason })); }
            get => null;
        }

        public JsValue Onopen { set => onopen = value; }
        public object onopen
        {
            set { socket.OnOpen += () => context.Dispatcher.OnceUpdate(() => new Callback(value)?.Call()); }
            get => null;
        }

        public JsValue Onerror { set => onerror = value; }
        public object onerror
        {
            set { socket.OnError += (message) => context.Dispatcher.OnceUpdate(() => new Callback(value)?.Call(new { message })); }
            get => null;
        }

        public WebSocketProxy(ReactContext context, string url)
        {
            socket = WebSocketFactory.CreateInstance(url);
            this.context = context;
            context.Disposables.Add(this);
            socket.Connect();
        }

        public WebSocketProxy(ReactContext context, string url, params string[] protocols) : this(context, url) { }

        public void close(int code = (int) WebSocketCloseCode.Normal, string reason = null)
        {
            socket.Close((WebSocketCloseCode) code, reason);
        }

        public void Dispose()
        {
            if (socket != null && socket.GetState() == WebSocketState.Open)
            {
                socket.Close(WebSocketCloseCode.Normal, "dispose");
                socket = null;
            }
        }
    }
}
