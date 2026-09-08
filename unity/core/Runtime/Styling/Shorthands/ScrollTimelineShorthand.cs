using System.Collections.Generic;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary><c>scroll-timeline: name axis</c>. The axis is optional and resets to <c>block</c> when left out.</summary>
    internal class ScrollTimelineShorthand : StyleShorthand
    {
        private static StyleConverterBase AxisConverter = AllConverters.Get<TimelineAxis>();

        public override List<IStyleProperty> ModifiedProperties { get; }

        public ScrollTimelineShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                StyleProperties.scrollTimelineName,
                StyleProperties.scrollTimelineAxis,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var splits = ParserHelpers.SplitWhitespace(value.ToString());
            if (splits.Count == 0 || splits.Count > 2) return null;

            if (!AllConverters.TimelineNameConverter.TryParse(splits[0].Trim(), out var name)) return null;

            IComputedValue axis = new ComputedConstant(TimelineAxis.Block);
            if (splits.Count == 2 && !AxisConverter.TryParse(splits[1].Trim(), out axis)) return null;

            collection[ModifiedProperties[0]] = name;
            collection[ModifiedProperties[1]] = axis;

            return ModifiedProperties;
        }
    }
}
