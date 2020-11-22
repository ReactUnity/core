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

        public static void appendChild(dynamic parent, dynamic child)
        {
            child.SetParent(parent);
            parent.ScheduleLayout();
        }

        public static void appendChildToContainer(dynamic parent, dynamic child)
        {
            child.SetParent(parent);
            parent.ScheduleLayout();
        }

        public static void insertBefore(dynamic parent, dynamic child, dynamic beforeChild)
        {
            child.SetParent(parent, beforeChild);
            parent.ScheduleLayout();
        }

        public static void removeChild(dynamic parent, dynamic child)
        {
            child.Destroy();
            parent.ScheduleLayout();
        }

        #endregion


        #region Properties

        public static void setText(dynamic instance, string text)
        {
            instance.SetText(text);
            instance.ScheduleLayout();
        }

        public static void setProperty(dynamic element, string property, object value)
        {
            element.SetProperty(property, value);
        }

        public static void setEventListener(dynamic element, string eventType, Callback value)
        {
            element.SetEventListener(eventType, value);
        }

        #endregion


    }
}
