using Facebook.Yoga;
using TMPro;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        // Universal default style
        public static ResolvedNodeStyle Default = new ResolvedNodeStyle()
        {
            opacity = 1,
            zOrder = 0,
            hidden = false,
            interaction = InteractionType.WhenVisible,

            backgroundColor = null,
            backgroundImage = null,

            borderRadius = 0,
            borderColor = Color.black,

            translate = Vector2.zero,
            scale = Vector2.one,
            pivot = Vector2.one / 2,
            rotate = 0,

            fontWeight = FontWeight.Regular,
            fontStyle = FontStyles.Normal,
            fontColor = Color.black,
            fontSize = 24,
            textWrap = true,
            textOverflow = TextOverflowModes.Overflow,
        };

        public static YogaValue Undefined = YogaValue.Undefined();

        public ResolvedNodeStyle resolved { get; } = new ResolvedNodeStyle();

        // Non-inherited styles
        public float? opacity { get; set; }
        public int? zOrder { get; set; }
        public bool? hidden { get; set; }
        public InteractionType? interaction { get; set; }

        public Color? backgroundColor { get; set; }
        public object backgroundImage { get; set; }

        public int? borderRadius { get; set; }
        public Color? borderColor { get; set; }

        public Vector2? translate { get; set; }
        public Vector2? scale { get; set; }
        public Vector2? pivot { get; set; }
        public float? rotate { get; set; }

        // Inherited styles
        public Color? fontColor { get; set; }
        public FontWeight? fontWeight { get; set; }
        public FontStyles? fontStyle { get; set; }
        public YogaValue fontSize { get; set; }
        public TextOverflowModes? textOverflow { get; set; }
        public bool? textWrap { get; set; }


        public ResolvedNodeStyle ResolveStyle(ResolvedNodeStyle resolvedParent, NodeStyle tagDefaults)
        {
            resolved.opacity = opacity ?? tagDefaults.opacity ?? Default.opacity;
            resolved.zOrder = zOrder ?? tagDefaults.zOrder ?? Default.zOrder;
            resolved.hidden = hidden ?? tagDefaults.hidden ?? Default.hidden;
            resolved.interaction = interaction ?? tagDefaults.interaction ?? Default.interaction;

            resolved.backgroundColor = backgroundColor ?? tagDefaults.backgroundColor ?? Default.backgroundColor;
            resolved.backgroundImage = backgroundImage ?? tagDefaults.backgroundImage ?? Default.backgroundImage;
            resolved.borderRadius = borderRadius ?? tagDefaults.borderRadius ?? Default.borderRadius;
            resolved.borderColor = borderColor ?? tagDefaults.borderColor ?? Default.borderColor;

            resolved.translate = translate ?? tagDefaults.translate ?? Default.translate;
            resolved.scale = scale ?? tagDefaults.scale ?? Default.scale;
            resolved.pivot = pivot ?? tagDefaults.pivot ?? Default.pivot;
            resolved.rotate = rotate ?? tagDefaults.rotate ?? Default.rotate;

            // Inherited styles
            var fontColor = this.fontColor ?? tagDefaults.fontColor;
            if (!fontColor.HasValue) resolved.fontColor = resolvedParent?.fontColor ?? Default.fontColor;
            else resolved.fontColor = fontColor.Value;

            var fontWeight = this.fontWeight ?? tagDefaults.fontWeight;
            if (!fontWeight.HasValue) resolved.fontWeight = resolvedParent?.fontWeight ?? Default.fontWeight;
            else resolved.fontWeight = fontWeight.Value;

            var fontStyle = this.fontStyle ?? tagDefaults.fontStyle;
            if (!fontStyle.HasValue) resolved.fontStyle = resolvedParent?.fontStyle ?? Default.fontStyle;
            else resolved.fontStyle = fontStyle.Value;

            var textOverflow = this.textOverflow ?? tagDefaults.textOverflow;
            if (!textOverflow.HasValue) resolved.textOverflow = resolvedParent?.textOverflow ?? Default.textOverflow;
            else resolved.textOverflow = textOverflow.Value;

            var textWrap = this.textWrap ?? tagDefaults.textWrap;
            if (!textWrap.HasValue) resolved.textWrap = resolvedParent?.textWrap ?? Default.textWrap;
            else resolved.textWrap = textWrap.Value;

            var fontSize = Undefined.Equals(this.fontSize) ? tagDefaults.fontSize : this.fontSize;
            if (Undefined.Equals(fontSize) || fontSize.Unit == YogaUnit.Auto)
                resolved.fontSize = resolvedParent?.fontSize ?? Default.fontSize;
            else if (fontSize.Unit == YogaUnit.Percent)
                resolved.fontSize = (resolvedParent?.fontSize ?? Default.fontSize) * fontSize.Value;
            else resolved.fontSize = fontSize.Value;


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

            translate = copyFrom.translate;
            scale = copyFrom.scale;
            pivot = copyFrom.pivot;
            rotate = copyFrom.rotate;

            fontColor = copyFrom.fontColor;
            fontWeight = copyFrom.fontWeight;
            fontStyle = copyFrom.fontStyle;
            fontSize = copyFrom.fontSize;
            textOverflow = copyFrom.textOverflow;
            textWrap = copyFrom.textWrap;
        }
    }


    public class ResolvedNodeStyle
    {
        // Non-inherited styles
        public float opacity { get; set; }
        public int zOrder { get; set; }
        public bool hidden { get; set; }
        public InteractionType interaction { get; set; }


        public Color? backgroundColor { get; set; }
        public object backgroundImage { get; set; }
        public int borderRadius { get; set; }
        public Color? borderColor { get; set; }

        public Vector2 translate { get; set; }
        public Vector2 scale { get; set; }
        public Vector2 pivot { get; set; }
        public float rotate { get; set; }

        // Inherited styles
        public Color fontColor { get; set; }
        public FontWeight fontWeight { get; set; }
        public FontStyles fontStyle { get; set; }
        public float fontSize { get; set; }
        public TextOverflowModes textOverflow { get; set; }
        public bool textWrap { get; set; }
    }

    public enum InteractionType
    {
        WhenVisible = 0,
        Always = 1,
        Ignore = 2,
        Block = 3,
    }
}
