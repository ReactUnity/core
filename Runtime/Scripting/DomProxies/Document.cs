using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Styling;

namespace ReactUnity.Scripting.DomProxies
{
    public class DocumentProxy
    {
        public HeadProxy head;
        public string Origin;
        public ReactContext Context;
        public int nodeType = 9;

        public DocumentProxy documentElement => this;

        /// Where the running script was loaded from. Bundlers need this: the bundle runs as a
        /// classic script, so there is no import.meta.url and their fallback resolves against
        /// baseURI. Without it a Vite HMR client opened `ws://null:null/`.
        public string baseURI => Context?.Location?.href ?? Origin;
        public string documentURI => baseURI;

        /// Constant, and no `visibilitychange` is ever dispatched. Vite's HMR client parks its
        /// reconnect poll until the document is visible again, so reporting Unity's focus state
        /// here would stall a dev-server restart for as long as the Editor sits in the background.
        public string visibilityState => "visible";
        public bool hidden => false;

        private EventTarget eventTarget = new EventTarget();

        public DocumentProxy(ReactContext context, string origin)
        {
            head = new HeadProxy();
            Origin = origin;
            Context = context;
        }

        public object createElement(string type)
        {
            if (type == "script") return new ScriptProxy(this);
            else if (type == "style") return new StyleProxy(this);
            else if (type == "link") return new LinkProxy(this);
            else if (type == "a") return new AnchorProxy(this);
            else if (type == "p") return new { style = new { } };
            else return Context.CreateComponent(type, "");
        }

        public string createTextNode(string text)
        {
            return text;
        }

        public object querySelector(string query)
        {
            if (query == "head") return head;
            return Context.Host.QuerySelector(query);
        }

        public object querySelectorAll(string query)
        {
            if (query == "head") return new List<object> { head };

            return Context.Script.AsArray(Context.Host.QuerySelectorAll(query));
        }

        public object getElementById(string id)
        {
            // TODO: handle efficiently
            return Context.Host.QuerySelector("#" + id);
        }

        public List<IDomElementProxy> getElementsByTagName(string tagName)
        {
            return head.Children.FindAll(x => x.tagName == tagName);
        }

        /// The document is an event target of its own -- nothing here dispatches to it yet, but a
        /// listener has to be accepted: Vite's HMR client waits for a restarted dev server behind
        /// `addEventListener("visibilitychange", ...)` and threw a TypeError instead of reconnecting.
        public void addEventListener(string eventType, object callback, object options = null)
        {
            // TODO: handle options
            eventTarget.AddEventListener(eventType, callback);
        }

        public void removeEventListener(string eventType, object callback, object options = null)
        {
            eventTarget.RemoveEventListener(eventType, callback);
        }

        public bool dispatchEvent(object ev)
        {
            var type = ev as string;
            var engine = Context?.Script?.Engine;

            if (type == null && engine != null && engine.IsScriptObject(ev))
            {
                var props = engine.TraverseScriptObject(ev);
                while (props.MoveNext())
                {
                    if (props.Current.Key != "type") continue;
                    type = props.Current.Value?.ToString();
                    break;
                }
            }

            if (string.IsNullOrEmpty(type)) return true;

            eventTarget.DispatchEvent(type, Context, EventPriority.Unknown, ev);
            // `preventDefault` is not read back; no event here is cancelable.
            return true;
        }
    }

    public interface IDomElementProxy
    {
        string tagName { get; }

        void OnAppend();
        void OnRemove();

        void setAttribute(object key, object value);
        void removeAttribute(object key);

        void appendChild(string text);
        void removeChild(string text);
    }

    public abstract class DomElementProxyBase
    {
        public abstract string tagName { get; }
        public int nodeType => 1;
        public object nextSibling => null;
        public string id = "";

        Dictionary<string, object> attributes = new Dictionary<string, object>();

