#if !JSB_UNITYLESS
#if UNITY_EDITOR
using System;
using System.Reflection;

namespace QuickJS.Unity
{
    using Native;
    using UnityEngine;
    using UnityEditor;

    /// <summary>
    /// 脚本实现编辑器窗口的基础类. 
    /// 此实现刻意放在非 Editor 目录下, 以便在非编辑器脚本中也可以使用, 实际仍然只在编辑器环境下可用.
    /// </summary>
    public class JSEditorWindow : EditorWindow, IHasCustomMenu, IScriptInstancedObject, ISerializationCallbackReceiver, Utils.IObjectCollectionEntry
    {
        private Utils.ObjectCollection.Handle _handle;

        [NonSerialized]
        private bool _isScriptInstanced;

        [NonSerialized]
        private bool _isWaitingRuntime = false;

        [NonSerialized]
        private bool _checkInstanceOnce = true;

        [SerializeField]
        private JSScriptRef _scriptRef;

        [SerializeField]
        private JSScriptProperties _properties;

        // internal use only
        public JSScriptProperties properties => _properties;

        [NonSerialized]
        private JSContext _ctx;

        private JSValue _this_obj = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _updateValid;
        private JSValue _updateFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onEnableValid;
        private JSValue _onEnableFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onDisableValid;
        private JSValue _onDisableFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onDestroyValid;
        private JSValue _onDestroyFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onGUIValid;
        private JSValue _onGUIFunc = JSApi.JS_UNDEFINED;

#if JSB_WITH_UIELEMENTS
        [NonSerialized]
        private bool _createGUIValid;
        private JSValue _createGUIFunc = JSApi.JS_UNDEFINED;
#endif

        [NonSerialized]
        private bool _addItemsToMenuValid;
        private JSValue _addItemsToMenuFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onBeforeScriptReloadValid;
        private JSValue _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onAfterScriptReloadValid;
        private JSValue _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onBeforeSerializeValid;
        private JSValue _onBeforeSerializeFunc = JSApi.JS_UNDEFINED;

        [NonSerialized]
        private bool _onAfterDeserializeValid;
        private JSValue _onAfterDeserializeFunc = JSApi.JS_UNDEFINED;

        public int IsInstanceOf(JSValue ctor)
        {
            if (!_isScriptInstanced)
            {
                return 0;
            }
            return JSApi.JS_IsInstanceOf(_ctx, _this_obj, ctor);
        }

        public JSValue CloneValue()
        {
            if (!_isScriptInstanced)
            {
                return JSApi.JS_UNDEFINED;
            }
            return JSApi.JS_DupValue(_ctx, _this_obj);
        }

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
                        this._SetScriptInstance(ctx, val, ctor, execAwake);
                        // JSApi.JSB_SetBridgeType(ctx, val, type_id);
                    }

