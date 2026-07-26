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

        public static unsafe string GetString(JSContext ctx, IntPtr ptr, int len)
        {
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

            return null;
        }
    }
}