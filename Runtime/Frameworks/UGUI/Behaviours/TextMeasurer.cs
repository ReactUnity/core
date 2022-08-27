using Facebook.Yoga;
using TMPro;
using UnityEngine;

namespace ReactUnity.UGUI.Behaviours
{
    [DefaultExecutionOrder(-8)]
    public class TextMeasurer : MonoBehaviour
    {
        private TextMeshProUGUI tmpro;
        private TextMeshProUGUI Text => tmpro = tmpro ?? GetComponent<TextMeshProUGUI>();

        public YogaNode Layout;
        public UGUIContext Context;

        private float preferredWidth = 0;
        private float preferredHeight = 0;

        void Start()
        {
            if (Layout == null) enabled = false;
        }

        private void Update()
        {
            var nw = Text.preferredWidth;
            var nh = Text.preferredHeight;

            if (preferredWidth != nw || preferredHeight != nh)
            {
                preferredWidth = nw;
                preferredHeight = nh;
                Layout?.MarkDirty();
            }
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
