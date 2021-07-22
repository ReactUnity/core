using System;
using System.Collections.Generic;

namespace ReactUnity.Styling
{
    public class VariableProperty : IStyleProperty
    {
        public string name { get; }
        public Type type { get; }
        public object defaultValue => null;
        public bool transitionable => true;
        public bool inherited => true;
        public object noneValue { get; } = null;
        public bool affectsLayout => true;

        public List<IStyleProperty> ModifiedProperties { get; }

        public VariableProperty(string name, Type type = null)
        {
            this.name = name;
            this.type = type;
            ModifiedProperties = new List<IStyleProperty>(1) { this };
        }

        public object Convert(object value)
        {
            return value is IDynamicValue d ? d : new DynamicValue(value);
        }

        public object GetStyle(NodeStyle style) => style.GetRawStyleValue(this);

        public static bool operator ==(VariableProperty left, VariableProperty right) => left.name == right.name;
        public static bool operator !=(VariableProperty left, VariableProperty right) => left.name != right.name;
        public override int GetHashCode() => name.GetHashCode();
        public override bool Equals(object obj) => obj is VariableProperty v && v.name == name;

        public List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            collection[this] = Convert(value);
            return ModifiedProperties;
        }
    }
}
