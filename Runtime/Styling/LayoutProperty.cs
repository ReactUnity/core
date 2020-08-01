using Facebook.Yoga;
using Jint.Runtime.Interop;
using ReactUnity.Styling.Parsers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;

namespace ReactUnity.Styling
{
    public interface ILayoutProperty
    {
        void Set(YogaNode node, object value);
        void SetDefault(YogaNode node);
        object Get(YogaNode node);
        object Parse(string value);
    }

    public class LayoutValue
    {
        ILayoutProperty prop;
        object value;

        public LayoutValue(ILayoutProperty prop, object value)
        {
            this.prop = prop;
            this.value = value;
        }

        public object Get(YogaNode node)
        {
            return prop.Get(node);
        }
        public void Set(YogaNode node)
        {
            prop.Set(node, value);
        }
        public void SetDefault(YogaNode node)
        {
            prop.SetDefault(node);
        }
    }

    public class LayoutProperty<T> : ILayoutProperty
    {
        public string name;
        public Type type;
        public bool transitionable;

        public PropertyInfo propInfo;
        public IStyleParser parser;

        T defaultValue;
        public Action<YogaNode, T> setter;
        public Func<YogaNode, T> getter;

        public LayoutProperty(string name, bool transitionable = false, T defaultValue = default)
        {
            this.name = name;
            this.transitionable = transitionable;

            var ygType = typeof(YogaNode);
            propInfo = ygType.GetProperty(name, BindingFlags.Public | BindingFlags.GetProperty | BindingFlags.SetProperty | BindingFlags.Instance);

            type = propInfo.PropertyType;
            parser = ParserMap.GetParser(type);

            this.defaultValue = defaultValue;
            setter = (Action<YogaNode, T>)propInfo.GetSetMethod().CreateDelegate(typeof(Action<YogaNode, T>));
            getter = (Func<YogaNode, T>)propInfo.GetGetMethod().CreateDelegate(typeof(Func<YogaNode, T>));
        }

        public object Parse(string value)
        {
            return parser.FromString(value);
        }

        public void Set(YogaNode node, object value)
        {
            setter(node, (T)value);
        }

        public void SetDefault(YogaNode node)
        {
            setter(node, defaultValue);
        }

        public object Get(YogaNode node)
        {
            return getter(node);
        }
    }

    public static class LayoutProperties
    {
        public static ILayoutProperty StyleDirection = new LayoutProperty<YogaDirection>("StyleDirection");
        public static ILayoutProperty FlexDirection = new LayoutProperty<YogaFlexDirection>("FlexDirection");
        public static ILayoutProperty JustifyContent = new LayoutProperty<YogaJustify>("JustifyContent");
        public static ILayoutProperty Display = new LayoutProperty<YogaDisplay>("Display");
        public static ILayoutProperty AlignItems = new LayoutProperty<YogaAlign>("AlignItems");
        public static ILayoutProperty AlignSelf = new LayoutProperty<YogaAlign>("AlignSelf");
        public static ILayoutProperty AlignContent = new LayoutProperty<YogaAlign>("AlignContent");
        public static ILayoutProperty PositionType = new LayoutProperty<YogaPositionType>("PositionType");
        public static ILayoutProperty Wrap = new LayoutProperty<YogaWrap>("Wrap");
        public static ILayoutProperty Overflow = new LayoutProperty<YogaOverflow>("Overflow", true);

        //public static ILayoutProperty Flex = new LayoutProperty<float>("Flex", true);
        public static ILayoutProperty FlexGrow = new LayoutProperty<float>("FlexGrow", true);
        public static ILayoutProperty FlexShrink = new LayoutProperty<float>("FlexShrink", true);
        public static ILayoutProperty FlexBasis = new LayoutProperty<YogaValue>("FlexBasis", true);

        public static ILayoutProperty Width = new LayoutProperty<YogaValue>("Width", true);
        public static ILayoutProperty Height = new LayoutProperty<YogaValue>("Height", true);
        public static ILayoutProperty MinWidth = new LayoutProperty<YogaValue>("MinWidth", true);
        public static ILayoutProperty MinHeight = new LayoutProperty<YogaValue>("MinHeight", true);
        public static ILayoutProperty MaxWidth = new LayoutProperty<YogaValue>("MaxWidth", true);
        public static ILayoutProperty MaxHeight = new LayoutProperty<YogaValue>("MaxHeight", true);
        public static ILayoutProperty AspectRatio = new LayoutProperty<float>("AspectRatio", true);

