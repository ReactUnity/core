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
        public ScriptValue Global { get; private set; }
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
                fileSystem = GetFileSystem(context, logger),
                asyncManager = new DefaultAsyncManager(),
                logger = logger,
                binder = DefaultBinder.GetBinder(true),
                debugServerPort = 9222,
                byteBufferAllocator = new QuickJS.IO.ByteBufferPooledAllocator(),
                pathResolver = new PathResolver(),
            });
        }

        private IFileSystem GetFileSystem(ReactContext ctx, IScriptLogger logger)
        {
#if JSB_UNITYLESS
            return new DefaultFileSystem(logger);
#else
            if (ctx.Source.IsDevServer) return new DefaultFileSystem(logger);

            switch (ctx.Source.Type)
            {
                case ScriptSourceType.TextAsset:
                case ScriptSourceType.File:
                    return new DefaultFileSystem(logger);
                case ScriptSourceType.Url:
                case ScriptSourceType.Resource:
                case ScriptSourceType.Raw:
                default:
                    return new ResourcesFileSystem(logger);
            }
#endif
        }

        private void Runtime_OnInitialized(ScriptRuntime obj)
        {
            MainContext = Runtime.GetMainContext();
            TypeRegister = MainContext.CreateTypeRegister();
            TypeDB = MainContext.GetTypeDB();
            ObjectCache = MainContext.GetObjectCache();
            Context?.Dispatcher.OnEveryUpdate(() => {
                Runtime.Update((int) (Time.deltaTime * 1000));
            });

            var global = MainContext.GetGlobalObject();
            Global = new ScriptValue(MainContext, global);
            Runtime.FreeValue(Global);

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

        public void SetProperty<T>(object obj, string key, T value)
        {
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
            return TypeDB.NewDynamicConstructor(MainContext.GetAtom(type.Name), new DynamicConstructor(new DynamicType(type, false), type.GetConstructors()[0]));
        }

        public object CreateNamespaceReference(string ns, params Assembly[] assemblies)
        {
            return null;
        }

        public object CreateScriptObject(IEnumerable<KeyValuePair<string, object>> props)
        {
            var obj = JSApi.JS_NewObject(MainContext);
            var sv = new ScriptValue(MainContext, obj);

            foreach (var item in props) SetProperty(sv, item.Key, item.Value);

            Runtime.FreeValue(obj);
            return sv;
        }

        public void Dispose()
        {
            Global = null;
            TypeDB = null;
            MainContext = null;
            TypeRegister = null;
            ObjectCache = null;
            Context = null;

            Runtime.Shutdown();
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
                Debug.LogError("Can't traverse script object in QuickJS");
            }
        }

        public bool IsScriptObject(object obj)
        {
            return obj is ScriptValue jv;
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
