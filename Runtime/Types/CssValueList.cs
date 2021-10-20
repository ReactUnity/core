using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;

namespace ReactUnity.Types
{
    public interface ICssValueList<T>
    {
        T Get(int index);
        T Get(int index, T defaultValue);

        int Count { get; }
        bool Any { get; }
    }

    public class CssValueList<T> : List<T>, ICssValueList<T>, Interpolatable
    {
        public static CssValueList<T> Empty = new CssValueList<T>();
        public bool Any => Count > 0;

        public virtual T DefaultValue { get; }

        public CssValueList() { }

        public CssValueList(T item, T defaultValue = default) : base(new[] { item })
        {
            DefaultValue = defaultValue;
        }

        public CssValueList(T[] items, T defaultValue = default) : base(items ?? new T[0])
        {
            DefaultValue = defaultValue;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public T Get(int index) => Count == 0 ? DefaultValue : this[index % Count];
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public T Get(int index, T defaultValue) => Count == 0 ? defaultValue : this[index % Count];

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public object Interpolate(object to, float t)
        {
            if (to is ICssValueList<T> tto) return new CssValueListInterpolated<T>(this, tto, t);
            return t > 0.5f ? to : this;
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            IStyleConverter BaseConverter;

            CssValueList<T> DefaultList;

            public Converter(IStyleConverter baseConverter = null)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
                DefaultList = Empty;
            }

            public Converter(IStyleConverter baseConverter = null, T emptyValue = default)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
                DefaultList = new CssValueList<T>(new T[0], emptyValue);
            }

            public bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None;
            public object Convert(object value)
            {
                if (value == null || Equals(value, CssKeyword.None)) return DefaultList;
                if (value is CssValueList<T>) return value;

                if (!(value is string))
                {
                    var converted = BaseConverter.Convert(value);

                    if (converted is T t)
                    {
                        return new CssValueList<T>(t);
                    }
                }
                return Parse(value?.ToString());
            }
            public object Parse(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return CssKeyword.Invalid;

                var splits = ParserHelpers.Split(value, ',');

                var items = new T[splits.Count];

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];
                    var item = BaseConverter.Parse(split);
                    if (item is T it)
                    {
                        items[i] = it;
                    }
                    else
                    {
                        return CssKeyword.Invalid;
                    }
                }

                return new CssValueList<T>(items);
            }
        }
    }

    public struct CssValueListInterpolated<T> : ICssValueList<T>
    {
        public ICssValueList<T> From;
        public ICssValueList<T> To;
        public float Ratio;

        public int Count => From.Count > To.Count ? From.Count : To.Count;
        public bool Any => From.Any || To.Any;

        public CssValueListInterpolated(ICssValueList<T> from, ICssValueList<T> to, float ratio)
        {
            From = from;
            To = to;
            Ratio = ratio;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public T Get(int index) => Interpolater.ForceTypedInterpolate<T>(From.Get(index), To.Get(index), Ratio);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public T Get(int index, T defaultValue) => Interpolater.ForceTypedInterpolate<T>(From.Get(index, defaultValue), To.Get(index, defaultValue), Ratio);
    }
}
