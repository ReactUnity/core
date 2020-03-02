using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class TextComponent : UnityComponent
    {
        private TextMeshProUGUI textComponent { get; set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextComponent(string text) : base()
        {
            Flex.AutoSized = true;

            // TODO: text sizes are not calculated right on the first frame they are added
            var tt = textComponent = GameObject.AddComponent<TextMeshProUGUI>();
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
            textComponent.text = text;
            RecalculateTextSize();
        }

        public override void ApplyStyles()
        {
            base.ApplyStyles();
            textComponent.fontSize = Style.resolved.fontSize;
            textComponent.fontStyle = Style.resolved.fontStyle;
            textComponent.fontWeight = Style.resolved.fontWeight;
            textComponent.color = Style.resolved.fontColor;
            RecalculateTextSize();
        }
    }
}
