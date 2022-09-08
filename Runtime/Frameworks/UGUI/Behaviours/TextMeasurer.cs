using System;
using System.Text;
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
            var values = Vector2.zero;
            var valuesFound = false;

            var maxLines = Text.maxVisibleLines;
            if (maxLines < Int16.MaxValue)
            {
                var ti = Text.GetTextInfo(Text.text);
                if (ti.lineCount > maxLines)
                {
                    maxLines--;

                    var txt = new StringBuilder();

                    var ci = ti.characterInfo;
                    var len = ci.Length;

                    if (ci[len - 1].lineNumber > maxLines)
                    {
                        for (int i = 0; i < len; i++)
                        {
                            var c = ci[i];
                            if (c.lineNumber > maxLines) break;
                            txt.Append(ci[i].character);
                        }
                        values = Text.GetPreferredValues(txt.ToString(), width, height);
                        valuesFound = true;
                    }
                }
            }

            if (!valuesFound)
            {
                values = Text.GetPreferredValues(width, height);
            }

            return new YogaSize
            {
                width = Mathf.Ceil(values.x),
                height = Mathf.Ceil(values.y),
            };
        }
    }
}
