using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using Jint.Native;
using Jint;
using ReactUnity.Components;
using ReactUnity.Types;
using Facebook.Yoga;
using Jint.Native.Function;
using ReactUnity.Interop;

namespace ReactUnity
{
    public class UnityUGUIContext : IUnityContext<UnityComponent, TextComponent, ContainerComponent, HostComponent>
    {
        public Engine Engine { get; }
        public HostComponent Host { get; }
        public StringObjectDictionary NamedAssets { get; }
        public YogaNode RootLayoutNode { get; }

        private bool Scheduled = false;
        private List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public UnityUGUIContext(RectTransform hostElement, Engine engine, StringObjectDictionary assets)
        {
            Engine = engine;
            NamedAssets = assets;
            Host = new HostComponent(hostElement, this);
            RootLayoutNode = Host.Layout;

            MainThreadDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    RootLayoutNode.CalculateLayout();
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();

                    Canvas.ForceUpdateCanvases();
                }
            });
        }


        #region Creation

        public TextComponent createText(string text)
        {
            var res = new TextComponent(text, this);
            res.GameObject.name = "TEXT";
            return res;
        }

        public UnityComponent createElement(string type, string text)
        {
            UnityComponent res = null;
            if (type == "atom")
            {
                res = new ContainerComponent(this);
            }
            else if (type == "button")
            {
                res = new ButtonComponent(this);
            }
            else if (type == "input")
            {
                res = new InputComponent(text, this);
            }
            else if (type == "scroll")
            {
                res = new ScrollComponent(this);
            }
            else if (type == "text")
            {
                return createText(text);
            }
            else if (type == "image")
            {
                res = new ImageComponent(this);
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

        public void appendChild(ContainerComponent parent, UnityComponent child)
        {
            child.SetParent(parent);
            scheduleLayout();
        }

        public void appendChildToContainer(HostComponent parent, UnityComponent child)
        {
            child.SetParent(parent);
            scheduleLayout();
        }

        public void insertBefore(ContainerComponent parent, UnityComponent child, UnityComponent beforeChild)
        {
            child.SetParent(parent, beforeChild);
            scheduleLayout();
        }

        public void removeChild(ContainerComponent parent, UnityComponent child)
        {
            child.Destroy();
            scheduleLayout();
        }

        #endregion


        #region Properties

        public void setText(TextComponent instance, string text)
        {
            instance.SetText(text);
            scheduleLayout();
        }

        public void setProperty(UnityComponent element, string property, object value)
        {
            element.SetProperty(property, value);
        }

        public void setEventListener(UnityComponent element, string eventType, JsValue value)
        {
            var hasValue = value != null && !value.IsNull() && !value.IsUndefined() && !value.IsBoolean();
            var callback = value.As<FunctionInstance>();
            if (hasValue && callback == null) throw new System.Exception("The callback for an event must be a function.");

            element.SetEventListener(eventType, callback);
        }

        #endregion


        public void scheduleLayout(System.Action callback = null)
        {
            Scheduled = true;
            ScheduledCallbacks.Add(callback);
        }
    }
}
