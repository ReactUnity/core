using Facebook.Yoga;
using ReactUnity.Types;
using ReactUnity.UGUI.Measurers;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [ExecuteInEditMode]
    [AddComponentMenu("")]
    [DefaultExecutionOrder(-20)]
    public class ReactReplacedElement : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }
        public ImageMeasurer Measurer { get; internal set; }

        private bool hasPositionUpdate = true;
        private YogaValue2 position = YogaValue2.Center;

        public YogaValue2 Position
        {
            get => position;
            set
            {
                if (value != position)
                {
                    hasPositionUpdate = true;
                    position = value;
                }
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

        private void LateUpdate()
        {
            if (!Layout.HasNewLayout && !hasPositionUpdate) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var px = position.X.Unit == YogaUnit.Auto || position.X.Unit == YogaUnit.Undefined ? YogaValue2.Center.X : position.X;
            var py = position.Y.Unit == YogaUnit.Auto || position.Y.Unit == YogaUnit.Undefined ? YogaValue2.Center.Y : position.Y;

            var xIsPercentage = px.Unit == YogaUnit.Percent;
            var yIsPercentage = py.Unit == YogaUnit.Percent;

            var tx = px.Value;
            var ty = py.Value;

            if (float.IsNaN(tx)) tx = 0;
            if (float.IsNaN(ty)) ty = 0;

            var xVal = xIsPercentage ? tx / 100 : tx;
            var yVal = yIsPercentage ? (1 - ty / 100) : -ty;

            var pivotX = xIsPercentage ? xVal : 0;
            var pivotY = yIsPercentage ? yVal : 1;

            var offsetX = xIsPercentage ? 0 : xVal;
            var offsetY = yIsPercentage ? 0 : yVal;

            var anchorMinX = xIsPercentage ? xVal : 0;
            var anchorMaxX = xIsPercentage ? xVal : 1;

            var anchorMinY = yIsPercentage ? yVal : 0;
            var anchorMaxY = yIsPercentage ? yVal : 1;


            rt.pivot = new Vector2(pivotX, pivotY);
            rt.localPosition = Vector2.zero;

            rt.anchorMin = new Vector2(anchorMinX, anchorMinY);
            rt.anchorMax = new Vector2(anchorMaxX, anchorMaxY);
            rt.anchoredPosition = new Vector2(offsetX, offsetY);

            var measured = Measurer.Measure(Layout, Layout.LayoutWidth, YogaMeasureMode.Exactly, Layout.LayoutHeight, YogaMeasureMode.Exactly);

            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, measured.width);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, measured.height);

            hasPositionUpdate = false;
        }
    }
}
