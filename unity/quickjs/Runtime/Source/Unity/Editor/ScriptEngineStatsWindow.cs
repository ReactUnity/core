#if !JSB_UNITYLESS
using System;
using System.Linq;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;
    using System.Threading;

    public class ScriptEngineStatsWindow : BaseEditorWindow, IHasCustomMenu
    {
        private static readonly string[] _backends = { "quickjs", "v8-bridge" };
        private static GUIContent GUIContent_Stats_Operator = new GUIContent("Operator", "Is operator overloading supported?");

        private int _categoryIndex;
        private string[] _categoryLabels;
        private Action<Snapshot>[] _categoryDrawers;

        private class Snapshot
        {
            public struct TimerInfo
            {
                public ulong id;
                public int delay;
                public int deadline;
                public bool once;
            }
            public int id;
            public bool alive;

            public Native.JSMemoryUsage memoryUsage;
            public bool isStaticBinding;
            public int exportedTypes;
            public int managedObjectCount;
            public int managedObjectCap;
            public bool fetchManagedObjectRefs;
            public int selectedManagedObjectIndex;
            // public List<WeakReference<object>> managedObjectRefs = new List<WeakReference<object>>();
            public SimpleListView<WeakReference<object>> managedObjectRefs = new SimpleListView<WeakReference<object>>();
            public int jsObjectCount;
            public int delegateCount;
            public int scriptValueCount;
            // public int scriptPromiseCount;
            public int stringCount;
            public int timeNow;
            public List<TimerInfo> activeTimers = new List<TimerInfo>();
        }

        private Vector2 _sv;
        private int _alive;

        [SerializeField]
        private bool _fetchManagedObjectRefs = false;

        [SerializeField]
        private bool _autoCap = true;
        
        private float _time;

        [SerializeField]
        private float _timeCap = 5f;
        private List<Snapshot> _snapshots = new List<Snapshot>();
        private string[] _snapshotNames = new string[] { };
        private int _selectedSnapshotIndex;

        [MenuItem("JS Bridge/Stats Viewer", false, 5000)]
        static void OpenThis()
        {
            GetWindow<ScriptEngineStatsWindow>().Show();
        }

        protected override void OnEnable()
        {
            base.OnEnable();
            _categoryLabels = new string[] { "Statistics", "Managed Objects", "Timers" };
            _categoryDrawers = new Action<Snapshot>[] { OnStatisticsGUI, OnManagedObjectsGUI, OnTimersGUI };
            _categoryIndex = Math.Min(_categoryIndex, _categoryLabels.Length - 1);

            titleContent = new GUIContent("ScriptEngine Stats");
            _time = Time.realtimeSinceStartup;
            CaptureAll();
        }

        protected override void OnDisable()
        {
            base.OnDisable();
        }

        string ToSizeText(long size)
        {
            if (size > 1024 * 1024 * 2)
            {
                return string.Format("{0:.0} MB", (float)size / 1024f / 1024f);
            }
            else if (size > 1024 * 2)
            {
                return string.Format("{0:.0} KB", (float)size / 1024f);
            }
            return string.Format("{0} B", (int)size);
        }

        string ToCountText(long size)
        {
            return size.ToString();
        }

        private void GarbadgeCollect()
        {
            GC.Collect();
            GC.WaitForPendingFinalizers();
        }

        public void AddItemsToMenu(GenericMenu menu)
        {
            menu.AddItem(new GUIContent("JS Launcher"), false, () => GetWindow<ScriptEditorWindowLauncher>().Show());
            menu.AddItem(new GUIContent("Prefs"), false, () => GetWindow<PrefsEditor>().Show());
            menu.AddSeparator("");
            menu.AddItem(new GUIContent("Capture"), false, () => CaptureAll());
            menu.AddItem(new GUIContent("GC (mono)"), false, () => GarbadgeCollect());
            menu.AddItem(new GUIContent("Reload EditorScripting"), false, () => EditorRuntime.GetInstance()?.Reload());
#if UNITY_2019_4_OR_NEWER
            menu.AddItem(new GUIContent("Reload CSharp"), false, () => UnityEditor.Compilation.CompilationPipeline.RequestScriptCompilation());
#endif
        }

        private Snapshot GetSnapshot(int id)
        {
            for (int i = 0, count = _snapshots.Count; i < count; i++)
            {
                var snapshot = _snapshots[i];
                if (snapshot.id == id)
                {
                    return snapshot;
                }
            }
            var inst = new Snapshot();
            inst.id = id;
            ArrayUtility.Add(ref _snapshotNames, id.ToString());
            _snapshots.Add(inst);
            return inst;
        }

        private void Capture(ScriptRuntime runtime)
        {
            if (!runtime.isValid)
            {
                return;
            }

            var snapshot = GetSnapshot(runtime.id);
            snapshot.alive = true;
            snapshot.fetchManagedObjectRefs = _fetchManagedObjectRefs;
            runtime.EnqueueAction(OnSnapshotRequest, snapshot);
        }

        /// <summary>
        /// Callback runs on the script runtime thread
        /// </summary>
        private static void OnSnapshotRequest(ScriptRuntime runtime, object cbArgs, Native.JSValue cbValue)
        {
            if (!runtime.isValid || !runtime.isRunning)
            {
                return;
            }

            var snapshot = (Snapshot)cbArgs;
            lock (snapshot)
            {
                unsafe
                {
                    fixed (Native.JSMemoryUsage* ptr = &snapshot.memoryUsage)
                    {
                        Native.JSApi.JS_ComputeMemoryUsage(runtime, ptr);
                    }
                }

                var typeDB = runtime.GetTypeDB();
                snapshot.exportedTypes = typeDB.Count;
                snapshot.isStaticBinding = runtime.isStaticBinding;

                var objectCache = runtime.GetObjectCache();
                var stringCache = runtime.GetMainContext().GetStringCache();

                snapshot.managedObjectCount = objectCache.GetManagedObjectCount();
                snapshot.managedObjectCap = objectCache.GetManagedObjectCap();
                snapshot.managedObjectRefs.Clear();
                if (snapshot.fetchManagedObjectRefs)
                {
                    objectCache.ForEachManagedObject(obj =>
                    {
                        snapshot.managedObjectRefs.Add(new WeakReference<object>(obj));
                    });
                }
                snapshot.selectedManagedObjectIndex = Math.Min(snapshot.selectedManagedObjectIndex, snapshot.managedObjectRefs.Count - 1);
                snapshot.jsObjectCount = objectCache.GetJSObjectCount();
                snapshot.delegateCount = objectCache.GetDelegateCount();
                snapshot.scriptValueCount = objectCache.GetScriptValueCount();
                // snapshot.scriptPromiseCount = objectCache.GetScriptPromiseCount();
                snapshot.stringCount = stringCache.GetStringCount();

                var timeManager = runtime.GetTimerManager();
                snapshot.activeTimers.Clear();
                snapshot.timeNow = timeManager.now;
                timeManager.ForEach((id, delay, deadline, once) => snapshot.activeTimers.Add(new Snapshot.TimerInfo()
                {
                    id = id,
                    delay = delay,
                    deadline = deadline,
                    once = once,
                }));
            }
        }

        private string GetDescription(object obj)
        {
            try
            {
                return obj.ToString();
            }
            catch (Exception e)
            {
                return "[Error] " + e.Message;
            }
        }

        private void OnStatisticsGUI(Snapshot snapshot)
        {
            EditorGUILayout.BeginVertical();
            Block("Misc.", () =>
            {
                EditorGUILayout.Toggle("Static Bind", snapshot.isStaticBinding);
                EditorGUILayout.IntField("Exported Types", snapshot.exportedTypes);
                EditorGUILayout.TextField("ManagedObject", snapshot.managedObjectCount + "/" + snapshot.managedObjectCap);
                EditorGUILayout.IntField("JSObject", snapshot.jsObjectCount);
                EditorGUILayout.IntField("Delegate Mapping", snapshot.delegateCount);
                EditorGUILayout.IntField("Value Mapping", snapshot.scriptValueCount);
                // EditorGUILayout.IntField("ScriptPromise Mapping", snapshot.scriptPromiseCount);
                EditorGUILayout.IntField("Cached String", snapshot.stringCount);
            });
            Block("Timers", () =>
            {
                EditorGUILayout.IntField("Active Timer", snapshot.activeTimers.Count);
                EditorGUILayout.IntField("Now", snapshot.timeNow);
            });
            Block("JSMemoryUsage", () =>
            {
                EditorGUILayout.TextField("malloc_size", ToSizeText(snapshot.memoryUsage.malloc_size));
                EditorGUILayout.TextField("malloc_limit", ToCountText(snapshot.memoryUsage.malloc_limit));
                EditorGUILayout.TextField("memory_used_size", ToSizeText(snapshot.memoryUsage.memory_used_size));
                EditorGUILayout.TextField("malloc_count", ToCountText(snapshot.memoryUsage.malloc_count));
                EditorGUILayout.TextField("memory_used_count", ToCountText(snapshot.memoryUsage.memory_used_count));
                EditorGUILayout.TextField("atom_count", ToCountText(snapshot.memoryUsage.atom_count));
                EditorGUILayout.TextField("atom_size", ToSizeText(snapshot.memoryUsage.atom_size));
                EditorGUILayout.TextField("str_count", ToCountText(snapshot.memoryUsage.str_count));
                EditorGUILayout.TextField("str_size", ToSizeText(snapshot.memoryUsage.str_size));
                EditorGUILayout.TextField("obj_count", ToCountText(snapshot.memoryUsage.obj_count));
                EditorGUILayout.TextField("obj_size", ToSizeText(snapshot.memoryUsage.obj_size));
                EditorGUILayout.TextField("prop_count", ToCountText(snapshot.memoryUsage.prop_count));
                EditorGUILayout.TextField("prop_size", ToSizeText(snapshot.memoryUsage.prop_size));
                EditorGUILayout.TextField("shape_count", ToCountText(snapshot.memoryUsage.shape_count));
                EditorGUILayout.TextField("shape_size", ToSizeText(snapshot.memoryUsage.shape_size));
                EditorGUILayout.TextField("js_func_count", ToCountText(snapshot.memoryUsage.js_func_count));
                EditorGUILayout.TextField("js_func_size", ToSizeText(snapshot.memoryUsage.js_func_size));
                EditorGUILayout.TextField("js_func_code_size", ToSizeText(snapshot.memoryUsage.js_func_code_size));
                EditorGUILayout.TextField("js_func_pc2line_count", ToCountText(snapshot.memoryUsage.js_func_pc2line_count));
                EditorGUILayout.TextField("js_func_pc2line_size", ToSizeText(snapshot.memoryUsage.js_func_pc2line_size));
                EditorGUILayout.TextField("c_func_count", ToCountText(snapshot.memoryUsage.c_func_count));
                EditorGUILayout.TextField("array_count", ToCountText(snapshot.memoryUsage.array_count));
                EditorGUILayout.TextField("fast_array_count", ToCountText(snapshot.memoryUsage.fast_array_count));
                EditorGUILayout.TextField("fast_array_elements", ToCountText(snapshot.memoryUsage.fast_array_elements));
                EditorGUILayout.TextField("binary_object_count", ToCountText(snapshot.memoryUsage.binary_object_count));
                EditorGUILayout.TextField("binary_object_size", ToSizeText(snapshot.memoryUsage.binary_object_size));
            });
            EditorGUILayout.EndVertical();
        }

        private void OnDrawManagedObjectEntry(Rect rect, int index, WeakReference<object> objRef)
        {
            if (objRef.TryGetTarget(out var item))
            {
                EditorGUI.LabelField(rect, GetDescription(item));
            }
            else
            {
                EditorGUI.LabelField(rect, "Empty Slot");
            }
        }

        private void OnManagedObjectsGUI(Snapshot snapshot)
        {
            EditorGUILayout.BeginHorizontal();
            EditorGUILayout.BeginVertical(GUILayout.Width(100f));
            var rect = EditorGUILayout.GetControlRect(GUILayout.ExpandHeight(true));
            if (snapshot.fetchManagedObjectRefs)
            {

                snapshot.managedObjectRefs.OnDrawItem = OnDrawManagedObjectEntry;
                snapshot.managedObjectRefs.Draw(rect);
            }
            EditorGUILayout.EndVertical();
            EditorGUILayout.BeginVertical();

            var first = snapshot.managedObjectRefs.selection.FirstOrDefault();
            if (first != null && first.TryGetTarget(out var obj))
            {
                InspectObject(obj);
            }
            EditorGUILayout.EndVertical();
            EditorGUILayout.EndHorizontal();
        }

        //TODO unfinished_feature: inspect internal details of object
        private void InspectObject(object selected)
        {
            if (selected == null)
            {
                return;
            }

            var type = selected.GetType();
            EditorGUILayout.LabelField("Type", type.Name);
            EditorGUILayout.Toggle("Primitive", type.IsPrimitive);
            EditorGUILayout.Toggle("Pointer", type.IsPointer);
            if (type.IsPointer)
            {
                return;
            }
            if (type.IsArray)
            {
                var array = selected as Array;
                if (array.Rank == 1)
                {
                    var len = array.GetLength(0);
                    EditorGUILayout.IntField("Length", len);
                    for (var i = 0; i < len; ++i)
                    {
                        InspectObject(array.GetValue(i));
                    }
                }
                return;
            }

            if (type == typeof(string))
            {
                EditorGUILayout.LabelField("String", selected as string);
                return;
            }

            if (type == typeof(GUIContent))
            {
                EditorGUILayout.LabelField(GetCachedTextContent("GUIContent"), selected as GUIContent);
                return;
            }

            var fields = type.GetFields(Binding.DynamicType.DefaultFlags);
            for (var i = 0; i < fields.Length; i++)
            {
                var field = fields[i];
                var fieldValue = field.GetValue(field.IsStatic ? null : selected);
                EditorGUILayout.LabelField(field.Name, GetDescription(fieldValue));
            }
        }

        private void OnTimersGUI(Snapshot snapshot)
        {
            EditorGUILayout.BeginVertical();
            EditorGUILayout.IntField("Now", snapshot.timeNow);

            var count = snapshot.activeTimers.Count;
            if (count > 0)
            {
                EditorGUILayout.BeginHorizontal();
                EditorGUILayout.LabelField("ID");
                EditorGUILayout.LabelField("Delay");
                EditorGUILayout.LabelField("Deadline");
                EditorGUILayout.EndHorizontal();
                for (var i = 0; i < count; i++)
                {
                    var t = snapshot.activeTimers[i];
                    EditorGUILayout.BeginHorizontal();
                    EditorGUILayout.TextField(t.id.ToString());
                    EditorGUILayout.IntField(t.delay);
                    EditorGUILayout.IntField(t.deadline);
                    EditorGUILayout.EndHorizontal();
                }
            }
            EditorGUILayout.EndVertical();
        }

        private void InspectSnapshot(Snapshot snapshot)
        {
            lock (snapshot)
            {
                if (!snapshot.alive)
                {
                    EditorGUILayout.HelpBox("This runtime isn't alive.", MessageType.Info);
                    return;
                }

                _categoryIndex = GUILayout.Toolbar(_categoryIndex, _categoryLabels);
                _categoryDrawers[_categoryIndex](snapshot);
            }
        }

        protected override void OnUpdate()
        {
            if (_autoCap)
            {
                var rt = Time.realtimeSinceStartup;

                if (rt - _time > _timeCap)
                {
                    _time = rt;
                    CaptureAll();
                }
            }
        }

        private void CaptureAll()
        {
            for (int i = 0, count = _snapshots.Count; i < count; i++)
            {
                var snapshot = _snapshots[i];
                snapshot.alive = false;
            }
            _alive = ScriptEngine.ForEachRuntime(runtime => Capture(runtime));

            for (int i = 0, count = _snapshots.Count; i < count; i++)
            {
                var snapshot = _snapshots[i];
                if (snapshot.alive)
                {
                    _snapshotNames[i] = snapshot.id.ToString();
                }
                else
                {
                    _snapshotNames[i] = snapshot.id.ToString() + " (dead)";
                }
            }
            Repaint();
        }

        protected override void OnPaint()
        {
            _alive = ScriptEngine.ForEachRuntime(runtime => { });

            using (var scrollViewScope = new EditorGUILayout.ScrollViewScope(_sv))
            {
                _sv = scrollViewScope.scrollPosition;

                Block("Control", () =>
                {
                    EditorGUI.BeginDisabledGroup(EditorApplication.isCompiling);
                    EditorGUILayout.BeginHorizontal();
                    EditorGUILayout.LabelField("Engine");
                    var selectedBackend = Array.IndexOf(_backends, Native.JSApi.JSBDLL);
                    var selectedBackendNew = GUILayout.Toolbar(selectedBackend, _backends);
                    if (selectedBackendNew != selectedBackend)
                    {
                        if (EditorUtility.DisplayDialog("Switching backend", "Are you sure to switch to " + _backends[selectedBackendNew] + "?", "Confirm", "Cancel"))
                        {
                            UnityHelper.SetDefineSymbol("JSB_WITH_V8_BACKEND", _backends[selectedBackendNew] != "quickjs");
                        }
                    }
                    EditorGUILayout.EndHorizontal();
                    if (_backends[selectedBackendNew] != "quickjs")
                    {
                        EditorGUILayout.HelpBox("v8-bridge is still in experimental stage, the stability and the performance are unsure.", MessageType.Warning);
                    }
                    EditorGUI.EndDisabledGroup();

                    var old_isDebugMode = Native.JSApi.IsDebugMode();
                    var new_isDebugMode = EditorGUILayout.Toggle("IsDebugMode", old_isDebugMode);
                    if (new_isDebugMode != old_isDebugMode)
                    {
                        if (EditorUtility.DisplayDialog("Setting debug symbol", "Are you sure to " + (new_isDebugMode ? "set" : "unset") + " debug mode?", "Confirm", "Cancel"))
                        {
                            UnityHelper.SetDefineSymbol("JSB_DEBUG", new_isDebugMode);
                        }
                    }
                    EditorGUI.BeginDisabledGroup(true);
                    EditorGUILayout.IntField("Dll Version", Native.JSApi.SO_JSB_VERSION);
                    if (Native.JSApi.CS_JSB_VERSION != Native.JSApi.SO_JSB_VERSION)
                    {
                        EditorGUILayout.HelpBox("The version of imported dll doesn't equal to " + Native.JSApi.CS_JSB_VERSION, MessageType.Warning);
                    }
                    EditorGUILayout.Toggle(GUIContent_Stats_Operator, Native.JSApi.IsOperatorOverloadingSupported);
                    EditorGUI.EndDisabledGroup();

                    _fetchManagedObjectRefs = EditorGUILayout.Toggle("Show Refs", _fetchManagedObjectRefs);
                    _autoCap = EditorGUILayout.Toggle("Auto Refresh", _autoCap);
                    EditorGUI.BeginDisabledGroup(!_autoCap);
                    _timeCap = EditorGUILayout.Slider("Interval", _timeCap, 1f, 30f);
                    EditorGUI.EndDisabledGroup();

                    _selectedSnapshotIndex = EditorGUILayout.Popup("Snapshot", _selectedSnapshotIndex, _snapshotNames);
                });

                if (_alive == 0)
                {
                    EditorGUILayout.HelpBox("No Running Runtime", MessageType.Info);
                    return;
                }

                if (_selectedSnapshotIndex >= 0 && _selectedSnapshotIndex < _snapshots.Count)
                {
                    InspectSnapshot(_snapshots[_selectedSnapshotIndex]);
                }
            }
        } // end OnPaint()
    }
}

#endif
