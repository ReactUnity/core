using Facebook.Yoga;
using UnityEngine;

namespace ReactUnity
{
    public class CalculateSizeFromContents : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        void LateUpdate()
        {
            if (!Layout.HasNewLayout) return;

            float minX = 0;
            float minY = 0;
            float maxX = 0;
            float maxY = 0;

            for (int i = 0; i < Layout.Count; i++)
            {
                var child = Layout[i];
                var xStart = child.LayoutX - child.LayoutMarginLeft;
                var xEnd = child.LayoutX + child.LayoutWidth + child.LayoutMarginRight;

                var yStart = child.LayoutY - child.LayoutMarginTop;
                var yEnd = child.LayoutY + child.LayoutHeight + child.LayoutMarginBottom;

                if (xStart < minX) minX = xStart;
                if (xEnd > maxX) maxX = xEnd;

                if (yStart < minY) minY = yStart;
                if (yEnd > maxY) maxY = yEnd;
            }

            var rightInset = NormalizeFloat(Layout.LayoutPaddingRight) + NormalizeFloat(Layout.BorderRightWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, maxX - minX + rightInset);

            var bottomInset = NormalizeFloat(Layout.LayoutPaddingBottom) + NormalizeFloat(Layout.BorderBottomWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, maxY - minY + bottomInset);
        }

        float NormalizeFloat(float value)
        {
            if (float.IsNaN(value)) return 0;
            return value;
        }
    }
}
