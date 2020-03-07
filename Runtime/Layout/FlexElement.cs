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

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void LateUpdate()
        {
            var sameTranslate = Style.resolved.translate == previousTranslate;
            if (!Layout.HasNewLayout && sameTranslate) return;

            var pivotDiff = rt.pivot - Vector2.up;

            var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
            var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

            rt.anchoredPosition = new Vector2(posX, posY) + Style.resolved.translate;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            Layout.MarkLayoutSeen();
            previousTranslate = Style.resolved.translate;
        }
    }
}
