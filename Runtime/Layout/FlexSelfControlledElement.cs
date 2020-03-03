using UnityEngine;
using Facebook.Yoga;
using UnityEngine.UI;

namespace ReactUnity.Layout
{
    public class FlexSelfControlledElement : MonoBehaviour, ILayoutSelfController
    {
        private RectTransform rt;

        public YogaNode Node;
        public UnityUGUIContext Context;

        private void OnEnable()
        {
            rt = GetComponent<RectTransform>();
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            Node.Width = Mathf.Ceil(LayoutUtility.GetPreferredSize(rt, 0));
            Context.scheduleLayout();
        }

        void ILayoutController.SetLayoutVertical()
        {
            Node.Height = Mathf.Ceil(LayoutUtility.GetPreferredSize(rt, 1));
            Context.scheduleLayout();
        }
    }
}
