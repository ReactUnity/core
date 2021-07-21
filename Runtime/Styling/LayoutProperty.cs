using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Facebook.Yoga;
using ReactUnity.Converters;

namespace ReactUnity.Styling
{
    public interface ILayoutProperty : IStyleProperty
    {
        void Set(YogaNode node, object value, YogaNode defaultNode, NodeStyle style);
        void SetDefault(YogaNode node);
        void SetDefault(YogaNode node, YogaNode defaultNode);
        object Get(YogaNode node);
        string Serialize(object value);
    }

    public class LayoutValue
    {
        public ILayoutProperty prop { get; }
        public object value { get; }

        public LayoutValue(ILayoutProperty prop, object value)
        {
            this.prop = prop;
            this.value = value;
        }

        public object Get(YogaNode node)
        {
            return prop.Get(node);
        }
        public void Set(YogaNode node, YogaNode defaultNode, NodeStyle style)
        {
            prop.Set(node, value, defaultNode, style);
        }
        public void SetDefault(YogaNode node)
        {
            prop.SetDefault(node);
        }
        public void SetDefault(YogaNode node, YogaNode defaultNode)
        {
            prop.SetDefault(node, defaultNode);
        }
    }

    public class LayoutProperty<T> : StyleProperty<T>, ILayoutProperty
    {
        T defaultValueTyped;

        public PropertyInfo propInfo;

        private Action<YogaNode, T> setter;
        private Func<YogaNode, T> getter;
        public override bool affectsLayout => true;

        public LayoutProperty(string name, bool transitionable = false, T defaultValue = default, IStyleConverter converter = null) :
            base(LayoutProperties.PascalToKebabCase(name), defaultValue, transitionable, false, converter)
        {
            var ygType = typeof(YogaNode);
            propInfo = ygType.GetProperty(name, BindingFlags.Public | BindingFlags.GetProperty | BindingFlags.SetProperty | BindingFlags.Instance);

            defaultValueTyped = defaultValue;
            setter = (Action<YogaNode, T>) propInfo.GetSetMethod().CreateDelegate(typeof(Action<YogaNode, T>));
            getter = (Func<YogaNode, T>) propInfo.GetGetMethod().CreateDelegate(typeof(Func<YogaNode, T>));
        }

        public void Set(YogaNode node, object value, YogaNode defaultNode, NodeStyle style)
        {
            if (value is IDynamicValue d) value = d.Convert(this, style);
            if (Equals(value, CssKeyword.Invalid) || Equals(value, CssKeyword.None) || Equals(value, CssKeyword.NoKeyword)) return;
            else if (Equals(value, CssKeyword.Initial) || Equals(value, CssKeyword.Auto)) SetDefault(node, defaultNode);
            else if (Equals(value, CssKeyword.Unset)) SetDefault(node);
            else if (Equals(value, CssKeyword.Inherit))
            {
                if (node.Parent != null) setter(node, getter(node.Parent));
                else SetDefault(node, defaultNode);
            }
            else setter(node, (T) value);
        }

        public void SetDefault(YogaNode node)
        {
            setter(node, defaultValueTyped);
        }

        public void SetDefault(YogaNode node, YogaNode defaultNode)
        {
            setter(node, defaultNode != null ? getter(defaultNode) : defaultValueTyped);
        }

        public object Get(YogaNode node)
        {
            return getter(node);
        }

        public string Serialize(object value)
        {
            if (value is string s)
            {
                return s;
            }
            return "";
        }
    }

    public static class LayoutProperties
    {
        public static LayoutProperty<YogaDirection> StyleDirection = new LayoutProperty<YogaDirection>("StyleDirection");
        public static LayoutProperty<YogaFlexDirection> FlexDirection = new LayoutProperty<YogaFlexDirection>("FlexDirection");
        public static LayoutProperty<YogaJustify> JustifyContent = new LayoutProperty<YogaJustify>("JustifyContent");
        public static LayoutProperty<YogaDisplay> Display = new LayoutProperty<YogaDisplay>("Display");
        public static LayoutProperty<YogaAlign> AlignItems = new LayoutProperty<YogaAlign>("AlignItems");
        public static LayoutProperty<YogaAlign> AlignSelf = new LayoutProperty<YogaAlign>("AlignSelf");
        public static LayoutProperty<YogaAlign> AlignContent = new LayoutProperty<YogaAlign>("AlignContent");
        public static LayoutProperty<YogaPositionType> PositionType = new LayoutProperty<YogaPositionType>("PositionType");
        public static LayoutProperty<YogaWrap> Wrap = new LayoutProperty<YogaWrap>("Wrap");
        public static LayoutProperty<YogaOverflow> Overflow = new LayoutProperty<YogaOverflow>("Overflow", true);

        //public static ILayoutProperty Flex = new LayoutProperty<float>("Flex", true);
        public static LayoutProperty<float> FlexGrow = new LayoutProperty<float>("FlexGrow", true, float.NaN);
        public static LayoutProperty<float> FlexShrink = new LayoutProperty<float>("FlexShrink", true, float.NaN);
        public static LayoutProperty<YogaValue> FlexBasis = new LayoutProperty<YogaValue>("FlexBasis", true);

        public static LayoutProperty<YogaValue> Width = new LayoutProperty<YogaValue>("Width", true);
        public static LayoutProperty<YogaValue> Height = new LayoutProperty<YogaValue>("Height", true);
        public static LayoutProperty<YogaValue> MinWidth = new LayoutProperty<YogaValue>("MinWidth", true);
        public static LayoutProperty<YogaValue> MinHeight = new LayoutProperty<YogaValue>("MinHeight", true);
        public static LayoutProperty<YogaValue> MaxWidth = new LayoutProperty<YogaValue>("MaxWidth", true);
        public static LayoutProperty<YogaValue> MaxHeight = new LayoutProperty<YogaValue>("MaxHeight", true);
        public static LayoutProperty<float> AspectRatio = new LayoutProperty<float>("AspectRatio", true, float.NaN);

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

        public static Dictionary<string, ILayoutProperty> PropertyMap = new Dictionary<string, ILayoutProperty>(StringComparer.InvariantCultureIgnoreCase);
        public static Dictionary<string, ILayoutProperty> CssPropertyMap = new Dictionary<string, ILayoutProperty>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "direction", StyleDirection },
            { "position", PositionType },
            { "flex-wrap", Wrap },
        };
        public static ILayoutProperty[] AllProperties;

        static LayoutProperties()
        {
            var type = typeof(LayoutProperties);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var styleFields = fields.Where(x => typeof(ILayoutProperty).IsAssignableFrom(x.FieldType));


            foreach (var style in styleFields)
            {
                var prop = style.GetValue(type) as ILayoutProperty;
                PropertyMap[style.Name] = prop;
                CssPropertyMap[style.Name] = prop;
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

        public static ILayoutProperty GetCssProperty(string name)
        {
            ILayoutProperty prop;
            CssPropertyMap.TryGetValue(name, out prop);
            return prop;
        }

        internal static string PascalToKebabCase(string str)
        {
            if (string.IsNullOrEmpty(str))
                return string.Empty;

            var builder = new StringBuilder();

            foreach (var c in str)
            {
                if (char.IsUpper(c))
                {
                    if (builder.Length > 0) builder.Append('-');
                    builder.Append(char.ToLowerInvariant(c));
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
