using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling
{
    public interface ILayoutProperty : IStyleProperty { }

    public class LayoutProperty<T> : StyleProperty<T>, ILayoutProperty
    {
        public override bool affectsLayout => true;

        public LayoutProperty(string name, bool transitionable = false, T defaultValue = default, StyleConverterBase converter = null) :
            base(name, defaultValue, transitionable, false, converter)
        { }

        public LayoutProperty(string name, IComputedValue defaultValue, StyleConverterBase converter = null) :
            base(name, defaultValue, false, false, converter)
        { }
    }
}
