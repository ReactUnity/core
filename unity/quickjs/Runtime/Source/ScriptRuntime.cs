using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System.Threading;
using System.Reflection;

namespace QuickJS
{
    using Native;
    using Binding;
    using Utils;
    using Module;

    public partial class ScriptRuntime
    {
        /// <summary>How much C stack a script may use before the engine raises a catchable JS
        /// "stack overflow", set before the runtime is created. Zero leaves quickjs-ng's own
        /// limit alone, which on Unity's main thread means no working limit at all.</summary>
        ///
        /// It defaults to 768 KB rather than to ng's behaviour, because ng's default cannot fire
        /// here: it is 1 MB (JS_DEFAULT_STACK_SIZE) and it measures against the stack of whichever
        /// thread created the runtime - Unity's main thread, already deep in Unity's own frames and
        /// deeper still inside a coroutine, where less than 1 MB is left. So a deeply recursive
        /// script exhausts the real stack first, Mono notices at the managed-to-native boundary,
        /// and the StackOverflowException that follows cannot be caught: it takes the player or the
        /// Editor with it. Under a limit the thread can actually reach, the same script raises an
        /// ordinary RangeError that a caller can catch and a console can show.
        ///
        /// The asymmetry is why this is on by default. A cap too high for its platform simply never
        /// fires, which is no worse than having none. A cap too low costs recursion that would have
        /// completed - but only in the window between the cap and the stack that was really there,
        /// which is 768 KB to about 1 MB on the editors measured (6000.5.9f1, main thread inside a
        /// PlayMode coroutine: 768 KB raises cleanly, 1 MB does not raise at all). Trading that
        /// window for a crash that cannot be caught or reported is worth it for a UI framework.
        ///
        /// Raise it if you have deliberately deep code and know your thread's stack; lower it if
        /// you want the guard to fire on a platform with a smaller main-thread stack, where 768 KB
        /// may sit above the real headroom and so never trip. Zero restores ng's unusable default.
        /// Note that zero is a local sentinel meaning "do not call", never a value to forward - ng
        /// reads a zero stack_size as *unlimited*, which is worse still.
        public static int MaxStackSize = 768 * 1024;

        private class ScriptContextRef
        {
            public int next;
            public ScriptContext target;
        }

        public event Action<ScriptRuntime> OnInitializing;
        public event Action<ScriptRuntime> OnInitialized;
        public event Action<ScriptRuntime> OnMainModuleLoaded;

        /// <summary>
        /// this event will be raised after debugger connected if debug server is used, otherwise it will be raised immediately after OnInitialized
        /// </summary>
        public event Action<int> OnAfterDestroy;
        public event Action OnUpdate;
        public event Action<ScriptContext, string> OnScriptReloading;
        public event Action<ScriptContext, string> OnScriptReloaded;
        public Func<JSContext, string, string, int, string> OnSourceMap;

        private JSRuntime _rt;
        private int _runtimeId;
        private bool _withStacktrace;
        private IScriptLogger _logger;
        private int _freeContextSlot = -1;

        // reserved feature, there is only one context for a script runtime so far.
        private List<ScriptContextRef> _contextRefs = new List<ScriptContextRef>();
        private ScriptContext _mainContext;

        private Queue<JSAction> _pendingActions = new Queue<JSAction>();
        private List<JSAction> _delayedActions = new List<JSAction>();
        private List<JSAction> _executingActions = new List<JSAction>();

        private int _mainThreadId;

        private IFileSystem _fileSystem;
        private IPathResolver _pathResolver;
        private List<IModuleResolver> _moduleResolvers = new List<IModuleResolver>();
        private Dictionary<Type, ProxyModuleRegister> _allProxyModuleRegisters = new Dictionary<Type, ProxyModuleRegister>();
        private ObjectCache _objectCache;
        private ObjectCollection _objectCollection;
        private ITypeDB _typeDB;
        private ITimerManager _timerManager;
        private IO.IByteBufferAllocator _byteBufferAllocator;
        private Utils.AutoReleasePool _autorelease;
        private IAsyncManager _asyncManager;

