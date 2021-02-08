using UnityEngine;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Components;
using ReactUnity.Types;

namespace ReactUnity.Layout
{
    [SelectionBase]
    public class ReactElement : MonoBehaviour
    {
        private RectTransform rt;

        public YogaNode Layout { get; internal set; }
        public NodeStyle Style { get; internal set; }
        public UnityComponent Component { get; internal set; }

        private YogaValue2 previousTranslate = YogaValue2.Zero;

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void LateUpdate()
        {
            var translate = Style.translate;
            var sameTranslate = translate == previousTranslate;
            if (!Layout.HasNewLayout && sameTranslate) return;
            if (float.IsNaN(Layout.LayoutWidth)) return;

            var pivotDiff = rt.pivot - Vector2.up;

            var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
            var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

            var scale = new Vector2(translate.X.Unit == YogaUnit.Percent ? Layout.LayoutWidth / 100 : 1, translate.Y.Unit == YogaUnit.Percent ? Layout.LayoutHeight / 100 : 1);
            var tran = new Vector2(translate.X.Value * scale.x, -translate.Y.Value * scale.y);

            rt.localPosition = Vector2.zero;
            rt.anchoredPosition = new Vector2(posX, posY) + tran;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            Layout.MarkLayoutSeen();
            previousTranslate = translate;
        }
    }
}
