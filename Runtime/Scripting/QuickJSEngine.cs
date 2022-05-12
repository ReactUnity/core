#if !REACT_DISABLE_QUICKJS
#define REACT_QUICKJS
#endif

#if REACT_QUICKJS
using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;
using QuickJS;
using QuickJS.Native;
using QuickJS.Binding;
using QuickJS.Utils;

namespace ReactUnity.Scripting
{
    public class QuickJSEngine : IJavaScriptEngine
    {
        public string Key { get; } = "QuickJS";
        public object NativeEngine => Runtime;

        private ReactContext Context;
        private Action<IJavaScriptEngine> OnInitialize;

        public ScriptRuntime Runtime { get; private set; }
        public QuickJS.ScriptContext MainContext { get; private set; }
        public JSValue Global { get; private set; }
        public TypeRegister TypeRegister { get; private set; }
        public ITypeDB TypeDB { get; private set; }
        public ObjectCache ObjectCache { get; private set; }

        public QuickJSEngine(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize)
        {
            OnInitialize = onInitialize;
            Context = context;

            var logger = new DefaultScriptLogger();
            Runtime = ScriptEngine.CreateRuntime(context.IsEditorContext);
            Runtime.AddModuleResolvers();
            Runtime.OnInitialized += Runtime_OnInitialized;
            Runtime.Initialize(new ScriptRuntimeArgs
            {
                withDebugServer = debug,
                waitingForDebugger = awaitDebugger,
                fileSystem = new ResourcesFileSystem(logger),
                asyncManager = new DefaultAsyncManager(),
                logger = logger,
                binder = DefaultBinder.GetBinder(true),
                debugServerPort = 9222,
                byteBufferAllocator = new QuickJS.IO.ByteBufferPooledAllocator(),
                pathResolver = new PathResolver(),
            });
        }

        private void Runtime_OnInitialized(ScriptRuntime obj)
        {
            MainContext = Runtime.GetMainContext();
            Global = MainContext.GetGlobalObject();
            TypeRegister = MainContext.CreateTypeRegister();
            TypeDB = MainContext.GetTypeDB();
            ObjectCache = MainContext.GetObjectCache();
            Context?.Dispatcher.OnEveryUpdate(() => {
                Runtime.Update((int) (Time.deltaTime * 1000));
                Runtime.ExecutePendingJob();
            });

            OnInitialize?.Invoke(this);
        }

        public object Evaluate(string code, string fileName = null)
        {
            return MainContext.EvalSource<object>(code, fileName ?? "__unnamed");
        }

        public void Execute(string code, string fileName = null)
        {
            MainContext.EvalSource(code, fileName ?? "__unnamed");
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
            return JSApi.JS_GetProperty(MainContext, Global, MainContext.GetAtom(key));
        }

        public void SetProperty<T>(object obj, string key, T value)
        {
            if (obj is JSValue v && v.IsObject())
                JSApi.JS_SetProperty(MainContext, v, MainContext.GetAtom(key), CreateNativeValue(value));
        }

        public void SetValue<T>(string key, T value)
        {
            SetProperty(Global, key, value);
        }

        public void ClearValue(string key)
        {
            SetProperty<object>(Global, key, null);
        }

        public JSValue CreateNativeValue(object value)
        {
            if (value is Type t) return (JSValue) CreateTypeReference(t);
            if (value is Delegate d) return TypeDB.NewDynamicDelegate(MainContext.GetAtom("dynamicFunction"), d);
            if (value is Array) return Values.PushArray(MainContext, value);
            if (value is object[]) return Values.PushArray(MainContext, value);
            return Values.js_push_var(MainContext, value);
        }

        public object CreateTypeReference(Type type)
        {
            return TypeDB.NewDynamicConstructor(MainContext.GetAtom(type.Name), new DynamicConstructor(new DynamicType(type, false), type.GetConstructors()[0]));
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return null;
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
        {
            var obj = JSApi.JS_NewObject(MainContext);

            foreach (var item in props)
            {
                SetProperty(obj, item.Key, item.Value);
            }

            return obj;
        }

        public void Dispose()
        {
            Runtime.Shutdown();
            GC.Collect();
            GC.WaitForPendingFinalizers();
        }

        public IEnumerator<KeyValuePair<string, object>> TraverseScriptObject(object obj)
        {
            if (obj is JSValue jv)
            {
                //var keys = jv;
                //foreach (var key in keys)
                //{
                //    yield return new KeyValuePair<string, object>(key.AsString(), jv.Get(key));
                //}
            }
            else if (obj is IEnumerable<KeyValuePair<string, object>> eo)
            {
                foreach (var kv in eo) yield return kv;
            }
        }

        public bool IsScriptObject(object obj)
        {
            return obj is JSValue jv && jv.IsObject();
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
