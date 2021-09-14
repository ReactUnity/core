using System;
using System.Collections.Generic;
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
        public bool transitionable { get; private set; }
        public bool inherited { get; private set; }
        public IStyleConverter converter;
        public virtual bool affectsLayout => false;
        public List<IStyleProperty> ModifiedProperties { get; }
        public StyleProperty(string name, object initialValue = null, bool transitionable = false, bool inherited = false, IStyleConverter converter = null)
        {
            this.type = typeof(T);
            this.name = name;
            this.defaultValue = initialValue;
            this.transitionable = transitionable;
            this.inherited = inherited;

            if (converter == null) converter = AllConverters.Get(type);
            this.converter = GeneralConverter.Wrap(converter);

            ModifiedProperties = new List<IStyleProperty>(1) { this };
        }

        public object Convert(object value)
        {
            var keyword = CssKeyword.NoKeyword;
            if (value is string s) keyword = RuleHelpers.GetCssKeyword(s);
            else if (value is CssKeyword k) keyword = k;

            if (converter.CanHandleKeyword(keyword)) return converter.Convert(keyword);

            if (keyword == CssKeyword.Initial || keyword == CssKeyword.Default || keyword == CssKeyword.None || keyword == CssKeyword.Unset) value = defaultValue;
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

        public object GetStyle(NodeStyle style) => style.GetStyleValue(this);

        public List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (value == null)
            {
                collection.Remove(this);
                return ModifiedProperties;
            }

            value = Convert(value);
            if (Equals(value, CssKeyword.Invalid)) return null;

            collection[this] = value;
            return ModifiedProperties;
        }
    }
}
