using System;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Internal;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.StateHandlers;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class UGUIComponent : BaseReactComponent<UGUIContext>
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

        public override string Name
        {
            get => GameObject.name;
            set
            {
                if (!string.IsNullOrWhiteSpace(value)) GameObject.name = value;
                else if (!string.IsNullOrWhiteSpace(DefaultName)) GameObject.name = DefaultName;
            }
        }

        private bool markedUpdateBackgroundImage;

        protected UGUIComponent(UGUIContext context, string tag = "", bool isContainer = true) : base(context, tag, isContainer)
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
            Name = null;
        }

        protected UGUIComponent(RectTransform existing, UGUIContext context, string tag = "", bool isContainer = true) : base(context, tag, isContainer)
        {
            GameObject = existing.gameObject;
            RectTransform = existing;
            Container = existing;
            Name = null;
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
            if (eventType == null)
            {
                base.SetEventListener(eventName, fun);
                return;
            }

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
                case "active":
                    var active = Convert.ToBoolean(value);
                    GameObject.SetActive(active);
                    if (active) SetZIndex();
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
            ApplyYogaValues();
            ResolveOpacityAndInteractable();
            SetOverflow();
            UpdateBackgroundGraphic(true, false);
        }

        protected void ApplyYogaValues()
        {
            var computed = ComputedStyle;
            Layout.FlexDirection = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.FlexDirection);
            Layout.Wrap = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Wrap);
            Layout.FlexGrow = StylingHelpers.GetStyleFloat(computed, LayoutProperties.FlexGrow);
            Layout.FlexShrink = StylingHelpers.GetStyleFloat(computed, LayoutProperties.FlexShrink);

            Layout.Width = StylingHelpers.GetStyleLength(computed, LayoutProperties.Width);
            Layout.Height = StylingHelpers.GetStyleLength(computed, LayoutProperties.Height);
            Layout.FlexBasis = StylingHelpers.GetStyleLength(computed, LayoutProperties.FlexBasis);

            Layout.MinWidth = StylingHelpers.GetStyleLength(computed, LayoutProperties.MinWidth);
            Layout.MinHeight = StylingHelpers.GetStyleLength(computed, LayoutProperties.MinHeight);
            Layout.MaxWidth = StylingHelpers.GetStyleLength(computed, LayoutProperties.MaxWidth);
            Layout.MaxHeight = StylingHelpers.GetStyleLength(computed, LayoutProperties.MaxHeight);

            Layout.PaddingBottom = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.PaddingBottom, LayoutProperties.PaddingVertical, LayoutProperties.Padding);
            Layout.PaddingTop = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.PaddingTop, LayoutProperties.PaddingVertical, LayoutProperties.Padding);
            Layout.PaddingLeft = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.PaddingLeft, LayoutProperties.PaddingHorizontal, LayoutProperties.Padding);
            Layout.PaddingRight = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.PaddingRight, LayoutProperties.PaddingHorizontal, LayoutProperties.Padding);

            Layout.MarginBottom = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.MarginBottom, LayoutProperties.MarginVertical, LayoutProperties.Margin);
            Layout.MarginTop = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.MarginTop, LayoutProperties.MarginVertical, LayoutProperties.Margin);
            Layout.MarginLeft = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.MarginLeft, LayoutProperties.MarginHorizontal, LayoutProperties.Margin);
            Layout.MarginRight = StylingHelpers.GetStyleLengthTriple(computed, LayoutProperties.MarginRight, LayoutProperties.MarginHorizontal, LayoutProperties.Margin);

            Layout.Left = StylingHelpers.GetStyleLength(computed, LayoutProperties.Left);
            Layout.Right = StylingHelpers.GetStyleLength(computed, LayoutProperties.Right);
            Layout.Top = StylingHelpers.GetStyleLength(computed, LayoutProperties.Top);
            Layout.Bottom = StylingHelpers.GetStyleLength(computed, LayoutProperties.Bottom);

            Layout.BorderLeftWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderLeftWidth, LayoutProperties.BorderWidth);
            Layout.BorderRightWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderRightWidth, LayoutProperties.BorderWidth);
            Layout.BorderTopWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderTopWidth, LayoutProperties.BorderWidth);
            Layout.BorderBottomWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderBottomWidth, LayoutProperties.BorderWidth);

            Layout.Display = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Display);
            Layout.PositionType = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.PositionType);
            Layout.Overflow = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Overflow);

            Layout.AlignContent = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.AlignContent);
            Layout.AlignItems = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.AlignItems);
            Layout.AlignSelf = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.AlignSelf);
            Layout.JustifyContent = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.JustifyContent);
        }

        protected override void ApplyStylesSelf()
        {
            ResolveTransform();
            ResolveOpacityAndInteractable();
            SetZIndex();
            SetOverflow();
            SetCursor();
            UpdateBackgroundGraphic(false, true);
        }

        public override void Relayout() => Layout.MarkDirty();

        #endregion


        #region Style Functions

        protected void ResolveTransform()
        {
            var style = ComputedStyle;
            if (Component) Component.Translate = style.translate;

            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var origin = style.transformOrigin;
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
            var scale = style.scale;
            RectTransform.localScale = new Vector3(scale.x, scale.y, 1);
            RectTransform.localRotation = Quaternion.Euler(style.rotate);
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
            var maskImage = ComputedStyle.maskImage;

            var hasImage = maskImage != null && maskImage != ImageReference.None;
            var hasMask = Layout.Overflow != YogaOverflow.Visible || hasImage;

            // Mask is not defined and there is no need for it
            if (!hasMask && mask == null) return;

            if (mask == null) mask = MaskAndImage = MaskAndImage.Create(GameObject, Context);

            mask.SetMaskImage(maskImage);
            mask.SetEnabled(hasMask);
            mask.SetBorderRadius(ComputedStyle.borderTopLeftRadius, ComputedStyle.borderTopRightRadius, ComputedStyle.borderBottomRightRadius, ComputedStyle.borderBottomLeftRadius);
        }

        private void SetCursor()
        {
            var cursor = ComputedStyle.cursor;
            var handler = GetComponent<CursorHandler>();
            if (cursor == null && handler == null) return;
            if (!handler)
            {
                handler = AddComponent<CursorHandler>();
                handler.Context = Context;
                handler.Component = this;
                handler.enabled = true;
            }
            handler.Cursor = ComputedStyle.cursor;
        }

        protected bool HasBorderOrBackground()
        {
            if (BorderAndBackground != null) return true;

            var borderAny = Layout.BorderWidth > 0 || Layout.BorderLeftWidth > 0 || Layout.BorderRightWidth > 0
                || Layout.BorderTopWidth > 0 || Layout.BorderBottomWidth > 0
                || Layout.BorderStartWidth > 0 || Layout.BorderEndWidth > 0;
            if (borderAny) return true;

            if (ComputedStyle.backgroundColor.a > 0) return true;
            if (ComputedStyle.backgroundImage != null) return true;
            if (ComputedStyle.boxShadow != null) return true;
            if (ComputedStyle.borderTopLeftRadius > 0 || ComputedStyle.borderTopRightRadius > 0 ||
                ComputedStyle.borderBottomRightRadius > 0 || ComputedStyle.borderBottomLeftRadius > 0) return true;

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
                if (ComputedStyle.HasValue(StyleProperties.backgroundImage))
                {
                    image.SetBackgroundColorAndImage(Color.clear, null);
                    ComputedStyle.backgroundImage.Get(Context, (res) => {
                        Sprite sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);

                        if (ComputedStyle.HasValue(StyleProperties.backgroundColor)) image.SetBackgroundColorAndImage(ComputedStyle.backgroundColor, sprite);
                        else image.SetBackgroundColorAndImage(Color.white, sprite);
                    });
                }
                else image.SetBackgroundColorAndImage(ComputedStyle.backgroundColor, null);
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
            var rt = GameObject.transform as RectTransform;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(rt, screenPoint, RectTransform.GetComponentInParent<Canvas>().worldCamera, out var pos);

            var midx = rt.pivot.x * rt.rect.width;
            var midy = rt.pivot.y * rt.rect.height;
            return new Vector2(pos.x + midx, rt.rect.height - (pos.y + midy));
        }

        public Rect GetBoundingClientRect()
        {
            var transform = RectTransform;
            Vector2 size = Vector2.Scale(transform.rect.size, transform.lossyScale);
            Rect rect = new Rect(transform.position.x, Screen.height - transform.position.y, size.x, size.y);
            rect.x -= (transform.pivot.x * size.x);
            rect.y -= ((1.0f - transform.pivot.y) * size.y);
            return rect;
        }

        #endregion


        #region Add/Get Component Utilities

        public override object GetComponent(Type type)
        {
            var res = GameObject.GetComponent(type);
            if (res is MonoBehaviour mn && !mn.enabled) mn.enabled = true;
            return res;
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
            if (child is UGUIComponent u)
            {
                u.RectTransform.SetParent(Container, false);
                if (index >= 0) u.RectTransform.SetSiblingIndex(index);
                return true;
            }
            return false;
        }

        protected override bool DeleteChild(IReactComponent child)
        {
            if (child is UGUIComponent u)
            {
                if (u.RectTransform) u.RectTransform.SetParent(null, false);
                return true;
            }
            return false;
        }
        #endregion
    }
}
