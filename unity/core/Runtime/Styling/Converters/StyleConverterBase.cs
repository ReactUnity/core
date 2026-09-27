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

    /// <summary>A converter that can hand a resolved value on without wrapping it; see <see cref="StyleConverterBase.ConvertResolved"/>.</summary>
    internal interface IConvertsResolved
    {
        object ConvertResolved(object value);
    }

    internal static class ConverterExtensions
    {
        /// <summary>What <see cref="IStyleConverter.Convert"/> resolves to, skipping the constant it wraps an already typed value in.</summary>
        public static object ConvertResolved(this IStyleConverter converter, object value) =>
            converter is IConvertsResolved fast ? fast.ConvertResolved(value) : converter.Convert(value);
    }

    public class StyleConverterBase : IStyleConverter, IConvertsResolved
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

            if (IsTarget(value))
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

        // IsAssignableFrom is a reflection call under Mono, and a converter meets few types.
        private Type lastType;
        private bool lastAssignable;

        private bool IsTarget(object value)
        {
            var target = TargetType;
            if (target == null) return false;
            var type = value.GetType();
            if (type == target) return true;
            if (type != lastType)
            {
                lastAssignable = target.IsAssignableFrom(type);
                lastType = type;
            }
            return lastAssignable;
        }

        /// <summary>
        /// A value a computed value resolved to, as <see cref="Convert"/> would hand it on -- itself when
        /// it is already the target type, rather than wrapped in a constant for the caller to unwrap.
        /// </summary>
        public object ConvertResolved(object value) => IsResolvedTarget(value) ? value : Convert(value);

        internal bool IsResolvedTarget(object value) => value != null && !(value is string) && IsTarget(value);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected virtual bool ConvertInternal(object value, out IComputedValue result)
        {
            result = null;
            return false;
        }

        // A var() hands its text to the converter on every read, so each converter keeps what it parsed.
        private const int ParseCacheLimit = 1024;
        private Dictionary<string, IComputedValue> parsed;

        /// <summary>
        /// Whether parsing a string always gives the same result, which lets it be cached. Not for an
        /// asset reference: it resolves against the first context to load it and keeps that asset.
        /// </summary>
        internal virtual bool ParsesArePure => true;

        /// <summary>Whether a converter whose parses are not pure may still share this one, which holds no asset.</summary>
        internal virtual bool IsShareable(IComputedValue result) => result is ComputedVariable;

        public bool TryParse(string value, out IComputedValue result)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                result = null;
                return false;
            }

            if (parsed == null) parsed = new Dictionary<string, IComputedValue>();
            else if (parsed.TryGetValue(value, out result)) return result != null;

            var success = ParseUncached(value, out result);
            if (success && result == null) return true;
            if (!ParsesArePure && !(success && IsShareable(result))) return success;

            if (parsed.Count >= ParseCacheLimit) parsed.Clear();
            parsed[value] = success ? result : null;
            return success;
        }

        private bool ParseUncached(string value, out IComputedValue result)
        {
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
