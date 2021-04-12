using System.IO;
using UnityEditor;
using UnityEngine;
using System.Diagnostics;
using System.Linq;
using System;
using ReactUnity.Editor.Renderer;
using UnityEngine.SceneManagement;

namespace ReactUnity.Editor
{
    public class QuickStartWindow : ReactWindow
    {
        public readonly int RequiredNodeVersion = 12;
        public readonly string NodeUrl = "https://nodejs.org/";
        public readonly string ProjectDirName = "react";

        public int NodeVersion { get; private set; } = -1;


        [MenuItem("React/Quick Start", priority = 0)]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<QuickStartWindow>();
            window.titleContent = new GUIContent("React Quick Start");
            window.minSize = new Vector2(300, 200);
        }

        protected override ReactScript GetScript()
        {
            var res = ReactScript.Resource("ReactUnity/editor/quick-start/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4200";
            res.UseDevServer = true;
#endif
            return res;
        }

        public void OpenInVsCode(string path)
        {
            RunCommand("code", path);
        }

        public string GetProjectPath()
        {
            try
            {
                var projectDir = Path.GetFullPath(ProjectDirName);
                var exists = Directory.Exists(projectDir);

                if (exists) return projectDir;
                return null;
            }
            catch
            {
                return null;
            }
        }

        public void CreateProject()
        {
            RunCommand("npm", "init @reactunity");
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
                callback?.Invoke(version);
            }
            catch
            {
                NodeVersion = 0;
                callback?.Invoke(0);
            }
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
                if (obj.GetComponentInChildren<ReactUnity>()) return true;
            }

            return false;
        }

        public void CreateCanvas()
        {
            var type = typeof(UnityEditor.UI.SliderEditor).Assembly.GetType("UnityEditor.UI.MenuOptions");
            var method = type.GetMethod("AddCanvas");
            method.Invoke(null, new[] { new MenuCommand(null) });
            var go = Selection.activeGameObject;
            go.AddComponent<ReactUnity>();
            go.name = "React Canvas";
        }
    }
}