        private bool _isValid; // destroy 调用后立即 = false
        private bool _isRunning;
        private bool _isInitialized;
        private bool _isWorker;
        private bool _isStaticBinding;
        private bool _isPumpingJobs;

        public bool withStacktrace
        {
            get { return _withStacktrace; }
            set { _withStacktrace = value; }
        }

        public bool isInitialized { get { return _isInitialized; } }

        public bool isWorker { get { return _isWorker; } }

        public int id { get { return _runtimeId; } }

        public bool isRunning { get { return _isRunning; } }

        public bool isValid { get { return _isValid; } }

        public bool isStaticBinding { get { return _isStaticBinding; } }

        public ScriptRuntime(int runtimeId)
        {
            _runtimeId = runtimeId;
            _isWorker = false;
            _mainThreadId = Thread.CurrentThread.ManagedThreadId;
        }

        public IAsyncManager GetAsyncManager()
        {
            return _asyncManager;
        }

        public IFileSystem GetFileSystem()
        {
            return _fileSystem;
        }

        public IPathResolver GetPathResolver()
        {
            return _pathResolver;
        }

        public void AddSearchPath(string path)
        {
            _pathResolver.AddSearchPath(path);
        }

        public void AddTypeReference(ProxyModuleRegister proxy, Type type, ModuleExportsBind bind, bool preload, params string[] ns)
        {
            _allProxyModuleRegisters[type] = proxy;
            proxy.Add(type, bind, preload, ns);
        }

        public bool TryLoadType(ScriptContext context, Type type)
        {
            ProxyModuleRegister proxy;
            if (_allProxyModuleRegisters.TryGetValue(type, out proxy) && proxy.LoadType(context, type))
            {
                return true;
            }

            return false;
        }

        public JSValue _LoadType(ScriptContext context, string module_id, string topLevelNamespace)
        {
            var reg = FindModuleResolver<StaticModuleResolver>()?.GetModuleRegister<ProxyModuleRegister>(module_id);
            //TODO improve these dirty code
            return reg != null ? reg._LoadType(context, topLevelNamespace) : JSApi.JS_UNDEFINED;
        }

        // 添加默认 resolver
        public void AddModuleResolvers()
        {
            AddModuleResolver(new StaticModuleResolver());
            AddModuleResolver(new JsonModuleResolver());
            AddModuleResolver(new SourceModuleResolver(new Utils.DefaultJsonConverter()));
        }

        public T AddModuleResolver<T>(T moduleResolver)
        where T : IModuleResolver
        {
            _moduleResolvers.Add(moduleResolver);
            return moduleResolver;
        }

        public T FindModuleResolver<T>()
        {
            for (int i = 0, count = _moduleResolvers.Count; i < count; i++)
            {
                var resolver = _moduleResolvers[i];
                if (resolver is T)
                {
                    return (T)resolver;
                }
            }
            return default(T);
        }

        public string ResolveFilePath(string parent_module_id, string module_id)
        {
            string resolved_id;
            for (int i = 0, count = _moduleResolvers.Count; i < count; i++)
            {
                var resolver = _moduleResolvers[i];
                if (resolver.ResolveModule(_fileSystem, _pathResolver, parent_module_id, module_id, out resolved_id))
                {
                    return resolved_id;
                }
            }

            return null;
        }

        public string ResolveModuleId(ScriptContext context, string parent_module_id, string module_id)
        {
            if (module_id != null)
            {
                for (int i = 0, count = _moduleResolvers.Count; i < count; i++)
                {
                    var resolver = _moduleResolvers[i];
                    string resolved_id;
                    if (resolver.ResolveModule(_fileSystem, _pathResolver, parent_module_id, module_id, out resolved_id))
                    {
                        return resolved_id;
                    }
                }
            }

            return null;
        }

        public void ResolveModule(string module_id)
        {
            ResolveModule(module_id, false);
        }

