#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT
#define REACT_JINT
#endif

#if !REACT_DISABLE_YANTRA
#define REACT_YANTRA
#endif

#if !REACT_DISABLE_JURASSIC
#define REACT_JURASSIC
#endif

using System;
using System.Collections.Generic;
using System.Reflection;

namespace ReactUnity.Scripting
{
    public enum JavascriptEngineType
    {
        Auto = 0,

#if !REACT_JINT
        [UnityEngine.InspectorName("Jint (Disabled)")]
#endif
        Jint = 1,

#if !REACT_CLEARSCRIPT
        [UnityEngine.InspectorName("ClearScript (Disabled)")]
#endif
        ClearScript = 2,

#if REACT_YANTRA
#if !REACT_YANTRA
        [UnityEngine.InspectorName("Yantra (Disabled)")]
#endif
        Yantra = 3,
#endif

#if REACT_JURASSIC
#if !REACT_JURASSIC
        [UnityEngine.InspectorName("Jurassic (Disabled)")]
#endif
        Jurassic = 4,
#endif
    }

    public interface IJavaScriptEngine : IDisposable
    {
        string Key { get; }
        object NativeEngine { get; }
        void Execute(string code, string fileName = null);
        Exception TryExecute(string code, string fileName = null);
        object Evaluate(string code, string fileName = null);
        void SetValue<T>(string key, T value);
        void ClearValue(string key);
        object GetValue(string key);
        object CreateNativeObject(Dictionary<string, object> props);
        void SetProperty<T>(object obj, string key, T value);

        object CreateTypeReference(Type type);
        object CreateNamespaceReference(string ns, params Assembly[] assemblies);
        IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj);
    }

    public interface IJavaScriptEngineFactory
    {
        JavascriptEngineType EngineType { get; }
        IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger);
    }
}
