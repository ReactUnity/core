#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

using Jint;
using Jint.Native;
using Jint.Native.Function;
using Jint.Runtime.Interop;
using System;
using System.Linq;

namespace ReactUnity.Helpers
{
    public class Callback
    {
        public object callback;
        public Engine Engine;

        public Callback(Func<JsValue, JsValue[], JsValue> callback, Engine engine)
        {
            this.callback = callback;
            this.Engine = engine;
        }

        public Callback(FunctionInstance callback)
        {
            this.callback = callback;
        }

        public Callback(object callback)
        {
            this.callback = callback;
        }

        public object Call()
        {
            return Call(new object[0]);
        }

        public object Call(params object[] args)
        {
            if (callback == null) return null;
            if (args == null) args = new object[0];

            if (callback is JsValue v)
            {
                var c = v.As<FunctionInstance>();
                return c.Invoke(args.Select(x => JsValue.FromObject(c.Engine, x)).ToArray());
            }
            else if (callback is Func<JsValue, JsValue[], JsValue> cb)
            {
                return cb.Invoke(JsValue.Null, args.Select(x => JsValue.FromObject(Engine, x)).ToArray());
            }
            else if (callback is Delegate d)
            {
                var parameters = d.Method.GetParameters();
                var argCount = parameters.Length;

                if (args.Length < argCount) args = args.Concat(new object[argCount - args.Length]).ToArray();
                if (args.Length > argCount) args = args.Take(argCount).ToArray();
                return d.DynamicInvoke(args);
            }
            else if (callback is Callback c)
            {
                return c.Call(args);
            }
#if REACT_CLEARSCRIPT
            else if (callback is Microsoft.ClearScript.ScriptObject so)
            {
                return so.Invoke(false, args);
            }
#endif
            else
            {
                return null;
            }
        }

        public class JintCallbackConverter : DefaultTypeConverter
        {
            private Engine Engine;

            public JintCallbackConverter(Engine engine) : base(engine)
            {
                Engine = engine;
            }

            public override object Convert(object value, Type type, IFormatProvider formatProvider)
            {
                if (type == typeof(Callback) || type == typeof(object))
                {
                    if (value is Func<JsValue, JsValue[], JsValue> cb)
                    {
                        return new Callback(cb, Engine);
                    }

                    if (value is FunctionInstance fi)
                    {
                        return new Callback(fi);
                    }
                }

                return base.Convert(value, type, formatProvider);
            }
        }
    }
}
