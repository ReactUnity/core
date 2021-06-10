using Facebook.Yoga;
using ReactUnity.EventHandlers;
using ReactUnity.Helpers;
using ReactUnity.Layout;
using ReactUnity.StateHandlers;
using ReactUnity.Styling;
using ReactUnity.Types;
using ReactUnity.Visitors;
using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class ReactComponent : BaseReactComponent<UGUIContext>
    {
        public GameObject GameObject { get; private set; }
        public RectTransform RectTransform { get; private set; }
        public ReactElement Component { get; private set; }
        public BorderAndBackground BorderAndBackground { get; protected set; }
        public MaskAndImage MaskAndImage { get; protected set; }

        private Selectable selectable;
        public Selectable Selectable
        {
            get => selectable;
            internal set
            {
                selectable = value;
                UpdateBackgroundGraphic(false, true);
            }
        }
        public CanvasGroup CanvasGroup => GetComponent<CanvasGroup>();
        public Canvas Canvas => GetComponent<Canvas>();

        public RectTransform Container { get; protected set; }

        public string TextContent => new TextContentVisitor().Get(this);
        public override string Name => GameObject.name;

        private bool markedUpdateBackgroundImage;

        protected ReactComponent(UGUIContext context, string tag = "", bool isContainer = true) : base(context, tag, isContainer)
        {
            GameObject = new GameObject();
            RectTransform = AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;

            Component = AddComponent<ReactElement>();
            Component.Layout = Layout;
            Component.Component = this;

            Container = RectTransform;
        }

        protected ReactComponent(RectTransform existing, UGUIContext context, string tag = "", bool isContainer = true) : base(context, tag, isContainer)
        {
            GameObject = existing.gameObject;
            RectTransform = existing;
            Container = existing;
        }

        public override void Update()
        {
            base.Update();
            if (markedUpdateBackgroundImage) UpdateBackgroundImage();
        }

        public override void DestroySelf()
        {
            base.DestroySelf();
            GameObject.DestroyImmediate(GameObject);
        }

        #region Setters

        public override void SetEventListener(string eventName, Callback fun)
        {
            var eventType = EventHandlerMap.GetEventType(eventName);
            if (eventType == null) throw new System.Exception($"Unknown event name specified, '{eventName}'");

            // Remove
            var handler = GameObject.GetComponent(eventType) as IEventHandler;
            handler?.ClearListeners();

            // No event to add
            if (fun == null) return;

            if (handler == null) handler = AddComponent(eventType) as IEventHandler;

            Action<BaseEventData> callAction = (e) => fun.Call(e, this);
            handler.OnEvent += callAction;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "name":
                    GameObject.name = value?.ToString();
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    return;
            }
        }

        #endregion

        #region Style / Layout

        protected override void ApplyLayoutStylesSelf()
        {
            ResolveOpacityAndInteractable();
            SetOverflow();
            UpdateBackgroundGraphic(true, false);
        }

        public override void ApplyStyles()
        {
            base.ApplyStyles();
            ResolveTransform();
            ResolveOpacityAndInteractable();
            SetZIndex();
            SetOverflow();
            SetCursor();
            UpdateBackgroundGraphic(false, true);
        }

        #endregion


        #region Style Functions

        protected void ResolveTransform()
        {
            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var origin = ComputedStyle.transformOrigin;
            var rect = RectTransform.sizeDelta;
            var pivotX = origin.X.Unit == YogaUnit.Percent ? (origin.X.Value / 100) : origin.X.Unit == YogaUnit.Point ? (origin.X.Value / rect.x) : 0.5f;
            var pivotY = origin.Y.Unit == YogaUnit.Percent ? (origin.Y.Value / 100) : origin.Y.Unit == YogaUnit.Point ? (origin.Y.Value / rect.y) : 0.5f;
            var pivot = new Vector2(pivotX, pivotY);
            Vector3 deltaPosition = RectTransform.pivot - pivot;    // get change in pivot
            deltaPosition.Scale(RectTransform.rect.size);           // apply sizing
            deltaPosition.Scale(RectTransform.localScale);          // apply scaling
            deltaPosition = RectTransform.rotation * deltaPosition; // apply rotation

            RectTransform.pivot = pivot;                            // change the pivot
            RectTransform.localPosition -= deltaPosition;           // reverse the position change


            // Restore rotation and scale
            var scale = ComputedStyle.scale;
            RectTransform.localScale = new Vector3(scale.x, scale.y, 1);
            RectTransform.localRotation = Quaternion.Euler(ComputedStyle.rotate);
        }

        protected void ResolveOpacityAndInteractable()
        {
            var opacity = ComputedStyle.opacity;
            var visibility = ComputedStyle.visibility;
            var none = Layout.Display == YogaDisplay.None;
            var interaction = ComputedStyle.pointerEvents;

            if (!visibility || none) opacity = 0;
            if (none) interaction = PointerEvents.None;

            var isTransparent = opacity < 1;
            var isInvisible = opacity == 0;

            var hasInteraction = interaction == PointerEvents.All || (!isInvisible && interaction == PointerEvents.Visible);


            var group = CanvasGroup;
            // Group does not exist and there is no need for it, quit early
            if (!group && !isTransparent && hasInteraction) return;
            if (!group) group = AddComponent<CanvasGroup>();

            group.alpha = opacity;
            group.interactable = hasInteraction;

            if (interaction == PointerEvents.None) group.blocksRaycasts = false;
            else if (isInvisible && interaction == PointerEvents.Visible) group.blocksRaycasts = false;
            else group.blocksRaycasts = true;
        }

        private void SetOverflow()
        {
            var mask = MaskAndImage;

            // Mask is not defined and there is no need for it
            if (Layout.Overflow == YogaOverflow.Visible && mask == null) return;

            if (mask == null) mask = MaskAndImage = MaskAndImage.Create(GameObject);

            mask.SetEnabled(Layout.Overflow != YogaOverflow.Visible);
            mask.SetBorderRadius(ComputedStyle.borderTopLeftRadius, ComputedStyle.borderTopRightRadius, ComputedStyle.borderBottomRightRadius, ComputedStyle.borderBottomLeftRadius);
        }

        private void SetCursor()
        {
            if (string.IsNullOrWhiteSpace(ComputedStyle.cursor)) return;
            var handler = GetOrAddComponent<CursorHandler>();
            handler.Cursor = ComputedStyle.cursor;
        }

        protected bool HasBorderOrBackground()
        {
            if (BorderAndBackground != null) return true;

            var borderAny = Layout.BorderWidth > 0 || Layout.BorderLeftWidth > 0 || Layout.BorderRightWidth > 0
                || Layout.BorderTopWidth > 0 || Layout.BorderBottomWidth > 0
                || Layout.BorderStartWidth > 0 || Layout.BorderEndWidth > 0;
            if (borderAny) return true;

            if (ComputedStyle.borderRadius > 0 && ComputedStyle.borderColor.a > 0) return true;
            if (ComputedStyle.backgroundColor.a > 0) return true;
            if (ComputedStyle.backgroundImage != null) return true;
            if (ComputedStyle.boxShadow != null) return true;

            return false;
        }

        public virtual BorderAndBackground UpdateBackgroundGraphic(bool updateLayout, bool updateStyle)
        {
            if (Selectable)
            {
                Selectable.transition = ComputedStyle.appearance == Appearance.None ? Selectable.Transition.None : Selectable.Transition.ColorTint;
                if (ComputedStyle.navigation != Navigation.Mode.Automatic)
                    Selectable.navigation = new Navigation() { mode = ComputedStyle.navigation };
            }

            if (!HasBorderOrBackground()) return null;

            BorderAndBackground image = BorderAndBackground;

            if (image == null)
            {
                updateStyle = true;
                updateLayout = true;
                image = BorderAndBackground.Create(GameObject);

                if (Selectable) Selectable.targetGraphic = image.Background.GetComponent<Image>();
                BorderAndBackground = image;
            }

            if (updateLayout)
            {
                image.SetBorderSize(Layout);
            }
            if (updateStyle)
            {
                ComputedStyle.backgroundImage.Get(Context, (res) =>
                {
                    Sprite sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);
                    image.SetBackgroundColorAndImage(ComputedStyle.backgroundColor, sprite);
                });
                image.SetBoxShadow(ComputedStyle.boxShadow);
                markedUpdateBackgroundImage = true;

                image.SetBorderColor(ComputedStyle.borderTopColor, ComputedStyle.borderRightColor, ComputedStyle.borderBottomColor, ComputedStyle.borderLeftColor);
                image.SetBorderRadius(ComputedStyle.borderTopLeftRadius, ComputedStyle.borderTopRightRadius, ComputedStyle.borderBottomRightRadius, ComputedStyle.borderBottomLeftRadius);
            }

            return image;
        }

        private void SetZIndex()
        {
            var z = ComputedStyle.zIndex;
            Canvas canvas = Canvas;
            if (!canvas && z == 0) return;
            if (!canvas)
            {
                canvas = AddComponent<Canvas>();
                AddComponent<GraphicRaycaster>();
            }

            canvas.overrideSorting = z != 0;
            canvas.sortingOrder = z;
        }

        private void UpdateBackgroundImage()
        {
            markedUpdateBackgroundImage = false;

            if (!GameObject) return;

            BorderAndBackground.SetBorderRadius(ComputedStyle.borderTopLeftRadius, ComputedStyle.borderTopRightRadius, ComputedStyle.borderBottomRightRadius, ComputedStyle.borderBottomLeftRadius);
        }

        #endregion


        #region UI/Event Utilities

        public Vector2 GetRelativePosition(float x, float y)
        {
            var screenPoint = new Vector2(x, y);
            RectTransformUtility.ScreenPointToLocalPointInRectangle(GameObject.transform as RectTransform, screenPoint, RectTransform.GetComponentInParent<Canvas>().worldCamera, out var pos);
            return pos;
        }

        #endregion


        #region Add/Get Component Utilities

        public override object GetComponent(Type type)
        {
            return GameObject.GetComponent(type);
        }

        public override object AddComponent(Type type)
        {
            if (type == null) return null;

            var requiredComponents = type.GetCustomAttributes(typeof(RequireComponent), true);

            for (int i = 0; i < requiredComponents.Length; i++)
            {
                var cmp = requiredComponents[i];

                if (cmp is RequireComponent req)
                {
                    if (req.m_Type0 != null && !GameObject.GetComponent(req.m_Type0)) AddComponent(req.m_Type0);
                    if (req.m_Type1 != null && !GameObject.GetComponent(req.m_Type1)) AddComponent(req.m_Type1);
                    if (req.m_Type2 != null && !GameObject.GetComponent(req.m_Type2)) AddComponent(req.m_Type2);
                }
            }

            var res = GameObject.AddComponent(type);

            if (typeof(Selectable).IsAssignableFrom(type) && !Selectable) Selectable = res as Selectable;

            return res;
        }

        #endregion

        #region Container Functions

        protected override bool InsertChild(IReactComponent child, int index)
        {
            if (child is ReactComponent u)
            {
                u.RectTransform.SetParent(Container, false);
                if (index >= 0) u.RectTransform.SetSiblingIndex(index);
                return true;
            }
            return false;
        }

        protected override bool DeleteChild(IReactComponent child)
        {
            if (child is ReactComponent u)
            {
                if (u.RectTransform) u.RectTransform.SetParent(null, false);
                return true;
            }
            return false;
        }
        #endregion
    }
}
