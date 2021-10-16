using System.Collections.Generic;
using ReactUnity.Editor.Renderer;
using ReactUnity.Styling;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    public class DevToolsWindow : ReactWindow
    {
        [MenuItem("React/Dev Tools")]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<DevToolsWindow>();
            window.titleContent = new GUIContent("React Dev Tools");
        }

        protected override ScriptSource GetScript()
        {
            var res = ScriptSource.Resource("ReactUnity/editor/devtools/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4000";
            res.UseDevServer = DevServerEnabled;
#endif
            return res;
        }

        public object GetResolvedStyles(IReactComponent component)
        {
            var obj = new Dictionary<string, object>();
            var props = CssProperties.PropertyMap;

            foreach (var prop in props)
            {
                obj[prop.Key] = prop.Value.GetStyle(component.ComputedStyle);
                obj[prop.Key + "_exists"] = component.ComputedStyle.HasValue(prop.Value);
            }

            return Context.Script.Engine.CreateNativeObject(obj);
        }

        public Dictionary<string, object> CreateStyleDictionary() => new Dictionary<string, object>();
    }
}
