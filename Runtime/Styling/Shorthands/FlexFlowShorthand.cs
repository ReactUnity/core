using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class FlexFlowShorthand : StyleShorthand
    {
        private static StyleConverterBase DirectionConverter = AllConverters.Get<YogaFlexDirection>();
        private static StyleConverterBase WrapConverter = AllConverters.Get<YogaWrap>();
        public override List<IStyleProperty> ModifiedProperties { get; }

        public FlexFlowShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                LayoutProperties.FlexDirection,
                LayoutProperties.Wrap,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 2) return null;

            var dirSet = false;
            var wrapSet = false;

            IComputedValue dir = new ComputedConstant(YogaFlexDirection.Row);
            IComputedValue wrap = new ComputedConstant(YogaWrap.NoWrap);

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!dirSet)
                {
                    if (DirectionConverter.TryParse(split, out var v))
                    {
                        dir = v;
                        dirSet = true;
                        continue;
                    }
                }

                if (!wrapSet)
                {
                    if (WrapConverter.TryParse(split, out var v))
                    {
                        wrap = v;
                        wrapSet = true;
                        continue;
                    }
                }

                return null;
            }

            collection[ModifiedProperties[0]] = dir;
            collection[ModifiedProperties[1]] = wrap;

            return ModifiedProperties;
        }
    }
}
