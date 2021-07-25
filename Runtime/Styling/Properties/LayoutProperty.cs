using System;
using System.Reflection;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Styling.Computed;

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
            if (value is IComputedValue d) value = d.Convert(this, style);
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
}