        public void ResolveModule(string module_id, bool set_as_main)
        {
            if (!string.IsNullOrEmpty(module_id))
            {
                var rval = ResolveModule(_mainContext, "", module_id, set_as_main);
                if (rval.IsException())
                {
                    JSNative.print_exception(_mainContext, _logger, LogLevel.Error, "failed to load module: " + module_id);
                }
                else
                {
                    JSApi.JSB_FreeValueRT(_rt, rval);
                }
            }
        }

        public JSValue ResolveModule(ScriptContext context, string parent_module_id, string module_id, bool set_as_main)
        {
            var ctx = (JSContext)context;
            for (int i = 0, count = _moduleResolvers.Count; i < count; i++)
            {
                var resolver = _moduleResolvers[i];
                string resolved_id;
                if (resolver.ResolveModule(_fileSystem, _pathResolver, parent_module_id, module_id, out resolved_id))
                {
                    // 如果目标模块在 reloading 列表中, 直接进入重载逻辑
                    JSValue exports_obj;
                    if (TryGetModuleForReloading(context, resolver, resolved_id, out exports_obj))
                    {
                        return exports_obj;
                    }

                    // 如果已经在模块缓存中, 直接返回
                    JSValue module_obj;
                    if (context.LoadModuleCache(resolved_id, out module_obj))
                    {
                        exports_obj = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("exports"));
                        JSApi.JS_FreeValue(ctx, module_obj);
                        return exports_obj;
                    }

                    // 载入新模块
                    return resolver.LoadModule(context, parent_module_id, resolved_id, set_as_main);
                }
            }

            return ctx.ThrowInternalError($"module can not be resolved ({module_id})");
        }

        public bool ReloadModule(ScriptContext context, string resolved_id)
        {
            JSContext ctx = context;
            for (int i = 0, count = _moduleResolvers.Count; i < count; i++)
            {
                var resolver = _moduleResolvers[i];
                JSValue exports_obj;
                if (resolver.ContainsModule(_fileSystem, _pathResolver, resolved_id) && TryGetModuleForReloading(context, resolver, resolved_id, out exports_obj))
                {
                    JSApi.JS_FreeValue(ctx, exports_obj);
                    return true;
                }
            }

            return false;
        }

        private bool TryGetModuleForReloading(ScriptContext context, IModuleResolver resolver, string resolved_id, out JSValue exports_obj)
        {
            JSValue module_obj;
            if (context.TryGetModuleForReloading(resolved_id, out module_obj))
            {
                RaiseScriptReloadingEvent_nothrow(context, resolved_id);
                if (resolver.ReloadModule(context, resolved_id, module_obj, out exports_obj))
                {
                    RaiseScriptReloadedEvent_nothrow(context, resolved_id);
                    JSApi.JS_FreeValue(context, module_obj);
                    return true;
                }

                JSApi.JS_FreeValue(context, module_obj);
            }

            exports_obj = JSApi.JS_UNDEFINED;
            return false;
        }

        private void RaiseScriptReloadingEvent_nothrow(ScriptContext context, string resolved_id)
        {
            try
            {
                OnScriptReloading?.Invoke(context, resolved_id);
                context.RaiseScriptReloadingEvent_throw(resolved_id);
            }
            catch (Exception exception)
            {
                _logger?.WriteException(exception);
            }
        }

        private void RaiseScriptReloadedEvent_nothrow(ScriptContext context, string resolved_id)
        {
            try
            {
                OnScriptReloaded?.Invoke(context, resolved_id);
                context.RaiseScriptReloadedEvent_throw(resolved_id);
            }
            catch (Exception exception)
            {
                _logger?.WriteException(exception);
            }
        }

        // 通用析构函数
        [MonoPInvokeCallback(typeof(JSGCObjectFinalizer))]
        public static void class_finalizer(JSRuntime rt, JSPayloadHeader header)
        {
            if (header.type_id == BridgeObjectType.ObjectRef)
            {
                var objectCache = ScriptEngine.GetObjectCache(rt);
                if (objectCache != null)
                {
                    try
                    {
                        objectCache.RemoveObject(header.value);
                    }
                    catch (Exception exception)
                    {
                        ScriptEngine.GetLogger(rt)?.WriteException(exception);
                    }
                }
            }
        }

