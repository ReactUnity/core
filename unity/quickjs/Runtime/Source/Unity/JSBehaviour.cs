#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEngine.Serialization;

    public class JSBehaviour : MonoBehaviour, ISerializationCallbackReceiver, IScriptEditorSupport, IScriptInstancedObject, Utils.IObjectCollectionEntry
    {
        // 在编辑器运行时下与 js 脚本建立链接关系
        [SerializeField]
        [FormerlySerializedAs("scriptRef")]
        private JSScriptRef _scriptRef;

        public JSScriptRef scriptRef { get { return _scriptRef; } set { _scriptRef = value; } }

        [SerializeField]
        private JSScriptProperties _properties;

        // internal use only
        public JSScriptProperties properties => _properties;

        // unsafe, internal use only
        public JSContext ctx => _ctx;

        private bool _isScriptInstanced = false;

        public bool isScriptInstanced => _isScriptInstanced;

#if UNITY_EDITOR
        // self controlled script instance lifetime 
        private bool _isStandaloneScript = false;
        public bool isStandaloneScript => _isStandaloneScript;
#else
        public bool isStandaloneScript => true;
#endif

        protected JSContext _ctx = JSContext.Null;
        private Utils.ObjectCollection.Handle _handle;

        protected JSValue _this_obj = JSApi.JS_UNDEFINED;

        private bool _startValid;
        private JSValue _startFunc = JSApi.JS_UNDEFINED;

        private bool _resetValid;
        private JSValue _resetFunc = JSApi.JS_UNDEFINED;

        private bool _onEnableValid;
        private JSValue _onEnableFunc = JSApi.JS_UNDEFINED;

        private bool _onDisableValid;
        private JSValue _onDisableFunc = JSApi.JS_UNDEFINED;

        private bool _onDestroyValid;
        private JSValue _onDestroyFunc = JSApi.JS_UNDEFINED;

        private bool _awakeValid;
        private JSValue _awakeFunc = JSApi.JS_UNDEFINED;

        private bool _onBeforeSerializeValid;
        private JSValue _onBeforeSerializeFunc = JSApi.JS_UNDEFINED;

        private bool _onAfterDeserializeValid;
        private JSValue _onAfterDeserializeFunc = JSApi.JS_UNDEFINED;

        private bool _onBeforeScriptReloadValid;
        private JSValue _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;

        private bool _onAfterScriptReloadValid;
        private JSValue _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;

#if UNITY_EDITOR
        private bool _onDrawGizmosValid;
        private JSValue _onDrawGizmosFunc = JSApi.JS_UNDEFINED;
#endif

        public bool IsValid()
        {
            return _ctx.IsValid() && !_this_obj.IsNullish();
        }

        public int IsInstanceOf(JSValue ctor)
        {
            if (!IsValid())
            {
                return 0;
            }
            return JSApi.JS_IsInstanceOf(_ctx, _this_obj, ctor);
        }

        public JSValue CloneValue()
        {
            if (!IsValid())
            {
                return JSApi.JS_UNDEFINED;
            }
            return JSApi.JS_DupValue(_ctx, _this_obj);
        }

        public JSValue GetProperty(string key)
        {
            if (!IsValid())
            {
                return JSApi.JS_UNDEFINED;
            }

            return JSApi.JS_GetPropertyStr(_ctx, _this_obj, key);
        }

        public static bool IsUpdatable(ScriptContext context, JSValue prototype)
        {
            return prototype.CheckFuncProperty(context, "Update")
                || prototype.CheckFuncProperty(context, "LateUpdate")
                || prototype.CheckFuncProperty(context, "FixedUpdate");
        }

        // 在 gameObject 上创建一个新的脚本组件实例
        // ctor: js class
        public static JSValue SetScriptInstance(GameObject gameObject, JSContext ctx, JSValue ctor, bool execAwake)
        {
            if (JSApi.JS_IsConstructor(ctx, ctor) == 1)
            {
                var header = JSApi.jsb_get_payload_header(ctx, ctor);
                if (header.type_id == BridgeObjectType.None) // it's a plain js value
                {
                    var fullCap = false;
                    var prototype = JSApi.JS_GetProperty(ctx, ctor, JSApi.JS_ATOM_prototype);
                    var context = ScriptEngine.GetContext(ctx);
                    if (!prototype.IsException())
                    {
                        if (context != null)
                        {
                            fullCap = IsUpdatable(context, prototype);
                        }
                    }
                    JSApi.JS_FreeValue(ctx, prototype);
                    var bridge = fullCap ? gameObject.AddComponent<JSBehaviourFull>() : gameObject.AddComponent<JSBehaviour>();
#if UNITY_EDITOR
                    context.TrySetScriptRef(ref bridge._scriptRef, ctor);
#endif
                    return bridge.SetScriptInstance(ctx, ctor, execAwake);
                }
            }

            return JSApi.JS_UNDEFINED;
        }

        public void SetUnresolvedScriptInstance()
        {
            _isScriptInstanced = true;
        }

        public void ReleaseScriptInstance()
        {
            _isScriptInstanced = false;
            ReleaseJSValues();
        }

        // 在当前 JSBehaviour 实例上创建一个脚本实例并与之绑定
        public JSValue SetScriptInstance(JSContext ctx, JSValue ctor, bool execAwake)
        {
            if (JSApi.JS_IsConstructor(ctx, ctor) == 1)
            {
                var header = JSApi.jsb_get_payload_header(ctx, ctor);
                if (header.type_id == BridgeObjectType.None) // it's a plain js value
                {
                    var objectCache = ScriptEngine.GetObjectCache(ctx);

                    // 旧的绑定值释放？
                    OnUnbindingObject(ctx, _this_obj);
                    var object_id = objectCache.AddObject(this, false);
                    var val = JSApi.jsb_construct_bridge_object(ctx, ctor, object_id);
                    if (val.IsException())
                    {
                        objectCache.RemoveObject(object_id);
                        SetUnresolvedScriptInstance();
                    }
                    else
                    {
                        objectCache.AddJSValue(this, val);
                        this._SetScriptInstance(ctx, val, execAwake);
                    }

                    return val;
                }
            }

            SetUnresolvedScriptInstance();
            return JSApi.JS_UNDEFINED;
        }

        private void _SetScriptInstance(JSContext ctx, JSValue this_obj, bool execAwake)
        {
            var runtime = ScriptEngine.GetRuntime(ctx);
            var context = runtime?.GetContext(ctx);
            if (context == null)
            {
                return;
            }

            ReleaseJSValues();
            _ctx = ctx;
            runtime.AddManagedObject(this, out _handle);
#if UNITY_EDITOR
            context.OnScriptReloading += OnScriptReloading;
            context.OnScriptReloaded += OnScriptReloaded;
#endif

            _isScriptInstanced = true;
            _this_obj = JSApi.JS_DupValue(ctx, this_obj);

            if (!_this_obj.IsNullish())
            {
                this.OnBindingJSFuncs(context);
                this._OnScriptingAfterDeserialize();
                if (execAwake)
                {
                    JSScriptableObject._CallJSFunc(context, _this_obj, _awakeFunc);
                    if (enabled && _onEnableValid)
                    {
                        JSScriptableObject._CallJSFunc(context, _this_obj, _onEnableFunc);
                    }
                }
            }
        }

        protected virtual void OnBindingJSFuncs(ScriptContext context)
        {
            _onBeforeSerializeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeSerialize"));
            _onBeforeSerializeValid = JSApi.JS_IsFunction(ctx, _onBeforeSerializeFunc) == 1;

            _onAfterDeserializeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterDeserialize"));
            _onAfterDeserializeValid = JSApi.JS_IsFunction(ctx, _onAfterDeserializeFunc) == 1;

            _onBeforeScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeScriptReload"));
            _onBeforeScriptReloadValid = JSApi.JS_IsFunction(ctx, _onBeforeScriptReloadFunc) == 1;

            _onAfterScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterScriptReload"));
            _onAfterScriptReloadValid = JSApi.JS_IsFunction(ctx, _onAfterScriptReloadFunc) == 1;

            _startFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("Start"));
            _startValid = JSApi.JS_IsFunction(ctx, _startFunc) == 1;

            _resetFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("Reset"));
            _resetValid = JSApi.JS_IsFunction(ctx, _resetFunc) == 1;

            _onEnableFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnEnable"));
            _onEnableValid = JSApi.JS_IsFunction(ctx, _onEnableFunc) == 1;

            _onDisableFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDisable"));
            _onDisableValid = JSApi.JS_IsFunction(ctx, _onDisableFunc) == 1;

