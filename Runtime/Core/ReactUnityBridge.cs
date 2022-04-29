using System.Collections.Generic;
using UnityEngine.Scripting;
using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;

namespace ReactUnity
{
    [TypescriptInclude]
    [Preserve]
    internal class ReactUnityBridge
    {
        private const string StringStyleSymbol = "__style_as_string__";
        static HashSet<string> TextTypes = new HashSet<string> { "text", "icon", "style", "script" };

        private static ReactUnityBridge instance;
        public static ReactUnityBridge Instance => instance = instance ?? new ReactUnityBridge();

        #region Priority

        public int CurrentEventPriority { get; private set; }

        public void SetCurrentEventPriority(EventPriority priority)
        {
            CurrentEventPriority = (int) priority;
        }

        #endregion

        private ReactUnityBridge() { }

        #region Creation

        [Preserve]
        public ITextComponent createText(string text, IReactComponent host)
        {
            var el = host.Context.CreateText(text);
            return el;
        }

        [Preserve]
        public IReactComponent createElement(string tag, string text, IReactComponent host, object props = null)
        {
            var el = host.Context.CreateComponent(tag, text);
            applyUpdate(el, props, tag);
            return el;
        }

        #endregion


        #region Layout

        [Preserve]
        public void appendChild(object parent, object child)
        {
            if (parent is IContainerComponent p)
                if (child is IReactComponent c)
                    c.SetParent(p);
        }

        [Preserve]
        public void appendChildToContainer(object parent, object child)
        {
            if (parent is IContainerComponent p)
                if (child is IReactComponent c)
                    c.SetParent(p);
        }

        [Preserve]
        public void insertBefore(object parent, object child, object beforeChild)
        {
            if (parent is IContainerComponent p)
                if (child is IReactComponent c)
                    if (beforeChild is IReactComponent b)
                        c.SetParent(p, b);
        }

        [Preserve]
        public void removeChild(object parent, object child)
        {
            if (child is IReactComponent c)
                c.Remove();
        }

        [Preserve]
        public void clearContainer(object parent)
        {
            if (parent is IContainerComponent c)
                c.Clear();
        }

        #endregion


        #region Properties

        [Preserve]
        public void setText(object instance, string text)
        {
            if (instance is ITextComponent c)
                c.SetText(text);
        }

        [Preserve]
        public void setProperty(object element, string property, object value)
        {
            if (element is IReactComponent c)
                c.SetProperty(property, value);
        }

        [Preserve]
        public void setData(object element, string property, object value)
        {
            if (element is IReactComponent c)
                c.SetData(property, value);
        }

        [Preserve]
        public void setEventListener(object element, string eventType, object value)
        {
            if (element is IReactComponent c)
                c.SetEventListener(eventType, Callback.From(value, c.Context, c));
        }

        [Preserve]
        public System.Action addEventListener(object element, string eventType, object value)
        {
            if (value == null) return null;
            if (element is IReactComponent c)
                return c.AddEventListener(eventType, Callback.From(value, c.Context, value));
            return null;
        }

        [Preserve]
        public void applyUpdate(object instance, object payload, string type)
        {
            var cmp = instance as IReactComponent;
            if (cmp == null) return;
            if (payload == null) return;

            var updatePayload =
                typeof(IEnumerator<KeyValuePair<string, object>>).IsAssignableFrom(payload.GetType()) ?
                ((IEnumerator<KeyValuePair<string, object>>) payload) :
                cmp.Context.Script.Engine.TraverseScriptObject(payload);

            if (updatePayload == null) return;

            while (updatePayload.MoveNext())
            {
                var attr = updatePayload.Current.Key;
                var value = updatePayload.Current.Value;
                var isEvent = attr.StartsWith("on");

                if (isEvent)
                {
                    setEventListener(instance, attr, value);
                    continue;
                }
                else if (attr == "children")
                {
                    if (TextTypes.Contains(type))
                    {
                        setText(instance, value != null ? value?.ToString() : "");
                    }
                }
                else if (attr == "style")
                {
                    if (!(value is string))
                    {
                        var stylePayload =
                            typeof(IEnumerator<KeyValuePair<string, object>>).IsAssignableFrom(value.GetType()) ?
                            ((IEnumerator<KeyValuePair<string, object>>) value) :
                            cmp.Context.Script.Engine.TraverseScriptObject(value);
                        var st = cmp.Style;

                        while (stylePayload.MoveNext())
                        {
                            var stKey = stylePayload.Current.Key;
                            var stVal = stylePayload.Current.Value;
                            st.SetWithoutNotify(stKey, stVal);
                        }
                        cmp.MarkForStyleResolving(false);
                    }
                }
                else if (attr == StringStyleSymbol)
                {
                    setProperty(instance, "style", value);
                }
                else if (attr.StartsWith("data-"))
                {
                    setData(instance, attr.Substring(5), value);
                }
                else
                {
                    setProperty(instance, attr, value);
                }
            }
        }

        #endregion
    }
}
