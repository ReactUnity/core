#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using QuickJS;
using QuickJS.Binding;
using QuickJS.Native;
using QuickJS.Utils;
using UnityEngine;

namespace ReactUnity.Scripting
{
    public class QuickJSEngine : IJavaScriptEngine
    {
        public string Key { get; } = "quickjs";
        public object NativeEngine => Runtime;
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.None
#if !UNITY_EDITOR && UNITY_WEBGL
            // ModuleResolution included: there is no QuickJS here, but the jslib implements the
            // same asynchronous loader hooks, so QuickJSModuleLoader resolves and fetches a graph
            // exactly as it does on desktop and the browser links and evaluates it.
            | EngineCapabilities.Fetch
            | EngineCapabilities.XHR
            | EngineCapabilities.Encoding
            | EngineCapabilities.WebSocket
            | EngineCapabilities.Console
            | EngineCapabilities.Base64
            | EngineCapabilities.AbortController
            | EngineCapabilities.QueueMicrotask
#endif
            | EngineCapabilities.ModuleResolution
            | EngineCapabilities.None;

        private Action<IJavaScriptEngine> OnInitialize;
        private ReactContext Context;

        public ScriptRuntime Runtime { get; private set; }
        public QuickJS.ScriptContext MainContext { get; private set; }
        public ScriptValue Global { get; private set; }
        public ITypeDB TypeDB { get; private set; }
        public ObjectCache ObjectCache { get; private set; }

        public ScriptFunction ObjectKeys { get; private set; }
        public QuickJSApiBridge ApiBridge { get; private set; }

        private QuickJSModuleLoader ModuleLoader;

        private bool Initialized;

        static QuickJSEngine()
        {
            QuickJSConverters.RegisterAllConverters();
        }

        public QuickJSEngine(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize)
        {
            Context = context;
            OnInitialize = onInitialize;

            var logger = new QuickJSLogger();

            ApiBridge = new QuickJSApiBridge();

            Runtime = ScriptEngine.CreateRuntime(context?.IsEditorContext ?? false);
            Runtime.AddModuleResolvers();
            Runtime.OnInitialized += Runtime_OnInitialized;
            Runtime.Initialize(new ScriptRuntimeArgs
            {
                fileSystem = new DefaultFileSystem(logger),
                asyncManager = new DefaultAsyncManager(),
                logger = logger,
                binder = InvokeReflectBinding,
                byteBufferAllocator = new QuickJS.IO.ByteBufferPooledAllocator(),
                pathResolver = new PathResolver(),
                apiBridge = ApiBridge,
            });
        }

        public static void InvokeReflectBinding(ScriptRuntime runtime)
        {
            var bm = new BindingManager(new Prefs { }, new BindingManager.Args
            {
                bindingCallback = new ReflectBindingCallback(runtime),
                bindingLogger = new DefaultBindingLogger(LogLevel.Error),
            });
            bm.Collect();
            bm.Bind();
            bm.Report();
        }


        private void Runtime_OnInitialized(ScriptRuntime runtime)
        {
            MainContext = Runtime.GetMainContext();

            // Replaces the file-system loader AddModuleResolvers installed, and has to be in
            // place before anything executes: it is what makes an `import` of an http url, and
            // therefore dynamic import(), work at all.
            if (Context != null)
            {
                ModuleLoader = new QuickJSModuleLoader(Context);
                ModuleLoader.Install(runtime);
            }

            TypeDB = MainContext.GetTypeDB();
            ObjectCache = MainContext.GetObjectCache();

            var global = MainContext.GetGlobalObject();
            Values.js_get_classvalue(MainContext, global, out ScriptValue globalSv);
            Global = globalSv;

            var objCtor = Global.GetProperty<ScriptValue>("Object");
            var keys = objCtor.GetProperty<ScriptFunction>("keys");
            keys.SetBound(objCtor);
            objCtor.Dispose();
            ObjectKeys = keys;

            JSApi.JSB_FreeValueRT(Runtime, global);

            if (Context != null)
                JSApi.JS_SetBaseUrl(MainContext, Context.Location.origin);

            Initialized = true;
            OnInitialize?.Invoke(this);
        }

        public object Evaluate(string code, string fileName = null)
        {
            var res = MainContext.EvalSource<object>(code, fileName ?? "eval");
            Runtime.ExecutePendingJob();
            return res;
        }

