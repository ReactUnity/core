#if UNITY_EDITOR && REACT_UNITY_DEVELOPER
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEditor.Compilation;
using UnityEngine;

namespace ReactUnity.Editor.Developer
{
    /// <summary>
    /// The bridge's endpoints. Every handler returns immediately -- anything spanning frames
    /// or a domain reload is started here and observed through /status, because an HTTP
    /// request cannot survive the reload that compiling causes.
    /// </summary>
    public static class AgentBridgeHandlers
    {
        public static string Handle(string path, Dictionary<string, string> query)
        {
            switch (path)
            {
                case "":
                case "/status": return Status();
                case "/logs": return Logs(query);
                case "/refresh": return Refresh();
                case "/play": return Play(true);
                case "/stop": return Play(false);
                case "/screenshot": return Screenshot(query);
                case "/menu": return Menu(query);
                case "/quit": return Quit();
#if REACT_TEST_FRAMEWORK
                case "/tests": return AgentBridgeTestRunner.Handle(query);
#endif
                default: return BridgeJson.Error($"Unknown endpoint '{path}'");
            }
        }

        static string Status()
        {
            var errors = AgentBridgeState.CompileErrors;
            return BridgeJson.Object(
                BridgeJson.Prop("ok", true),
                BridgeJson.Prop("bridgeVersion", AgentBridgeServer.BridgeVersion),
                BridgeJson.Prop("unityVersion", Application.unityVersion),
                BridgeJson.Prop("projectPath", Directory.GetCurrentDirectory().Replace('\\', '/')),
                BridgeJson.Prop("activeScene", UnityEngine.SceneManagement.SceneManager.GetActiveScene().path),
                // isCompiling and isUpdating together are "the Editor is busy, poll again".
                BridgeJson.Prop("isCompiling", EditorApplication.isCompiling),
                BridgeJson.Prop("isUpdating", EditorApplication.isUpdating),
                BridgeJson.Prop("isPlaying", EditorApplication.isPlaying),
                BridgeJson.Prop("isPaused", EditorApplication.isPaused),
                BridgeJson.PropRaw("compileErrors", BridgeJson.Array(System.Array.ConvertAll(errors, BridgeJson.String))),
#if REACT_TEST_FRAMEWORK
                BridgeJson.PropRaw("tests", AgentBridgeTestRunner.StateJson()));
#else
                BridgeJson.PropRaw("tests", "null"));
#endif
        }

        static string Logs(Dictionary<string, string> query)
        {
            var limit = ReadInt(query, "limit", 100);
            LogType? minimum = null;
            if (query.TryGetValue("level", out var level))
            {
                if (level == "error") minimum = LogType.Error;
                else if (level == "warning") minimum = LogType.Warning;
            }

            var entries = AgentBridgeState.Logs(limit, minimum);
            var items = new List<string>(entries.Count);
            foreach (var entry in entries)
                items.Add(BridgeJson.Object(
                    BridgeJson.Prop("type", entry.Type.ToString()),
                    BridgeJson.Prop("message", entry.Message),
                    BridgeJson.Prop("stack", Trim(entry.Stack, 2000))));

            return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.PropRaw("entries", BridgeJson.Array(items.ToArray())));
        }

        static string Refresh()
        {
            AssetDatabase.Refresh();
            // Explicit: a Refresh with no asset change does not always trigger a compile, and
            // the caller asked for one.
            CompilationPipeline.RequestScriptCompilation();
            return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.Prop("queued", true));
        }

        static string Play(bool enter)
        {
            if (EditorApplication.isPlaying == enter)
                return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.Prop("isPlaying", enter), BridgeJson.Prop("changed", false));

            EditorApplication.isPlaying = enter;
            return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.Prop("isPlaying", enter), BridgeJson.Prop("changed", true));
        }

        static string Screenshot(Dictionary<string, string> query)
        {
            if (!query.TryGetValue("path", out var target) || string.IsNullOrEmpty(target))
                target = Path.Combine(AgentBridgeState.StateDirectory, "screenshot.png");
            target = Path.GetFullPath(target);
            Directory.CreateDirectory(Path.GetDirectoryName(target));

            // CaptureScreenshot writes on the next rendered frame, so the file is not there
            // when this returns. In play mode frames keep coming; outside it, the Editor may
            // idle, hence the repaint nudge.
            ScreenCapture.CaptureScreenshot(target, ReadInt(query, "supersize", 1));
            foreach (var view in Resources.FindObjectsOfTypeAll<EditorWindow>()) view.Repaint();

            return BridgeJson.Object(
                BridgeJson.Prop("ok", true),
                BridgeJson.Prop("path", target.Replace('\\', '/')),
                BridgeJson.Prop("pending", true));
        }

        static string Menu(Dictionary<string, string> query)
        {
            if (!query.TryGetValue("path", out var item) || string.IsNullOrEmpty(item)) return BridgeJson.Error("menu needs ?path=");
            var executed = EditorApplication.ExecuteMenuItem(item);
            return BridgeJson.Object(BridgeJson.Prop("ok", executed), BridgeJson.Prop("executed", executed), BridgeJson.Prop("path", item));
        }

        /// <summary>
        /// Closes the Editor so batch mode can have the project back. Deferred a few frames so
        /// the response is written before the process goes away -- expect the client to see the
        /// connection drop regardless, and to confirm by watching Library/EditorInstance.json.
        /// </summary>
        static string Quit()
        {
            AgentBridgeServer.RequestQuit();
            return BridgeJson.Object(BridgeJson.Prop("ok", true), BridgeJson.Prop("quitting", true));
        }

        static int ReadInt(Dictionary<string, string> query, string key, int fallback)
        {
            return query.TryGetValue(key, out var raw) && int.TryParse(raw, out var value) ? value : fallback;
        }

        static string Trim(string value, int max)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return value.Length <= max ? value : value.Substring(0, max) + "\n... (truncated)";
        }
    }
}
#endif
