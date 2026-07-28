using System;
using System.Runtime.InteropServices;
using System.Text;

namespace QuickJS.Native
{
    [StructLayout(LayoutKind.Sequential)]
    public struct JSContext
    {
        public static readonly JSContext Null;

        private unsafe void* _ptr;

        public unsafe bool IsValid()
        {
            return _ptr != (void*)0;
        }

        public unsafe bool IsContext(JSContext c)
        {
            return _ptr == c._ptr;
        }

        /// <summary>
        /// useful if you need a string from JS Exception and want to rethrow it as a C# Exception
        /// </summary>
        public string GetExceptionString()
        {
            var ex = JSApi.JS_GetException(this);

            try
            {
                return FormatException(ex);
            }
            finally
            {
                JSApi.JS_FreeValue(this, ex);
            }
        }

        /// <summary>
        /// Name, message, throw site and stack of a thrown value. Caller keeps ownership of ex.
        /// Every part is optional -- engine-thrown errors have only a stack -- so nothing is
        /// assumed present and the stack is always appended.
        /// </summary>
        public string FormatException(JSValue ex)
        {
            // `throw 'oops'` is legal; then there is only the value.
            if (!ex.IsObject()) return ToStringSafe(ex) ?? "(unprintable value)";

            var isError = JSApi.JS_IsError(this, ex) == 1;

            var err_name = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_name);
            var err_message = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_message);
            var err_fileName = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_fileName);
            var err_lineNumber = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_lineNumber);
            var err_stack = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_stack);

            try
            {
                var name = GetStringIfPresent(err_name);
                var message = GetStringIfPresent(err_message);
                var fileName = GetStringIfPresent(err_fileName);
                var lineNumber = GetStringIfPresent(err_lineNumber);
                var stack = GetStringIfPresent(err_stack);

                string header;
                if (!string.IsNullOrEmpty(message))
                    header = string.IsNullOrEmpty(name) ? message : name + ": " + message;
                // No message: an error still has its class name, a plain object has only toString.
                else header = (isError ? name : ToStringSafe(ex)) ?? "Error";

                var sb = new StringBuilder(header);

                // Only set for parse and module errors, never for runtime throws.
                if (!string.IsNullOrEmpty(fileName))
                {
                    sb.Append("\n    at ").Append(fileName);
                    if (!string.IsNullOrEmpty(lineNumber)) sb.Append(':').Append(lineNumber);
                }

                if (!string.IsNullOrEmpty(stack)) sb.Append('\n').Append(stack.TrimEnd());

                return sb.ToString();
            }
            finally
            {
                JSApi.JS_FreeValue(this, err_name);
                JSApi.JS_FreeValue(this, err_message);
                JSApi.JS_FreeValue(this, err_fileName);
                JSApi.JS_FreeValue(this, err_lineNumber);
                JSApi.JS_FreeValue(this, err_stack);
            }
        }

        /// JS_ToCString renders a missing property as the text "undefined", and a throwing getter
        /// leaves a pending exception -- neither belongs in an error report.
        private string GetStringIfPresent(JSValue val)
        {
            if (val.IsException())
            {
                JSApi.JS_FreeValue(this, JSApi.JS_GetException(this));
                return null;
            }

            return val.IsNullish() ? null : ToStringSafe(val);
        }

        /// JS_ToCString runs toString, which can throw (Symbols) and leave a new exception pending.
        /// Reporting an error must not plant one, so it is taken and dropped here.
        private string ToStringSafe(JSValue val)
        {
            var str = JSApi.GetString(this, val);
            if (str == null) JSApi.JS_FreeValue(this, JSApi.JS_GetException(this));
            return str;
        }

        public override unsafe int GetHashCode()
        {
            return (int)_ptr;
        }

        public override unsafe bool Equals(object obj)
        {
            if (obj is JSContext)
            {
                var t = (JSContext)obj;
                return t._ptr == _ptr;
            }

            return false;
        }

        public static unsafe bool operator ==(JSContext a, JSContext b)
        {
            return a._ptr == b._ptr;
        }

        public static bool operator !=(JSContext a, JSContext b)
        {
            return !(a == b);
        }
    }
}
