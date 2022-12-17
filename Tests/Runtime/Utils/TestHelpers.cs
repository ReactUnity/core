using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework.Interfaces;
using ReactUnity.Scripting;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Tests
{
    public static class TestHelpers
    {
        public const string UGUISceneName = "Packages/com.reactunity.core/Tests/Scenes/TestScene_UGUI.unity";
        public const string NoopSceneName = "Packages/com.reactunity.core/Tests/Scenes/TestScene_Noop.unity";
        public const string UIToolkitSceneName = "Packages/com.reactunity.core/Tests/Scenes/TestScene_UIToolkit.unity";
        public const string WorldSceneName = "Packages/com.reactunity.core/Tests/Scenes/TestScene_World.unity";

        public static (InlineStyles, NodeStyle) CreateStyle()
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });
            return (collection, style);
        }

        public static JavascriptEngineType GetEngineTypeOfTest(ITest test)
        {
            var parent = test;
            while (parent != null)
            {
                var fixture = test.Fixture as TestBase;
                if (fixture != null) return fixture.EngineType;
                parent = parent.Parent;
            }

            var enumNames = Enum.GetNames(typeof(JavascriptEngineType));

            foreach (var enumName in enumNames)
            {
                if (test.FullName.ToLowerInvariant().Contains($"({enumName})".ToLowerInvariant()))
                {
                    if (Enum.TryParse<JavascriptEngineType>(enumName, out var resolved)) return resolved;
                }
            }
            return JavascriptEngineType.Auto;
        }

        public static IEnumerator<ScriptSource> GetScriptSource(string script, bool html, bool transform)
        {
            var transformed = script;

            if (!html && transform)
            {
                var transformer = CodeTransformer.TransformCode(script);
                while (transformer.MoveNext()) yield return null;
                transformed = transformer.Current;
            }

            Debug.Assert(!string.IsNullOrWhiteSpace(transformed), "The code must be non-empty");

            if (html)
            {
                yield return new ScriptSource
                {
                    Language = ScriptSourceLanguage.Html,
                    UseDevServer = ScriptSource.DevServerType.Never,
                    SourceText = transformed,
                    Type = ScriptSourceType.Raw,
                };
            }
            else
            {
                var injectableText = Resources.Load<TextAsset>("ReactUnity/tests/injectable/index");
                var injectedText = injectableText.text.Replace("/*INJECT_CODE*/", transformed);

                yield return new ScriptSource
                {
                    UseDevServer = ScriptSource.DevServerType.Never,
                    SourceText = injectedText,
                    Type = ScriptSourceType.Raw,
                };
            }
        }

        #region Test Debug Toggle
#if UNITY_EDITOR && REACT_UNITY_DEVELOPER
        const string MenuName = "React/Tests/Debug Tests";
        public static bool IsDebugEnabled
        {
            get => UnityEditor.EditorPrefs.GetBool(MenuName, false);
            set => UnityEditor.EditorPrefs.SetBool(MenuName, value);
        }

        [UnityEditor.MenuItem(MenuName)]
        private static void ToggleTests()
        {
            IsDebugEnabled = !IsDebugEnabled;
        }

        [UnityEditor.MenuItem(MenuName, true)]
        private static bool ToggleTestsValidate()
        {
            UnityEditor.Menu.SetChecked(MenuName, IsDebugEnabled);
            return true;
        }
#else
        public static bool IsDebugEnabled { get; set; } = false;
#endif
        #endregion

#if UNITY_EDITOR && REACT_UNITY_DEVELOPER
        const string SnapshotsMenuName = "React/Tests/Overwrite Snapshots";
        private static bool OverwriteSnapshots
        {
            get => UnityEditor.EditorPrefs.GetBool(SnapshotsMenuName, false);
            set => UnityEditor.EditorPrefs.SetBool(SnapshotsMenuName, value);
        }

        [UnityEditor.MenuItem(SnapshotsMenuName)]
        private static void ToggleOverwriteSnapshots()
        {
            OverwriteSnapshots = !OverwriteSnapshots;
        }

        [UnityEditor.MenuItem(SnapshotsMenuName, true)]
        private static bool ToggleOverwriteSnapshotsValidate()
        {
            UnityEditor.Menu.SetChecked(SnapshotsMenuName, OverwriteSnapshots);
            return true;
        }
#else
        private static bool OverwriteSnapshots { get; set; } = false;
#endif

        public static bool ShouldOverwriteSnapshots
        {
            get
            {
                return OverwriteSnapshots ||
#if REACT_OVERWRITE_SNAPSHOTS
                    true ||
#endif
                    Environment.GetCommandLineArgs().Contains("-reactOverwriteSnapshots") ||
                    Environment.GetEnvironmentVariable("REACT_OVERWRITE_SNAPSHOTS") == "true";
            }
        }

        public static bool IsNoGraphics()
        {
            return SystemInfo.graphicsDeviceType == UnityEngine.Rendering.GraphicsDeviceType.Null;
        }
    }
}
