using JavaScriptEngineSwitcher.Core;
using Jint.Native;
using Jint.Native.Function;
using ReactUnity.Components;
using ReactUnity.Interop;
using System;
using System.Collections.Generic;

namespace ReactUnity
{
    public class ReactUnityAPI
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

        IJsEngine Engine;

        public ReactUnityAPI(IJsEngine engine)
        {
            Engine = engine;
        }

        #region Creation

        public UnityComponent createText(string text, HostComponent host)
        {
            var cmp = ComponentCreators["text"]("_text", text, host.Context);
            cmp.IsPseudoElement = true;
            return cmp;
        }

        public UnityComponent createElement(string tag, string text, HostComponent host)
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

        public void appendChild(object parent, object child)
        {
            if (parent is ContainerComponent p)
                if (child is UnityComponent c)
                    c.SetParent(p);
        }

        public void appendChildToContainer(object parent, object child)
        {
            if (parent is HostComponent p)
                if (child is UnityComponent c)
                    c.SetParent(p);
        }

        public void insertBefore(object parent, object child, object beforeChild)
        {
            if (parent is ContainerComponent p)
                if (child is UnityComponent c)
                    if (beforeChild is UnityComponent b)
                        c.SetParent(p, b);
        }

        public void removeChild(object parent, object child)
        {
            if (child is UnityComponent c)
                c.Destroy();
        }

        #endregion


        #region Properties

        public void setText(object instance, string text)
        {
            if (instance is TextComponent c)
                c.SetText(text);
        }

        public void setProperty(object element, string property, object value)
        {
            if (element is UnityComponent c)
                c.SetProperty(property, value);
        }

        public void setEventListener(UnityComponent element, string eventType, JsValue value)
        {
            var hasValue = value != null && !value.IsNull() && !value.IsUndefined() && !value.IsBoolean();
            var callback = value.As<FunctionInstance>();
            if (hasValue && callback == null) throw new Exception("The callback for an event must be a function.");

            element.SetEventListener(eventType, new Callback(callback, Engine));
        }

        public void setEventListener(object element, string eventType, object value)
        {
            if (element is UnityComponent c && value != null)
                c.SetEventListener(eventType, new Callback(value, Engine));
        }

        #endregion
    }
}
