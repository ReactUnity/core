using ReactUnity.Editor.UIToolkit;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class ReactEditorTester : ReactWindow
    {
        internal static readonly string PrefsSourceKey = "ReactUnity.EditorTester.source";
        internal static readonly string PrefsUseDevServerKey = "ReactUnity.EditorTester.useDevServer";
        internal static readonly string PrefsDevServerKey = "ReactUnity.EditorTester.devServer";

        [MenuItem("React/Editor Tester")]
        public static void ShowDefaultWindow()
        {
            var wnd = GetWindow<ReactEditorTester>();
            wnd.titleContent = new GUIContent("React Editor Tester");
        }

        protected override void OnEnable()
        {
            var uiAsset = EditorResourcesHelper.EditorTester;
            var ui = uiAsset.CloneTree();

            var stylesheet = EditorResourcesHelper.EditorTesterStyles;

            ui.style.height = Length.Percent(100);
            rootVisualElement.Add(ui);
            rootVisualElement.styleSheets.Add(stylesheet);


            var source = rootVisualElement.Q<TextField>("source");
            var useDevServer = rootVisualElement.Q<Toggle>("useDevServer");
            var devServer = rootVisualElement.Q<TextField>("devServer");
            source.SetValueWithoutNotify(EditorPrefs.GetString(PrefsSourceKey, "react/index"));
            useDevServer.SetValueWithoutNotify(EditorPrefs.GetBool(PrefsUseDevServerKey, false));
            devServer.SetValueWithoutNotify(EditorPrefs.GetString(PrefsDevServerKey, "http://localhost:3000"));

            rootVisualElement.Q<Button>("run").clicked += () => Restart(rootVisualElement.Q("root"));
        }

        protected override ScriptSource GetScript()
        {
            var source = rootVisualElement.Q<TextField>("source");
            var useDevServer = rootVisualElement.Q<Toggle>("useDevServer");
            var devServer = rootVisualElement.Q<TextField>("devServer");

            var sourceVal = source.text;
            var useDevServerVal = useDevServer.value;
            var devServerVal = devServer.text;

            EditorPrefs.SetString(PrefsSourceKey, sourceVal);
            EditorPrefs.SetBool(PrefsUseDevServerKey, useDevServerVal);
            EditorPrefs.SetString(PrefsDevServerKey, devServerVal);

            useDevServer.RegisterValueChangedCallback(x => {
                devServer.SetEnabled(x.newValue);
            });

            return new ScriptSource()
            {
                Type = ScriptSourceType.Resource,
                SourcePath = sourceVal,
                UseDevServer = useDevServerVal ? ScriptSource.DevServerType.InEditor : ScriptSource.DevServerType.Never,
                DevServer = devServerVal,
            };
        }
    }
}