#if UNITY_EDITOR
            _onDrawGizmosFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDrawGizmos"));
            _onDrawGizmosValid = JSApi.JS_IsFunction(ctx, _onDrawGizmosFunc) == 1;
#endif

            _onDestroyFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDestroy"));
            _onDestroyValid = JSApi.JS_IsFunction(ctx, _onDestroyFunc) == 1;

            _awakeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("Awake"));
            _awakeValid = JSApi.JS_IsFunction(ctx, _awakeFunc) == 1;

            if (Application.isPlaying)
            {
                if (JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnBecameVisible")) == 1
                || JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnBecameInvisible")) == 1)
                {
                    SetupMonoBehaviourCallback(typeof(JSBecameVisibleCallback));
                }

                if (JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnCollisionEnter")) == 1
                || JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnCollisionExit")) == 1
                || JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnCollisionStay")) == 1)
                {
                    SetupMonoBehaviourCallback(typeof(JSCollisionCallback));
                }

                if (JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnApplicationFocus")) == 1
                || JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnApplicationPause")) == 1
                || JSApi.JS_HasProperty(ctx, _this_obj, context.GetAtom("OnApplicationQuit")) == 1)
                {
                    SetupMonoBehaviourCallback(typeof(JSApplicationCallback));
                }
            }
        }

        public void SetupMonoBehaviourCallback(Type type)
        {
            if (type != null && type.IsSubclassOf(typeof(MonoBehaviour)))
            {
                var go = gameObject;
                if (go && !go.GetComponent(type))
                {
                    go.AddComponent(type);
                }
            }
        }

        protected virtual void OnUnbindingJSFuncs()
        {
            JSApi.JS_FreeValue(_ctx, _startFunc);
            _startFunc = JSApi.JS_UNDEFINED;
            _startValid = false;

            JSApi.JS_FreeValue(_ctx, _resetFunc);
            _resetFunc = JSApi.JS_UNDEFINED;
            _resetValid = false;

            JSApi.JS_FreeValue(_ctx, _onEnableFunc);
            _onEnableFunc = JSApi.JS_UNDEFINED;
            _onEnableValid = false;

            JSApi.JS_FreeValue(_ctx, _onDisableFunc);
            _onDisableFunc = JSApi.JS_UNDEFINED;
            _onDisableValid = false;

#if UNITY_EDITOR

            JSApi.JS_FreeValue(_ctx, _onDrawGizmosFunc);
            _onDrawGizmosFunc = JSApi.JS_UNDEFINED;
            _onDrawGizmosValid = false;
#endif

            JSApi.JS_FreeValue(_ctx, _onDestroyFunc);
            _onDestroyFunc = JSApi.JS_UNDEFINED;
            _onDestroyValid = false;

            JSApi.JS_FreeValue(_ctx, _awakeFunc);
            _awakeFunc = JSApi.JS_UNDEFINED;
            _awakeValid = false;

            JSApi.JS_FreeValue(_ctx, _onBeforeSerializeFunc);
            _onBeforeSerializeFunc = JSApi.JS_UNDEFINED;
            _onBeforeSerializeValid = false;

            JSApi.JS_FreeValue(_ctx, _onAfterDeserializeFunc);
            _onAfterDeserializeFunc = JSApi.JS_UNDEFINED;
            _onAfterDeserializeValid = false;

            JSApi.JS_FreeValue(_ctx, _onBeforeScriptReloadFunc);
            _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;
            _onBeforeScriptReloadValid = false;

            JSApi.JS_FreeValue(_ctx, _onAfterScriptReloadFunc);
            _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;
            _onAfterScriptReloadValid = false;
        }

        public static void Dispatch(GameObject gameObject, string funcName)
        {
            if (gameObject)
            {
                foreach (var comp in gameObject.GetComponents<JSBehaviour>())
                {
                    comp._Dispatch(funcName);
                }
            }
        }

        public static void Dispatch(GameObject gameObject, string funcName, bool p1)
        {
            if (gameObject)
            {
                foreach (var comp in gameObject.GetComponents<JSBehaviour>())
                {
                    comp._Dispatch(funcName, p1);
                }
            }
        }

        public static void Dispatch(GameObject gameObject, string funcName, object p1)
        {
            if (gameObject)
            {
                foreach (var comp in gameObject.GetComponents<JSBehaviour>())
                {
                    comp._Dispatch(funcName, p1);
                }
            }
        }

        public void _Dispatch(string funcName)
        {
            if (!_this_obj.IsNullish())
            {
                var context = ScriptEngine.GetContext(_ctx);
                var atom = context.GetAtom(funcName);
                if (JSApi.JS_HasProperty(_ctx, _this_obj, atom) == 1)
                {
                    var rval = JSApi.JS_Invoke(_ctx, _this_obj, atom);
                    if (rval.IsException())
                    {
                        _ctx.print_exception();
                    }
                    else
                    {
                        JSApi.JS_FreeValue(_ctx, rval);
                    }
                }
            }
        }

        public unsafe void _Dispatch(string funcName, bool p1)
        {
            if (!_this_obj.IsNullish())
            {
                var context = ScriptEngine.GetContext(_ctx);
                var atom = context.GetAtom(funcName);
                if (JSApi.JS_HasProperty(_ctx, _this_obj, atom) == 1)
                {
                    var argv = stackalloc[] { Binding.Values.js_push_primitive(_ctx, p1) };
                    var rval = JSApi.JS_Invoke(_ctx, _this_obj, atom, 1, argv);
                    if (rval.IsException())
                    {
                        _ctx.print_exception();
                    }
                    else
                    {
                        JSApi.JS_FreeValue(_ctx, rval);
                    }
                    JSApi.JS_FreeValue(_ctx, argv[0]);
                }
            }
        }

        public unsafe void _Dispatch(string funcName, object p1)
        {
            if (!_this_obj.IsNullish())
            {
                var context = ScriptEngine.GetContext(_ctx);
                var atom = context.GetAtom(funcName);
                if (JSApi.JS_HasProperty(_ctx, _this_obj, atom) == 1)
                {
                    var argv = stackalloc[] { Binding.Values.js_push_var(_ctx, p1) };
                    var rval = JSApi.JS_Invoke(_ctx, _this_obj, atom, 1, argv);
                    if (rval.IsException())
                    {
                        _ctx.print_exception();
                    }
                    else
                    {
                        JSApi.JS_FreeValue(_ctx, rval);
                    }
                    JSApi.JS_FreeValue(_ctx, argv[0]);
                }
            }
        }

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            // it's dangerous, more protection are required during the process of context-destroying
            if (enabled)
            {
                OnDisable();
            }
            OnDestroy();
        }
        #endregion

