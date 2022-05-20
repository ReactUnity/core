#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if REACT_JINT
using System;
using System.Collections.Generic;
using System.Reflection;
using Esprima;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Interop;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class JintEngine : IJavaScriptEngine
    {
        public string Key { get; } = "jint";
        public Engine Engine { get; }
        public object NativeEngine => Engine;
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.None;

        private Action<JsValue> ContinuePromises;

        public JintEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            Engine = new Engine(opt => {
                opt.AllowClr(
                    typeof(object).Assembly,
#if UNITY_EDITOR
                    typeof(UnityEditor.EditorWindow).Assembly,
                    typeof(GUILayout).Assembly,
                    typeof(UnityEngine.UIElements.StyleLength).Assembly,
#endif
                    typeof(Vector3).Assembly,
                    typeof(Component).Assembly,
                    typeof(ReactContext).Assembly
                );
                opt.CatchClrExceptions(ex => {
                    Debug.LogException(ex);
                    return true;
                });

                opt.DebugMode(debug);
                opt.Interop.AllowGetType = true;
                opt.Interop.AllowSystemReflection = true;

                opt.SetTypeConverter(e => new JintTypeConverter(e));
            });

            var deferred = Engine.RegisterPromise();
            ContinuePromises = deferred.GetType().GetMethod("get_Resolve").Invoke(deferred, new object[] { }) as Action<JsValue>;
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.Evaluate(code);
        }

        public void Execute(string code, string fileName = null)
        {
            Engine.Execute(code);
        }

        public Exception TryExecute(string code, string fileName = null)
        {
            try
            {
                Execute(code, fileName);
            }
            catch (ParserException ex)
            {
                Debug.LogError($"Parser exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
                return ex;
            }
            catch (JavaScriptException ex)
            {
                Debug.LogError($"JS exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
                return ex;
            }
            catch (JintException ex)
            {
                Debug.LogException(ex);
                return ex;
            }
            catch (Exception ex)
            {
                Debug.LogException(ex);
                return ex;
            }
            return null;
        }

        public object GetGlobal(string key)
        {
            return Engine.Evaluate(key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ObjectInstance so)
                so.FastAddProperty(key, CreateValue(value), true, false, true);
        }

        public void SetGlobal<T>(string key, T value)
        {
            Engine.SetValue(key, CreateValue(value));
        }

        public void DeleteGlobal(string key)
        {
            Engine.SetValue(key, JsValue.Undefined);
        }

        private JsValue CreateValue(object value)
        {
            if (value is Type t) return TypeReference.CreateTypeReference(Engine, t);
            return JsValue.FromObject(Engine, value);
        }

        public object CreateTypeReference(Type type)
        {
            return TypeReference.CreateTypeReference(Engine, type);
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return new NamespaceReference(Engine, ns);
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
        {
            var obj = new ObjectInstance(Engine);

            foreach (var item in props)
            {
                obj.Set(item.Key, JsValue.FromObject(Engine, item.Value));
            }

            return obj;
        }

        public void Dispose()
        {
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is ObjectInstance jv)
            {
                var keys = jv.GetOwnPropertyKeys(Jint.Runtime.Types.String);
                foreach (var key in keys)
                {
                    yield return new KeyValuePair<string, object>(key.AsString(), jv.Get(key));
                }
            }
            else if (obj is IEnumerable<KeyValuePair<string, object>> eo)
            {
                foreach (var kv in eo) yield return kv;
            }
        }

        public bool IsScriptObject(object obj)
        {
            return obj is ObjectInstance || obj is System.Dynamic.ExpandoObject;
        }

        public void Update()
        {
            ContinuePromises(JsValue.Undefined);
        }
    }

    public class JintEngineFactory : IJavaScriptEngineFactory
    {
        public JavascriptEngineType EngineType => JavascriptEngineType.Jint;

        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize)
        {
            var res = new JintEngine(context, debug, awaitDebugger);
            onInitialize?.Invoke(res);
            return res;
        }
    }
}
#endif
