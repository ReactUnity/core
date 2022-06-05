#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEngine.Serialization;

    // 实际 ScriptableObject.OnAfterDeserialize/OnEnable 可能早于 Runtime 初始化
    // 脚本回调与 C# 版本不完全一致

    [CreateAssetMenu(fileName = "js_data", menuName = "JSScriptableObject Asset", order = 100)]
    public class JSScriptableObject : ScriptableObject, ISerializationCallbackReceiver, IScriptEditorSupport, IScriptInstancedObject, Utils.IObjectCollectionEntry
    {
        // 在编辑器运行时下与 js 脚本建立链接关系
        [SerializeField]
        [FormerlySerializedAs("scriptRef")]
        private JSScriptRef _scriptRef;

        [SerializeField]
        private JSScriptProperties _properties;

        // internal use only
        public JSScriptProperties properties => _properties;

        [NonSerialized]
        private bool _enabled;

        [NonSerialized]
        private bool _isScriptInstanced = false;

        [NonSerialized]
        private bool _isWaitingRuntime = false;

        private JSContext _ctx = JSContext.Null;
        private Utils.ObjectCollection.Handle _handle;
        private JSValue _this_obj = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _resetValid;
        private JSValue _resetFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onBeforeSerializeValid;
        private JSValue _onBeforeSerializeFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onAfterDeserializeValid;
        private JSValue _onAfterDeserializeFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onBeforeScriptReloadValid;
        private JSValue _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onAfterScriptReloadValid;
        private JSValue _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;

        public bool enabled => _enabled;

        public bool isScriptInstanced => _isScriptInstanced;

        // self controlled script instance lifetime 
        public bool isStandaloneScript => true;

        JSScriptRef IScriptEditorSupport.scriptRef { get { return _scriptRef; } set { _scriptRef = value; } }

        public JSContext ctx => _ctx;

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

        public static void _CallJSFunc(JSContext ctx, JSValue this_obj, JSValue func_obj)
        {
            if (!this_obj.IsNullish() && JSApi.JS_IsFunction(ctx, func_obj) == 1)
            {
                var rval = JSApi.JS_Call(ctx, func_obj, this_obj);
                if (rval.IsException())
                {
                    ctx.print_exception();
                }
                else
                {
                    JSApi.JS_FreeValue(ctx, rval);
                }
            }
        }

        private void OnBindingJSFuncs(ScriptContext context)
        {
            var ctx = (JSContext)context;

            _onBeforeSerializeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeSerialize"));
            _onBeforeSerializeValid = JSApi.JS_IsFunction(ctx, _onBeforeSerializeFunc) == 1;

            _onAfterDeserializeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterDeserialize"));
            _onAfterDeserializeValid = JSApi.JS_IsFunction(ctx, _onAfterDeserializeFunc) == 1;

            _onBeforeScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeScriptReload"));
            _onBeforeScriptReloadValid = JSApi.JS_IsFunction(ctx, _onBeforeScriptReloadFunc) == 1;

            _onAfterScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterScriptReload"));
            _onAfterScriptReloadValid = JSApi.JS_IsFunction(ctx, _onAfterScriptReloadFunc) == 1;

            _resetFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("Reset"));
            _resetValid = JSApi.JS_IsFunction(ctx, _resetFunc) == 1;
        }

        private void OnUnbindingJSFuncs()
        {
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

            JSApi.JS_FreeValue(_ctx, _resetFunc);
            _resetFunc = JSApi.JS_UNDEFINED;
            _resetValid = false;
        }

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

            var runtime = ScriptEngine.GetRuntime(_ctx);
            var context = runtime?.GetContext(_ctx);
            _isScriptInstanced = false;
            if (_isWaitingRuntime)
            {
                _isWaitingRuntime = false;
                ScriptEngine.RuntimeInitialized -= OnRuntimeInitialized;
            }
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

#if UNITY_EDITOR
        private void OnScriptReloading(ScriptContext context, string resolved_id)
        {
            if (context.CheckModuleId(_scriptRef, resolved_id))
            {
                if (_onBeforeScriptReloadValid)
                {
                    var rval = JSApi.JS_Call(_ctx, _onBeforeScriptReloadFunc, _this_obj);
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
                                var rval = JSApi.JS_Call(_ctx, _onAfterScriptReloadFunc, _this_obj);
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

                        JSApi.JS_FreeValue(context, prototype);
                        JSApi.JS_FreeValue(context, newClass);
                    }
                }
            }
        }
