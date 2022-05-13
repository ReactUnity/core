#if !REACT_DISABLE_YANTRA && REACT_YANTRA_AVAILABLE
#define REACT_YANTRA
#endif

#if REACT_YANTRA
using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;
using YantraJS.Core;
using YantraJS.Core.Clr;
using System.Linq;

namespace ReactUnity.Scripting
{
    public class YantraEngine : IJavaScriptEngine
    {
        public string Key { get; } = "yantra";
        public JSContext Engine { get; }
        public object NativeEngine => Engine;

        public YantraEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            Engine = new JSContext(new System.Threading.SynchronizationContext());
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.Eval(code, fileName);
        }

        public void Execute(string code, string fileName = null)
        {
            Engine.Eval(code, fileName);
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
            return Engine.FastEval(key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is JSObject so)
                so[key] = CreateValue(value);
        }

        public void SetValue<T>(string key, T value)
        {
            Engine.DefineProperty(key, new JSProperty(key, CreateValue(value), JSPropertyAttributes.ConfigurableValue));
        }

        public void ClearValue(string key)
        {
            Engine.Delete(key);
        }

        private JSValue CreateValue(object value)
        {
            return ClrProxy.Marshal(value);
        }

        public object CreateTypeReference(Type type)
        {
            return ClrType.From(type);
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return JSNull.Value;
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
        {
            return new JSObject(props.Select(x => new JSProperty(x.Key, CreateValue(x.Value), JSPropertyAttributes.ReadonlyValue)));
        }

        public void Dispose()
        {
            Engine.Dispose();
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is JSObject jv)
            {
                var keys = jv.GetOwnProperties();
                var en = keys.GetEnumerator();

                while (en.MoveNext(out var prop))
                {
                    prop.value.ConvertTo(typeof(object), out var value);
                    yield return new KeyValuePair<string, object>(prop.key.ToString(), value);
                }
            }
            else if (obj is IEnumerable<KeyValuePair<string, object>> eo)
            {
                foreach (var kv in eo) yield return kv;
            }
        }
        
        public bool IsScriptObject(object obj)
        {
            return obj is JSObject;
        }
    }

    public class YantraEngineFactory : IJavaScriptEngineFactory
    {
        public JavascriptEngineType EngineType => JavascriptEngineType.Yantra;

        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger)
        {
            return new YantraEngine(context, debug, awaitDebugger);
        }
    }
}
#endif
