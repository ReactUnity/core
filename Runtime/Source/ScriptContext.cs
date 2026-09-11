using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using QuickJS.Binding;
using QuickJS.Native;
using QuickJS.Utils;

namespace QuickJS
{
    public partial class ScriptContext
    {
        public event Action<ScriptContext, string> OnScriptReloading;
        public event Action<ScriptContext, string> OnScriptReloaded;

        private ScriptRuntime _runtime;
        private Experimental.IJSApiBridge _apiBridge;
        private int _contextId;
        private JSContext _ctx;
        private AtomCache _atoms;
        private JSStringCache _stringCache;

        private JSValue _moduleCache; // commonjs module cache

        /// globally defined require function object, its only used in source evaluated from scratch (not module) (e.g dofile/eval)
        private JSValue _require;
        private JSValue _mainModule;
        private bool _isValid;
        private Regex _stRegex;

        private JSValue _globalObject;
        private JSValue _proxyConstructor;
        private JSValue _objectConstructor;
        private JSValue _numberConstructor;
        private JSValue _stringConstructor;
        private JSValue _moduleRejectHandler;
        private JSValue _moduleFulfillHandler;
        private struct PendingModule
        {
            public string Source;
            public string FileName;
        }

        private readonly Queue<PendingModule> _moduleEvalQueue = new Queue<PendingModule>();
        private bool _moduleGraphInFlight;

        private bool _isReloading;
        private List<string> _waitForReloadModules;
        private List<string> _moduleIdList;

        private TypeRegister _currentTypeRegister;

        // id = context slot index + 1
        public int id { get { return _contextId; } }

        public ScriptContext(ScriptRuntime runtime, int contextId, Experimental.IJSApiBridge apiBridge)
        {
            _isValid = true;
            _runtime = runtime;
            _apiBridge = apiBridge ?? new Experimental.DefaultJSApiBridgeImpl();
            _contextId = contextId;
            _ctx = JSApi.JS_NewContext(_runtime);
            JSApi.JS_SetContextOpaque(_ctx, (IntPtr)_contextId);
            _atoms = new AtomCache(_ctx);
            _moduleIdList = new List<string>();
            _stringCache = new JSStringCache(_ctx);
            _mainModule = JSApi.JS_NewObject(_ctx);
            _moduleCache = JSApi.JS_NewObject(_ctx);
            JSApi.JS_SetProperty(_ctx, _mainModule, GetAtom("cache"), JSApi.JS_DupValue(_ctx, _moduleCache));
            _globalObject = JSApi.JS_GetGlobalObject(_ctx);
            _objectConstructor = JSApi.JS_GetProperty(_ctx, _globalObject, JSApi.JS_ATOM_Object);
            _numberConstructor = JSApi.JS_GetProperty(_ctx, _globalObject, JSApi.JS_ATOM_Number);
            _proxyConstructor = JSApi.JS_GetProperty(_ctx, _globalObject, JSApi.JS_ATOM_Proxy);
            _stringConstructor = JSApi.JS_GetProperty(_ctx, _globalObject, JSApi.JS_ATOM_String);
            _moduleRejectHandler = JSApi.JS_UNDEFINED;
            _moduleFulfillHandler = JSApi.JS_UNDEFINED;
        }

        public void ReleaseTypeRegister(TypeRegister register)
        {
            _currentTypeRegister = null;
        }

        public TypeRegister CreateTypeRegister()
        {
            if (_currentTypeRegister == null)
            {
                _currentTypeRegister = new TypeRegister(this);
            }
            else
            {
                _currentTypeRegister.AddRef();
            }

            return _currentTypeRegister;
        }

        public bool IsValid()
        {
            lock (this)
            {
                return _isValid;
            }
        }

        public IAsyncManager GetAsyncManager()
        {
            return _isValid ? _runtime.GetAsyncManager() : null;
        }

        public ITimerManager GetTimerManager()
        {
            return _runtime.GetTimerManager();
        }

        public IScriptLogger GetLogger()
        {
            return _runtime.GetLogger();
        }

        public ITypeDB GetTypeDB()
        {
            return _runtime.GetTypeDB();
        }

        public ObjectCache GetObjectCache()
        {
            return _runtime.GetObjectCache();
        }

        public ScriptRuntime GetRuntime()
        {
            return _runtime;
        }

        public bool IsContext(JSContext ctx)
        {
            return ctx == _ctx;
        }

        //NOTE: 返回值不需要释放, context 销毁时会自动释放所管理的 Atom
        public JSAtom GetAtom(string name)
        {
            return _atoms.GetAtom(name);
        }

        public JSStringCache GetStringCache()
        {
            return _stringCache;
        }

