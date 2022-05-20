#if !REACT_DISABLE_JURASSIC && REACT_JURASSIC_AVAILABLE
#define REACT_JURASSIC
#endif

#if REACT_JURASSIC
using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;
using Jurassic;
using Jurassic.Library;

namespace ReactUnity.Scripting
{
    public class JurassicEngine : IJavaScriptEngine
    {
        public string Key { get; } = "yantra";
        public ScriptEngine Engine { get; }
        public object NativeEngine => Engine;
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.None;

        public JurassicEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            Engine = new ScriptEngine();
            Engine.EnableExposedClrTypes = true;
            Engine.EnableILAnalysis = true;
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.Evaluate(code);
        }

        public void Execute(string code, string fileName = null)
        {
            Engine.Evaluate(code);
        }

        public Exception TryExecute(string code, string fileName = null)
        {
            try
            {
                Execute(code, fileName);
            }
            catch (Exception ex)
            {
                Debug.LogException(ex);
                return ex;
            }
            return null;
        }

        public object GetValue(string key)
        {
            return Engine.GetGlobalValue(key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ObjectInstance so)
                so.SetPropertyValue(key, CreateValue(value), false);
        }

        public void SetValue<T>(string key, T value)
        {
            Engine.SetGlobalValue(key, CreateValue(value));
        }

        public void ClearValue(string key)
        {
            Engine.SetGlobalValue(key, Undefined.Value);
        }

        private object CreateValue(object value)
        {
            return value;
        }

        public object CreateTypeReference(Type type)
        {
            return type;
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return Undefined.Value;
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
        {
            return props;
        }

        public void Dispose()
        {
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is ObjectInstance jv)
            {
                var keys = jv.Properties;
                var en = keys.GetEnumerator();

                while (en.MoveNext())
                {
                    var prop = en.Current;
                    yield return new KeyValuePair<string, object>(prop.Key.ToString(), prop.Value);
                }
            }
            else if (obj is IEnumerable<KeyValuePair<string, object>> eo)
            {
                foreach (var kv in eo) yield return kv;
            }
        }
        
        public bool IsScriptObject(object obj)
        {
            return obj is ObjectInstance;
        }

        public void Update() { }
    }

    public class JurassicEngineFactory : IJavaScriptEngineFactory
    {
        public JavascriptEngineType EngineType => JavascriptEngineType.Jurassic;

        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger)
        {
            return new JurassicEngine(context, debug, awaitDebugger);
        }
    }
}
#endif
