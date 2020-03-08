using Facebook.Yoga;
using System;
using TMPro;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        // Universal default style
        public static ResolvedNodeStyle Default = new ResolvedNodeStyle();
        public static YogaValue Undefined = YogaValue.Undefined();

        public ResolvedNodeStyle resolved { get; } = new ResolvedNodeStyle();

        #region Fields

        private TMP_FontAsset _font;
        private Color? _fontColor;
        private FontWeight? _fontWeight;
        private FontStyles? _fontStyle;
        private YogaValue _fontSize;
        private TextOverflowModes? _textOverflow;
        private bool? _textWrap;

        #endregion


        #region Changes

        public bool hasChanges = true;
        public bool hasInteritedChanges = true;

        public bool fontChanged = true;
        public bool fontColorChanged = true;
        public bool fontWeightChanged = true;
        public bool fontStyleChanged = true;
        public bool fontSizeChanged = true;
        public bool textOverflowChanged = true;
        public bool textWrapChanged = true;

        #endregion


        #region Changes

        // Non-inherited styles
        public float? opacity { get; set; }
        public int? zOrder { get; set; }
        public bool? hidden { get; set; }
        public InteractionType? interaction { get; set; }

        public Color? backgroundColor { get; set; }
        public object backgroundImage { get; set; }

        public int? borderRadius { get; set; }
        public Color? borderColor { get; set; }

        public ShadowDefinition boxShadow { get; set; }

        public Vector2? translate { get; set; }
        public Vector2? scale { get; set; }
        public Vector2? pivot { get; set; }
        public float? rotate { get; set; }

        // Inherited styles
        public TMP_FontAsset font
        {
            get => _font;
            set
            {
                fontChanged = fontChanged || value != _font;
                hasInteritedChanges = hasInteritedChanges || fontChanged;
                hasChanges = hasChanges || fontChanged;
                _font = value;
            }
        }

        public Color? fontColor
        {
            get => _fontColor;
            set
            {
                fontColorChanged = fontColorChanged || value != _fontColor;
                hasInteritedChanges = hasInteritedChanges || fontColorChanged;
                hasChanges = hasChanges || fontColorChanged;
                _fontColor = value;
            }
        }

        public FontWeight? fontWeight
        {
            get => _fontWeight;
            set
            {
                fontWeightChanged = fontWeightChanged || value != _fontWeight;
                hasInteritedChanges = hasInteritedChanges || fontWeightChanged;
                hasChanges = hasChanges || fontWeightChanged;
                _fontWeight = value;
            }
        }

        public FontStyles? fontStyle
        {
            get => _fontStyle;
            set
            {
                fontStyleChanged = fontStyleChanged || value != _fontStyle;
                hasInteritedChanges = hasInteritedChanges || fontStyleChanged;
                hasChanges = hasChanges || fontStyleChanged;
                _fontStyle = value;
            }
        }

        public YogaValue fontSize
        {
            get => _fontSize;
            set
            {
                fontSizeChanged = fontSizeChanged || !value.Equals(_fontSize);
                hasInteritedChanges = hasInteritedChanges || fontSizeChanged;
                hasChanges = hasChanges || fontSizeChanged;
                _fontSize = value;
            }
        }

        public TextOverflowModes? textOverflow
        {
            get => _textOverflow;
            set
            {
                textOverflowChanged = textOverflowChanged || value != _textOverflow;
                hasInteritedChanges = hasInteritedChanges || textOverflowChanged;
                hasChanges = hasChanges || textOverflowChanged;
                _textOverflow = value;
            }
        }

        public bool? textWrap
        {
            get => _textWrap;
            set
            {
                textWrapChanged = textWrapChanged || value != _textWrap;
                hasInteritedChanges = hasInteritedChanges || textWrapChanged;
                hasChanges = hasChanges || textWrapChanged;
                _textWrap = value;
            }
        }

        #endregion



        public ResolvedNodeStyle ResolveStyle(ResolvedNodeStyle resolvedParent, NodeStyle tagDefaults)
        {
            resolved.opacity = opacity ?? tagDefaults?.opacity ?? Default.opacity;
            resolved.zOrder = zOrder ?? tagDefaults?.zOrder ?? Default.zOrder;
            resolved.hidden = hidden ?? tagDefaults?.hidden ?? Default.hidden;
            resolved.interaction = interaction ?? tagDefaults?.interaction ?? Default.interaction;

            resolved.backgroundColor = backgroundColor ?? tagDefaults?.backgroundColor ?? Default.backgroundColor;
            resolved.backgroundImage = backgroundImage ?? tagDefaults?.backgroundImage ?? Default.backgroundImage;
            resolved.borderRadius = borderRadius ?? tagDefaults?.borderRadius ?? Default.borderRadius;
            resolved.borderColor = borderColor ?? tagDefaults?.borderColor ?? Default.borderColor;
            resolved.boxShadow = boxShadow ?? tagDefaults?.boxShadow ?? Default.boxShadow;

            resolved.translate = translate ?? tagDefaults?.translate ?? Default.translate;
            resolved.scale = scale ?? tagDefaults?.scale ?? Default.scale;
            resolved.pivot = pivot ?? tagDefaults?.pivot ?? Default.pivot;
            resolved.rotate = rotate ?? tagDefaults?.rotate ?? Default.rotate;

            // Inherited styles
            resolved.font = font ?? tagDefaults?.font ?? resolvedParent?.font ?? Default.font;

            var fontColor = this.fontColor ?? tagDefaults?.fontColor;
            if (!fontColor.HasValue) resolved.fontColor = resolvedParent?.fontColor ?? Default.fontColor;
            else resolved.fontColor = fontColor.Value;

            var fontWeight = this.fontWeight ?? tagDefaults?.fontWeight;
            if (!fontWeight.HasValue) resolved.fontWeight = resolvedParent?.fontWeight ?? Default.fontWeight;
            else resolved.fontWeight = fontWeight.Value;

            var fontStyle = this.fontStyle ?? tagDefaults?.fontStyle;
            if (!fontStyle.HasValue) resolved.fontStyle = resolvedParent?.fontStyle ?? Default.fontStyle;
            else resolved.fontStyle = fontStyle.Value;

            var textOverflow = this.textOverflow ?? tagDefaults?.textOverflow;
            if (!textOverflow.HasValue) resolved.textOverflow = resolvedParent?.textOverflow ?? Default.textOverflow;
            else resolved.textOverflow = textOverflow.Value;

            var textWrap = this.textWrap ?? tagDefaults?.textWrap;
            if (!textWrap.HasValue) resolved.textWrap = resolvedParent?.textWrap ?? Default.textWrap;
            else resolved.textWrap = textWrap.Value;

            var fontSize = Undefined.Equals(this.fontSize) ? (tagDefaults?.fontSize ?? Undefined) : this.fontSize;
            if (Undefined.Equals(fontSize) || fontSize.Unit == YogaUnit.Auto)
                resolved.fontSize = resolvedParent?.fontSize ?? Default.fontSize;
            else if (fontSize.Unit == YogaUnit.Percent)
                resolved.fontSize = (resolvedParent?.fontSize ?? Default.fontSize) * fontSize.Value;
            else resolved.fontSize = fontSize.Value;

            resolved.hasInteritedChanges = hasInteritedChanges || (resolvedParent?.hasInteritedChanges ?? false);

            return resolved;
        }

        public void CopyStyle(NodeStyle copyFrom)
        {
            opacity = copyFrom.opacity;
            zOrder = copyFrom.zOrder;
            hidden = copyFrom.hidden;
            interaction = copyFrom.interaction;

            backgroundImage = copyFrom.backgroundImage;
            backgroundColor = copyFrom.backgroundColor;
            borderRadius = copyFrom.borderRadius;
            borderColor = copyFrom.borderColor;
            boxShadow = copyFrom.boxShadow;

            translate = copyFrom.translate;
            scale = copyFrom.scale;
            pivot = copyFrom.pivot;
            rotate = copyFrom.rotate;

            font = copyFrom.font;
            fontColor = copyFrom.fontColor;
            fontWeight = copyFrom.fontWeight;
            fontStyle = copyFrom.fontStyle;
            fontSize = copyFrom.fontSize;
            textOverflow = copyFrom.textOverflow;
            textWrap = copyFrom.textWrap;

            hasChanges = true;
            hasInteritedChanges = true;
        }

        public void MarkChangesSeen()
        {
            hasChanges = false;
            hasInteritedChanges = false;

            fontChanged = false;
            fontColorChanged = false;
            fontWeightChanged = false;
            fontStyleChanged = false;
            fontSizeChanged = false;
            textOverflowChanged = false;
            textWrapChanged = false;
        }
    }


    public class ResolvedNodeStyle
    {
        public bool hasInteritedChanges { get; set; }

        // Non-inherited styles
        public float opacity { get; set; } = 1;
        public int zOrder { get; set; } = 0;
        public bool hidden { get; set; } = false;
        public InteractionType interaction { get; set; } = InteractionType.WhenVisible;

        public Color? backgroundColor { get; set; } = null;
        public object backgroundImage { get; set; } = null;

        public int borderRadius { get; set; } = 0;
        public Color? borderColor { get; set; } = Color.black;

        public ShadowDefinition boxShadow { get; set; } = null;

        public Vector2 translate { get; set; } = Vector2.zero;
        public Vector2 scale { get; set; } = Vector2.one;
        public Vector2 pivot { get; set; } = Vector2.one / 2;
        public float rotate { get; set; } = 0;

        // Inherited styles
        public TMP_FontAsset font { get; set; } = null;
        public Color fontColor { get; set; } = Color.black;
        public FontWeight fontWeight { get; set; } = FontWeight.Regular;
        public FontStyles fontStyle { get; set; } = FontStyles.Normal;
        public float fontSize { get; set; } = 24;
        public TextOverflowModes textOverflow { get; set; } = TextOverflowModes.Overflow;
        public bool textWrap { get; set; } = true;
    }

    public enum InteractionType
    {
        WhenVisible = 0,
        Always = 1,
        Ignore = 2,
        Block = 3,
    }

    [Serializable]
    public class ShadowDefinition
    {
        public Vector2 offset;
        public Vector2 spread;
        public Color color = Color.black;
        public float blur;

        public ShadowDefinition() { }

        public ShadowDefinition(Vector2 offset, Vector2 spread, Color color, float blur)
        {
            this.offset = offset;
            this.spread = spread;
            this.color = color;
            this.blur = blur;
        }
    }
}
