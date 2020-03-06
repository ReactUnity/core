using ReactUnity.Components;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class LinkedTextWatcher : MonoBehaviour
    {
        public TextComponent WatchedText { get; internal set; }
        public TextComponent LinkedText { get; internal set; }

        private int overflowIndex = -1;


        void Update()
        {
            var enableLink = WatchedText.Style.resolved.textOverflow == TMPro.TextOverflowModes.Linked && WatchedText.Text.isTextOverflowing;
            var newOverflowIndex = WatchedText.Text.firstOverflowCharacterIndex;
            enableLink = enableLink && newOverflowIndex > 0;

            if (enableLink && LinkedText == null)
            {
                LinkedText = new TextComponent(WatchedText);
            }
            else if (!enableLink && LinkedText != null)
            {
                LinkedText.Destroy();
                LinkedText = null;
            }


            if (LinkedText != null && overflowIndex != newOverflowIndex)
            {
                overflowIndex = newOverflowIndex;
                if (overflowIndex <= 0) LinkedText.SetText("");
                else
                {
                    if (overflowIndex >= WatchedText.Text.text.Length) return;
                    LinkedText.SetText(WatchedText.Text.text.Substring(overflowIndex));
                }
            }
        }
    }
}