        public virtual void setAttribute(object key, object value) => attributes[key?.ToString() ?? ""] = value;
        public virtual void removeAttribute(object key) => attributes.Remove(key?.ToString() ?? "");
        public bool hasAttribute(object key) => attributes.ContainsKey(key?.ToString() ?? "");
        public object getAttribute(object key) => attributes.TryGetValue(key?.ToString() ?? "", out var val) ? val : default;


        public object querySelector(string query)
        {
            return null;
        }

        public object querySelectorAll(string query)
        {
            return new List<object> { };
        }
    }

    public class HeadProxy : DomElementProxyBase
    {
        public override string tagName { get; } = "head";
        public List<IDomElementProxy> Children { get; } = new List<IDomElementProxy>();
        public List<IDomElementProxy> childNodes => Children;

        public void appendChild(IDomElementProxy child)
        {
            child.OnAppend();
            Children.Add(child);
        }

        public void removeChild(IDomElementProxy child)
        {
            child.OnRemove();
            Children.Remove(child);
        }

        public void insertBefore(IDomElementProxy child, object before)
        {
            child.OnAppend();
            var ind = before is IDomElementProxy ip ? Children.IndexOf(ip) : -1;
            if (ind >= 0) Children.Insert(ind, child);
            else Children.Add(child);
        }
    }

    public class ScriptProxy : DomElementProxyBase, IDomElementProxy
    {
        public override string tagName { get; } = "script";
        public string src { get; set; }
        public string charset { get; set; }
        public string crossOrigin { get; set; }
        public float timeout { get; set; }

        private Callback onloadCallback { get; set; }
        private Callback onerrorCallback { get; set; }
        private IReactComponent component;

        public object onload
        {
            set { onloadCallback = Callback.From(value, document.Context); }
            get => new Action(() => onloadCallback.Call());
        }

        public object onerror
        {
            set { onerrorCallback = Callback.From(value, document.Context); }
            get => new Action(() => onerrorCallback.Call());
        }

        public DocumentProxy document;
        public HeadProxy parentNode;

        public ScriptProxy(DocumentProxy document)
        {
            this.document = document;
            parentNode = document.head;
        }

        public void OnAppend()
        {
            var script = document.Context.CreateComponent("script", "");
            script.AddEventListener("onLoad", onloadCallback);
            script.AddEventListener("onError", onerrorCallback);
            script.SetParent(document.Context.Host);
            script.SetProperty("source", src);
        }

        public void OnRemove()
        {
            component?.Remove();
            component = null;
        }

        public void appendChild(string text)
        {
            throw new NotImplementedException();
        }

        public void removeChild(string text)
        {
            throw new NotImplementedException();
        }
    }

    public class StyleProxy : DomElementProxyBase, IDomElementProxy
    {
        public class StyleSheetProxy
        {
            StyleProxy Proxy;

            public string cssText
            {
                set
                {
                    Proxy.childList.Clear();
                    Proxy.childList.Add(value);
                    Proxy.ProcessNodes();
                }
            }

            public StyleSheetProxy(StyleProxy pr)
            {
                Proxy = pr;
            }
        }

        public override string tagName { get; } = "style";
        internal List<string> childList = new List<string>();
        public NodeList<string> childNodes { get; }
        public string firstChild => childList.Count > 0 ? childList[0] : default;
        public string lastChild => childList.Count > 0 ? childList[childList.Count - 1] : default;
        public bool hasChildNodes() => childList.Count > 0;

        public StyleSheet Sheet = null;
        public StyleSheet sheet => Sheet;
        public StyleSheetProxy styleSheet;

        public bool enabled;

        public DocumentProxy document;
        public HeadProxy parentNode;

        public string textContent
        {
            set
            {
                childList.Clear();
                childList.Add(value);
                ProcessNodes();
            }
        }

        public StyleProxy(DocumentProxy document)
        {
            childNodes = new NodeList<string>(childList);
            this.document = document;
            parentNode = document.head;
            styleSheet = new StyleSheetProxy(this);
        }

        public void OnAppend()
        {
            enabled = true;
            ProcessNodes();
        }

        public void OnRemove()
        {
            if (Sheet != null) document.Context.RemoveStyle(Sheet);
            Sheet = null;
        }