#if UNITY_EDITOR
        private void OnScriptReloading(ScriptContext context, string resolved_id)
        {
            if (context.CheckModuleId(_scriptRef, resolved_id))
            {
                if (_onBeforeScriptReloadValid)
                {
                    JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onBeforeScriptReloadFunc);
                }
            }
        }

        private void OnScriptReloaded(ScriptContext context, string resolved_id)
        {
            if (context.CheckModuleId(_scriptRef, resolved_id))
            {
                if (!_this_obj.IsNullish())
                {
                    JSValue newClass;
                    if (context.LoadModuleCacheExports(resolved_id, _scriptRef.className, out newClass))
                    {
                        var prototype = JSApi.JS_GetProperty(context, newClass, context.GetAtom("prototype"));

                        if (prototype.IsObject())
                        {
                            OnUnbindingJSFuncs();
                            JSApi.JS_SetPrototype(context, _this_obj, prototype);
                            OnBindingJSFuncs(context);

                            if (_onAfterScriptReloadValid)
                            {
                                JSScriptableObject._CallJSFunc(context, _this_obj, _onAfterScriptReloadFunc);
                            }
                        }

                        JSApi.JS_FreeValue(context, prototype);
                        JSApi.JS_FreeValue(context, newClass);
                    }
                }
            }
        }
