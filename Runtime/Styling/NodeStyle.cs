using Facebook.Yoga;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class NodeStyle
    {
        // Universal default style
        public static ResolvedNodeStyle Default = new ResolvedNodeStyle()
        {
            //backgroundColor = Color.clear,
            fontWeight = FontWeight.Regular,
            fontStyle = FontStyles.Normal,
            fontColor = Color.black,
            fontSize = 24,
        };

        public static YogaValue Undefined = YogaValue.Undefined();


        // Non-inherited styles
        public float? opacity { get; set; }
        public int? zOrder { get; set; }
        public Color? backgroundColor { get; set; }

        // Inherited styles
        public Color? fontColor { get; set; }
        public FontWeight? fontWeight { get; set; }
        public FontStyles? fontStyle { get; set; }
        public YogaValue fontSize { get; set; }

        public ResolvedNodeStyle resolved { get; } = new ResolvedNodeStyle();


        public ResolvedNodeStyle ResolveStyle(ResolvedNodeStyle resolvedParent, NodeStyle tagDefaults)
        {
            resolved.opacity = opacity ?? tagDefaults.opacity ?? Default.opacity;
            resolved.zOrder = zOrder ?? tagDefaults.zOrder ?? Default.zOrder;
            resolved.backgroundColor = backgroundColor ?? tagDefaults.backgroundColor ?? Default.backgroundColor;

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


            var fontSize = Undefined.Equals(this.fontSize) ? tagDefaults.fontSize : this.fontSize;
            if (Undefined.Equals(fontSize) || fontSize.Unit == YogaUnit.Auto)
                resolved.fontSize = resolvedParent?.fontSize ?? Default.fontSize;
            else if (fontSize.Unit == YogaUnit.Percent)
                resolved.fontSize = (resolvedParent?.fontSize ?? Default.fontSize) * fontSize.Value;
            else resolved.fontSize = fontSize.Value;


            return resolved;
        }
    }


    public class ResolvedNodeStyle
    {
        // Not inherited styles
        public float? opacity { get; set; }
        public int? zOrder { get; set; }
        public Color? backgroundColor { get; set; }

        // Inherited styles
        public Color fontColor { get; set; }
        public FontWeight fontWeight { get; set; }
        public FontStyles fontStyle { get; set; }
        public float fontSize { get; set; }

    }
}
