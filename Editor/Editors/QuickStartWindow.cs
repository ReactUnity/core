using System.IO;
using UnityEditor;
using UnityEngine;
using System.Diagnostics;
using System.Linq;
using System;

namespace ReactUnity.Editor
{
    public class QuickStartWindow : EditorWindow
    {
        static string ProjectDirName = "react";
        static int RequiredNodeVersion = 10;
        static string NodeUrl = "https://nodejs.org/";

        int NodeVersion = -1;

        Process creatingProcess;

        GUIStyle headerStyle { get; set; }

        [MenuItem("React/Quick Start", priority = 0)]
        public static void Open()
        {
            var window = GetWindow<QuickStartWindow>();
            window.titleContent = new GUIContent("React - Quick Start");
            window.Show();
            window.minSize = new Vector2(300, 200);
        }


        void OnGUI()
        {
            DrawHeader();

            var hasNode = DrawNodeVersion();

            GUI.enabled = hasNode;
            DrawProjectExists();


            GUI.enabled = true;
        }

        void DrawHeader()
        {
            if (headerStyle == null)
            {
                headerStyle = new GUIStyle(EditorStyles.boldLabel);
                headerStyle.fontSize = 24;
                headerStyle.fontStyle = FontStyle.Bold;
                headerStyle.margin = new RectOffset(10, 10, 10, 10);
            }

            GUILayout.Label("React Unity Quick Start", headerStyle);
        }

        bool DrawNodeVersion()
        {
            if (NodeVersion < 0) CheckNodeVersion();

            var hasNode = NodeVersion >= RequiredNodeVersion;

            EditorGUILayout.BeginHorizontal();

            if (!hasNode)
            {
                EditorGUILayout.LabelField("Node.js version 10 or above is required.");
                if (GUILayout.Button("Install Node.js", GUILayout.Width(120)))
                {
                    Application.OpenURL(NodeUrl);
                }
            }

            EditorGUILayout.EndHorizontal();

            return hasNode;
        }

        void DrawProjectExists()
        {
            EditorGUILayout.BeginHorizontal();

            var projectDir = Path.GetFullPath(ProjectDirName);
            var exists = Directory.Exists(projectDir);

            if (exists)
            {
                EditorGUILayout.LabelField("Project exists on " + projectDir);

                if (GUILayout.Button("Open in VsCode", GUILayout.Width(120))) OpenInVsCode(projectDir);
            }
            else
            {
                EditorGUILayout.LabelField("Project does not exist on " + projectDir);


                var exited = creatingProcess?.HasExited ?? true;

                GUI.enabled = exited;
                if (GUILayout.Button("Create project", GUILayout.Width(120))) CreateProject();
                GUI.enabled = true;

                if (!exited)
                {
                    EditorGUILayout.LabelField("Creating react project...");
                }
            }

            EditorGUILayout.EndHorizontal();
        }



        void OpenInVsCode(string path)
        {
            RunCommand("code", path);
        }

        void CreateProject()
        {
            creatingProcess = RunCommand("npm", "init @reactunity");

        }

        void CheckNodeVersion()
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
            catch (Exception)
            {
                NodeVersion = 0;
            }
        }

        Process RunCommand(string target, string args, bool hasOutput = false)
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
    }
}
