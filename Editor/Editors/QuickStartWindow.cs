using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Scripting;
using UnityEditor;
using UnityEditor.PackageManager;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace ReactUnity.Editor
{
    [InitializeOnLoad]
    public class QuickStartWindow : ReactWindow
    {
        public const string WindowVersion = "0";

        public static bool ShowWindowOnStartup
        {
            get
            {
                return EditorPrefs.GetBool($"ReactUnity.Editor.{nameof(QuickStartWindow)}.ShowWindowOnStartup.{WindowVersion}", true);
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.{nameof(QuickStartWindow)}.ShowWindowOnStartup.{WindowVersion}", value);
            }
        }


#if REACT_EDITOR_COROUTINES
        static QuickStartWindow()
        {
            EditorApplication.update += InitialEditorUpdate;
        }

        static void InitialEditorUpdate()
        {
            EditorApplication.update -= InitialEditorUpdate;

            if (ShowWindowOnStartup)
            {
                ShowDefaultWindow();
                ShowWindowOnStartup = false;
            }
        }
#endif

#pragma warning disable 612
        static Dictionary<JavascriptEngineType, string> JSEnginePackages = new Dictionary<JavascriptEngineType, string>
        {
            { JavascriptEngineType.Jint, "com.reactunity.core" },
            { JavascriptEngineType.QuickJS, "com.reactunity.quickjs" },
            { JavascriptEngineType.ClearScript, "com.reactunity.clearscript" },
        };
#pragma warning restore 612

        public delegate void CheckVersionCallback(string currentVersion, string latestVersion, bool hasUpdate);

        public const string PackageName = "com.reactunity.core";
        public readonly int RequiredNodeVersion = 12;
        public readonly string NodeUrl = "https://nodejs.org/";
        public readonly string ProjectDirName = "react";

        public int NodeVersion { get; private set; } = -1;

        public string PackageVersion;
        public string LatestVersion;
        public bool HasUpdate;

#if REACT_QUICKJS_AVAILABLE
        public bool QuickJSAvailable = true;
#else
        public bool QuickJSAvailable = false;
#endif

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
            startInfo.CreateNoWindow = true;
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

        public void CheckVersion([TypescriptRemapType(typeof(CheckVersionCallback))] object callback)
        {
            var cb = Callback.From(callback, Context);
            CheckVersion(PackageName, (a, b, c) => cb.Call(a, b, c));
        }

        public void CheckVersion(string packageName, CheckVersionCallback callback)
        {
            Context.Dispatcher.StartDeferred(CheckVersionDelegate(packageName, callback));
        }

        public void CheckEngineVersion(JavascriptEngineType type, [TypescriptRemapType(typeof(CheckVersionCallback))] object callback)
        {
            if (!JSEnginePackages.TryGetValue(type, out var enginePackageName)) return;
            CheckPackageVersion(enginePackageName, callback);
        }

        public void CheckPackageVersion(string packageName, [TypescriptRemapType(typeof(CheckVersionCallback))] object callback)
        {
            var cb = Callback.From(callback, Context);
            CheckVersion(packageName, (a, b, c) => cb.Call(a, b, c));
        }

        private IEnumerator CheckVersionDelegate(string packageName, CheckVersionCallback callback)
        {
            var packagesRequest = Client.List(false, false);
            while (!packagesRequest.IsCompleted) yield return null;
            var pkg = packagesRequest.Result.FirstOrDefault(x => x.name == packageName);


            var version = pkg?.version;
            var latestVersion = pkg?.versions?.latestCompatible;
            var hasUpdate = !string.IsNullOrWhiteSpace(latestVersion) && latestVersion != version;

            if (packageName == PackageName && pkg != null)
            {
                PackageVersion = version;
                LatestVersion = latestVersion;
                HasUpdate = hasUpdate;
            }

            if (pkg != null) callback(version, latestVersion, hasUpdate);
            else callback(null, null, true);
        }

        public void UpdatePackage(string version)
        {
            Client.Add(PackageName + "@" + version);
        }


        public void InstallEnginePlugin(JavascriptEngineType type)
        {
            Context.Dispatcher.StartDeferred(InstallEnginePluginDelegate(type));
        }

        private IEnumerator InstallEnginePluginDelegate(JavascriptEngineType type)
        {
            if (!JSEnginePackages.TryGetValue(type, out var enginePackageName)) yield break;

            PackageManagerHelpers.AddScopedRegistry(
                "package.openupm.com",
                "https://package.openupm.com",
                new string[] {
                    "com.reactunity",
                    enginePackageName
                }
            );

            yield return null;

            var listRequest = Client.List(false, false);
            while (!listRequest.IsCompleted) yield return null;
            var pkg = listRequest.Result.FirstOrDefault(x => x.name == enginePackageName);


            var versionSuffix = "";

            if (pkg != null) versionSuffix += "@" + pkg.versions.latestCompatible;

            var packagesRequest = Client.Add(enginePackageName + versionSuffix);

            while (!packagesRequest.IsCompleted) yield return null;
        }

        public void UninstallEnginePlugin(JavascriptEngineType type)
        {
            Context.Dispatcher.StartDeferred(UninstallEnginePluginDelegate(type));
        }

        private IEnumerator UninstallEnginePluginDelegate(JavascriptEngineType type)
        {
            if (!JSEnginePackages.TryGetValue(type, out var enginePackageName)) yield break;

            var listRequest = Client.Remove(enginePackageName);
            while (!listRequest.IsCompleted) yield return null;
        }


        public void InstallUnityPlugin(string pluginName)
        {
            Context.Dispatcher.StartDeferred(InstallUnityPluginDelegate(pluginName));
        }

        private IEnumerator InstallUnityPluginDelegate(string pluginName)
        {
            yield return null;

            var listRequest = Client.List(false, false);
            while (!listRequest.IsCompleted) yield return null;
            var pkg = listRequest.Result.FirstOrDefault(x => x.name == pluginName);

            var versionSuffix = "";

            if (pkg != null) versionSuffix += "@" + pkg.versions.latestCompatible;

            var packagesRequest = Client.Add(pluginName + versionSuffix);

            while (!packagesRequest.IsCompleted) yield return null;
        }


        public void UninstallUnityPlugin(string pluginName)
        {
            Context.Dispatcher.StartDeferred(UninstallUnityPluginDelegate(pluginName));
        }

        private IEnumerator UninstallUnityPluginDelegate(string pluginName)
        {
            var listRequest = Client.Remove(pluginName);
            while (!listRequest.IsCompleted) yield return null;
        }

    }
}
