using System;
using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.Scripting;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    public class TestReactWindow : ReactWindow
    {
        public const string WindowTitle = "Test React Window";

        public Func<ScriptSource> ScriptCallback;
        [NonSerialized] public GlobalRecord Globals = new GlobalRecord();
        public override bool AutoRun => false;

        public override JavascriptEngineType EngineType { get; set; }

        private static TestReactWindow instance;

        /// <summary>The open test window, or null. Never opens one, and never takes focus.</summary>
        ///
        /// EditorWindow.GetWindow focuses what it returns, and the test base reads this on nearly
        /// every line of every test -- which is why running the Editor suite used to pull the Editor
        /// in front of whatever else was on screen, hundreds of times a run. The static survives
        /// everything but a domain reload, after which the window is still open and GetWindow finds
        /// it again.
        public static TestReactWindow Existing =>
            instance ? instance : (instance = HasOpenInstances<TestReactWindow>() ? Unfocused() : null);

        public static TestReactWindow CreateWindow(Func<ScriptSource> scriptCallback, JavascriptEngineType engineType)
        {
            var window = instance = Existing ?? Unfocused();
            window.ScriptCallback = scriptCallback;
            window.EngineType = engineType;
            return window;
        }

        private static TestReactWindow Unfocused() => GetWindow<TestReactWindow>(false, WindowTitle, false);

        protected override void OnDestroy()
        {
            base.OnDestroy();
            if (instance == this) instance = null;
        }

        protected override ScriptSource GetScript()
        {
            return ScriptCallback?.Invoke();
        }

        protected override GlobalRecord GetGlobals()
        {
            Globals["Window"] = this;
            return Globals;
        }
    }
}
