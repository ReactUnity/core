using System;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class ScrollbarComponent : UGUIComponent
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
                    RefreshName();
                    UpdatePosition();
                }
            }
        }

        protected override string DefaultName => $"[{(Horizontal ? "Horizontal" : "Vertical")} Scrollbar]";

        public Scrollbar Scrollbar { get; }
        public ScrollbarThumbComponent Thumb { get; }

        public ScrollbarComponent(UGUIContext context) : base(context, "_scrollbar")
        {
            IsPseudoElement = true;
            Component.enabled = false;
            Layout.PositionType = YogaPositionType.Absolute;
            Scrollbar = AddComponent<Scrollbar>();

            Thumb = new ScrollbarThumbComponent(context);
            Thumb.SetParent(this);
            Thumb.Style["pointer-events"] = PointerEvents.All;
            Thumb.ResolveStyle();
            Thumb.UpdateBackgroundGraphic(true, true);
            Scrollbar.targetGraphic = Thumb.BorderAndBackground?.BgImage;

            Data["horizontal"] = false;
            Data["vertical"] = true;
            Data["direction"] = "vertical";
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
            var top = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Top);
            var right = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Right);
            var bottom = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Bottom);
            var left = ComputedStyle.GetStyleValue<YogaValue>(LayoutProperties.Left);

            rt.anchoredPosition3D = Vector3.zero;
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


    public class ScrollbarThumbComponent : UGUIComponent
    {
        protected override string DefaultName => "[Thumb]";

        public ScrollbarThumbComponent(UGUIContext context) : base(context, "_scrollbar-thumb", false)
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

            if (Parent is ScrollbarComponent sc) sc.Scrollbar.handleRect = hrt;
        }

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ResolveTransform() { }
    }
}
