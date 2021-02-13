using Jint.Native;
using Jint.Native.Function;
using ReactUnity.Components;
using ReactUnity.Interop;
using ReactUnity.StateHandlers;
using System;
using System.Collections.Generic;

namespace ReactUnity
{
    public class ReactUnityAPI
    {
        public static Func<string, string, UnityUGUIContext, UnityComponent> defaultCreator =
            (tag, text, context) => new ContainerComponent(context, tag);

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
                { "rawimage", (tag, text, context) => new RawImageComponent(context) },
                { "render", (tag, text, context) => new RenderTextureComponent(context) },
                { "video", (tag, text, context) => new VideoComponent(context) },
            };

        public static Dictionary<string, Func<string, string, UnityUGUIContext, UnityComponent>> EditorComponentCreators
            = new Dictionary<string, Func<string, string, UnityUGUIContext, UnityComponent>>()
            {
            };

        public static Dictionary<string, Type> StateHandlers
            = new Dictionary<string, Type>()
            {
                { "active", typeof(ActiveStateHandler) },
                { "focus", typeof(FocusStateHandler) },
                { "focus-within", typeof(FocusWithinStateHandler) },
                { "focus-visible", typeof(FocusVisibleStateHandler) },
                { "hover", typeof(HoverStateHandler) },
            };

        Jint.Engine Engine;

        public ReactUnityAPI(Jint.Engine engine)
        {
            Engine = engine;
        }

        #region Creation

        public IReactComponent createText(string text, HostComponent host)
        {
            var cmp = ComponentCreators["text"]("_text", text, host.Context);
            cmp.IsPseudoElement = true;
            return cmp;
        }

        public IReactComponent createElement(string tag, string text, HostComponent host)
        {
            UnityComponent res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
            {
                res = creator(tag, text, host.Context);
            }
            else
            {
                res = defaultCreator(tag, text, host.Context);
            }
            res.GameObject.name = $"<{tag}>";
            return res;
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
            if (parent is IHostComponent p)
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
                c.Destroy();
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
            if (element is IReactComponent c)
                c.SetProperty(property, value);
        }

        public void setData(object element, string property, object value)
        {
            if (element is IReactComponent c)
                c.SetData(property, value);
        }

        public void setEventListener(IReactComponent element, string eventType, JsValue value)
        {
            var hasValue = value != null && !value.IsNull() && !value.IsUndefined() && !value.IsBoolean();
            var callback = value.As<FunctionInstance>();
            if (hasValue && callback == null) throw new Exception("The callback for an event must be a function.");

            element.SetEventListener(eventType, new Callback(callback));
        }

        public void setEventListener(object element, string eventType, object value)
        {
            if (element is IReactComponent c && value != null)
                c.SetEventListener(eventType, new Callback(value));
        }

        #endregion
    }
}