#endif

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            ReleaseJSValues();
        }
        #endregion

        // 通过 scriptRef 还原脚本绑定关系
        public bool CreateScriptInstance()
        {
            if (!_isScriptInstanced)
            {
                if (!string.IsNullOrEmpty(_scriptRef.modulePath) && !string.IsNullOrEmpty(_scriptRef.className))
                {
                    var runtime = ScriptEngine.GetRuntime();
                    if (runtime != null && runtime.isInitialized && runtime.isValid)
                    {
                        var context = runtime.GetMainContext();
                        if (context != null)
                        {
                            var ctx = (JSContext)context;
                            var snippet = $"require('{_scriptRef.modulePath}')['{_scriptRef.className}']";
                            var bytes = System.Text.Encoding.UTF8.GetBytes(snippet);
                            var typeValue = ScriptRuntime.EvalSource(ctx, bytes, _scriptRef.sourceFile, false);
                            if (typeValue.IsException())
                            {
                                ctx.print_exception();
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
                        if (!_isWaitingRuntime)
                        {
                            _isWaitingRuntime = true;
                            ScriptEngine.RuntimeInitialized += OnRuntimeInitialized;
                        }
                    }
                }
                else
                {
                    SetUnresolvedScriptInstance();
                }
            }

            return _isScriptInstanced;
        }

        private void OnRuntimeInitialized(ScriptRuntime runtime)
        {
            if (_isWaitingRuntime)
            {
                _isWaitingRuntime = false;
                ScriptEngine.RuntimeInitialized -= OnRuntimeInitialized;
                CreateScriptInstance();
            }
        }

        // 在当前 JSBehaviour 实例上创建一个脚本实例并与之绑定
        public JSValue SetScriptInstance(JSContext ctx, JSValue ctor, bool execAwake)
        {
            if (JSApi.JS_IsConstructor(ctx, ctor) == 1)
            {
                var header = JSApi.jsb_get_payload_header(ctx, ctor);
                if (header.type_id == BridgeObjectType.None) // it's a plain js value
                {
                    var cache = ScriptEngine.GetObjectCache(ctx);

                    // 旧的绑定值释放？
                    OnUnbindingObject(ctx, _this_obj);
                    var object_id = cache.AddObject(this, false);
                    var val = JSApi.jsb_construct_bridge_object(ctx, ctor, object_id);
                    if (val.IsException())
                    {
                        cache.RemoveObject(object_id);
                        SetUnresolvedScriptInstance();
                    }
                    else
                    {
                        cache.AddJSValue(this, val);
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
            if (context == null || !context.IsValid())
            {
                return;
            }

            ReleaseJSValues();

            runtime.AddManagedObject(this, out _handle);
#if UNITY_EDITOR
            context.OnScriptReloading += OnScriptReloading;
            context.OnScriptReloaded += OnScriptReloaded;
#endif

            _ctx = ctx;
            _isScriptInstanced = true;
            _this_obj = JSApi.JS_DupValue(ctx, this_obj);

            if (!_this_obj.IsNullish())
            {
                OnBindingJSFuncs(context);
                this._OnScriptingAfterDeserialize();
            }
        }

        private void SetUnresolvedScriptInstance()
        {
            _isScriptInstanced = true;
        }

        public void ReleaseScriptInstance()
        {
            _isScriptInstanced = false;
            ReleaseJSValues();
        }

        public void Reset()
        {
            if (_resetValid)
            {
                var rval = JSApi.JS_Call(_ctx, _resetFunc, _this_obj);
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

        public void OnBeforeSerialize()
        {
            if (_onBeforeSerializeValid)
            {
                ExecOnBeforeSerialize(ref _properties, _ctx, _this_obj, _onBeforeSerializeFunc);
            }
        }

        void Awake()
        {
            //NOTE: only Awake will be called if using Scriptable.CreateInstance
            //      only OnAfterDeserialize will be called if deserializing from asset
        }

        public void OnAfterDeserialize()
        {
            if (_isScriptInstanced)
            {
                _OnScriptingAfterDeserialize();
            }
            else
            {
                CreateScriptInstance();
            }
        }

        public void _OnScriptingAfterDeserialize()
        {
            if (_onAfterDeserializeValid)
            {
                ExecOnAfterDeserialize(ref _properties, _ctx, _this_obj, _onAfterDeserializeFunc);
            }
        }

        public static void ExecOnAfterDeserialize(ref JSScriptProperties properties, JSContext ctx, JSValue this_obj, JSValue onAfterDeserializeFunc)
        {
            if (properties == null)
            {
                properties = new JSScriptProperties();
            }

            var buffer = new IO.ByteBuffer(properties.genericValueData);
            var context = new JSSerializationContext(properties);

            unsafe
            {
                var argv = stackalloc[] { Binding.Values.js_push_classvalue(ctx, context), Binding.Values.js_push_classvalue(ctx, buffer) };
                var rval = JSApi.JS_Call(ctx, onAfterDeserializeFunc, this_obj, 2, argv);
                JSApi.JS_FreeValue(ctx, argv[0]);
                JSApi.JS_FreeValue(ctx, argv[1]);
                if (rval.IsException())
                {
                    ctx.print_exception();
                }
                else
                {
                    JSApi.JS_FreeValue(ctx, rval);
                }
            }
            context.Release();
        }

        public static void ExecOnBeforeSerialize(ref JSScriptProperties properties, JSContext ctx, JSValue this_obj, JSValue onBeforeSerializeFunc)
        {
            if (properties == null)
            {
                properties = new JSScriptProperties();
            }
            else
            {
                properties.Clear();
            }

            var context = new JSSerializationContext(properties);

            unsafe
            {
                var argv = stackalloc[] { Binding.Values.js_push_classvalue(ctx, context) };
                var rval = JSApi.JS_Call(ctx, onBeforeSerializeFunc, this_obj, 1, argv);
                JSApi.JS_FreeValue(ctx, argv[0]);
                JSApi.JS_FreeValue(ctx, argv[1]);
                if (rval.IsException())
                {
                    ctx.print_exception();
                }
                else
                {
                    JSApi.JS_FreeValue(ctx, rval);
                }
            }
            context.Release();
        }

        void OnEnable()
        {
            _enabled = true;
            CreateScriptInstance();
        }

        void OnDisable()
        {
            _enabled = false;
            ReleaseJSValues();
        }
    }
}
#endif
