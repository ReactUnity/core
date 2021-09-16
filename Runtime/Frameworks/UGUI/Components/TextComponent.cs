using System;
using Facebook.Yoga;
using ReactUnity.Types;
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

        private FontReference font;
        public FontReference Font
        {
            get => font;
            set
            {
                if (value != font)
                {
                    font = value;

                    font?.Get(Context, ft => {
                        if (font != value) return;

                        if (ft?.TmpFontAsset)
                        {
                            var asset = ft.TmpFontAsset;
                            Text.font = asset;
                            RecalculateFontStyleAndWeight();
                        }
                    });
                }
            }
        }

        public FontStyles FontStyles { get; set; }
        public FontWeight FontWeight { get; set; }

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

        public TextComponent(TextComponent linkedTo) : this(null, linkedTo.Context, linkedTo.Tag)
        {
            Style = linkedTo.Style;
            Style.changed += StyleChanged;

            SetParent(linkedTo.Parent, linkedTo, true);
        }

        public void SetText(string text)
        {
            if (!TextSetByStyle) Text.text = text;
            TextInside = text;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "richText")
            {
                Text.richText = Convert.ToBoolean(value);
            }
            else base.SetProperty(property, value);
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

            var fontSize = style.fontSize;
            Text.fontSize = fontSize;
            Text.color = style.color;
            Text.enableWordWrapping = style.textWrap;
            Text.alignment = style.textAlign;
            Text.overflowMode = style.textOverflow;
            Text.outlineWidth = style.textStrokeWidth;
            Text.outlineColor = style.textStrokeColor;

            Font = style.fontFamily;
            Text.fontStyle = FontStyles = style.fontStyle;
            Text.fontWeight = FontWeight = style.fontWeight;
            RecalculateFontStyleAndWeight();

            var lineHeight = style.lineHeight;
            Text.lineSpacing = (lineHeight - fontSize) / fontSize * 100;
            Text.characterSpacing = style.letterSpacing * 100;
            Text.wordSpacing = style.wordSpacing * 100;
            Text.maxVisibleLines = style.maxLines;

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
                    LinkedTextWatcher.LinkedText.Destroy(false);
                LinkedTextWatcher = null;
            }
        }

        protected override void DestroySelf()
        {
            base.DestroySelf();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy(false);
        }

        private void RecalculateFontStyleAndWeight()
        {
            if (!Text.font) return;

            if (FontWeight == FontWeight.Bold)
            {
                var boldWeight = Text.font.fontWeightTable[6];

                var isItalic = FontStyles.HasFlag(FontStyles.Italic);
                var wg = isItalic ? boldWeight.italicTypeface : boldWeight.regularTypeface;

                if (wg)
                {
                    Text.fontWeight = FontWeight;
                    Text.fontStyle = FontStyles;
                }
                else
                {
                    Text.fontWeight = FontWeight.Regular;
                    Text.fontStyle = FontStyles | FontStyles.Bold;
                }
            }
        }
    }
}
