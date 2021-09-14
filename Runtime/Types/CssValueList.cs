using System.Collections;
using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Types
{
    public class CssValueList<T> : List<T>
    {
        static public CssValueList<T> Empty = new CssValueList<T>();
        public T Get(int index) => Count == 0 ? default : this[index % Count];

        public CssValueList() { }
        public CssValueList(T item) : base(new[] { item }) { }
        public CssValueList(T[] items) : base(items ?? new T[0]) { }

        public class Converter : IStyleParser, IStyleConverter
        {
            IStyleConverter BaseConverter;

            public Converter()
            {
                BaseConverter = AllConverters.Get<T>();
            }

            public bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None;
            public object Convert(object value)
            {
                if (Equals(value, CssKeyword.None)) return Empty;

                if (!(value is string))
                {
                    var converted = BaseConverter.Convert(value);

                    if (converted is T t)
                    {
                        return new CssValueList<T>(t);
                    }
                }
                return FromString(value?.ToString());
            }
            public object FromString(string value)
            {
                var splits = ParserHelpers.Split(value, ',');

                var items = new T[splits.Count];

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];
                    var item = BaseConverter.Convert(split);
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
}
