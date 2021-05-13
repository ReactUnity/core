using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ReactWebBridge : MonoBehaviour
{
    public ReactUnity.ReactUnity ReactCanvas;
    private string CssContent;

    [Multiline]
    public string TestScript = "'use strict';\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar LightToggleApp = function (_React$Component) {\n  _inherits(LightToggleApp, _React$Component);\n\n  function LightToggleApp() {\n    _classCallCheck(this, LightToggleApp);\n\n    return _possibleConstructorReturn(this, (LightToggleApp.__proto__ || Object.getPrototypeOf(LightToggleApp)).apply(this, arguments));\n  }\n\n  _createClass(LightToggleApp, [{\n    key: 'render',\n    value: function render() {\n      return React.createElement(\n        'button',\n        {\n          style: {\n            height: '60px',\n            margin: '10px',\n            backgroundColor: 'crimson',\n            color: 'white'\n          },\n          onClick: function onClick() {\n            return Globals.Light.intensity = 1 - Globals.Light.intensity;\n          }\n        },\n        'Toggle Light'\n      );\n    }\n  }]);\n\n  return LightToggleApp;\n}(React.Component);\n\nReactUnityRenderer.render(React.createElement(LightToggleApp, null));";

    public TextAsset InjectableScript;

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
    }

    public void SetJSX(string script)
    {
        var text = InjectableScript.text;

        var injectedScript = text.Replace("/*INJECT_CODE*/", script);
        ReactCanvas.Script = ReactUnity.ReactScript.Text(injectedScript);
    }

    public void SetCSS(string script)
    {
        CssContent = script;
    }

    public void Render()
    {
        ReactCanvas.Render();

        if (!string.IsNullOrWhiteSpace(CssContent))
            ReactCanvas.Context.InsertStyle(CssContent);

        CssContent = null;
    }

    public void ReloadScene()
    {
        var scene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(scene.name);
    }

    public void LoadScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }
}
