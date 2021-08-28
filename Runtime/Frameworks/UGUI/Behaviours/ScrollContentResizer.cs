using Facebook.Yoga;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    public class ScrollContentResizer : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void Start()
        {
            if (Layout == null) enabled = false;
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
            var width = Mathf.Floor(maxX - minX + rightInset);
            var dfx = width - Layout.LayoutWidth;
            if (dfx <= 1 && dfx > 0) width = Layout.LayoutWidth;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, width);

            var bottomInset = NormalizeFloat(Layout.LayoutPaddingBottom) + NormalizeFloat(Layout.BorderBottomWidth);
            var height = Mathf.Floor(maxY - minY + bottomInset);
            var dfy = height - Layout.LayoutHeight;
            if (dfy <= 1 && dfy > 0) height = Layout.LayoutHeight;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, height);
        }

        float NormalizeFloat(float value)
        {
            if (float.IsNaN(value)) return 0;
            return value;
        }
    }
}
