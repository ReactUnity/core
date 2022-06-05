#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEngine;
    using UnityEditor;

    /// <summary>
    /// ScriptEditorWindowLauncher is an experimental unfinished feature. 
    /// it could be used to open editor windows implemented in typescript, 
    /// we need this because there is no open api in Unity to dynamically create menu item at the moment.
    /// </summary>
    public class ScriptEditorWindowLauncher : BaseEditorWindow, IHasCustomMenu
    {
        [Serializable]
        public enum ListMode
        {
            Icons,
            List,
        }
        private const JSScriptClassType classTypes =
            JSScriptClassType.EditorWindow |
            JSScriptClassType.CustomEditor |
            JSScriptClassType.MonoBehaviour |
            JSScriptClassType.ScriptableObject;

        private GUIContent _scriptIcon;
        private GUIContent _InspectorIcon;
        private GUIContent _EditorWindowIcon;
        private GUIContent _ScriptableObjectIcon;
        private GUIContent _MonoBehaviourIcon;
        private Vector2 _scriptListViewScrollPosition;
        private List<JSScriptClassPathHint> _scriptClassPaths;
        private GUIStyle _footStyle;

        [SerializeField]
        private ListMode _listMode;

        void Awake()
        {
            _scriptIcon = new GUIContent(UnityHelper.LoadPackageAsset<Texture>("Editor/Icons/JsScript.png"));
            _InspectorIcon = new GUIContent(UnityHelper.LoadPackageAsset<Texture>("Editor/Icons/InspectorIcon.png"));
            _EditorWindowIcon = new GUIContent(UnityHelper.LoadPackageAsset<Texture>("Editor/Icons/EditorWindowIcon.png"));
            _ScriptableObjectIcon = new GUIContent(UnityHelper.LoadPackageAsset<Texture>("Editor/Icons/ScriptableObjectIcon.png"));
            _MonoBehaviourIcon = new GUIContent(UnityHelper.LoadPackageAsset<Texture>("Editor/Icons/MonoBehaviourIcon.png"));
            Reset();
        }

        void OnDestroy()
        {
            JSScriptFinder.GetInstance().ScriptClassPathsUpdated -= OnScriptClassPathsUpdated;
        }

        protected override void OnEnable()
        {
            base.OnEnable();
            titleContent = new GUIContent("Launchpad", _scriptIcon.image);
        }

        private void OnScriptClassPathsUpdated()
        {
            _scriptClassPaths.Clear();
            JSScriptFinder.GetInstance().Search(classTypes, _scriptClassPaths);
        }

        private GUIContent GetIcon(JSScriptClassType type)
        {
            switch (type)
            {
                case JSScriptClassType.CustomEditor: return _InspectorIcon;
                case JSScriptClassType.MonoBehaviour: return _MonoBehaviourIcon;
                case JSScriptClassType.EditorWindow: return _EditorWindowIcon;
                case JSScriptClassType.ScriptableObject: return _ScriptableObjectIcon;
                default: return _scriptIcon;
            }
        }

        private void DrawScriptItemAsIcon(Rect rect, JSScriptClassPathHint classPath)
        {
            var labelHeight = Math.Min(EditorStyles.label.lineHeight, rect.height);
            var padding = 4f;
            var buttonSize = rect.height - labelHeight - padding;

            if (buttonSize > 8f)
            {
                var buttonRect = new Rect(rect.x + (rect.width - buttonSize) * .5f, rect.y, buttonSize, buttonSize);

                if (classPath.classType != JSScriptClassType.EditorWindow)
                {
                    GUI.DrawTexture(buttonRect, GetIcon(classPath.classType).image);
                }
                else
                {
                    if (GUI.Button(buttonRect, GetIcon(classPath.classType)))
                    {
                        EditorRuntime.ShowWindow(classPath.modulePath, classPath.className);
                    }
                }

                var labelRect = new Rect(rect.x, rect.yMax - labelHeight, rect.width, labelHeight);
                EditorGUI.LabelField(labelRect, classPath.className, EditorStyles.centeredGreyMiniLabel);
            }
            else
            {
                if (GUI.Button(rect, classPath.className))
                {
                    EditorRuntime.ShowWindow(classPath.modulePath, classPath.className);
                }
            }
        }

        private void DrawScriptItemAsListEntry(Rect rect, JSScriptClassPathHint classPath)
        {
            var texRect = new Rect(rect.x, rect.y, EditorGUIUtility.singleLineHeight, EditorGUIUtility.singleLineHeight);
            GUI.DrawTexture(texRect, GetIcon(classPath.classType).image);
            if (classPath.classType == JSScriptClassType.EditorWindow)
            {
                var buttonRect = new Rect(rect.xMax - 52f, rect.y, 52f, rect.height);
                var labelRect = new Rect(texRect.xMax + 4f, rect.y, rect.width - texRect.xMax - 4f - buttonRect.width, EditorGUIUtility.singleLineHeight);
                GUI.Label(labelRect, classPath.className);
                if (GUI.Button(buttonRect, "Show"))
                {
                    EditorRuntime.ShowWindow(classPath.modulePath, classPath.className);
                }
            }
            else
            {
                var labelRect = new Rect(texRect.xMax + 4f, rect.y, rect.width - texRect.xMax - 4f, EditorGUIUtility.singleLineHeight);
                GUI.Label(labelRect, classPath.className);
            }
        }

        private void Reset()
        {
            JSScriptFinder.GetInstance().ScriptClassPathsUpdated -= OnScriptClassPathsUpdated;
            JSScriptFinder.GetInstance().ScriptClassPathsUpdated += OnScriptClassPathsUpdated;
            _scriptClassPaths = new List<JSScriptClassPathHint>();
            OnScriptClassPathsUpdated();
        }

        public void AddItemsToMenu(GenericMenu menu)
        {
            menu.AddItem(new GUIContent("Show as Icons"), _listMode == ListMode.Icons, () => _listMode = ListMode.Icons);
            menu.AddItem(new GUIContent("Show as List"), _listMode == ListMode.List, () => _listMode = ListMode.List);
        }

        private void DrawScriptListView()
        {
            _scriptListViewScrollPosition = EditorGUILayout.BeginScrollView(_scriptListViewScrollPosition);
            var size = _scriptClassPaths.Count;
            GUILayout.Space(6f);
            if (_listMode == ListMode.Icons)
            {
                var itemSize = new Vector2(120f, 80f);
                var rowRect = EditorGUILayout.GetControlRect(GUILayout.Height(itemSize.y));
                var rows = 0;
                var itemRect = new Rect(rowRect.x, rowRect.y, itemSize.x, itemSize.y);
                for (var i = 0; i < size; i++)
                {
                    var item = _scriptClassPaths[i];

                    DrawScriptItemAsIcon(itemRect, item);
                    itemRect.x += itemSize.x;
                    if (i != size - 1 && itemRect.xMax > position.width)
                    {
                        itemRect.x = rowRect.x;
                        itemRect.y += itemSize.y;
                        ++rows;
                    }
                }
                EditorGUILayout.GetControlRect(GUILayout.Height(rows * itemSize.y));
            }
            else
            {
                for (var i = 0; i < size; i++)
                {
                    var item = _scriptClassPaths[i];
                    var itemRect = EditorGUILayout.GetControlRect();
                    if (i % 2 == 0)
                    {
                        EditorGUI.DrawRect(itemRect, UnityHelper.RowColor);
                    }
                    DrawScriptItemAsListEntry(itemRect, item);
                }
            }
            EditorGUILayout.EndScrollView();

            if (_footStyle == null)
            {
                _footStyle = new GUIStyle(EditorStyles.miniLabel);
                _footStyle.alignment = TextAnchor.MiddleRight;
            }
            if (size > 1)
            {
                GUILayout.Label(size + " Scripts", _footStyle);
            }
        }

        protected override void OnPaint()
        {
            if (_scriptClassPaths == null)
            {
                Reset();
            }

            // _selectedTabViewIndex = GUILayout.Toolbar(_selectedTabViewIndex, _tabViews);
            // GUILayout.Space(12f);
            DrawScriptListView();
        }
    }
}
#endif