        public void Initialize(ScriptRuntimeArgs args)
        {
            var fileSystem = args.fileSystem;
            if (fileSystem == null)
            {
                throw new NullReferenceException(nameof(fileSystem));
            }

            args.asyncManager.Initialize(_mainThreadId);

            _isValid = true;
            _isRunning = true;
            _isStaticBinding = DefaultBinder.IsStaticBinding(args.binder);
            _logger = args.logger;
#if JSB_DEBUG
            _logger?.Write(LogLevel.Info, "initializing script runtime: {0}", _runtimeId);
#endif
            _rt = JSApi.JSB_NewRuntime(class_finalizer);
            // Before anything can evaluate. Guarded because zero means "leave ng's limit alone";
            // forwarding it would ask ng for an unlimited stack.
            if (MaxStackSize > 0) JSApi.JS_SetMaxStackSize(_rt, (size_t)MaxStackSize);
            JSApi.JS_SetHostPromiseRejectionTracker(_rt, JSNative.PromiseRejectionTracker, IntPtr.Zero);
#if UNITY_EDITOR
            JSApi.JS_SetInterruptHandler(_rt, _InterruptHandler, IntPtr.Zero);
#else
            if (isWorker)
            {
                JSApi.JS_SetInterruptHandler(_rt, _InterruptHandler, IntPtr.Zero);
            }
#endif
            JSApi.JSB_SetRuntimeOpaque(_rt, (IntPtr)_runtimeId);
            JSApi.JS_SetModuleLoaderFunc(_rt, module_normalize, module_loader, IntPtr.Zero);
            CreateContext(args.apiBridge);
            _pathResolver = args.pathResolver;
            _asyncManager = args.asyncManager;
            _byteBufferAllocator = args.byteBufferAllocator;
            _autorelease = new Utils.AutoReleasePool();
            _fileSystem = fileSystem;
            _objectCache = new ObjectCache(_logger);
            _objectCollection = new ObjectCollection();
            _timerManager = args.timerManager ?? new DefaultTimerManager(_logger);
            _typeDB = new TypeDB(this, _mainContext);

            // await Task.Run(() => runner.OnBind(this, register));
            try
            {
                args.binder?.Invoke(this);
            }
            catch (Exception exception)
            {
                _logger?.WriteException(exception);
            }

            var register = _mainContext.CreateTypeRegister();
            if (!_isWorker)
            {
                JSWorker.Bind(register);
            }
            _timerManager.Bind(register);
            register.Finish();

            AddStaticModule("jsb", ScriptContext.Bind);
            // FindModuleResolver<StaticModuleResolver>().Warmup(_mainContext);


            RaiseInitialized();
        }

        private void RaiseInitialized()
        {
            if (!_isInitialized)
            {
                _isInitialized = true;
                OnInitializing?.Invoke(this);
                OnInitialized?.Invoke(this);
            }
        }

        [MonoPInvokeCallback(typeof(JSInterruptHandler))]
        private static unsafe int _InterruptHandler(JSRuntime rt, IntPtr opaque)
        {
            var runtime = ScriptEngine.GetRuntime(rt);
            return runtime != null && runtime._isRunning ? 0 : 1;
        }

        public void AddStaticModule(string module_id, ModuleExportsBind bind)
        {
            FindModuleResolver<StaticModuleResolver>().AddStaticModule(module_id, bind);
        }

        public void AddStaticModule(string module_id, RawModuleBind bind)
        {
            FindModuleResolver<StaticModuleResolver>().AddStaticModule(module_id, bind);
        }

        public void AddStaticModule(string module_id, JSValue rawValue)
        {
            FindModuleResolver<StaticModuleResolver>().AddStaticModule(module_id, new ValueModuleRegister(this, rawValue));
        }

        public void AddStaticModule(string module_id, IModuleRegister register)
        {
            FindModuleResolver<StaticModuleResolver>().AddStaticModule(module_id, register);
        }

