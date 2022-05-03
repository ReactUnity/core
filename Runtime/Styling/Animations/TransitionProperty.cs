using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Styling.Animations
{
    public class TransitionProperty
    {
        static public TransitionProperty None = new TransitionProperty("");
        static public TransitionProperty All = new TransitionProperty("all");
        static private List<IStyleProperty> PropertiesEmpty = new List<IStyleProperty>();
        public string Definition { get; }
        public bool IsAll { get; } = false;
        public List<IStyleProperty> Properties { get; } = PropertiesEmpty;

        public TransitionProperty(string definition)
        {
            Definition = definition;
            if (!string.IsNullOrWhiteSpace(definition))
            {
                var key = CssProperties.GetKey(definition);
                Properties = key?.ModifiedProperties ?? PropertiesEmpty;
                IsAll = key == AllShorthands.All;
            }
        }


        public class Converter : TypedStyleConverterBase<TransitionProperty>
        {
            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (value == "all") return Constant(All, out result);
                return Constant(new TransitionProperty(value), out result);
            }
        }
    }
}
