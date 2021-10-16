using System;
using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    public class TestReactWindow : ReactWindow
    {
        public Func<ScriptSource> ScriptCallback;
        public SerializableDictionary Globals = new SerializableDictionary();
        public override bool AutoRun => false;

        public override JavascriptEngineType EngineType { get; set; }

        public static TestReactWindow CreateWindow(
            Func<ScriptSource> scriptCallback,
            JavascriptEngineType engineType
        )
        {
            var window = GetWindow<TestReactWindow>();
            window.titleContent = new GUIContent("Test React Window");
            window.ScriptCallback = scriptCallback;
            window.EngineType = engineType;
            return window;
        }

        protected override ScriptSource GetScript()
        {
            return ScriptCallback?.Invoke();
        }

        protected override SerializableDictionary GetGlobals()
        {
            Globals["Window"] = this;
            return Globals;
        }
    }
}