                    return val;
                }
            }

            SetUnresolvedScriptInstance();
            return JSApi.JS_UNDEFINED;
        }

        public void ReleaseScriptInstance()
        {
            _isScriptInstanced = false;
            ReleaseJSValues();
        }

        private void SetUnresolvedScriptInstance()
        {
            _isScriptInstanced = true;
        }

        public bool CreateScriptInstance()
        {
            if (!_isScriptInstanced)
            {
                if (!string.IsNullOrEmpty(_scriptRef.modulePath) && !string.IsNullOrEmpty(_scriptRef.className))
                {
                    var runtime = ScriptEngine.GetRuntime();
                    if (runtime != null && runtime.isValid && runtime.isInitialized)
                    {
                        var context = runtime.GetMainContext();
                        if (context != null)
                        {
                            var ctx = (JSContext)context;
                            var snippet = $"require('{_scriptRef.modulePath}')['{_scriptRef.className}']";
                            var bytes = System.Text.Encoding.UTF8.GetBytes(snippet);
                            var typeValue = ScriptRuntime.EvalSource(ctx, bytes, _scriptRef.sourceFile ?? _scriptRef.modulePath, false);
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
                        else
                        {
                            SetUnresolvedScriptInstance();
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

        private void _SetScriptInstance(JSContext ctx, JSValue this_obj, JSValue ctor, bool execAwake)
        {
            var context = ScriptEngine.GetContext(ctx);
            if (context == null || !context.IsValid())
            {
                return;
            }

            ReleaseJSValues();
            context.TrySetScriptRef(ref _scriptRef, ctor);
            var runtime = context.GetRuntime();
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

                if (execAwake)
                {
                    var awake_obj = JSApi.JS_GetProperty(ctx, this_obj, context.GetAtom("Awake"));
                    JSScriptableObject._CallJSFunc(_ctx, _this_obj, awake_obj);
                    JSApi.JS_FreeValue(_ctx, awake_obj);

                }

                this._OnScriptingAfterDeserialize();
                if (_onEnableValid)
                {
                    JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onEnableFunc);
                }
            }
        }

        private void OnBindingJSFuncs(ScriptContext context)
        {
            var ctx = (JSContext)context;

            _updateFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("Update"));
            _updateValid = JSApi.JS_IsFunction(ctx, _updateFunc) == 1;

            _onEnableFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnEnable"));
            _onEnableValid = JSApi.JS_IsFunction(ctx, _onEnableFunc) == 1;

            _onDisableFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDisable"));
            _onDisableValid = JSApi.JS_IsFunction(ctx, _onDisableFunc) == 1;

            _onDestroyFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDestroy"));
            _onDestroyValid = JSApi.JS_IsFunction(ctx, _onDestroyFunc) == 1;

            _onGUIFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnGUI"));
            _onGUIValid = JSApi.JS_IsFunction(ctx, _onGUIFunc) == 1;

#if JSB_WITH_UIELEMENTS
            _createGUIFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("CreateGUI"));
            _createGUIValid = JSApi.JS_IsFunction(ctx, _createGUIFunc) == 1;
#endif

            _addItemsToMenuFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("AddItemsToMenu"));
            _addItemsToMenuValid = JSApi.JS_IsFunction(ctx, _addItemsToMenuFunc) == 1;

            _onBeforeScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeScriptReload"));
            _onBeforeScriptReloadValid = JSApi.JS_IsFunction(ctx, _onBeforeScriptReloadFunc) == 1;

            _onAfterScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterScriptReload"));
            _onAfterScriptReloadValid = JSApi.JS_IsFunction(ctx, _onAfterScriptReloadFunc) == 1;

            _onBeforeSerializeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeSerialize"));
            _onBeforeSerializeValid = JSApi.JS_IsFunction(ctx, _onBeforeSerializeFunc) == 1;

            _onAfterDeserializeFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterDeserialize"));
            _onAfterDeserializeValid = JSApi.JS_IsFunction(ctx, _onAfterDeserializeFunc) == 1;
        }

        private void OnUnbindingJSFuncs()
        {
            JSApi.JS_FreeValue(_ctx, _updateFunc);
            _updateFunc = JSApi.JS_UNDEFINED;
            _updateValid = false;

            JSApi.JS_FreeValue(_ctx, _onEnableFunc);
            _onEnableFunc = JSApi.JS_UNDEFINED;
            _onEnableValid = false;

            JSApi.JS_FreeValue(_ctx, _onDisableFunc);
            _onDisableFunc = JSApi.JS_UNDEFINED;
            _onDisableValid = false;

            JSApi.JS_FreeValue(_ctx, _onDestroyFunc);
            _onDestroyFunc = JSApi.JS_UNDEFINED;
            _onDestroyValid = false;

            JSApi.JS_FreeValue(_ctx, _onGUIFunc);
            _onGUIFunc = JSApi.JS_UNDEFINED;
            _onGUIValid = false;

#if JSB_WITH_UIELEMENTS
            JSApi.JS_FreeValue(_ctx, _createGUIFunc);
            _createGUIFunc = JSApi.JS_UNDEFINED;
            _createGUIValid = false;
#endif

            JSApi.JS_FreeValue(_ctx, _addItemsToMenuFunc);
            _addItemsToMenuFunc = JSApi.JS_UNDEFINED;
            _addItemsToMenuValid = false;

            JSApi.JS_FreeValue(_ctx, _onBeforeScriptReloadFunc);
            _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;
            _onBeforeScriptReloadValid = false;

            JSApi.JS_FreeValue(_ctx, _onAfterScriptReloadFunc);
            _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;
            _onAfterScriptReloadValid = false;

            JSApi.JS_FreeValue(_ctx, _onBeforeSerializeFunc);
            _onBeforeSerializeFunc = JSApi.JS_UNDEFINED;
            _onBeforeSerializeValid = false;

            JSApi.JS_FreeValue(_ctx, _onAfterDeserializeFunc);
            _onAfterDeserializeFunc = JSApi.JS_UNDEFINED;
            _onAfterDeserializeValid = false;
        }

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
                JSValue newClass;
                if (context.LoadModuleCacheExports(resolved_id, _scriptRef.className, out newClass))
                {
                    var prototype = JSApi.JS_GetProperty(context, newClass, context.GetAtom("prototype"));

                    if (prototype.IsObject() && _this_obj.IsObject())
                    {
                        OnUnbindingJSFuncs();
                        JSApi.JS_SetPrototype(context, _this_obj, prototype);
                        OnBindingJSFuncs(context);

                        if (_onAfterScriptReloadValid)
                        {
                            JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onAfterScriptReloadFunc);
                        }
                    }

                    JSApi.JS_FreeValue(context, prototype);
                    JSApi.JS_FreeValue(context, newClass);
                }
            }
        }
