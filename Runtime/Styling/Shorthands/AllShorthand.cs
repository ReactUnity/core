using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Styling.Shorthands
{
    internal class AllShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = CssProperties.AllProperties;

        public AllShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value?.ToString();
            var k = RuleHelpers.GetCssKeyword(str);

            if (k != CssKeyword.NoKeyword)
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
