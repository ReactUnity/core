#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
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
        public string Key { get; } = "QuickJS";
        public object NativeEngine => Runtime;
        public EngineCapabilities Capabilities { get; } = EngineCapabilities.None;

        private Action<IJavaScriptEngine> OnInitialize;

        public ScriptRuntime Runtime { get; private set; }
        public QuickJS.ScriptContext MainContext { get; private set; }
        public ScriptValue Global { get; private set; }
        public ITypeDB TypeDB { get; private set; }
        public ObjectCache ObjectCache { get; private set; }

        private bool Initialized;

        static QuickJSEngine()
        {
            QuickJSConverters.RegisterAllConverters();
        }

        public QuickJSEngine(ReactContext context, bool debug, bool awaitDebugger, Action<IJavaScriptEngine> onInitialize)
        {
            OnInitialize = onInitialize;

            var logger = new QuickJSLogger();

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
            JSApi.JSB_FreeValueRT(Runtime, global);

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
            Evaluate(code, fileName);
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
            TypeDB = null;
            MainContext = null;
            ObjectCache = null;

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

    internal class QuickJSLogger : IScriptLogger
    {
        public void WriteException(Exception exception)
        {
            try
            {
                Debug.LogException(exception);
                if (exception.InnerException != null)
                    Debug.LogException(exception.InnerException);
            }
            catch (Exception)
            {
            }
        }

        public void Write(LogLevel ll, string text)
        {
            switch (ll)
            {
                case LogLevel.Warn:
                    if (text.Contains("Codegen", StringComparison.InvariantCultureIgnoreCase)) return;
                    Debug.LogWarning(text);
                    return;
                case LogLevel.Error:
                    Debug.LogError(text);
                    return;
                case LogLevel.Info:
                    Debug.Log(text);
                    return;
                default:
                    Debug.Log(text);
                    return;
            }
        }

        public void Write(LogLevel ll, string fmt, params object[] args)
        {
            switch (ll)
            {
                case LogLevel.Warn:
                    if (fmt.Contains("Codegen", StringComparison.InvariantCultureIgnoreCase)) return;
                    Debug.LogWarningFormat(fmt, args);
                    return;
                case LogLevel.Error:
                    Debug.LogErrorFormat(fmt, args);
                    return;
                case LogLevel.Info:
                    Debug.LogFormat(fmt, args);
                    return;
                default:
                    Debug.LogFormat(fmt, args);
                    return;
            }
        }
    }

    public class QuickJSNamespaceReference : IDictionary<string, object>
    {
        QuickJSEngine _engine;
        Assembly[] _allowedAssemblies;
        private readonly string _path;

        public ICollection<string> Keys => new string[0];
        public ICollection<object> Values => new object[0];

        public int Count => 0;

        public bool IsReadOnly => true;

        public object this[string key]
        {
            get => Get(key);
            set { }
        }

        public QuickJSNamespaceReference(QuickJSEngine engine, string path, Assembly[] allowedAssemblies)
        {
            _engine = engine;
            _path = path;
            _allowedAssemblies = allowedAssemblies;
        }

        public object Get(string property)
        {
            var newPath = _path + "." + property;

            return GetPath(newPath);
        }

        public object GetPath(string path)
        {
            Type type;
            var lookupAssemblies = new[] { Assembly.GetCallingAssembly(), Assembly.GetExecutingAssembly() };

            foreach (var assembly in lookupAssemblies)
            {
                type = assembly.GetType(path);
                if (type != null)
                {
                    return _engine.CreateTypeReference(type);
                }
            }

            // search in lookup assemblies
            var comparedPath = path.Replace("+", ".");
            foreach (var assembly in _allowedAssemblies)
            {
                type = assembly.GetType(path);
                if (type != null)
                {
                    return _engine.CreateTypeReference(type);
                }

                var lastPeriodPos = path.LastIndexOf(".", StringComparison.Ordinal);
                var trimPath = path.Substring(0, lastPeriodPos);
                type = GetType(assembly, trimPath);
                if (type != null)
                {
                    foreach (Type nType in GetAllNestedTypes(type))
                    {
                        if (nType.FullName.Replace("+", ".").Equals(comparedPath))
                        {
                            return _engine.CreateTypeReference(nType);
                        }
                    }
                }
            }

            // search for type in mscorlib
            type = System.Type.GetType(path);
            if (type != null)
            {
                return _engine.CreateTypeReference(type);
            }

            // the new path doesn't represent a known class, thus return a new namespace instance
            return new QuickJSNamespaceReference(_engine, path, _allowedAssemblies);
        }

        /// <summary>   Gets a type. </summary>
        ///<remarks>Nested type separators are converted to '.' instead of '+' </remarks>
        /// <param name="assembly"> The assembly. </param>
        /// <param name="typeName"> Name of the type. </param>
        ///
        /// <returns>   The type. </returns>
        private static Type GetType(Assembly assembly, string typeName)
        {
            var compared = typeName.Replace("+", ".");
            Type[] types = assembly.GetTypes();
            foreach (Type t in types)
            {
                if (t.FullName.Replace("+", ".") == compared)
                {
                    return t;
                }
            }

            return null;
        }

        private static Type[] GetAllNestedTypes(Type type)
        {
            var types = new List<Type>();
            AddNestedTypesRecursively(types, type);
            return types.ToArray();
        }

        private static void AddNestedTypesRecursively(List<Type> types, Type type)
        {
            Type[] nestedTypes = type.GetNestedTypes(BindingFlags.Public);
            foreach (Type nestedType in nestedTypes)
            {
                types.Add(nestedType);
                AddNestedTypesRecursively(types, nestedType);
            }
        }

        public override string ToString()
        {
            return "[Namespace: " + _path + "]";
        }

        public void Add(string key, object value)
        {
        }

        public bool ContainsKey(string key)
        {
            return true;
        }

        public bool Remove(string key)
        {
            return false;
        }

        public bool TryGetValue(string key, out object value)
        {
            try
            {
                value = Get(key);
                return true;
            }
            catch
            {
                value = null;
                return false;
            }
        }

        public void Add(KeyValuePair<string, object> item)
        {
        }

        public void Clear()
        {
        }

        public bool Contains(KeyValuePair<string, object> item)
        {
            return true;
        }

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
        }

        public bool Remove(KeyValuePair<string, object> item)
        {
            return false;
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            return null;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return null;
        }
    }
}
#endif
