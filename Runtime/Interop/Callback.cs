using JavaScriptEngineSwitcher.Core;
using Jint.Native;
using Jint.Native.Function;
using Microsoft.ClearScript;
using System;
using System.Linq;

namespace ReactUnity.Interop
{
    public class Callback
    {
        private IJsEngine engine;
        public object callback;


        static readonly string cbName = "$callback_interop_dont_touch_cb";
        static readonly string argsName = "$args_interop_dont_touch";

        public Callback(object callback, IJsEngine engine = null)
        {
            this.engine = engine;
            this.callback = callback;
        }

        public object Call()
        {
            return Call(new object[0]);
        }

        public object Call(params object[] args)
        {
            if (args == null) args = new object[0];

            if (callback is JsValue v)
            {
                var c = v.As<FunctionInstance>();
                return c.Invoke(args.Select(x => JsValue.FromObject(c.Engine, x)).ToArray());
            }
            else if (callback is Delegate d)
            {
                var argCount = d.Method.GetParameters().Length;
                if (args.Length < argCount) args = args.Concat(new object[argCount - args.Length]).ToArray();
                if (args.Length > argCount) args = args.Take(argCount).ToArray();

                return d.DynamicInvoke(args);
            }
            else if (callback is ScriptObject s)
            {
                return s.Invoke(false, args);
            }
            else return null;

            //engine.Execute(argsName + "=[]");
            //engine.EmbedHostObject(cbName, this);
            //engine.EmbedHostObject(argsName, args);
            //return engine.Evaluate(cbName + ".callback(..." + argsName + ")");
        }
    }
}
