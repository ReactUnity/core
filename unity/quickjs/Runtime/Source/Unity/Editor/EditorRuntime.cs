#if !JSB_UNITYLESS
using System;
using System.IO;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;
    using QuickJS.Utils;
    using QuickJS.IO;
    using QuickJS;
    using QuickJS.Binding;
    using QuickJS.Native;

    [InitializeOnLoad]
    public class EditorRuntime
    {
        private enum RunMode
        {
            Editor,
            Playing,
            None,
        }
#pragma warning disable 0649
        private static EditorRuntime _instance;
#pragma warning restore 0649
        private ScriptRuntime _runtime;
        private RunMode _runMode;
        private int _tick;
        private Prefs _prefs;
        private TSConfig _tsConfig;
        private float _changedFileInterval;
        private HashSet<string> _changedFileQueue;

        static EditorRuntime()
        {
            PrefsLoader.prefsChanged += OnPrefsChanged;
            OnPrefsChanged(PrefsLoader.CurrentPrefs);
        }

        private static void OnPrefsChanged(Prefs prefs)
        {
            if (_instance != null)
            {
                if (!prefs.editorScripting)
                {
                    _instance.OnEditorQuitting();
                    _instance = null;
                }
            }
            else
            {
                if (prefs.editorScripting)
                {
                    _instance = new EditorRuntime(prefs);
                }
            }
        }

        public static Prefs GetPrefs()
        {
            return _instance?._prefs;
        }

        public static TSConfig GetTSConfig()
        {
            return _instance?._tsConfig;
        }

        public static EditorRuntime GetInstance()
        {
            return _instance;
        }

        public EditorRuntime(Prefs prefs)
        {
            _prefs = prefs;
            _runMode = RunMode.None;
            _changedFileQueue = new HashSet<string>();
            ScriptEngine.RuntimeCreated += OnScriptRuntimeCreated;
            EditorApplication.delayCall += OnEditorInit;
            EditorApplication.playModeStateChanged += OnPlayModeStateChanged;
        }

        ~EditorRuntime()
        {
        }

        private void OnEditorQuitting()
        {
            if (_runtime == null)
            {
                return;
            }

            var runtime = _runtime;
            _runtime = null;
            _runMode = RunMode.None;
            JSScriptFinder.GetInstance().ModuleSourceChanged -= OnModuleSourceChanged;
            EditorApplication.delayCall -= OnEditorInit;
            EditorApplication.update -= OnEditorUpdate;
            AssemblyReloadEvents.beforeAssemblyReload -= OnBeforeAssemblyReload;
            EditorApplication.quitting -= OnEditorQuitting;
            runtime.Shutdown();
        }

        public bool Reload()
        {
            if (EditorApplication.isCompiling)
            {
                return false;
            }

            OnEditorQuitting();
            OnEditorInit();
            return true;
        }

        private void OnEditorInit()
        {
            if (_runMode == RunMode.Playing)
            {
                return;
            }

            if (_runtime == null)
            {
                EditorApplication.update += OnEditorUpdate;
                AssemblyReloadEvents.beforeAssemblyReload += OnBeforeAssemblyReload;
                EditorApplication.quitting += OnEditorQuitting;

                var logger = new DefaultScriptLogger();
                var pathResolver = new PathResolver();
                var fileSystem = new DefaultFileSystem(logger);
                var asyncManager = new DefaultAsyncManager();

                _tick = Environment.TickCount;
                _runtime = ScriptEngine.CreateRuntime(true);
                _runtime.AddModuleResolvers();
                _runtime.Initialize(new ScriptRuntimeArgs
                {
                    fileSystem = fileSystem,
                    pathResolver = pathResolver,
                    asyncManager = asyncManager,
                    logger = logger,
                    byteBufferAllocator = new ByteBufferPooledAllocator(),
                    binder = DefaultBinder.GetBinder(_prefs.preferredBindingMethod),
                });
            }
        }

        private void OnScriptRuntimeCreated(ScriptRuntime runtime)
        {
            runtime.OnInitializing += OnScriptRuntimeInitializing;
            runtime.OnMainModuleLoaded += OnScriptRuntimeMainModuleLoaded;
        }

        public static TSConfig LoadTSConfig(string workspace = null)
        {
            var tsconfigPath = string.IsNullOrEmpty(workspace) ? "tsconfig.json" : Path.Combine(workspace, "tsconfig.json");
            if (File.Exists(tsconfigPath))
            {
                var text = Utils.TextUtils.NormalizeJson(File.ReadAllText(tsconfigPath));
                var tsconfig = JsonUtility.FromJson<TSConfig>(text);
                return tsconfig;
            }

            Debug.LogWarning("no tsconfig.json found");
            return null;
        }

        private void OnScriptRuntimeMainModuleLoaded(ScriptRuntime runtime)
        {
        }

        private void OnScriptRuntimeInitializing(ScriptRuntime runtime)
        {
            _tsConfig = LoadTSConfig();

            if (_tsConfig != null && !string.IsNullOrEmpty(_tsConfig.compilerOptions.outDir))
            {
                runtime.AddSearchPath(_tsConfig.compilerOptions.outDir);
            }
            runtime.AddStaticModule("jsb.editor", Bind);
            JSScriptFinder.GetInstance().ModuleSourceChanged += OnModuleSourceChanged;

            if (!string.IsNullOrEmpty(_prefs.editorEntryPoint))
            {
                runtime.ResolveModule(_prefs.editorEntryPoint);
            }

            foreach (var module in _prefs.editorRequires)
            {
                runtime.ResolveModule(module);
            }

            // in order to evaluate the decorator (the registration of CustomEditor), we need to load these modules before actually using
            var editorScripts = new List<JSScriptClassPathHint>();
            JSScriptFinder.GetInstance().Search(JSScriptClassType.CustomEditor, editorScripts);
            foreach (var editorScript in editorScripts)
            {
                runtime.ResolveModule(editorScript.modulePath);
            }
        }

        public static ClassDecl Bind(TypeRegister register)
        {
            var ns_jsb = register.CreateClass("JSBEditorModule");

            {
                var ns_editorRuntime = register.CreateClass("JSEditorRuntimeClass");
                ns_editorRuntime.AddProperty(true, "prefs", JS_GetPrefs, null);
                ns_editorRuntime.AddProperty(true, "tsconfig", JS_GetTSConfig, null);
                ns_jsb.AddValue("EditorRuntime", ns_editorRuntime.GetConstructor());
            }
            return ns_jsb;
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue JS_GetPrefs(JSContext ctx, JSValue this_val)
        {
            return Values.js_push_classvalue(ctx, GetPrefs());
        }

        [MonoPInvokeCallback(typeof(JSGetterCFunction))]
        private static JSValue JS_GetTSConfig(JSContext ctx, JSValue this_val)
        {
            return Values.js_push_classvalue(ctx, GetTSConfig());
        }

        private void OnModuleSourceChanged(string modulePath, JSScriptClassType classTypes)
        {
            // the already loaded CustomEditor scripts could be reloaded automatically by file-watcher
            // but if it's freshly added, resolve it here
            if ((classTypes & JSScriptClassType.CustomEditor) != 0)
            {
                var runtime = ScriptEngine.GetRuntime();
                if (runtime != null && !EditorApplication.isCompiling)
                {
                    runtime.ResolveModule(modulePath);
                }
            }
        }

        private void OnPlayModeStateChanged(PlayModeStateChange mode)
        {
            switch (mode)
            {
                case PlayModeStateChange.EnteredEditMode: _runMode = RunMode.Editor; EditorApplication.delayCall += OnEditorInit; break;
                case PlayModeStateChange.ExitingEditMode: OnEditorQuitting(); break;
                case PlayModeStateChange.EnteredPlayMode: _runMode = RunMode.Playing; break;
            }
        }

        private void OnBeforeAssemblyReload()
        {
            OnEditorQuitting();
        }

        private void OnEditorUpdate()
        {
            if (_runtime != null)
            {
                if (EditorApplication.isCompiling)
                {
                    OnEditorQuitting();
                    return;
                }

                var tick = Environment.TickCount;
                if (tick < _tick)
                {
                    _runtime.Update((tick - int.MinValue) + (int.MaxValue - _tick));
                }
                else
                {
                    _runtime.Update(tick - _tick);
                }
                _tick = tick;
            }
        }

        public static void Eval(string code)
        {
            var runtime = ScriptEngine.GetRuntime();
            if (runtime != null && !EditorApplication.isCompiling)
            {
                runtime.GetMainContext().EvalSource(code, "eval");
                return;
            }

            Debug.LogError("no running ScriptRuntime");
        }

        public static void ShowWindow(string module, string typename)
        {
            Eval($"require('UnityEditor').EditorWindow.GetWindow(require('{module}').{typename}).Show()");
        }
    }
}
#endif