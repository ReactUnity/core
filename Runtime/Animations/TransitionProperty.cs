using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Styling.Shorthands;

namespace ReactUnity.Animations
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


        public class Converter : IStyleParser, IStyleConverter
        {
            public bool CanHandleKeyword(CssKeyword keyword) => false;
            public object Convert(object value) => Parse(value?.ToString());
            public object Parse(string value) => new TransitionProperty(value);
        }
    }
}
