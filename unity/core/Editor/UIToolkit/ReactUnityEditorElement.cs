using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling.Rules;
using ReactUnity.UIToolkit;

namespace ReactUnity.Editor.UIToolkit
{
    public class ReactUnityEditorElement : ReactUnityElement
    {
        public ReactWindow Window { get; internal set; }
        public ReactInspector Inspector { get; internal set; }
        public ReactProperty Property { get; internal set; }

        public ReactUnityEditorElement(ScriptSource script, GlobalRecord globals, ITimer timer, IMediaProvider mediaProvider, JavascriptEngineType engineType = JavascriptEngineType.Auto, bool debug = false, bool awaitDebugger = false, bool autorun = false, ReactAdvancedOptions advancedOptions = null)
            : base(script, globals, timer, mediaProvider, engineType, debug, awaitDebugger, autorun, advancedOptions)
        {
        }

        protected override ReactContext CreateContext(ScriptSource script)
        {
            var ctx = new EditorContext(new EditorContext.Options
            {
                HostElement = this,
                Globals = Globals,
                Source = script,
                Timer = Timer ?? EditorTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = Restart,
                Window = Window,
                Inspector = Inspector,
                Property = Property,
                Debug = Debug,
                AwaitDebugger = AwaitDebugger,
                EngineType = EngineType,
                BeforeStart = AdvancedOptions.BeforeStart,
                AfterStart = AdvancedOptions.AfterStart,
                Pooling = AdvancedOptions.Pooling,
                UnknownPropertyHandling = AdvancedOptions.UnknownPropertyHandling,
            });
            ctx.Initialize();
            return ctx;
        }
    }
}
