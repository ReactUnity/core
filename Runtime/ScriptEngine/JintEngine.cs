using Jint;
using Jint.Native;
using Jint.Native.Object;
using Jint.Runtime.Interop;
using System;
using System.Reflection;
using UnityEngine;

namespace ReactUnity.ScriptEngine
{
    public class JintEngine : IJavaScriptEngine
    {
        public Engine Engine { get; }

        public JintEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            Engine = new Engine(x =>
            {
                x.AllowClr(
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
                x.CatchClrExceptions(ex =>
                {
                    Debug.LogException(ex);
                    return true;
                });

                x.DebugMode(debug);
            });

            var deferred = Engine.RegisterPromise();
            var resolve = deferred.GetType().GetMethod("get_Resolve").Invoke(deferred, new object[] { }) as Action<Jint.Native.JsValue>;
            context.Dispatcher.OnEveryUpdate(() => resolve(""));

            Engine.SetValue("ReactUnityPerfBridge", new ReactUnityPerfBridge(Engine));
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.Evaluate(code);
        }

        public void Execute(string code, string fileName = null)
        {
            Engine.Execute(code);
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
    }

    public class JintEngineFactory : IJavaScriptEngineFactory
    {
        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger)
        {
            return new JintEngine(context, debug, awaitDebugger);
        }
    }
}
