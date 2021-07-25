using System;
using System.Collections.Generic;
using System.Reflection;
using ReactUnity.Converters;
using ReactUnity.StyleEngine;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling
{
    public class StyleProperty<T> : IStyleProperty
    {
        public string name { get; private set; }
        public Type type { get; private set; }
        public object defaultValue { get; private set; }
        public object noneValue { get; private set; }
        public bool transitionable { get; private set; }
        public bool inherited { get; private set; }
        public IStyleConverter converter;

        private Func<NodeStyle, T> getter;
        public virtual bool affectsLayout => false;
        public List<IStyleProperty> ModifiedProperties { get; }
        public StyleProperty(string name, object defaultValue = null, bool transitionable = false, bool inherited = false, IStyleConverter converter = null, object noneValue = null)
        {
            this.type = typeof(T);
            this.name = name;
            this.defaultValue = defaultValue;
            this.noneValue = noneValue;
            this.transitionable = transitionable;
            this.inherited = inherited;

            if (converter == null) converter = AllConverters.Get(type);
            if (!(converter is GeneralConverter)) converter = new GeneralConverter(converter);
            this.converter = converter;

            var propInfo = typeof(NodeStyle).GetProperty(name, BindingFlags.Public | BindingFlags.GetProperty | BindingFlags.SetProperty | BindingFlags.Instance);

            ModifiedProperties = new List<IStyleProperty>(1) { this };

            if (propInfo != null)
                getter = (Func<NodeStyle, T>) propInfo.GetGetMethod().CreateDelegate(typeof(Func<NodeStyle, T>));
        }

        public object Convert(object value)
        {
            var keyword = CssKeyword.NoKeyword;
            if (value is string s) keyword = RuleHelpers.GetCssKeyword(s);
            else if (value is CssKeyword k) keyword = k;

            if (keyword == CssKeyword.Initial || keyword == CssKeyword.Default) value = defaultValue;
            else if (keyword == CssKeyword.None || keyword == CssKeyword.Unset) value = noneValue;
            else if (keyword == CssKeyword.CurrentColor) value = ComputedCurrentColor.Instance;
            else if (keyword != CssKeyword.NoKeyword) value = keyword;

            if (value is CssKeyword) return value;
            if (value == null) return null;

            return converter.Convert(value);
        }

        public static bool operator ==(StyleProperty<T> left, StyleProperty<T> right) => left.name == right.name;
        public static bool operator !=(StyleProperty<T> left, StyleProperty<T> right) => left.name != right.name;
        public override int GetHashCode() => name.GetHashCode();
        public override bool Equals(object obj) => obj is IStyleProperty v && v.name == name;

        public object GetStyle(NodeStyle style)
        {
            return getter != null ? getter(style) : default;
        }

        public List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            value = Convert(value);
            if (Equals(value, CssKeyword.Invalid)) return null;

            collection[this] = value;
            return ModifiedProperties;
        }
    }
}
