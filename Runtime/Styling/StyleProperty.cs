using Facebook.Yoga;
using ReactUnity.StyleEngine;
using ReactUnity.Styling.Parsers;
using ReactUnity.Styling.Types;
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
        object Parse(object value);

        string name { get; }
        Type type { get; }
        object defaultValue { get; }
        bool transitionable { get; }
        bool inherited { get; }
        bool proxy { get; }
    }

    public class StyleProperty<T> : IStyleProperty
    {
        public string name { get; private set; }
        public Type type { get; private set; }
        public object defaultValue { get; private set; }
        public bool transitionable { get; private set; }
        public bool inherited { get; private set; }
        public bool proxy { get; private set; }
        public IStyleConverter converter;

        public StyleProperty(string name, object defaultValue = null, bool transitionable = false, bool inherited = false, bool proxy = false, IStyleConverter converter = null)
        {
            this.type = typeof(T);
            this.name = name;
            this.defaultValue = defaultValue;
            this.transitionable = transitionable;
            this.inherited = inherited;
            this.proxy = proxy;

            this.converter = converter ?? ParserMap.GetConverter(type);
        }

        public object Parse(object value)
        {
            return converter.Convert(value);
        }
    }

    public static class StyleProperties
    {
        public static IStyleProperty opacity = new StyleProperty<float>("opacity", 1f, true);
        public static IStyleProperty zIndex = new StyleProperty<int>("zIndex", 0, false);
        public static IStyleProperty visibility = new StyleProperty<bool>("visibility", true, converter: new BoolConverter(new string[] { "visible" }, new string[] { "hidden" }));
        public static IStyleProperty cursor = new StyleProperty<string>("cursor", null, false);
        public static IStyleProperty pointerEvents = new StyleProperty<PointerEvents>("pointerEvents", PointerEvents.Auto);
        public static IStyleProperty backgroundColor = new StyleProperty<Color>("backgroundColor", new Color(0, 0, 0, 0), true);
        public static IStyleProperty backgroundImage = new StyleProperty<ImageReference>("backgroundImage", ImageReference.None);
        public static IStyleProperty borderRadius = new StyleProperty<int>("borderRadius", 0, true);
        public static IStyleProperty borderColor = new StyleProperty<Color>("borderColor", Color.black, true);
        public static IStyleProperty boxShadow = new StyleProperty<ShadowDefinition>("boxShadow", null, true);
        public static IStyleProperty transformOrigin = new StyleProperty<YogaValue2>("transformOrigin", YogaValue2.Center, true);
        public static IStyleProperty translate = new StyleProperty<YogaValue2>("translate", YogaValue2.Zero, true);
        public static IStyleProperty scale = new StyleProperty<Vector2>("scale", Vector2.one, true);
        public static IStyleProperty rotate = new StyleProperty<float>("rotate", 0f, true);
        public static IStyleProperty fontFamily = new StyleProperty<FontReference>("fontFamily", FontReference.None, false, true);
        public static IStyleProperty color = new StyleProperty<Color>("color", Color.black, true, true);
        public static IStyleProperty fontWeight = new StyleProperty<FontWeight>("fontWeight", FontWeight.Regular, false, true);
        public static IStyleProperty fontStyle = new StyleProperty<FontStyles>("fontStyle", FontStyles.Normal, false, true);
        public static IStyleProperty fontSize = new StyleProperty<YogaValue>("fontSize", YogaValue.Undefined(), true, true);
        public static IStyleProperty textAlign = new StyleProperty<TextAlignmentOptions>("textAlign", TextAlignmentOptions.TopLeft, false, true);
        public static IStyleProperty textOverflow = new StyleProperty<TextOverflowModes>("textOverflow", TextOverflowModes.Overflow, false, true);
        public static IStyleProperty textWrap = new StyleProperty<bool>("textWrap", true, inherited: true, converter: new BoolConverter(new string[] { "wrap", "normal" }, new string[] { "nowrap" }));
        public static IStyleProperty content = new StyleProperty<string>("content", null, false);
        public static IStyleProperty appearance = new StyleProperty<Appearance>("appearance", Appearance.None);
        public static IStyleProperty navigation = new StyleProperty<Navigation.Mode>("navigation", Navigation.Mode.Automatic);

        public static Dictionary<string, IStyleProperty> PropertyMap = new Dictionary<string, IStyleProperty>();
        public static Dictionary<string, IStyleProperty> CssPropertyMap = new Dictionary<string, IStyleProperty>()
        {
            { "z-index", zIndex },
            { "pointer-events", pointerEvents },
            { "background-color", backgroundColor },
            { "background", backgroundColor },
            { "background-image", backgroundImage },
            { "border-radius", borderRadius },
            { "border-color", borderColor },
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
        };
        public static IStyleProperty[] AllProperties;

        static StyleProperties()
        {
            var type = typeof(StyleProperties);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => x.FieldType == typeof(IStyleProperty));

            foreach (var style in styleFields)
            {
                PropertyMap[style.Name] = style.GetValue(type) as IStyleProperty;
                CssPropertyMap[style.Name] = style.GetValue(type) as IStyleProperty;
            }

            AllProperties = PropertyMap.Values.ToArray();
        }


        public static IStyleProperty GetStyleProperty(string name)
        {
            IStyleProperty style;
            PropertyMap.TryGetValue(name, out style);
            return style;
        }
    }
}
