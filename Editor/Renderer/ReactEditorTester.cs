using ReactUnity.Interop;
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
            var uiAsset = Resources.Load<VisualTreeAsset>("ReactUnity/EditorTester");
            var ui = uiAsset.CloneTree();

            var stylesheet = Resources.Load<StyleSheet>("ReactUnity/EditorTesterStyles");

            ui.style.height = Length.Percent(100);
            rootVisualElement.Add(ui);
            rootVisualElement.styleSheets.Add(stylesheet);

            rootVisualElement.Q<Button>("run").clicked += Run;
        }

        ReactScript GetScript()
        {
            var source = rootVisualElement.Q<TextField>("source");
            var useDevServer = rootVisualElement.Q<Toggle>("useDevServer");
            var devServer = rootVisualElement.Q<TextField>("devServer");

            useDevServer.RegisterValueChangedCallback(x =>
            {
                devServer.SetEnabled(x.newValue);
            });

            return new ReactScript()
            {
                ScriptSource = ScriptSource.Resource,
                SourcePath = source.text,
                UseDevServer = useDevServer.value,
                DevServer = devServer.text,
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
            if (context != null) context.Scheduler.clearAllTimeouts();
            EditorDispatcher.StopAll();

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
