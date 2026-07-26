#if !JSB_UNITYLESS
using System;
using System.IO;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEditor;
    using UnityEngine;
    using Native;

    public abstract class JSInspectorBase<T> : Editor, Utils.IObjectCollectionEntry
    where T : Object, IScriptEditorSupport
    {
        private T _target;
        private Utils.ObjectCollection.Handle _handle;
        private JSScriptRef _scriptRef;

        [NonSerialized]
        private JSScriptRef _lastScriptRefOfTarget;

        private string[] _tabViews = new string[] { "Editor", "Source", "Primitive" };
        private int _selectedTabViewIndex = 0;

        /// <summary>
        /// indicates the current acutal state of this Editor instance
        /// </summary>
        private bool _enabled;

        /// <summary>
        /// the script runtime is not ready when the Editor is enabled, 
        /// try to mark and delay the call of OnEnable in scripts
        /// </summary>
        private bool _enabledPending;

        private JSContext _ctx = JSContext.Null;
        private JSValue _this_obj = JSApi.JS_UNDEFINED;

        private bool _onDestroyValid;
        private JSValue _onDestroyFunc = JSApi.JS_UNDEFINED;

        private bool _onEnableValid;
        private JSValue _onEnableFunc = JSApi.JS_UNDEFINED;

        private bool _onDisableValid;
        private JSValue _onDisableFunc = JSApi.JS_UNDEFINED;

        private bool _onInspectorGUIValid;
        private JSValue _onInspectorGUIFunc = JSApi.JS_UNDEFINED;

        private bool _onBeforeScriptReloadValid;
        private JSValue _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;

        private bool _onAfterScriptReloadValid;
        private JSValue _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;

        protected T GetTarget()
        {
            if (_target == null)
            {
                _target = target as T;
            }
            return _target;
        }

        void Awake()
        {
        }

        protected abstract JSScriptClassType GetScriptClassType();

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
                            OnUnbindingJSMembers();
                            JSApi.JS_SetPrototype(context, _this_obj, prototype);
                            OnBindingJSMembers(context);

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

            var scriptRefOfTarget = GetTarget().scriptRef;
            if (!_lastScriptRefOfTarget.IsSameScript(scriptRefOfTarget) && context.CheckModuleId(scriptRefOfTarget, resolved_id))
            {
                // trigger editor script reloading after the target being changed
                if (_enabled)
                {
                    OnEnable();
                }
            }
        }

        #region IObjectCollectionEntry implementation
        public void OnCollectionReleased()
        {
            Release();
        }
        #endregion

        protected void ReleaseJSValues()
        {
            if (!_this_obj.IsNullish())
            {
                OnUnbindingJSMembers();

                JSApi.JS_FreeValue(_ctx, _this_obj);
                _this_obj = JSApi.JS_UNDEFINED;
            }

            var runtime = ScriptEngine.GetRuntime(_ctx);
            var context = runtime?.GetContext(_ctx);
            _ctx = JSContext.Null;

            if (context != null)
            {
                runtime.RemoveManagedObject(_handle);
                context.OnScriptReloading -= OnScriptReloading;
                context.OnScriptReloaded -= OnScriptReloaded;
            }
        }

        void Release()
        {
            if (!GetTarget().isStandaloneScript)
            {
                GetTarget().ReleaseScriptInstance();
                _lastScriptRefOfTarget.Reset();
            }
            ReleaseJSValues();
        }

        protected void CreateScriptInstance(JSContext ctx, JSValue this_obj, JSValue ctor)
        {
            var runtime = ScriptEngine.GetRuntime(ctx);
            var context = runtime?.GetContext(ctx);
            if (context == null || !context.IsValid())
            {
                return;
            }

            runtime.AddManagedObject(this, out _handle);
            context.OnScriptReloading += OnScriptReloading;
            context.OnScriptReloaded += OnScriptReloaded;
            _ctx = ctx;
            _this_obj = JSApi.JS_DupValue(ctx, this_obj);

            if (!_this_obj.IsNullish())
            {
                OnBindingJSMembers(context);

                var awakeFunc = JSApi.JS_GetProperty(ctx, this_obj, context.GetAtom("Awake"));

                JSScriptableObject._CallJSFunc(_ctx, _this_obj, awakeFunc);
                JSApi.JS_FreeValue(_ctx, awakeFunc);
            }
        }

        private void OnBindingJSMembers(ScriptContext context)
        {
            var ctx = (JSContext)context;

            _onDestroyFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDestroy"));
            _onDestroyValid = JSApi.JS_IsFunction(ctx, _onDestroyFunc) == 1;

            _onEnableFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnEnable"));
            _onEnableValid = JSApi.JS_IsFunction(ctx, _onEnableFunc) == 1;

            _onDisableFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnDisable"));
            _onDisableValid = JSApi.JS_IsFunction(ctx, _onDisableFunc) == 1;

            _onInspectorGUIFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnInspectorGUI"));
            _onInspectorGUIValid = JSApi.JS_IsFunction(ctx, _onInspectorGUIFunc) == 1;

            _onBeforeScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnBeforeScriptReload"));
            _onBeforeScriptReloadValid = JSApi.JS_IsFunction(ctx, _onBeforeScriptReloadFunc) == 1;

            _onAfterScriptReloadFunc = JSApi.JS_GetProperty(ctx, _this_obj, context.GetAtom("OnAfterScriptReload"));
            _onAfterScriptReloadValid = JSApi.JS_IsFunction(ctx, _onAfterScriptReloadFunc) == 1;
        }

        private void OnUnbindingJSMembers()
        {
            JSApi.JS_FreeValue(_ctx, _onDestroyFunc);
            _onDestroyFunc = JSApi.JS_UNDEFINED;
            _onDestroyValid = false;

            JSApi.JS_FreeValue(_ctx, _onEnableFunc);
            _onEnableFunc = JSApi.JS_UNDEFINED;
            _onEnableValid = false;

            JSApi.JS_FreeValue(_ctx, _onDisableFunc);
            _onDisableFunc = JSApi.JS_UNDEFINED;
            _onDisableValid = false;

            JSApi.JS_FreeValue(_ctx, _onInspectorGUIFunc);
            _onInspectorGUIFunc = JSApi.JS_UNDEFINED;
            _onInspectorGUIValid = false;

            JSApi.JS_FreeValue(_ctx, _onBeforeScriptReloadFunc);
            _onBeforeScriptReloadFunc = JSApi.JS_UNDEFINED;
            _onBeforeScriptReloadValid = false;

            JSApi.JS_FreeValue(_ctx, _onAfterScriptReloadFunc);
            _onAfterScriptReloadFunc = JSApi.JS_UNDEFINED;
            _onAfterScriptReloadValid = false;
        }

        protected void CreateScriptInstance()
        {
            ReleaseJSValues();

            var target_t = GetTarget();
            var ctx = target_t.ctx;
            if (!ctx.IsValid())
            {
                return;
            }

            var prefs = EditorRuntime.GetPrefs();
            var runtime = ScriptEngine.GetRuntime(ctx);
            if (prefs == null || runtime == null || !runtime.isRunning)
            {
                return;
            }

            var editorClass = JSApi.JS_UNDEFINED;
            var context = runtime.GetMainContext();
            var decorator_module = prefs.editorDecoratorScript;
            var scriptFunc = context.EvalSource<ScriptFunction>($"require('{decorator_module}').EditorUtil.getCustomEditor", "eval");
            if (scriptFunc != null)
            {
                unsafe
                {
                    var safeRelease = new Utils.SafeRelease(context, target_t.CloneValue());
                    if (safeRelease[0].IsObject())
                    {
                        var args = stackalloc JSValue[] { safeRelease[0] };
                        editorClass = scriptFunc._Invoke(context, 1, args);
                    }
                    safeRelease.Release();
                }
                scriptFunc.Dispose();
            }
            else
            {
                Debug.LogError($"failed to get EditorUtil.getCustomEditor in {decorator_module}");
            }

            if (JSApi.JS_IsConstructor(ctx, editorClass) == 1)
            {
                var objectCache = runtime.GetObjectCache();

                // 旧的绑定值释放？
                if (!_this_obj.IsNullish())
                {
                    var payload = JSApi.JSB_FreePayload(ctx, _this_obj);
                    if (payload.type_id == BridgeObjectType.ObjectRef)
                    {
                        try
                        {
                            objectCache.RemoveObject(payload.value);
                        }
                        catch (Exception exception)
                        {
                            runtime.GetLogger()?.WriteException(exception);
                        }
                    }
                }

                var object_id = objectCache.AddObject(this, false);
                var editorInstance = JSApi.jsb_construct_bridge_object(ctx, editorClass, object_id);
                if (editorInstance.IsException())
                {
                    ctx.print_exception();
                    objectCache.RemoveObject(object_id);
                }
                else
                {
                    _lastScriptRefOfTarget = target_t.scriptRef;
                    objectCache.AddJSValue(this, editorInstance);
                    context.TrySetScriptRef(ref _scriptRef, editorClass);
                    CreateScriptInstance(ctx, editorInstance, editorClass);
                    JSApi.JS_FreeValue(ctx, editorInstance);
                }
            }

            JSApi.JS_FreeValue(ctx, editorClass);
        }

        void OnEnable()
        {
            _enabled = true;
            _enabledPending = true;
            ReleaseJSValues();
        }

        private void EnableScriptInstance()
        {
            if (!_enabledPending || !_enabled)
            {
                return;
            }

            // 当前编辑器为附加模式执行时, 等待目标脚本建立连接
            // 否则由编辑器管理目标生命周期

            if (GetTarget().isStandaloneScript)
            {
                if (GetTarget().isScriptInstanced)
                {
                    this.OnEnableScriptInstance();
                }
            }
            else
            {
                if (GetTarget().CreateScriptInstance())
                {
                    this.OnEnableScriptInstance();
                }
            }
        }

        private void OnEnableScriptInstance()
        {
            _enabledPending = false;
            this.CreateScriptInstance();

            if (_onEnableValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onEnableFunc);
            }
        }

        void OnDisable()
        {
            _enabledPending = false;
            _enabled = false;

            if (_onDisableValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDisableFunc);
            }

            Release();
        }

        void OnDestroy()
        {
            if (_onDestroyValid)
            {
                JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onDestroyFunc);
            }

            _enabledPending = false;
            Release();
        }

        private void OnSelectedScript(JSScriptClassPathHint classPath)
        {
            var target_t = GetTarget();

            if (_enabled && target_t != null && !classPath.IsReferenced(target_t.scriptRef))
            {
                var scriptRef = target_t.scriptRef;

                scriptRef.sourceFile = classPath.sourceFile;
                if (scriptRef.modulePath != classPath.modulePath || scriptRef.className != classPath.className)
                {
                    scriptRef.modulePath = classPath.modulePath;
                    scriptRef.className = classPath.className;

                    Undo.RecordObject(target_t, "Change Script Reference");
                    target_t.scriptRef = scriptRef;
                    this.ReleaseJSValues();
                    target_t.ReleaseScriptInstance();
                    target_t.CreateScriptInstance();

                    // 重新绑定当前编辑器脚本实例
                    this.CreateScriptInstance();
                }
                else
                {
                    Undo.RecordObject(target_t, "Update Script Source");
                    target_t.scriptRef = scriptRef;
                }

                EditorUtility.SetDirty(target_t);
            }
        }

        protected virtual void DrawSourceView()
        {
            BaseEditorWindow.Block("Target Script", () =>
            {
                var target_t = GetTarget();
                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.TextField("Source File", target_t.scriptRef.sourceFile);
                var sourceFileRect = GUILayoutUtility.GetLastRect();

                if (GUILayout.Button("F", GUILayout.Width(20f)))
                {
                    sourceFileRect.y += 10f;
                    if (JSScriptSearchWindow.Show(sourceFileRect, string.Empty, GetScriptClassType(), OnSelectedScript))
                    {
                        GUIUtility.ExitGUI();
                    }
                }

                EditorGUILayout.EndHorizontal();

                if (!string.IsNullOrEmpty(target_t.scriptRef.sourceFile))
                {
                    var sourceFileExists = File.Exists(target_t.scriptRef.sourceFile);

                    if (!sourceFileExists)
                    {
                        EditorGUILayout.HelpBox("Source file is missing", MessageType.Warning);
                    }
                }
                else
                {
                    if (EditorApplication.isPlaying)
                    {
                        EditorGUILayout.HelpBox("Script instance without relevant script reference info?", MessageType.Warning);
                    }
                }

                EditorGUILayout.LabelField("Module Path", target_t.scriptRef.modulePath);
                EditorGUILayout.LabelField("Class Name", target_t.scriptRef.className);
            });

            BaseEditorWindow.Block("Editor Script", () =>
            {
                EditorGUILayout.LabelField("Module Path", _scriptRef.modulePath);
                EditorGUILayout.LabelField("Class Name", _scriptRef.className);
            });
        }

        private void DrawPrimitiveView()
        {
            var ps = GetTarget().properties;
            if (ps == null || ps.IsEmpty)
            {
                EditorGUILayout.HelpBox("Empty Properties View", MessageType.Info);
                return;
            }

            EditorGUI.BeginDisabledGroup(true);
            EditorGUILayout.IntField("Data Format", ps.dataFormat);
            EditorGUILayout.IntField("Blob", ps.GenericCount);
            EditorGUILayout.IntField("Referenced Objects", ps.ReferencedObjectCount);
            EditorGUI.EndDisabledGroup();
        }

        private void DrawScriptingView()
        {
            var target_t = GetTarget();

            if (target_t.isScriptInstanced)
            {
                if (target_t.IsValid())
                {
                    if (_onInspectorGUIValid)
                    {
                        JSScriptableObject._CallJSFunc(_ctx, _this_obj, _onInspectorGUIFunc);
                    }
                    else
                    {
                        EditorGUILayout.HelpBox("No inspector available for this script type", MessageType.Info);
                    }
                }
                else
                {
                    if (!target_t.scriptRef.IsEmpty())
                    {
                        EditorGUILayout.HelpBox("Invalid script reference", MessageType.Warning);
                    }
                    DrawSourceView();
                }
            }
            else
            {
                EditorGUILayout.HelpBox("Waiting for script instancing...", MessageType.Warning);
                OnWaitingForScriptInstancing();
            }
        }

        protected virtual void OnWaitingForScriptInstancing()
        {
        }

        public override void OnInspectorGUI()
        {
            if (EditorApplication.isCompiling || (!EditorApplication.isPlaying && EditorApplication.isPlayingOrWillChangePlaymode))
            {
                Release();
                EditorGUILayout.HelpBox("Temporarily unavailable in the script compilation process", MessageType.Warning);
                return;
            }

            if (_enabledPending)
            {
                EnableScriptInstance();
            }

            _selectedTabViewIndex = GUILayout.Toolbar(_selectedTabViewIndex, _tabViews);
            switch (_selectedTabViewIndex)
            {
                case 0: DrawScriptingView(); break;
                case 1: DrawSourceView(); break;
                default: DrawPrimitiveView(); break;
            }
        }
    }
}
#endif
