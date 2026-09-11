using System;
using System.Globalization;
using ReactUnity.Types;
using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.Internal;
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

        public float Width => LayoutUtility.GetPreferredWidth(Text.rectTransform);
        public float Height => LayoutUtility.GetPreferredHeight(Text.rectTransform);

        public TextMeasurer Measurer { get; }
        public LinkedTextWatcher LinkedTextWatcher { get; private set; }

        public string Content => ContentText;

        private string TextInside;
        private string ContentText;
        private string DecorationOpen = "";
        private string DecorationClose = "";
        private bool TextSetByStyle = false;
        private bool TextCapitalized = false;

        private Color lastAppliedColor;
        private TMP_FontAsset lastAppliedFontAsset;

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

#if REACT_TMP
                        if (ft?.TmpFontAsset)
                        {
                            var asset = ft.TmpFontAsset;
                            FontFallbacks.Apply(asset, ft.Fallbacks);
                            Text.font = asset;
                            var style = ComputedStyle;
                            RecalculateFontStyleAndWeight(style.fontStyle, style.fontWeight, style.textTransform);
                            RecalculateLineHeight();
                        }
#endif
                    });
                }
            }
        }

        protected override string DefaultName => "TEXT";

        public TextComponent(string text, UGUIContext context, string tag) : base(context, tag, false)
        {
#if REACT_RTLTMPRO
            Text = CreateGraphicChild<RTLTMPro.RTLTextMeshPro>("[Text]");
#else
            Text = CreateGraphicChild<TextMeshProUGUI>("[Text]");
#endif
            Component.Text = Text;

            Measurer = AddComponent<TextMeasurer>();
            Measurer.Text = Text;
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
                SetRenderedText(TextCapitalized ? TextInfo.ToTitleCase(text) : text);
                Layout.MarkDirty();
            }
            TextInside = text;
        }

        /// <summary>
        /// Assigns the content wrapped in whatever decoration tags are active. <see cref="Content"/>
        /// stays the content itself, which is what <c>textContent</c> and <c>:empty</c> read.
        /// </summary>
        /// <returns>Whether the string TMP holds changed, and so whether layout has to be redone.</returns>
        private bool SetRenderedText(string content)
        {
            ContentText = content;

            var rendered = DecorationOpen.Length == 0 || string.IsNullOrEmpty(content)
                ? content
                : DecorationOpen + content + DecorationClose;

            if (Text.text == rendered) return false;
            Text.text = rendered;
            return true;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "richText")
            {
                Text.richText = Convert.ToBoolean(value);

                // The decoration tags are only emitted while rich text is on, and no style pass
                // follows a property change, so the wrap is redone here.
                if (ContentText != null)
                {
                    var style = ComputedStyle;
                    RecalculateDecorationColor(style.fontStyle, style.color, style.textDecorationColor);
                    if (SetRenderedText(ContentText)) Layout.MarkDirty();
                }
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

            var whiteSpace = style.whiteSpace;
#if REACT_TMP_X2
            Text.textWrappingMode = whiteSpace.Wraps()
                ? (whiteSpace.PreservesWhitespace() ? TextWrappingModes.PreserveWhitespace : TextWrappingModes.Normal)
                : (whiteSpace.PreservesWhitespace() ? TextWrappingModes.PreserveWhitespaceNoWrap : TextWrappingModes.NoWrap);
#else
            Text.enableWordWrapping = whiteSpace.Wraps();
#endif

            var textAlign = style.textAlign;
            var alignDefault = textAlign == TextAlignmentOptions.Converted;
            Text.alignment = alignDefault ? TextAlignmentOptions.TopLeft : textAlign;
            var align = (int) textAlign;
            if ((align > 500 && align < 530) || alignDefault)
                Text.verticalAlignment = style.verticalAlign;

            Text.overflowMode = style.textOverflow;

            Font = style.fontFamily;
            RecalculateFontStyleAndWeight(style.fontStyle, style.fontWeight, style.textTransform);
            RecalculateLineHeight();

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

            RecalculateDecorationColor(style.fontStyle, style.color, style.textDecorationColor);

            if (SetRenderedText(finalText)) Layout.MarkDirty();


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

            // Fixes garbled text after a color change. It reloads the font asset and dirties the
            // material, so it is gated on something having actually changed -- a style is re-applied
            // every frame while an animation runs.
            if (Text.color != lastAppliedColor || Text.font != lastAppliedFontAsset)
            {
                lastAppliedColor = Text.color;
                lastAppliedFontAsset = Text.font;
                Text.UpdateFontAsset();
            }

            // Assigning fontMaterial replaces fontSharedMaterial too, so the font asset's own material is the base.
            var effect = new TextEffects
            {
                BaseMaterial = Text.font ? Text.font.material : Text.fontSharedMaterial,
                TextStrokeWidth = style.textStrokeWidth,
                TextStrokeColor = style.textStrokeColor,
            };
            effect.SetShadow(style.textShadow?.Get(0), fontSize, Text.font);
            Text.fontMaterial = effect.GetModifiedMaterial();
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
            var finalStyle = styles;

            // A `@font-face` that named this weight or this slope already gave us the face for it, so
            // neither TMP's own weight table nor its synthetic bold and skew have anything left to do.
            var resolved = font?.CachedValue;

            if (resolved != null && resolved.MatchesItalic) finalStyle = finalStyle & ~FontStyles.Italic;
            var appliedWeight = resolved != null && resolved.MatchesWeight ? FontWeight.Regular : weight;

            if (Text.font)
            {
                if (resolved == null || !resolved.MatchesWeight)
                {
                    var weightIndex = ((int) weight / 100) - 1;
                    var isItalic = styles.HasFlag(FontStyles.Italic);
                    var assignedWeight = Text.font.fontWeightTable[weightIndex];
                    var wg = isItalic ? assignedWeight.italicTypeface : assignedWeight.regularTypeface;

                    if (!wg && weightIndex >= 6)
                    {
                        finalStyle = finalStyle | FontStyles.Bold;
                    }
                }

                if (transform == TextTransform.UpperCase) finalStyle = finalStyle | FontStyles.UpperCase;
                else if (transform == TextTransform.LowerCase) finalStyle = finalStyle | FontStyles.LowerCase;
                else if (transform == TextTransform.SmallCaps) finalStyle = finalStyle | FontStyles.SmallCaps;
            }

            // Assigned once, and only on a change: TMP rebuilds the mesh on every assignment, and
            // this runs on each style application -- every frame while an animation is going.
            if (Text.fontStyle != finalStyle) Text.fontStyle = finalStyle;
            if (Text.fontWeight != appliedWeight) Text.fontWeight = appliedWeight;
        }

        /// <summary>
        /// TMP has no per-element underline or strikethrough colour. The rich text tags are the only
        /// way in: their <c>color</c> attribute seeds the per-character decoration colour that the
        /// mesh builder reads, where the element-level <c>fontStyle</c> flag leaves it as the text
        /// colour. So a differing colour is applied by wrapping the content.
        /// </summary>
        private void RecalculateDecorationColor(FontStyles styles, Color color, Color decorationColor)
        {
            var open = "";
            var close = "";

            // Skipped when rich text is off, where the tags would render as literal characters.
            if (Text.richText && decorationColor != color)
            {
                // TMP clamps the decoration's alpha to the text's, so a translucent `color` shows
                // through to the line. That is close enough to the web to leave alone.
                var hex = "#" + ColorUtility.ToHtmlStringRGBA(decorationColor);

                if ((styles & FontStyles.Underline) != 0)
                {
                    open += "<u color=" + hex + ">";
                    close = "</u>" + close;
                }

                if ((styles & FontStyles.Strikethrough) != 0)
                {
                    open += "<s color=" + hex + ">";
                    close = "</s>" + close;
                }
            }

            DecorationOpen = open;
            DecorationClose = close;
        }

        private void RecalculateLineHeight()
        {
            var style = ComputedStyle;
            var fontSize = Text.fontSize;
            var lineHeight = style.lineHeight;
            var fi = Text.font.faceInfo;

            var scale = fi.pointSize == 0 ? 1 : fontSize / fi.pointSize;

            var fontLineHeight = fi.lineHeight * scale;

            var lineDif = lineHeight - fontLineHeight;
            var halfLineDif = lineDif / 2;

            Text.margin = new Vector4(0, halfLineDif, 0, Math.Abs(halfLineDif));
            Text.lineSpacing = lineDif / fontSize * 100;
            Text.characterSpacing = style.letterSpacing / fontSize * 100;
            Text.wordSpacing = style.wordSpacing / fontSize * 100;
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
