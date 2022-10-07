using System;
using System.Collections;
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
        #region Startup

        public const string WindowVersion = "0";
        internal static readonly string ShowWindowOnStartupKey = $"ReactUnity.Editor.{nameof(QuickStartWindow)}.{nameof(ShowWindowOnStartup)}.{WindowVersion}";
        internal static readonly string ShowEngineWarningOnStartupKey = $"ReactUnity.Editor.{nameof(QuickStartWindow)}.{nameof(ShowEngineWarningOnStartup)}";

        public static bool ShowWindowOnStartup
        {
            get => EditorPrefs.GetBool(ShowWindowOnStartupKey, true);
            set => EditorPrefs.SetBool(ShowWindowOnStartupKey, value);
        }

        public static bool ShowEngineWarningOnStartup
        {
            get => EditorPrefs.GetBool(ShowEngineWarningOnStartupKey, true);
            set => EditorPrefs.SetBool(ShowEngineWarningOnStartupKey, value);
        }


#if REACT_EDITOR_COROUTINES
        static QuickStartWindow()
        {
            EditorApplication.update -= InitialEditorUpdate;
            EditorApplication.update += InitialEditorUpdate;
        }

        static void InitialEditorUpdate()
        {
            EditorApplication.update -= InitialEditorUpdate;

            if (!JavascriptEngineHelpers.HasEngine)
            {
                if (ShowEngineWarningOnStartup)
                {
                    var result = EditorUtility.DisplayDialogComplex(
                        "Install Default JavaScript Engine?",
                        "ReactUnity requires at least one JavaScript engine to work, but none is installed.\n" +
                        "Do you want to automatically install the defalut JavaScript engine? \n" +
                        "    com.reactunity.quickjs",
                        "Yes",
                        "No",
                        "No and don't show again"
                    );

                    switch (result)
                    {
                        case 0:
                            var enumerator = InstallScopedPluginDelegate("com.reactunity.quickjs");
                            Unity.EditorCoroutines.Editor.EditorCoroutineUtility.StartCoroutineOwnerless(enumerator);
                            break;
                        case 1:
                            break;
                        case 2:
                            ShowEngineWarningOnStartup = false;
                            break;
                        default:
                            break;
                    }
                }
            }
            else if (ShowWindowOnStartup)
            {
                ShowDefaultWindow();
                ShowWindowOnStartup = false;
            }
        }
#endif

        [MenuItem("React/Quick Start", priority = 0)]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<QuickStartWindow>();
            window.titleContent = new GUIContent("React Quick Start");
            window.minSize = new Vector2(300, 200);
        }

        #endregion

        public delegate void PluginCallback();
        public delegate void CheckVersionCallback(string currentVersion, string latestVersion, bool hasUpdate);

        public const string ScopeName = "package.openupm.com";
        public const string ScopeUrl = "https://package.openupm.com";
        public const string CompanyScope = "com.reactunity";
        public const string PackageName = "com.reactunity.core";
        public readonly int RequiredNodeVersion = 12;
        public readonly string NodeUrl = "https://nodejs.org/";
        public readonly string ProjectDirName = "react";

        public int NodeVersion { get; private set; } = -1;

        public string PackageVersion;
        public string LatestVersion;
        public bool HasUpdate;

        protected override ScriptSource GetScript()
        {
            var res = ScriptSource.Resource("ReactUnity/editor/quick-start/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4200";
            res.UseDevServer = DevServerEnabled ? ScriptSource.DevServerType.InEditor : ScriptSource.DevServerType.Never;
#endif
            return res;
        }

        public string GetProjectFullPath()
        {
            return Path.GetFullPath(ProjectDirName);
        }

        public string GetProjectPath()
        {
            try
            {
                var projectDir = GetProjectFullPath();
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
            try
            {
                RunCommand("npx", "@reactunity/create");
            }
            catch
            {
                EditorUtility.DisplayDialog(
                    "Create ReactUnity Project",
                    "Failed to automatically create the React project.\n" +
                    "Please create it manually by going to root folder of this project and running the following command: \n" +
                    "    npx @reactunity/create",
                    "OK");
            }
        }

        public void GetNodeVersion([TypescriptRemapType(typeof(Action<int>))] object callback)
        {
            var cb = Callback.From(callback, Context, this);

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

            cb?.Call(NodeVersion);
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


        #region Canvas Check

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

        #endregion


        #region Package Management

        public void CheckVersion(string packageName, [TypescriptRemapType(typeof(CheckVersionCallback))] object callback)
        {
            var cb = Callback.From(callback, Context);

            Context.Dispatcher.StartDeferred(CheckVersionDelegate(packageName, (a, b, c) => cb.Call(a, b, c)));
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

        public void InstallScopedPlugin(string packageName, [TypescriptRemapType(typeof(PluginCallback))] object callback = null)
        {
            var cb = Callback.From(callback, Context);
            Context.Dispatcher.StartDeferred(InstallScopedPluginDelegate(packageName, cb));
        }

        private static IEnumerator InstallScopedPluginDelegate(string packageName, Callback cb = null)
        {
            PackageManagerHelpers.AddScopedRegistry(
                ScopeName,
                ScopeUrl,
                new string[] {
                    CompanyScope,
                    packageName
                }
            );

            yield return InstallUnityPluginDelegate(packageName, cb);
        }

        public void InstallUnityPlugin(string pluginName, [TypescriptRemapType(typeof(PluginCallback))] object callback = null)
        {
            var cb = Callback.From(callback, Context);
            Context.Dispatcher.StartDeferred(InstallUnityPluginDelegate(pluginName, cb));
        }

        private static IEnumerator InstallUnityPluginDelegate(string pluginName, Callback cb = null)
        {
            yield return null;

            var listRequest = Client.List(false, false);
            while (!listRequest.IsCompleted) yield return null;
            var pkg = listRequest.Result.FirstOrDefault(x => x.name == pluginName);

            var versionSuffix = "";

            if (pkg != null) versionSuffix += "@" + pkg.versions.latestCompatible;

            var packagesRequest = Client.Add(pluginName + versionSuffix);

            while (!packagesRequest.IsCompleted)
            {
                if (packagesRequest.Error != null)
                {
                    UnityEngine.Debug.LogError(packagesRequest.Error.ToString());
                    cb?.Call();
                    yield break;
                }
                yield return null;
            }

            var errors = packagesRequest?.Result?.errors;

            if (errors != null && errors.Any(x => !string.IsNullOrWhiteSpace(x.message)))
                UnityEngine.Debug.LogError("Errors while installing the package: \n" + string.Join("\n", errors.Select(x => x.ToString()).ToArray()));

            cb?.Call();
        }

        public void UninstallUnityPlugin(string pluginName, [TypescriptRemapType(typeof(PluginCallback))] object callback = null)
        {
            var cb = Callback.From(callback, Context);
            Context.Dispatcher.StartDeferred(UninstallUnityPluginDelegate(pluginName, cb));
        }

        private IEnumerator UninstallUnityPluginDelegate(string pluginName, Callback cb = null)
        {
            var listRequest = Client.Remove(pluginName);
            while (!listRequest.IsCompleted) yield return null;
            cb?.Call();
        }

        #endregion
    }
}
