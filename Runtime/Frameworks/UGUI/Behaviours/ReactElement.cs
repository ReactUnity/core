using Facebook.Yoga;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [SelectionBase]
    [ExecuteInEditMode]
    [AddComponentMenu("")]
    public class ReactElement : MonoBehaviour
    {
        private RectTransform rt;
        public YogaNode Layout { get; internal set; }
        public UGUIComponent Component { get; internal set; }

        private bool hasPositionUpdate = true;
        private YogaValue2 position = YogaValue2.Center;
        public YogaValue2 Translate
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
            rt = transform as RectTransform;
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

            var pivotDiff = rt.pivot - Vector2.up;

            var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
            var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

            var scale = new Vector2(translate.X.Unit == YogaUnit.Percent ? Layout.LayoutWidth / 100 : 1, translate.Y.Unit == YogaUnit.Percent ? Layout.LayoutHeight / 100 : 1);
            var tran = new Vector2(translate.X.Value * scale.x, -translate.Y.Value * scale.y);

            rt.localPosition = Vector2.zero;
            rt.anchoredPosition = new Vector2(posX, posY) + tran;
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);

            hasPositionUpdate = false;
            Layout.MarkLayoutSeen();
        }
    }
}
