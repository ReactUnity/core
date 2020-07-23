using Esprima;
using Jint;
using Jint.Native;
using Jint.Native.Function;
using Jint.Native.Object;
using ReactUnity.Interop;
using ReactUnity.Schedulers;
using ReactUnity.Styling;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity
{

    public class ReactUnity : MonoBehaviour
    {
        private Engine engine;
        private UnityUGUIContext unityContext;
        private UnityScheduler scheduler;

        public RectTransform DocumentRoot;
        public StringObjectDictionary NamedAssets = new StringObjectDictionary();
        public ReactScript Script;

        public List<TextAsset> PreloadScripts = new List<TextAsset>();

        private IDisposable ScriptWatchDisposable;

        void OnEnable()
        {
            MainThreadDispatcher.Initialize();
            Restart();
        }

        void OnDisable()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
        }

        void Clean()
        {
            foreach (Transform children in DocumentRoot)
            {
                DestroyImmediate(children.gameObject);
            }

            scheduler?.clearAllTimeouts();
        }

        [ContextMenu("Restart")]
        public void Restart()
        {
            int debounce = -1;
            ScriptWatchDisposable = Script.GetScript((script) =>
            {
                if (debounce >= 0) MainThreadDispatcher.StopDeferred(debounce);
                debounce = MainThreadDispatcher.Timeout(() => RunScript(script), 0.5f);
            }, out var result);
            RunScript(result);
        }

        void RunScript(string script)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Clean();

            if (engine == null) CreateEngine();
            unityContext = new UnityUGUIContext(DocumentRoot, engine, NamedAssets);
            engine.SetValue("Unity", typeof(ReactUnityAPI));
            engine.SetValue("RootContainer", unityContext.Host);
            engine.SetValue("NamedAssets", NamedAssets);
            try
            {
                PreloadScripts.ForEach(x => engine.Execute(x.text));
                engine.Execute(script);
            }
            catch (ParserException ex)
            {
                Debug.LogError($"Parser exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
            }
            catch (Exception ex)
            {
                var lastNode = engine.GetLastSyntaxNode();
                Debug.LogError($"Runtime exception in {lastNode.Location.Start.Line}:{lastNode.Location.Start.Column} - {lastNode.Location.End.Line}:{lastNode.Location.End.Column}");
                Debug.LogException(ex);
            }
        }

        public void ExecuteScript(string script)
        {
            engine.Execute(script);
        }

        void CreateEngine()
        {
            engine = new Engine(e => e.CatchClrExceptions(ex =>
            {
                Debug.LogError(ex);
                return false;
            }));
            engine.ClrTypeConverter = new NullableTypeConverter(engine);

            engine
                .SetValue("log", new Func<object, object>((x) => { Debug.Log(x); return x; }))
                .Execute("jlog = (x, replacer, space) => { log(JSON.stringify(x, replacer, space)); return x; };")
                .Execute("__dirname = '';")
                .Execute("WeakMap = Map;")
                .Execute("global = window = this; module = { exports: {} };")
                .Execute("setTimeout = setInterval = clearTimeout = clearInterval = null;")
                .Execute("process = { env: { NODE_ENV: 'production' }, argv: [], on: () => {} };");

            CreateLocation(engine);
            CreateConsole(engine);
            CreateLocalStorage(engine);
            CreateScheduler(engine);
            engine.SetValue("YogaValueNative", typeof(Facebook.Yoga.YogaValue));
            engine.SetValue("ColorNative", typeof(Color));
            engine.SetValue("ShadowDefinitionNative", typeof(ShadowDefinition));

            // Load polyfills
            engine.Execute(Resources.Load<TextAsset>("ReactUnity/polyfills/promise").text);
        }

        ObjectInstance CreateConsole(Engine engine)
        {
            var console = new ObjectInstance(engine);

            var methods = new Dictionary<string, Action<object>>
        {
            { "debug", Debug.Log },
            { "log", Debug.Log },
            { "info", Debug.Log },
            { "warn", Debug.LogWarning },
            { "error", x => {

                var lastNode = engine.GetLastSyntaxNode();
                Debug.LogError($"Runtime exception in {lastNode.Location.Start.Line}:{lastNode.Location.Start.Column} - {lastNode.Location.End.Line}:{lastNode.Location.End.Column}");
                Debug.LogError(x);
            } },
        };
            engine.SetValue("console", console);

            foreach (var item in methods)
            {
                console.FastAddProperty(item.Key, JsValue.FromObject(engine,
                    new Func<object, object[], object>((x, args) => { item.Value(x + "\n" + string.Join(",", args)); return x; })), true, true, false);

                engine.Execute($@"(function() {{
var old = console.{item.Key};
console.{item.Key} = (x, ...args) => old(x, args);
        }})()");
            }

            console.FastAddProperty("assert", JsValue.FromObject(engine, new Action<bool>((x) => { Debug.Assert(x); })), false, true, false);
            console.FastAddProperty("clear", JsValue.FromObject(engine, new Action(() => { Debug.ClearDeveloperConsole(); })), false, true, false);

            return console;
        }

        void CreateScheduler(Engine engine)
        {
            scheduler = new UnityScheduler();
            engine.SetValue("UnityScheduler", scheduler);
            engine.SetValue("setTimeout", new Func<JsValue, int, int>(scheduler.setTimeout));
            engine.SetValue("setInterval", new Func<JsValue, int, int>(scheduler.setInterval));
            engine.SetValue("clearTimeout", new Action<int>(scheduler.clearTimeout));
            engine.SetValue("clearInterval", new Action<int>(scheduler.clearInterval));
            engine.SetValue("requestAnimationFrame", new Func<JsValue, int>(scheduler.requestAnimationFrame));
            engine.SetValue("cancelAnimationFrame", new Action<int>(scheduler.cancelAnimationFrame));
        }

        void CreateLocalStorage(Engine engine)
        {
            var storage = new ObjectInstance(engine);
            engine.SetValue("localStorage", storage);


            storage.FastAddProperty("setItem",
                JsValue.FromObject(engine, new Action<string, string>(PlayerPrefs.SetString)),
                false, true, false);
            storage.FastAddProperty("getItem",
                JsValue.FromObject(engine, new Func<string, string>(x => PlayerPrefs.GetString(x, ""))),
                false, true, false);
        }

        void CreateLocation(Engine engine)
        {
            var location = new ObjectInstance(engine);
            engine.SetValue("location", location);

            var href = Script.SourceLocation;
            var hrefSplit = href.Split(new string[] { "//" }, 2, StringSplitOptions.None);

            var protocol = hrefSplit.Length > 1 ? hrefSplit.First() : null;

            var hrefWithoutProtocol = hrefSplit.Length > 1 ? string.Join("", hrefSplit.Skip(1)) : href;
            var hrefWithoutProtocolSplit = hrefWithoutProtocol.Split(new string[] { "/" }, 2, StringSplitOptions.None);

            var host = hrefWithoutProtocolSplit.FirstOrDefault();
            var hostSplit = host.Split(new string[] { ":" }, 2, StringSplitOptions.None);
            var hostName = hostSplit.First();
            var port = hostSplit.ElementAtOrDefault(1);

            var origin = protocol + "//" + host;
            var pathName = string.Join("", hrefWithoutProtocolSplit.Skip(1));

            location.FastAddProperty("reload", JsValue.FromObject(engine, new Action(() => MainThreadDispatcher.OnUpdate(Restart))), false, true, false);
            location.FastAddProperty("href", href, false, true, false);
            location.FastAddProperty("protocol", protocol, false, true, false);
            location.FastAddProperty("hostname", hostName, false, true, false);
            location.FastAddProperty("origin", origin, false, true, false);
            location.FastAddProperty("host", host, false, true, false);
            location.FastAddProperty("port", port, false, true, false);
            location.FastAddProperty("pathname", pathName, false, true, false);

#if UNITY_EDITOR
            engine.SetValue("WebSocket", typeof(WebSocketProxy));
            engine.SetValue("XMLHttpRequest", typeof(XMLHttpRequest));
            engine.SetValue("document", new DocumentProxy(ExecuteScript));
            XMLHttpRequest.origin = origin;
#endif

        }
    }

