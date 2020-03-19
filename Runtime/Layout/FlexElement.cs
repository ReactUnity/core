using UnityEngine;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Components;

namespace ReactUnity.Layout
{
    public class FlexElement : MonoBehaviour
    {
        private RectTransform rt;

        public YogaNode Layout { get; internal set; }
        public NodeStyle Style { get; internal set; }
        public UnityComponent Component { get; internal set; }

        private Vector2 previousTranslate;
        private bool previousTranslateRelative;

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void LateUpdate()
        {
            var translate = Style.resolved.translate;
            var relative = Style.resolved.translateRelative;
            var sameTranslate = translate == previousTranslate;
            if (!Layout.HasNewLayout && sameTranslate && previousTranslateRelative == relative) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var pivotDiff = rt.pivot - Vector2.up;

            var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
            var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

            var scale = relative ? new Vector2(Layout.LayoutWidth, Layout.LayoutHeight) : Vector2.one;
            var tran = new Vector2(translate.x * scale.x, -translate.y * scale.y);

            rt.anchoredPosition = new Vector2(posX, posY) + tran;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            Layout.MarkLayoutSeen();
            previousTranslate = translate;
            previousTranslateRelative = relative;
        }
    }
}
