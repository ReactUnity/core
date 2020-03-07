using Facebook.Yoga;
using ReactUnity.Interop;
using ReactUnity.Layout;
using ReactUnity.Styling;
using ReactUnity.Types;
using System.Linq;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class UnityComponent
    {
        public UnityUGUIContext Context { get; }
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

        public BorderAndBackground BorderAndBackground { get; protected set; }
        public MaskAndImage MaskAndImage { get; protected set; }
        public Selectable Selectable { get; protected set; }

        public CanvasGroup CanvasGroup => GameObject.GetComponents<CanvasGroup>().FirstOrDefault();
        public Canvas Canvas => GameObject.GetComponents<Canvas>().FirstOrDefault();


        protected UnityComponent(RectTransform existing, UnityUGUIContext context)
        {
            Context = context;
            GameObject = existing.gameObject;
            RectTransform = existing;

            Style = new NodeStyle();
            Layout = new YogaNode();
            ResetLayout();
        }

        public UnityComponent(UnityUGUIContext context)
        {
            Context = context;
            GameObject = new GameObject();
            RectTransform = GameObject.AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;


            Style = new NodeStyle();
            Layout = new YogaNode();
            ResetLayout();
            Flex = GameObject.AddComponent<FlexElement>();
            Flex.Layout = Layout;
            Flex.Style = Style;
            Flex.Component = this;
        }

        public virtual void Destroy()
        {
            GameObject.DestroyImmediate(GameObject);
            Parent.Children.Remove(this);
            Parent.Layout.RemoveChild(Layout);
        }

        public virtual void SetParent(ContainerComponent parent, UnityComponent insertBefore = null, bool insertAfter = false)
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
                if (insertAfter) ind++;

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

            Style.MarkChangesSeen();
        }

        public virtual void ApplyLayoutStyles()
        {
            ResolveOpacityAndInteractable();
            SetBorderSize(Layout.BorderWidth);
            SetOverflow();
        }

        public virtual void ApplyStyles()
        {
            ResolveTransform();
            ResolveOpacityAndInteractable();
            SetBackgroundColor(Style.resolved.backgroundColor);
            SetBackgroundImage();
            SetZOrder(Style.resolved.zOrder);
            SetBorderRadius(Style.resolved.borderRadius);
            SetBorderColor(Style.resolved.borderColor);
            SetOverflow();
        }

        protected void ResolveTransform()
        {
            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var pivot = Style.resolved.pivot;
            Vector3 deltaPosition = RectTransform.pivot - pivot;    // get change in pivot
            deltaPosition.Scale(RectTransform.rect.size);           // apply sizing
            deltaPosition.Scale(RectTransform.localScale);          // apply scaling
            deltaPosition = RectTransform.rotation * deltaPosition; // apply rotation

            RectTransform.pivot = pivot;                            // change the pivot
            RectTransform.localPosition -= deltaPosition;           // reverse the position change


            // Restore rotation and scale
            RectTransform.localScale = new Vector3(Style.resolved.scale.x, Style.resolved.scale.y, 1);
            RectTransform.localRotation = Quaternion.Euler(0, 0, Style.resolved.rotate);
        }

        protected void ResolveOpacityAndInteractable()
        {
            var opacity = Style.resolved.opacity;
            var hidden = Style.resolved.hidden;
            var none = Layout.Display == YogaDisplay.None;
            var interaction = Style.resolved.interaction;

            if (hidden || none) opacity = 0;
            if (none) interaction = InteractionType.Ignore;

            var isTransparent = opacity < 1;
            var isInvisible = opacity == 0;

            var hasInteraction = interaction == InteractionType.Always || (!isInvisible && interaction == InteractionType.WhenVisible);


            var group = CanvasGroup;
            // Group does not exist and there is no need for it, quit early
            if (!group && !isTransparent && hasInteraction) return;
            if (!group) group = GameObject.AddComponent<CanvasGroup>();

            group.alpha = opacity;
            group.interactable = hasInteraction;

            if (interaction == InteractionType.Ignore) group.blocksRaycasts = false;
            else if (isInvisible && interaction == InteractionType.WhenVisible) group.blocksRaycasts = false;
            else group.blocksRaycasts = true;
        }


        public virtual BorderAndBackground GetBackgroundGraphic()
        {
            if (BorderAndBackground != null) return BorderAndBackground;

            var image = new BorderAndBackground(RectTransform);

            if (Selectable) Selectable.targetGraphic = image.Background.GetComponent<Image>();

            return BorderAndBackground = image;
        }

        public virtual void SetOverflow()
        {
            var mask = MaskAndImage;

            // Mask is not defined and there is no need for it
            if (Layout.Overflow == YogaOverflow.Visible && mask == null) return;

            if (mask == null) mask = MaskAndImage = new MaskAndImage(RectTransform);

            mask.SetEnabled(Layout.Overflow != YogaOverflow.Visible);
            mask.SetBorderRadius(Style.resolved.borderRadius);
        }

        protected virtual void SetBackgroundColor(Color? color)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBackgroundColor(color ?? Color.clear);
        }

        protected virtual void SetBackgroundImage()
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            var sprite = AssetReference.GetSpriteFromObject(Style.resolved.backgroundImage, Context);
            image.SetBackgroundImage(sprite);
        }

        protected virtual void SetBorderRadius(int radius)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();

            MainThreadDispatcher.OnUpdate(() =>
            {
                if (!GameObject) return;
                var sprite = BorderGraphic.CreateBorderSprite(radius);
                image.SetBorderImage(sprite);
            });
        }

        protected virtual void SetBorderColor(Color? color)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBorderColor(color ?? Color.clear);
        }

        protected virtual void SetBorderSize(float size)
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBorderSize(size);
        }

        protected bool HasBorderOrBackground()
        {
            if (BorderAndBackground != null) return true;

            var borderSize = Layout.BorderWidth;
            if (borderSize > 0 && !float.IsNaN(borderSize)) return true;

            var resolved = Style.resolved;
            if (resolved.borderRadius > 0 && resolved.borderColor.HasValue) return true;
            if (resolved.backgroundColor.HasValue) return true;
            if (resolved.backgroundImage != null) return true;

            return false;
        }

        protected virtual void SetZOrder(int z)
        {
            Canvas canvas = Canvas;
            if (!canvas && z == 0) return;
            if (!canvas)
            {
                canvas = GameObject.AddComponent<Canvas>();
                GameObject.AddComponent<GraphicRaycaster>();
            }

            canvas.overrideSorting = true;
            canvas.sortingOrder = z;
        }
    }
}
