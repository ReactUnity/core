using System;
using System.Reflection;

namespace ReactUnity.ScriptEngine
{
    public enum JavascriptEngineType
    {
        Auto = 0,
        Jint = 1,
        ClearScript = 2,
    }

    public interface IJavaScriptEngine
    {
        void Execute(string code, string fileName = null);
        object Evaluate(string code, string fileName = null);
        void SetValue<T>(string key, T value);
        object GetValue(string key);
        void SetProperty<T>(object obj, string key, T value);

        object CreateTypeReference(Type type);
        object CreateNamespaceReference(string ns, params Assembly[] assemblies);
    }

    public interface IJavaScriptEngineFactory
    {
        IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger);
    }
}
