using System;
using ReactUnity.Converters;
using ReactUnity.Helpers;
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

        public ScrollbarComponent HorizontalScrollbar { get; }
        public ScrollbarComponent VerticalScrollbar { get; }

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

        public ScrollComponent(UGUIContext Context) : base(Context, "scroll")
        {
            ScrollRect = AddComponent<SmoothScrollRect>();

            var viewport = new GameObject("[ScrollViewport]").AddComponent<RectTransform>();
            viewport.SetParent(RectTransform, false);

            viewport.anchorMin = Vector2.zero;
            viewport.anchorMax = Vector2.one;
            viewport.sizeDelta = Vector2.zero;
            viewport.pivot = Vector2.up;
            viewport.offsetMin = new Vector2(0, -1);
            viewport.offsetMax = new Vector2(1, 0);
            var vpImage = viewport.gameObject.AddComponent<Image>();
            vpImage.color = Color.clear;


            var content = new GameObject("[ScrollContent]").AddComponent<RectTransform>();
            Container = content;
            content.SetParent(viewport, false);

            content.anchorMin = Vector2.up;
            content.anchorMax = Vector2.up;
            content.pivot = Vector2.up;
            content.anchoredPosition3D = Vector3.zero;
            content.sizeDelta = Vector2.zero;
            var resizer = ContentResizer = content.gameObject.AddComponent<ScrollContentResizer>();
            resizer.Layout = Layout;

            HorizontalScrollbar = CreateScrollbar(false);
            VerticalScrollbar = CreateScrollbar(true);
            ScrollRect.horizontalScrollbar = HorizontalScrollbar.Scrollbar;
            ScrollRect.verticalScrollbar = VerticalScrollbar.Scrollbar;
            ScrollRect.viewport = viewport;
            ScrollRect.content = content;
            ScrollRect.scrollSensitivity = 50;
            ScrollRect.horizontalScrollbarVisibility = ScrollbarVisibility.AutoHide;
            ScrollRect.verticalScrollbarVisibility = ScrollbarVisibility.AutoHide;
            ScrollRect.elasticity = 0;
            ScrollRect.movementType = MovementType.Clamped;
        }

        private ScrollbarComponent CreateScrollbar(bool vertical)
        {
            var sc = new ScrollbarComponent(Context);
            sc.Horizontal = !vertical;
            sc.SetParent(this);
            return sc;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "elasticity":
                    var el = AllConverters.FloatConverter.Convert(value);
                    var elas = el is float f ? f : 0;
                    ScrollRect.movementType = elas > 0 ? MovementType.Elastic : MovementType.Clamped;
                    ScrollRect.elasticity = elas;
                    break;
                case "smoothness":
                    var sm = AllConverters.FloatConverter.Convert(value);
                    if (sm is float f2) ScrollRect.Smoothness = f2;
                    else ScrollRect.Smoothness = 0.12f;
                    break;
                case "direction":
                    var dirs = AllConverters.Get<ScrollDirection>().Convert(value);
                    var dir = dirs is ScrollDirection s ? s : ScrollDirection.Both;
                    ScrollRect.horizontal = dir.HasFlag(ScrollDirection.Horizontal);
                    ScrollRect.vertical = dir.HasFlag(ScrollDirection.Vertical);
                    ContentResizer.Direction = dir;
                    ScrollRect.WheelDirectionTransposed = dir == ScrollDirection.Horizontal;
                    break;
                case "alwaysShow":
                    var dirs2 = AllConverters.Get<ScrollDirection>().Convert(value);
                    var dir2 = dirs2 is ScrollDirection s2 ? s2 : ScrollDirection.None;
                    ScrollRect.horizontalScrollbarVisibility = dir2.HasFlag(ScrollDirection.Horizontal) ? ScrollbarVisibility.Permanent : ScrollbarVisibility.AutoHide;
                    ScrollRect.verticalScrollbarVisibility = dir2.HasFlag(ScrollDirection.Vertical) ? ScrollbarVisibility.Permanent : ScrollbarVisibility.AutoHide;
                    break;
                case "sensitivity":
                    var fl = AllConverters.FloatConverter.Convert(value);
                    if (fl is float f3) ScrollRect.scrollSensitivity = f3;
                    else ScrollRect.scrollSensitivity = 50;
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
                var listener = new UnityAction<Vector2>((e) => fun.Call(e, this));
                ScrollRect.onValueChanged.AddListener(listener);
                return () => ScrollRect.onValueChanged.RemoveListener(listener);
            }
            else return base.AddEventListener(eventName, fun);
        }

        public void ScrollTo(float? left = null, float? top = null, float? smoothness = null) => ScrollRect.ScrollTo(left, top, smoothness);
        public void ScrollBy(float? left = null, float? top = null, float? smoothness = null) => ScrollRect.ScrollBy(left, top, smoothness);
    }
}
