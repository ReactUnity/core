using UnityEngine;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Components;
using ReactUnity.Types;
using System.Collections;

namespace ReactUnity.Layout
{
    [SelectionBase]
    [ExecuteInEditMode]
    public class ReactElement : MonoBehaviour
    {
        private RectTransform rt;
        private RectTransform RT => rt ??= GetComponent<RectTransform>();

        public YogaNode Layout { get; internal set; }
        public NodeStyle Style { get; internal set; }
        public ReactComponent Component { get; internal set; }

        private YogaValue2 previousTranslate = YogaValue2.Zero;

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

        private void LateUpdate()
        {
            var translate = Style.translate;
            var sameTranslate = translate == previousTranslate;
            if (!Layout.HasNewLayout && sameTranslate) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var pivotDiff = RT.pivot - Vector2.up;

            var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
            var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

            var scale = new Vector2(translate.X.Unit == YogaUnit.Percent ? Layout.LayoutWidth / 100 : 1, translate.Y.Unit == YogaUnit.Percent ? Layout.LayoutHeight / 100 : 1);
            var tran = new Vector2(translate.X.Value * scale.x, -translate.Y.Value * scale.y);

            RT.localPosition = Vector2.zero;
            RT.anchoredPosition = new Vector2(posX, posY) + tran;
            RT.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            RT.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            previousTranslate = translate;
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
