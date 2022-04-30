using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ExCSS;
using Newtonsoft.Json.Linq;
using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Html;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Scripting.DomProxies;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity
{
    public abstract class ReactContext : IDisposable
    {
        public class Options
        {
            public SerializableDictionary Globals;
            public ScriptSource Source;
            public ITimer Timer;
            public IMediaProvider MediaProvider;
            public Action OnRestart;
            public JavascriptEngineType EngineType;
            public bool Debug;
            public bool AwaitDebugger;
            public Action BeforeStart;
            public Action AfterStart;

            public virtual bool CalculatesLayout { get; }
        }

        protected static Regex ExtensionRegex = new Regex(@"\.\w+$");
        protected static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public bool CalculatesLayout { get; }
        public IHostComponent Host { get; protected set; }
        public HashSet<IReactComponent> DetachedRoots { get; protected set; } = new HashSet<IReactComponent>();
        public GlobalRecord Globals { get; private set; }
        public bool IsDisposed { get; private set; }

        public Options options { get; }
        public ScriptSource Source { get; }
        public ITimer Timer { get; }
        public IDispatcher Dispatcher { get; }
        public virtual Dictionary<string, Type> StateHandlers { get; }
        public Location Location { get; }
        public LocalStorage LocalStorage { get; }
        public IMediaProvider MediaProvider { get; }
        public Action OnRestart { get; }
        public StylesheetParser StyleParser { get; }
        public StyleContext Style { get; private set; }
        public ScriptContext Script { get; }
        public HtmlContext Html { get; }
        public virtual CursorSet CursorSet { get; }
        public CursorAPI CursorAPI { get; }
        public List<Action> Disposables { get; } = new List<Action>();

        protected Dictionary<int, WeakReference<IReactComponent>> Refs = new Dictionary<int, WeakReference<IReactComponent>>();
        internal Callback CommandsCallback;
        internal Callback FireEventByRefCallback;
        internal Callback GetObjectCallback;
        internal Callback GetEventAsObjectCallback;

        public ReactContext(Options options)
        {
            this.options = options;
            Source = options.Source;
            Timer = options.Timer;
            Dispatcher = CreateDispatcher();
            Globals = GlobalRecord.BindSerializableDictionary(options.Globals, Dispatcher, false);
            OnRestart = options.OnRestart ?? (() => { });
            CalculatesLayout = options.CalculatesLayout;
            Location = new Location(this);
            MediaProvider = options.MediaProvider;
            CursorAPI = new CursorAPI(this);
            LocalStorage = new LocalStorage();

            StyleParser = new StylesheetParser(true, true, true, true, true, false, true);
            Style = CreateStyleContext();
            Script = new ScriptContext(this, options.EngineType, options.Debug, options.AwaitDebugger);

            Html = new HtmlContext(this);

            var updateVisitor = new UpdateVisitor();
            Dispatcher.OnEveryUpdate(() => Host?.Accept(updateVisitor));
            if (CalculatesLayout) Dispatcher.OnEveryLateUpdate(() => {
                Host?.Layout.CalculateLayout();
                foreach (var dr in DetachedRoots) dr.Layout.CalculateLayout();
            });
        }

        protected virtual StyleContext CreateStyleContext() => new StyleContext(this);

        public virtual StyleSheet InsertStyle(string style) => InsertStyle(style, 0);

        public virtual StyleSheet InsertStyle(string style, int importanceOffset)
        {
            var sheet = new StyleSheet(Style, style, importanceOffset);
            return InsertStyle(sheet);
        }

        public virtual StyleSheet InsertStyle(StyleSheet sheet)
        {
            Style.Insert(sheet);
            return sheet;
        }

        public virtual void RemoveStyle(StyleSheet sheet)
        {
            Style.Remove(sheet);
        }

        public virtual string ResolvePath(string path)
        {
            var source = Source.GetResolvedSourceUrl();
            var type = Source.EffectiveScriptSource;

            if (type == ScriptSourceType.Url)
            {
                var baseUrl = new Uri(source);
                if (Uri.TryCreate(baseUrl, path, out var res)) return res.AbsoluteUri;
            }
            else if (type == ScriptSourceType.File || type == ScriptSourceType.Resource)
            {
                var lastSlash = source.LastIndexOfAny(new[] { '/', '\\' });
                var parent = source.Substring(0, lastSlash);

                var res = parent + (path.StartsWith("/") ? path : "/" + path);
                if (type == ScriptSourceType.Resource) return GetResourceUrl(res);
                return res;
            }
            else
            {
                // TODO: write path rewriting logic
            }

            return null;
        }

        public virtual ScriptSource CreateStaticScript(string path)
        {
            var src = new ScriptSource(Source);
            src.SourcePath = ResolvePath(path);
            src.Type = Source.EffectiveScriptSource;
            src.UseDevServer = Source.IsDevServer;
            return src;
        }

        private string GetResourceUrl(string fullUrl)
        {
            var splits = ResourcesRegex.Split(fullUrl);
            var url = splits[splits.Length - 1];

            return ExtensionRegex.Replace(url, "");
        }

        public abstract ITextComponent CreateText(string text);
        public abstract IReactComponent CreateDefaultComponent(string tag, string text);
        public abstract IReactComponent CreateComponent(string tag, string text);
        public abstract IReactComponent CreatePseudoComponent(string tag);
        public abstract void PlayAudio(AudioClip clip);

        public void Start()
        {
            SetRef(0, Host);
            var renderCount = 0;

            var scriptJob = Source.GetScript((code) => {
                if (renderCount > 0)
                {
                    Style = CreateStyleContext();
                }

                renderCount++;

                if (Source.Language == ScriptSourceLanguage.Html)
                {
                    options.BeforeStart?.Invoke();
                    Html.InsertHtml(code, Host, true);
                    options.AfterStart?.Invoke();
                }
                else
                {
                    Script.RunScript(code, options.BeforeStart, options.AfterStart);
                }

                Style.ResolveStyle();
            }, Dispatcher, true);

            if (scriptJob != null) Disposables.Add(scriptJob.Dispose);
        }

        public void Dispose()
        {
            IsDisposed = true;
            Host.Destroy(false);
            foreach (var dr in DetachedRoots) dr.Destroy(false);
            Dispatcher?.Dispose();
            Globals?.Dispose();
            Script?.Dispose();
            foreach (var item in Disposables) item.Invoke();
        }

        protected virtual IDispatcher CreateDispatcher() => Application.isPlaying ? RuntimeDispatcher.Create(this) as IDispatcher : new EditorDispatcher(this);

        [TypescriptInclude]
        internal void SetRef(int refId, IReactComponent cmp)
        {
            cmp.RefId = refId;
            if (cmp == null) Refs.Remove(refId);
            else Refs[refId] = new WeakReference<IReactComponent>(cmp);
        }

        public IReactComponent GetRef(int refId, bool ensureUpdate = false)
        {
            if (ensureUpdate) FlushCommands();

            if (!Refs.TryGetValue(refId, out var cmp)) return null;
            if (!cmp.TryGetTarget(out var target)) return null;
            return target;
        }

        public void BindCommands(object commandsObject, object callbacksObject, object getObjectCallback, object getEventAsObjectCallback)
        {
            CommandsCallback = new Callback(commandsObject);
            FireEventByRefCallback = new Callback(callbacksObject);
            GetObjectCallback = new Callback(getObjectCallback);
            GetEventAsObjectCallback = new Callback(getEventAsObjectCallback);
        }


        IEnumerator<KeyValuePair<string, object>> PropsEnumerator(JToken props)
        {
            foreach (JProperty child in props)
            {
                var val = child.Value;
                object value = null;

                if (child.Name == "style") value = MultiEnumerator(val, true);
                else
                {
                    switch (val.Type)
                    {
                        case JTokenType.Integer:
                            value = val.Value<int>();
                            break;
                        case JTokenType.Float:
                            value = val.Value<float>();
                            break;
                        case JTokenType.Boolean:
                            value = val.Value<bool>();
                            break;
                        case JTokenType.TimeSpan:
                        case JTokenType.Guid:
                        case JTokenType.Date:
                        case JTokenType.Uri:
                        case JTokenType.String:
                            value = val.ToString();
                            break;
                        case JTokenType.Null:
                        case JTokenType.Undefined:
                        case JTokenType.Raw:
                        case JTokenType.Bytes:
                        case JTokenType.None:
                        case JTokenType.Object:
                        case JTokenType.Array:
                        case JTokenType.Constructor:
                        case JTokenType.Property:
                        case JTokenType.Comment:
                        default:
                            break;
                    }
                }

                yield return new KeyValuePair<string, object>(child.Name, value);
            }
        }

        IEnumerator<KeyValuePair<string, object>> EventsEnumerator(JToken events, bool eventsAsObjects = false)
        {
            foreach (JProperty child in events)
            {
                var ind = child.Value.Value<int>();
                var callback = ind <= 0 ? null :
                    (eventsAsObjects ? GetEventAsObjectCallback.Call(ind) : Callback.From(ind, this));
                yield return new KeyValuePair<string, object>(child.Name, callback);
            }
        }

        IEnumerator<KeyValuePair<string, object>> ObjectsEnumerator(JToken objs)
        {
            foreach (JProperty child in objs)
            {
                var ind = child.Value.Value<int>();
                var callback = ind <= 0 ? null : GetObjectCallback.Call(ind);
                yield return new KeyValuePair<string, object>(child.Name, callback);
            }
        }

        IEnumerator<KeyValuePair<string, object>> MultiEnumerator(JToken val, bool eventsAsObjects = false)
        {
            if (val == null) yield break;

            var props = val["p"];
            var objs = val["o"];
            var events = val["e"];

            if (events != null)
            {
                var ee = EventsEnumerator(events, eventsAsObjects);
                while (ee.MoveNext()) yield return ee.Current;
            }

            if (props != null)
            {
                var pe = PropsEnumerator(props);
                while (pe.MoveNext()) yield return pe.Current;
            }

            if (objs != null)
            {
                var oe = ObjectsEnumerator(objs);
                while (oe.MoveNext()) yield return oe.Current;
            }
        }

        public void FlushCommands(string serializedCommands = null)
        {
            if (serializedCommands == null)
            {
                if (CommandsCallback == null) return;

                serializedCommands = CommandsCallback.Call().ToString();
            }
            var jo = JArray.Parse(serializedCommands);

            for (int i = 0; i < jo.Count; i++)
            {
                var cmd = jo[i];

                var key = cmd[0].ToString();
                var val = cmd[1];

                if (key == "c")
                {
                    var refId = val["r"].Value<int>();
                    var type = val["t"].ToString();
                    var el = ReactUnityBridge.Instance.createElement(type, null, Host, MultiEnumerator(val));
                    if (refId > 0) SetRef(refId, el);
                }
                else if (key == "t")
                {
                    var refId = val["r"].Value<int>();
                    var children = val["c"].ToString();
                    var el = ReactUnityBridge.Instance.createText(children, Host);
                    if (refId > 0) SetRef(refId, el);
                }
                else if (key == "a")
                {
                    var parentRef = val["p"].Value<int>();
                    var childRef = val["c"].Value<int>();
                    var parent = GetRef(parentRef);
                    var child = GetRef(childRef);
                    ReactUnityBridge.Instance.appendChild(parent, child);
                }
                else if (key == "r")
                {
                    var parentRef = val["p"].Value<int>();
                    var childRef = val["c"].Value<int>();
                    var parent = GetRef(parentRef);
                    var child = GetRef(childRef);
                    ReactUnityBridge.Instance.removeChild(parent, child);
                }
                else if (key == "i")
                {
                    var parentRef = val["p"].Value<int>();
                    var childRef = val["c"].Value<int>();
                    var insertRef = val["i"].Value<int>();
                    var parent = GetRef(parentRef);
                    var child = GetRef(childRef);
                    var insert = GetRef(insertRef);
                    ReactUnityBridge.Instance.insertBefore(parent, child, insert);
                }
                else if (key == "u")
                {
                    var refId = val["r"].Value<int>();
                    var el = GetRef(refId);
                    var type = val["t"].ToString();

                    ReactUnityBridge.Instance.applyUpdate(el, MultiEnumerator(val), type);
                }
                else if (key == "x")
                {
                    var elRef = val["r"].Value<int>();
                    var el = GetRef(elRef);
                    var text = val["c"]?.ToString();
                    ReactUnityBridge.Instance.setText(el, text);
                }
                else if (key == "h")
                {
                    var elRef = val["r"].Value<int>();
                    var el = GetRef(elRef);
                    var hidden = val["h"].Value<bool>();
                    el?.ClassList.Toggle("react-unity__renderer__hidden", hidden);
                }
                else if (key == "o")
                {
                    ReactUnityBridge.Instance.clearContainer(Host);
                }
            }
        }
    }
}
