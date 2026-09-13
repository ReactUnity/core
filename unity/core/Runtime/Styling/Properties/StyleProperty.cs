using System;
using System.Collections.Generic;

using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling
{
    public class StyleProperty<T> : IStyleProperty
    {
        public string name { get; private set; }
        public Type type { get; private set; }
        public object defaultValue { get; private set; }
        public bool transitionable { get; private set; }
        public bool inherited { get; private set; }
        public StyleConverterBase converter;
        public virtual bool affectsLayout => false;
        public List<IStyleProperty> ModifiedProperties { get; }
        public StyleProperty(string name, object initialValue = null, bool transitionable = false, bool inherited = false, StyleConverterBase converter = null)
        {
            this.type = typeof(T);
            this.name = name;
            this.defaultValue = initialValue;
            this.transitionable = transitionable;
            this.inherited = inherited;
            this.converter = converter ?? AllConverters.Get<T>();

            ModifiedProperties = new List<IStyleProperty>(1) { this };
        }

        public IComputedValue Convert(object value)
        {
            var converted = converter.Convert(value);

            // A constant that is not this property's type gets one more pass through the converter.
            // A calc() that came out as a percentage answers with a YogaValue, which is the value
            // `width` wanted and a number `border-width` still has to resolve -- and the converter
            // is shared between them, so only the property can tell those apart.
            if (converted != null && StylingUtils.UnboxConstant(converted, out var unboxed) &&
                unboxed != null && !type.IsAssignableFrom(unboxed.GetType()))
                return converter.Convert(unboxed);

            return converted;
        }
        public string Stringify(object value) => converter.Stringify(value);

        public bool CanHandleKeyword(CssKeyword keyword) => true;

        public static bool operator ==(StyleProperty<T> left, StyleProperty<T> right) => left.name == right.name;
        public static bool operator !=(StyleProperty<T> left, StyleProperty<T> right) => left.name != right.name;
        public override int GetHashCode() => name.GetHashCode();
        public override bool Equals(object obj) => obj is IStyleProperty v && v.name == name;

        public object GetStyle(NodeStyle style) => style.GetStyleValue(this);

        public List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (value == null || ("" == value as string))
            {
                collection.Remove(this);
                return ModifiedProperties;
            }

            var converted = Convert(value);
            if (converted == null)
            {
                StyleDiagnostics.Dropped(name, value);
                return null;
            }
            value = converted;

            collection[this] = value;
            return ModifiedProperties;
        }
    }
}
