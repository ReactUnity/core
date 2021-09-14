using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Animations
{
    public class TransitionProperty
    {
        static public TransitionProperty Empty = new TransitionProperty("");
        static private List<IStyleProperty> PropertiesEmpty = new List<IStyleProperty>();
        public bool All { get; } = false;
        public List<IStyleProperty> Properties { get; } = PropertiesEmpty;

        public TransitionProperty(string definition)
        {
            if (!string.IsNullOrWhiteSpace(definition))
            {
                var key = CssProperties.GetKey(definition);
                Properties = key?.ModifiedProperties ?? PropertiesEmpty;
                All = key == AllShorthands.All;
            }
        }


        public class Converter : IStyleParser, IStyleConverter
        {
            public bool CanHandleKeyword(CssKeyword keyword) => false;
            public object Convert(object value) => FromString(value?.ToString());
            public object FromString(string value) => new TransitionProperty(value);
        }
    }
}
