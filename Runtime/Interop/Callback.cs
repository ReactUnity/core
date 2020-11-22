using JavaScriptEngineSwitcher.Core;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using UnityEngine;

namespace ReactUnity.Interop
{
    public class Callback : DynamicObject
    {
        private IJsEngine engine;
        private dynamic callback;

        public Callback(IJsEngine engine, dynamic callback)
        {
            this.engine = engine;
            this.callback = callback;
        }

        public dynamic Call(params object[] args)
        {
            //var cbName = "$callback_interop_dont_touch_cb";
            //var argsName = "$callback_interop_dont_touch_args";
            //engine.EmbedHostObject(cbName, callback);
            return callback(args);
            //engine.EmbedHostObject(argsName, args);
            //return engine.Evaluate(cbName + "(..." + argsName + ")");
        }


        public override bool TryInvoke(InvokeBinder binder, object[] args, out object result)
        {
            result = Call(args);
            return true;
        }
    }
}