        public void Destroy()
        {
            lock (this)
            {
                if (!_isValid)
                {
                    return;
                }
                _isValid = false;
            }

            _runtime.RemoveContext(this);
            _stringCache.Destroy();
            _atoms.Clear();

            JSApi.JS_FreeValue(_ctx, _proxyConstructor);
            JSApi.JS_FreeValue(_ctx, _objectConstructor);
            JSApi.JS_FreeValue(_ctx, _numberConstructor);
            JSApi.JS_FreeValue(_ctx, _stringConstructor);
            JSApi.JS_FreeValue(_ctx, _moduleRejectHandler);
            JSApi.JS_FreeValue(_ctx, _moduleFulfillHandler);
            JSApi.JS_FreeValue(_ctx, _globalObject);

            JSApi.JS_FreeValue(_ctx, _moduleCache);
            JSApi.JS_FreeValue(_ctx, _mainModule);
            JSApi.JS_FreeValue(_ctx, _require);
            JSApi.JS_FreeContext(_ctx);
            var id = _contextId;
            _contextId = -1;
            _ctx = JSContext.Null;
        }

        public void FreeValue(JSValue value)
        {
            _runtime.FreeValue(value);
        }

        public void FreeValues(JSValue[] values)
        {
            _runtime.FreeValues(values);
        }

        public unsafe void FreeValues(int argc, JSValue* values)
        {
            _runtime.FreeValues(argc, values);
        }

        ///<summary>
        /// 获取全局对象 (增加引用计数)
        ///</summary>
        public JSValue GetGlobalObject()
        {
            return JSApi.JS_DupValue(_ctx, _globalObject);
        }

        ///<summary>
        /// 获取 string.constructor (增加引用计数)
        ///</summary>
        public JSValue GetStringConstructor()
        {
            return JSApi.JS_DupValue(_ctx, _stringConstructor);
        }

        ///<summary>
        /// 获取 number.constructor (增加引用计数)
        ///</summary>
        public JSValue GetNumberConstructor()
        {
            return JSApi.JS_DupValue(_ctx, _numberConstructor);
        }

        public JSValue GetObjectConstructor()
        {
            return JSApi.JS_DupValue(_ctx, _objectConstructor);
        }

        public JSValue GetProxyConstructor()
        {
            return JSApi.JS_DupValue(_ctx, _proxyConstructor);
        }

        public bool CheckNumberType(JSValue jsValue)
        {
            //TODO: 是否成立? 否则需要使用 jsapi equals
            if (jsValue == _numberConstructor)
            {
                return true;
            }

            return false;
        }

        public bool CheckStringType(JSValue jsValue)
        {
            //TODO: 是否成立? 否则需要使用 jsapi equals
            if (jsValue == _stringConstructor)
            {
                return true;
            }

            return false;
        }

        //TODO: 改为消耗 exports_obj 计数
        // for special resolver (json/static) use
        // no specified parent module assignment
        public JSValue _new_commonjs_resolver_module(string module_id, string resolvername, JSValue exports_obj, bool loaded, bool set_as_main)
        {
            return _new_commonjs_module_entry(null, module_id, module_id, resolvername, exports_obj, loaded, set_as_main);
        }

        //TODO: 改为消耗 exports_obj 计数
        // for source script use
        public JSValue _new_commonjs_script_module(string parent_module_id, string module_id, string filename, JSValue exports_obj, bool loaded, bool set_as_main)
        {
            return _new_commonjs_module_entry(parent_module_id, module_id, filename, "source", exports_obj, loaded, set_as_main);
        }

