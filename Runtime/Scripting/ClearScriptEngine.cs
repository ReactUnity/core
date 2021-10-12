#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

#if REACT_CLEARSCRIPT
using System;
using System.Collections.Generic;
using System.Reflection;
using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class ClearScriptEngine : IJavaScriptEngine, IDisposable
    {
        public string Key { get; } = "clearscript";

        private const string tempKey = "__$__temp_key__$__";

        public V8ScriptEngine Engine { get; }

        public ClearScriptEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            HostSettings.IsAndroid = true;
#endif

            Engine = new V8ScriptEngine(
                V8ScriptEngineFlags.MarshalAllLongAsBigInt |
                V8ScriptEngineFlags.MarshalUnsafeLongAsBigInt |
                V8ScriptEngineFlags.DisableGlobalMembers |

                (debug ? (
                    V8ScriptEngineFlags.EnableDebugging |
#if REACT_UNITY_DEVELOPER
                    (awaitDebugger ? V8ScriptEngineFlags.AwaitDebuggerAndPauseOnStart : V8ScriptEngineFlags.None) |
#endif
                    V8ScriptEngineFlags.None)
                    : V8ScriptEngineFlags.None),
                9222
            );
            Engine.AccessContext = typeof(ClearScriptEngine);
            Engine.DefaultAccess = ScriptAccess.Full;
            Engine.UndefinedImportValue = null;

            Engine.DisableExtensionMethods = false;
            Engine.DisableListIndexTypeRestriction = true;
            Engine.AllowReflection = true;
            Engine.EnableAutoHostVariables = true;
            Engine.DisableTypeRestriction = true;
            Engine.ExposeHostObjectStaticMembers = true;
            Engine.UseReflectionBindFallback = true;
            Engine.EnableAutoHostVariables = true;
            Engine.EnableNullResultWrapping = false;

            SetValue("host", new ExtendedHostFunctions());
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.Evaluate(fileName, fileName == null, code);
        }

        public void Execute(string code, string fileName = null)
        {
            Engine.Execute(fileName, fileName == null, code);
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
            return Engine.Evaluate(null, true, key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ScriptObject so)
            {
                SetValue("___val___", value);
                so.SetProperty(key, GetValue("___val___"));
                Engine.Execute(null, true, "delete ___val___");
            }
            else
            {
                Engine.AddHostObject("___host___", obj);
                Engine.AddHostObject("___val___", value);
                Engine.Execute(null, true,
                    $"___host___['{key}'] = ___val___; delete ___host___; delete ___val___;");
            }
        }

        public void SetValue<T>(string key, T value)
        {
            if (value is Type t) Engine.AddHostType(key, t);
            else Engine.AddHostObject(key, value);
        }

        public object CreateTypeReference(Type type)
        {
            Engine.AddHostType(tempKey, type);
            var res = Engine.Evaluate(tempKey);
            Engine.Execute("delete " + tempKey);
            return res;
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            if (assemblies.Length > 0) return new HostTypeCollection(assemblies).GetNamespaceNode(ns);
            else return new HostTypeCollection().GetNamespaceNode(ns);
        }

        public object CreateNativeObject(Dictionary<string, object> props)
        {
            var obj = new PropertyBag();

            foreach (var item in props)
            {
                obj.SetPropertyNoCheck(item.Key, item.Value);
            }

            return obj;
        }

        public void Dispose()
        {
            Engine.Dispose();
        }
    }

    public class ClearScriptEngineFactory : IJavaScriptEngineFactory
    {
        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger)
        {
            return new ClearScriptEngine(context, debug, awaitDebugger);
        }
    }
}
#endif