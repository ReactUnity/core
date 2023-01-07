using System.Linq;
using System.Runtime.CompilerServices;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    public interface ICssFourDirectional<T>
    {
        T Top { get; }
        T Right { get; }
        T Bottom { get; }
        T Left { get; }
    }

    public class CssFourDirectional<T> : ICssFourDirectional<T>, Interpolatable
    {
        public static CssFourDirectional<T> Default = new CssFourDirectional<T>();

        public T Top { get; private set; }
        public T Right { get; private set; }
        public T Bottom { get; private set; }
        public T Left { get; private set; }

        public CssFourDirectional() { }

        public CssFourDirectional(T top, T right, T bottom, T left)
        {
            Top = top;
            Right = right;
            Bottom = bottom;
            Left = left;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is ICssFourDirectional<T> tto) return new CssFourDirectionalInterpolated<T>(this, tto, t);
            return t > 0.5f ? to : this;
        }

        public class Converter : TypedStyleConverterBase<CssFourDirectional<T>>
        {
            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (BaseConverter.HandleKeyword(keyword, out var itemRes))
                {
                    if (!(itemRes is ComputedKeyword))
                    {
                        return ComputedMapper.Create(out result, itemRes, BaseConverter,
                            (resolvedValue) => {
                                if (resolvedValue is T t) return new CssFourDirectional<T>(t, t, t, t);
                                return null;
                            });
                    }
                }

                if (keyword == CssKeyword.None)
                {
                    result = new ComputedConstant(DefaultValue);
                    return true;
                }

                return base.HandleKeyword(keyword, out result);
            }

            StyleConverterBase BaseConverter;

            CssFourDirectional<T> DefaultValue;

            public Converter(StyleConverterBase baseConverter = null)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
                DefaultValue = Default;
            }

            public Converter(StyleConverterBase baseConverter, T emptyValue)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
                DefaultValue = new CssFourDirectional<T>(emptyValue, emptyValue, emptyValue, emptyValue);
            }


            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, BaseConverter,
                    (resolvedValue) => {
                        if (resolvedValue is T t) return new CssFourDirectional<T>(t, t, t, t);
                        return null;
                    });
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                var splits = ParserHelpers.SplitWhitespace(value);

                return ComputedList.Create(out result, splits.OfType<object>().ToList(), BaseConverter,
                    (values) => {
                        for (int i = 0; i < values.Count; i++)
                        {
                            if (!(values[i] is T)) return null;
                        }
                        var top = (T) values[0];
                        var right = values.Count > 1 ? (T) values[1] : top;
                        var bottom = values.Count > 2 ? (T) values[2] : top;
                        var left = values.Count > 3 ? (T) values[3] : right;

                        return new CssFourDirectional<T>(top, right, bottom, left);
                    });
            }
        }
    }

    public struct CssFourDirectionalInterpolated<T> : ICssFourDirectional<T>, Interpolatable
    {
        public ICssFourDirectional<T> From;
        public ICssFourDirectional<T> To;
        public float Ratio;

        public T Top => Interpolater.ForceTypedInterpolate<T>(From.Top, To.Top, Ratio);
        public T Right => Interpolater.ForceTypedInterpolate<T>(From.Right, To.Right, Ratio);
        public T Bottom => Interpolater.ForceTypedInterpolate<T>(From.Bottom, To.Bottom, Ratio);
        public T Left => Interpolater.ForceTypedInterpolate<T>(From.Left, To.Left, Ratio);

        public CssFourDirectionalInterpolated(ICssFourDirectional<T> from, ICssFourDirectional<T> to, float ratio)
        {
            From = from;
            To = to;
            Ratio = ratio;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is ICssFourDirectional<T> tto) return new CssFourDirectionalInterpolated<T>(this, tto, t);
            return t > 0.5f ? to : this;
        }
    }
}
