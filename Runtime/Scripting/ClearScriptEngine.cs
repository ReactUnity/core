#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if REACT_CLEARSCRIPT
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.ClearScript;
using Microsoft.ClearScript.JavaScript;
using Microsoft.ClearScript.V8;
using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class ClearScriptEngine : IJavaScriptEngine, IDisposable
    {
        public string Key { get; } = "clearscript";
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.None;

        private const string tempKey = "__$__temp_key__$__";

        public V8Runtime Runtime { get; private set; }
        public V8ScriptEngine Engine { get; private set; }
        public object NativeEngine => Engine;
        private bool ShouldAwait = false;

        private ReactContext Context { get; }

        static string GetPluginFolder()
        {
            if (SystemInfo.processorType.IndexOf("ARM", StringComparison.InvariantCultureIgnoreCase) >= 0)
            {
                if (Environment.Is64BitProcess) return "arm64";
                else return "arm";
            }
            else
            {
                if (Environment.Is64BitProcess) return "x86_64";
                else return "x86";
            }
        }

        public ClearScriptEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            Context = context;

            HostSettings.AuxiliarySearchPath =
                Application.dataPath + ";" +
                Application.dataPath + "/Plugins;" +
                Application.dataPath + $"/Plugins/{GetPluginFolder()}";

            var runtimeFlags = V8RuntimeFlags.EnableDynamicModuleImports |
                (debug ? (V8RuntimeFlags.EnableDebugging | V8RuntimeFlags.EnableRemoteDebugging) : V8RuntimeFlags.None);

            Runtime = new V8Runtime("ReactUnityRuntime", runtimeFlags, 9222);

            Runtime.DocumentSettings.AccessFlags = DocumentAccessFlags.EnableAllLoading;
            Runtime.DocumentSettings.Loader = new DocumentLoader(context);
            Runtime.DocumentSettings.ContextCallback = DocumentContextCallback;

            Engine = Runtime.CreateScriptEngine(
                V8ScriptEngineFlags.MarshalAllInt64AsBigInt |
                V8ScriptEngineFlags.MarshalUnsafeInt64AsBigInt |
                V8ScriptEngineFlags.DisableGlobalMembers |
                V8ScriptEngineFlags.UseCaseInsensitiveMemberBinding |
                V8ScriptEngineFlags.EnableTaskPromiseConversion |
                V8ScriptEngineFlags.EnableValueTaskPromiseConversion |
                V8ScriptEngineFlags.UseSynchronizationContexts |
                V8ScriptEngineFlags.AddPerformanceObject |
                V8ScriptEngineFlags.EnableArrayConversion |

                (debug ? (
                    V8ScriptEngineFlags.EnableDebugging |
                    V8ScriptEngineFlags.None)
                    : V8ScriptEngineFlags.None),
                9222
            );
            Engine.AccessContext = typeof(ClearScriptEngine);
            Engine.DefaultAccess = ScriptAccess.Full;
            Engine.UndefinedImportValue = null;
            Engine.VoidResultValue = Undefined.Value;

            Engine.DisableExtensionMethods = false;
            Engine.DisableListIndexTypeRestriction = true;
            Engine.AllowReflection = true;
            Engine.EnableAutoHostVariables = true;
            Engine.DisableTypeRestriction = true;
            Engine.ExposeHostObjectStaticMembers = true;
            Engine.UseReflectionBindFallback = true;
            Engine.EnableNullResultWrapping = false;
            Engine.DocumentSettings = Runtime.DocumentSettings;

            ShouldAwait = debug && awaitDebugger;

            SetGlobal("host", new ExtendedHostFunctions());
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.Evaluate(AddFilenameExtension(fileName), fileName == null, code);
        }

        public void Execute(string code, string fileName = null, JavascriptDocumentType documentType = JavascriptDocumentType.Script)
        {
            var isMainFile = fileName == "ReactUnity/main";

            var remoteUrl = !isMainFile ? null : Context.Source.GetRemoteUrl();

            var category = documentType == JavascriptDocumentType.Module ? ModuleCategory.Standard : null;

            var flags =
                (fileName == null ? DocumentFlags.IsTransient : DocumentFlags.None) |
                (isMainFile && ShouldAwait ? DocumentFlags.AwaitDebuggerAndPause : DocumentFlags.None);

            var hasUri = Uri.TryCreate(fileName, UriKind.RelativeOrAbsolute, out var url);

            var document = remoteUrl != null || hasUri ?
                new DocumentInfo(remoteUrl ?? url) { Category = category, Flags = flags, ContextCallback = DocumentContextCallback } :
                new DocumentInfo(fileName) { Category = category, Flags = flags, ContextCallback = DocumentContextCallback };

            if (ShouldAwait && isMainFile)
            {
                bool connected = false;
                var message = "Debugger connection timed out after 10 seconds. You can uncheck AwaitDebugger if you are not planning to connect a debugger.";

                var timer = new System.Threading.Timer(_ => {
                    if (!connected)
                    {
                        Engine.CancelAwaitDebugger();
                        Debug.LogWarning(message);
                    }
                }, null, 10000, System.Threading.Timeout.Infinite);

                using (timer)
                {
                    try
                    {
                        Engine.Execute(document, code);
                        connected = true;
                    }
                    catch (ScriptInterruptedException)
                    {
                        if (!connected) Debug.LogWarning(message);
                    }
                }
            }
            else
            {
                Engine.Execute(document, code);
            }
        }

        private string AddFilenameExtension(string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName)) return fileName;

            if (!fileName.FastEndsWith(".js")) return fileName + ".js";
            return fileName;
        }

        public Exception TryExecute(string code, string fileName = null, JavascriptDocumentType documentType = JavascriptDocumentType.Script)
        {
            try
            {
                Execute(code, fileName, documentType);
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
            return Engine.Global.GetProperty(key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ScriptObject so)
            {
                SetGlobal("___val___", value);
                so.SetProperty(key, GetGlobal("___val___"));
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

        public void SetGlobal<T>(string key, T value)
        {
            if (value is Type t) Engine.AddHostType(key, t);
            else if (value is Delegate d)
            {
                Engine.AddHostObject("___host___", d);
                Engine.Execute(key + @" = ___host___.toFunction(); delete ___host___;");
            }
            else Engine.AddHostObject(key, value);
        }

        public void DeleteGlobal(string key)
        {
            Engine.Execute("delete " + key);
        }

        public object CreateTypeReference(Type type)
        {
            Engine.AddHostType(tempKey, type);
            var res = Engine.Global.GetProperty(tempKey);
            Engine.Global.DeleteProperty(tempKey);
            return res;
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return new ScriptNamespaceReference(this, ns, assemblies);
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
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
            Engine?.Interrupt();
            Engine?.CollectGarbage(true);
            Engine?.Dispose();
            Engine = null;
            Runtime?.Dispose();
            Runtime = null;
        }

        public IEnumerable<object> TraverseScriptArray(object obj)
        {
            if (obj is IEnumerable eo)
            {
                foreach (var kv in eo) yield return kv;
            }
            else if (obj is ScriptObject jv)
            {
                var length = jv.GetProperty("length");

                if (length is double len)
                {
                    for (int i = 0; i < len; i++)
                    {
                        yield return jv.GetProperty(i + "");
                    }
                }
            }
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is ScriptObject jv)
            {
                var keys = jv.PropertyNames;
                foreach (var key in keys)
                {
                    yield return new KeyValuePair<string, object>(key, jv.GetProperty(key));
                }
            }
            else if (obj is IEnumerable<KeyValuePair<string, object>> eo)
            {
                foreach (var kv in eo) yield return kv;
            }
        }

        public bool IsScriptObject(object obj)
        {
            return obj is ScriptObject;
        }

        public void Update() { }

        public static IDictionary<string, object> DocumentContextCallback(DocumentInfo info)
        {
            return new Dictionary<string, object>{
                { "url", info.Uri.ToString() }
            };
        }

        public class DocumentLoader : DefaultDocumentLoader
        {
            ReactContext Context { get; set; }

            public DocumentLoader(ReactContext ctx)
            {
                Context = ctx;
            }

            public override Task<Document> LoadDocumentAsync(DocumentSettings settings, DocumentInfo? sourceInfo, string specifier, DocumentCategory category, DocumentContextCallback contextCallback)
            {
                if (!specifier.StartsWith("http"))
                {
                    specifier = Context.ResolvePath(specifier);
                    if (sourceInfo.HasValue) sourceInfo = new DocumentInfo(new Uri(specifier))
                    {
                        Category = category,
                        ContextCallback = (di) => DocumentContextCallback((DocumentInfo) sourceInfo),
                    };
                }
                return base.LoadDocumentAsync(settings, sourceInfo, specifier, category, contextCallback);
            }
        }

    }

    public class ClearScriptEngineFactory : IJavaScriptEngineFactory
    {
        public JavascriptEngineType EngineType => JavascriptEngineType.ClearScript;

        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize)
        {
            var res = new ClearScriptEngine(context, debug, awaitDebugger);
            onInitialize?.Invoke(res);
            return res;
        }
    }
}
#endif
