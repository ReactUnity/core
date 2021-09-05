#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;

namespace ReactUnity
{
    [TypescriptInclude]
    internal class ReactUnityBridge
    {
        private static ReactUnityBridge instance;
        public static ReactUnityBridge Instance => instance = instance ?? new ReactUnityBridge();

        private ReactUnityBridge() { }

        #region Creation

        public ITextComponent createText(string text, IReactComponent host)
        {
            return host.Context.CreateText(text);
        }

        public IReactComponent createElement(string tag, string text, IReactComponent host)
        {
            return host.Context.CreateComponent(tag, text);
        }

        #endregion


        #region Layout

        public void appendChild(object parent, object child)
        {
            if (parent is IContainerComponent p)
                if (child is IReactComponent c)
                    c.SetParent(p);
        }

        public void appendChildToContainer(object parent, object child)
        {
            if (parent is IContainerComponent p)
                if (child is IReactComponent c)
                    c.SetParent(p);
        }

        public void insertBefore(object parent, object child, object beforeChild)
        {
            if (parent is IContainerComponent p)
                if (child is IReactComponent c)
                    if (beforeChild is IReactComponent b)
                        c.SetParent(p, b);
        }

        public void removeChild(object parent, object child)
        {
            if (child is IReactComponent c)
                c.Remove();
        }

        #endregion


        #region Properties

        public void setText(object instance, string text)
        {
            if (instance is ITextComponent c)
                c.SetText(text);
        }

        public void setProperty(object element, string property, object value)
        {
#if REACT_CLEARSCRIPT
            value = value is Microsoft.ClearScript.Undefined ? null : value;
#endif
            if (element is IReactComponent c)
                c.SetProperty(property, value);
        }

        public void setData(object element, string property, object value)
        {
#if REACT_CLEARSCRIPT
            value = value is Microsoft.ClearScript.Undefined ? null : value;
#endif
            if (element is IReactComponent c)
                c.SetData(property, value);
        }

        public void setEventListener(object element, string eventType, object value)
        {
#if REACT_CLEARSCRIPT
            value = value is Microsoft.ClearScript.Undefined ? null : value;
#endif
            if (element is IReactComponent c)
                c.SetEventListener(eventType, Callback.From(value));
        }

        public System.Action addEventListener(object element, string eventType, object value)
        {
#if REACT_CLEARSCRIPT
            value = value is Microsoft.ClearScript.Undefined ? null : value;
#endif
            if (value == null) return null;
            if (element is IReactComponent c)
                return c.AddEventListener(eventType, Callback.From(value));
            return null;
        }

        #endregion
    }
}
