#if UNITY_EDITOR && REACT_UNITY_DEVELOPER
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEditor;
using UnityEditor.Compilation;
using UnityEngine;

namespace ReactUnity.Editor.Developer
{
    /// <summary>
    /// Console and compilation state for the bridge. Both are captured continuously rather
    /// than on request: by the time a client asks why a compile failed, the messages are
    /// already gone.
    /// </summary>
    public static class AgentBridgeState
    {
        public static string StateDirectory => Path.Combine(Directory.GetCurrentDirectory(), "Library", "ReactUnityAgentBridge");
        public static string DiscoveryFile => Path.Combine(Directory.GetCurrentDirectory(), "Library", "ReactUnityAgentBridge.json");
        public static string CompileFile => Path.Combine(StateDirectory, "compile.json");
        public static string TestResultsFile => Path.Combine(StateDirectory, "tests.xml");
        public static string TestStateFile => Path.Combine(StateDirectory, "tests.json");

        public struct LogEntry
        {
            public string Message;
            public string Stack;
            public LogType Type;
        }

        // Domain reloads clear this, which is correct: the interesting logs after a reload
        // are the ones from after the reload. Compile errors are file-backed instead.
        const int Capacity = 500;
        static readonly Queue<LogEntry> logs = new Queue<LogEntry>(Capacity);
        static bool installed;

        public static void Install()
        {
            Directory.CreateDirectory(StateDirectory);
            if (installed) return;
            installed = true;

            Application.logMessageReceivedThreaded += OnLog;
            CompilationPipeline.compilationStarted += OnCompilationStarted;
            CompilationPipeline.assemblyCompilationFinished += OnAssemblyFinished;
        }

        static void OnLog(string message, string stack, LogType type)
        {
            lock (logs)
            {
                if (logs.Count >= Capacity) logs.Dequeue();
                logs.Enqueue(new LogEntry { Message = message, Stack = stack, Type = type });
            }
        }

        public static List<LogEntry> Logs(int limit, LogType? minimum)
        {
            lock (logs)
            {
                var all = new List<LogEntry>(logs);
                var filtered = new List<LogEntry>();
                for (var i = all.Count - 1; i >= 0 && filtered.Count < limit; i--)
                {
                    var entry = all[i];
                    if (minimum.HasValue && !AtLeast(entry.Type, minimum.Value)) continue;
                    filtered.Add(entry);
                }
                filtered.Reverse();
                return filtered;
            }
        }

        static bool AtLeast(LogType type, LogType minimum)
        {
            if (minimum == LogType.Warning) return type != LogType.Log;
            if (minimum == LogType.Error) return type == LogType.Error || type == LogType.Exception || type == LogType.Assert;
            return true;
        }

        #region Compilation

        static readonly List<string> compileMessages = new List<string>();

        static void OnCompilationStarted(object _)
        {
            compileMessages.Clear();
            WriteCompileFile(true);
        }

        static void OnAssemblyFinished(string assembly, CompilerMessage[] messages)
        {
            foreach (var message in messages)
                if (message.type == CompilerMessageType.Error)
                    compileMessages.Add($"{message.file}({message.line},{message.column}): {message.message}");

            WriteCompileFile(false);
        }

        static void WriteCompileFile(bool compiling)
        {
            try
            {
                Directory.CreateDirectory(StateDirectory);
                File.WriteAllText(CompileFile, BridgeJson.Object(
                    BridgeJson.Prop("compiling", compiling),
                    BridgeJson.PropRaw("errors", BridgeJson.Array(compileMessages.ConvertAll(BridgeJson.String).ToArray()))));
            }
            catch { /* a locked state file must not break compilation */ }
        }

        public static string[] CompileErrors => compileMessages.ToArray();

        #endregion
    }

    /// <summary>
    /// Minimal JSON writing. Responses are small and fixed-shape, and this keeps the bridge
    /// assembly free of a Newtonsoft reference.
    /// </summary>
    public static class BridgeJson
    {
        public static string Object(params string[] properties) => "{" + string.Join(",", properties) + "}";
        public static string Array(params string[] items) => "[" + string.Join(",", items) + "]";
        public static string Prop(string name, int value) => String(name) + ":" + value;
        public static string Prop(string name, bool value) => String(name) + ":" + (value ? "true" : "false");
        // Quoting is the default and raw is the one you have to ask for: the other way round
        // shipped an unquoted "unityVersion":6000.5.5f1 into the discovery file.
        public static string Prop(string name, string value) => String(name) + ":" + String(value);
        public static string PropRaw(string name, string rawJson) => String(name) + ":" + rawJson;
        public static string Error(string message) => Object(Prop("ok", false), Prop("error", message));

        public static string String(string value)
        {
            if (value == null) return "null";
            var builder = new StringBuilder(value.Length + 2).Append('"');
            foreach (var c in value)
            {
                switch (c)
                {
                    case '"': builder.Append("\\\""); break;
                    case '\\': builder.Append("\\\\"); break;
                    case '\n': builder.Append("\\n"); break;
                    case '\r': builder.Append("\\r"); break;
                    case '\t': builder.Append("\\t"); break;
                    default:
                        if (c < 0x20) builder.Append("\\u").Append(((int) c).ToString("x4"));
                        else builder.Append(c);
                        break;
                }
            }
            return builder.Append('"').ToString();
        }
    }
}
#endif
