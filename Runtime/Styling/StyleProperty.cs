using Facebook.Yoga;
using ReactUnity.StyleEngine;
using ReactUnity.Styling.Parsers;
using ReactUnity.Styling.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TMPro;
using UnityEngine;

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
        public IStyleParser parser;
        public IStyleConverter converter;

        public StyleProperty(string name, object defaultValue = null, bool transitionable = false, bool inherited = false, bool proxy = false, IStyleParser parser = null)
        {
            this.type = typeof(T);
            this.name = name;
            this.defaultValue = defaultValue;
            this.transitionable = transitionable;
            this.inherited = inherited;
            this.proxy = proxy;

            this.parser = parser ?? ParserMap.GetParser(type);
            this.converter = ParserMap.GetConverter(type);
        }

        public object Parse(object value)
        {
            if (value is T t) return t;

            if (converter != null)
            {
                var val = converter.Convert(value);
                if (!Equals(val, SpecialNames.CantParse) && val != null) return val;
            }

            if (!(value is string)) value = value?.ToString();

            var s = value as string;
            if (parser != null)
            {
                var val = parser.FromString(s);
                if (!Equals(val, SpecialNames.CantParse) && val != null) return val;
            }

            var special = RuleHelpers.GetSpecialName(s);
            if (special != SpecialNames.NoSpecialName) return special;
            return SpecialNames.CantParse;
        }
    }

    public static class StyleProperties
    {
        public static IStyleProperty opacity = new StyleProperty<float>("opacity", 1f, true);
        public static IStyleProperty zOrder = new StyleProperty<int>("zOrder", 0, false);
        public static IStyleProperty hidden = new StyleProperty<bool>("hidden", false, parser: new BoolParser(new string[] { "hidden" }, new string[] { "visible" }));
        public static IStyleProperty cursor = new StyleProperty<string>("cursor", null, false);
        public static IStyleProperty interaction = new StyleProperty<InteractionType>("interaction", InteractionType.WhenVisible, false);
        public static IStyleProperty backgroundColor = new StyleProperty<Color>("backgroundColor", new Color(0, 0, 0, 0), true);
        public static IStyleProperty backgroundImage = new StyleProperty<object>("backgroundImage", null, false);
        public static IStyleProperty borderRadius = new StyleProperty<int>("borderRadius", 0, true);
        public static IStyleProperty borderColor = new StyleProperty<Color>("borderColor", Color.black, true);
        public static IStyleProperty boxShadow = new StyleProperty<ShadowDefinition>("boxShadow", null, true);
        public static IStyleProperty translate = new StyleProperty<Vector2>("translate", Vector2.zero, true);
        public static IStyleProperty translateRelative = new StyleProperty<bool>("translateRelative", false, true);
        public static IStyleProperty scale = new StyleProperty<Vector2>("scale", Vector2.one, true);
        public static IStyleProperty pivot = new StyleProperty<Vector2>("pivot", Vector2.one / 2, true);
        public static IStyleProperty rotate = new StyleProperty<float>("rotate", 0f, true);
        public static IStyleProperty font = new StyleProperty<TMP_FontAsset>("font", null, false, true);
        public static IStyleProperty fontColor = new StyleProperty<Color>("fontColor", Color.black, true, true);
        public static IStyleProperty fontWeight = new StyleProperty<FontWeight>("fontWeight", FontWeight.Regular, false, true);
        public static IStyleProperty fontStyle = new StyleProperty<FontStyles>("fontStyle", FontStyles.Normal, false, true);
        public static IStyleProperty fontSize = new StyleProperty<YogaValue>("fontSize", YogaValue.Undefined(), true, true);
        public static IStyleProperty textAlign = new StyleProperty<TextAlignmentOptions>("textAlign", TextAlignmentOptions.TopLeft, false, true);
        public static IStyleProperty textOverflow = new StyleProperty<TextOverflowModes>("textOverflow", TextOverflowModes.Overflow, false, true);
        public static IStyleProperty textWrap = new StyleProperty<bool>("textWrap", true, inherited: true, parser: new BoolParser(new string[] { "wrap" }, new string[] { "nowrap" }));

        public static Dictionary<string, IStyleProperty> PropertyMap = new Dictionary<string, IStyleProperty>();
        public static Dictionary<string, IStyleProperty> CssPropertyMap = new Dictionary<string, IStyleProperty>()
        {
            { "z-order", zOrder },
            { "visibility", hidden },
            { "background-color", backgroundColor },
            { "background", backgroundColor },
            { "background-image", backgroundImage },
            { "border-radius", borderRadius },
            { "border-color", borderColor },
            { "box-shadow", boxShadow },
            { "color", fontColor },
            { "font-color", fontColor },
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
