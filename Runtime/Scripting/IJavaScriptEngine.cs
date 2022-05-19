#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if !REACT_DISABLE_YANTRA && REACT_YANTRA_AVAILABLE
#define REACT_YANTRA
#endif

#if !REACT_DISABLE_JURASSIC && REACT_JURASSIC_AVAILABLE
#define REACT_JURASSIC
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public enum JavascriptEngineType
    {
        Auto = 0,


#if !REACT_JINT_AVAILABLE
        [Obsolete]
#elif REACT_DISABLE_JINT
        [InspectorName("Jint (Disabled)")]
#endif
        Jint = 1,


#if !REACT_CLEARSCRIPT_AVAILABLE
        [Obsolete]
#elif REACT_DISABLE_CLEARSCRIPT
        [InspectorName("ClearScript (Disabled)")]
#else
        [InspectorName("ClearScript")]
#endif
        ClearScript = 2,


#if !REACT_QUICKJS_AVAILABLE
        [Obsolete]
#elif REACT_DISABLE_QUICKJS
        [InspectorName("QuickJS (Disabled)")]
#else
        [InspectorName("QuickJS")]
#endif
        QuickJS = 3,


#if !REACT_YANTRA_AVAILABLE
        [Obsolete]
#elif !REACT_YANTRA
        [InspectorName("Yantra (Disabled)")]
#endif
        Yantra = 4,


#if !REACT_JURASSIC_AVAILABLE
        [Obsolete]
#elif !REACT_JURASSIC
        [InspectorName("Jurassic (Disabled)")]
#endif
        Jurassic = 5,
    }

    public interface IJavaScriptEngine : IDisposable
    {
        string Key { get; }
        object NativeEngine { get; }
        EngineCapabilities Capabilities { get; }

        void Execute(string code, string fileName = null);
        Exception TryExecute(string code, string fileName = null);
        object Evaluate(string code, string fileName = null);

        object GetGlobal(string key);
        void SetGlobal<T>(string key, T value);
        void DeleteGlobal(string key);

        void SetProperty<T>(object obj, string key, T value);
        object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props);
        bool IsScriptObject(object obj);

        object CreateTypeReference(Type type);
        object CreateNamespaceReference(string ns, params Assembly[] assemblies);
        IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj);
    }

    public interface IJavaScriptEngineFactory
    {
        JavascriptEngineType EngineType { get; }
        IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize);
    }
}
