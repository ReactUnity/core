using System.Collections.Generic;
using ReactUnity.Editor.Renderer;
using UnityEditor;

namespace ReactUnity.Editor
{
    internal static class EditorHelpers
    {
#if REACT_UNITY_DEVELOPER || REACT_EDITOR_DEVELOPER
        [MenuItem("React/Reset Editor Preferences", priority = 2000)]
#endif
        public static void ResetEditorPreferences()
        {
            var list = new List<string>()
            {
                QuickStartWindow.ShowWindowOnStartupKey,
                QuickStartWindow.ShowEngineWarningOnStartupKey,
                ReactEditorTester.PrefsSourceKey,
                ReactEditorTester.PrefsUseDevServerKey,
                ReactEditorTester.PrefsDevServerKey,
            };

            foreach (var item in list)
            {
                EditorPrefs.DeleteKey(item);
            }
        }
    }
}
