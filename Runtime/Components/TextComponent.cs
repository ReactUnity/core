using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class TextComponent : UnityComponent
    {
        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextComponent(string text) : base()
        {
            Flex.AutoSized = true;

            // TODO: text sizes are not calculated right on the first frame they are added
            var tt = Text = GameObject.AddComponent<TextMeshProUGUI>();
            MainGraphic = tt;
            SetText(text);
        }

        public void RecalculateTextSize()
        {
            Layout.Width = Mathf.CeilToInt(Width);
            Layout.Height = Mathf.CeilToInt(Height);
        }

        public void SetText(string text)
        {
            Text.text = text;
            RecalculateTextSize();
        }

        public override void ApplyStyles()
        {
            base.ApplyStyles();
            Text.fontSize = Style.resolved.fontSize;
            Text.fontStyle = Style.resolved.fontStyle;
            Text.fontWeight = Style.resolved.fontWeight;
            Text.color = Style.resolved.fontColor;
            RecalculateTextSize();
        }
    }
}
