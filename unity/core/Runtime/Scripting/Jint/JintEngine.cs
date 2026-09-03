#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if REACT_JINT
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Threading.Tasks;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using Jint.Runtime;
using Jint.Runtime.Interop;
using Jint.Runtime.Modules;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class JintEngine : IJavaScriptEngine
    {
        public string Key { get; } = "jint";
        public Engine Engine { get; }
        public object NativeEngine => Engine;
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.ModuleResolution;

        public JintEngine(ReactContext context, bool debug, bool awaitDebugger)
        {
            moduleLoader = new JintModuleLoader(context);

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
                opt.AllowClrWrite();
                opt.CatchClrExceptions(ex => {
                    Debug.LogException(ex);
                    return true;
                });

                opt.DebugMode(debug);
                opt.Interop.AllowGetType = true;
                opt.Interop.AllowSystemReflection = true;

                opt.SetTypeConverter(e => new JintTypeConverter(context, e));
                opt.UseHostFactory(_ => new JintHost());
                opt.EnableModules(moduleLoader);

                // Jint hands a Task to JS as an ordinary CLR wrapper. Its own TaskInterop feature turns
                // one into a promise but rejects with the AggregateException, so do it here instead and
                // unwrap - the other engines reject with the inner exception, and scripts see one shape.
                var wrapObject = opt.Interop.WrapObjectHandler;
                opt.Interop.WrapObjectHandler = (engine, target, type) => {
                    if (!(target is Task task)) return wrapObject(engine, target, type);

                    var (promise, resolve, reject) = engine.Advanced.RegisterPromise();

                    task.GetAwaiter().OnCompleted(() => {
                        if (task.IsFaulted) reject(JsValue.FromObject(engine, task.Exception.InnerException));
                        else resolve(JsValue.FromObject(engine, task.GetType().GetProperty("Result")?.GetValue(task)));
                    });

                    return (ObjectInstance) promise;
                };
            });
        }

        // Jint 4.15 stopped filling import.meta by itself, and the Vite client reads its own url off it.
        private class JintHost : Host
        {
            public override List<KeyValuePair<JsValue, JsValue>> GetImportMetaProperties(Jint.Runtime.Modules.Module module)
            {
                var props = base.GetImportMetaProperties(module);
                if (!props.Exists(x => x.Key.ToString() == "url"))
                    props.Add(new KeyValuePair<JsValue, JsValue>("url", module.Location ?? JsValue.Undefined));
                return props;
            }
        }

        public object Evaluate(string code, string fileName = null)
        {
            return Engine.TypeConverter.Convert(Engine.Evaluate(code), typeof(object), CultureInfo.InvariantCulture);
        }

        public void Execute(string code, string fileName = null, JavascriptDocumentType documentType = JavascriptDocumentType.Script)
        {
            if (documentType == JavascriptDocumentType.Module)
            {
                // One root at a time. An entry document's script tags are a list a browser runs in
                // order, and starting the next graph while the previous one is still fetching lets
                // the fetches decide instead: Vite inlines the React Refresh preamble and then
                // loads the app, and the app reads what the preamble installs.
                if (moduleInFlight != null) moduleQueue.Enqueue(new PendingModule { Code = code, FileName = fileName });
                else StartModule(code, fileName);
                return;
            }

            Engine.Execute(code);
        }

        private void StartModule(string code, string fileName)
        {
            // import.meta.url is the specifier, so it has to be the address the code came from -
            // and the cache is keyed on it, so a hot update needs a fresh one.
            var specifier = $"{fileName ?? "module"}?__ru={moduleCount++}";
            Engine.Modules.Add(specifier, code);

            // Not awaited: anything this module imports is fetched by JintModuleLoader, which
            // needs the frames a blocking import would be holding.
            var import = Engine.Modules.StartImport(specifier);

            // Draining the queue the import just filled is enough to finish a module that
            // needs nothing from the loader - which is every bundle, so those still evaluate
            // before this returns. A graph waiting on a request cannot, and finishes over the
            // next few Update()s instead.
            if (!import.IsCompleted) Engine.Advanced.ProcessTasks();

            if (!import.IsCompleted)
            {
                moduleInFlight = import;
                pendingImports.Add(import);
            }
            else
            {
                StartNextModule();
                if (import.IsFaulted) throw new JavaScriptException(import.Error);
            }
        }

        /// Runs whatever queued behind the graph that just settled. Loops rather than recurses so
        /// a run of bundles that each finish inline cannot nest one frame per script.
        private void StartNextModule()
        {
            moduleInFlight = null;

            while (moduleInFlight == null && moduleQueue.Count > 0)
            {
                var next = moduleQueue.Dequeue();

                // A root that throws must not strand the ones behind it.
                try { StartModule(next.Code, next.FileName); }
                catch (Exception ex) { Debug.LogException(ex); }
            }
        }

        private int moduleCount;
        private readonly JintModuleLoader moduleLoader;
        private readonly List<ModuleImportOperation> pendingImports = new List<ModuleImportOperation>();

        private struct PendingModule
        {
            public string Code;
            public string FileName;
        }

        private ModuleImportOperation moduleInFlight;
        private readonly Queue<PendingModule> moduleQueue = new Queue<PendingModule>();

        /// The only place a graph that finished loading after Execute returned can be reported.
        void ReportFinishedImports()
        {
            for (var i = pendingImports.Count - 1; i >= 0; i--)
            {
                var import = pendingImports[i];
                if (!import.IsCompleted) continue;

                pendingImports.RemoveAt(i);
                if (import.IsFaulted) Debug.LogError($"Module import failed: {Describe(import.Error)}");
                if (import == moduleInFlight) StartNextModule();
            }
        }

        /// A rejected import only names a line in the bundle through the error's own stack, which
        /// is not part of its message.
        static string Describe(JsValue error)
        {
            var stack = error is ObjectInstance obj ? obj.Get("stack") : JsValue.Undefined;
            return stack.IsUndefined() || stack.IsNull() ? error?.ToString() : $"{error}\n{stack}";
        }

        public Exception TryExecute(string code, string fileName = null, JavascriptDocumentType documentType = JavascriptDocumentType.Script)
        {
            try
            {
                Execute(code, fileName, documentType);
            }
            catch (Acornima.ParseErrorException ex)
            {
                Debug.LogError($"Parser exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
                return ex;
            }
            catch (JavaScriptException ex)
            {
                Debug.LogError($"JS exception in {ex.Location}\n{Describe(ex.Error)}");
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
            return Evaluate(key);
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ObjectInstance so)
                so.FastSetProperty(key,
                    new Jint.Runtime.Descriptors.PropertyDescriptor(
                        CreateValue(value), true, false, true));
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
            var obj = new JsObject(Engine);

            foreach (var item in props)
            {
                obj.Set(item.Key, JsValue.FromObject(Engine, item.Value));
            }

            return obj;
        }

        public void Dispose()
        {
        }

        public IEnumerable<object> TraverseScriptArray(object obj)
        {
            if (obj is IEnumerable eo)
            {
                foreach (var kv in eo) yield return kv;
            }
            else if (obj is ObjectInstance jv)
            {
                var length = jv.Get("length").ToObject();

                if (length is double len)
                {
                    for (int i = 0; i < len; i++)
                    {
                        yield return jv.Get(i + "").ToObject();
                    }
                }
            }
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is ObjectInstance jv)
            {
                var keys = jv.GetOwnPropertyKeys(Jint.Runtime.Types.String);
                foreach (var key in keys)
                {
                    var value = jv.Get(key).ToObject();
                    yield return new KeyValuePair<string, object>(key.AsString(), value);
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
            Engine.Advanced.ProcessTasks();
            if (pendingImports.Count > 0) ReportFinishedImports();
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
