using UnityEngine;
using Facebook.Yoga;
using UnityEngine.UI;

namespace ReactUnity.Layout
{
    public class FlexElement : MonoBehaviour, ILayoutSelfController
    {
        private RectTransform rt;

        // Used for root and text components
        public bool AutoSized = false;
        public YogaNode Node;
        public UnityUGUIContext Context;

        [NaughtyAttributes.ShowNativeProperty]
        public string Layout => Node.Print(YogaPrintOptions.Layout);

        [NaughtyAttributes.ShowNativeProperty]
        public string Style => Node.Print(YogaPrintOptions.Style);

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        private void LateUpdate()
        {
            if (!Node.HasNewLayout) return;

            var pivotDiff = rt.pivot - Vector2.up;

            rt.anchoredPosition = new Vector2(Node.LayoutX + pivotDiff.x * Node.LayoutWidth, -Node.LayoutY + pivotDiff.y * Node.LayoutHeight);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, Node.LayoutWidth);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, Node.LayoutHeight);

            Node.MarkLayoutSeen();
        }

        [NaughtyAttributes.Button]
        public void Recalculate()
        {
            Node.CalculateLayout();
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            if (AutoSized)
            {
                Node.Width = Mathf.Ceil(LayoutUtility.GetPreferredSize(transform as RectTransform, 0));
                Context.scheduleLayout();
            }
        }

        void ILayoutController.SetLayoutVertical()
        {
            if (AutoSized)
            {
                Node.Height = Mathf.Ceil(LayoutUtility.GetPreferredSize(transform as RectTransform, 1));
                Context.scheduleLayout();
            }
        }
    }
}
