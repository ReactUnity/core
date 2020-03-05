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

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void LateUpdate()
        {
            if (!Layout.HasNewLayout) return;

            var pivotDiff = rt.pivot - Vector2.up;

            rt.anchoredPosition = new Vector2(Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth, -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            Layout.MarkLayoutSeen();
        }
    }
}
