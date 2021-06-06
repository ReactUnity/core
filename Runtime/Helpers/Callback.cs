using Jint.Native;
using Jint.Native.Function;
using Microsoft.ClearScript;
using System;
using System.Linq;

namespace ReactUnity.Helpers
{
    public class Callback
    {
        public object callback;

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
            else if (callback is ScriptObject so)
            {
                return so.Invoke(false, args);
            }
            else
            {
                return null;
            }
        }
    }
}
