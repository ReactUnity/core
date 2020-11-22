using JavaScriptEngineSwitcher.Core;

namespace ReactUnity.Interop
{
    public class Callback
    {
        private IJsEngine engine;
        public object callback;

        public Callback(IJsEngine engine, object callback)
        {
            this.engine = engine;
            this.callback = callback;
        }

        public object Call()
        {
            var cbName = "$callback_interop_dont_touch_cb";
            engine.EmbedHostObject(cbName, this);
            return engine.Evaluate(cbName + ".callback()");
        }

        public object Call(params object[] args)
        {
            var cbName = "$callback_interop_dont_touch_cb";
            var argsName = "$args_interop_dont_touch";
            engine.EmbedHostObject(cbName, this);
            engine.EmbedHostObject(argsName, args ?? new object[0]);
            return engine.Evaluate(cbName + ".callback(..." + argsName + ")");
        }
    }
}
