using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

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

        public class Converter : TypedStyleConverterBase<CssValueList<T>>
        {
            public override bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.None;

            StyleConverterBase BaseConverter;

            CssValueList<T> DefaultList;

            public Converter(StyleConverterBase baseConverter = null)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
                DefaultList = Empty;
            }

            public Converter(StyleConverterBase baseConverter = null, T emptyValue = default)
            {
                BaseConverter = baseConverter ?? AllConverters.Get<T>();
                DefaultList = new CssValueList<T>(new T[0], emptyValue);
            }


            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, BaseConverter,
                    (object resolvedValue, out IComputedValue rs) => {
                        if (resolvedValue is T t) return Constant(new CssValueList<T>(t), out rs);
                        return Fail(out rs);
                    });
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (value == "none") return Constant(DefaultList, out result);

                var splits = ParserHelpers.Split(value, ',');

                return ComputedList.Create(out result, splits.OfType<object>().ToList(), BaseConverter,
                    (List<object> resolvedValues, out IComputedValue rs) => {
                        return Constant(new CssValueList<T>(resolvedValues.OfType<T>().ToArray()), out rs);
                    });
            }

            public IComputedValue FromList(IList<IComputedValue> list)
            {
                return new ComputedList(list, BaseConverter,
                    (List<object> resolvedValues, out IComputedValue rs) => {
                        return Constant(new CssValueList<T>(resolvedValues.OfType<T>().ToArray()), out rs);
                    });
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