#endif

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            OnBeforeSerialize();
            ReleaseJSValues();
        }
        #endregion

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

        void ReleaseJSValues(bool noClose = false)
        {
            _isScriptInstanced = false;
            if (_isWaitingRuntime)
            {
                _isWaitingRuntime = false;
                ScriptEngine.RuntimeInitialized -= OnRuntimeInitialized;
            }

            if (!_this_obj.IsNullish())
            {
                OnUnbindingObject(_ctx, _this_obj);
                OnUnbindingJSFuncs();
                JSApi.JS_FreeValue(_ctx, _this_obj);
                _this_obj = JSApi.JS_UNDEFINED;
            }

            var context = ScriptEngine.GetContext(_ctx);
            _ctx = JSContext.Null;
            if (context != null)
            {
                var runtime = context.GetRuntime();
                if (runtime != null)
                {
                    runtime.RemoveManagedObject(_handle);
                }
#if UNITY_EDITOR
                context.OnScriptReloading -= OnScriptReloading;
                context.OnScriptReloaded -= OnScriptReloaded;
#endif
            }

            try
            {
                if (!noClose && _scriptRef.IsEmpty())
                {
                    Close();
                }
            }
            catch (Exception) { }
        }

        void Update()
        {
            if (_updateValid && _ctx.IsValid())
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _updateFunc);
            }
            else
            {
                // there is no callback available to restore the script reference after getting back to edit mode.
                // it seems that checking is the only way.

                if (_checkInstanceOnce && !Application.isPlaying)
                {
                    _checkInstanceOnce = false;
                    CreateScriptInstance();
                }
            }
        }

        void OnEnable()
        {
            CreateScriptInstance();

            // if (_onEnableValid)
            // {
            //     JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onEnableFunc);
            // }
        }

        void OnDisable()
        {
            if (_onDisableValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDisableFunc);
            }
        }

        void OnDestroy()
        {
            if (_onDestroyValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDestroyFunc);
            }
            ReleaseJSValues(true);
        }

#if JSB_WITH_UIELEMENTS
        void CreateGUI()
        {
            if (EditorApplication.isCompiling)
            {
                ReleaseJSValues();
                return;
            }

            if (_createGUIValid && _isScriptInstanced && _ctx.IsValid())
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _createGUIFunc);
            }
        }
#endif

        void OnGUI()
        {
            if (EditorApplication.isCompiling)
            {
                ReleaseJSValues();
                return;
            }

            if (_onGUIValid && _isScriptInstanced && _ctx.IsValid())
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onGUIFunc);
            }
            else
            {
                var promptMessage = @"script callback not ready:
    1. runtime unavailable
    2. script instance not ready
    3. callback of OnGUI not provided in target script";
                EditorGUILayout.HelpBox(promptMessage, MessageType.Warning);
            }
        }

        public unsafe void AddItemsToMenu(GenericMenu menu)
        {
            if (_addItemsToMenuValid)
            {
                var argv = stackalloc JSValue[] { Binding.Values.js_push_classvalue(_ctx, menu) };
                var rval = JSApi.JS_Call(_ctx, _addItemsToMenuFunc, _this_obj, 1, argv);

                JSApi.JS_FreeValue(_ctx, argv[0]);
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
                JSScriptableObject.ExecOnBeforeSerialize(ref _properties, _ctx, _this_obj, _onBeforeSerializeFunc);
            }

            if (UnityEditor.EditorApplication.isCompiling)
            {
                ReleaseJSValues();
            }
        }

        public void _OnScriptingAfterDeserialize()
        {
            if (_onAfterDeserializeValid)
            {
                JSScriptableObject.ExecOnAfterDeserialize(ref _properties, _ctx, _this_obj, _onAfterDeserializeFunc);
            }
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
    }
}
#endif
#endif
