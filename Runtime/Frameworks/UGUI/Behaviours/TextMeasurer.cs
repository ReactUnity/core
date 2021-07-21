using Facebook.Yoga;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Behaviours
{
    public class TextMeasurer : MonoBehaviour, ILayoutSelfController
    {
        private TextMeshProUGUI tmpro;

        TextMeshProUGUI Text { get => tmpro ??= GetComponent<TextMeshProUGUI>(); }

        public YogaNode Layout;
        public UGUIContext Context;

        void Start()
        {
            if (Layout == null) DestroyImmediate(this);
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            Layout.MarkDirty();
        }

        void ILayoutController.SetLayoutVertical()
        {
            Layout.MarkDirty();
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
