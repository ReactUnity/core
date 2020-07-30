using Facebook.Yoga;
using ReactUnity.Styling.Parsers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace ReactUnity.Styling
{
    public class LayoutProperty
    {
        public string name;
        public Type type;
        public bool transitionable;

        public PropertyInfo propInfo;
        public IStyleParser parser;

        public LayoutProperty(string name, bool transitionable = false)
        {
            this.name = name;
            this.transitionable = transitionable;

            var ygType = typeof(YogaNode);
            propInfo = ygType.GetProperty(name, BindingFlags.Public);

            type = propInfo.PropertyType;
            parser = ParserMap.GetParser(type);
        }
    }

    public static class LayoutProperties
    {
        public static LayoutProperty StyleDirection = new LayoutProperty("StyleDirection");
        public static LayoutProperty FlexDirection = new LayoutProperty("FlexDirection");
        public static LayoutProperty JustifyContent = new LayoutProperty("JustifyContent");
        public static LayoutProperty Display = new LayoutProperty("Display");
        public static LayoutProperty AlignItems = new LayoutProperty("AlignItems");
        public static LayoutProperty AlignSelf = new LayoutProperty("AlignSelf");
        public static LayoutProperty AlignContent = new LayoutProperty("AlignContent");
        public static LayoutProperty PositionType = new LayoutProperty("PositionType");
        public static LayoutProperty Wrap = new LayoutProperty("Wrap");
        public static LayoutProperty Overflow = new LayoutProperty("Overflow", true);

        public static LayoutProperty Flex = new LayoutProperty("Flex", true);
        public static LayoutProperty FlexGrow = new LayoutProperty("FlexGrow", true);
        public static LayoutProperty FlexShrink = new LayoutProperty("FlexShrink", true);
        public static LayoutProperty FlexBasis = new LayoutProperty("FlexBasis", true);

        public static LayoutProperty Width = new LayoutProperty("Width", true);
        public static LayoutProperty Height = new LayoutProperty("Height", true);
        public static LayoutProperty MinWidth = new LayoutProperty("MinWidth", true);
        public static LayoutProperty MinHeight = new LayoutProperty("MinHeight", true);
        public static LayoutProperty MaxWidth = new LayoutProperty("MaxWidth", true);
        public static LayoutProperty MaxHeight = new LayoutProperty("MaxHeight", true);
        public static LayoutProperty AspectRatio = new LayoutProperty("AspectRatio", true);

        public static LayoutProperty Left = new LayoutProperty("Left", true);
        public static LayoutProperty Right = new LayoutProperty("Right", true);
        public static LayoutProperty Top = new LayoutProperty("Top", true);
        public static LayoutProperty Bottom = new LayoutProperty("Bottom", true);
        public static LayoutProperty Start = new LayoutProperty("Start", true);
        public static LayoutProperty End = new LayoutProperty("End", true);

        public static LayoutProperty Margin = new LayoutProperty("Margin", true);
        public static LayoutProperty MarginLeft = new LayoutProperty("MarginLeft", true);
        public static LayoutProperty MarginRight = new LayoutProperty("MarginRight", true);
        public static LayoutProperty MarginTop = new LayoutProperty("MarginTop", true);
        public static LayoutProperty MarginBottom = new LayoutProperty("MarginBottom", true);
        public static LayoutProperty MarginStart = new LayoutProperty("MarginStart", true);
        public static LayoutProperty MarginEnd = new LayoutProperty("MarginEnd", true);
        public static LayoutProperty MarginHorizontal = new LayoutProperty("MarginHorizontal", true);
        public static LayoutProperty MarginVertical = new LayoutProperty("MarginVertical", true);

        public static LayoutProperty Padding = new LayoutProperty("Padding", true);
        public static LayoutProperty PaddingLeft = new LayoutProperty("PaddingLeft", true);
        public static LayoutProperty PaddingRight = new LayoutProperty("PaddingRight", true);
        public static LayoutProperty PaddingTop = new LayoutProperty("PaddingTop", true);
        public static LayoutProperty PaddingBottom = new LayoutProperty("PaddingBottom", true);
        public static LayoutProperty PaddingStart = new LayoutProperty("PaddingStart", true);
        public static LayoutProperty PaddingEnd = new LayoutProperty("PaddingEnd", true);
        public static LayoutProperty PaddingHorizontal = new LayoutProperty("PaddingHorizontal", true);
        public static LayoutProperty PaddingVertical = new LayoutProperty("PaddingVertical", true);

        public static LayoutProperty BorderWidth = new LayoutProperty("BorderWidth", true);
        public static LayoutProperty BorderLeftWidth = new LayoutProperty("BorderLeftWidth", true);
        public static LayoutProperty BorderRightWidth = new LayoutProperty("BorderRightWidth", true);
        public static LayoutProperty BorderTopWidth = new LayoutProperty("BorderTopWidth", true);
        public static LayoutProperty BorderBottomWidth = new LayoutProperty("BorderBottomWidth", true);
        public static LayoutProperty BorderStartWidth = new LayoutProperty("BorderStartWidth", true);
        public static LayoutProperty BorderEndWidth = new LayoutProperty("BorderEndWidth", true);
        public static LayoutProperty BorderHorizontalWidth = new LayoutProperty("BorderHorizontalWidth", true);
        public static LayoutProperty BorderVerticalWidth = new LayoutProperty("BorderVerticalWidth", true);

        public static Dictionary<string, LayoutProperty> PropertyMap = new Dictionary<string, LayoutProperty>();
        public static Dictionary<string, LayoutProperty> CssPropertyMap = new Dictionary<string, LayoutProperty>()
        {
        };
        public static LayoutProperty[] AllProperties;

        static LayoutProperties()
        {
            var type = typeof(LayoutProperties);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => x.FieldType == typeof(LayoutProperty));


            foreach (var style in styleFields)
            {
                var prop = style.GetValue(type) as LayoutProperty;
                PropertyMap[style.Name] = prop;
                CssPropertyMap[PascalToKebabCase(style.Name)] = prop;
            }

            AllProperties = PropertyMap.Values.ToArray();
        }


        public static LayoutProperty GetProperty(string name)
        {
            LayoutProperty prop;
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
