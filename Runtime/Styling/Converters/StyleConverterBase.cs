using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    public interface IStyleConverter
    {
        IComputedValue Convert(object value);
        string Stringify(object value);
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

            if (ParserHelpers.TryParseVariables(value, out result)) return true;

            var fns = AllowedFunctions;
            if (fns.Count > 0 && CssFunctions.TryCall(value, out var fnResult, fns, this)) return TryConvert(fnResult, out result);

            if (ParserHelpers.TryParseKeyword(value, out var k)) return HandleKeyword(k, out result);

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

        public string Stringify(object value)
        {
            if (value is string s) return s;
            return StringifyInternal(value);
        }

        public virtual string StringifyInternal(object value)
        {
            return null;
        }
    }

    public class TypedStyleConverterBase<T> : StyleConverterBase
    {
        protected override Type TargetType => typeof(T);

        public override string StringifyInternal(object value)
        {
            if (value is T t) return StringifyTyped(t);
            return null;
        }

        public virtual string StringifyTyped(T value)
        {
            return null;
        }
    }
}
