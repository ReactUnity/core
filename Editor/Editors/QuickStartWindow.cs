using System;
using System.Collections;
using System.Diagnostics;
using System.IO;
using System.Linq;
using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using UnityEditor;
using UnityEditor.PackageManager;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ReactUnity.Editor
{
    public class QuickStartWindow : ReactWindow
    {
        public const string PackageName = "com.reactunity.core";
        public readonly int RequiredNodeVersion = 12;
        public readonly string NodeUrl = "https://nodejs.org/";
        public readonly string ProjectDirName = "react";

        public int NodeVersion { get; private set; } = -1;

        public string PackageVersion;
        public string LatestVersion;
        public bool HasUpdate;


        [MenuItem("React/Quick Start", priority = 0)]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<QuickStartWindow>();
            window.titleContent = new GUIContent("React Quick Start");
            window.minSize = new Vector2(300, 200);
        }

        protected override ScriptSource GetScript()
        {
            var res = ScriptSource.Resource("ReactUnity/editor/quick-start/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4200";
            res.UseDevServer = DevServerEnabled;
#endif
            return res;
        }

        public string GetProjectPath()
        {
            try
            {
                var projectDir = Path.GetFullPath(ProjectDirName);
                var exists = Directory.Exists(projectDir);

                if (exists) return projectDir.Replace('\\', '/');
                return null;
            }
            catch
            {
                return null;
            }
        }

        public void CreateProject()
        {
            RunCommand("npx", "@reactunity/create");
        }

        public void GetNodeVersion(Action<int> callback = null)
        {
            try
            {
                var process = RunCommand("node", "-v", true);
                process.WaitForExit();

                var result = process.StandardOutput.ReadToEnd() ?? "";

                var major = result.Split('.').FirstOrDefault()?.Replace("v", "");

                if (!int.TryParse(major, out var version)) version = 0;

                NodeVersion = version;
            }
            catch
            {
                NodeVersion = 0;
            }

            callback?.Invoke(NodeVersion);
        }

        public void GetNodeVersion(object callback)
        {
            var cb = Callback.From(callback, Context, this);
            GetNodeVersion(x => cb.Call(x));
        }

        public Process RunCommand(string target, string args, bool hasOutput = false)
        {
            Process process = new Process();
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.WindowStyle = ProcessWindowStyle.Hidden;
            startInfo.FileName = target;
            startInfo.Arguments = args;
            if (hasOutput)
            {
                startInfo.RedirectStandardOutput = true;
                startInfo.RedirectStandardError = true;
                startInfo.UseShellExecute = false;
            }
            process.StartInfo = startInfo;
            process.Start();

            return process;
        }

        public bool CanvasExistsInScene()
        {
            var objects = SceneManager.GetActiveScene().GetRootGameObjects();

            foreach (var obj in objects)
            {
                if (obj.GetComponentInChildren<UGUI.ReactUnityUGUI>()) return true;
#if UNITY_2021_2_OR_NEWER
                if (obj.GetComponentInChildren<ReactUnity.UIToolkit.ReactUnityUIDocument>()) return true;
#endif
            }

            return false;
        }

        public void CreateCanvas()
        {
            var type = typeof(UnityEditor.UI.SliderEditor).Assembly.GetType("UnityEditor.UI.MenuOptions");
            var method = type.GetMethod("AddCanvas");
            method.Invoke(null, new[] { new MenuCommand(null) });
            var go = Selection.activeGameObject;
            go.AddComponent<UGUI.ReactUnityUGUI>();
            go.name = "React Canvas";
        }

        public void SelectCanvas()
        {
            var objects = SceneManager.GetActiveScene().GetRootGameObjects();

            var canvas = objects.Select(x => x.GetComponentInChildren<UGUI.ReactUnityUGUI>()).FirstOrDefault(x => x != null);

            if (canvas) Selection.activeObject = canvas.gameObject;
        }

        public void CheckVersion(Action callback)
        {
            Context.Dispatcher.StartDeferred(CheckVersionDelegate(callback));
        }

        public void CheckVersion(object callback)
        {
            var cb = Callback.From(callback);
            CheckVersion(() => cb.Call());
        }

        private IEnumerator CheckVersionDelegate(Action callback)
        {
            var packagesRequest = Client.List(false, false);

            while (!packagesRequest.IsCompleted) yield return null;

            var ruPackage = packagesRequest.Result.FirstOrDefault(x => x.name == PackageName);

            PackageVersion = ruPackage.version;
            LatestVersion = ruPackage.versions.latestCompatible;
            HasUpdate = PackageVersion != LatestVersion;
            callback();
        }

        public void UpdatePackage(string version)
        {
            Client.Add(PackageName + "@" + version);
        }
    }
}
