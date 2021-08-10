using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using ReactUnity.Animations;
using ReactUnity.Converters;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public static class StyleProperties
    {
        public static readonly StyleProperty<float> opacity = new StyleProperty<float>("opacity", 1f, true, converter: AllConverters.PercentageConverter);
        public static readonly StyleProperty<int> zIndex = new StyleProperty<int>("zIndex", 0, false);
        public static readonly StyleProperty<bool> visibility = new StyleProperty<bool>("visibility", true, converter: new BoolConverter(new string[] { "visible" }, new string[] { "hidden" }));
        public static readonly StyleProperty<CursorList> cursor = new StyleProperty<CursorList>("cursor", null, false, noneValue: CursorList.None);
        public static readonly StyleProperty<PointerEvents> pointerEvents = new StyleProperty<PointerEvents>("pointerEvents", PointerEvents.Auto, noneValue: PointerEvents.None);
        public static readonly StyleProperty<Color> backgroundColor = new StyleProperty<Color>("backgroundColor", new Color(0, 0, 0, 0), true);
        public static readonly StyleProperty<ImageReference> backgroundImage = new StyleProperty<ImageReference>("backgroundImage", ImageReference.None);
        public static readonly StyleProperty<ImageReference> maskImage = new StyleProperty<ImageReference>("maskImage", ImageReference.None);
        public static readonly StyleProperty<float> borderRadius = new StyleProperty<float>("borderRadius", 0f, true, converter: AllConverters.LengthConverter);
        public static readonly StyleProperty<float> borderTopLeftRadius = new StyleProperty<float>("borderTopLeftRadius", 0f, true, converter: AllConverters.LengthConverter);
        public static readonly StyleProperty<float> borderTopRightRadius = new StyleProperty<float>("borderTopRightRadius", 0f, true, converter: AllConverters.LengthConverter);
        public static readonly StyleProperty<float> borderBottomLeftRadius = new StyleProperty<float>("borderBottomLeftRadius", 0f, true, converter: AllConverters.LengthConverter);
        public static readonly StyleProperty<float> borderBottomRightRadius = new StyleProperty<float>("borderBottomRightRadius", 0f, true, converter: AllConverters.LengthConverter);
        public static readonly StyleProperty<Color> borderColor = new StyleProperty<Color>("borderColor", Color.black, true);
        public static readonly StyleProperty<Color> borderLeftColor = new StyleProperty<Color>("borderLeftColor", Color.black, true);
        public static readonly StyleProperty<Color> borderRightColor = new StyleProperty<Color>("borderRightColor", Color.black, true);
        public static readonly StyleProperty<Color> borderTopColor = new StyleProperty<Color>("borderTopColor", Color.black, true);
        public static readonly StyleProperty<Color> borderBottomColor = new StyleProperty<Color>("borderBottomColor", Color.black, true);
        public static readonly StyleProperty<BoxShadowList> boxShadow = new StyleProperty<BoxShadowList>("boxShadow", null, true);
        public static readonly StyleProperty<YogaValue2> transformOrigin = new StyleProperty<YogaValue2>("transformOrigin", YogaValue2.Center, true);
        public static readonly StyleProperty<YogaValue2> translate = new StyleProperty<YogaValue2>("translate", YogaValue2.Zero, true);
        public static readonly StyleProperty<Vector2> scale = new StyleProperty<Vector2>("scale", Vector2.one, true);
        public static readonly StyleProperty<Vector3> rotate = new StyleProperty<Vector3>("rotate", Vector3.zero, true, converter: AllConverters.RotateConverter);
        public static readonly StyleProperty<FontReference> fontFamily = new StyleProperty<FontReference>("fontFamily", FontReference.None, false, true);
        public static readonly StyleProperty<Color> color = new StyleProperty<Color>("color", ComputedCurrentColor.Instance, true, false);
        public static readonly StyleProperty<FontWeight> fontWeight = new StyleProperty<FontWeight>("fontWeight", FontWeight.Regular, false, true);
        public static readonly StyleProperty<FontStyles> fontStyle = new StyleProperty<FontStyles>("fontStyle", FontStyles.Normal, false, true);
        public static readonly StyleProperty<float> fontSize = new StyleProperty<float>("fontSize", ComputedFontSize.Default, true, false, AllConverters.LengthConverter);
        public static readonly StyleProperty<float> lineHeight = new StyleProperty<float>("lineHeight", ComputedFontSize.Default, true, true, AllConverters.LengthConverter);
        public static readonly StyleProperty<float> letterSpacing = new StyleProperty<float>("letterSpacing", 0f, true, true, AllConverters.LengthConverter);
        public static readonly StyleProperty<float> wordSpacing = new StyleProperty<float>("wordSpacing", 0f, true, true, AllConverters.LengthConverter);
        public static readonly StyleProperty<TextAlignmentOptions> textAlign = new StyleProperty<TextAlignmentOptions>("textAlign", TextAlignmentOptions.TopLeft, false, true);
        public static readonly StyleProperty<TextOverflowModes> textOverflow = new StyleProperty<TextOverflowModes>("textOverflow", TextOverflowModes.Overflow, false, true);
        public static readonly StyleProperty<bool> textWrap = new StyleProperty<bool>("textWrap", true, inherited: true, converter: new BoolConverter(new string[] { "wrap", "normal" }, new string[] { "nowrap" }));
        public static readonly StyleProperty<string> content = new StyleProperty<string>("content", null, false);
        public static readonly StyleProperty<Appearance> appearance = new StyleProperty<Appearance>("appearance", Appearance.None);
        public static readonly StyleProperty<Navigation.Mode> navigation = new StyleProperty<Navigation.Mode>("navigation", Navigation.Mode.Automatic);
        public static readonly StyleProperty<TransitionList> transition = new StyleProperty<TransitionList>("transition");
        public static readonly StyleProperty<AnimationList> animation = new StyleProperty<AnimationList>("animation");
        public static readonly StyleProperty<AudioList> audio = new StyleProperty<AudioList>("audio");
        public static readonly StyleProperty<ObjectFit> objectFit = new StyleProperty<ObjectFit>("object-fit", ObjectFit.Fill, noneValue: ObjectFit.None);
        public static readonly StyleProperty<YogaValue2> objectPosition = new StyleProperty<YogaValue2>("object-position", YogaValue2.Center, true);

        public static readonly Dictionary<string, IStyleProperty> PropertyMap = new Dictionary<string, IStyleProperty>();
        public static readonly Dictionary<string, IStyleProperty> CssPropertyMap = new Dictionary<string, IStyleProperty>()
        {
            { "z-index", zIndex },
            { "pointer-events", pointerEvents },
            { "background-color", backgroundColor },
            { "background", backgroundImage },
            { "background-image", backgroundImage },
            { "mask", maskImage },
            { "mask-image", maskImage },
            { "border-radius", borderRadius },
            { "border-top-left-radius", borderTopLeftRadius },
            { "border-top-right-radius", borderTopRightRadius },
            { "border-bottom-left-radius", borderBottomLeftRadius },
            { "border-bottom-right-radius", borderBottomRightRadius },
            { "border-color", borderColor },
            { "border-left-color", borderLeftColor },
            { "border-right-color", borderRightColor },
            { "border-top-color", borderTopColor },
            { "border-bottom-color", borderBottomColor },
            { "box-shadow", boxShadow },
            { "transform-origin", transformOrigin },
            { "font-family", fontFamily },
            { "font-weight", fontWeight },
            { "font-style", fontStyle },
            { "text-decoration", fontStyle },
            { "font-size", fontSize },
            { "line-height", lineHeight },
            { "letter-spacing", letterSpacing },
            { "word-spacing", wordSpacing },
            { "text-align", textAlign },
            { "text-overflow", textOverflow },
            { "text-wrap", textWrap },
            { "white-space", textWrap },
            { "object-fit", objectFit },
            { "object-position", objectPosition },
        };
        public static IStyleProperty[] AllProperties { get; }
        public static HashSet<string> InheritedProperties { get; } = new HashSet<string>();

        static StyleProperties()
        {
            var type = typeof(StyleProperties);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => typeof(IStyleProperty).IsAssignableFrom(x.FieldType));

            foreach (var style in styleFields)
            {
                var prop = style.GetValue(type) as IStyleProperty;
                PropertyMap[style.Name] = prop;
                CssPropertyMap[style.Name] = prop;
            }

            foreach (var entry in CssPropertyMap)
            {
                if (entry.Value.inherited) InheritedProperties.Add(entry.Key);
            }

            AllProperties = PropertyMap.Values.ToArray();
        }
    }
}
