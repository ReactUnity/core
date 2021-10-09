using System;
using System.Collections.Generic;
using ReactUnity.Animations;
using ReactUnity.Converters;
using ReactUnity.Styling;

namespace ReactUnity.Types
{
    public interface ICssValueList<T>
    {
        T Get(int index, T defaultValue = default);

        int Count { get; }
        bool Any { get; }
    }

    public class CssValueList<T> : List<T>, ICssValueList<T>
    {
        static public CssValueList<T> Empty = new CssValueList<T>();
        public bool Any => Count > 0;

        public CssValueList() { }
        public CssValueList(T item) : base(new[] { item }) { }
        public CssValueList(T[] items) : base(items ?? new T[0]) { }

        public T Get(int index, T defaultValue = default) => Count == 0 ? defaultValue : this[index % Count];

        public class Converter : IStyleParser, IStyleConverter
        {
            IStyleConverter BaseConverter;

            public Converter(IStyleConverter baseConverter = null)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
            }

            public bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None;
            public object Convert(object value)
            {
                if (value == null || Equals(value, CssKeyword.None)) return Empty;
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

        public T Get(int index, T defaultValue = default)
        {
            return Interpolater.ForceTypedInterpolate<T>(From.Get(index, defaultValue), To.Get(index, defaultValue), Ratio);
        }
    }
}
