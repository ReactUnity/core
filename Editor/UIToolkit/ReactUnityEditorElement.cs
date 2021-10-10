using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using ReactUnity.UIToolkit;

namespace ReactUnity.Editor.UIToolkit
{
    public class ReactUnityEditorElement : ReactUnityElement
    {
        public ReactWindow Window { get; internal set; }
        public ReactInspector Inspector { get; internal set; }
        public ReactProperty Property { get; internal set; }

        public ReactUnityEditorElement(ScriptSource script, GlobalRecord globals, ITimer timer, IMediaProvider mediaProvider, JavascriptEngineType engineType = JavascriptEngineType.Auto, bool debug = false, bool awaitDebugger = false, bool autorun = false)
            : base(script, globals, timer, mediaProvider, engineType, debug, awaitDebugger, autorun)
        {
        }

        protected override ReactContext CreateContext(ScriptSource script)
        {
            var ctx = new EditorContext(this, Globals, script, dispatcher, Timer ?? EditorTimer.Instance, MediaProvider, Restart, Window, Inspector, Property);
            ctx.Initialize();
            return ctx;
        }

        protected override IDispatcher CreateDispatcher() => new EditorDispatcher();
    }
}
