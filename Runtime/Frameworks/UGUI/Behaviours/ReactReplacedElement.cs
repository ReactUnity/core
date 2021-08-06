using System.Collections;
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
        private RectTransform RT => rt = rt ?? GetComponent<RectTransform>();

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

        private Coroutine cr;

        private void OnEnable()
        {
            cr = StartCoroutine(LateLateUpdate());
        }

        private void OnDisable()
        {
            if (cr != null) StopCoroutine(cr);
            cr = null;
        }

        private void Start()
        {
            if (Layout == null) DestroyImmediate(this);
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

            var parent = RT.parent as RectTransform;

            var parMinX = xPer ? xVal : 0;
            var parMaxX = xPer ? xVal : 1;

            var parMinY = yPer ? yVal : 0;
            var parMaxY = yPer ? yVal : 1;


            RT.pivot = new Vector2(pivotX, pivotY);
            RT.localPosition = Vector2.zero;

            RT.anchorMin = new Vector2(parMinX, parMinY);
            RT.anchorMax = new Vector2(parMaxX, parMaxY);
            RT.anchoredPosition = new Vector2(anX, anY);
            RT.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            RT.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            hasPositionUpdate = false;
        }

        IEnumerator LateLateUpdate()
        {
            var wait = new WaitForEndOfFrame();
            while (true)
            {
                yield return wait;
                if (Layout.HasNewLayout) Layout.MarkLayoutSeen();
            }
        }
    }
}
