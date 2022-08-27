using Facebook.Yoga;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Behaviours
{
    public class TextMeasurer : MonoBehaviour, ILayoutSelfController
    {
        private TextMeshProUGUI tmpro;
        private TextMeshProUGUI Text => tmpro = tmpro ?? GetComponent<TextMeshProUGUI>();
        private bool layoutDirty = false;

        public YogaNode Layout;
        public UGUIContext Context;

        void Start()
        {
            if (Layout == null) enabled = false;
        }

        void ILayoutController.SetLayoutHorizontal()
        {
            Layout?.MarkDirty();
            layoutDirty = true;
        }

        void ILayoutController.SetLayoutVertical()
        {
            Layout?.MarkDirty();
            layoutDirty = true;
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

        private void LateUpdate()
        {
            // HACK: TMPro does not update the text layout until the next frame if this is not called
            if (layoutDirty && Text) Text.SetLayoutDirty();
        }
    }
}
