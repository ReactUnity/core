#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
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
    public class Callback : IDisposable
    {
        public object callback;
        private ReactContext context;

        public static Callback Noop = new Callback((object) null, null);

        public static Callback From(object value, ReactContext context = null, object thisVal = null)
        {
            if (value == null) return Noop;
            if (value is string s)
            {
                return context.Script.CreateEventCallback(s, thisVal);
            }
            if (value is Callback cb) return cb;
            if (value is int cbi) return new Callback(cbi, context);
            return new Callback(value, context);
        }

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
                return v.Engine.Invoke(v, args);
            }
            else if (callback is Func<JsValue, JsValue[], JsValue> cb)
            {
                var jintEngine = (context.Script.Engine as Scripting.JintEngine).Engine;
                return cb.Invoke(JsValue.Null, args.Select(x => JsValue.FromObject(jintEngine, x)).ToArray());
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
                var res = context.FireEventByRefCallback.Call(i, args);
#if REACT_QUICKJS
                (context.Script.Engine as Scripting.QuickJSEngine)?.Runtime.ExecutePendingJob();
#endif
                return res;
            }
#if REACT_CLEARSCRIPT
            else if (callback is Microsoft.ClearScript.ScriptObject so)
            {
                return so.Invoke(false, args);
            }
#endif
#if REACT_QUICKJS
            else if (callback is QuickJS.ScriptFunction sf)
            {
                var res = sf.Invoke<object>(args);
                QuickJS.ScriptEngine.GetRuntime(sf.ctx).ExecutePendingJob();
                return res;
            }
            else if (callback is QuickJS.ScriptValue sv)
            {
                var res = new QuickJS.ScriptFunction(QuickJS.ScriptEngine.GetContext(sv.ctx), sv).Invoke<object>(args);
                QuickJS.ScriptEngine.GetRuntime(sv.ctx).ExecutePendingJob();
                return res;
            }
            else if (callback is QuickJS.Native.JSValue qf)
            {
                var eg = (context?.Script.Engine as Scripting.QuickJSEngine);
                if (eg == null) return null;
                var res = new QuickJS.ScriptFunction(eg.MainContext, qf).Invoke<object>(args);
                eg?.Runtime.ExecutePendingJob();
                return res;
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

        public void Dispose()
        {
            callback = null;
            context = null;
        }
    }
}
