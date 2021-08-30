using System;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class ScrollComponent : UGUIComponent
    {
        public ScrollRect ScrollRect { get; private set; }

        public ScrollContentResizer ContentResizer { get; private set; }

        public ScrollComponent(UGUIContext Context) : base(Context, "scroll")
        {
            ScrollRect = AddComponent<ScrollRect>();

            var viewport = new GameObject("[Scroll Viewport]").AddComponent<RectTransform>();
            viewport.gameObject.AddComponent<RectMask2D>();
            viewport.SetParent(RectTransform, false);

            viewport.anchorMin = Vector2.zero;
            viewport.anchorMax = Vector2.one;
            viewport.sizeDelta = Vector2.zero;
            viewport.pivot = Vector2.up;
            var vpImage = viewport.gameObject.AddComponent<Image>();
            vpImage.color = Color.clear;


            var content = new GameObject("[Scroll Container]").AddComponent<RectTransform>();
            Container = content;
            content.SetParent(viewport, false);

            content.anchorMin = Vector2.up;
            content.anchorMax = Vector2.up;
            content.pivot = Vector2.up;
            content.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 0);
            content.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, 0);
            var resizer = ContentResizer = content.gameObject.AddComponent<ScrollContentResizer>();
            resizer.Layout = Layout;

            ScrollRect.horizontalScrollbar = CreateScrollbar(false);
            ScrollRect.verticalScrollbar = CreateScrollbar(true);
            ScrollRect.viewport = viewport;
            ScrollRect.content = content;
            ScrollRect.scrollSensitivity = 50;
            ScrollRect.horizontalScrollbarVisibility = ScrollRect.ScrollbarVisibility.AutoHide;
            ScrollRect.verticalScrollbarVisibility = ScrollRect.ScrollbarVisibility.AutoHide;
            ScrollRect.movementType = ScrollRect.MovementType.Clamped;
        }

        private Scrollbar CreateScrollbar(bool vertical)
        {
            var sc = new ScrollBarComponent(Context);
            sc.Horizontal = !vertical;
            sc.SetParent(this);
            return sc.Scrollbar;
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "direction":
                    var dirs = AllConverters.Get<ScrollBarDirection>().Convert(value);
                    var dir = dirs is ScrollBarDirection s ? s : ScrollBarDirection.Both;
                    ScrollRect.horizontal = dir.HasFlag(ScrollBarDirection.Horizontal);
                    ScrollRect.vertical = dir.HasFlag(ScrollBarDirection.Vertical);
                    ContentResizer.Direction = dir;
                    break;
                case "alwaysShow":
                    var dirs2 = AllConverters.Get<ScrollBarDirection>().Convert(value);
                    var dir2 = dirs2 is ScrollBarDirection s2 ? s2 : ScrollBarDirection.None;
                    ScrollRect.horizontalScrollbarVisibility = dir2.HasFlag(ScrollBarDirection.Horizontal) ? ScrollRect.ScrollbarVisibility.Permanent : ScrollRect.ScrollbarVisibility.AutoHide;
                    ScrollRect.verticalScrollbarVisibility = dir2.HasFlag(ScrollBarDirection.Vertical) ? ScrollRect.ScrollbarVisibility.Permanent : ScrollRect.ScrollbarVisibility.AutoHide;
                    break;
                case "sensitivity":
                    var fl = AllConverters.FloatConverter.Convert(value);
                    if (fl is float f) ScrollRect.scrollSensitivity = f;
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
    }

    [Flags]
    public enum ScrollBarDirection
    {
        None = 0,
        Horizontal = 1,
        Vertical = 2,
        Both = 3,
    }

    public class ScrollBarComponent : UGUIComponent
    {
        private bool horizontal;
        public bool Horizontal
        {
            get => horizontal;
            set
            {
                if (value != horizontal)
                {
                    horizontal = value;
                    Data["horizontal"] = value;
                    Data["vertical"] = !value;
                    Data["direction"] = value ? "horizontal" : "vertical";
                    Name = Name;
                    UpdatePosition();
                }
            }
        }

        protected override string DefaultName => $"[{(Horizontal ? "Horizontal" : "Vertical")} Scrollbar]";

        public Scrollbar Scrollbar { get; }
        public ScrollBarThumbComponent Thumb { get; }

        public ScrollBarComponent(UGUIContext context) : base(context, "_scrollbar")
        {
            IsPseudoElement = true;
            Component.enabled = false;
            Layout.PositionType = YogaPositionType.Absolute;
            Scrollbar = AddComponent<Scrollbar>();

            Thumb = new ScrollBarThumbComponent(context);
            Thumb.SetParent(this);
            Thumb.Style["pointer-events"] = PointerEvents.All;
            Thumb.ResolveStyle();
            Thumb.UpdateBackgroundGraphic(true, true);
            Scrollbar.targetGraphic = Thumb.BorderAndBackground?.Background?.GetComponent<Image>();

            Data["horizontal"] = false;
            Data["vertical"] = true;
            Data["direction"] = "vertical";
        }

        public override void ResolveStyle(bool recursive = false)
        {
            base.ResolveStyle(recursive);
        }

        public override void SetProperty(string propertyName, object value)
        {
            if (propertyName == "horizontal") Horizontal = Convert.ToBoolean(value);
            else base.SetProperty(propertyName, value);
        }

        void UpdatePosition()
        {
            Scrollbar.SetDirection(!Horizontal ? Scrollbar.Direction.BottomToTop : Scrollbar.Direction.LeftToRight, true);

            var rt = RectTransform;
            if (Horizontal)
            {
                rt.anchorMin = Vector2.zero;
                rt.anchorMax = Vector2.right;
                rt.pivot = Vector2.zero;
                rt.sizeDelta = Vector2.zero;
            }
            else
            {
                rt.anchorMin = Vector2.right;
                rt.anchorMax = Vector2.one;
                rt.pivot = Vector2.one;
                rt.sizeDelta = Vector2.zero;
            }
        }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            base.SetParent(newParent, relativeTo, insertAfter);
            Attach();
        }

        void Attach()
        {
            if (Parent is UGUIComponent u)
            {
                RectTransform.SetParent(u.RectTransform);
                UpdatePosition();
            }
        }

        protected override void ApplyLayoutStylesSelf()
        {
            var size = ComputedStyle.GetStyleValue<YogaValue>(Horizontal ? LayoutProperties.Height : LayoutProperties.Width);

            var sizeValue = 10f;
            if (size.Unit == YogaUnit.Point) sizeValue = size.Value;
            else if (size.Unit == YogaUnit.Percent) sizeValue = size.Value;

            var rt = RectTransform;
            rt.offsetMin = Vector2.zero;
            rt.offsetMax = Vector2.zero;

            var top = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Top);
            var right = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Right);
            var bottom = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Bottom);
            var left = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Left);


            if (Horizontal)
            {
                if (top.Unit == YogaUnit.Point)
                {
                    rt.anchorMin = Vector2.up;
                    rt.anchorMax = Vector2.one;
                    rt.SetInsetAndSizeFromParentEdge(RectTransform.Edge.Top, StylingHelpers.GetPointValue(top, 0), sizeValue);
                }
                else
                {
                    rt.anchorMin = Vector2.zero;
                    rt.anchorMax = Vector2.right;
                    rt.SetInsetAndSizeFromParentEdge(RectTransform.Edge.Bottom, StylingHelpers.GetPointValue(bottom, 0), sizeValue);
                }

                rt.offsetMin = new Vector2(StylingHelpers.GetPointValue(left, 0), RectTransform.offsetMin.y);
                rt.offsetMax = new Vector2(-StylingHelpers.GetPointValue(right, 0), RectTransform.offsetMax.y);
            }
            else
            {
                if (left.Unit == YogaUnit.Point)
                {
                    rt.anchorMin = Vector2.zero;
                    rt.anchorMax = Vector2.up;
                    rt.SetInsetAndSizeFromParentEdge(RectTransform.Edge.Left, StylingHelpers.GetPointValue(left, 0), sizeValue);
                }
                else
                {
                    rt.anchorMin = Vector2.right;
                    rt.anchorMax = Vector2.one;
                    rt.SetInsetAndSizeFromParentEdge(RectTransform.Edge.Right, StylingHelpers.GetPointValue(right, 0), sizeValue);
                }

                rt.offsetMin = new Vector2(RectTransform.offsetMin.x, StylingHelpers.GetPointValue(bottom, 0));
                rt.offsetMax = new Vector2(RectTransform.offsetMax.x, -StylingHelpers.GetPointValue(top, 0));
            }
        }
    }


    public class ScrollBarThumbComponent : UGUIComponent
    {
        protected override string DefaultName => "[Thumb]";

        public ScrollBarThumbComponent(UGUIContext context) : base(context, "_scrollbar-thumb", false)
        {
            IsPseudoElement = true;
            Component.enabled = false;
        }

        public override void SetParent(IContainerComponent newParent, IReactComponent relativeTo = null, bool insertAfter = false)
        {
            base.SetParent(newParent, relativeTo, insertAfter);
            Attach();
        }

        void Attach()
        {
            var hrt = RectTransform;
            hrt.sizeDelta = Vector2.zero;
            hrt.anchorMin = Vector2.zero;
            hrt.anchorMax = Vector2.one;
            hrt.anchoredPosition = Vector2.zero;
            hrt.offsetMin = Vector2.zero;
            hrt.offsetMax = Vector2.zero;

            if (Parent is ScrollBarComponent sc) sc.Scrollbar.handleRect = hrt;
        }

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ResolveTransform()
        {
        }
    }
}
