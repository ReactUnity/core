using System;
using System.Globalization;
using Facebook.Yoga;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.Measurers;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class TextComponent : UGUIComponent, ITextComponent
    {
        static TextInfo TextInfo = new CultureInfo("en-US", false).TextInfo;
        static FontStyles ResetTextTransform = ~(FontStyles.UpperCase | FontStyles.LowerCase | FontStyles.SmallCaps);

        public TextMeshProUGUI Text { get; private set; }

        public float Width => LayoutUtility.GetPreferredWidth(RectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(RectTransform);

        public TextMeasurer Measurer { get; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }

        public string Content => Text.text;

        private string TextInside;
        private bool TextSetByStyle = false;
        private bool TextCapitalized = false;

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
                            var style = ComputedStyle;
                            RecalculateFontStyleAndWeight(style.fontStyle, style.fontWeight, style.textTransform);
                        }
                    });
                }
            }
        }

        protected override string DefaultName => "TEXT";

        public TextComponent(string text, UGUIContext context, string tag) : base(context, tag, false)
        {
            Text = AddComponent<TextMeshProUGUI>();
            Component.Text = Text;

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
            if (!TextSetByStyle)
            {
                Text.text = TextCapitalized ? TextInfo.ToTitleCase(text) : text;
                Layout.MarkDirty();
            }
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

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            var style = ComputedStyle;

            var fontSize = style.fontSize;
            Text.fontSize = fontSize;
            Text.color = style.color;

#if REACT_TMP_X2
            Text.textWrappingMode = style.textWrap ? TextWrappingModes.Normal : TextWrappingModes.NoWrap;
#else
            Text.enableWordWrapping = style.textWrap;
#endif

            var textAlign = style.textAlign;
            var alignDefault = textAlign == TextAlignmentOptions.Converted;
            Text.alignment = alignDefault ? TextAlignmentOptions.TopLeft : textAlign;
            var align = (int) textAlign;
            if ((align > 500 && align < 530) || alignDefault)
                Text.verticalAlignment = style.verticalAlign;

            Text.overflowMode = style.textOverflow;
            Text.outlineWidth = style.textStrokeWidth;
            Text.outlineColor = style.textStrokeColor;

            Font = style.fontFamily;
            RecalculateFontStyleAndWeight(style.fontStyle, style.fontWeight, style.textTransform);

            var lineHeight = style.lineHeight;
            Text.lineSpacing = (lineHeight - fontSize) / fontSize * 100;
            Text.characterSpacing = style.letterSpacing * 100;
            Text.wordSpacing = style.wordSpacing * 100;

            var maxLines = style.maxLines;
            if (Text.maxVisibleLines != maxLines)
            {
                Text.maxVisibleLines = maxLines;
                Layout.MarkDirty();
            }


            string finalText;

            TextSetByStyle = style.content != null;
            if (TextSetByStyle) finalText = style.content;
            else finalText = TextInside;

            TextCapitalized = style.textTransform == TextTransform.Capitalize;
            if (TextCapitalized) finalText = TextInfo.ToTitleCase(finalText);

            if (Text.text != finalText)
            {
                Text.text = finalText;
                Layout.MarkDirty();
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

            // Fixes garbled text after color change
            Text.UpdateFontAsset();
        }

        protected override void DestroySelf()
        {
            base.DestroySelf();
            if (LinkedTextWatcher?.LinkedText != null)
                LinkedTextWatcher.LinkedText.Destroy(false);
        }

        private void RecalculateFontStyleAndWeight(FontStyles styles = FontStyles.Normal, FontWeight weight = FontWeight.Regular, TextTransform transform = TextTransform.None)
        {
            styles = styles & ResetTextTransform;
            Text.fontStyle = styles;
            Text.fontWeight = weight;

            if (!Text.font) return;

            if (weight == FontWeight.Bold)
            {
                var boldWeight = Text.font.fontWeightTable[6];

                var isItalic = styles.HasFlag(FontStyles.Italic);
                var wg = isItalic ? boldWeight.italicTypeface : boldWeight.regularTypeface;

                if (wg)
                {
                    Text.fontWeight = weight;
                    Text.fontStyle = styles;
                }
                else
                {
                    Text.fontWeight = FontWeight.Regular;
                    Text.fontStyle = styles | FontStyles.Bold;
                }
            }

            if (transform == TextTransform.UpperCase) Text.fontStyle = styles | FontStyles.UpperCase;
            else if (transform == TextTransform.LowerCase) Text.fontStyle = styles | FontStyles.LowerCase;
            else if (transform == TextTransform.SmallCaps) Text.fontStyle = styles | FontStyles.SmallCaps;
        }

        public string GetLinkInfo(PointerEventData eventData)
        {
            var camera = RectTransform.GetComponentInParent<Canvas>()?.worldCamera;
            int linkIndex = TMP_TextUtilities.FindIntersectingLink(Text, eventData.position, camera);
            if (linkIndex != -1)
            {
                TMP_LinkInfo linkInfo = Text.textInfo.linkInfo[linkIndex];
                return linkInfo.GetLinkID();
            }
            return null;
        }
    }

    public class RichTextComponent : TextComponent
    {
        protected override string DefaultName => "RICHTEXT";

        public RichTextComponent(string text, UGUIContext context, string tag) : base(text, context, tag)
        {
            Text.richText = true;
        }
    }
}