        public static ILayoutProperty Left = new LayoutProperty<YogaValue>("Left", true);
        public static ILayoutProperty Right = new LayoutProperty<YogaValue>("Right", true);
        public static ILayoutProperty Top = new LayoutProperty<YogaValue>("Top", true);
        public static ILayoutProperty Bottom = new LayoutProperty<YogaValue>("Bottom", true);
        public static ILayoutProperty Start = new LayoutProperty<YogaValue>("Start", true);
        public static ILayoutProperty End = new LayoutProperty<YogaValue>("End", true);

        public static ILayoutProperty Margin = new LayoutProperty<YogaValue>("Margin", true);
        public static ILayoutProperty MarginLeft = new LayoutProperty<YogaValue>("MarginLeft", true);
        public static ILayoutProperty MarginRight = new LayoutProperty<YogaValue>("MarginRight", true);
        public static ILayoutProperty MarginTop = new LayoutProperty<YogaValue>("MarginTop", true);
        public static ILayoutProperty MarginBottom = new LayoutProperty<YogaValue>("MarginBottom", true);
        public static ILayoutProperty MarginStart = new LayoutProperty<YogaValue>("MarginStart", true);
        public static ILayoutProperty MarginEnd = new LayoutProperty<YogaValue>("MarginEnd", true);
        public static ILayoutProperty MarginHorizontal = new LayoutProperty<YogaValue>("MarginHorizontal", true);
        public static ILayoutProperty MarginVertical = new LayoutProperty<YogaValue>("MarginVertical", true);

        public static ILayoutProperty Padding = new LayoutProperty<YogaValue>("Padding", true);
        public static ILayoutProperty PaddingLeft = new LayoutProperty<YogaValue>("PaddingLeft", true);
        public static ILayoutProperty PaddingRight = new LayoutProperty<YogaValue>("PaddingRight", true);
        public static ILayoutProperty PaddingTop = new LayoutProperty<YogaValue>("PaddingTop", true);
        public static ILayoutProperty PaddingBottom = new LayoutProperty<YogaValue>("PaddingBottom", true);
        public static ILayoutProperty PaddingStart = new LayoutProperty<YogaValue>("PaddingStart", true);
        public static ILayoutProperty PaddingEnd = new LayoutProperty<YogaValue>("PaddingEnd", true);
        public static ILayoutProperty PaddingHorizontal = new LayoutProperty<YogaValue>("PaddingHorizontal", true);
        public static ILayoutProperty PaddingVertical = new LayoutProperty<YogaValue>("PaddingVertical", true);

        public static ILayoutProperty BorderWidth = new LayoutProperty<float>("BorderWidth", true);
        public static ILayoutProperty BorderLeftWidth = new LayoutProperty<float>("BorderLeftWidth", true);
        public static ILayoutProperty BorderRightWidth = new LayoutProperty<float>("BorderRightWidth", true);
        public static ILayoutProperty BorderTopWidth = new LayoutProperty<float>("BorderTopWidth", true);
        public static ILayoutProperty BorderBottomWidth = new LayoutProperty<float>("BorderBottomWidth", true);
        public static ILayoutProperty BorderStartWidth = new LayoutProperty<float>("BorderStartWidth", true);
        public static ILayoutProperty BorderEndWidth = new LayoutProperty<float>("BorderEndWidth", true);

        public static Dictionary<string, ILayoutProperty> PropertyMap = new Dictionary<string, ILayoutProperty>();
        public static Dictionary<string, ILayoutProperty> CssPropertyMap = new Dictionary<string, ILayoutProperty>()
        {
            { "direction", StyleDirection },
            { "flex-wrap", Wrap },
        };
        public static ILayoutProperty[] AllProperties;

        static LayoutProperties()
        {
            var type = typeof(LayoutProperties);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => x.FieldType == typeof(ILayoutProperty));


            foreach (var style in styleFields)
            {
                var prop = style.GetValue(type) as ILayoutProperty;
                PropertyMap[style.Name] = prop;
                CssPropertyMap[PascalToKebabCase(style.Name)] = prop;
            }

            AllProperties = PropertyMap.Values.ToArray();
        }


        public static ILayoutProperty GetProperty(string name)
        {
            ILayoutProperty prop;
            PropertyMap.TryGetValue(name, out prop);
            return prop;
        }

        private static string PascalToKebabCase(this string str)
        {
            if (string.IsNullOrEmpty(str))
                return string.Empty;

            var builder = new StringBuilder();
            builder.Append(char.ToLower(str.First()));

            foreach (var c in str.Skip(1))
            {
                if (char.IsUpper(c))
                {
                    builder.Append('-');
                    builder.Append(char.ToLower(c));
                }
                else
                {
                    builder.Append(c);
                }
            }

            return builder.ToString();
        }
    }
}
