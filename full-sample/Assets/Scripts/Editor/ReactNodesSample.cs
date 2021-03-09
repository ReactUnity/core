using ReactUnity;
using ReactUnity.Editor.Renderer;
using UnityEditor;
using UnityEngine;

public class ReactNodesSample : ReactWindow
{
    [MenuItem("React Samples/Nodes Sample")]
    public static void ShowDefaultWindow()
    {
        var wnd = GetWindow<ReactNodesSample>();
        wnd.titleContent = new GUIContent("React Nodes Sample");
    }


    protected override ReactScript GetScript()
    {
        var res = ReactScript.Resource("react-editor/index");
        res.UseDevServer = false;
        return res;
    }
}
