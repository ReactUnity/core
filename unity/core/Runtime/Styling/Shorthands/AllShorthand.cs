using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class AllShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = CssProperties.AllProperties;

        public AllShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value?.ToString();

            if (ParserHelpers.TryParseKeyword(str, out var k))
            {
                foreach (var item in ModifiedProperties)
                {
                    collection[item] = new ComputedKeyword(k);
                }
                return ModifiedProperties;
            }
            return null;
        }
    }
}
