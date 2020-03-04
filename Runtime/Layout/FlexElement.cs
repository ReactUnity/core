using UnityEngine;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Components;

namespace ReactUnity.Layout
{
    public class FlexElement : MonoBehaviour
    {
        private RectTransform rt;

        public YogaNode Node { get; internal set; }
        public NodeStyle Style { get; internal set; }
        public UnityComponent Component { get; internal set; }

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void LateUpdate()
        {
            if (!Node.HasNewLayout) return;

            var pivotDiff = rt.pivot - Vector2.up;

            rt.anchoredPosition = new Vector2(Node.LayoutX + pivotDiff.x * Node.LayoutWidth, -Node.LayoutY + pivotDiff.y * Node.LayoutHeight);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Node.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Node.LayoutHeight);

            Node.MarkLayoutSeen();
        }
    }
}