        // 用于静态绑定代码注册绑定模块
        public ProxyModuleRegister AddStaticModuleProxy(string module_id, Action<ScriptRuntime, ProxyModuleRegister> proxyReg = null)
        {
            var proxy = new ProxyModuleRegister(this, module_id);

            FindModuleResolver<StaticModuleResolver>().AddStaticModule(module_id, proxy);
            proxyReg?.Invoke(this, proxy);
            return proxy;
        }

        public ScriptRuntime CreateWorker()
        {
            if (isWorker)
            {
                throw new Exception("cannot create a worker inside a worker");
            }

            var runtime = ScriptEngine.CreateRuntime();

            runtime._isWorker = true;
            runtime.Initialize(new ScriptRuntimeArgs()
            {
                fileSystem = _fileSystem,
                pathResolver = _pathResolver,
                asyncManager = _asyncManager,
                logger = _logger,
                byteBufferAllocator = new IO.ByteBufferPooledAllocator(),
            });
            return runtime;
        }

        public void AutoRelease(Utils.IReferenceObject referenceObject)
        {
            _autorelease.AutoRelease(referenceObject);
        }

        public IO.IByteBufferAllocator GetByteBufferAllocator()
        {
            return _byteBufferAllocator;
        }

        public ITimerManager GetTimerManager()
        {
            return _timerManager;
        }

        public IScriptLogger GetLogger()
        {
            return _logger;
        }

        public ITypeDB GetTypeDB()
        {
            return _typeDB;
        }

        public void ReplaceTypeDB(ITypeDB newTypeDB)
        {
            _typeDB = newTypeDB;
        }

        public Utils.ObjectCache GetObjectCache()
        {
            return _objectCache;
        }

        public void AddManagedObject(IObjectCollectionEntry entry, out ObjectCollection.Handle handle)
        {
            _objectCollection.AddObject(entry, out handle);
        }

        public bool RemoveManagedObject(ObjectCollection.Handle handle)
        {
#if JSB_DEBUG
            if (!IsMainThread())
            {
                _logger?.Write(LogLevel.Error, "RemoveManagedObject is only allowed to be invoked in script runtime thread");
            }
#endif
            return _objectCollection.RemoveObject(handle);
        }

        private ScriptContext CreateContext(Experimental.IJSApiBridge apiBridge)
        {
            ScriptContextRef freeEntry;
            int slotIndex;
            if (_freeContextSlot < 0)
            {
                freeEntry = new ScriptContextRef();
                slotIndex = _contextRefs.Count;
                _contextRefs.Add(freeEntry);
                freeEntry.next = -1;
            }
            else
            {
                slotIndex = _freeContextSlot;
                freeEntry = _contextRefs[slotIndex];
                _freeContextSlot = freeEntry.next;
                freeEntry.next = -1;
            }

            var context = new ScriptContext(this, slotIndex + 1, apiBridge);

            freeEntry.target = context;
            if (_mainContext == null)
            {
                _mainContext = context;
            }

            context.RegisterBuiltins();
            return context;
        }

        /// <summary>
        /// (internal use only)
        /// </summary>
        public void RemoveContext(ScriptContext context)
        {
            var id = context.id;
            if (id > 0)
            {
                var index = id - 1;
                var entry = _contextRefs[index];
                entry.next = _freeContextSlot;
                entry.target = null;
                _freeContextSlot = index;
            }
        }

        public ScriptContext GetMainContext()
        {
            return _mainContext;
        }

        public ScriptContext GetContext(JSContext ctx)
        {
            ScriptContext context = null;
            var id = (int)JSApi.JS_GetContextOpaque(ctx);
            if (id > 0)
            {
                var index = id - 1;
                if (index < _contextRefs.Count)
                {
                    context = _contextRefs[index].target;
                }
            }
            return context;
        }

        private static void _FreeValueAction(ScriptRuntime rt, object cbArgs, JSValue cbValue)
        {
            JSApi.JSB_FreeValueRT(rt, cbValue);
        }

