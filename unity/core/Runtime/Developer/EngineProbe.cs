#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE
#define REACT_JINT
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if REACT_UNITY_DEVELOPER
using System;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Developer
{
    /// <summary>Drives every engine in the build across the C# boundary and prints one verdict line
    /// per engine, so a player can be asked whether it works without a test framework in it.</summary>
    ///
    /// This exists for IL2CPP. The Editor is always Mono, so nothing the suites run there covers what
    /// only AOT breaks: a P/Invoke with no generated stub, a reverse callback the AOT compiler never
    /// saw, a type the managed stripper deleted. A player is the only place those appear.
    ///
    /// Inert unless `-reactProbe` is on the command line, which `pnpm unity player` passes.
    public static class EngineProbe
    {
        /// Every line the probe prints starts with this, so a runner can pull the verdict out of a
        /// player log that also holds whatever the loaded scene did.
        public const string Marker = "REACT_PROBE";

        public const string Argument = "-reactProbe";

#if ENABLE_IL2CPP
        public const string Backend = "il2cpp";
#else
        public const string Backend = "mono";
#endif

        private static readonly JavascriptEngineType[] Engines =
        {
#if REACT_QUICKJS
            JavascriptEngineType.QuickJS,
#endif
#if REACT_JINT
            JavascriptEngineType.Jint,
#endif
#if REACT_CLEARSCRIPT
            JavascriptEngineType.ClearScript,
#endif
        };

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void Run()
        {
            if (!Environment.GetCommandLineArgs().Contains(Argument)) return;

            Debug.Log($"{Marker} begin backend={Backend} unity={Application.unityVersion} platform={Application.platform} engines={Engines.Length}");

            var failed = 0;
            foreach (var type in Engines)
            {
                var failures = Probe(type);
                failed += failures.Count;
                Debug.Log($"{Marker} engine={type} checks={Checks.Count} failed={failures.Count}");
                foreach (var failure in failures) Debug.Log($"{Marker}   {type}: {failure}");
            }

            // Zero engines is a failure: it means the build stripped every engine out, which would
            // otherwise read as a clean run with nothing to report.
            var passed = failed == 0 && Engines.Length > 0;
            Debug.Log($"{Marker} end result={(passed ? "pass" : "fail")} failed={failed}");
            Quit(passed ? 0 : 1);
        }

        private static List<string> Probe(JavascriptEngineType type)
        {
            var failures = new List<string>();
            IJavaScriptEngine engine;

            try
            {
                engine = JavascriptEngineHelpers.GetEngineFactory(type).Create(null, false, false, null);
            }
            catch (Exception exception)
            {
                // A DllNotFoundException here is the whole point of the probe: the native plugin was
                // not shipped for this target, which the Editor can never tell you.
                failures.Add($"the engine could not be created: {Describe(exception)}");
                return failures;
            }

            foreach (var check in Checks)
            {
                try
                {
                    var problem = check.Value(engine);
                    if (problem != null) failures.Add($"{check.Key}: {problem}");
                }
                catch (Exception exception)
                {
                    failures.Add($"{check.Key}: {Describe(exception)}");
                }
            }

            try
            {
                engine.Dispose();
            }
            catch (Exception exception)
            {
                failures.Add($"dispose: {Describe(exception)}");
            }

            return failures;
        }

        /// Each returns null when it passed, or what went wrong. Every entry covers a distinct way
        /// AOT breaks rather than a distinct language feature.
        private static readonly Dictionary<string, Func<IJavaScriptEngine, string>> Checks = new Dictionary<string, Func<IJavaScriptEngine, string>>
        {
            ["evaluate"] = engine => Number(engine.Evaluate("1 + 1"), 2),

            ["strings"] = engine =>
                Text(engine.Evaluate("'héllo'"), "héllo") ??
                // Empty is not null. QuickJS marshalled it as null until 9ac748b3, and that is
                // exactly the kind of engine-specific difference a player run should catch.
                Text(engine.Evaluate("''"), ""),

            // A delegate reached from JS is a reverse callback, which under IL2CPP needs AOT code
            // the compiler had to generate ahead of time from the signature alone.
            ["callback"] = engine =>
            {
                engine.SetGlobal("probeAdd", new Func<int, int>(value => value + 1));
                return Number(engine.Evaluate("probeAdd(41)"), 42);
            },

            ["callback-void"] = engine =>
            {
                var seen = "<never called>";
                engine.SetGlobal("probeSink", new Action<string>(value => seen = value ?? "<null>"));
                engine.Execute("probeSink('');");
                return seen == "" ? null : $"expected the empty string, got {seen}";
            },

            // The reflect binder walking a real type, and the stripper having kept it.
            ["type-reference"] = engine =>
            {
                engine.SetGlobal("ProbeVector", engine.CreateTypeReference(typeof(Vector2)));
                return Number(engine.Evaluate("new ProbeVector(3, 4).magnitude"), 5);
            },

            ["globals"] = engine =>
            {
                engine.Execute("globalThis.probeGlobal = 'ok';");
                return Text(engine.GetGlobal("probeGlobal"), "ok");
            },

            ["module"] = engine =>
            {
                engine.Execute("export const value = 2;\nglobalThis.probeModule = value;", "probe-module", JavascriptDocumentType.Module);
                return Number(engine.GetGlobal("probeModule"), 2);
            },
        };

        private static string Number(object actual, double expected)
        {
            if (actual == null) return $"expected {expected}, got null";
            try
            {
                var value = Convert.ToDouble(actual);
                return Math.Abs(value - expected) < 0.0001 ? null : $"expected {expected}, got {value}";
            }
            catch (Exception)
            {
                return $"expected the number {expected}, got {actual.GetType().Name} '{actual}'";
            }
        }

        private static string Text(object actual, string expected)
        {
            if (actual is string text) return text == expected ? null : $"expected '{expected}', got '{text}'";
            return actual == null ? $"expected '{expected}', got null" : $"expected a string, got {actual.GetType().Name} '{actual}'";
        }

        // The type name matters more than the message: DllNotFoundException, ExecutionEngineException
        // and TypeLoadException each name a different IL2CPP problem.
        private static string Describe(Exception exception) => $"{exception.GetType().Name}: {exception.Message}";

        private static void Quit(int code)
        {
            Application.Quit(code);

            // Quit this early in startup is not guaranteed to take, so ask again from a frame that
            // definitely exists. The verdict is already in the log either way.
            var host = new GameObject(nameof(EngineProbe)) { hideFlags = HideFlags.HideAndDontSave };
            UnityEngine.Object.DontDestroyOnLoad(host);
            host.AddComponent<ProbeQuitter>().Code = code;
        }

        private class ProbeQuitter : MonoBehaviour
        {
            public int Code;

            private void Update()
            {
                Application.Quit(Code);
            }
        }
    }
}
#endif