#endif

        void OnUnbindingObject(JSContext ctx, JSValue this_obj)
        {
            var payload = JSApi.JSB_FreePayload(ctx, this_obj);
            if (payload.type_id == BridgeObjectType.ObjectRef)
            {
                try
                {
                    ScriptEngine.GetObjectCache(ctx).RemoveObject(payload.value);
                }
                catch (Exception exception)
                {
                    ScriptEngine.GetLogger(ctx)?.WriteException(exception);
                }
            }
        }

        public void ReleaseJSValues()
        {
            if (!_this_obj.IsNullish())
            {
                OnUnbindingObject(_ctx, _this_obj);
                OnUnbindingJSFuncs();
                JSApi.JS_FreeValue(_ctx, _this_obj);
                _this_obj = JSApi.JS_UNDEFINED;
            }

            _isScriptInstanced = false;
            var runtime = ScriptEngine.GetRuntime(_ctx);
            var context = runtime?.GetContext(_ctx);
            _ctx = JSContext.Null;

            if (context != null)
            {
                runtime.RemoveManagedObject(_handle);
#if UNITY_EDITOR
                context.OnScriptReloading -= OnScriptReloading;
                context.OnScriptReloaded -= OnScriptReloaded;
#endif
            }
        }

        void Awake()
        {
#if UNITY_EDITOR
            _isStandaloneScript = true;
#endif
            CreateScriptInstance();
            // _OnScriptingAfterDeserialize();

            if (_awakeValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _awakeFunc);
            }
        }

        void Start()
        {
            if (_startValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _startFunc);
            }
        }

        public void Reset()
        {
            if (_resetValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _resetFunc);
            }
        }

        void OnEnable()
        {
            if (_onEnableValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onEnableFunc);
            }
        }

        void OnDisable()
        {
            if (_onDisableValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDisableFunc);
            }

