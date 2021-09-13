using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;

namespace ReactUnity.Styling
{
    public static class LayoutProperties
    {
        public static LayoutProperty<YogaDirection> StyleDirection = new LayoutProperty<YogaDirection>("StyleDirection");
        public static LayoutProperty<YogaFlexDirection> FlexDirection = new LayoutProperty<YogaFlexDirection>("FlexDirection");
        public static LayoutProperty<YogaJustify> JustifyContent = new LayoutProperty<YogaJustify>("JustifyContent");
        public static LayoutProperty<YogaDisplay> Display = new LayoutProperty<YogaDisplay>("Display");
        public static LayoutProperty<YogaAlign> AlignItems = new LayoutProperty<YogaAlign>("AlignItems");
        public static LayoutProperty<YogaAlign> AlignSelf = new LayoutProperty<YogaAlign>("AlignSelf");
        public static LayoutProperty<YogaAlign> AlignContent = new LayoutProperty<YogaAlign>("AlignContent");
        public static LayoutProperty<YogaWrap> Wrap = new LayoutProperty<YogaWrap>("Wrap");
        public static LayoutProperty<YogaOverflow> Overflow = new LayoutProperty<YogaOverflow>("Overflow", true);
        public static LayoutProperty<float> AspectRatio = new LayoutProperty<float>("AspectRatio", true, float.NaN);
        public static LayoutProperty<float> FlexGrow = new LayoutProperty<float>("FlexGrow", true, float.NaN);
        public static LayoutProperty<float> FlexShrink = new LayoutProperty<float>("FlexShrink", true, float.NaN);
        public static LayoutProperty<YogaValue> FlexBasis = new LayoutProperty<YogaValue>("FlexBasis", true);
        public static LayoutProperty<YogaValue> Width = new LayoutProperty<YogaValue>("Width", true);
        public static LayoutProperty<YogaValue> Height = new LayoutProperty<YogaValue>("Height", true);
        public static LayoutProperty<YogaValue> MinWidth = new LayoutProperty<YogaValue>("MinWidth", true);
        public static LayoutProperty<YogaValue> MinHeight = new LayoutProperty<YogaValue>("MinHeight", true);
        public static LayoutProperty<YogaValue> MaxWidth = new LayoutProperty<YogaValue>("MaxWidth", true);
        public static LayoutProperty<YogaValue> MaxHeight = new LayoutProperty<YogaValue>("MaxHeight", true);
        public static LayoutProperty<YogaValue> Left = new LayoutProperty<YogaValue>("Left", true, YogaValue.Undefined());
        public static LayoutProperty<YogaValue> Right = new LayoutProperty<YogaValue>("Right", true, YogaValue.Undefined());
        public static LayoutProperty<YogaValue> Top = new LayoutProperty<YogaValue>("Top", true, YogaValue.Undefined());
        public static LayoutProperty<YogaValue> Bottom = new LayoutProperty<YogaValue>("Bottom", true, YogaValue.Undefined());
        public static LayoutProperty<YogaValue> Start = new LayoutProperty<YogaValue>("Start", true, YogaValue.Undefined());
        public static LayoutProperty<YogaValue> End = new LayoutProperty<YogaValue>("End", true, YogaValue.Undefined());
        public static LayoutProperty<YogaValue> Margin = new LayoutProperty<YogaValue>("Margin", true);
        public static LayoutProperty<YogaValue> MarginLeft = new LayoutProperty<YogaValue>("MarginLeft", true);
        public static LayoutProperty<YogaValue> MarginRight = new LayoutProperty<YogaValue>("MarginRight", true);
        public static LayoutProperty<YogaValue> MarginTop = new LayoutProperty<YogaValue>("MarginTop", true);
        public static LayoutProperty<YogaValue> MarginBottom = new LayoutProperty<YogaValue>("MarginBottom", true);
        public static LayoutProperty<YogaValue> MarginStart = new LayoutProperty<YogaValue>("MarginStart", true);
        public static LayoutProperty<YogaValue> MarginEnd = new LayoutProperty<YogaValue>("MarginEnd", true);
        public static LayoutProperty<YogaValue> MarginHorizontal = new LayoutProperty<YogaValue>("MarginHorizontal", true);
        public static LayoutProperty<YogaValue> MarginVertical = new LayoutProperty<YogaValue>("MarginVertical", true);
        public static LayoutProperty<YogaValue> Padding = new LayoutProperty<YogaValue>("Padding", true);
        public static LayoutProperty<YogaValue> PaddingLeft = new LayoutProperty<YogaValue>("PaddingLeft", true);
        public static LayoutProperty<YogaValue> PaddingRight = new LayoutProperty<YogaValue>("PaddingRight", true);
        public static LayoutProperty<YogaValue> PaddingTop = new LayoutProperty<YogaValue>("PaddingTop", true);
        public static LayoutProperty<YogaValue> PaddingBottom = new LayoutProperty<YogaValue>("PaddingBottom", true);
        public static LayoutProperty<YogaValue> PaddingStart = new LayoutProperty<YogaValue>("PaddingStart", true);
        public static LayoutProperty<YogaValue> PaddingEnd = new LayoutProperty<YogaValue>("PaddingEnd", true);
        public static LayoutProperty<YogaValue> PaddingHorizontal = new LayoutProperty<YogaValue>("PaddingHorizontal", true);
        public static LayoutProperty<YogaValue> PaddingVertical = new LayoutProperty<YogaValue>("PaddingVertical", true);
        public static LayoutProperty<float> BorderWidth = new LayoutProperty<float>("BorderWidth", true, converter: AllConverters.LengthConverter);
        public static LayoutProperty<float> BorderLeftWidth = new LayoutProperty<float>("BorderLeftWidth", true, converter: AllConverters.LengthConverter);
        public static LayoutProperty<float> BorderRightWidth = new LayoutProperty<float>("BorderRightWidth", true, converter: AllConverters.LengthConverter);
        public static LayoutProperty<float> BorderTopWidth = new LayoutProperty<float>("BorderTopWidth", true, converter: AllConverters.LengthConverter);
        public static LayoutProperty<float> BorderBottomWidth = new LayoutProperty<float>("BorderBottomWidth", true, converter: AllConverters.LengthConverter);
        public static LayoutProperty<float> BorderStartWidth = new LayoutProperty<float>("BorderStartWidth", true, converter: AllConverters.LengthConverter);
        public static LayoutProperty<float> BorderEndWidth = new LayoutProperty<float>("BorderEndWidth", true, converter: AllConverters.LengthConverter);

