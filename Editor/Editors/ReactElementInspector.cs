using ReactUnity.Editor.Renderer;

namespace ReactUnity.Editor
{
    // TODO: enable this when performance problems are solved
    //[CustomEditor(typeof(ReactElement))]
    public class ReactElementInspector : ReactInspector
    {
        protected override ScriptSource GetScript()
        {
            var res = ScriptSource.Resource("ReactUnity/editor/style-editor/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4000";
            res.UseDevServer = false;
#endif
            return res;
        }
    }
}
