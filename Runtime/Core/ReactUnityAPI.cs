using Jint.Native;
using Jint.Native.Function;
using ReactUnity.Components;
using System;
using System.Collections.Generic;

namespace ReactUnity
{
    public static class ReactUnityAPI
    {
        public static Dictionary<string, Func<string, string, UnityUGUIContext, UnityComponent>> ComponentCreators
            = new Dictionary<string, Func<string, string, UnityUGUIContext, UnityComponent>>()
            {
                { "text", (type, text, context) => new TextComponent(text, context) },
                { "anchor", (type, text, context) => new AnchorComponent(context) },
                { "view", (type, text, context) => new ContainerComponent(context) },
                { "button", (type, text, context) => new ButtonComponent(context) },
                { "toggle", (type, text, context) => new ToggleComponent(context) },
                { "input", (type, text, context) => new InputComponent(text, context) },
                { "scroll", (type, text, context) => new ScrollComponent(context) },
                { "image", (type, text, context) => new ImageComponent(context) },
            };

        #region Creation

        public static UnityComponent createText(string text, HostComponent host)
        {
            return ComponentCreators["text"]("text", text, host.Context);
        }

        public static UnityComponent createElement(string type, string text, HostComponent host)
        {
            UnityComponent res = null;
            if (ComponentCreators.TryGetValue(type, out var creator))
            {
                res = creator(type, text, host.Context);
            }
            else
            {
                throw new Exception($"Unknown component type '{type}' specified.");
            }
            res.GameObject.name = $"<{type}>";
            return res;
        }

        #endregion


        #region Layout

        public static void appendChild(ContainerComponent parent, UnityComponent child)
        {
            child.SetParent(parent);
            parent.ScheduleLayout();
        }

        public static void appendChildToContainer(HostComponent parent, UnityComponent child)
        {
            child.SetParent(parent);
            parent.ScheduleLayout();
        }

        public static void insertBefore(ContainerComponent parent, UnityComponent child, UnityComponent beforeChild)
        {
            child.SetParent(parent, beforeChild);
            parent.ScheduleLayout();
        }

        public static void removeChild(ContainerComponent parent, UnityComponent child)
        {
            child.Destroy();
            parent.ScheduleLayout();
        }

        #endregion


        #region Properties

        public static void setText(TextComponent instance, string text)
        {
            instance.SetText(text);
            instance.ScheduleLayout();
        }

        public static void setProperty(UnityComponent element, string property, object value)
        {
            element.SetProperty(property, value);
        }

        public static void setEventListener(UnityComponent element, string eventType, JsValue value)
        {
            var hasValue = value != null && !value.IsNull() && !value.IsUndefined() && !value.IsBoolean();
            var callback = value.As<FunctionInstance>();
            if (hasValue && callback == null) throw new System.Exception("The callback for an event must be a function.");

            element.SetEventListener(eventType, callback);
        }

        #endregion


    }
}
