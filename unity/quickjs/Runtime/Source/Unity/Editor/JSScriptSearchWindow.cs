#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;

namespace QuickJS.Unity
{
    using UnityEditor;
    using UnityEditor.IMGUI.Controls;
    using UnityEngine;

    public class JSScriptSearchWindow : EditorWindow
    {
        private bool _parepared;
        private Action<JSScriptClassPathHint> _selectCallback;
        
        private bool _showSearchResults;
        private int _selectedSearchResultIndex;
        private int _maxSearchResults = 30;
        private string _searchString = "string.Empty";

        private JSScriptClassType _searchType;

        private List<JSScriptClassPathHint> _searchResults = new List<JSScriptClassPathHint>();
        private SearchField _searchField;

        private Vector2 _searchScrollViewState;

        private float Styles_resultHeight = 20;
        private float Styles_resultsBorderWidth = 2;
        // private float Styles_resultsMargin = 15;
        // private float Styles_resultsLabelOffset = 2;

        private GUIStyle Styles_entryEven;
        private GUIStyle Styles_entryOdd;
        private GUIStyle Styles_labelStyle;
        // private GUIStyle Styles_resultsBorderStyle;

        private GUIContent s_TextImage = new GUIContent();
        
        private GUIContent TempContent(string t, Texture i = null)
        {
            s_TextImage.text = t;
            s_TextImage.image = i;
            return s_TextImage;
        }

        private void OnEnable()
        {
            _parepared = false;
        }

        private void OnPrepareGUI()
        {
            Styles_entryEven = new GUIStyle("CN EntryBackEven");
            Styles_entryOdd = new GUIStyle("CN EntryBackOdd");
            Styles_labelStyle = new GUIStyle(EditorStyles.label);
            // Styles_resultsBorderStyle = new GUIStyle("hostview");

            Styles_labelStyle.alignment = TextAnchor.MiddleLeft;
            Styles_labelStyle.richText = true;
        }

        void OnGUI()
        {
            if (!_parepared)
            {
                _parepared = true;
                OnPrepareGUI();
            }

            DrawSearchField();
            Repaint();
        }
        
        private static void CloseAllOpenWindows<T>()
        {
            foreach (var obj in Resources.FindObjectsOfTypeAll(typeof(T)))
            {
                try
                {
                    ((EditorWindow)obj).Close();
                }
                catch
                {
                    Object.DestroyImmediate(obj);
                }
            }
        }

        public static bool Show(Rect rect, string searchString, JSScriptClassType searchType, Action<JSScriptClassPathHint> selectCallback)
        {
            CloseAllOpenWindows<JSScriptSearchWindow>();
            var window = ScriptableObject.CreateInstance<JSScriptSearchWindow>();
            window._searchString = searchString;
            window._selectCallback = selectCallback;
            window._searchType = searchType;
            window.Init(rect);
            return true;
        }

        private void Init(Rect rect)
        {
            var screenRect = GUIUtility.GUIToScreenRect(rect);
            
            ShowAsDropDown(screenRect, CalculateWindowSize(rect));
            
            _searchResults.Clear();
            JSScriptFinder.GetInstance().Search(_searchString, _searchType, _searchResults);
        }
        
        private Vector2 CalculateWindowSize(Rect buttonRect)
        {
            var vector = new Vector2(200f, _maxSearchResults * Styles_resultHeight);
            vector.x += Styles_resultsBorderWidth * 2f;
            vector.y += Styles_resultHeight;
            vector.y = Mathf.Clamp(vector.y, base.minSize.y, base.maxSize.y);
            if (vector.x < buttonRect.width)
            {
                vector.x = buttonRect.width;
            }
            if (vector.x < minSize.x)
            {
                vector.x = minSize.x;
            }
            if (vector.y < minSize.y)
            {
                vector.y = minSize.y;
            }
            return new Vector2(vector.x, vector.y);
        }

        private void DrawSearchField()
        {
            var rect = GUILayoutUtility.GetRect(1, 1, 18, 18, GUILayout.ExpandWidth(true));
            if (_searchField == null)
            {
                _searchField = new SearchField();
                _searchField.downOrUpArrowKeyPressed += OnDownOrUpArrowKeyPressed;
            }

            var result = _searchField.OnGUI(rect, _searchString);
            if (result != _searchString)
            {
                _searchString = result;
                _searchResults.Clear();
                JSScriptFinder.GetInstance().Search(_searchString, _searchType, _searchResults);
            }

            rect.y += 18;
            DrawSearchResults(rect);
        }

        private void DrawSearchResults(Rect rect)
        {
            if (this._searchResults.Count <= 0)
            {
                return;
            }

            _searchScrollViewState = GUILayout.BeginScrollView(_searchScrollViewState);
            var current = Event.current;
            var mouseIsInResultsRect = rect.Contains(current.mousePosition);
            var lastSelectedSearchResultIndex = _selectedSearchResultIndex;

            for (var i = 0; i < this._searchResults.Count; i++)
            {
                var elementContent = TempContent(_searchResults[i].ToClassPath());
                var elementRect = GUILayoutUtility.GetRect(elementContent, Styles_labelStyle);

                elementRect.width = rect.width;
                if (current.type == EventType.Repaint)
                {
                    var style = i % 2 == 0 ? Styles_entryOdd : Styles_entryEven;
                    style.Draw(elementRect, false, false, i == _selectedSearchResultIndex, false);
                    GUI.Label(elementRect, this._searchResults[i].ToClassPath(), Styles_labelStyle);
                }
                
                if (elementRect.Contains(current.mousePosition))
                {
                    _selectedSearchResultIndex = i;
                    
                    if (current.type == EventType.MouseDown)
                    {
                        this.OnConfirmSearchResult(this._searchResults[i]);
                    }
                }
            }
            GUI.EndScrollView();
            
            if (current.type == EventType.KeyUp && current.keyCode == KeyCode.Return && _selectedSearchResultIndex >= 0)
            {
                this.OnConfirmSearchResult(this._searchResults[_selectedSearchResultIndex]);
            }
        }

        private void OnConfirmSearchResult(JSScriptClassPathHint result)
        {
            try
            {
                _selectCallback?.Invoke(result);
            }
            catch (Exception exception)
            {
                Debug.LogError(exception);
            }
            Close();
            GUIUtility.ExitGUI();
            Event.current.Use();
        }

        private void OnDownOrUpArrowKeyPressed()
        {
            //TODO: keyboard operations
        }
    }
}
#endif
