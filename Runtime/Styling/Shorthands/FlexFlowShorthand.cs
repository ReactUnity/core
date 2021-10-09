using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;

namespace ReactUnity.Styling.Shorthands
{
    public class FlexFlowShorthand : StyleShorthand
    {
        private static GeneralConverter DirectionConverter = AllConverters.Get<YogaFlexDirection>();
        private static GeneralConverter WrapConverter = AllConverters.Get<YogaWrap>();
        public override List<IStyleProperty> ModifiedProperties { get; }

        public FlexFlowShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                LayoutProperties.FlexDirection,
                LayoutProperties.Wrap,
            };
        }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 2) return null;

            var dirSet = false;
            var wrapSet = false;

            var dir = YogaFlexDirection.Row;
            var wrap = YogaWrap.NoWrap;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!dirSet)
                {
                    var val = DirectionConverter.Parse(split);

                    if (val is YogaFlexDirection v)
                    {
                        dir = v;
                        dirSet = true;
                        continue;
                    }
                }

                if (!wrapSet)
                {
                    var val = WrapConverter.Parse(split);

                    if (val is YogaWrap v)
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
