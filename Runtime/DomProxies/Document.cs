
using ReactUnity.Interop;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ReactUnity.DomProxies
{
    public class DocumentProxy
    {
        public HeadProxy head;
        public string origin;
        public Action<string> execute;
        public UnityUGUIContext context;
        public ReactUnity root;

        public DocumentProxy(UnityUGUIContext context, ReactUnity root, string origin)
        {
            head = new HeadProxy();
            execute = root.ExecuteScript;
            this.origin = origin;
            this.context = context;
            this.root = root;
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

        public object getElementById(string query)
        {
            return null;
        }
    }

    public interface IDomElementProxy
    {
        void OnAppend();
        void OnRemove();

        void setAttribute(object key, object value);
        void removeAttribute(object key);

        void appendChild(string text);
        void removeChild(string text);
    }

    public abstract class DomElementProxyBase
    {
        public void setAttribute(object key, object value) { }
        public void removeAttribute(object key) { }
    }

    public class HeadProxy : DomElementProxyBase
    {
        public void appendChild(IDomElementProxy child)
        {
            child.OnAppend();
        }

        public void removeChild(IDomElementProxy child)
        {
            child.OnRemove();
        }
    }

    public class ScriptProxy : DomElementProxyBase, IDomElementProxy
    {
        public string src = null;
        public string charset = null;
        public string crossOrigin = null;

        public Action<ScriptProxy> onload = null;

        public DocumentProxy document;
        public HeadProxy parentNode;

        public ScriptProxy(DocumentProxy document)
        {
            this.document = document;
            parentNode = document.head;
        }

        public void appendChild(string text)
        {
            throw new NotImplementedException();
        }

        public void OnAppend()
        {
            var src = new ReactScript();
            src.ScriptSource = ScriptSource.Url;
            src.SourcePath = document.origin + this.src;

            src.GetScript((sc) =>
            {
                MainThreadDispatcher.OnUpdate(() =>
                {
                    document.execute(sc);
                    onload?.Invoke(this);
                });
            }, out var result, false, true);
        }

        public void OnRemove()
        {
            Debug.LogError("Trying to remove script but I don't know what to do");
        }

        public void removeChild(string text)
        {
            throw new NotImplementedException();
        }
    }

    public class StyleProxy : DomElementProxyBase, IDomElementProxy
    {
        private List<string> pendingNodes = new List<string>();
        private List<string> pendingRemoval = new List<string>();
        public List<string> childNodes = new List<string>();
        public string firstChild => childNodes.FirstOrDefault();

        public bool enabled;

        public DocumentProxy document;
        public HeadProxy parentNode;

        public StyleProxy(DocumentProxy document)
        {
            this.document = document;
            parentNode = document.head;
        }

        public void OnAppend()
        {
            enabled = true;
        }

        public void OnRemove()
        {
            // TODO:
        }

        public void appendChild(string text)
        {
            pendingNodes.Add(text);
            childNodes.Add(text);

            if (enabled) ProcessNodes();
        }

        public void removeChild(string text)
        {
            pendingRemoval.Add(text);
            childNodes.Remove(text);

            if (enabled) ProcessNodes();
        }

        void ProcessNodes()
        {
            pendingNodes.ForEach(x => document.context.InsertStyle(x));
            pendingNodes.Clear();

            pendingRemoval.ForEach(x => document.context.RemoveStyle(x));
            pendingRemoval.Clear();
        }
    }
}
