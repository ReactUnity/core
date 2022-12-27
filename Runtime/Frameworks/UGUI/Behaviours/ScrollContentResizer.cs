using Facebook.Yoga;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [DefaultExecutionOrder(-30)]
    public class ScrollContentResizer : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; set; }

        private ScrollDirection direction = ScrollDirection.Both;
        public ScrollDirection Direction
        {
            get => direction;
            internal set
            {
                direction = value;
                RecalculateSize();
            }
        }

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
            RecalculateSize();
        }

        public void RecalculateSize()
        {
            var hasHorizontal = direction.HasFlag(ScrollDirection.Horizontal);
            var hasVertical = direction.HasFlag(ScrollDirection.Vertical);

            if (!hasHorizontal && !hasVertical)
            {
                rt.sizeDelta = new Vector2(0, 0);
                return;
            }

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

            var horizontal = 0f;
            var vertical = 0f;

            if (hasHorizontal)
            {
                var rightInset = NormalizeFloat(Layout.LayoutPaddingRight) + NormalizeFloat(Layout.BorderRightWidth);
                var width = Mathf.Floor(maxX - minX + rightInset);
                var dfx = width - Layout.LayoutWidth;
                if (dfx <= 1 && dfx > 0) width = Layout.LayoutWidth;
                horizontal = width;
            }

            if (hasVertical)
            {
                var bottomInset = NormalizeFloat(Layout.LayoutPaddingBottom) + NormalizeFloat(Layout.BorderBottomWidth);
                var height = Mathf.Floor(maxY - minY + bottomInset);
                var dfy = height - Layout.LayoutHeight;
                if (dfy <= 1 && dfy > 0) height = Layout.LayoutHeight;
                vertical = height;
            }
            rt.sizeDelta = new Vector2(horizontal, vertical);
        }

        float NormalizeFloat(float value)
        {
            if (float.IsNaN(value)) return 0;
            return value;
        }
    }
}
