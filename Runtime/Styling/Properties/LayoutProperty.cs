using ReactUnity.Converters;

namespace ReactUnity.Styling
{
    public interface ILayoutProperty : IStyleProperty { }

    public class LayoutProperty<T> : StyleProperty<T>, ILayoutProperty
    {
        public override bool affectsLayout => true;

        public LayoutProperty(string name, bool transitionable = false, T defaultValue = default, IStyleConverter converter = null) :
            base(name, defaultValue, transitionable, false, converter)
        { }

        public override object GetStyle(NodeStyle style) => style.GetStyleValue<T>(this);
    }
}
