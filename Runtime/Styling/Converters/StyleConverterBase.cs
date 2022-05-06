using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Styling.Converters
{
    public interface IStyleConverter
    {
        IComputedValue Convert(object value);
    }

    public class StyleConverterBase : IStyleConverter
    {
        static private HashSet<string> DefaultAllowedFunctions = new HashSet<string> { "var" };
        protected virtual HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

        protected virtual Type TargetType => null;

        public virtual bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
        {
            result = new ComputedKeyword(keyword);
            return true;
        }

        public bool CanHandleKeyword(CssKeyword keyword)
        {
            return HandleKeyword(keyword, out var result) && !(result is ComputedKeyword);
        }

        public bool TryConvert(object value, out IComputedValue result)
        {
            if (value == null)
            {
                result = null;
                return false;
            }

            if (value is string s) return TryParse(s, out result);

            if (TargetType != null && TargetType.IsAssignableFrom(value.GetType()))
            {
                result = StylingUtils.CreateComputed(value);
                return true;
            }

            if (value is IComputedValue c)
            {
                result = c;
                return true;
            }

            if (value is CssKeyword k) return HandleKeyword(k, out result);

            return ConvertInternal(value, out result);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected virtual bool ConvertInternal(object value, out IComputedValue result)
        {
            result = null;
            return false;
        }

        public bool TryParse(string value, out IComputedValue result)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                result = null;
                return false;
            }

            var fns = AllowedFunctions;
            if (fns.Count > 0 && CssFunctions.TryCall(value, out var fnResult, fns, this)) return TryConvert(fnResult, out result);

            if (ParserHelpers.TryParseKeyword(value, out var k)) return HandleKeyword(k, out result);

            // TODO: interpolate vars

            return ParseInternal(value, out result);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected virtual bool ParseInternal(string value, out IComputedValue result)
        {
            result = null;
            return false;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected static bool Constant(object value, out IComputedValue result)
        {
            result = new ComputedConstant(value);
            return true;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected static bool Fail(out IComputedValue result)
        {
            result = null;
            return false;
        }


        public IComputedValue Convert(object value)
        {
            if (TryConvert(value, out var rs)) return rs;
            return null;
        }

        public bool TryGetConstantValue<T>(object value, out T result)
        {
            if (!TryConvert(value, out var resolved))
            {
                result = default(T);
                return false;
            }

            if (StylingUtils.UnboxConstant(resolved, out var cv) && cv is T t)
            {
                result = t;
                return true;
            }

            result = default(T);
            return false;
        }


        public T TryGetConstantValue<T>(object value, T defaultValue = default)
        {
            if (!TryConvert(value, out var resolved)) return defaultValue;
            if (StylingUtils.UnboxConstant(resolved, out var cv) && cv is T t) return t;
            return defaultValue;
        }
    }

    public class TypedStyleConverterBase<T> : StyleConverterBase
    {
        protected override Type TargetType => typeof(T);
    }
}
