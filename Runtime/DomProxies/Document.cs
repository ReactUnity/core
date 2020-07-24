
using ReactUnity.Interop;
using System;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.DomProxies
{
    public class DocumentProxy
    {
        public class HeadProxy
        {
            public void appendChild(IDomElementProxy script)
            {
                script.OnAppend();
            }
        }

        public HeadProxy head;
        public string origin;
        public Action<string> execute;

        public DocumentProxy(Action<string> execute, string origin)
        {
            head = new HeadProxy();
            this.execute = execute;
            this.origin = origin;
        }

        public IDomElementProxy createElement(string type)
        {
            if (type == "script") return new ScriptProxy(this);
            if (type == "style") return new StyleProxy(this);
            else return null;
        }

        public string createTextNode(string text)
        {
            return text;
        }

        public object querySelector(string query)
        {
            if (query == "head") return head;
            return null;
        }
    }

    public interface IDomElementProxy
    {
        void OnAppend();
    }

    public abstract class DomElementProxyBase
    {
        public void setAttribute(object key, object value) { }

        public void removeAttribute(object key) { }
    }

    public class ScriptProxy : DomElementProxyBase, IDomElementProxy
    {
        public string src = null;
        public string charset = null;
        public string crossOrigin = null;

        public DocumentProxy document;

        public ScriptProxy(DocumentProxy document)
        {
            this.document = document;
        }

        public void OnAppend()
        {
            var src = new ReactScript();
            src.ScriptSource = ScriptSource.Url;
            src.SourcePath = document.origin + this.src;

            src.GetScript((sc) =>
            {
                MainThreadDispatcher.OnUpdate(() => document.execute(sc));
            }, out var result, false, true);
        }
    }

    public class StyleProxy : DomElementProxyBase, IDomElementProxy
    {
        private List<string> pendingNodes = new List<string>();
        public bool enabled;

        public DocumentProxy document;

        public StyleProxy(DocumentProxy document)
        {
            this.document = document;
        }

        public void OnAppend()
        {
            enabled = true;
        }

        public void appendChild(string text)
        {
            pendingNodes.Add(text);
            if (enabled) ProcessNodes();
        }

        void ProcessNodes()
        {
            Debug.Log("React Unity does not support CSS yet. But it may be implemented in the future. For now, here is the inserted CSS:");
            pendingNodes.ForEach(x => Debug.Log(x));
            pendingNodes.Clear();
        }
    }
}
