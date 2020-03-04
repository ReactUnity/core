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
        static Dictionary<string, EventTriggerType> EventTypes = new Dictionary<string, EventTriggerType>
        {
            { "onPointerClick", EventTriggerType.PointerClick },
            { "onPointerUp", EventTriggerType.PointerUp },
            { "onPointerDown", EventTriggerType.PointerDown },
            { "onPointerEnter", EventTriggerType.PointerEnter },
            { "onPointerExit", EventTriggerType.PointerExit },
            { "onSubmit", EventTriggerType.Submit },
            { "onCancel", EventTriggerType.Cancel },
            { "onSelect", EventTriggerType.Select },
            { "onDeselect", EventTriggerType.Deselect },
            { "onMove", EventTriggerType.Move },
            { "onUpdateSelected", EventTriggerType.UpdateSelected },
            { "onScroll", EventTriggerType.Scroll },
            { "onDrag", EventTriggerType.Drag },
            { "onBeginDrag", EventTriggerType.BeginDrag },
            { "onEndDrag", EventTriggerType.EndDrag },
            { "onPotentialDrag", EventTriggerType.InitializePotentialDrag },
            { "onDrop", EventTriggerType.Drop },
        };

        public Engine Engine { get; }
        public HostComponent Host { get; }
        public StringObjectDictionary NamedAssets { get; }
        public YogaNode RootLayoutNode { get; }

        private bool Scheduled = false;

        public UnityUGUIContext(RectTransform hostElement, Engine engine, StringObjectDictionary assets)
        {
            Engine = engine;
            NamedAssets = assets;
            Host = new HostComponent(hostElement, this);
            RootLayoutNode = Host.Layout;

            // TODO: text sizes are not calculated right on the first frame they are added
            MainThreadDispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    RootLayoutNode.CalculateLayout();
                    Scheduled = false;
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

        public void setProperty(UnityComponent cmp, string property, JsValue value)
        {
            switch (property)
            {
                case "name":
                    cmp.GameObject.name = value.ToString();
                    return;
                case "interactable":
                    (cmp as ContainerComponent)?.SetInteractable(value == true);
                    return;
                case "opacity":
                    (cmp as ContainerComponent)?.SetOpacity(value.IsNumber() ? (float)value.AsNumber() : 1f);
                    return;
                case "disabled":
                    (cmp as ContainerComponent)?.SetInteractable(value != true);
                    return;
                case "placeholder":
                    (cmp as InputComponent)?.SetPlaceholder(value.AsString());
                    return;
                default:
                    break;
            }
        }

        public void setEventListener(UnityComponent el, string eventType, JsValue value)
        {
            var hasAction = value != null && !value.IsNull() && !value.IsUndefined() && !value.IsBoolean();

            if (EventTypes.TryGetValue(eventType, out var type))
            {
                el.removeEventListeners(type);
                if (hasAction)
                {
                    var fun = value.As<FunctionInstance>();
                    if (fun == null) throw new System.Exception("The callback for an event must be a function.");
                    el.addEventListener(type,
                        (e) => fun.Call(JsValue.FromObject(fun.Engine, el), new JsValue[] { JsValue.FromObject(fun.Engine, e) }));
                }
            }
            else
            {
                switch (eventType)
                {
                    case "onButtonClick":
                        (el as ButtonComponent)?.setButtonOnClick(
                            hasAction
                            ? (() => value.As<FunctionInstance>().Invoke())
                            : null as System.Action);
                        break;
                    default:
                        break;
                }
            }
        }

        #endregion


        public void scheduleLayout()
        {
            Scheduled = true;
        }
    }
}
