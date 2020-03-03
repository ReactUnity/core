using UnityEngine;
using Facebook.Yoga;
using UnityEngine.UI;

namespace ReactUnity.Layout
{
    public class FlexElement : MonoBehaviour
    {
        private RectTransform rt;

        public YogaNode Node;

        [NaughtyAttributes.ShowNativeProperty]
        public string Layout => Node.Print(YogaPrintOptions.Layout);

        [NaughtyAttributes.ShowNativeProperty]
        public string Style => Node.Print(YogaPrintOptions.Style);

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

        [NaughtyAttributes.Button]
        public void Recalculate()
        {
            Node.CalculateLayout();
        }
    }
}
