using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public class ValueListStyleProperty<T> : StyleProperty<CssValueList<T>>
    {
        public ValueListStyleProperty(string name, object initialValue = null, bool transitionable = false, bool inherited = false, IStyleConverter converter = null, IStyleConverter baseConverter = null) :
            base(name, initialValue ?? CssValueList<T>.Empty, transitionable, inherited, converter ?? new CssValueList<T>.Converter(baseConverter))
        {
        }
    }
}
