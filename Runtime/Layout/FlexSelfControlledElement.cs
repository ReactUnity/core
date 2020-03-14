using UnityEngine;
using Facebook.Yoga;
using UnityEngine.UI;
using TMPro;

namespace ReactUnity.Layout
{
    public class FlexSelfControlledElement : MonoBehaviour, ILayoutSelfController
    {
        private TextMeshProUGUI tmpro;
        private RectTransform rt;

        public YogaNode Layout;
        public UnityUGUIContext Context;

        private void Awake()
        {
            rt = GetComponent<RectTransform>();
            tmpro = GetComponent<TextMeshProUGUI>();
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            Layout.MarkDirty();
            Context.scheduleLayout();
        }

        void ILayoutController.SetLayoutVertical()
        {
            Layout.MarkDirty();
            Context.scheduleLayout();
        }

        public YogaSize Measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            var values = tmpro.GetPreferredValues(width, height);

            return new YogaSize
            {
                width = Mathf.Ceil(values.x),
                height = Mathf.Ceil(values.y),
            };
        }
    }
}
