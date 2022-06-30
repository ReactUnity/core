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
    public string TestScript = "'use strict';\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar LightToggleApp = function (_React$Component) {\n  _inherits(LightToggleApp, _React$Component);\n\n  function LightToggleApp() {\n    _classCallCheck(this, LightToggleApp);\n\n    return _possibleConstructorReturn(this, (LightToggleApp.__proto__ || Object.getPrototypeOf(LightToggleApp)).apply(this, arguments));\n  }\n\n  _createClass(LightToggleApp, [{\n    key: 'render',\n    value: function render() {\n      return React.createElement(\n        'button',\n        {\n          style: {\n            height: '60px',\n            margin: '10px',\n            backgroundColor: 'crimson',\n            color: 'white'\n          },\n          onClick: function onClick() {\n            return Globals.Light.intensity = 1 - Globals.Light.intensity;\n          }\n        },\n        'Toggle Light'\n      );\n    }\n  }]);\n\n  return LightToggleApp;\n}(React.Component);\n\nReactUnityRenderer.render(React.createElement(LightToggleApp, null));";

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
                RenderBridge();
            }
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
