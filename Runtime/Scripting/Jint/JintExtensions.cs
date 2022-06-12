#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if REACT_JINT
using System.Reflection;
using Jint;

namespace ReactUnity.Scripting
{
    public static class JintExtensions
    {
        static MethodInfo RunAvailableContinuationsMethod;

        static JintExtensions()
        {
            RunAvailableContinuationsMethod = typeof(Engine).GetMethod("RunAvailableContinuations", BindingFlags.Instance | BindingFlags.NonPublic);
        }

        public static void RunContinuations(this Engine engine)
        {
            RunAvailableContinuationsMethod.Invoke(engine, null);
        }
    }
}
#endif
