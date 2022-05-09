using System.Collections.Generic;
using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedShorthandVariable : IComputedValue
    {
        public IComputedValue Variable { get; }
        internal StyleShorthand Shorthand { get; }

        internal ComputedShorthandVariable(IComputedValue variable, StyleShorthand shorthand)
        {
            Variable = variable;
            Shorthand = shorthand;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var varValue = Variable.ResolveValue(prop, style, ComputedStringTemplate.VariableStringConverter) as string;

            var collection = new Dictionary<IStyleProperty, object>();
            Shorthand.Modify(collection, varValue);

            if (collection.TryGetValue(prop, out var val)) return val;
            return null;
        }

    }
}
