using System;
using System.Runtime.InteropServices;
using System.Text;

namespace QuickJS.Native
{
    public partial class JSApi
    {
        /// <summary>
        /// it's equivalent to JS_Call with a single element argv
        /// </summary>
        public static unsafe JSValue Call(JSContext ctx, JSValue func_obj, JSValue this_obj, JSValue arg0)
        {
            var argv = stackalloc[] { arg0 };
            return JS_Call(ctx, func_obj, this_obj, 1, argv);
        }

        public static string GetString(JSContext ctx, JSAtom atom)
        {
            var strValue = JSApi.JS_AtomToString(ctx, atom);
            var str = strValue.IsString() ? GetString(ctx, strValue) : null;
            JSApi.JS_FreeValue(ctx, strValue);
            return str;
        }

        public static string GetString(JSContext ctx, JSValue val)
        {
            size_t len;
            var pstr = JSApi.JS_ToCStringLen(ctx, out len, val);
            if (pstr == IntPtr.Zero)
            {
                return null;
            }

            try
            {
                return JSApi.GetString(ctx, pstr, len);
            }
            finally
            {
                JSApi.JS_FreeCString(ctx, pstr);
            }
        }

        public static string GetNonNullString(JSContext ctx, JSValue val)
        {
            size_t len;
            var pstr = JSApi.JS_ToCStringLen(ctx, out len, val);
            if (pstr == IntPtr.Zero)
            {
                return string.Empty;
            }

            try
            {
                return JSApi.GetString(ctx, pstr, len) ?? string.Empty;
            }
            finally
            {
                JSApi.JS_FreeCString(ctx, pstr);
            }
        }

        public static unsafe void MemoryCopy(void* source, void* destination, long destinationSizeInBytes, long sourceBytesToCopy)
        {
#if JSB_COMPATIBLE
            if (sourceBytesToCopy > destinationSizeInBytes)
            {
                throw new ArgumentOutOfRangeException();
            }

            var pSource = (byte*)source;
            var pDestination = (byte*)destination;

            for (int i = 0; i < sourceBytesToCopy; ++i)
            {
                pDestination[i] = pSource[i];
            }
#else
            Buffer.MemoryCopy(source, destination, destinationSizeInBytes, sourceBytesToCopy);
#endif
        }

        /// <summary>Reads a null-terminated UTF-8 string the engine owns.</summary>
        // Every `const char *` the engine hands a callback is UTF-8. Declaring such a parameter
        // as `string` marshals it as the ANSI code page instead, which silently mangles any
        // module path outside ASCII -- so the delegates take IntPtr and decode here.
        public static unsafe string GetString(IntPtr ptr)
        {
            if (ptr == IntPtr.Zero)
            {
                return null;
            }

            var p = (byte*)(void*)ptr;
            var len = 0;
            while (p[len] != 0) len++;
            return len == 0 ? string.Empty : Encoding.UTF8.GetString(p, len);
        }

        /// <summary>Decodes a UTF-8 buffer of a known length. Null only when there is no buffer.</summary>
        // A zero length is the empty string, not the absence of one: returning null for it made
        // QuickJS the one engine that marshalled '' back to C# as null.
        public static unsafe string GetString(JSContext ctx, IntPtr ptr, int len)
        {
            if (ptr == IntPtr.Zero)
            {
                return null;
            }

            if (len > 0)
            {
                var str = Marshal.PtrToStringAnsi(ptr, len);
                if (str == null)
                {
#if JSB_COMPATIBLE
                    var buffer = new byte[len];
                    Marshal.Copy(ptr, buffer, 0, len);
                    return Encoding.UTF8.GetString(buffer);
#else
                    var pointer = (byte*)(void*)ptr;
                    return Encoding.UTF8.GetString(pointer, len);
#endif
                }

                return str;
            }

            return string.Empty;
        }
    }
}