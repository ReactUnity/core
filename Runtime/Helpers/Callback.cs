#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

using System;
using System.Linq;

#if REACT_JINT
using System.Globalization;
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
        public bool Destroyed { get; private set; } = false;

        public static Callback Noop = new Callback((object) null, null);

        public static Callback From(object value, ReactContext context = null, object thisVal = null, bool allowIndexedCallbacks = false)
        {
            if (value == null) return Noop;
            if (value is string s)
            {
                return context.Script.CreateEventCallback(s, thisVal);
            }
            if (value is Callback cb) return cb;
            if (value is int cbi)
            {
                if (allowIndexedCallbacks) return new Callback(cbi, context);
                return Noop;
            }
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
                var res = v.Engine.Invoke(v, args);
                var converted = v.Engine.TypeConverter.Convert(res, typeof(object), CultureInfo.InvariantCulture);
                v.Engine.Advanced.ProcessTasks();
                return converted;
            }
            else if (callback is Func<JsValue, JsValue[], JsValue> cb)
            {
                var jintEngine = (context.Script.Engine as Scripting.JintEngine).Engine;
                var clrf = new Jint.Runtime.Interop.ClrFunction(jintEngine, "callbackFunc", cb);
                var res = jintEngine.Invoke(clrf, args);
                var converted = jintEngine.TypeConverter.Convert(res, typeof(object), CultureInfo.InvariantCulture);
                jintEngine.Advanced.ProcessTasks();
                return converted;
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
                var res = context.FireEventByRefCallback?.Call(i, args);
#if REACT_QUICKJS
                (context.Script.Engine as Scripting.QuickJSEngine)?.Runtime.ExecutePendingJob();
#endif
                return res;
            }
#if REACT_CLEARSCRIPT
            else if (callback is Microsoft.ClearScript.ScriptObject so)
            {
                // TODO: because of an error in ClearScipt, arrays cannot be iterated (Mono bug?)
                so.Engine.Global.SetProperty("__temp__", so);
                so.Engine.Global.SetProperty("__args__", args?.ToList());
                var res = so.Engine.Evaluate(null, true, "var res = __temp__(...(__args__ || [])); delete __temp__; delete __args__; res;");
                return res;
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
                var sff = new QuickJS.ScriptFunction(QuickJS.ScriptEngine.GetContext(sv.ctx), sv);
                var res = sff.Invoke<object>(args);
                sff.Dispose();
                QuickJS.ScriptEngine.GetRuntime(sv.ctx).ExecutePendingJob();
                return res;
            }
            else if (callback is QuickJS.Native.JSValue qf)
            {
                var eg = (context?.Script.Engine as Scripting.QuickJSEngine);
                if (eg == null) return null;
                var sff = new QuickJS.ScriptFunction(eg.MainContext, qf);
                var res = sff.Invoke<object>(args);
                sff.Dispose();
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
            Destroyed = true;
            callback = null;
            context = null;
        }
    }
}
