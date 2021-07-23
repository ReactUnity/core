#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

#if REACT_CLEARSCRIPT
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Microsoft.ClearScript;
using Microsoft.ClearScript.V8;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.ScriptEngine
{
    public class ClearScriptEngine : IJavaScriptEngine
    {
        public string Key { get; } = "clearscript";

        private const string tempKey = "__$__temp_key__$__";

        public V8ScriptEngine Engine { get; }

        public ClearScriptEngine(ReactContext context, bool debug, bool awaitDebugger)
        {

            var location = typeof(ClearScriptEngine).Assembly.Location;
            HostSettings.AuxiliarySearchPath = Path.GetFullPath(Path.Combine(location, "../../../../../../lib/arm/"));

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
            return new HostTypeCollection(assemblies).GetNamespaceNode(ns);
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
