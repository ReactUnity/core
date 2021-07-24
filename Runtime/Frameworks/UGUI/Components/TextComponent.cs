using Facebook.Yoga;
using ReactUnity.UGUI.Behaviours;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class TextComponent : UGUIComponent, ITextComponent
    {
        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextMeasurer Measurer { get; private set; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }

        public string Content => Text.text;

        private string TextInside;
        private bool TextSetByStyle = false;


        public TextComponent(string text, UGUIContext context, string tag) : base(context, tag, false)
        {
            GameObject.name = "TEXT";
            Text = AddComponent<TextMeshProUGUI>();

            Measurer = AddComponent<TextMeasurer>();
            Measurer.Layout = Layout;
            Measurer.Context = context;
            Layout.SetMeasureFunction(Measurer.Measure);

            if (text != null) SetText(text);
        }

        public TextComponent(TextComponent linkedTo) : this(null, linkedTo.Context, "")
        {
            Layout.CopyStyle(linkedTo.Layout);
            ComputedStyle.CopyStyle(linkedTo.ComputedStyle);
            Style = linkedTo.Style;
            Style.changed += StyleChanged;

            SetParent(linkedTo.Parent, linkedTo, true);

            ApplyLayoutStylesSelf();
            ApplyStyles();
        }

        public void SetText(string text)
        {
            if (!TextSetByStyle) Text.text = text;
            TextInside = text;
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
            Text.isRightToLeftText = Layout.LayoutDirection == YogaDirection.RTL;
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            var style = ComputedStyle;

            style.fontFamily.Get(Context, font => {
                if (font?.TmpFontAsset) Text.font = font?.TmpFontAsset;
            });
            var fontSize = style.fontSize;
            Text.fontSize = fontSize;
            Text.fontStyle = style.fontStyle;
            Text.fontWeight = style.fontWeight;
            Text.color = style.color;
            Text.enableWordWrapping = style.textWrap;
            Text.alignment = style.textAlign;
            Text.overflowMode = style.textOverflow;

            var lineHeight = style.lineHeight;
            Text.lineSpacing = (lineHeight - fontSize) / fontSize * 100;

            if (style.content != null)
            {
                Text.text = style.content;
                TextSetByStyle = true;
            }
            else if (TextSetByStyle)
            {
                Text.text = TextInside;
                TextSetByStyle = false;
            }

            var isLinked = style.textOverflow == TextOverflowModes.Linked;
            if (isLinked && !LinkedTextWatcher)
            {
                LinkedTextWatcher = AddComponent<LinkedTextWatcher>();
                LinkedTextWatcher.WatchedText = this;
            }
            else if (!isLinked && LinkedTextWatcher)
            {
                GameObject.Destroy(LinkedTextWatcher);
                if (LinkedTextWatcher?.LinkedText != null)
                    LinkedTextWatcher.LinkedText.Destroy();
                LinkedTextWatcher = null;
            }
        }

        public override void DestroySelf()
        {
            base.DestroySelf();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy();
        }
    }
}
