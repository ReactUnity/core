using System;
using System.Collections.Generic;
using System.Reflection;
using Esprima;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Interop;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.ScriptEngine
{
    public class JintEngine : IJavaScriptEngine
    {
        public string Key { get; } = "jint";
        public Engine Engine { get; }

        public JintEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            Engine = new Engine(opt => {
                opt.AllowClr(
                    typeof(Convert).Assembly,
#if UNITY_EDITOR
                    typeof(UnityEditor.EditorWindow).Assembly,
                    typeof(GUILayout).Assembly,
                    typeof(UnityEngine.UIElements.StyleLength).Assembly,
#endif
                    typeof(Vector3).Assembly,
                    typeof(Component).Assembly,
                    typeof(ReactUnityRunner).Assembly
                );
                opt.CatchClrExceptions(ex => {
                    Debug.LogException(ex);
                    return true;
                });

                opt.DebugMode(debug);

                opt.SetTypeConverter(e => new Callback.JintCallbackConverter(e));
            });

            var deferred = Engine.RegisterPromise();
            var resolve = deferred.GetType().GetMethod("get_Resolve").Invoke(deferred, new object[] { }) as Action<JsValue>;
            context?.Dispatcher.OnEveryUpdate(() => resolve(JsValue.Undefined));
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

        public object GetValue(string key)
        {
            return Engine.Evaluate(key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ObjectInstance so)
                so.FastAddProperty(key, CreateValue(value), true, false, true);
        }

        public void SetValue<T>(string key, T value)
        {
            Engine.SetValue(key, CreateValue(value));
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

        public object CreateNativeObject(Dictionary<string, object> props)
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
    }

    public class JintEngineFactory : IJavaScriptEngineFactory
    {
        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger)
        {
            return new JintEngine(context, debug, awaitDebugger);
        }
    }
}
