using Facebook.Yoga;
using ReactUnity.Animations;
using ReactUnity.Styling.Parsers;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public interface IStyleProperty
    {
        object Convert(object value);

        string name { get; }
        Type type { get; }
        object defaultValue { get; }
        bool transitionable { get; }
        bool inherited { get; }
        bool proxy { get; }
        object noneValue { get; }
    }

    public class StyleProperty<T> : IStyleProperty
    {
        public string name { get; private set; }
        public Type type { get; private set; }
        public object defaultValue { get; private set; }
        public object noneValue { get; private set; }
        public bool transitionable { get; private set; }
        public bool inherited { get; private set; }
        public bool proxy { get; private set; }
        public IStyleConverter converter;

        public StyleProperty(string name, object defaultValue = null, bool transitionable = false, bool inherited = false, bool proxy = false, IStyleConverter converter = null, object noneValue = null)
        {
            this.type = typeof(T);
            this.name = name;
            this.defaultValue = defaultValue;
            this.noneValue = noneValue;
            this.transitionable = transitionable;
            this.inherited = inherited;
            this.proxy = proxy;

            this.converter = converter ?? Converters.Get(type);
        }

        public object Convert(object value)
        {
            return converter.Convert(value);
        }

        public static bool operator ==(StyleProperty<T> left, StyleProperty<T> right) => left.name == right.name;
        public static bool operator !=(StyleProperty<T> left, StyleProperty<T> right) => left.name != right.name;
        public override int GetHashCode() => name.GetHashCode();
        public override bool Equals(object obj) => base.Equals(obj);
    }

    public static class StyleProperties
    {
        public static readonly StyleProperty<float> opacity = new StyleProperty<float>("opacity", 1f, true, converter: Converters.PercentageConverter);
        public static readonly StyleProperty<int> zIndex = new StyleProperty<int>("zIndex", 0, false);
        public static readonly StyleProperty<bool> visibility = new StyleProperty<bool>("visibility", true, converter: new BoolConverter(new string[] { "visible" }, new string[] { "hidden" }));
        public static readonly StyleProperty<string> cursor = new StyleProperty<string>("cursor", null, false);
        public static readonly StyleProperty<PointerEvents> pointerEvents = new StyleProperty<PointerEvents>("pointerEvents", PointerEvents.Auto, noneValue: PointerEvents.None);
        public static readonly StyleProperty<Color> backgroundColor = new StyleProperty<Color>("backgroundColor", new Color(0, 0, 0, 0), true);
        public static readonly StyleProperty<ImageReference> backgroundImage = new StyleProperty<ImageReference>("backgroundImage", ImageReference.None);
        public static readonly StyleProperty<float> borderRadius = new StyleProperty<float>("borderRadius", 0f, true, converter: Converters.LengthConverter);
        public static readonly StyleProperty<float> borderTopLeftRadius = new StyleProperty<float>("borderTopLeftRadius", 0f, true, converter: Converters.LengthConverter);
        public static readonly StyleProperty<float> borderTopRightRadius = new StyleProperty<float>("borderTopRightRadius", 0f, true, converter: Converters.LengthConverter);
        public static readonly StyleProperty<float> borderBottomLeftRadius = new StyleProperty<float>("borderBottomLeftRadius", 0f, true, converter: Converters.LengthConverter);
        public static readonly StyleProperty<float> borderBottomRightRadius = new StyleProperty<float>("borderBottomRightRadius", 0f, true, converter: Converters.LengthConverter);
        public static readonly StyleProperty<Color> borderColor = new StyleProperty<Color>("borderColor", Color.black, true);
        public static readonly StyleProperty<Color> borderLeftColor = new StyleProperty<Color>("borderLeftColor", Color.black, true);
        public static readonly StyleProperty<Color> borderRightColor = new StyleProperty<Color>("borderRightColor", Color.black, true);
        public static readonly StyleProperty<Color> borderTopColor = new StyleProperty<Color>("borderTopColor", Color.black, true);
        public static readonly StyleProperty<Color> borderBottomColor = new StyleProperty<Color>("borderBottomColor", Color.black, true);
        public static readonly StyleProperty<BoxShadow> boxShadow = new StyleProperty<BoxShadow>("boxShadow", null, true);
        public static readonly StyleProperty<YogaValue2> transformOrigin = new StyleProperty<YogaValue2>("transformOrigin", YogaValue2.Center, true);
        public static readonly StyleProperty<YogaValue2> translate = new StyleProperty<YogaValue2>("translate", YogaValue2.Zero, true);
        public static readonly StyleProperty<Vector2> scale = new StyleProperty<Vector2>("scale", Vector2.one, true);
        public static readonly StyleProperty<Vector3> rotate = new StyleProperty<Vector3>("rotate", Vector3.zero, true, converter: Converters.RotateConverter);
        public static readonly StyleProperty<FontReference> fontFamily = new StyleProperty<FontReference>("fontFamily", FontReference.None, false, true);
        public static readonly StyleProperty<Color> color = new StyleProperty<Color>("color", Color.black, true, true);
        public static readonly StyleProperty<FontWeight> fontWeight = new StyleProperty<FontWeight>("fontWeight", FontWeight.Regular, false, true);
        public static readonly StyleProperty<FontStyles> fontStyle = new StyleProperty<FontStyles>("fontStyle", FontStyles.Normal, false, true);
        public static readonly StyleProperty<YogaValue> fontSize = new StyleProperty<YogaValue>("fontSize", YogaValue.Undefined(), true, true);
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


        public static IStyleProperty GetStyleProperty(string name)
        {
            IStyleProperty style;
            CssPropertyMap.TryGetValue(name, out style);
            return style;
        }

        public static bool IsInherited(string name)
        {
            return InheritedProperties.Contains(name);
        }
    }

    public static class CssProperties
    {
        public static readonly Dictionary<string, IStyleProperty> CssPropertyMap = new Dictionary<string, IStyleProperty>(StringComparer.OrdinalIgnoreCase);
        public static readonly HashSet<IStyleProperty> TransitionableProperties = new HashSet<IStyleProperty>();

        static CssProperties()
        {
            foreach (var kv in StyleProperties.CssPropertyMap) CssPropertyMap[kv.Key] = kv.Value;
            foreach (var kv in LayoutProperties.CssPropertyMap) CssPropertyMap[kv.Key] = kv.Value;

            foreach (var kv in CssPropertyMap)
            {
                if (kv.Value.transitionable) TransitionableProperties.Add(kv.Value);
            }
        }

        public static IStyleProperty GetProperty(string name)
        {
            CssPropertyMap.TryGetValue(name, out var style);
            return style;
        }
    }
}
