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
        private PositionType positionType = PositionType.Relative;
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
        public PositionType PositionType
        {
            get => positionType;
            set
            {
                if (value != positionType)
                {
                    hasPositionUpdate = true;
                    positionType = value;
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


            var tran = new Vector2(CalculateYogaVal(translate.X, Layout.LayoutWidth), -CalculateYogaVal(translate.Y, Layout.LayoutHeight));

            if (positionType == PositionType.Static)
            {
                // TODO: improve static positioning to affect 4 sides
                var x = CalculateYogaVal(Layout.Left, Layout.LayoutWidth);
                var y = CalculateYogaVal(Layout.Top, Layout.LayoutHeight);

                var posX = x + pivotDiff.x * Layout.LayoutWidth;
                var posY = -y + pivotDiff.y * Layout.LayoutHeight;

                rt.anchoredPosition = new Vector2(posX, posY) + tran;
                rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
                rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);
            }
            else
            {
                var posX = Layout.LayoutX + pivotDiff.x * Layout.LayoutWidth;
                var posY = -Layout.LayoutY + pivotDiff.y * Layout.LayoutHeight;

                rt.anchoredPosition = new Vector2(posX, posY) + tran;
                rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Layout.LayoutWidth);
                rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Layout.LayoutHeight);
            }
            hasPositionUpdate = false;
            Layout.MarkLayoutSeen();
        }

        private float CalculateYogaVal(YogaValue val, float size)
        {
            return val.Unit == YogaUnit.Percent ? size * val.Value / 100 : val.Value;
        }
    }
}
