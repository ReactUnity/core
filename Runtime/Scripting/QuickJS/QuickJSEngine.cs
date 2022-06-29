#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
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
            | EngineCapabilities.Fetch
            | EngineCapabilities.XHR
            | EngineCapabilities.WebSocket
            | EngineCapabilities.Console
            | EngineCapabilities.Base64
#endif
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
                withDebugServer = debug,
                waitingForDebugger = awaitDebugger,
                fileSystem = new DefaultFileSystem(logger),
                asyncManager = new DefaultAsyncManager(),
                logger = logger,
                binder = InvokeReflectBinding,
                debugServerPort = 9222,
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
            bm.Generate(TypeBindingFlags.None);
            bm.Report();
        }


        private void Runtime_OnInitialized(ScriptRuntime runtime)
        {
            MainContext = Runtime.GetMainContext();
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

        public void Execute(string code, string fileName = null)
        {
            var voidedCode = code + "\n;;void 0;";
            Evaluate(voidedCode, fileName);
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
            return new QuickJSNamespaceReference(this, ns, assemblies);
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

            Runtime?.Shutdown();
            Runtime = null;
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
            if (Initialized) Runtime.Update((int) (Time.deltaTime * 1000));
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
