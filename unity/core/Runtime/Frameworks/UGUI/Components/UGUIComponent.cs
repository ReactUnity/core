using System;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.Internal;
using ReactUnity.UGUI.StateHandlers;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using Yoga;

namespace ReactUnity.UGUI
{
    public abstract class UGUIComponent : BaseReactComponent<UGUIContext>
    {
        public GameObject GameObject { get; private set; }
        public RectTransform RectTransform { get; private set; }
        public ReactElement Component { get; private set; }
        public BorderAndBackground BorderAndBackground { get; protected set; }
        public MaskAndImage OverflowMask { get; protected set; }
        public ElementFilter ElementFilter { get; protected set; }

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

        public override float ClientWidth => RectTransform.rect.width;
        public override float ClientHeight => RectTransform.rect.height;

        private RectTransform eventViewport;
        public RectTransform EventViewport
        {
            get => eventViewport;
            set
            {
                if (eventViewport == value) return;
                eventViewport = value;
                RefreshEventViewport();
                PropagateEventViewportChange(this, ResolvedEventViewport, true);
            }
        }

        internal RectTransform inheritedEventViewport;
        internal RectTransform InheritedEventViewport
        {
            get => inheritedEventViewport;
            set
            {
                if (inheritedEventViewport == value) return;
                inheritedEventViewport = value;
                if (!eventViewport) RefreshEventViewport();
            }
        }

        public RectTransform ResolvedEventViewport
        {
            get
            {
                if (eventViewport) return eventViewport;
                return inheritedEventViewport;
            }
        }

        protected UGUIComponent(UGUIContext context, string tag = "", bool isContainer = true) : base(context, tag, isContainer)
        {
            RevertCalculator = new UGUIRevertCalculator(this);
            GameObject = context.CreateNativeObject(DefaultName);
            RectTransform = AddComponent<RectTransform>();

            RectTransform.anchorMin = Vector2.up;
            RectTransform.anchorMax = Vector2.up;
            RectTransform.pivot = Vector2.up;

            Component = AddComponent<ReactElement>();
            Component.Layout = Layout;
            Component.Component = this;

            Container = RectTransform;
        }

        protected UGUIComponent(RectTransform existing, UGUIContext context, string tag = "", bool isContainer = true) : base(context, tag, isContainer)
        {
            RevertCalculator = new UGUIRevertCalculator(this);
            GameObject = existing.gameObject;
            RectTransform = existing;
            Container = existing;
            RefreshName();
        }

        protected override void DestroySelf()
        {
            base.DestroySelf();
            if (GameObject) GameObject.Destroy(GameObject);
        }

        public override bool Revive()
        {
            if (!base.Revive()) return false;
            if (!RectTransform) return false;

            RectTransform.SetParent(Context.OffscreenRoot, false);
            return true;
        }

        public override bool Pool()
        {
            if (!base.Pool()) return false;
            if (!RectTransform) return false;

            RectTransform.SetParent(Context.PoolRoot, false);
            return true;
        }


        #region Setters

        public override Action AddEventListener(string eventName, Callback fun)
        {
            var eventType = EventHandlerMap.GetEventType(eventName);
            if (eventType == null)
            {
                return base.AddEventListener(eventName, fun);
            }

            var priorityAttribute = eventType.GetCustomAttributes(typeof(EventHandlerPriorityAttribute), true)[0];
            var priority = priorityAttribute != null ? (priorityAttribute as EventHandlerPriorityAttribute).Priority : EventPriority.Default;

            var handler = GetComponent(eventType) as IEventHandler;
            if (handler == null) handler = AddComponent(eventType) as IEventHandler;

            Action<BaseEventData> callAction = (e) => fun.CallWithPriority(priority, e, this);
            handler.OnEvent += callAction;

            return () => handler.OnEvent -= callAction;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "active":
                    var active = Convert.ToBoolean(value);
                    GameObject.SetActive(active);
                    if (active) SetZIndex();
                    return;
                case "eventViewport":
                    EventViewport = UnityHelpers.ConvertToComponent<RectTransform>(value);
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    return;
            }
        }

