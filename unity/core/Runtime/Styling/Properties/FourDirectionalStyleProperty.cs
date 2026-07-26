
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public class FourDirectionalStyleProperty<T> : StyleProperty<ICssFourDirectional<T>>
    {
        public CssFourDirectional<T>.Converter Converter { get; }


        public FourDirectionalStyleProperty(string name, object initialValue, bool transitionable, bool inherited, StyleConverterBase converter) :
            base(name, initialValue ?? CssFourDirectional<T>.Default, transitionable, inherited, converter)
        {
            Converter = converter as CssFourDirectional<T>.Converter;
        }

        public FourDirectionalStyleProperty(string name, CssFourDirectional<T> initialValue = null, bool transitionable = false, bool inherited = false, StyleConverterBase baseConverter = null) :
            this(name, (initialValue ?? CssFourDirectional<T>.Default) as object, transitionable, inherited, new CssFourDirectional<T>.Converter(baseConverter))
        {
        }

        public FourDirectionalStyleProperty(string name, T emptyValue, bool transitionable = false, bool inherited = false, StyleConverterBase baseConverter = null) :
            this(name, new CssFourDirectional<T>(emptyValue, emptyValue, emptyValue, emptyValue) as object, transitionable, inherited, new CssFourDirectional<T>.Converter(baseConverter, emptyValue))
        {
        }
    }
}
