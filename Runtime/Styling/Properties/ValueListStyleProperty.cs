
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public class ValueListStyleProperty<T> : StyleProperty<ICssValueList<T>>
    {
        public CssValueList<T>.Converter Converter { get; }


        public ValueListStyleProperty(string name, object initialValue, bool transitionable, bool inherited, StyleConverterBase converter) :
            base(name, initialValue ?? CssValueList<T>.Empty, transitionable, inherited, converter)
        {
            Converter = converter as CssValueList<T>.Converter;
        }

        public ValueListStyleProperty(string name, CssValueList<T> initialValue = null, bool transitionable = false, bool inherited = false, StyleConverterBase baseConverter = null) :
            this(name, (initialValue ?? CssValueList<T>.Empty) as object, transitionable, inherited, new CssValueList<T>.Converter(baseConverter))
        {
        }

        public ValueListStyleProperty(string name, T emptyValue, bool transitionable = false, bool inherited = false, StyleConverterBase baseConverter = null) :
            this(name, new CssValueList<T>(new T[0], emptyValue), transitionable, inherited, new CssValueList<T>.Converter(baseConverter, emptyValue))
        {
        }
    }
}
