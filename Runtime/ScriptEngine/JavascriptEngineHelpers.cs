#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT
#define REACT_JINT
#endif

namespace ReactUnity.ScriptEngine
{
    internal class JavascriptEngineHelpers
    {
        public static IJavaScriptEngineFactory GetEngineFactory(JavascriptEngineType type)
        {
            switch (type)
            {
#if REACT_JINT
                case JavascriptEngineType.Jint:
                    return new JintEngineFactory();
#endif
#if REACT_CLEARSCRIPT
                case JavascriptEngineType.Auto:
                case JavascriptEngineType.ClearScript:
                    return new ClearScriptEngineFactory();
#endif
                default:
#if REACT_JINT
                    return new JintEngineFactory();
#elif REACT_CLEARSCRIPT
                    return new ClearScriptEngineFactory();
#else
                    throw new System.Exception("Could not find a valid scripting engine.");
#endif
            }
        }
    }
}
