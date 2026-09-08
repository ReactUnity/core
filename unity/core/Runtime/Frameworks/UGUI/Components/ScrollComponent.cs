using System;

using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using Yoga;
using MovementType = UnityEngine.UI.ScrollRect.MovementType;
using ScrollbarVisibility = UnityEngine.UI.ScrollRect.ScrollbarVisibility;

namespace ReactUnity.UGUI
{
    public class ScrollComponent : UGUIComponent
    {
        public SmoothScrollRect ScrollRect { get; private set; }

        public ScrollContentResizer ContentResizer { get; private set; }

        public ScrollbarComponent HorizontalScrollbar { get; private set; }
        public ScrollbarComponent VerticalScrollbar { get; private set; }

        public override float ScrollWidth => ScrollRect.ScrollWidth;
        public override float ScrollHeight => ScrollRect.ScrollHeight;

        public override bool IsScrollContainer => true;

        public override float ScrollLeft
        {
            get => ScrollRect.ScrollLeft;
            set => ScrollRect.ScrollLeft = value;
        }

        public override float ScrollTop
        {
            get => ScrollRect.ScrollTop;
            set => ScrollRect.ScrollTop = value;
        }

        public ScrollComponent(UGUIContext ctx) : base(ctx, "scroll")
        {
            ScrollRect = AddComponent<SmoothScrollRect>();

            var viewport = ctx.CreateNativeObject("[ScrollViewport]", typeof(RectTransform), typeof(RectMask2D)).GetComponent<RectTransform>();
            viewport.SetParent(RectTransform, false);

            viewport.anchorMin = Vector2.zero;
            viewport.anchorMax = Vector2.one;
            viewport.sizeDelta = Vector2.zero;
            viewport.pivot = Vector2.up;
            viewport.offsetMin = new Vector2(0, -1);
            viewport.offsetMax = new Vector2(1, 0);

            // Make element clickable in everywhere
            var vpImage = viewport.gameObject.AddComponent<RawImage>();
            vpImage.maskable = false;
            vpImage.raycastTarget = true;
            vpImage.color = Color.clear;

            var content = ctx.CreateNativeObject("[ScrollContent]").AddComponent<RectTransform>();
            Container = content;
            content.SetParent(viewport, false);

            content.anchorMin = Vector2.up;
            content.anchorMax = Vector2.up;
            content.pivot = Vector2.up;
            content.anchoredPosition3D = Vector3.zero;
            content.sizeDelta = Vector2.zero;
            var resizer = ContentResizer = content.gameObject.AddComponent<ScrollContentResizer>();
            resizer.Layout = Layout;

            SetupContents();

            ScrollRect.viewport = viewport;
            ScrollRect.content = content;
            ScrollRect.scrollSensitivity = 50;
            ScrollRect.horizontalScrollbarVisibility = ScrollbarVisibility.AutoHide;
            ScrollRect.verticalScrollbarVisibility = ScrollbarVisibility.AutoHide;
            ScrollRect.elasticity = 0;
            ScrollRect.movementType = MovementType.Clamped;
        }

        private bool DirectionFromProp;

        /// <summary>The space <c>scrollbar-gutter</c> reserves on each edge, as left, top, right, bottom.</summary>
        public Vector4 Gutter { get; private set; }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();
            if (!DirectionFromProp) SetDirection(DirectionFromStyle());
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            RefreshScrollbarGutter();
        }

        // `scrollbar-gutter: stable` keeps content out from under the overlaid scrollbars: the viewport shrinks by the
        // bar's thickness on its edge, and Yoga loses the same width. A start-edge gutter is a viewport offset, so the
        // whole reduction goes to the end padding, and the content resizer ignores it so the extents still match.
        internal void RefreshScrollbarGutter()
        {
            var style = ComputedStyle;
            if (style == null) return;

            var mode = style.scrollbarGutter;
            float left = 0, top = 0, right = 0, bottom = 0;

            if (mode != ScrollbarGutter.Auto)
            {
                var both = mode == ScrollbarGutter.StableBothEdges;

                if (ScrollRect.vertical && VerticalScrollbar != null)
                {
                    var t = VerticalScrollbar.Thickness;
                    if (both) left = right = t;
                    else if (VerticalScrollbar.AtStart) left = t;
                    else right = t;
                }

                if (ScrollRect.horizontal && HorizontalScrollbar != null)
                {
                    var t = HorizontalScrollbar.Thickness;
                    if (both) top = bottom = t;
                    else if (HorizontalScrollbar.AtStart) top = t;
                    else bottom = t;
                }
            }

            Gutter = new Vector4(left, top, right, bottom);

            var viewport = ScrollRect.viewport;
            viewport.offsetMin = new Vector2(left, -1 + bottom);
            viewport.offsetMax = new Vector2(1 - right, -top);
            ContentResizer.Gutter = new Vector2(left + right, top + bottom);

            Layout.PaddingRight = AddGutter(StylingHelpers.GetStyleLengthTriple(style, LayoutProperties.PaddingRight, LayoutProperties.PaddingHorizontal, LayoutProperties.Padding), left + right);
            Layout.PaddingBottom = AddGutter(StylingHelpers.GetStyleLengthTriple(style, LayoutProperties.PaddingBottom, LayoutProperties.PaddingVertical, LayoutProperties.Padding), top + bottom);
        }

