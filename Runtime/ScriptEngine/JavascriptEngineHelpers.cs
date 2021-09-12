#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

namespace ReactUnity.ScriptEngine
{
    internal class JavascriptEngineHelpers
    {
        public static IJavaScriptEngineFactory GetEngineFactory(JavascriptEngineType type)
        {
            switch (type)
            {
                case JavascriptEngineType.Jint:
                    return new JintEngineFactory();
#if REACT_CLEARSCRIPT
                case JavascriptEngineType.Auto:
                case JavascriptEngineType.ClearScript:
                    return new ClearScriptEngineFactory();
#endif
                default:
                    return new JintEngineFactory();
            }
        }
    }
}
