using System;

namespace ReactUnity.Styling
{
    public class VariableProperty : IStyleProperty
    {
        public string name { get; }

        public Type type { get; }

        public object defaultValue => null;

        public bool transitionable => true;

        public bool inherited => true;

        public bool proxy { get; } = false;
        public object noneValue { get; } = null;

        public VariableProperty(string name, Type type = null)
        {
            this.name = name;
            this.type = type;
        }

        public object Convert(object value)
        {
            return value is IDynamicValue d ? d : new DynamicValue(value);
        }

        public object GetStyle(NodeStyle style) => style.GetRawStyleValue(this);

        public override bool Equals(object obj) => obj is VariableProperty v && v.name == name;

        public override int GetHashCode() => name.GetHashCode();
    }
}
