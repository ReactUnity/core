using Facebook.Yoga;
using Jint;
using Jint.Native;
using ReactUnity.Layout;
using ReactUnity.Styling;
using System;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class UnityComponent
    {
        public static NodeStyle TagDefaultStyle { get; } = new NodeStyle();
        public static YogaNode TagDefaultLayout { get; } = new YogaNode();
        public virtual NodeStyle DefaultStyle => TagDefaultStyle;
        public virtual YogaNode DefaultLayout => TagDefaultLayout;

        public GameObject GameObject { get; private set; }
        public RectTransform RectTransform { get; private set; }
        public ContainerComponent Parent { get; private set; }

        public EventTrigger EventTrigger { get; private set; }

        public FlexElement Flex { get; private set; }
        public YogaNode Layout;
        public NodeStyle Style;

        public Graphic MainGraphic { get; protected set; }

        protected UnityComponent(RectTransform existing)
        {
            GameObject = existing.gameObject;
            RectTransform = existing;

            Style = new NodeStyle();
            Layout = new YogaNode();
            ResetLayout();
        }

        public UnityComponent()
        {
            GameObject = new GameObject();
            GameObject.AddComponent<CanvasRenderer>();
            RectTransform = GameObject.AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;


            Style = new NodeStyle();
            Layout = new YogaNode();
            ResetLayout();
            Flex = GameObject.AddComponent<FlexElement>();
            Flex.Node = Layout;
        }

        public void Destroy()
        {
            GameObject.DestroyImmediate(GameObject);
            Parent.Children.Remove(this);
            Parent.Layout.RemoveChild(Layout);
        }

        public virtual void SetParent(ContainerComponent parent, UnityComponent insertBefore = null)
        {
            Parent = parent;
            RectTransform.SetParent(parent.Container, false);

            if (insertBefore == null)
            {
                parent.Children.Add(this);
                parent.Layout.AddChild(Layout);
            }
            else
            {
                var ind = insertBefore.RectTransform.GetSiblingIndex();

                parent.Children.Insert(ind, this);
                parent.Layout.Insert(ind, Layout);
                RectTransform.SetSiblingIndex(ind);
            }

            ResolveStyle();
        }

        #region Events
        public EventTrigger getEventTrigger()
        {
            return EventTrigger ?? (EventTrigger = RectTransform.gameObject.AddComponent<EventTrigger>());
        }

        public virtual void addEventListener(EventTriggerType type, System.Action<BaseEventData> callback)
        {
            var eventTrigger = getEventTrigger();

            var trigger = eventTrigger.triggers.Find(x => x.eventID == type);
            var uevent = trigger?.callback;
            if (trigger == null)
            {
                uevent = new EventTrigger.TriggerEvent();

                eventTrigger.triggers.Add(new EventTrigger.Entry()
                {
                    eventID = type,
                    callback = uevent,
                });
            }

            var action = new UnityAction<BaseEventData>(callback);
            uevent.AddListener(action);

            GetBackgroundGraphic();
        }

        public virtual void removeEventListeners(EventTriggerType type)
        {
            var trigger = EventTrigger?.triggers.Find(x => x.eventID == type);
            var uevent = trigger?.callback;
            uevent?.RemoveAllListeners();
        }
        #endregion

        public void ResetLayout()
        {
            Layout.CopyStyle(DefaultLayout);
        }

        public void ResetStyle()
        {
            Style.CopyStyle(DefaultStyle);
        }

        public virtual void ResolveStyle()
        {
            Style.ResolveStyle(Parent?.Style.resolved, DefaultStyle);
            ApplyStyles();
        }

        public virtual void ApplyLayoutStyles() { }

        public virtual void ApplyStyles() { }


        public virtual Graphic GetBackgroundGraphic()
        {
            if (MainGraphic) return MainGraphic;
            return CreateBackgroundGraphic();
        }

        public virtual Graphic CreateBackgroundGraphic()
        {
            var image = GameObject.AddComponent<Image>();
            image.color = Color.clear;

            return MainGraphic = image;
        }

    }
}
