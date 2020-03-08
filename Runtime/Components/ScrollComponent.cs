using Facebook.Yoga;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class ScrollComponent : ContainerComponent
    {
        public static YogaNode ScrollDefaultLayout { get; } = new YogaNode() { Overflow = YogaOverflow.Scroll, FlexShrink = 1 };
        public override YogaNode DefaultLayout => ScrollDefaultLayout;

        public ScrollRect ScrollRect { get; private set; }

        public ScrollComponent(UnityUGUIContext Context) : base(Context)
        {
            ScrollRect = GameObject.AddComponent<ScrollRect>();
            GameObject.AddComponent<RectMask2D>();

            var viewport = new GameObject("[Scroll Viewport]").AddComponent<RectTransform>();
            viewport.SetParent(RectTransform, false);

            viewport.anchorMin = Vector2.zero;
            viewport.anchorMax = Vector2.one;
            viewport.sizeDelta = Vector2.zero;
            viewport.pivot = Vector2.up;

            var content = new GameObject("[Scroll Container]").AddComponent<RectTransform>();
            Container = content;
            content.SetParent(viewport, false);

            content.anchorMin = Vector2.zero;
            content.anchorMax = Vector2.one;
            content.pivot = Vector2.up;
            content.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, 0);
            content.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, 0);
            content.gameObject.AddComponent<CalculateSizeFromContents>().Layout = Layout;

            ScrollRect.horizontalScrollbar = CreateScrollbar(false, RectTransform);
            ScrollRect.verticalScrollbar = CreateScrollbar(true, RectTransform);
            ScrollRect.viewport = viewport;
            ScrollRect.content = content;
            ScrollRect.scrollSensitivity = 50;
            ScrollRect.horizontalScrollbarVisibility = ScrollRect.ScrollbarVisibility.AutoHide;
            ScrollRect.verticalScrollbarVisibility = ScrollRect.ScrollbarVisibility.AutoHide;
            ScrollRect.movementType = ScrollRect.MovementType.Clamped;
        }

        private Scrollbar CreateScrollbar(bool vertical, RectTransform parent)
        {
            var typeStr = vertical ? "Vertical" : "Horizontal";
            var go = new GameObject($"[{typeStr} Scrollbar]");
            go.SetActive(false);
            var rt = go.AddComponent<RectTransform>();
            var sc = go.AddComponent<Scrollbar>();

            var handle = new GameObject($"[{typeStr} Scrollbar Handle]");
            var hrt = handle.AddComponent<RectTransform>();

            sc.handleRect = hrt;

            hrt.SetParent(rt);
            hrt.anchorMin = Vector2.zero;
            hrt.anchorMax = Vector2.one;
            hrt.sizeDelta = Vector2.zero;

            rt.SetParent(parent, false);
            if (vertical)
            {
                rt.anchorMin = Vector2.right;
                rt.anchorMax = Vector2.one;
                rt.pivot = Vector2.one;
                rt.sizeDelta = Vector2.zero;
            }
            else
            {
                rt.anchorMin = Vector2.zero;
                rt.anchorMax = Vector2.right;
                rt.pivot = Vector2.zero;
                rt.sizeDelta = Vector2.zero;
            }


            sc.targetGraphic = go.AddComponent<Image>();
            var handleImage = handle.AddComponent<Image>();
            handleImage.color = new Color(0, 0, 0, 0.3f);
            sc.SetDirection(vertical ? Scrollbar.Direction.BottomToTop : Scrollbar.Direction.LeftToRight, true);
            rt.SetSizeWithCurrentAnchors(vertical ? RectTransform.Axis.Horizontal : RectTransform.Axis.Vertical, 10);
            go.SetActive(true);
            return sc;
        }
    }
}
