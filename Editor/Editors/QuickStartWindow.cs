using System.IO;
using UnityEditor;
using UnityEngine;
using System.Diagnostics;

namespace ReactUnity.Editor
{
    public class QuickStartWindow : EditorWindow
    {
        static string projectDirName = "react";

        Process creatingProcess;

        [MenuItem("React/Quick Start", priority = 0)]
        public static void Open()
        {
            var window = GetWindow<QuickStartWindow>();
            window.titleContent = new GUIContent("React - Quick Start");
            window.Show();
        }

        void OnGUI()
        {
            var projectDir = Path.GetFullPath(projectDirName);
            var exists = Directory.Exists(projectDir);

            if (exists)
            {
                EditorGUILayout.LabelField("Project exists on " + projectDir);

                if (GUILayout.Button("Open in VsCode")) OpenInVsCode(projectDir);
            }
            else
            {
                EditorGUILayout.LabelField("Project does not exist on " + projectDir);


                var exited = creatingProcess?.HasExited ?? true;

                GUI.enabled = exited;
                if (GUILayout.Button("Create project")) CreateProject();
                GUI.enabled = true;

                if (!exited)
                {
                    EditorGUILayout.LabelField("Creating react project...");
                }
            }
        }

        void OpenInVsCode(string path)
        {
            RunCommand("code", path);
        }

        void CreateProject()
        {
            creatingProcess = RunCommand("npm", "init react-unity");

        }

        Process RunCommand(string target, string args)
        {
            Process process = new Process();
            ProcessStartInfo startInfo = new ProcessStartInfo();
            startInfo.WindowStyle = ProcessWindowStyle.Hidden;
            startInfo.FileName = target;
            startInfo.Arguments = args;
            process.StartInfo = startInfo;
            process.Start();

            return process;
        }
    }
}
