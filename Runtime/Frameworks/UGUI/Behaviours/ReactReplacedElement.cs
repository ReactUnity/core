using Facebook.Yoga;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [ExecuteInEditMode]
    [AddComponentMenu("")]
    public class ReactReplacedElement : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }

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
            var translate = position;
            if (!Layout.HasNewLayout && !hasPositionUpdate) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var xPer = translate.X.Unit == YogaUnit.Percent;
            var yPer = translate.Y.Unit == YogaUnit.Percent;

            var xVal = xPer ? translate.X.Value / 100 : translate.X.Value;
            var yVal = yPer ? (1 - translate.Y.Value / 100) : -translate.Y.Value;

            var pivotX = xPer ? xVal : 0;
            var pivotY = yPer ? yVal : 1;

            var anX = xPer ? 0 : xVal;
            var anY = yPer ? 0 : yVal;

            var parent = rt.parent as RectTransform;

            var parMinX = xPer ? xVal : 0;
            var parMaxX = xPer ? xVal : 1;

            var parMinY = yPer ? yVal : 0;
            var parMaxY = yPer ? yVal : 1;


            rt.pivot = new Vector2(pivotX, pivotY);
            rt.localPosition = Vector2.zero;

            rt.anchorMin = new Vector2(parMinX, parMinY);
            rt.anchorMax = new Vector2(parMaxX, parMaxY);
            rt.anchoredPosition = new Vector2(anX, anY);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            hasPositionUpdate = false;
            Layout.MarkLayoutSeen();
        }
    }
}
