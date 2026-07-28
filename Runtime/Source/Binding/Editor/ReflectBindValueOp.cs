using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Text.RegularExpressions;

namespace QuickJS.Binding
{
    using QuickJS.Native;

    public delegate JSValue ReflectBindValuePusher<T>(JSContext ctx, T o);
    public delegate bool ReflectBindValueGetter<T>(JSContext ctx, JSValue val, out T o);

    public static class ReflectBindValueConvert<T>
    {
        public static ReflectBindValuePusher<T> push;
        public static ReflectBindValueGetter<T> get;
    }

    public class ReflectBindValueOp
    {
        private static HashSet<Type> _registeredTypes = new HashSet<Type>();

        public static void Register<T>(ReflectBindValuePusher<T> push, ReflectBindValueGetter<T> get)
        {
            if (_registeredTypes.Add(typeof(T)))
            {
                ReflectBindValueConvert<T>.push = push;
                ReflectBindValueConvert<T>.get = get;
            }
        }

        public static bool js_get_tvar<T>(JSContext ctx, JSValue val, out T o)
        {
            if (_registeredTypes.Contains(typeof(T)))
            {
                return ReflectBindValueConvert<T>.get(ctx, val, out o);
            }

            object ft = null;
            if (Binding.Values.js_get_var(ctx, val, typeof(T), out ft))
            {
                if (ft == null)
                {
                    o = default(T);
                    return true;
                }

                if (typeof(T).IsInstanceOfType(ft))
                {
                    o = (T)ft;
                    return true;
                }
            }
            o = default(T);
            return false;
        }

        public static JSValue js_push_tvar<T>(JSContext ctx, T o)
        {
            if (_registeredTypes.Contains(typeof(T)))
            {
                return ReflectBindValueConvert<T>.push(ctx, o);
            }

            return Binding.Values.js_push_var(ctx, o);
        }
    }
}