        public static Dictionary<string, ILayoutProperty> PropertyMap = new Dictionary<string, ILayoutProperty>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "flexDirection", FlexDirection },
            { "justifyContent", JustifyContent },
            { "display", Display },
            { "alignItems", AlignItems },
            { "alignSelf", AlignSelf },
            { "alignContent", AlignContent },
            { "overflow", Overflow },
            { "aspectRatio", AspectRatio },
            { "flexGrow", FlexGrow },
            { "flexShrink", FlexShrink },
            { "flexBasis", FlexBasis },
            { "width", Width },
            { "height", Height },
            { "minWidth", MinWidth },
            { "minHeight", MinHeight },
            { "maxWidth", MaxWidth },
            { "maxHeight", MaxHeight },
            { "left", Left },
            { "right", Right },
            { "top", Top },
            { "bottom", Bottom },
            { "start", Start },
            { "end", End },
            { "margin", Margin },
            { "marginLeft", MarginLeft },
            { "marginRight", MarginRight },
            { "marginTop", MarginTop },
            { "marginBottom", MarginBottom },
            { "marginStart", MarginStart },
            { "marginEnd", MarginEnd },
            { "marginHorizontal", MarginHorizontal },
            { "marginVertical", MarginVertical },
            { "padding", Padding },
            { "paddingLeft", PaddingLeft },
            { "paddingRight", PaddingRight },
            { "paddingTop", PaddingTop },
            { "paddingBottom", PaddingBottom },
            { "paddingStart", PaddingStart },
            { "paddingEnd", PaddingEnd },
            { "paddingHorizontal", PaddingHorizontal },
            { "paddingVertical", PaddingVertical },
            { "borderWidth", BorderWidth },
            { "borderLeftWidth", BorderLeftWidth },
            { "borderRightWidth", BorderRightWidth },
            { "borderTopWidth", BorderTopWidth },
            { "borderBottomWidth", BorderBottomWidth },
            { "borderStartWidth", BorderStartWidth },
            { "borderEndWidth", BorderEndWidth },

            { "flex-direction", FlexDirection },
            { "justify-content", JustifyContent },
            { "align-items", AlignItems },
            { "align-self", AlignSelf },
            { "align-content", AlignContent },
            { "aspect-ratio", AspectRatio },
            { "flex-grow", FlexGrow },
            { "flex-shrink", FlexShrink },
            { "flex-basis", FlexBasis },
            { "min-width", MinWidth },
            { "min-height", MinHeight },
            { "max-width", MaxWidth },
            { "max-height", MaxHeight },
            { "margin-left", MarginLeft },
            { "margin-right", MarginRight },
            { "margin-top", MarginTop },
            { "margin-bottom", MarginBottom },
            { "margin-start", MarginStart },
            { "margin-end", MarginEnd },
            { "margin-horizontal", MarginHorizontal },
            { "margin-vertical", MarginVertical },
            { "padding-left", PaddingLeft },
            { "padding-right", PaddingRight },
            { "padding-top", PaddingTop },
            { "padding-bottom", PaddingBottom },
            { "padding-start", PaddingStart },
            { "padding-end", PaddingEnd },
            { "padding-horizontal", PaddingHorizontal },
            { "padding-vertical", PaddingVertical },
            { "border-width", BorderWidth },
            { "border-left-width", BorderLeftWidth },
            { "border-right-width", BorderRightWidth },
            { "border-top-width", BorderTopWidth },
            { "border-bottom-width", BorderBottomWidth },
            { "border-start-width", BorderStartWidth },
            { "border-end-width", BorderEndWidth },

            { "direction", StyleDirection },
            { "flex-wrap", Wrap },
            { "flexWrap", Wrap },
        };
    }
}