#if UNITY_EDITOR
            if (UnityEditor.EditorApplication.isCompiling)
            {
                ReleaseJSValues();
            }
#endif
        }

#if UNITY_EDITOR
        void OnDrawGizmos()
        {
            if (_onDrawGizmosValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDrawGizmosFunc);
            }
        }
#endif

        void OnDestroy()
        {
            if (_onDestroyValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDestroyFunc);
            }
            ReleaseJSValues();
        }

        public void OnBeforeSerialize()
        {
            if (_onBeforeSerializeValid)
            {
                JSScriptableObject.ExecOnBeforeSerialize(ref _properties, _ctx, _this_obj, _onBeforeSerializeFunc);
            }
        }

        public void OnAfterDeserialize()
        {
            _OnScriptingAfterDeserialize();
        }

        public void _OnScriptingAfterDeserialize()
        {
            if (_onAfterDeserializeValid)
            {
                JSScriptableObject.ExecOnAfterDeserialize(ref _properties, _ctx, _this_obj, _onAfterDeserializeFunc);
            }
        }

        // 通过 scriptRef 还原脚本绑定关系
        public bool CreateScriptInstance()
        {
            if (!_isScriptInstanced)
            {
                if (!string.IsNullOrEmpty(_scriptRef.modulePath) && !string.IsNullOrEmpty(_scriptRef.className))
                {
                    var runtime = ScriptEngine.GetRuntime();
                    if (runtime != null && runtime.isInitialized)
                    {
                        var context = runtime.GetMainContext();
                        if (context != null)
                        {
                            var ctx = (JSContext)context;
                            var snippet = $"require('{_scriptRef.modulePath}')['{_scriptRef.className}']";
                            var bytes = System.Text.Encoding.UTF8.GetBytes(snippet);
                            var typeValue = ScriptRuntime.EvalSource(ctx, bytes, _scriptRef.sourceFile, false);
                            if (JSApi.JS_IsException(typeValue))
                            {
                                var ex = ctx.GetExceptionString();
                                Debug.LogError(ex);
                                SetUnresolvedScriptInstance();
                            }
                            else
                            {
                                var instValue = SetScriptInstance(ctx, typeValue, false);
                                JSApi.JS_FreeValue(ctx, instValue);
                                JSApi.JS_FreeValue(ctx, typeValue);
                            }
                        }
                    }
                    else
                    {
                        Debug.LogError("script runtime not ready");
                    }
                }
                else
                {
                    SetUnresolvedScriptInstance();
                }
            }

            return _isScriptInstanced;
        }
    }
}
#endif