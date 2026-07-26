using System;
using System.Runtime.InteropServices;

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
            var err_fileName = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_fileName);
            var err_lineNumber = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_lineNumber);
            var err_message = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_message);
            var err_stack = JSApi.JS_GetProperty(this, ex, JSApi.JS_ATOM_stack);

            try
            {
                var fileName = JSApi.GetString(this, err_fileName);
                var lineNumber = JSApi.GetString(this, err_lineNumber);
                var message = JSApi.GetString(this, err_message);
                var stack = JSApi.GetString(this, err_stack);
                var exceptionString = string.Format("[JS] {0}:{1} {2}\n{3}", fileName, lineNumber, message, stack);

                return exceptionString;
            }
            finally
            {

                JSApi.JS_FreeValue(this, err_fileName);
                JSApi.JS_FreeValue(this, err_lineNumber);
                JSApi.JS_FreeValue(this, err_message);
                JSApi.JS_FreeValue(this, err_stack);
                JSApi.JS_FreeValue(this, ex);
            }
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
