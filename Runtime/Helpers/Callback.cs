#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT
#define REACT_JINT
#endif

#if !REACT_DISABLE_QUICKJS
#define REACT_QUICKJS
#endif

using System;
using System.Linq;

#if REACT_JINT
using Jint;
using Jint.Native;
using Jint.Native.Object;
#endif

namespace ReactUnity.Helpers
{
    public class Callback
    {
        public object callback;
        private ReactContext context;
#if REACT_JINT
        public Engine Engine;
#endif

        public static Callback Noop = new Callback(null, null);

        public static Callback From(object value, ReactContext context = null, object thisVal = null)
        {
            if (value == null) return Noop;
            if (value is string s)
            {
                return context.Script.CreateEventCallback(s, thisVal);
            }
            if (value is Callback cb) return cb;
            if (value is int cbi) return new Callback(cbi, context);
#if REACT_JINT
            if (value is Func<JsValue, JsValue[], JsValue> jv) return new Callback(jv, context.Script.Engine.NativeEngine as Engine);
            if (value is ObjectInstance v) return new Callback(v);
#endif
            return new Callback(value, context);
        }

#if REACT_JINT
        public Callback(Func<JsValue, JsValue[], JsValue> callback, Engine engine)
        {
            this.callback = callback;
            this.Engine = engine;
        }

        public Callback(ObjectInstance callback)
        {
            this.callback = callback;
            this.Engine = callback.Engine;
        }
#endif

        public Callback(object callback, ReactContext context = null)
        {
            this.callback = callback;
            this.context = context;
        }

        public Callback(int index, ReactContext context)
        {
            this.context = context;
            this.callback = index;
        }

        public object Call()
        {
            return Call(new object[0]);
        }

        public object Call(params object[] args)
        {
            if (callback == null) return null;
            if (args == null) args = new object[0];

            if (callback is Callback c)
            {
                return c.Call(args);
            }
#if REACT_JINT
            else if (callback is ObjectInstance v)
            {
                if (v.IsNull() || v.IsUndefined()) return null;
                return Engine.Invoke(v, args);
            }
            else if (callback is Func<JsValue, JsValue[], JsValue> cb)
            {
                return cb.Invoke(JsValue.Null, args.Select(x => JsValue.FromObject(Engine, x)).ToArray());
            }
#endif
            else if (callback is Delegate d)
            {
                var parameters = d.Method.GetParameters();
                var argCount = parameters.Length;

                if (args.Length < argCount) args = args.Concat(new object[argCount - args.Length]).ToArray();
                if (args.Length > argCount) args = args.Take(argCount).ToArray();
                return d.DynamicInvoke(args);
            }
            else if (callback is int i)
            {
                return context.FireEventByRefCallback.Call(i, args);
            }
#if REACT_CLEARSCRIPT
            else if (callback is Microsoft.ClearScript.ScriptObject so)
            {
                return so.Invoke(false, args);
            }
#endif
#if REACT_QUICKJS
            else if (callback is QuickJS.Native.JSValue qf)
            {
                var eg = (context?.Script.Engine as Scripting.QuickJSEngine);
                if (eg == null) return null;
                return new QuickJS.ScriptFunction(eg.MainContext, qf, eg.Global).Invoke<object>(args);
            }
#endif
            else
            {
                return null;
            }
        }

        public object CallWithPriority(EventPriority priority, params object[] args)
        {
            ReactUnityBridge.Instance.SetCurrentEventPriority(priority);
            var res = Call(args);
            ReactUnityBridge.Instance.SetCurrentEventPriority(EventPriority.Unknown);
            return res;
        }
    }
}