        private static void _FreeValueAndDelegationAction(ScriptRuntime rt, object cbArgs, JSValue cbValue)
        {
            var cache = rt.GetObjectCache();
            cache.RemoveDelegate(cbValue);
            JSApi.JSB_FreeValueRT(rt, cbValue);
        }

        private static void _FreeManagedObjectAction(ScriptRuntime rt, object cbArgs, JSValue cbValue)
        {
            var handle = (ObjectCollection.Handle)cbArgs;
            rt.RemoveManagedObject(handle);
        }

        private static void _FreeValueAndScriptValueAction(ScriptRuntime rt, object cbArgs, JSValue cbValue)
        {
            var cache = rt.GetObjectCache();
            cache.RemoveScriptValue(cbValue);
            JSApi.JSB_FreeValueRT(rt, cbValue);
        }

        // private static void _FreeValueAndScriptPromiseAction(ScriptRuntime rt, object cbArgs, JSValue cbValue)
        // {
        //     var cache = rt.GetObjectCache();
        //     cache.RemoveScriptPromise(cbValue);
        //     JSApi.JSB_FreeValueRT(rt, cbValue);
        // }

        // 可在 GC 线程直接调用此方法
        public bool FreeDelegationValue(JSValue value)
        {
            if (!EnqueuePendingAction(new JSAction { value = value, callback = _FreeValueAndDelegationAction }))
            {
                return false;
            }
            return true;
        }

        // 可在 GC 线程直接调用此方法
        public void FreeScriptValue(JSValue value)
        {
            EnqueuePendingAction(new JSAction { value = value, callback = _FreeValueAndScriptValueAction });
        }

        public void FreeManagedObject(ObjectCollection.Handle handle)
        {
            EnqueuePendingAction(new JSAction { args = handle, callback = _FreeManagedObjectAction });
        }

        // // 可在 GC 线程直接调用此方法
        // public unsafe void FreeScriptPromise(JSValue promise, JSValue onResolve, JSValue onReject)
        // {
        //     if (_runtimeId < 0)
        //     {
        //         _logger?.Write(LogLevel.Error, "fatal error: enqueue pending action after the runtime shutdown");
        //         return;
        //     }

        //     if (IsMainThread())
        //     {
        //         _FreeValueAndScriptPromiseAction(this, null, promise);
        //         _FreeValueAction(this, null, onResolve);
        //         _FreeValueAction(this, null, onReject);
        //         return;
        //     }

        //     lock (_pendingActions)
        //     {
        //         _pendingActions.Enqueue(new JSAction { value = promise, callback = _FreeValueAndScriptPromiseAction });
        //         _pendingActions.Enqueue(new JSAction { value = onResolve, callback = _FreeValueAction });
        //         _pendingActions.Enqueue(new JSAction { value = onReject, callback = _FreeValueAction });
        //     }
        // }

        // 可在 GC 线程直接调用此方法
        public void FreeValues(JSValue[] values)
        {
            if (values == null || values.Length == 0)
            {
                return;
            }

            if (_runtimeId < 0)
            {
                _logger?.Write(LogLevel.Error, "fatal error: enqueue pending action after the runtime shutdown");
                return;
            }

            if (IsMainThread())
            {
                for (int i = 0, len = values.Length; i < len; i++)
                {
                    _FreeValueAction(this, null, values[i]);
                }
                return;
            }

            lock (_pendingActions)
            {
                for (int i = 0, count = values.Length; i < count; ++i)
                {
                    _pendingActions.Enqueue(new JSAction { value = values[i], callback = _FreeValueAction });
                }
            }
        }

        // 可在 GC 线程直接调用此方法
        public void FreeValue(JSValue value)
        {
            EnqueuePendingAction(new JSAction { value = value, callback = _FreeValueAction });
        }

        // 可在 GC 线程直接调用此方法
        public unsafe void FreeValues(int count, JSValue* values)
        {
            if (count == 0 || values == null)
            {
                return;
            }

            if (_runtimeId < 0)
            {
                _logger?.Write(LogLevel.Error, "fatal error: enqueue pending action after the runtime shutdown");
                return;
            }

            if (IsMainThread())
            {
                for (int i = 0; i < count; i++)
                {
                    _FreeValueAction(this, null, values[i]);
                }
                return;
            }

            lock (_pendingActions)
            {
                for (var i = 0; i < count; ++i)
                {
                    _pendingActions.Enqueue(new JSAction { value = values[i], callback = _FreeValueAction });
                }
            }
        }

