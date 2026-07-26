using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    using Native;

    public partial class Values
    {
        public static JSValue js_push_primitive(JSContext ctx, JSValue o)
        {
            return JSApi.JS_DupValue(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, IntPtr o)
        {
            return js_push_classvalue(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, IntPtr? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return js_push_classvalue(ctx, (IntPtr)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, bool o)
        {
            return JSApi.JS_NewBool(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, bool? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewBool(ctx, (bool)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, sbyte o)
        {
            return JSApi.JS_NewInt32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, sbyte? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewInt32(ctx, (sbyte)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, byte o)
        {
            return JSApi.JS_NewInt32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, byte? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewInt32(ctx, (byte)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, char o)
        {
            return JSApi.JS_NewInt32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, char? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewInt32(ctx, (char)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, short o)
        {
            return JSApi.JS_NewInt32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, short? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewInt32(ctx, (short)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, ushort o)
        {
            return JSApi.JS_NewInt32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, ushort? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewInt32(ctx, (ushort)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, int o)
        {
            return JSApi.JS_NewInt32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, int? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewInt32(ctx, (int)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, uint o)
        {
            return JSApi.JS_NewUint32(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, uint? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewUint32(ctx, (uint)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, long o)
        {
            return JSApi.JSB_NewInt64(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, long? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JSB_NewInt64(ctx, (long)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, ulong o)
        {
            return JSApi.JSB_NewInt64(ctx, (long)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, ulong? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JSB_NewInt64(ctx, (long)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, float o)
        {
            return JSApi.JS_NewFloat64(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, float? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewFloat64(ctx, (float)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, double o)
        {
            return JSApi.JS_NewFloat64(ctx, o);
        }

        public static JSValue js_push_primitive(JSContext ctx, double? o)
        {
            if (o == null)
            {
                return JSApi.JS_NULL;
            }
            return JSApi.JS_NewFloat64(ctx, (double)o);
        }

        public static JSValue js_push_primitive(JSContext ctx, string o)
        {
            //TODO: make the stringcache behaviour configurable?
            var context = ScriptEngine.GetContext(ctx);
            var cache = context.GetStringCache();
            JSValue jsValue;
            if (cache.TryGetValue(o, out jsValue))
            {
                return JSApi.JS_DupValue(ctx, jsValue);
            }

            return ctx.NewString(o);
        }

        public static JSValue js_push_enumvalue<T>(JSContext ctx, T o)
        where T : Enum
        {
            return js_push_primitive(ctx, Convert.ToInt32(o));
        }
    }
}
