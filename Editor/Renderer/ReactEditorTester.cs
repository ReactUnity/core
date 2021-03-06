using ReactUnity.Editor.Renderer.Styling;
using ReactUnity.Interop;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using UnityEditor;
using UnityEditor.UIElements;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class ReactEditorTester : EditorWindow
    {
        [MenuItem("React/Editor Tester")]
        public static void ShowDefaultWindow()
        {
            var wnd = GetWindow<ReactEditorTester>();
            wnd.titleContent = new GUIContent("React Editor Tester");
        }

        IDisposable ScriptWatchDisposable;
        ReactUnityRunner runner;
        EditorContext context;

        public void OnEnable()
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
            source.SetValueWithoutNotify(EditorPrefs.GetString("ReactUnity.EditorTester.source", "react-editor/index"));
            useDevServer.SetValueWithoutNotify(EditorPrefs.GetBool("ReactUnity.EditorTester.useDevServer", false));
            devServer.SetValueWithoutNotify(EditorPrefs.GetString("ReactUnity.EditorTester.devServer", "http://localhost:3000"));

            rootVisualElement.Q<Button>("run").clicked += Run;
        }

        ReactScript GetScript()
        {
            var source = rootVisualElement.Q<TextField>("source");
            var useDevServer = rootVisualElement.Q<Toggle>("useDevServer");
            var devServer = rootVisualElement.Q<TextField>("devServer");

            var sourceVal = source.text;
            var useDevServerVal = useDevServer.value;
            var devServerVal = devServer.text;

            EditorPrefs.SetString("ReactUnity.EditorTester.source", sourceVal);
            EditorPrefs.SetBool("ReactUnity.EditorTester.useDevServer", useDevServerVal);
            EditorPrefs.SetString("ReactUnity.EditorTester.devServer", devServerVal);

            useDevServer.RegisterValueChangedCallback(x =>
            {
                devServer.SetEnabled(x.newValue);
            });

            return new ReactScript()
            {
                ScriptSource = ScriptSource.Resource,
                SourcePath = sourceVal,
                UseDevServer = useDevServerVal,
                DevServer = devServerVal,
            };
        }

        void Run()
        {
            var host = rootVisualElement.Q("root");
            if (host == null) return;

            host.Clear();
            var src = GetScript();

            runner = new ReactUnityRunner();

            ScriptWatchDisposable = src.GetScript((sc, isDevServer) =>
            {
                context = new EditorContext(host, new StringObjectDictionary(), src, new EditorScheduler(), isDevServer, Restart);
                runner.RunScript(sc, context);
            }, true, true);
        }

        private void OnDestroy()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
            EditorDispatcher.StopAll();

            context?.Dispose();
            runner = null;
            context = null;
            ScriptWatchDisposable = null;
        }

        public void Restart()
        {
            OnDestroy();
            Run();
        }
    }
}
