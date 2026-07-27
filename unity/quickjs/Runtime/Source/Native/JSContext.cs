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
        /// Renders a thrown value into the most locatable string available: the error's class name,
        /// its message, the throw site and the JS stack. Ownership of <paramref name="ex"/> stays
        /// with the caller.
        /// </summary>
        /// <remarks>
        /// Which of those parts exist depends on where the error was raised, and the ones that go
        /// missing are exactly the ones you want. Errors thrown from inside the engine --
        /// `TypeError: not a function` being the one everyone meets -- carry no `fileName` and no
        /// `lineNumber`, only a `stack`. This used to be formatted as
        /// `"[JS] {fileName}:{lineNumber} {message}\n{stack}"`, which turned those into
        /// `[JS] undefined:undefined not a function`: the two placeholders rendered literally
        /// (`JS_GetProperty` returns `undefined` for an absent property, and `JS_ToCString` spells
        /// that out), and reading `message` alone dropped the one word -- `TypeError` -- that said
        /// what kind of failure it was. Every part is optional here, and the stack, which is the
        /// only piece that reliably points at a line of the user's code, is always appended.
        /// </remarks>
        public string FormatException(JSValue ex)
        {
            // `throw 'oops'` and `throw 42` are legal: there is no name, no site and no stack to
            // report, only the value itself.
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
                // An error with an empty message still has its class name to report. A thrown plain
                // object has neither, so stringify the object itself and hope it has a `toString`.
                else header = (isError ? name : ToStringSafe(ex)) ?? "Error";

                var sb = new StringBuilder(header);

                // Set for parse and module errors, absent for everything the engine throws at
                // runtime -- so it can never be the only locator in the message.
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

        /// A missing property comes back as `undefined`, which `JS_ToCString` renders as the nine
        /// characters "undefined" rather than as nothing -- so absence has to be checked first. A
        /// getter that threw comes back as the exception marker, with the failure left pending;
        /// neither of those is something an error report should be propagating.
        private string GetStringIfPresent(JSValue val)
        {
            if (val.IsException())
            {
                JSApi.JS_FreeValue(this, JSApi.JS_GetException(this));
                return null;
            }

            return val.IsNullish() ? null : ToStringSafe(val);
        }

        /// <summary>
        /// `JS_ToCString` runs `toString`, which can itself throw -- on a Symbol, or on an object
        /// with a hostile `toString`. It signals that by returning null and leaving a *new*
        /// exception pending, which would then surface at some unrelated later call. Reporting an
        /// error must not be able to plant one, so the replacement is taken and dropped here.
        /// </summary>
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
