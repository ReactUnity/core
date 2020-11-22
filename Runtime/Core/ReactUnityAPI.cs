using Jint.Native;
using Jint.Native.Function;
using ReactUnity.Components;
using ReactUnity.Interop;
using System;
using System.Collections.Generic;

namespace ReactUnity
{
    public static class ReactUnityAPI
    {
        public static Dictionary<string, Func<string, string, UnityUGUIContext, UnityComponent>> ComponentCreators
            = new Dictionary<string, Func<string, string, UnityUGUIContext, UnityComponent>>()
            {
                { "text", (tag, text, context) => new TextComponent(text, context, tag) },
                { "anchor", (tag, text, context) => new AnchorComponent(context) },
                { "view", (tag, text, context) => new ContainerComponent(context, "view") },
                { "button", (tag, text, context) => new ButtonComponent(context) },
                { "toggle", (tag, text, context) => new ToggleComponent(context) },
                { "input", (tag, text, context) => new InputComponent(text, context) },
                { "scroll", (tag, text, context) => new ScrollComponent(context) },
                { "image", (tag, text, context) => new ImageComponent(context) },
            };

        #region Creation

        public static UnityComponent createText(string text, HostComponent host)
        {
            var cmp = ComponentCreators["text"]("_text", text, host.Context);
            cmp.IsPseudoElement = true;
            return cmp;
        }

        public static UnityComponent createElement(string tag, string text, HostComponent host)
        {
            UnityComponent res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
            {
                res = creator(tag, text, host.Context);
            }
            else
            {
                throw new Exception($"Unknown component tag '{tag}' specified.");
            }
            res.GameObject.name = $"<{tag}>";
            return res;
        }

        #endregion


        #region Layout

        public static void appendChild(object parent, object child)
        {
            if (parent is ContainerComponent p)
                if (child is UnityComponent c)
                    c.SetParent(p);
        }

        public static void appendChildToContainer(object parent, object child)
        {
            if (parent is HostComponent p)
                if (child is UnityComponent c)
                    c.SetParent(p);
        }

        public static void insertBefore(object parent, object child, object beforeChild)
        {
            if (parent is ContainerComponent p)
                if (child is UnityComponent c)
                    if (beforeChild is UnityComponent b)
                        c.SetParent(p, b);
        }

        public static void removeChild(object parent, object child)
        {
            if (child is UnityComponent c)
                c.Destroy();
        }

        #endregion


        #region Properties

        public static void setText(object instance, string text)
        {
            if (instance is TextComponent c)
                c.SetText(text);
        }

        public static void setProperty(object element, string property, object value)
        {
            if (element is UnityComponent c)
                c.SetProperty(property, value);
        }

        public static void setEventListener(object element, string eventType, Callback value)
        {
            if (element is UnityComponent c)
                c.SetEventListener(eventType, value);
        }

        #endregion
    }
}
