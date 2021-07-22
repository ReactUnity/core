using System.Collections.Generic;

namespace ReactUnity.Styling.Shorthands
{
    public abstract class StyleShorthand : IStyleModifier
    {
        public string Name { get; }
        public abstract List<IStyleProperty> ModifiedProperties { get; }

        public StyleShorthand(string name)
        {
            Name = name;
        }

        public abstract List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value);
    }
}