        protected override void ApplyName(string resolvedName)
        {
            GameObject.name = resolvedName;
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

            var pos = StylingHelpers.GetStyleEnumCustom(computed, StyleProperties.position);

            // Yoga has neither fixed nor sticky, and each is missing for a different reason. A fixed box
            // is absolute against a containing block Yoga cannot reach, so it is lifted to the host and
            // laid out there. A sticky box stays in flow, so it is relative and the scroll-time offset is
            // applied after layout -- which is why its insets are the one set Yoga is not given.
            IsSticky = pos == PositionType.Sticky;
            SetLiftedToViewport(pos == PositionType.Fixed);

            Layout.PositionType =
                pos == PositionType.Static ? YogaPositionType.Static :
                pos == PositionType.Absolute || pos == PositionType.Fixed || pos == PositionType.Inset ? YogaPositionType.Absolute :
                YogaPositionType.Relative;

            Layout.StyleDirection = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.StyleDirection);
            Layout.FlexDirection = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.FlexDirection);
            Layout.Wrap = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Wrap);
            Layout.FlexGrow = StylingHelpers.GetStyleFloat(computed, LayoutProperties.FlexGrow);
            Layout.FlexShrink = StylingHelpers.GetStyleFloat(computed, LayoutProperties.FlexShrink);

            Layout.Width = StylingHelpers.GetStyleLength(computed, LayoutProperties.Width);
            Layout.Height = StylingHelpers.GetStyleLength(computed, LayoutProperties.Height);
            Layout.FlexBasis = StylingHelpers.GetStyleLength(computed, LayoutProperties.FlexBasis);
            Layout.AspectRatio = StylingHelpers.GetStyleFloat(computed, LayoutProperties.AspectRatio);

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

            // The inline edges, which is what `padding-inline-start` and the rest set. Yoga picks
            // the physical side from the direction the node inherits, and prefers these over the
            // physical edge when both are set -- so a logical value always wins, cascade or not.
            Layout.PaddingStart = StylingHelpers.GetStyleLength(computed, LayoutProperties.PaddingStart);
            Layout.PaddingEnd = StylingHelpers.GetStyleLength(computed, LayoutProperties.PaddingEnd);
            Layout.MarginStart = StylingHelpers.GetStyleLength(computed, LayoutProperties.MarginStart);
            Layout.MarginEnd = StylingHelpers.GetStyleLength(computed, LayoutProperties.MarginEnd);

            // Sticky insets are read back off the computed style at scroll time; handing them over here
            // would shift the box in flow, which is the one thing sticky must never do.
            var undefined = YogaValue.Undefined();
            Layout.Left = IsSticky ? undefined : StylingHelpers.GetStyleLength(computed, LayoutProperties.Left);
            Layout.Right = IsSticky ? undefined : StylingHelpers.GetStyleLength(computed, LayoutProperties.Right);
            Layout.Top = IsSticky ? undefined : StylingHelpers.GetStyleLength(computed, LayoutProperties.Top);
            Layout.Bottom = IsSticky ? undefined : StylingHelpers.GetStyleLength(computed, LayoutProperties.Bottom);
            Layout.Start = IsSticky ? undefined : StylingHelpers.GetStyleLength(computed, LayoutProperties.Start);
            Layout.End = IsSticky ? undefined : StylingHelpers.GetStyleLength(computed, LayoutProperties.End);

            Layout.RowGap = StylingHelpers.GetStyleLength(computed, LayoutProperties.RowGap);
            Layout.ColumnGap = StylingHelpers.GetStyleLength(computed, LayoutProperties.ColumnGap);

            Layout.BorderLeftWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderLeftWidth, LayoutProperties.BorderWidth);
            Layout.BorderRightWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderRightWidth, LayoutProperties.BorderWidth);
            Layout.BorderTopWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderTopWidth, LayoutProperties.BorderWidth);
            Layout.BorderBottomWidth = StylingHelpers.GetStyleFloatDouble(computed, LayoutProperties.BorderBottomWidth, LayoutProperties.BorderWidth);
            Layout.BorderStartWidth = StylingHelpers.GetStyleFloat(computed, LayoutProperties.BorderStartWidth);
            Layout.BorderEndWidth = StylingHelpers.GetStyleFloat(computed, LayoutProperties.BorderEndWidth);

            Layout.Display = StylingHelpers.DisplayOf(StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Display));
            Layout.BoxSizing = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.BoxSizing);
            Layout.Overflow = LayoutProperties.CombineOverflow(
                StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Overflow),
                LayoutProperties.CombineOverflow(computed.overflowX, computed.overflowY));

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
            SetFilter();
        }

        protected void SetFilter()
        {
            var filter = ComputedStyle.filter;

            if (filter == null || filter.Equals(FilterDefinition.Default))
            {
                if (ElementFilter) ElementFilter.Detach();
                ElementFilter = null;
                return;
            }

            if (!ElementFilter) ElementFilter = ElementFilter.Create(this, filter);
            else ElementFilter.Definition = filter;
        }

        #endregion


        #region Positioning

        /// <summary>Whether <c>position: sticky</c> holds this box, which <see cref="ReactElement"/> acts on.</summary>
        internal bool IsSticky { get; private set; }

        public override ScrollEdge StuckEdges =>
            IsSticky && StickyPosition.TryResolve(this, out _, out var stuck) ? stuck : ScrollEdge.None;

        private YogaNode viewportPlaceholder;

        /// <summary>
        /// The node holding this element's slot among its parent's layout children. Normally its own, but a
        /// <c>position: fixed</c> element -- like a portal -- leaves a hidden stand-in behind while its real
        /// node hangs off the host.
        /// </summary>
        internal virtual YogaNode LayoutInParent => viewportPlaceholder ?? Layout;

        /// <summary>Whether this element's transform lives somewhere other than under its parent's container.</summary>
        internal virtual bool TransformDetached => viewportPlaceholder != null;

        /// <summary>
        /// Moves the element to the host and back, which is what makes <c>position: fixed</c> fixed: the
        /// viewport becomes its containing block, and it stops being scrolled or clipped by anything in
        /// between. The React tree is untouched, so inherited style, states and events all still follow it.
        /// </summary>
        /// <remarks>
        /// The same trick <see cref="PortalComponent"/> plays, and with the same two consequences. A lifted
        /// element no longer inherits an ancestor's <c>opacity</c>, <c>transform</c> or <c>filter</c> -- for
        /// the first two that is closer to CSS than staying put, since a transformed ancestor is not its
        /// containing block here. And with no insets it lands at the viewport's origin rather than at the
        /// static position it left behind, which layout does not keep.
        /// </remarks>
        private void SetLiftedToViewport(bool lifted)
        {
            if (lifted == (viewportPlaceholder != null)) return;
            // The host is the viewport, so it has nowhere to lift to; nor does a detached element.
            if (this is IHostComponent || Layout == null) return;
            if (!(Parent is UGUIComponent parent) || parent.Layout == null) return;

            var host = Context.Host as UGUIComponent;
            if (host?.Layout == null || host == this) return;

            if (lifted)
            {
                var placeholder = viewportPlaceholder = new YogaNode { Display = YogaDisplay.None, Data = this };
                Swap(parent.Layout, Layout, placeholder);

                host.Layout.AddChild(Layout);
                RectTransform.SetParent(host.Container, false);
            }
            else
            {
                var placeholder = viewportPlaceholder;
                viewportPlaceholder = null;

                Layout.Parent?.RemoveChild(Layout);
                Swap(parent.Layout, placeholder, Layout);

                parent.RestoreChildTransform(this);
            }
        }

        /// <summary>Puts <paramref name="replacement"/> where <paramref name="node"/> stands, or appends it.</summary>
        private static void Swap(YogaNode parent, YogaNode node, YogaNode replacement)
        {
            if (parent == null) return;

            var index = parent.IndexOf(node);
            if (index < 0)
            {
                parent.AddChild(replacement);
                return;
            }

            parent.RemoveAt(index);
            parent.Insert(index, replacement);
        }

        /// <summary>
        /// Puts a child's transform back under this container at the sibling position its order asks for.
        /// </summary>
        internal void RestoreChildTransform(UGUIComponent child)
        {
            if (!child.RectTransform) return;
            child.RectTransform.SetParent(Container, false);

            var index = Children == null ? -1 : Children.IndexOf(child);
            if (index < 0) return;

            // SetParent appended it, so it only has to move if a later sibling is standing in front of it.
            for (int i = index + 1; i < Children.Count; i++)
            {
                if (!(Children[i] is UGUIComponent next) || !next.RectTransform) continue;
                if (next.RectTransform.parent != Container) continue;
                child.RectTransform.SetSiblingIndex(next.RectTransform.GetSiblingIndex());
                return;
            }
        }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            // Put the element back before the tree moves under it, or the stand-in is left in a parent that
            // will never hear of it again. The next layout pass lifts it out of the new parent instead.
            SetLiftedToViewport(false);
            base.SetParent(newParent, relativeTo, insertAfter);
        }

        #endregion


        #region Style Functions

        protected virtual void ResolveTransform()
        {
            var style = ComputedStyle;
            if (Component)
            {
                Component.Translate = style.translate;
                Component.TranslateZ = style.translateZ;
                Component.PositionType = style.position;
            }

            // Reset rotation and scale before setting pivot
            RectTransform.localScale = Vector3.one;
            RectTransform.localRotation = Quaternion.identity;


            var origin = style.transformOrigin;
            var rect = RectTransform.sizeDelta;
            var pivotX = origin.X.Unit == YogaUnit.Percent ? (origin.X.Value / 100) : origin.X.Unit == YogaUnit.Point ? (origin.X.Value / rect.x) : 0.5f;
            var pivotY = origin.Y.Unit == YogaUnit.Percent ? (origin.Y.Value / 100) : origin.Y.Unit == YogaUnit.Point ? (origin.Y.Value / rect.y) : 0.5f;
            var pivot = new Vector2(pivotX, 1 - pivotY);
            Vector3 deltaPosition = RectTransform.pivot - pivot;    // get change in pivot
            deltaPosition.Scale(RectTransform.rect.size);           // apply sizing
            deltaPosition.Scale(RectTransform.localScale);          // apply scaling
            deltaPosition = RectTransform.localRotation * deltaPosition; // apply rotation

            RectTransform.pivot = pivot;                            // change the pivot
            RectTransform.localPosition -= deltaPosition;           // reverse the position change


            // Restore rotation and scale
            RectTransform.localScale = style.scale;
            RectTransform.localRotation = StylingHelpers.RotationOf(style.rotate);
        }

        protected void ResolveOpacityAndInteractable()
        {
            var opacity = ComputedStyle.opacity;
            var visibility = ComputedStyle.visibility;
            var none = Layout.Display == YogaDisplay.None;
            var interaction = ComputedStyle.pointerEvents;
            var isolated = ComputedStyle.isolation == Isolation.Isolate;

            if (!visibility || none) opacity = 0;
            if (none) interaction = PointerEvents.None;

            var isTransparent = opacity < 1;
            var isInvisible = opacity == 0;

            var hasInteraction = interaction == PointerEvents.All || (!isInvisible && interaction == PointerEvents.Visible);


            var group = CanvasGroup;
            // Group does not exist and there is no need for it, quit early
            if (!group && !isolated && !isTransparent && hasInteraction) return;
            if (!group) group = AddComponent<CanvasGroup>();

            group.ignoreParentGroups = isolated;
            group.alpha = opacity;
            group.interactable = hasInteraction;

            if (interaction == PointerEvents.None) group.blocksRaycasts = false;
            else if (isInvisible && interaction == PointerEvents.Visible) group.blocksRaycasts = false;
            else group.blocksRaycasts = true;
        }

        private void SetOverflow()
        {
            var computed = ComputedStyle;
            var mask = OverflowMask;
            // A mask clips both axes, so hiding one axis clips the other too -- the closest a RectMask2D gets.
            var hasMask = StylingHelpers.GetStyleEnumCustom(computed, LayoutProperties.Overflow) == YogaOverflow.Hidden
                || computed.overflowX == YogaOverflow.Hidden || computed.overflowY == YogaOverflow.Hidden;

            // Mask is not defined and there is no need for it
            if (!hasMask && mask == null) return;

            if (mask == null) mask = OverflowMask = MaskAndImage.Create(GameObject, Context);

            mask.SetEnabled(hasMask);
            mask.SetBorderRadius(computed.borderTopLeftRadius, computed.borderTopRightRadius, computed.borderBottomRightRadius, computed.borderBottomLeftRadius);
        }

        private void SetCursor()
        {
            var cursor = ComputedStyle.cursor;
            var handler = GetComponent<CursorHandler>();

            if ((cursor == null || !cursor.Any) && handler == null) return;
            if (!handler)
            {
                handler = AddComponent<CursorHandler>();
                handler.Context = Context;
                handler.Component = this;
                handler.enabled = true;

                handler.CursorShown = StateStyles.GetState("hover") || StateStyles.GetState("link-hover");
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

            if (ComputedStyle.pointerEvents == PointerEvents.All) return true;

            if (ComputedStyle.backgroundColor.a > 0) return true;
            if (ComputedStyle.HasValue(StyleProperties.backgroundImage)) return true;
            if (ComputedStyle.HasValue(StyleProperties.maskImage)) return true;
            if (ComputedStyle.HasValue(StyleProperties.boxShadow)) return true;
            if (ComputedStyle.HasValue(StyleProperties.filter)) return true;
            if (ComputedStyle.HasValue(StyleProperties.backdropFilter)) return true;
            if (!(ComputedStyle.borderTopLeftRadius.IsZero() && ComputedStyle.borderTopRightRadius.IsZero() &&
                ComputedStyle.borderBottomRightRadius.IsZero() && ComputedStyle.borderBottomLeftRadius.IsZero())) return true;

            return false;
        }

        public virtual BorderAndBackground UpdateBackgroundGraphic(bool updateLayout, bool updateStyle)
        {
            if (ComputedStyle == null) return null;

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
                image = CreateBorderAndBackground();
            }

            if (updateLayout)
            {
                image.UpdateLayout(Layout);
            }
            if (updateStyle)
            {
                image.UpdateStyle(ComputedStyle);
            }

            return image;
        }

        protected BorderAndBackground CreateBorderAndBackground()
        {
            var image = BorderAndBackground.Create(GameObject, this, (x => Container = x));
            if (Selectable && Selectable.targetGraphic == null)
                Selectable.targetGraphic = image.BgImage;
            return BorderAndBackground = image;
        }

        private void SetZIndex()
        {
            if (ComputedStyle == null) return;
            var z = ComputedStyle.zIndex;
            var layer = ComputedStyle.sortingLayer;
            var zIsDefault = !z.HasValue;
            var layerIsDefault = !layer.HasValue || layer.Value.value == 0 || !SortingLayer.IsValid(layer.Value.id);
            var defaultSorting = zIsDefault && layerIsDefault;
            Canvas canvas = Canvas;
            if (!canvas && defaultSorting) return;
            if (!canvas) canvas = InitializeCanvas();

            canvas.overrideSorting = !defaultSorting;
            if (!zIsDefault) canvas.sortingOrder = z.Value;
            if (!layerIsDefault) canvas.sortingLayerID = layer.Value.id;
        }

        protected Canvas InitializeCanvas()
        {
            if (Destroyed) return null;

            var canvas = AddComponent<Canvas>();
            var root = Context.RootCanvas;
            if (root)
            {
                canvas.additionalShaderChannels = root.additionalShaderChannels;
                canvas.referencePixelsPerUnit = root.referencePixelsPerUnit;
                canvas.normalizedSortingGridSize = root.normalizedSortingGridSize;


                if (root.sortingOrder != 0 || root.sortingLayerID != 0)
                {
                    canvas.overrideSorting = true;
                    canvas.sortingLayerID = root.sortingLayerID;
                    canvas.sortingOrder = root.sortingOrder;
                }

                canvas.pixelPerfect = root.pixelPerfect;

                canvas.targetDisplay = root.targetDisplay;

                if (!canvas.worldCamera)
                {
                    canvas.worldCamera = root.worldCamera;
                }

#if UNITY_2022_1_OR_NEWER
                canvas.updateRectTransformForStandalone = root.updateRectTransformForStandalone;
#endif
            }

            var resolvedEventViewport = ResolvedEventViewport;
            if (resolvedEventViewport)
            {
                var crc = GetOrAddComponent<CustomViewportRaycaster>();
                crc.EventViewport = resolvedEventViewport;
            }
            else
            {
                GetOrAddComponent<GraphicRaycaster>();
            }
            return canvas;
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

        public Rect GetBoundingClientRect() => StylingHelpers.GetScreenClientRect(RectTransform);

        #endregion


        #region Add/Get Component Utilities

        public override object GetComponent(Type type)
        {
            GameObject.TryGetComponent(type, out var res);
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

        /// <summary>
        /// Hosts a graphic on a full-stretch child of the element instead of on its own object. UGUI paints
        /// an object before its children, so a graphic on the element itself would sit under the background
        /// and border objects; a child added first stays last, since those are inserted at the front.
        /// </summary>
        protected T CreateGraphicChild<T>(string name) where T : Component
        {
            var go = Context.CreateNativeObject(name, typeof(RectTransform), typeof(T));
            var rt = go.transform as RectTransform;
            rt.SetParent(RectTransform, false);
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.pivot = new Vector2(0.5f, 0.5f);
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;
            return go.GetComponent<T>();
        }

        #region Container Functions

        protected override bool InsertChild(IReactComponent child, int index)
        {
            if (child is UGUIComponent u)
            {
                u.RectTransform.SetParent(Container, false);

                var vp = ResolvedEventViewport;
                if (vp) PropagateEventViewportChange(u, vp, false);

                if (index >= 0)
                {
                    if (Children.Count > index)
                    {
                        var siblingIndex = (Children[index] as UGUIComponent).RectTransform.GetSiblingIndex();
                        u.RectTransform.SetSiblingIndex(siblingIndex);
                    }
                }
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

        public override bool UpdateOrder(int prev, int current)
        {
            var siblings = Parent.Layout;
            var count = siblings.Count;
            var currentIndex = -1;
            // A lifted element keeps its slot here through a stand-in, so that is the node to move.
            var layout = LayoutInParent;

            for (int i = 0; i < count; i++)
            {
                var sb = siblings[i];

                if (sb == layout)
                {
                    currentIndex = i;
                    break;
                }
            }

            var expectedIndex = currentIndex;

            if (current > prev)
            {
                for (int i = currentIndex + 1; i < count; i++)
                {
                    var sb = siblings[i].Data as IReactComponent;
                    if (sb.CurrentOrder > current || (sb.CurrentOrder == current && sb.ParentIndex > ParentIndex)) break;
                    expectedIndex = i;
                }
            }
            else
            {
                for (int i = currentIndex - 1; i >= 0; i--)
                {
                    var sb = siblings[i].Data as IReactComponent;
                    if (sb.CurrentOrder < current || (sb.CurrentOrder == current && sb.ParentIndex < ParentIndex)) break;
                    expectedIndex = i;
                }
            }

            var hasUpdate = false;

            if (expectedIndex != currentIndex)
            {
                siblings.RemoveAt(currentIndex);
                siblings.Insert(expectedIndex, layout);
                hasUpdate = true;
            }

            // Nothing below reorders anything: this element's transform is not among the parent's.
            if (TransformDetached) return hasUpdate;

            var next = NextAttachedSibling(siblings, expectedIndex + 1);

            if (next != null)
            {
                var newInd = next.RectTransform.GetSiblingIndex();
                var oldInd = RectTransform.GetSiblingIndex();
                if (newInd > oldInd) newInd--;

                if (newInd != oldInd)
                {
                    RectTransform.SetSiblingIndex(newInd);
                    hasUpdate = true;
                }
            }
            else
            {
                var oldInd = RectTransform.GetSiblingIndex();

                if (AfterPseudo != null)
                {
                    var newInd = (AfterPseudo as UGUIComponent).RectTransform.GetSiblingIndex();

                    if (newInd != oldInd)
                    {
                        RectTransform.SetSiblingIndex(newInd);
                        hasUpdate = true;
                    }
                }
                else
                {
                    if (oldInd != RectTransform.parent.childCount - 1)
                    {
                        RectTransform.SetAsLastSibling();
                        hasUpdate = true;
                    }
                }
            }

            return hasUpdate;
        }

        /// <summary>
        /// The first sibling from <paramref name="index"/> on whose transform is actually under the shared
        /// container, so a lifted one is stepped over rather than measured where it no longer is.
        /// </summary>
        private UGUIComponent NextAttachedSibling(YogaNode siblings, int index)
        {
            var parentContainer = RectTransform.parent;

            for (int i = index; i < siblings.Count; i++)
            {
                if (!(siblings[i].Data is UGUIComponent sibling)) continue;
                if (sibling.TransformDetached || !sibling.RectTransform) continue;
                if (sibling.RectTransform.parent != parentContainer) continue;
                return sibling;
            }

            return null;
        }

        protected void PropagateEventViewportChange(UGUIComponent cmp, RectTransform vp, bool skipSelf)
        {
            cmp.Accept(new EventViewportVisitor(vp), skipSelf);
        }

        protected void RefreshEventViewport()
        {
            var resolved = ResolvedEventViewport;

            var canvas = Canvas;

            if (canvas)
            {
                var crc = GetComponent<CustomViewportRaycaster>();

                if (!crc)
                {
                    if (!resolved) return;

                    var rc = GetComponent<GraphicRaycaster>();
                    GameObject.DestroyImmediate(rc);
                    crc = AddComponent<CustomViewportRaycaster>();
                }

                crc.EventViewport = resolved;
            }
            else
            {
                if (!eventViewport) return;

                InitializeCanvas();
            }
        }
        #endregion
    }
}