        void ProcessNodes()
        {
            if (Sheet != null) document.Context.RemoveStyle(Sheet);
            var media = getAttribute("media") as string;
            Sheet = new StyleSheet(document.Context.Style, string.Join("\n", childList), 0, null, media);
            document.Context.InsertStyle(Sheet);
        }

        public override void setAttribute(object key, object value)
        {
            base.setAttribute(key, value);
            if (key?.ToString() == "media") ProcessNodes();
        }

        public override void removeAttribute(object key)
        {
            base.removeAttribute(key);
            if (key?.ToString() == "media") ProcessNodes();
        }

        public void appendChild(string text)
        {
            childList.Add(text);

            if (enabled) ProcessNodes();
        }

        public void removeChild(string text)
        {
            childList.Remove(text);

            if (enabled) ProcessNodes();
        }

        public void insertBefore(string child, object before)
        {
            var ind = before is string ip ? childList.IndexOf(ip) : -1;
            if (ind >= 0) childList.Insert(ind, child);
            else childList.Add(child);

            if (enabled) ProcessNodes();
        }

        public void insertAdjacentElement(string pos, IDomElementProxy style)
        {
            parentNode.appendChild(style);
        }
    }

    public class LinkProxy : DomElementProxyBase, IDomElementProxy
    {
        public override string tagName { get; } = "link";
        public DocumentProxy document;
        public HeadProxy parentNode;
        private IReactComponent component;

        public string rel = "";

        public string type;

        public string href;


        private Callback onloadCallback { get; set; }
        private Callback onerrorCallback { get; set; }

        public object onload
        {
            set { onloadCallback = Callback.From(value, document.Context); }
            get => new Action(() => onloadCallback.Call());
        }

        public object onerror
        {
            set { onerrorCallback = Callback.From(value, document.Context); }
            get => new Action(() => onerrorCallback.Call());
        }

        public object relList = new {
            supports = new Func<object, Boolean>((object val) => true),
        };

        public LinkProxy(DocumentProxy document)
        {
            this.document = document;
            parentNode = document.head;
        }

        public void OnAppend()
        {
            var tag = "";

            if (type == "text/css") tag = "style";
            else if (type == "text/javascript") tag = "script";

            if (!string.IsNullOrWhiteSpace(tag))
            {
                var cmp = component = document.Context.CreateComponent(tag, "") as SourceProxyComponent;
                cmp.AddEventListener("onLoad", onloadCallback);
                cmp.AddEventListener("onError", onerrorCallback);
                if (type == "text/css") cmp.SetProperty("scope", ":root");
                cmp.SetParent(document.Context.Host);
                cmp.SetProperty("source", href);
            }
        }

        public void OnRemove()
        {
            component?.Remove();
            component = null;
        }

        public void appendChild(string text) { }

        public void removeChild(string text) { }
    }

    public class AnchorProxy : DomElementProxyBase, IDomElementProxy
    {
        public override string tagName { get; } = "link";
        public DocumentProxy document;
        public HeadProxy parentNode;

        public URL url;


        public string href => url?.href ?? "";
        public string protocol => url?.protocol ?? "";
        public string hostname => url?.hostname ?? "";
        public string origin => url?.origin ?? "";
        public string host => url?.host ?? "";
        public string port => url?.port ?? "";
        public string search => url?.search ?? "";
        public string hash => url?.hash ?? "";
        public string pathname => url?.pathname ?? "";
        public string rawPathname => url?.rawPathname ?? "";



        public AnchorProxy(DocumentProxy document)
        {
            this.document = document;
            parentNode = document.head;
        }

        public void OnAppend()
        {
        }

        public void OnRemove()
        {
        }

        public override void setAttribute(object key, object value)
        {
            base.setAttribute(key, value);
            if (key?.ToString() == "href")
            {
                url = new URL(value?.ToString(), document.Context.Location.origin);
            }
        }

        public void appendChild(string text) { }

        public void removeChild(string text) { }
    }
}