        public bool EnqueueAction(JSActionCallback callback, object args, bool isDelayedUntilActive = false)
        {
            return EnqueuePendingAction(new JSAction { callback = callback, args = args, isDelayedUntilActive = isDelayedUntilActive });
        }

        private bool EnqueuePendingAction(JSAction action)
        {
            if (_runtimeId < 0)
            {
                _logger?.Write(LogLevel.Error, "fatal error: enqueue pending action after the runtime shutdown");
                return false;
            }

            if (!action.isDelayedUntilActive && IsMainThread())
            {
                action.callback(this, action.args, action.value);
                return true;
            }

            lock (_pendingActions) { _pendingActions.Enqueue(action); }
            return true;
        }

        /// <summary>
        /// try to eval the main module
        /// </summary>
        public void EvalMain(string fileName)
        {
            ResolveModule(fileName, true);
            OnMainModuleLoaded?.Invoke(this);
        }

        public void EvalFile(string fileName)
        {
            EvalFile(fileName, typeof(void));
        }

        public T EvalFile<T>(string fileName)
        {
            return (T)EvalFile(fileName, typeof(T));
        }

        public object EvalFile(string fileName, Type returnType)
        {
            var resolvedPath = ResolveFilePath("", fileName);
            if (resolvedPath != null)
            {
                var source = _fileSystem.ReadAllBytes(resolvedPath);
                return _mainContext.EvalSource(source, resolvedPath, returnType);
            }
            else
            {
                throw new Exception("can not resolve file path");
            }
        }

        public bool IsMainThread()
        {
            return _mainThreadId == Thread.CurrentThread.ManagedThreadId;
        }

        // main loop
        public void Update(int ms)
        {
            if (!_isValid || !_isRunning)
            {
                return;
            }

#if UNITY_EDITOR
            if (UnityEditor.EditorApplication.isCompiling)
            {
                ScriptEngine.Shutdown();
                _logger?.Write(LogLevel.Warn, "assembly reloading, shutdown script engine immediately");
                return;
            }
#endif

#if UNITY_EDITOR
            var isApplicationActive = UnityEditorInternal.InternalEditorUtility.isApplicationActive;
#else
            var isApplicationActive = true;
#endif
            ExecutePendingActions(isApplicationActive);

            OnUpdate?.Invoke(); //TODO: optimize
            ExecutePendingJob();

            // poll here;
            _timerManager.Update(ms);
            _autorelease.Drain();
        }

        public void ExecutePendingJob()
        {
            // Not reentrant. A job can evaluate a module, and js_inner_module_evaluation walks a
            // stack threaded through JSModuleDef.stack_prev - one field, shared by every traversal
            // in flight. Pumping from inside a job overlaps two of them, and the second one to
            // finish pops until it hits the module it started from, which is no longer on the
            // chain: it dereferences NULL and takes the process down. A host binding reaching back
            // into the engine is enough to get here - `document.querySelectorAll` evaluates a
            // script to marshal its result, and Vite's HMR client calls it at module scope, which
            // crashed the editor. The outer loop drains whatever the nested code queued, so
            // returning early loses nothing.
            if (_isPumpingJobs) return;

            _isPumpingJobs = true;
            try
            {
                JSContext ctx;
                while (true)
                {
                    var err = JSApi.JS_ExecutePendingJob(_rt, out ctx);

                    if (err >= 0)
                    {
                        if (!JSApi.JS_IsJobPending(_rt))
                        {
                            break;
                        }
                    }

                    if (err < 0)
                    {
                        ctx.print_exception();
                    }
                }
            }
            finally
            {
                _isPumpingJobs = false;
            }
        }

