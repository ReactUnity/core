using Jint.Native;
using Jint.Native.Function;
using ReactUnity.Components;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity
{
    public static class ReactUnityAPI
    {
        #region Creation

        public static TextComponent createText(string text, HostComponent host)
        {
            var res = new TextComponent(text, host.Context);
            res.GameObject.name = "TEXT";
            return res;
        }

        public static UnityComponent createElement(string type, string text, HostComponent host)
        {
            UnityComponent res = null;
            if (type == "view")
            {
                res = new ContainerComponent(host.Context);
            }
            else if (type == "button")
            {
                res = new ButtonComponent(host.Context);
            }
            else if (type == "toggle")
            {
                res = new ToggleComponent(host.Context);
            }
            else if (type == "input")
            {
                res = new InputComponent(text, host.Context);
            }
            else if (type == "scroll")
            {
                res = new ScrollComponent(host.Context);
            }
            else if (type == "text")
            {
                res = createText(text, host);
            }
            else if (type == "image")
            {
                res = new ImageComponent(host.Context);
            }
            else
            {
                throw new System.Exception($"Unknown component type {type} specified.");
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
