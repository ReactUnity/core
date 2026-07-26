using System;

using ReactUnity.Helpers;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
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
                    var dir = AllConverters.Get<ScrollDirection>().TryGetConstantValue(value, ScrollDirection.Both);
                    ScrollRect.horizontal = dir.HasFlag(ScrollDirection.Horizontal);
                    ScrollRect.vertical = dir.HasFlag(ScrollDirection.Vertical);
                    ContentResizer.Direction = dir;
                    ScrollRect.WheelDirectionTransposed = dir == ScrollDirection.Horizontal;
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