#if UNITY_EDITOR

    public class DocumentProxy
    {
        public class HeadProxy
        {
            public Action<string> Execute;

            public void appendChild(ScriptProxy script)
            {
                var src = new ReactScript();
                src.ScriptSource = ScriptSource.Url;
                src.SourcePath = XMLHttpRequest.origin + script.src;

                src.GetScript((sc) =>
                {
                    MainThreadDispatcher.OnUpdate(() => Execute(sc));
                }, out var result, false, true);
            }
        }

        public HeadProxy head;
        public DocumentProxy(Action<string> execute)
        {
            head = new HeadProxy();
            head.Execute = execute;
        }

        public ScriptProxy createElement(string type)
        {
            if (type == "script") return new ScriptProxy();
            else return null;
        }
    }

    public class ScriptProxy
    {
        public string src = null;
        public string charset = null;
        public string crossOrigin = null;
    }

    public class WebSocketProxy : WebSocketSharp.WebSocket
    {
        public Action<WebSocketSharp.MessageEventArgs> onmessage
        {
            set { OnMessage += (sender, e) => value?.Invoke(e); }
            get => null;
        }

        public Action<WebSocketSharp.CloseEventArgs> onclose
        {
            set { OnClose += (sender, e) => value?.Invoke(e); }
            get => null;
        }

        public Action<EventArgs> onopen
        {
            set { OnOpen += (sender, e) => value?.Invoke(e); }
            get => null;
        }

        public Action<WebSocketSharp.ErrorEventArgs> onerror
        {
            set { OnError += (sender, e) => value?.Invoke(e); }
            get => null;
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


    public class XMLHttpRequest
    {
        static public string origin;

        public XMLHttpRequest()
        {
            _reset();
        }


        System.Collections.Hashtable _open;

        public void open(string method, string url, bool async)
        {
            _open = new System.Collections.Hashtable();
            _open["method"] = method;
            _open["url"] = url;
            _open["async"] = async;

        }

        public Action onreadystatechange { get; set; }

        public bool withCredentials
        {
            get; set;
        }

        public int timeout
        {
            get; set;
        }



        public static string[] dispatches = new string[]
        {
            "LoadStart",
            "Progress",
            "UploadProgress",
            "Load",
            "Error"
        };

        public static System.Threading.ManualResetEvent allDone = new System.Threading.ManualResetEvent(false);








        private Dictionary<string, string> _options;

        private Uri _url;

        private bool _multipart = false;
        private byte[] _multipartHeader;
        private byte[] _multipartFooter;

        private Dictionary<string, string> _headers;


        private Dictionary<string, List<string>> _postData;


        private int _status;

        private string _statusText;

        private string _responseHeaders = "";

        private System.Net.HttpWebRequest _req;


        private static System.Net.CookieContainer _cookieContainer = new System.Net.CookieContainer();





        public void setRequestHeader(object name, object value)
        {
            _headers.Add((string)name, (string)value);
        }


        public void append(object name, object value)
        {
            _multipart = true;

            List<string> postList;
            if (!_postData.TryGetValue((string)name, out postList))
            {
                postList = new List<string>();
            }
            postList.Add((string)value);

            _postData.Remove((string)name);
            _postData.Add((string)name, postList);
        }




        public int status
        {
            get { return _status; }
        }


        public string getStatusText()
        {
            return _statusText;
        }

        public string getAllResponseHeaders()
        {
            return _responseHeaders;
        }





        public void abort()
        {
            if (_req != null)
            {
                _req.Abort();
                _req = null;
            }
        }

        public void send(object o)
        {
            var args = o as ObjectInstance;
            _options = _extractOptions(args);
            _url = new Uri(origin + _options["url"]);


            if (_options["transport"] == "browser")
            {
                _req = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(_url);
            }
            else
            {
                _req = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(_url);
                _req.CookieContainer = _cookieContainer;
                // disable buffering (this only works for ClientHttp version)
                //_req.AllowWriteStreamBuffering = false; // causes silent crash on Mac OS X 10.8.x
            }

            _req.Method = _options["method"];

            // add custom headers
            if (_headers.Count != 0)
            {
                foreach (string key in _headers.Keys)
                {
                    if (_headers[key] == null)
                        continue;

                    switch (key.ToLower())
                    {
                        // in silverlight 3, these are set by the web browser that hosts the Silverlight application.
                        // http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest%28v=vs.95%29.aspx
                        case "connection":
                        case "content-length":
                        case "expect":
                        case "if-modified-since":
                        case "referer":
                        case "transfer-encoding":
                        case "user-agent":
                            break;

                        // in silverlight this isn't supported, can not find reference to why not
                        case "range":
                            break;

                        // in .NET Framework 3.5 and below, these are set by the system.
                        // http://msdn.microsoft.com/en-us/library/system.net.httpwebrequest%28v=VS.90%29.aspx
                        case "date":
                        case "host":
                            break;

                        case "accept":
                            _req.Accept = (string)_headers[key];
                            break;

                        case "content-type":
                            _req.ContentType = _headers[key];
                            break;
                        default:
                            _req.Headers[key] = (string)_headers[key];
                            break;
                    }
                }
            }

            _req.ContentLength = 0;


            {
                _req.ContentType = _options["mimeType"];
            }



            if (_req.ContentLength == 0)
            {
                _req.BeginGetResponse(new AsyncCallback(_responseCallback), _req);
            }
            else
            {
                _req.BeginGetRequestStream(new AsyncCallback(_responseCallback), _req);
            }
        }



        private void _responseCallback(IAsyncResult asynchronousResult)
        {

            var req = (System.Net.HttpWebRequest)asynchronousResult.AsyncState;


            using (var response = (System.Net.HttpWebResponse)req.EndGetResponse(asynchronousResult))
            {
                _status = (int)response.StatusCode; // 4xx-5xx can throw WebException, we handle it below
                _statusText = response.StatusDescription;

                if (response.SupportsHeaders && response.Headers is System.Net.WebHeaderCollection)
                {
                    foreach (string header in response.Headers.AllKeys)
                    {
                        _responseHeaders += header + ": " + response.Headers[header] + "\r\n";
                    }
                }

                using (var responseStream = response.GetResponseStream())
                using (var sr = new System.IO.StreamReader(responseStream))
                {
                    this.responseText = sr.ReadToEnd();
                }
            }

            onreadystatechange?.Invoke();
        }


        public int readyState
        {
            get { return 4; }
        }
        public string DONE
        {
            get { return "complete"; }
        }

        public string responseText { get; set; }

        private byte[] _stringToByteArray(string str)
        {
            System.Text.UTF8Encoding encoding = new System.Text.UTF8Encoding();
            return encoding.GetBytes(str);
        }


        private Dictionary<string, string> _extractOptions(ObjectInstance args)
        {
            Dictionary<string, string> defaults = new Dictionary<string, string>() {
                { "url", null },
                { "user", null },
                { "password", null },
                { "method", "POST" },
                { "mimeType", "" },
                { "encoding", "UTF-8" },
                { "responseType", "" },
                { "transport", "browser" }
            };

            Dictionary<string, string> options = new Dictionary<string, string>();
            if (_open != null)
            {
                foreach (string key in _open.Keys)
                {
                    options[key] = _open[key] as string;
                }
            }
            if (args != null)
            {
                foreach (string key in defaults.Keys)
                {
                    options.Add(key, args.Get(key).AsString());
                }
            }
            string value;
            foreach (var item in defaults)
            {
                if (!options.TryGetValue(item.Key, out value))
                {
                    options.Add(item.Key, item.Value);
                }
            }

            // make sure this one is uppercase
            options["method"] = options["method"].ToUpper();

            return options;
        }


        private void _reset()
        {
            _status = 0;
            _multipart = false;
            _multipartHeader = _multipartFooter = null;
            _statusText = "";
            _options = new Dictionary<string, string>();
            _headers = new Dictionary<string, string>();
            _postData = new Dictionary<string, List<string>>();


        }


    }
#endif
}