        // A percent padding cannot take points, so the gutter is skipped there.
        private static YogaValue AddGutter(YogaValue padding, float gutter)
        {
            if (gutter <= 0 || padding.Unit == YogaUnit.Percent) return padding;
            if (padding.Unit == YogaUnit.Point) return YogaValue.Point(padding.Value + gutter);
            return YogaValue.Point(gutter);
        }

        // `overflow-x: hidden` beside a scrolling y axis is how CSS asks for one direction. Both hidden
        // or both scrolling stays Both, which is what an `overflow: hidden` scroll view always was.
        private ScrollDirection DirectionFromStyle()
        {
            var style = ComputedStyle;
            if (style == null) return ScrollDirection.Both;
            var x = style.overflowX == Yoga.YogaOverflow.Hidden;
            var y = style.overflowY == Yoga.YogaOverflow.Hidden;
            if (x && !y) return ScrollDirection.Vertical;
            if (y && !x) return ScrollDirection.Horizontal;
            return ScrollDirection.Both;
        }

        private void SetDirection(ScrollDirection dir)
        {
            ScrollRect.horizontal = dir.HasFlag(ScrollDirection.Horizontal);
            ScrollRect.vertical = dir.HasFlag(ScrollDirection.Vertical);
            ContentResizer.Direction = dir;
            ScrollRect.WheelDirectionTransposed = dir == ScrollDirection.Horizontal;
            RefreshScrollbarGutter();
        }

        private void SetupContents()
        {
            HorizontalScrollbar = CreateScrollbar(false);
            VerticalScrollbar = CreateScrollbar(true);
            ScrollRect.horizontalScrollbar = HorizontalScrollbar.Scrollbar;
            ScrollRect.verticalScrollbar = VerticalScrollbar.Scrollbar;
        }

        private ScrollbarComponent CreateScrollbar(bool vertical)
        {
            var sc = Context.CreateComponentWithPool("_scrollbar", null, (tag, text) => new ScrollbarComponent(Context));
            sc.Horizontal = !vertical;
            sc.SetParent(this);
            return sc;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "elasticity":
                    var el = AllConverters.FloatConverter.TryGetConstantValue(value, 0f);
                    ScrollRect.movementType = el > 0 ? MovementType.Elastic : MovementType.Clamped;
                    ScrollRect.elasticity = el;
                    break;
                case "smoothness":
                    var sm = AllConverters.FloatConverter.TryGetConstantValue(value, 0.12f);
                    ScrollRect.Smoothness = sm;
                    break;
                case "direction":
                    DirectionFromProp = value != null;
                    SetDirection(DirectionFromProp ? AllConverters.Get<ScrollDirection>().TryGetConstantValue(value, ScrollDirection.Both) : DirectionFromStyle());
                    break;
                case "alwaysShow":
                    var dir2 = AllConverters.Get<ScrollDirection>().TryGetConstantValue(value, ScrollDirection.None);
                    ScrollRect.horizontalScrollbarVisibility = dir2.HasFlag(ScrollDirection.Horizontal) ? ScrollbarVisibility.Permanent : ScrollbarVisibility.AutoHide;
                    ScrollRect.verticalScrollbarVisibility = dir2.HasFlag(ScrollDirection.Vertical) ? ScrollbarVisibility.Permanent : ScrollbarVisibility.AutoHide;
                    break;
                case "sensitivity":
                    var fl = AllConverters.FloatConverter.TryGetConstantValue(value, 50f);
                    ScrollRect.scrollSensitivity = fl;
                    break;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        public override Action AddEventListener(string eventName, Callback fun)
        {
            if (eventName == "onValueChanged")
            {
                var listener = new UnityAction<Vector2>((e) => fun.CallWithPriority(EventPriority.Continuous, e, this));
                ScrollRect.onValueChanged.AddListener(listener);
                return () => ScrollRect.onValueChanged.RemoveListener(listener);
            }
            else return base.AddEventListener(eventName, fun);
        }

        public void ScrollTo(float? left = null, float? top = null, float? smoothness = null) => ScrollRect.ScrollTo(left, top, smoothness);
        public void ScrollBy(float? left = null, float? top = null, float? smoothness = null) => ScrollRect.ScrollBy(left, top, smoothness);

        public override bool Revive()
        {
            if (!base.Revive()) return false;

            ScrollLeft = 0;
            ScrollTop = 0;
            SetupContents();

            return true;
        }
    }
}
