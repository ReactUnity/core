using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using ReactUnity.UIToolkit;

namespace ReactUnity.Editor.UIToolkit
{
    public class ReactUnityEditorElement : ReactUnityElement
    {
        public ReactUnityEditorElement(ScriptSource script, GlobalRecord globals, IMediaProvider mediaProvider, JavascriptEngineType engineType = JavascriptEngineType.Auto, bool debug = false, bool awaitDebugger = false, bool autorun = true)
            : base(script, globals, mediaProvider, engineType, debug, awaitDebugger, autorun)
        {
        }

        protected override ReactContext CreateContext(ScriptSource script, bool isDevServer)
        {
            return new EditorContext(this, Globals, script, dispatcher, scheduler, MediaProvider, isDevServer, Restart);
        }
    }
}
