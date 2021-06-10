using UnityEngine;
using Facebook.Yoga;
using UnityEngine.UI;
using TMPro;

namespace ReactUnity.Layout
{
    public class TextMeasurer : MonoBehaviour, ILayoutSelfController
    {
        private TextMeshProUGUI tmpro;

        TextMeshProUGUI Text { get => tmpro ??= GetComponent<TextMeshProUGUI>(); }

        public YogaNode Layout;
        public UGUIContext Context;

        private void Start()
        {
            if (Layout == null) DestroyImmediate(this);
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            Layout.MarkDirty();
            Context.ScheduleLayout();
        }

        void ILayoutController.SetLayoutVertical()
        {
            Layout.MarkDirty();
            Context.ScheduleLayout();
        }

        public YogaSize Measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode)
        {
            var values = Text.GetPreferredValues(width, height);

            return new YogaSize
            {
                width = Mathf.Ceil(values.x),
                height = Mathf.Ceil(values.y),
            };
        }
    }
}
