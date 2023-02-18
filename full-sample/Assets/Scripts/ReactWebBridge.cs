using ReactUnity.Styling;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ReactWebBridge : MonoBehaviour
{
    public const string ReplaceSnippet = "/*INJECT_CODE*/";
    public bool AutoRender;
    public ReactUnityUGUI ReactCanvas;
    private string CssContent;
    private string PendingCssContent;
    private StyleSheet StyleSheet;
    private string ScriptContent;
    private bool Rendered;

    [Multiline(10)]
    public string TestScript = "";

    [Multiline(10)]
    public string TestStyle = "button {\n}\n";

    public TextAsset InjectableScript;
    public TextAsset RerenderScript;

    private void Awake()
    {
        ReactCanvas.AdvancedOptions.AutoRender = false;
        ReactCanvas.enabled = true;
    }

    private void OnEnable()
    {
        if (AutoRender) Test();
    }

    private void Start()
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        WebGLInput.captureAllKeyboardInput = false;
#endif
    }

    [ContextMenu("Test")]
    public void Test()
    {
        SetJSX(TestScript);
        SetCSS(TestStyle);
        RenderBridge();
    }

    public void SetJSX(string script)
    {
        var text = InjectableScript.text;

        ScriptContent = script;
        var injectedScript = text.Replace(ReplaceSnippet, script);
        ReactCanvas.Source = ReactUnity.ScriptSource.Text(injectedScript);
    }

    public void SetCSS(string script)
    {
        CssContent = script;
        PendingCssContent = script;
    }

    public void ReplaceCSS(string script)
    {
        CssContent = script;
        PendingCssContent = script;
        if (ReactCanvas.Context == null) return;

        if (StyleSheet != null) ReactCanvas.Context.RemoveStyle(StyleSheet);

        if (!string.IsNullOrWhiteSpace(script))
            StyleSheet = ReactCanvas.Context.InsertStyle(script);

        PendingCssContent = null;
    }

    public void RenderBridge()
    {
        if (string.IsNullOrWhiteSpace(ScriptContent)) return;

        if (!Rendered || ReactCanvas.Context == null)
        {
            StyleSheet = null;
            ReactCanvas.Context?.Style.StyleTree.Children.Clear();
            ReactCanvas.Render();

            if (!string.IsNullOrWhiteSpace(CssContent))
                StyleSheet = ReactCanvas.Context?.InsertStyle(CssContent);

            PendingCssContent = null;
            Rendered = true;
        }
        else
        {
            var hasError = false;
            try
            {
                var rerenderScript = RerenderScript.text.Replace(ReplaceSnippet, ScriptContent);
                ReactCanvas.Context.Script.ExecuteScript(rerenderScript, "ReactUnityInjectableRender");

                if (PendingCssContent != null) ReplaceCSS(PendingCssContent);
            }
            catch (System.Exception ex)
            {
                Debug.LogWarning("Failed fast rendering. Falling back to regular render. " + ex.Message);
                Rendered = false;
                hasError = true;
            }

            if (hasError) RenderBridge();
        }
    }

    public void ReloadScene()
    {
        StyleSheet = null;
        var scene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(scene.name);
    }

    public void LoadScene(string sceneName)
    {
        StyleSheet = null;
        SceneManager.LoadScene(sceneName);
    }

    private void OnDisable()
    {
        Rendered = false;
    }

    private void OnDestroy()
    {
        Rendered = false;
    }
}