        //TODO: 改为消耗 exports_obj 计数
        //NOTE: 返回值需要调用者 free
        public JSValue _new_commonjs_module_entry(string parent_module_id, string module_id, string filename, string resolvername, JSValue exports_obj, bool loaded, bool set_as_main)
        {
            var module_obj = set_as_main ? JSApi.JS_DupValue(_ctx, _mainModule) : JSApi.JS_NewObject(_ctx);
            var module_id_atom = GetAtom(module_id);
            var module_id_obj = JSApi.JS_AtomToString(_ctx, module_id_atom);
            var filename_atom = GetAtom(filename);
            var resolvername_atom = GetAtom(resolvername);

            if (!_moduleIdList.Contains(module_id))
            {
                _moduleIdList.Add(module_id);
            }
            JSApi.JS_SetProperty(_ctx, _moduleCache, module_id_atom, JSApi.JS_DupValue(_ctx, module_obj));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("id"), JSApi.JS_DupValue(_ctx, module_id_obj));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("filename"), JSApi.JS_AtomToString(_ctx, filename_atom));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("cache"), JSApi.JS_DupValue(_ctx, _moduleCache));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("loaded"), JSApi.JS_NewBool(_ctx, loaded));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("exports"), JSApi.JS_DupValue(_ctx, exports_obj));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("resolvername"), JSApi.JS_AtomToString(_ctx, resolvername_atom));
            JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("children"), JSApi.JS_NewArray(_ctx));
            JSApi.JS_FreeValue(_ctx, module_id_obj);

            // set parent/children here
            if (!string.IsNullOrEmpty(parent_module_id))
            {
                JSValue parent_mod_obj;
                if (LoadModuleCache(parent_module_id, out parent_mod_obj))
                {
                    var children_obj = JSApi.JS_GetProperty(_ctx, parent_mod_obj, GetAtom("children"));
                    if (JSApi.JS_IsArray(children_obj))
                    {
                        var lengthVal = JSApi.JS_GetProperty(_ctx, children_obj, JSApi.JS_ATOM_length);
                        if (lengthVal.IsNumber())
                        {
                            int length;
                            if (JSApi.JS_ToInt32(_ctx, out length, lengthVal) == 0 && length >= 0)
                            {
                                JSApi.JS_SetPropertyUint32(_ctx, children_obj, (uint)length, JSApi.JS_DupValue(_ctx, module_obj));
                            }
                        }
                        JSApi.JS_FreeValue(_ctx, lengthVal);
                    }
                    JSApi.JS_FreeValue(_ctx, children_obj);
                    JSApi.JS_SetProperty(_ctx, module_obj, GetAtom("parent"), parent_mod_obj);
                }
            }

            return module_obj;
        }


        public bool LoadModuleCacheExports(string module_id, string key, out JSValue value)
        {
            JSValue mod_obj;

            value = JSApi.JS_UNDEFINED;
            if (LoadModuleCache(module_id, out mod_obj))
            {
                var exports = JSApi.JS_GetProperty(_ctx, mod_obj, GetAtom("exports"));

                if (exports.IsObject())
                {
                    value = JSApi.JS_GetProperty(_ctx, exports, GetAtom(key));
                }

                JSApi.JS_FreeValue(_ctx, exports);
                JSApi.JS_FreeValue(_ctx, mod_obj);
            }

            return !value.IsUndefined();
        }

        public bool LoadModuleCache(string module_id, out JSValue value)
        {
            var prop = GetAtom(module_id);
            var mod = JSApi.JS_GetProperty(_ctx, _moduleCache, prop);
            if (mod.IsObject())
            {
                value = mod;
                return true;
            }
            value = JSApi.JS_UNDEFINED;
            JSApi.JS_FreeValue(_ctx, mod);
            return false;
        }

        public void BeginModuleReload()
        {
            if (!_isReloading)
            {
                _isReloading = true;
                _waitForReloadModules = new List<string>();
            }
        }

        public void MarkModuleReload(string module_id)
        {
            if (_isReloading && !_waitForReloadModules.Contains(module_id))
            {
                _waitForReloadModules.Add(module_id);
            }
        }

        public void EndModuleReload()
        {
            if (!_isReloading)
            {
                return;
            }

            while (_waitForReloadModules.Count > 0)
            {
                var module_id = _waitForReloadModules[0];

                if (!_runtime.ReloadModule(this, module_id))
                {
                    _waitForReloadModules.Remove(module_id);
                }
            }

            _isReloading = false;
            _waitForReloadModules = null;
        }

        public void RaiseScriptReloadingEvent_throw(string resolved_id)
        {
            OnScriptReloading?.Invoke(this, resolved_id);
        }

        public void RaiseScriptReloadedEvent_throw(string resolved_id)
        {
            OnScriptReloaded?.Invoke(this, resolved_id);
        }


        public bool TryGetModuleForReloading(string resolved_id, out JSValue module_obj)
        {
            if (_waitForReloadModules != null && _waitForReloadModules.Contains(resolved_id))
            {
                _waitForReloadModules.Remove(resolved_id);
                if (LoadModuleCache(resolved_id, out module_obj))
                {
                    return true;
                }
            }

            module_obj = JSApi.JS_UNDEFINED;
            return false;
        }

        // require(id);
        [MonoPInvokeCallback(typeof(JSCFunctionMagic))]
        public static unsafe JSValue module_require(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv, int magic)
        {
            if (argc < 1)
            {
                return ctx.ThrowInternalError("require module id");
            }

            if (!argv[0].IsString())
            {
                return ctx.ThrowInternalError("require module id (string)");
            }

#if JSB_WITH_ACTIVEFUNCTION
            // callee is the function <'require'> of current module
            var callee = JSApi.JS_GetActiveFunction(ctx);

            if (!JSApi.JS_IsFunction(ctx, callee))
            {
                return ctx.ThrowInternalError("require != function");
            }

            var context = ScriptEngine.GetContext(ctx);
            var runtime = context.GetRuntime();
            var parent_module_id_val = JSApi.JS_GetProperty(ctx, callee, context.GetAtom("moduleId"));
            var parent_module_id = JSApi.GetString(ctx, parent_module_id_val);
            JSApi.JS_FreeValue(ctx, parent_module_id_val);

            try
            {
                var module_id = JSApi.GetString(ctx, argv[0]);
                return runtime.ResolveModule(context, parent_module_id, module_id, false);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
#else
            try
            {
                var context = ScriptEngine.GetContext(ctx);
                var list = context._moduleIdList;
                string parent_module_id = null;
                if (magic >= 0 && magic < list.Count)
                {
                    parent_module_id = list[magic];
                }
                var runtime = context.GetRuntime();
                var module_id = JSApi.GetString(ctx, argv[0]);
                return runtime.ResolveModule(context, parent_module_id, module_id, false);
            }
            catch (Exception exception)
            {
                return ctx.ThrowException(exception);
            }
#endif
        }

        public JSValue _CreateRequireFunction(string resolved_id, JSValue module_obj)
        {
            var require_obj = JSApi.JSB_NewCFunctionMagic(_ctx, module_require, GetAtom("require"), 1, _moduleIdList.IndexOf(resolved_id));

            JSApi.JS_SetProperty(_ctx, require_obj, GetAtom("moduleId"), JSApi.JS_GetProperty(_ctx, module_obj, GetAtom("id")));
            JSApi.JS_SetProperty(_ctx, require_obj, GetAtom("main"), JSApi.JS_DupValue(_ctx, _mainModule));
            JSApi.JS_SetProperty(_ctx, require_obj, GetAtom("cache"), JSApi.JS_DupValue(_ctx, _moduleCache));
            return require_obj;
        }

        // this method will consume the module_obj refcount
        public unsafe JSValue LoadModuleFromSource(byte[] source, string resolved_id, string filename, JSValue module_obj)
        {
            object unused;
            return LoadModuleFromSource(source, resolved_id, filename, module_obj, null, out unused);
        }

        //TODO remove parameter: filename
        public unsafe JSValue LoadModuleFromSource(byte[] source, string resolved_id, string filename, JSValue module_obj, Type expectedReturnType, out object expectedReturnValue)
        {
            var context = this;
            var ctx = _ctx;
            var dirname = PathUtils.GetDirectoryName(resolved_id);
            var resolved_id_bytes = Utils.TextUtils.GetNullTerminatedBytes(resolved_id);
            var filename_obj = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("filename"));
            var module_id_atom = context.GetAtom(resolved_id);
            var dirname_atom = context.GetAtom(dirname);
            var require_obj = JSApi.JSB_NewCFunctionMagic(ctx, module_require, context.GetAtom("require"), 1, _moduleIdList.IndexOf(resolved_id));
            var main_mod_obj = JSApi.JS_DupValue(ctx, _mainModule);
            var dirname_obj = JSApi.JS_AtomToString(ctx, dirname_atom);
            var exports_obj = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("exports"));

            expectedReturnValue = null;
            JSApi.JS_SetProperty(ctx, require_obj, context.GetAtom("moduleId"), JSApi.JS_AtomToString(ctx, module_id_atom));
            JSApi.JS_SetProperty(ctx, require_obj, context.GetAtom("main"), main_mod_obj);
            JSApi.JS_SetProperty(ctx, require_obj, context.GetAtom("cache"), JSApi.JS_DupValue(ctx, _moduleCache));

            const int RequireArgNum = 5;
            var require_argv = stackalloc JSValue[RequireArgNum] { exports_obj, require_obj, module_obj, filename_obj, dirname_obj, };

            var tagValue = ScriptRuntime.TryReadByteCodeTagValue(source);
            if (tagValue == ScriptRuntime.BYTECODE_COMMONJS_MODULE_TAG)
            {
                // bytecode
                fixed (byte* intput_ptr = source)
                {
                    var bytecodeFunc = JSApi.JS_ReadByteCode(ctx, intput_ptr + sizeof(uint), source.Length - sizeof(uint));

                    if (bytecodeFunc.IsFunctionByteCode())
                    {
                        var func_val = JSApi.JS_EvalFunction(ctx, bytecodeFunc); // it's CallFree (bytecodeFunc)
                        if (!JSApi.JS_IsFunction(ctx, func_val))
                        {
                            JSApi.JS_FreeValue(ctx, func_val);
                            JSApi.JS_FreeValue(ctx, RequireArgNum, require_argv);
                            return ctx.ThrowInternalError("failed to require bytecode module");
                        }

                        var rval = JSApi.JS_Call(ctx, func_val, JSApi.JS_UNDEFINED, RequireArgNum, require_argv);
                        JSApi.JS_FreeValue(ctx, func_val);
                        if (rval.IsException())
                        {
                            JSApi.JS_FreeValue(ctx, RequireArgNum, require_argv);
                            return rval;
                        }

                        // success
                        if (expectedReturnType != null)
                        {
                            Values.js_get_var(_ctx, rval, expectedReturnType, out expectedReturnValue);
                        }
                        else
                        {
                            expectedReturnValue = null;
                        }
                        JSApi.JS_FreeValue(ctx, rval);
                    }
                    else
                    {
                        JSApi.JS_FreeValue(ctx, bytecodeFunc);
                        JSApi.JS_FreeValue(ctx, RequireArgNum, require_argv);
                        return ctx.ThrowInternalError("failed to require bytecode module");
                    }
                }
            }
            else
            {
                // source
                var input_bytes = TextUtils.GetShebangNullTerminatedCommonJSBytes(source);
                fixed (byte* input_ptr = input_bytes)
                fixed (byte* resolved_id_ptr = resolved_id_bytes)
                {
                    var input_len = (size_t)(input_bytes.Length - 1);
                    var func_val = JSApi.JS_EvalSource(ctx, input_ptr, input_len, resolved_id_ptr);

                    if (func_val.IsException())
                    {
                        JSApi.JS_FreeValue(ctx, RequireArgNum, require_argv);
                        return func_val;
                    }

                    if (JSApi.JS_IsFunction(ctx, func_val))
                    {
                        var rval = JSApi.JS_Call(ctx, func_val, JSApi.JS_UNDEFINED, RequireArgNum, require_argv);
                        if (rval.IsException())
                        {
                            JSApi.JS_FreeValue(ctx, func_val);
                            JSApi.JS_FreeValue(ctx, RequireArgNum, require_argv);
                            return rval;
                        }

                        // success
                        if (expectedReturnType != null)
                        {
                            Values.js_get_var(_ctx, rval, expectedReturnType, out expectedReturnValue);
                        }
                        else
                        {
                            expectedReturnValue = null;
                        }
                        JSApi.JS_FreeValue(ctx, rval);
                    }

                    JSApi.JS_FreeValue(ctx, func_val);
                }
            }

            JSApi.JS_SetProperty(ctx, module_obj, context.GetAtom("loaded"), JSApi.JS_NewBool(ctx, true));
            var exports_ = JSApi.JS_GetProperty(ctx, module_obj, context.GetAtom("exports"));
            JSApi.JS_FreeValue(ctx, RequireArgNum, require_argv);
            return exports_;
        }

        /// <summary>
        /// Add a function to globalThis (will overwrite anything with a same name if already existed)
        /// </summary>
        public void AddGlobalFunction(string name, JSCFunction func, int length)
        {
            var nameAtom = GetAtom(name);
            var cfun = JSApi.JSB_NewCFunction(_ctx, func, nameAtom, length);
            JSApi.JS_DefinePropertyValue(_ctx, _globalObject, nameAtom, cfun);
        }

        public void AddFunction(JSValue thisObject, string name, JSCFunction func, int length)
        {
            var nameAtom = GetAtom(name);
            var cfun = JSApi.JSB_NewCFunction(_ctx, func, nameAtom, length);
            JSApi.JS_DefinePropertyValue(_ctx, thisObject, nameAtom, cfun);
        }

        public static ClassDecl Bind(TypeRegister register)
        {
            var ns_jsb = register.CreateClass("JSBObject");

            ns_jsb.AddFunction("DoFile", _DoFile, 1);
            ns_jsb.AddFunction("AddSearchPath", _AddSearchPath, 1);
            ns_jsb.AddFunction("Yield", yield_func, 1);
            ns_jsb.AddFunction("ToArray", to_js_array, 1);
            ns_jsb.AddFunction("ToArrayBuffer", to_js_array_buffer, 1);
            ns_jsb.AddFunction("ToBytes", to_cs_bytes, 1);
            ns_jsb.AddFunction("ToFunction", to_js_function, 1);
            ns_jsb.AddFunction("ToDelegate", to_cs_delegate, 1);
            ns_jsb.AddFunction("Import", js_import_type, 2);
            ns_jsb.AddFunction("$LoadType", js_load_type, 2);
            ns_jsb.AddFunction("GC", _gc, 0);
            ns_jsb.AddFunction("SetDisposable", _set_disposable, 2);
            ns_jsb.AddFunction("AddCacheString", _add_cache_string, 1);
            ns_jsb.AddFunction("RemoveCacheString", _remove_cache_string, 1);
            ns_jsb.AddFunction("Sleep", _sleep, 1);
            ns_jsb.AddFunction("AddModule", _add_module, 2);
            ns_jsb.AddFunction("Now", _now, 0);
            ns_jsb.AddFunction("IsStaticBinding", _IsStaticBinding, 0);
            ns_jsb.AddConstValue("engine", JSApi.JSBDLL);
            ns_jsb.AddConstValue("version", JSApi.SO_JSB_VERSION);
            ns_jsb.AddConstValue("pluginVersion", JSApi.VERSION);
            {
                var ns_hotfix = register.CreateClass("JSBHotfix");
                ns_hotfix.AddFunction("replace_single", hotfix_replace_single, 2);
                ns_hotfix.AddFunction("before_single", hotfix_before_single, 2);
                // ns_hotfix.AddFunction("replace", hotfix_replace, 2);
                // ns_hotfix.AddFunction("before", hotfix_before);
                // ns_hotfix.AddFunction("after", hotfix_after);

                ns_jsb.AddValue("hotfix", ns_hotfix.GetConstructor());
            }
            {
                var ns_ModuleManager = register.CreateClass("ModuleManager");
                ns_ModuleManager.AddFunction("BeginReload", ModuleManager_BeginReload, 0);
                ns_ModuleManager.AddFunction("MarkReload", ModuleManager_MarkReload, 1);
                ns_ModuleManager.AddFunction("EndReload", ModuleManager_EndReload, 0);

                ns_jsb.AddValue("ModuleManager", ns_ModuleManager.GetConstructor());
            }
            return ns_jsb;
        }

        public JSValue _LoadType(string module_id, string topLevelNamespace)
        {
            return _runtime._LoadType(this, module_id, topLevelNamespace);
        }

        public void EvalSource(string source, string fileName)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(source);
            EvalSource(bytes, fileName, typeof(void));
        }

        public T EvalSource<T>(string source, string fileName)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(source);
            return (T)EvalSource(bytes, fileName, typeof(T));
        }

        /// Evaluates as an ES module rather than a script, so `import.meta`, `export` and dynamic
        /// `import()` are all legal. The body runs off the job queue, so pump the runtime after.
        public T EvalModule<T>(string source, string fileName)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(source);
            return (T)EvalSource(bytes, fileName, typeof(T), true);
        }

        /// Evaluates as an ES module whose imports are fetched by the runtime's async module
        /// loader, so a specifier can name something the host has to go and get.
        ///
        /// Returns as soon as the graph has been started, which is the point of it - nothing has
        /// evaluated yet. A graph that needs nothing from the loader still finishes on the job
        /// queue, so pump the runtime after; one that is waiting on a request finishes over the
        /// following updates instead, and reports a failure through the logger.
        ///
        /// Requires an AsyncModuleLoader to be installed. Without one the engine has no way to
        /// answer a request and the graph rejects.
        ///
        /// Graphs are evaluated one at a time, in the order they were handed over. A document's
        /// module scripts run in document order in a browser, and the entry point relies on it:
        /// Vite's React preamble is an inline module that has to install its refresh hooks before
        /// the app module it precedes is evaluated. Started concurrently they race, and the app
        /// loses often enough to fail with "@vitejs/plugin-react can't detect preamble".
        ///
        /// Only host-initiated roots queue here. A dynamic `import()` inside JS is resolved by the
        /// engine through the loader and never reaches this method, so nothing an evaluating graph
        /// awaits can be stuck behind it.
        public void EvalModuleAsync(string source, string fileName)
        {
            if (_moduleGraphInFlight)
            {
                _moduleEvalQueue.Enqueue(new PendingModule { Source = source, FileName = fileName });
                return;
            }

            _moduleGraphInFlight = true;
            try
            {
                EvalModuleAsyncNow(source, fileName);
            }
            catch
            {
                // A root that never started settles nothing, so release the queue before the
                // parse error goes up to the caller.
                _OnModuleGraphSettled();
                throw;
            }
        }

        /// Starts the next queued graph, if the one that just settled was not the last.
        private void _OnModuleGraphSettled()
        {
            _moduleGraphInFlight = false;

            while (!_moduleGraphInFlight && _moduleEvalQueue.Count > 0)
            {
                var next = _moduleEvalQueue.Dequeue();
                _moduleGraphInFlight = true;
                try
                {
                    EvalModuleAsyncNow(next.Source, next.FileName);
                }
                catch (Exception ex)
                {
                    // One bad root must not strand the ones behind it.
                    _moduleGraphInFlight = false;
                    ScriptEngine.GetLogger(_ctx)?.Write(LogLevel.Error, "failed to evaluate module '{0}': {1}", next.FileName, ex.Message);
                }
            }
        }

        private unsafe void EvalModuleAsyncNow(string source, string fileName)
        {
            var input_bytes = TextUtils.GetNullTerminatedBytes(source);
            var fn_bytes = TextUtils.GetNullTerminatedBytes(fileName);

            fixed (byte* input_ptr = input_bytes)
            fixed (byte* fn_ptr = fn_bytes)
            {
                var promise = JSApi.JS_EvalModuleAsync(_ctx, input_ptr, (size_t)(input_bytes.Length - 1), fn_ptr);

                if (JSApi.JS_IsException(promise))
                {
                    // A parse error in the root, which is the only failure that surfaces here:
                    // everything past compiling the root settles the promise instead.
                    var ex = _ctx.GetExceptionString();
                    JSApi.JS_FreeValue(_ctx, promise);
                    throw new JSException(ex, fileName);
                }

                _WatchModuleGraph(promise);
                JSApi.JS_FreeValue(_ctx, promise);
            }
        }

        /// Reports a graph that failed after EvalModuleAsync returned, which is the only place it
        /// can be reported at all.
        // This names the failure as a module-graph one; it does not replace the tracker's
        // "unhandled promise rejection". Measured, not assumed: a rejected Vite graph logs both,
        // because the promises the graph rejects inside itself are separate from the one attached
        // to here.
        private unsafe void _WatchModuleGraph(JSValue promise)
        {
            var then = JSApi.JS_GetProperty(_ctx, promise, GetAtom("then"));

            if (JSApi.JS_IsFunction(_ctx, then))
            {
                // One handler per context, not one per module: JSB_NewCFunction roots the
                // delegate for good, so a fresh one per graph leaks a GCHandle on every hot
                // reload.
                if (_moduleRejectHandler.IsUndefined())
                {
                    _moduleRejectHandler = JSApi.JSB_NewCFunction(_ctx, _module_graph_rejected, GetAtom("onRejected"), 1);
                    _moduleFulfillHandler = JSApi.JSB_NewCFunction(_ctx, _module_graph_fulfilled, GetAtom("onFulfilled"), 1);
                }

                var argv = stackalloc JSValue[2];
                argv[0] = _moduleFulfillHandler;
                argv[1] = _moduleRejectHandler;

                var rval = JSApi.JS_Call(_ctx, then, promise, 2, argv);
                if (rval.IsException()) _ctx.print_exception();

                JSApi.JS_FreeValue(_ctx, rval);
                JSApi.JS_FreeValue(_ctx, then);
                return;
            }

            JSApi.JS_FreeValue(_ctx, then);

            // Nothing to settle against, so the queue would stall behind this graph.
            _OnModuleGraphSettled();
        }

        [MonoPInvokeCallback(typeof(JSCFunction))]
        private static JSValue _module_graph_rejected(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            var reason = argc > 0 ? ctx.FormatException(argv[0]) : "(no reason given)";
            ScriptEngine.GetLogger(ctx)?.Write(LogLevel.Error, "failed to load module graph: {0}", reason);
            ScriptEngine.GetContext(ctx)?._OnModuleGraphSettled();
            return JSApi.JS_UNDEFINED;
        }

        // One shared handler for every graph, like the reject one above and for the same reason.
        // It carries no per-graph state because it needs none: exactly one graph is ever in
        // flight, so "a graph settled" is all the queue has to know.
        [MonoPInvokeCallback(typeof(JSCFunction))]
        private static JSValue _module_graph_fulfilled(JSContext ctx, JSValue this_obj, int argc, JSValue[] argv)
        {
            ScriptEngine.GetContext(ctx)?._OnModuleGraphSettled();
            return JSApi.JS_UNDEFINED;
        }

        public void EvalSource(byte[] source, string fileName)
        {
            EvalSource(source, fileName, typeof(void));
        }

        public T EvalSource<T>(byte[] source, string fileName)
        {
            return (T)EvalSource(source, fileName, typeof(T));
        }

        public object EvalSource(byte[] source, string fileName, Type returnType)
        {
            return EvalSource(source, fileName, returnType, false);
        }

        public object EvalSource(byte[] source, string fileName, Type returnType, bool bModule)
        {
            var jsValue = ScriptRuntime.EvalSource(_ctx, source, fileName, bModule);
            if (JSApi.JS_IsException(jsValue))
            {
                var ex = _ctx.GetExceptionString();
                JSApi.JS_FreeValue(_ctx, jsValue);
                throw new JSException(ex, fileName);
            }
            object retObject;
            Values.js_get_var(_ctx, jsValue, returnType, out retObject);
            JSApi.JS_FreeValue(_ctx, jsValue);
            return retObject;
        }

        public void RegisterBuiltins()
        {
            var ctx = (JSContext)this;
            var global_object = this.GetGlobalObject();
            {
                _require = JSApi.JSB_NewCFunctionMagic(ctx, module_require, GetAtom("require"), 1, -1);
                JSApi.JS_SetProperty(ctx, _require, GetAtom("moduleId"), ctx.NewString(""));
                JSApi.JS_SetProperty(ctx, _require, GetAtom("cache"), JSApi.JS_DupValue(ctx, _moduleCache));
                JSApi.JS_SetProperty(ctx, global_object, GetAtom("require"), JSApi.JS_DupValue(ctx, _require));
                JSApi.JS_SetProperty(ctx, global_object, GetAtom("define"), JSApi.JSB_NewCFunction(ctx, ScriptRuntime.module_define, GetAtom("define"), 3));

                JSApi.JS_SetProperty(ctx, global_object, GetAtom("print"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("print"), 1, 0));
                var console = JSApi.JS_NewObject(ctx);
                {
                    JSApi.JS_SetProperty(ctx, console, GetAtom("log"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("log"), 1, 0));
                    JSApi.JS_SetProperty(ctx, console, GetAtom("info"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("info"), 1, 0));
                    JSApi.JS_SetProperty(ctx, console, GetAtom("debug"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("debug"), 1, 0));
                    JSApi.JS_SetProperty(ctx, console, GetAtom("warn"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("warn"), 1, 1));
                    JSApi.JS_SetProperty(ctx, console, GetAtom("error"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("error"), 1, 2));
                    JSApi.JS_SetProperty(ctx, console, GetAtom("assert"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("assert"), 1, 3));
                    JSApi.JS_SetProperty(ctx, console, GetAtom("trace"), JSApi.JSB_NewCFunctionMagic(ctx, _print, GetAtom("trace"), 0, -1));
                }
                JSApi.JS_SetProperty(ctx, global_object, GetAtom("console"), console);
            }
            JSApi.JS_FreeValue(ctx, global_object);
        }

        private string js_source_position(JSContext ctx, string funcName, string fileName, int lineNumber)
        {
            return $"{funcName} ({fileName}:{lineNumber})";
        }

        public void AppendStacktrace(StringBuilder sb)
        {
            var ctx = _ctx;
            var globalObject = JSApi.JS_GetGlobalObject(ctx);
            var errorConstructor = JSApi.JS_GetProperty(ctx, globalObject, JSApi.JS_ATOM_Error);
            var errorObject = JSApi.JS_CallConstructor(ctx, errorConstructor);
            var stackValue = JSApi.JS_GetProperty(ctx, errorObject, JSApi.JS_ATOM_stack);
            var stack = JSApi.GetString(ctx, stackValue);

            if (!string.IsNullOrEmpty(stack))
            {
                var errlines = stack.Split('\n');
                if (_stRegex == null)
                {
                    _stRegex = new Regex(@"^\s+at\s(.+)\s\((.+\.js):(\d+)\)(.*)$", RegexOptions.Compiled);
                }
                for (var i = 0; i < errlines.Length; i++)
                {
                    var line = errlines[i];
                    if (i == 0 && line == "Error")
                    {
                        continue;
                    }
                    var matches = _stRegex.Matches(line);
                    if (matches.Count == 1)
                    {
                        var match = matches[0];
                        if (match.Groups.Count >= 4)
                        {
                            var funcName = match.Groups[1].Value;
                            var fileName = match.Groups[2].Value;
                            var lineNumber = 0;
                            int.TryParse(match.Groups[3].Value, out lineNumber);
                            var extra = match.Groups.Count >= 5 ? match.Groups[4].Value : "";
                            var sroucePosition = (_runtime.OnSourceMap ?? js_source_position)(ctx, funcName, fileName, lineNumber);
                            sb.AppendLine($"    at {sroucePosition}{extra}");
                            continue;
                        }
                    }
                    sb.AppendLine(line);
                }
            }

            JSApi.JS_FreeValue(ctx, stackValue);
            JSApi.JS_FreeValue(ctx, errorObject);
            JSApi.JS_FreeValue(ctx, errorConstructor);
            JSApi.JS_FreeValue(ctx, globalObject);
        }


        /// <summary>
        /// 用于对 c# 对象产生 js 包装对象 (不负责自动 Dispose)
        /// </summary>
        /// <param name="ctx">JS 环境</param>
        /// <param name="o">CS 对象</param>
        /// <returns>映射对象</returns>
        public JSValue NewBridgeObjectBind(object o)
        {
            var cache = _runtime.GetObjectCache();
            JSValue heapptr;
            if (cache.TryGetJSValue(o, out heapptr))
            {
                return JSApi.JS_DupValue(_ctx, heapptr);
            }

            var type = o.GetType();
            var db = this.GetTypeDB();
            var proto = db.GetPrototypeOf(type.BaseType == typeof(MulticastDelegate) ? typeof(Delegate) : type);

            if (proto.IsNullish())
            {
                db.GetDynamicType(type, false);
                proto = db.GetPrototypeOf(type);
                if (proto.IsNullish())
                {
                    return _ctx.ThrowInternalError(string.Format("no prototype found for {0}", type));
                }
            }

            return _apiBridge.NewBridgeObject(this, o, proto);
        }

        public JSPayloadHeader GetPayloadHeader(JSValue val)
        {
            return _apiBridge.GetPayloadHeader(this, val);
        }

        public static implicit operator JSContext(ScriptContext sc)
        {
            return sc != null ? sc._ctx : JSContext.Null;
        }
    }
}
