using Facebook.Yoga;
using Jint.Native;
using Jint.Native.Function;
using ReactUnity.EventHandlers;
using ReactUnity.Interop;
using ReactUnity.Layout;
using ReactUnity.StateHandlers;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
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


        public FlexElement Flex { get; private set; }
        public YogaNode Layout { get; private set; }
        public NodeStyle Style { get; private set; }
        public StateStyles StateStyles { get; private set; }

        public BorderAndBackground BorderAndBackground { get; protected set; }
        public MaskAndImage MaskAndImage { get; protected set; }

        public Selectable Selectable { get; protected set; }
        public CanvasGroup CanvasGroup => GameObject.GetComponent<CanvasGroup>();
        public Canvas Canvas => GameObject.GetComponent<Canvas>();


        protected UnityComponent(RectTransform existing, UnityUGUIContext context)
        {
            Context = context;
            GameObject = existing.gameObject;
            RectTransform = existing;

            StateStyles = new StateStyles(this);
            Style = new NodeStyle(DefaultStyle, StateStyles);
            Layout = new YogaNode(DefaultLayout);
        }

        public UnityComponent(UnityUGUIContext context)
        {
            Context = context;
            GameObject = new GameObject();
            RectTransform = GameObject.AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;


            StateStyles = new StateStyles(this);
            Style = new NodeStyle(DefaultStyle, StateStyles);
            Layout = new YogaNode(DefaultLayout);

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

            Style.Parent = parent.Style;
            ResolveStyle(true);
        }


        public virtual void SetEventListener(string eventName, FunctionInstance fun)
        {
            var eventType = EventHandlerMap.GetEventType(eventName);
            if (eventType == null) throw new System.Exception($"Unknown event name specified, '{eventName}'");

            // Remove
            var handler = GameObject.GetComponent(eventType) as IEventHandler;
            handler?.ClearListeners();

            // No event to add
            if (fun == null) return;

            if (handler == null) handler = GameObject.AddComponent(eventType) as IEventHandler;

            System.Action<BaseEventData> callAction = (e) => fun.Invoke(JsValue.FromObject(Context.Engine, e));
            handler.OnEvent += callAction;
        }

        public virtual void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "name":
                    GameObject.name = value?.ToString();
                    return;
                default:
                    throw new System.Exception($"Unknown property name specified, '{propertyName}'");
            }
        }

        public void ScheduleLayout(System.Action callback = null)
        {
            Context.scheduleLayout(callback);
        }

        public virtual void ResolveStyle(bool recursive = false)
        {
            if (Parent == null) return;
            ApplyStyles();
            Style.MarkChangesSeen();
        }

        public virtual void ApplyLayoutStyles()
        {
            ResolveOpacityAndInteractable();
            SetBorderSize();
            SetOverflow();
        }

        public virtual void ApplyStyles()
        {
            ResolveTransform();
            ResolveOpacityAndInteractable();
            SetBackground();
            SetBoxShadow();
            SetZOrder();
            SetBorderRadius();
            SetBorderColor();
            SetOverflow();
            SetCursor();
        }

        protected void ResolveTransform()
        {
            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var pivot = Style.pivot;
            Vector3 deltaPosition = RectTransform.pivot - pivot;    // get change in pivot
            deltaPosition.Scale(RectTransform.rect.size);           // apply sizing
            deltaPosition.Scale(RectTransform.localScale);          // apply scaling
            deltaPosition = RectTransform.rotation * deltaPosition; // apply rotation

            RectTransform.pivot = pivot;                            // change the pivot
            RectTransform.localPosition -= deltaPosition;           // reverse the position change


            // Restore rotation and scale
            var scale = Style.scale;
            RectTransform.localScale = new Vector3(scale.x, scale.y, 1);
            RectTransform.localRotation = Quaternion.Euler(0, 0, Style.rotate);
        }

        protected void ResolveOpacityAndInteractable()
        {
            var opacity = Style.opacity;
            var hidden = Style.hidden;
            var none = Layout.Display == YogaDisplay.None;
            var interaction = Style.interaction;

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

        private void SetOverflow()
        {
            var mask = MaskAndImage;

            // Mask is not defined and there is no need for it
            if (Layout.Overflow == YogaOverflow.Visible && mask == null) return;

            if (mask == null) mask = MaskAndImage = new MaskAndImage(RectTransform);

            mask.SetEnabled(Layout.Overflow != YogaOverflow.Visible);
            mask.SetBorderRadius(Style.borderRadius);
        }

        private void SetCursor()
        {
            if (string.IsNullOrWhiteSpace(Style.cursor)) return;
            var handler = GameObject.GetComponent<CursorHandler>() ?? GameObject.AddComponent<CursorHandler>();
            handler.Cursor = Style.cursor;
        }

        private void SetBackground()
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            var sprite = AssetReference.GetSpriteFromObject(Style.backgroundImage, Context);
            image.SetBackgroundColorAndImage(Style.backgroundColor, sprite);
        }

        private void SetBoxShadow()
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBoxShadow(Style.boxShadow);
        }

        private void SetBorderRadius()
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();

            MainThreadDispatcher.OnUpdate(() =>
            {
                if (!GameObject) return;
                var sprite = BorderGraphic.CreateBorderSprite(Style.borderRadius);
                image.SetBorderImage(sprite);
            });
        }

        private void SetBorderColor()
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBorderColor(Style.borderColor);
        }

        private void SetBorderSize()
        {
            if (!HasBorderOrBackground()) return;

            var image = GetBackgroundGraphic();
            image.SetBorderSize(Layout);
        }

        protected bool HasBorderOrBackground()
        {
            if (BorderAndBackground != null) return true;

            var borderAny = Layout.BorderWidth > 0 || Layout.BorderLeftWidth > 0 || Layout.BorderRightWidth > 0
                || Layout.BorderTopWidth > 0 || Layout.BorderBottomWidth > 0
                || Layout.BorderStartWidth > 0 || Layout.BorderEndWidth > 0;
            if (borderAny) return true;

            if (Style.borderRadius > 0 && Style.borderColor.a > 0) return true;
            if (Style.backgroundColor.a > 0) return true;
            if (Style.backgroundImage != null) return true;
            if (Style.boxShadow != null) return true;

            return false;
        }

        private void SetZOrder()
        {
            var z = Style.zOrder;
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