        public void Execute(string code, string fileName = null, JavascriptDocumentType documentType = JavascriptDocumentType.Script)
        {
            if (documentType == JavascriptDocumentType.Module)
            {
                // Registered under the url its own specifiers resolve against, so a chunk importing
                // the entry back finds the module already here.
                fileName = ModuleUrl.Canonical(fileName);

                // Not awaited: anything this module imports is fetched by QuickJSModuleLoader,
                // which needs the frames a blocking import would be holding.
                if (ModuleLoader != null) MainContext.EvalModuleAsync(code, fileName ?? "module");
                // Module scope, so `void 0;` is not needed to keep the result marshalable.
                else MainContext.EvalModule<object>(code, fileName ?? "module");

                // Draining the queue the graph just filled is enough to finish a module that
                // needs nothing from the loader - which is every bundle, so those still evaluate
                // before this returns. One waiting on a request cannot, and finishes over the
                // next few Update()s instead.
                Runtime.ExecutePendingJob();
                return;
            }

            var voidedCode = code + "\n;;void 0;";
            Evaluate(voidedCode, fileName);
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

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is ScriptFunction sf)
            {
                Values.js_get_classvalue(sf.ctx, sf, out ScriptValue svf);
                obj = svf;
            }

            if (obj is ScriptValue sv)
            {
                sv.SetProperty(key, CreateNativeValue(value));
            }
        }

        public object GetGlobal(string key)
        {
            return Global.GetProperty<object>(key);
        }

        public void SetGlobal<T>(string key, T value)
        {
            SetProperty(Global, key, value);
        }

        public void DeleteGlobal(string key)
        {
            SetProperty<object>(Global, key, null);
        }

        public object CreateNativeValue(object v)
        {
            if (v is Type t) return CreateTypeReference(t);
            return v;
        }

        public object CreateTypeReference(Type type)
        {
            TypeDB.GetDynamicType(type, false);
            var ctor = TypeDB.GetConstructorOf(type);
            Values.js_get_classvalue(MainContext, ctor, out ScriptValue res);
            JSApi.JS_FreeValue(MainContext, ctor);
            return res;
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return new ScriptNamespaceReference(this, ns, assemblies);
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
        {
            var obj = JSApi.JS_NewObject(MainContext);
            if (!Values.js_get_classvalue(MainContext, obj, out ScriptValue sv)) return null;

            foreach (var item in props) SetProperty(sv, item.Key, item.Value);

            Runtime.FreeValue(obj);
            return sv;
        }

        public void Dispose()
        {
            Global?.Dispose();
            Global = null;

            ApiBridge?.Dispose();
            ApiBridge = null;
            ObjectKeys?.Dispose();
            ObjectKeys = null;

            TypeDB = null;
            MainContext = null;
            ObjectCache = null;
            OnInitialize = null;

            // Before the runtime, and it has to be: a module load still in flight holds a load
            // handle and the graph's promise, so leaving one unsettled means JSB_FreeRuntime finds
            // live objects -- and its host callback, a UnityWebRequest that has not come back yet,
            // would settle into freed memory once it does.
            ModuleLoader?.Close();

            Runtime?.Shutdown();
            Runtime = null;

            // After the runtime, never before: the engine holds the pointer the loader's GCHandle
            // backs and would hand it to a trampoline again.
            ModuleLoader?.Dispose();
            ModuleLoader = null;
        }

        public IEnumerable<object> TraverseScriptArray(object obj)
        {
            if (obj is IEnumerable eo)
            {
                foreach (var kv in eo) yield return kv;
            }
            else if (obj is ScriptValue jv)
            {
                var len = jv.GetProperty<int>("length");

                for (int i = 0; i < len; i++)
                {
                    yield return jv.GetProperty<object>(i + "");
                }
            }
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is IEnumerable<KeyValuePair<string, object>> eo)
            {
                foreach (var kv in eo) yield return kv;
            }
            else if (obj is ScriptValue jv)
            {
                var res = ObjectKeys.Invoke<string[]>(jv);

                foreach (var kv in res)
                    yield return new KeyValuePair<string, object>(kv, jv.GetProperty<object>(kv));
            }
        }

        public bool IsScriptObject(object obj)
        {
            return obj is ScriptValue jv;
        }

        public void Update()
        {
            if (Initialized) Runtime.Update((int) (Context.Timer.DeltaTime * 1000));
        }
    }

    public class QuickJSEngineFactory : IJavaScriptEngineFactory
    {
        public JavascriptEngineType EngineType => JavascriptEngineType.QuickJS;

        public IJavaScriptEngine Create(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize)
        {
            return new QuickJSEngine(context, debug, awaitDebugger, onInitialize);
        }
    }
}
#endif
