using ReactUnity.Editor.Renderer;
using ReactUnity.Layout;
using UnityEditor;

namespace ReactUnity.Editor
{
    // TODO: enable this when performance problems are solved
    //[CustomEditor(typeof(ReactElement))]
    public class ReactElementInspector : ReactInspector
    {
        protected override ReactScript GetScript()
        {
            var res = ReactScript.Resource("ReactUnity/editor/style-editor/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4000";
            res.UseDevServer = false;
#endif
            return res;
        }
    }
}
