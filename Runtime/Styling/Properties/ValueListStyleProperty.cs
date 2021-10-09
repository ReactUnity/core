using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public class ValueListStyleProperty<T> : StyleProperty<ICssValueList<T>>
    {
        public ValueListStyleProperty(string name, object initialValue = null, bool transitionable = false, bool inherited = false, IStyleConverter converter = null, IStyleConverter baseConverter = null) :
            base(name, initialValue ?? CssValueList<T>.Empty, transitionable, inherited, converter ?? new CssValueList<T>.Converter(baseConverter))
        {
        }

        public ValueListStyleProperty(string name, T emptyValue, bool transitionable = false, bool inherited = false, IStyleConverter converter = null, IStyleConverter baseConverter = null) :
            base(name, new CssValueList<T>(new T[0], emptyValue), transitionable, inherited, converter ?? new CssValueList<T>.Converter(baseConverter, emptyValue))
        {
        }
    }
}
