using UnityEngine;

namespace ReactUnity.UGUI.Layout
{
    public class LinkedTextWatcher : MonoBehaviour
    {
        public TextComponent WatchedText { get; internal set; }
        public TextComponent LinkedText { get; internal set; }

        void Update()
        {
            var enableLink = WatchedText.ComputedStyle.textOverflow == TMPro.TextOverflowModes.Linked && WatchedText.Text.isTextOverflowing;

            if (enableLink && LinkedText == null)
            {
                LinkedText = new TextComponent(WatchedText);
                WatchedText.Text.linkedTextComponent = LinkedText.Text;
            }
            else if (!enableLink && LinkedText != null)
            {
                LinkedText.Destroy();
                LinkedText = null;
                WatchedText.Text.linkedTextComponent = null;
            }
        }
    }
}