        private void ExecutePendingActions(bool isApplicationActive)
        {
            lock (_pendingActions)
            {
                while (_pendingActions.Count != 0)
                {
                    var action = _pendingActions.Dequeue();

                    if (!isApplicationActive && action.isDelayedUntilActive)
                    {
                        _delayedActions.Add(action);
                    }
                    else
                    {
                        _executingActions.Add(action);
                    }
                }
            }

            {
                var count = _executingActions.Count;
                if (count > 0)
                {
                    for (int i = 0; i < count; ++i)
                    {
                        var action = _executingActions[i];
                        try { action.callback(this, action.args, action.value); }
                        catch (Exception exception)
                        {
                            _logger?.WriteException(exception);
                        }
                    }
                    _executingActions.Clear();
                }
            }

            if (isApplicationActive)
            {
                var count = _delayedActions.Count;
                if (count != 0)
                {
                    for (int i = 0; i < count; ++i)
                    {
                        var action = _delayedActions[i];

                        try { action.callback(this, action.args, action.value); }
                        catch (Exception exception)
                        {
                            _logger?.WriteException(exception);
                        }
                    }
                    _delayedActions.Clear();
                }
            }
        }

        ~ScriptRuntime()
        {
#if JSB_DEBUG
            if (_isValid)
            {
                _logger?.Write(LogLevel.Assert, "should never happen, ensure the script runtime is explicitly closed always");
            }
#endif
            Destroy();
        }

        public void Shutdown()
        {
            if (IsMainThread())
            {
                Destroy();
            }
            else
            {
                _isRunning = false;
            }
        }

        public void Destroy()
        {
            if (!_isValid)
            {
                return;
            }
#if JSB_DEBUG
            _logger?.Write(LogLevel.Info, "destroying script runtime: {0}", _runtimeId);
#endif
            _isValid = false;
            try
            {
                for (int i = 0, count = _moduleResolvers.Count; i < count; i++)
                {
                    var resolver = _moduleResolvers[i];
                    resolver.Release();
                }
            }
            catch (Exception e)
            {
                _logger?.WriteException(e);
            }

            _isInitialized = false;
            _isRunning = false;

            _objectCollection.Clear();
            if (_objectCollection.count != 0)
            {
                _logger?.Write(LogLevel.Error, "invalid object collection state during the phase of destroying runtime: {0}", _objectCollection.count);
            }

            _timerManager.Destroy();
            _typeDB.Destroy();

            // execute all pending actions (enqueued in gc thread) before ObjectCahce disposing
            GC.Collect();
            GC.WaitForPendingFinalizers();
            ExecutePendingActions(true);

            //TODO unity-jsb: jsvalue's gc finalizer can't be certainly invoked when the jsvalue hasn't any reference, we just do not calling cache.Destroy normally for now.
            _objectCache.Destroy();

            //
            GC.Collect();
            GC.WaitForPendingFinalizers();
            ExecutePendingActions(true);

            for (int i = 0, count = _contextRefs.Count; i < count; i++)
            {
                var contextRef = _contextRefs[i];
                contextRef.target.Destroy();
            }

            _contextRefs.Clear();
            _mainContext = null;

            if (_asyncManager != null)
            {
                _asyncManager.Destroy();
                _asyncManager = null;
            }

            lock (_pendingActions)
            {
                if (_pendingActions.Count != 0)
                {
                    _logger?.Write(LogLevel.Assert, "unexpected pending actions");
                }
            }

            if (_delayedActions.Count != 0)
            {
                _logger?.Write(LogLevel.Assert, "unexpected delayed actions");
            }

            if (JSApi.JSB_FreeRuntime(_rt) == 0)
            {
                _logger?.Write(LogLevel.Assert, "gc object leaks");
            }

            var id = _runtimeId;
            _runtimeId = -1;
            _rt = JSRuntime.Null;

            try
            {
                OnAfterDestroy?.Invoke(id);
            }
            catch (Exception e)
            {
                _logger?.WriteException(e);
            }
        }

        public static implicit operator JSRuntime(ScriptRuntime se)
        {
            return se._rt;
        }
    }
}
