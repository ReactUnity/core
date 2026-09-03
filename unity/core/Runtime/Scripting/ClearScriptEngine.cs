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
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.ModuleResolution;

        private const string tempKey = "__$__temp_key__$__";

        public V8Runtime Runtime { get; private set; }
        public V8ScriptEngine Engine { get; private set; }
        public object NativeEngine => Engine;
        private bool ShouldAwait = false;
        private DocumentLoader documentLoader;

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
            Runtime.DocumentSettings.Loader = documentLoader = new DocumentLoader(context);
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

            // An absolute url, always: DocumentInfo turns a relative one into a path under the current
            // directory, which for a bundle out of Resources is a file that does not exist - and every
            // import below it then resolves against that phantom. ModuleUrl gives it a real origin.
            var url = remoteUrl ?? ModuleUrl.Base(fileName);

            var document = url != null ?
                new DocumentInfo(url) { Category = category, Flags = flags, ContextCallback = DocumentContextCallback } :
                new DocumentInfo(fileName) { Category = category, Flags = flags, ContextCallback = DocumentContextCallback };

            // A module executed here was never loaded, so the loader is told about it: a chunk that
            // imports the entry back for the runtime the two share then gets this same document,
            // rather than reading the bundle again and evaluating a second copy of it.
            if (category != null && url != null) documentLoader.CacheDocument(new StringDocument(document, code), true);

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
                    var url = ResolveUrl(sourceInfo, specifier);

                    if (url != null)
                    {
                        specifier = url.AbsoluteUri;

                        // The document being loaded stands in for the one that imported it, so its
                        // own relative imports resolve against its url and not the referrer's.
                        sourceInfo = new DocumentInfo(url)
                        {
                            Category = category,
                            ContextCallback = (di) => DocumentContextCallback(di),
                        };

                        // ClearScript's own loader reads a file or a url and knows neither of
                        // these, so a module out of Resources is read here and handed over as
                        // text. Synchronous, which is what the rest of this loader already is.
                        if (ModuleUrl.IsResource(url))
                        {
                            // Through the cache, and not to save the read: one url has to give back
                            // one document. A chunk importing its own importer back is otherwise
                            // read afresh on every hop, and the two descend until the stack goes.
                            var cached = GetCachedDocument(url);
                            if (cached != null) return Task.FromResult(cached);

                            var source = ModuleUrl.ReadResource(url);
                            if (source == null) throw new System.IO.FileNotFoundException($"Failed to load module '{url.AbsoluteUri}': no such resource");
                            return Task.FromResult(CacheDocument(new StringDocument(sourceInfo.Value, source), false));
                        }
                    }
                }
                return base.LoadDocumentAsync(settings, sourceInfo, specifier, category, contextCallback);
            }

            /// Relative to the importing module first, the way the QuickJS and Jint loaders resolve.
            /// The entry source only stands in when the referrer has no url of its own, which is the
            /// root of a module added from source.
            Uri ResolveUrl(DocumentInfo? sourceInfo, string specifier)
            {
                var referrer = sourceInfo?.Uri ?? ModuleUrl.Base(sourceInfo?.Name);
                if (referrer != null && referrer.IsAbsoluteUri && Uri.TryCreate(referrer, specifier, out var resolved)) return resolved;

                try
                {
                    return Uri.TryCreate(Context.ResolvePath(specifier), UriKind.Absolute, out var fromSource) ? fromSource : null;
                }
                catch
                {
                    return null;
                }
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
