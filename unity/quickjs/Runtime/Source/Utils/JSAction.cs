using QuickJS.Native;

namespace QuickJS.Utils
{
    public delegate void JSActionCallback(ScriptRuntime runtime, object cbArgs, JSValue cbValue);

    public struct JSAction
    {
        public JSActionCallback callback;
        public JSValue value;
        public object args; 
        public bool isDelayedUntilActive;
    }
}