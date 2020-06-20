using Facebook.Yoga;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TMPro;
using UnityEngine;

namespace ReactUnity.Styling
{
    public class StyleProperty
    {
        public string name;
        public Type[] types;
        public object defaultValue;
        public bool transitionable;
        public bool inherited;
        public bool proxy;

        public StyleProperty(string name, Type type, object defaultValue = null, bool transitionable = false, bool inherited = false, bool proxy = false)
        {
            this.name = name;
            this.types = new Type[] { type };
            this.defaultValue = defaultValue;
            this.transitionable = transitionable;
            this.inherited = inherited;
            this.proxy = proxy;
        }

        public StyleProperty(string name, Type[] types, object defaultValue = null, bool transitionable = false, bool inherited = false, bool proxy = false)
        {
            this.name = name;
            this.types = types;
            this.defaultValue = defaultValue;
            this.transitionable = transitionable;
            this.inherited = inherited;
            this.proxy = proxy;
        }
    }

    public static class StyleProperties
    {
        public static StyleProperty opacity = new StyleProperty("opacity", typeof(float), 1f, true);
        public static StyleProperty zOrder = new StyleProperty("zOrder", typeof(int), 0, false);
        public static StyleProperty hidden = new StyleProperty("hidden", typeof(bool), false, false);
        public static StyleProperty cursor = new StyleProperty("cursor", typeof(string), null, false);
        public static StyleProperty interaction = new StyleProperty("interaction", typeof(InteractionType), InteractionType.WhenVisible, false);
        public static StyleProperty backgroundColor = new StyleProperty("backgroundColor", typeof(Color), new Color(0, 0, 0, 0), true);
        public static StyleProperty backgroundImage = new StyleProperty("backgroundImage", typeof(object), null, false);
        public static StyleProperty borderRadius = new StyleProperty("borderRadius", typeof(int), 0, true);
        public static StyleProperty borderColor = new StyleProperty("borderColor", typeof(Color), Color.black, true);
        public static StyleProperty boxShadow = new StyleProperty("boxShadow", typeof(ShadowDefinition), null, true);
        public static StyleProperty translate = new StyleProperty("translate", typeof(Vector2), Vector2.zero, true);
        public static StyleProperty translateRelative = new StyleProperty("translateRelative", typeof(bool), false, true);
        public static StyleProperty scale = new StyleProperty("scale", typeof(Vector2), Vector2.one, true);
        public static StyleProperty pivot = new StyleProperty("pivot", typeof(Vector2), Vector2.one / 2, true);
        public static StyleProperty rotate = new StyleProperty("rotate", typeof(float), 0f, true);

        public static StyleProperty font = new StyleProperty("font", typeof(TMP_FontAsset), null, false, true);
        public static StyleProperty fontColor = new StyleProperty("fontColor", typeof(Color), Color.black, true, true);
        public static StyleProperty fontWeight = new StyleProperty("fontWeight", typeof(FontWeight), FontWeight.Regular, false, true);
        public static StyleProperty fontStyle = new StyleProperty("fontStyle", typeof(FontStyles), FontStyles.Normal, false, true);
        public static StyleProperty fontSize = new StyleProperty("fontSize", typeof(YogaValue), YogaValue.Undefined(), true, true);
        public static StyleProperty textOverflow = new StyleProperty("textOverflow", typeof(TextOverflowModes), TextOverflowModes.Overflow, false, true);
        public static StyleProperty textWrap = new StyleProperty("textWrap", typeof(bool), true, false, true);

        public static Dictionary<string, StyleProperty> PropertyMap = new Dictionary<string, StyleProperty>();
        public static StyleProperty[] AllProperties;

        static StyleProperties()
        {
            var type = typeof(StyleProperties);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => x.FieldType == typeof(StyleProperty));

            foreach (var style in styleFields)
            {
                PropertyMap[style.Name] = style.GetValue(type) as StyleProperty;
            }

            AllProperties = PropertyMap.Values.ToArray();
        }


        public static StyleProperty GetStyleProperty(string name)
        {
            StyleProperty style;
            PropertyMap.TryGetValue(name, out style);
            return style;
        }
    }
}
