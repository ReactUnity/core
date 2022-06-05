#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;
    using UnityEditor.IMGUI.Controls;
    using QuickJS.Binding;

    // 配置编辑器
    public class PrefsEditor : BaseEditorWindow
    {
        internal abstract class TreeViewNode<T> : SimpleTreeView.INode
        {
            protected bool _expanded = true;

            protected T _value;
            protected GUIContent _content;
            private bool _isSizeCached;
            private Vector2 _contentSize;
            protected List<SimpleTreeView.INode> _children = new List<SimpleTreeView.INode>();

            public T value => _value;

            public GUIContent content => _content;

            public int childCount => _children.Count;

            public bool isExpanded
            {
                get { return _expanded; }
                set { _expanded = value; }
            }

            public bool CollapseAll()
            {
                var change = false;
                if (_expanded)
                {
                    _expanded = false;
                    change = true;
                }

                foreach (var child in _children)
                {
                    if (child.CollapseAll())
                    {
                        change = true;
                    }
                }
                return change;
            }

            public bool ExpandAll()
            {
                var change = false;
                if (!_expanded)
                {
                    _expanded = true; change = true;
                }

                foreach (var child in _children)
                {
                    if (child.ExpandAll())
                    {
                        change = true;
                    }
                }
                return change;
            }

            public void ShowContextMenu(SimpleTreeView.State state)
            {
                var menu = new GenericMenu();
                menu.AddItem(new GUIContent("Expand All"), false, () => state.ExpandAll());
                menu.AddItem(new GUIContent("Collapse All"), false, () => state.CollapseAll());
                menu.ShowAsContext();
            }

            public void AddChild(SimpleTreeView.INode node)
            {
                _children.Add(node);
            }

            public Vector2 CalcSize(GUIStyle style)
            {
                if (!_isSizeCached)
                {
                    _isSizeCached = true;
                    _contentSize = style.CalcSize(content);
                }
                return _contentSize;
            }

            public void Prepass(SimpleTreeView.State state)
            {
                state.AddSpace(this);
                if (_expanded)
                {
                    state.PushGroup();
                    for (int i = 0, count = _children.Count; i < count; ++i)
                    {
                        _children[i].Prepass(state);
                    }
                    state.PopGroup();
                }
            }

            public bool Render(SimpleTreeView.State state)
            {
                if (state.Render(this))
                {
                    if (_expanded)
                    {
                        state.PushGroup();
                        for (int i = 0, count = _children.Count; i < count; ++i)
                        {
                            if (!_children[i].Render(state))
                            {
                                return false;
                            }
                        }
                        state.PopGroup();
                    }
                    return true;
                }
                return false;
            }
        }

        internal class Type_TreeViewNode : TreeViewNode<Type>
        {
            private GUIContent _fullNameContent;

            public GUIContent FullName => _fullNameContent;

            public Type_TreeViewNode(Type type)
            {
                var icon = GetIcon(type);

                _value = type;
                _content = new GUIContent(type.Name, icon);
                _fullNameContent = new GUIContent(type.FullName, icon);
            }

            public static Texture GetIcon(Type type)
            {
                if (type.IsEnum)
                {
                    return UnityHelper.GetIcon("EnumIcon");
                }

                if (type.IsValueType)
                {
                    return UnityHelper.GetIcon("StructIcon");
                }

                return UnityHelper.GetIcon("ClassIcon");
            }

            public bool MatchString(string pattern)
            {
                return _value.FullName.IndexOf(pattern, StringComparison.OrdinalIgnoreCase) >= 0;
            }

            public override string ToString()
            {
                return _value.Name;
            }
        }

        internal class Namespace_TreeViewNode : TreeViewNode<string>
        {
            public Namespace_TreeViewNode(string ns)
            {
                _value = ns;
                _content = new GUIContent(ns, UnityHelper.GetIcon("NamespaceIcon"));
            }

            public override string ToString()
            {
                return _value;
            }
        }

        internal class Assembly_TreeViewNode : TreeViewNode<Assembly>
        {
            private Dictionary<string, Namespace_TreeViewNode> _allNamespaces = new Dictionary<string, Namespace_TreeViewNode>();

            public Namespace_TreeViewNode GetNamespace_TreeViewNode(string ns)
            {
                var name = string.IsNullOrEmpty(ns) ? "-" : ns;
                Namespace_TreeViewNode node;
                if (!_allNamespaces.TryGetValue(name, out node))
                {
                    _allNamespaces[name] = node = new Namespace_TreeViewNode(name);
                    AddChild(node);
                }
                return node;
            }

            public Assembly_TreeViewNode(Assembly assembly)
            {
                _value = assembly;
                _content = new GUIContent(assembly.GetName().Name, UnityHelper.GetIcon("AssemblyIcon"));
            }

            public override string ToString()
            {
                return _value.GetName().Name;
            }
        }

        internal interface IView
        {
            void Draw(PrefsEditor context);
        }

        internal class NoneView : IView
        {
            public void Draw(PrefsEditor context)
            {
                EditorGUILayout.HelpBox("Nothing", MessageType.Warning);
            }
        }

        internal class NamespaceInfoView : IView
        {
            public string _namespace;

            public void Show(string ns)
            {
                _namespace = ns;
            }

            public void Draw(PrefsEditor context)
            {
                if (_namespace == "-")
                {
                    EditorGUILayout.HelpBox("It's not a real namespace (types without namespace)", MessageType.Info);
                }
                else
                {
                    EditorGUILayout.LabelField("Namespace", _namespace);
                    var blocked = context._bindingManager.IsNamespaceInBlacklist(_namespace);
                    var blocked_t = EditorGUILayout.Toggle("Blacklisted", blocked);
                    if (blocked_t != blocked)
                    {
                        if (blocked_t)
                        {
                            context._bindingManager.AddNamespaceBlacklist(_namespace);
                            context._prefs.namespaceBlacklist.Add(_namespace);
                        }
                        else
                        {
                            context._bindingManager.RemoveNamespaceBlacklist(_namespace);
                            context._prefs.namespaceBlacklist.Remove(_namespace);
                        }
                        context.MarkAsDirty();
                    }
                }
            }
        }

        internal class TypeInfoView : IView
        {
            private Type _type;

            public void Show(Type type)
            {
                _type = type;
            }

            public void Draw(PrefsEditor context)
            {
                if (_type == null)
                {
                    EditorGUILayout.HelpBox("No type is seleted", MessageType.Warning);
                    return;
                }

                if (DrawTypeBindingInfo(context._bindingManager.GetExportedType(_type)))
                {
                    return;
                }

                if (DrawRawTypeBindingInfo(context._bindingManager.GetExportedRawType(_type)))
                {
                    return;
                }

                EditorGUILayout.HelpBox(_type.Name + " will not be exported to the script runtime", MessageType.Warning);
            }

            private bool DrawRawTypeBindingInfo(RawTypeBindingInfo rawTypeBindingInfo)
            {
                if (rawTypeBindingInfo == null)
                {
                    return false;
                }
                EditorGUI.BeginDisabledGroup(true);
                EditorGUILayout.TextField("Raw Binding", rawTypeBindingInfo.jsName);
                EditorGUI.EndDisabledGroup();
                return true;
            }

            private bool DrawTypeBindingInfo(TypeBindingInfo typeBindingInfo)
            {
                if (typeBindingInfo == null)
                {
                    return false;
                }

                EditorGUI.BeginDisabledGroup(true);
                EditorGUILayout.Toggle("Managed", typeBindingInfo.disposable);
                EditorGUILayout.TextField("Binding", typeBindingInfo.csBindingName ?? string.Empty);

                var tsTypeNaming = typeBindingInfo.tsTypeNaming;
                EditorGUILayout.TextField("JS Module", tsTypeNaming.jsModule);
                EditorGUILayout.TextField("JS Namespace", tsTypeNaming.jsNamespace);
                EditorGUILayout.TextField("JS Name", tsTypeNaming.jsLocalName);

                var requiredDefines = typeBindingInfo.transform.requiredDefines;
                if (requiredDefines != null && requiredDefines.Count > 0)
                {
                    EditorGUILayout.LabelField("Required Defines");
                    foreach (var def in requiredDefines)
                    {
                        EditorGUILayout.TextField(def);
                    }
                }
                EditorGUI.EndDisabledGroup();
                return true;
            }
        }

        internal class AssemblyInfoView : IView
        {
            private Assembly _assembly;

            public void Show(Assembly assembly)
            {
                _assembly = assembly;
            }

            public void Draw(PrefsEditor context)
            {
                if (_assembly == null)
                {
                    EditorGUILayout.HelpBox("No assembly is seleted", MessageType.Warning);
                    return;
                }

                var name = context._bindingManager.GetSimplifiedAssemblyName(_assembly);
                var blocked = context._bindingManager.InAssemblyBlacklist(name);

                EditorGUILayout.LabelField("Assembly", _assembly.FullName);
                EditorGUILayout.LabelField("Location", _assembly.Location);
                var blocked_t = EditorGUILayout.Toggle("Blacklisted", blocked);
                if (blocked_t != blocked)
                {
                    if (blocked_t)
                    {
                        context._bindingManager.AddAssemblyBlacklist(name);
                        context._prefs.assemblyBlacklist.Add(name);
                    }
                    else
                    {
                        context._bindingManager.RemoveAssemblyBlacklist(name);
                        context._prefs.assemblyBlacklist.Remove(name);
                    }
                    context.MarkAsDirty();
                }
            }
        }

        private Prefs _prefs;
        private bool _dirty;
        private BindingManager _bindingManager;

        private int _selectedTabViewIndex;

        [NonSerialized]
        private GUIContent[] _tabViewNames = new GUIContent[] { };
        private Action[] _tabViewDrawers = new Action[] { };
        private string[] _newlineValues = new string[] { "cr", "lf", "crlf", "" };
        private string[] _newlineNames = new string[] { "UNIX", "MacOS", "Windows", "Auto" };
        private int _selectedBindingMethod;
        private string[] _bindingMethodValues = new string[] { "Reflect Bind", "Static Bind", "In-Memory Bind" };
        private string[] _bindingMethodDescriptions = new string[] { "Reflect Bind", "Static Bind", "In-Memory Bind (experimental)" };

        private GUIStyle _footStyle;
        private SearchField _searchField;
        private string _lastSearchString = string.Empty;

        private System.Collections.IEnumerator _typeTreeConstruct;
        private int _typeTreeConstructWalk;
        private int _typeTreeConstructAll;

        private List<Type_TreeViewNode> _typeNodes = new List<Type_TreeViewNode>();

        private SimpleTreeView _treeView = new SimpleTreeView();
        private SimpleListView<Type_TreeViewNode> _listView = new SimpleListView<Type_TreeViewNode>();
        private SimpleSplitView _splitView = new SimpleSplitView();
        private List<IView> _allViews = new List<IView>();
        private IView _activeView;

        private List<string> _repeatStringCache = new List<string>(new string[] { "" });
        [NonSerialized]
        private Vector2 _scrollPosition_TypeCastRegistry;
        [NonSerialized]
        private Vector2 _scrollPosition_Codegen;
        [NonSerialized]
        private Rect _typesViewRect;

        public void AddTabView(string name, Action action)
        {
            ArrayUtility.Add(ref _tabViewNames, new GUIContent(name));
            ArrayUtility.Add(ref _tabViewDrawers, action);
        }

        private Type_TreeViewNode ConstructTypeNode<T>(TreeViewNode<T> parent, Dictionary<Type, Type_TreeViewNode> cache, Type type)
        {
            Type_TreeViewNode self;
            if (!cache.TryGetValue(type, out self))
            {
                self = new Type_TreeViewNode(type);
                cache[type] = self;
                _typeNodes.Add(self);
                if (type.DeclaringType != null)
                {
                    var declaringType = ConstructTypeNode(parent, cache, type.DeclaringType);
                    declaringType.AddChild(self);
                }
                else
                {
                    parent.AddChild(self);
                }
            }

            return self;
        }

        private System.Collections.IEnumerator ConstructAssemblyNode(Assembly assembly, Type[] types)
        {
            if (types.Length == 0)
            {
                yield break;
            }
            _typeTreeConstructAll += types.Length;
            var node = new Assembly_TreeViewNode(assembly);

            Array.Sort<Type>(types, (a, b) => string.Compare(a.FullName, b.FullName, true));
            var cache = new Dictionary<Type, Type_TreeViewNode>();
            foreach (var type in types)
            {
                _typeTreeConstructWalk++;
                if (type.IsGenericTypeDefinition)
                {
                    continue;
                }

                var ns = node.GetNamespace_TreeViewNode(type.Namespace);
                ConstructTypeNode(ns, cache, type);
                yield return null;
            }

            if (node.childCount > 0)
            {
                _treeView.Add(node);
            }

            yield break;
        }

        protected override void OnEnable()
        {
            base.OnEnable();

            var args = new BindingManager.Args()
            {
                utils = new UnityBindingUtils(),
            };

            _prefs = PrefsLoader.CurrentPrefs;
            _dirty = string.IsNullOrEmpty(_prefs.filePath);
            _selectedBindingMethod = Array.IndexOf(_bindingMethodValues, _prefs.preferredBindingMethod);
            _bindingManager = new BindingManager(_prefs, args);
            _bindingManager.Collect();
            _bindingManager.Generate(TypeBindingFlags.None);
            _bindingManager.Report();

            AddTabView("Types", DrawView_Types);
            AddTabView("Codegen", DrawView_Codegen);
            AddTabView("Type Cast Registry", DrawView_TypeCastRegistry);
            AddTabView("Scripting", DrawView_Scripting);
            OnDirtyStateChanged();
        }

        public void MarkAsDirty()
        {
            if (!_dirty)
            {
                _dirty = true;
                OnDirtyStateChanged();
                // EditorApplication.delayCall += Save;
            }
        }

        public void Save()
        {
            if (_dirty)
            {
                _dirty = false;
                OnDirtyStateChanged();
                try
                {
                    var isNewFile = !File.Exists(Prefs.PATH);
                    var json = JsonUtility.ToJson(_prefs, true);
                    System.IO.File.WriteAllText(Prefs.PATH, json);
                    _prefs.filePath = Prefs.PATH;
                    Debug.LogFormat("saved {0}", Prefs.PATH);
                }
                catch (Exception exception)
                {
                    Debug.LogWarning(exception);
                }
            }
        }

        private void OnDirtyStateChanged()
        {
            titleContent = new GUIContent("JS Bridge Prefs" + (_dirty ? " *" : ""));
        }

        private void OnDrawItem(Rect rect, Type type)
        {
            GUI.Label(rect, type.FullName);
        }

        private void DrawView_Scripting()
        {
            Block("Basic", () =>
            {
                EditorGUI.BeginChangeCheck();
                _prefs.editorScripting = EditorGUILayout.Toggle("Editor Scripting", _prefs.editorScripting);
                var selectedBindingMethod_t = EditorGUILayout.Popup("Binding Method", _selectedBindingMethod, _bindingMethodDescriptions);
                if (_selectedBindingMethod != selectedBindingMethod_t)
                {
                    _selectedBindingMethod = selectedBindingMethod_t;
                    _prefs.preferredBindingMethod = _bindingMethodValues[Mathf.Clamp(_selectedBindingMethod, 0, _bindingMethodValues.Length - 1)];
                }
                if (!CodeGenUtils.IsCodeEmitSupported() && _prefs.preferredBindingMethod == _bindingMethodValues[0])
                {
                    EditorGUILayout.HelpBox(CodeGenUtils.CodeEmitWarning, MessageType.Warning);
                }
                _prefs.typescriptExt = EditorGUILayout.TextField("Typescript Ext", _prefs.typescriptExt);
                _prefs.sourceDir = EditorGUILayout.TextField("Source Dir", _prefs.sourceDir);

                if (EditorGUI.EndChangeCheck())
                {
                    MarkAsDirty();
                }
            });

            Block("Editor Scripts", () =>
            {
                EditorGUI.BeginChangeCheck();
                _prefs.editorEntryPoint = EditorGUILayout.TextField("Entry Point", _prefs.editorEntryPoint);
                _prefs.editorDecoratorScript = EditorGUILayout.TextField("Decorator Definition", _prefs.editorDecoratorScript);

                if (EditorGUI.EndChangeCheck())
                {
                    MarkAsDirty();
                }
            });

            Block("Preloaded Modules", () =>
            {
                if (_prefs.editorRequires == null)
                {
                    _prefs.editorRequires = new List<string>();
                }

                var count = _prefs.editorRequires.Count;
                for (var i = 0; i < count;)
                {
                    EditorGUILayout.BeginHorizontal();
                    var do_delete = GUILayout.Button("X", GUILayout.Width(22f));
                    var mod_old = _prefs.editorRequires[i] ?? string.Empty;
                    var mod_new = EditorGUILayout.TextField(mod_old);
                    EditorGUILayout.EndHorizontal();

                    if (do_delete)
                    {
                        --count;
                        continue;
                    }

                    if (mod_new != mod_old)
                    {
                        _prefs.editorRequires[i] = mod_new;
                        MarkAsDirty();
                    }
                    ++i;
                }
            }, () =>
            {
                if (GUILayout.Button("+", GUILayout.Width(22f)))
                {
                    _prefs.editorRequires.Add("");
                    MarkAsDirty();
                }
            });

            Block("AssetPost Processors", () =>
            {
                if (_prefs.assetPostProcessors == null)
                {
                    _prefs.assetPostProcessors = new List<string>();
                }

                foreach (var assetPostProcessor in _prefs.assetPostProcessors)
                {
                    EditorGUILayout.TextField(assetPostProcessor);
                }
            }, () =>
            {
                if (GUILayout.Button("+", GUILayout.Width(22f)))
                {
                    _prefs.assetPostProcessors.Add("");
                    MarkAsDirty();
                }
            });
        }

        private string RepeatString(string v, int repeat)
        {
            while (_repeatStringCache.Count < repeat + 1)
            {
                _repeatStringCache.Add(_repeatStringCache[_repeatStringCache.Count - 1] + v);
            }
            return _repeatStringCache[repeat];
        }

        private void DrawView_TypeCastRegistry()
        {
            //TODO jsb.editor/prefs: draw it as a tree
            using (var scope = new EditorGUILayout.ScrollViewScope(_scrollPosition_TypeCastRegistry))
            {
                _scrollPosition_TypeCastRegistry = scope.scrollPosition;
                Block("js_get: " + Values._JSCastMap.Count, () =>
                {
                    foreach (var kv in Values._JSCastMap)
                    {
                        EditorGUILayout.TextField(string.Format("{0}: {1}", _bindingManager.GetCSTypeFullName(kv.Value), _bindingManager.GetCSTypeFullName(kv.Key)));
                    }
                });

                Block("js_rebind: " + Values._JSRebindMap.Count, () =>
                {
                    foreach (var kv in Values._JSRebindMap)
                    {
                        EditorGUILayout.TextField(string.Format("{0}: {1}", _bindingManager.GetCSTypeFullName(kv.Value), _bindingManager.GetCSTypeFullName(kv.Key)));
                    }
                });

                Block("js_push: " + Values._CSCastMap.Count, () =>
                {
                    foreach (var kv in Values._CSCastMap)
                    {
                        EditorGUILayout.TextField(string.Format("{0}: {1}", _bindingManager.GetCSTypeFullName(kv.Value), _bindingManager.GetCSTypeFullName(kv.Key)));
                    }
                });

                Block("js_new: " + Values._JSNewMap.Count, () =>
                {
                    foreach (var kv in Values._JSNewMap)
                    {
                        EditorGUILayout.TextField(string.Format("{0}: {1}", _bindingManager.GetCSTypeFullName(kv.Value), _bindingManager.GetCSTypeFullName(kv.Key)));
                    }
                });
            }
        }

        private void DrawView_Codegen()
        {
            using (var scope = new EditorGUILayout.ScrollViewScope(_scrollPosition_Codegen))
            {
                EditorGUI.BeginChangeCheck();
                _scrollPosition_Codegen = scope.scrollPosition;
                Block("Binding Options", () =>
                {
                    _prefs.optToString = EditorGUILayout.Toggle("Auto ToString", _prefs.optToString);
                    _prefs.enableOperatorOverloading = EditorGUILayout.Toggle("Operator Overloading", _prefs.enableOperatorOverloading);
                    _prefs.skipDelegateWithByRefParams = EditorGUILayout.Toggle("Omit ref param Delegates", _prefs.skipDelegateWithByRefParams);
                    _prefs.alwaysCheckArgType = EditorGUILayout.Toggle("Always check arg type", _prefs.alwaysCheckArgType);
                    _prefs.alwaysCheckArgc = EditorGUILayout.Toggle("Always check argc", _prefs.alwaysCheckArgc);
                    _prefs.typeBindingPrefix = EditorGUILayout.TextField("C# Binding Prefix", _prefs.typeBindingPrefix);
                    _prefs.ns = EditorGUILayout.TextField("C# Binding Namespace", _prefs.ns);
                    _prefs.outDir = EditorGUILayout.TextField("Output Dir", _prefs.outDir);
                    _prefs.genTypescriptDoc = EditorGUILayout.Toggle("Gen d.ts", _prefs.genTypescriptDoc);
                    _prefs.xmlDocDir = EditorGUILayout.TextField("XmlDoc Dir", _prefs.xmlDocDir);
                    _prefs.typescriptDir = EditorGUILayout.TextField("d.ts Output Dir", _prefs.typescriptDir);
                    _prefs.jsModulePackInfoPath = EditorGUILayout.TextField("JS Module List", _prefs.jsModulePackInfoPath);
                    _prefs.defaultJSModule = EditorGUILayout.TextField("Default Module", _prefs.defaultJSModule);
                });

                Block("Code Style", () =>
                {
                    _prefs.tsdSizeThreshold = EditorGUILayout.IntField("TSD Slice Size", _prefs.tsdSizeThreshold);
                    _prefs.tab = RepeatString(" ", EditorGUILayout.IntSlider("Tab Size", _prefs.tab.Length, 0, 8));
                    var newlineIndex = Array.IndexOf(_newlineValues, _prefs.newLineStyle);
                    var newlineIndex_t = EditorGUILayout.Popup("Newline Style", newlineIndex, _newlineNames);
                    if (newlineIndex_t != newlineIndex && newlineIndex_t >= 0)
                    {
                        _prefs.newLineStyle = _newlineValues[newlineIndex_t];
                    }
                });

                Block("Advanced (Experimental)", () =>
                {
                    _prefs.randomizedBindingCode = EditorGUILayout.Toggle("Obfuscate", _prefs.randomizedBindingCode);
                });

                Block("Custom Binding Process", () =>
                {
                    var list = _bindingManager.GetBindingProcessTypes();
                    for (int i = 0, count = list.Count; i < count; ++i)
                    {
                        var process = list[i];
                        var name = process.FullName;
                        var enabled = !_prefs.skipBinding.Contains(name);
                        var state = EditorGUILayout.ToggleLeft(name, enabled);
                        if (state != enabled)
                        {
                            if (state)
                            {
                                _prefs.skipBinding.Remove(name);
                            }
                            else
                            {
                                _prefs.skipBinding.Add(name);
                            }
                            MarkAsDirty();
                        } // end if: enabled
                    } // end for: list
                }); // end block: custom binding process

                Block("Diagnostics", () =>
                {
                    _prefs.debugCodegen = EditorGUILayout.Toggle("Debug Codegen", _prefs.debugCodegen);
                    _prefs.verboseLog = EditorGUILayout.Toggle("Verbose Log", _prefs.verboseLog);
                    _prefs.logPath = EditorGUILayout.TextField("Log", _prefs.logPath);
                });

                if (EditorGUI.EndChangeCheck())
                {
                    MarkAsDirty();
                }
            }
        }

        private void DrawView_Types()
        {
            var y = 90f;
            _typesViewRect.Set(0f, y, position.width, position.height - y);
            var repaint = _splitView.Draw(_typesViewRect);

            _typesViewRect.Set(0f, y, _splitView.cursorChangeRect.x, position.height - y);
            GUILayout.BeginArea(_typesViewRect);
            DrawView_Types_Left();
            GUILayout.EndArea();

            _typesViewRect.Set(_splitView.cursorChangeRect.xMax, y, position.width - _splitView.cursorChangeRect.x, position.height - y);
            GUILayout.BeginArea(_typesViewRect);
            DrawView_Types_Right();
            GUILayout.EndArea();

            if (repaint)
            {
                Repaint();
            }
        }

        private void DrawView_Types_Right()
        {
            _activeView?.Draw(this);
        }

        private System.Collections.IEnumerator ConstructTypeTree()
        {
            var assemblyList = AppDomain.CurrentDomain.GetAssemblies();
            Array.Sort<Assembly>(assemblyList, (a, b) => string.Compare(a.FullName, b.FullName, true));
            List<Tuple<Assembly, Type[]>> aTypes = new List<Tuple<Assembly, Type[]>>(assemblyList.Length);
            foreach (var assembly in assemblyList)
            {
                if (!assembly.IsDynamic)
                {
                    var types = assembly.GetExportedTypes();
                    aTypes.Add(new Tuple<Assembly, Type[]>(assembly, types));
                    _typeTreeConstructAll += types.Length;
                }
            }

            for (int i = 0, count = aTypes.Count; i < count; i++)
            {
                var tuple = aTypes[i];
                var e = ConstructAssemblyNode(tuple.Item1, tuple.Item2);
                while (e.MoveNext())
                {
                    yield return null;
                }

                _treeView.Invalidate();
            }
            _typeTreeConstruct = null;
        }

        private void DrawView_Types_Left()
        {
            if (_searchField == null)
            {
                if (_typeTreeConstruct == null)
                {
                    _typeTreeConstruct = ConstructTypeTree();
                }
                _treeView.OnSelectItem = OnSelectTreeViewItem;
                _listView.OnDrawItem = (rect, index, node) => GUI.Label(rect, node.FullName, EditorStyles.label);
                _listView.OnSelectItem = OnSelectListViewItem;
                _searchField = new SearchField();
                _searchField.autoSetFocusOnFindCommand = true;
            }

            var searchFieldRect = EditorGUILayout.GetControlRect();
            var searchString = _searchField.OnGUI(searchFieldRect, _lastSearchString);
            if (_lastSearchString != searchString)
            {
                _lastSearchString = searchString;
                _listView.Clear();
                if (!string.IsNullOrEmpty(_lastSearchString))
                {
                    foreach (var t in _typeNodes)
                    {
                        if (t.MatchString(_lastSearchString))
                        {
                            _listView.Add(t);
                        }
                    }
                }
            }

            if (_footStyle == null)
            {
                _footStyle = new GUIStyle(EditorStyles.miniLabel);
                _footStyle.alignment = TextAnchor.MiddleRight;
            }

            var typesViewRect = EditorGUILayout.GetControlRect(GUILayout.ExpandHeight(true));
            var pendingHint = string.Empty;

            if (_typeTreeConstruct != null)
            {
                pendingHint = $"(Loading... {ToPercent((float)_typeTreeConstructWalk / _typeTreeConstructAll)}%) ";
                Repaint();
            }

            if (string.IsNullOrEmpty(_lastSearchString))
            {
                if (_treeView.Draw(typesViewRect))
                {
                    Repaint();
                }
                GUILayout.Label($"{pendingHint}{_typeNodes.Count} Types", _footStyle);
            }
            else
            {
                _listView.Draw(typesViewRect);
                GUILayout.Label($"{pendingHint}{_listView.Count} Types", _footStyle);
            }
        }

        private static int ToPercent(float p)
        {
            return Mathf.FloorToInt(p * 100f);
        }

        private T SetActiveView<T>()
        where T : IView, new()
        {
            Repaint();

            foreach (var view in _allViews)
            {
                if (view.GetType() == typeof(T))
                {
                    _activeView = view;
                    return (T)view;
                }
            }

            var newView = new T();
            _allViews.Add(newView);
            _activeView = newView;

            return newView;
        }

        private void OnSelectTreeViewItem(SimpleTreeView.INode item, HashSet<SimpleTreeView.INode> selection)
        {
            if (item is Assembly_TreeViewNode)
            {
                Defer(() => SetActiveView<AssemblyInfoView>().Show((item as Assembly_TreeViewNode).value));
            }
            else if (item is Type_TreeViewNode)
            {
                Defer(() => SetActiveView<TypeInfoView>().Show((item as Type_TreeViewNode).value));
            }
            else if (item is Namespace_TreeViewNode)
            {
                Defer(() => SetActiveView<NamespaceInfoView>().Show((item as Namespace_TreeViewNode).value));
            }
            else
            {
                Defer(() => SetActiveView<NoneView>());
            }
            Repaint();
        }

        private void OnSelectListViewItem(Type_TreeViewNode item, HashSet<Type_TreeViewNode> selection)
        {
            _treeView.Select(item);
            Defer(() => SetActiveView<TypeInfoView>().Show(item.value));
            Repaint();
        }

        protected override void OnUpdate()
        {
            var cycle = 5;
            while (_typeTreeConstruct != null && --cycle > 0)
            {
                _typeTreeConstruct.MoveNext();
            }
        }

        protected override void OnPaint()
        {
            EditorGUILayout.BeginHorizontal();
            EditorGUI.BeginDisabledGroup(!_dirty);
            if (GUILayout.Button("Save", EditorStyles.miniButton, GUILayout.Width(46f)))
            {
                Save();
            }
            EditorGUI.EndDisabledGroup();
            EditorGUILayout.EndHorizontal();
            var fileType = string.IsNullOrEmpty(_prefs.filePath) ? "in memory" : "from file";
            EditorGUILayout.HelpBox($"(experimental) Editor for {Prefs.PATH} ({fileType})", MessageType.Warning);

            _selectedTabViewIndex = GUILayout.Toolbar(_selectedTabViewIndex, _tabViewNames);
            _tabViewDrawers[_selectedTabViewIndex]();
        }
    }
}
#endif
