using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary><c>container: name / type</c>. The type is optional and resets to <c>normal</c> when left out.</summary>
    internal class ContainerShorthand : StyleShorthand
    {
        private static StyleConverterBase TypeConverter = AllConverters.Get<ContainerType>();
        public override List<IStyleProperty> ModifiedProperties { get; }

        public ContainerShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                StyleProperties.containerName,
                StyleProperties.containerType,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var splits = ParserHelpers.SplitSlash(value.ToString());
            if (splits.Count == 0 || splits.Count > 2) return null;

            if (!AllConverters.ContainerNameConverter.TryParse(splits[0].Trim(), out var name)) return null;

            IComputedValue type = new ComputedConstant(ContainerType.Normal);
            if (splits.Count == 2 && !TypeConverter.TryParse(splits[1].Trim(), out type)) return null;

            collection[ModifiedProperties[0]] = name;
            collection[ModifiedProperties[1]] = type;

            return ModifiedProperties;
        }
    }
}
