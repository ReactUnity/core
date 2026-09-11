#if REACT_UNITY_DEVELOPER
using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEngine;

namespace ReactUnity.Editor.Developer
{
    /// <summary>Builds a standalone player from the command line, on the scripting backend the run
    /// asks for. The `-executeMethod` half of `pnpm unity player`.</summary>
    ///
    /// The backend is the reason this exists. The Editor is always Mono, so an IL2CPP player is the
    /// only place a missing P/Invoke stub or an over-eager stripper shows up -- see
    /// <c>ReactUnity.Developer.EngineProbe</c>, which is what the built player then runs.
    [ExcludeFromCodeCoverage]
    public static class PlayerBuilder
    {
        private const string BackendArgument = "-reactBackend";
        private const string PathArgument = "-reactPlayerPath";
        private const string StrippingArgument = "-reactStripping";

        public static void Build()
        {
            try
            {
                var code = Run();
                // Batch mode does not exit on its own from -executeMethod, and an uncaught exception
                // here exits 1 with the reason buried in the log, so both paths are explicit.
                EditorApplication.Exit(code);
            }
            catch (Exception exception)
            {
                Debug.LogError($"[player] {exception}");
                EditorApplication.Exit(1);
            }
        }

        private static int Run()
        {
            var output = Argument(PathArgument);
            if (string.IsNullOrEmpty(output))
            {
                Debug.LogError($"[player] {PathArgument} is required.");
                return 2;
            }

            var backend = ParseBackend(Argument(BackendArgument) ?? "il2cpp");
            if (backend == null) return 2;

            var target = Target();
            var scenes = EditorBuildSettings.scenes.Where(scene => scene.enabled).Select(scene => scene.path).ToArray();
            if (scenes.Length == 0)
            {
                // A player with no scene starts and does nothing, so the probe would never run and
                // the build would still look like a success.
                Debug.LogError("[player] no enabled scenes in Build Settings; there would be nothing to run.");
                return 2;
            }

            PlayerSettings.SetScriptingBackend(NamedBuildTarget.Standalone, backend.Value);

            var stripping = Argument(StrippingArgument);
            if (!string.IsNullOrEmpty(stripping))
            {
                if (!Enum.TryParse<ManagedStrippingLevel>(stripping, true, out var level))
                {
                    Debug.LogError($"[player] '{stripping}' is not a managed stripping level.");
                    return 2;
                }
                PlayerSettings.SetManagedStrippingLevel(NamedBuildTarget.Standalone, level);
            }

            var executable = Path.Combine(output, SanitizeFileName(Application.productName) + Extension(target));
            Directory.CreateDirectory(output);

            Debug.Log($"[player] {target} {backend} stripping={PlayerSettings.GetManagedStrippingLevel(NamedBuildTarget.Standalone)} " +
                      $"scenes={scenes.Length} -> {executable}");

            var report = BuildPipeline.BuildPlayer(new BuildPlayerOptions
            {
                scenes = scenes,
                locationPathName = executable,
                target = target,
                // Development is not a convenience: it defines DEBUG, keeps the managed stack traces
                // that name what IL2CPP could not resolve, and makes the player log verbose.
                options = BuildOptions.Development | BuildOptions.AllowDebugging,
            });

            var summary = report.summary;
            Debug.Log($"[player] {summary.result} in {summary.totalTime}, {summary.totalErrors} error(s), {summary.totalWarnings} warning(s)");

            // The path is the runner's contract with this method: it launches whatever this prints
            // rather than guessing the executable name from the product name.
            if (summary.result == BuildResult.Succeeded) Debug.Log($"[player] built={summary.outputPath}");

            return summary.result == BuildResult.Succeeded ? 0 : 1;
        }

        private static ScriptingImplementation? ParseBackend(string value)
        {
            switch (value.ToLowerInvariant())
            {
                case "il2cpp": return ScriptingImplementation.IL2CPP;
                case "mono": return ScriptingImplementation.Mono2x;
                default:
                    Debug.LogError($"[player] '{value}' is not a backend. Expected il2cpp or mono.");
                    return null;
            }
        }

        /// The Editor's own platform, so this never asks for a target whose module is not installed.
        private static BuildTarget Target()
        {
            switch (Application.platform)
            {
                case RuntimePlatform.OSXEditor: return BuildTarget.StandaloneOSX;
                case RuntimePlatform.LinuxEditor: return BuildTarget.StandaloneLinux64;
                default: return BuildTarget.StandaloneWindows64;
            }
        }

        private static string Extension(BuildTarget target)
        {
            switch (target)
            {
                case BuildTarget.StandaloneOSX: return ".app";
                case BuildTarget.StandaloneLinux64: return "";
                default: return ".exe";
            }
        }

        private static string SanitizeFileName(string name)
        {
            var invalid = Path.GetInvalidFileNameChars();
            var cleaned = new string(name.Select(character => invalid.Contains(character) ? '_' : character).ToArray()).Trim();
            return string.IsNullOrEmpty(cleaned) ? "Player" : cleaned;
        }

        private static string Argument(string name)
        {
            var args = Environment.GetCommandLineArgs();
            var at = Array.IndexOf(args, name);
            return at >= 0 && at + 1 < args.Length ? args[at + 1] : null;
        }
    }
}
#endif
