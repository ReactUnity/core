using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Styling;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    public class StyleEditorWindow : ReactWindow
    {
        [MenuItem("React/Show Style Editor")]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<StyleEditorWindow>();
            window.titleContent = new GUIContent("React Style Editor");
        }

        protected override ReactScript GetScript()
        {
            var res = ReactScript.Resource("ReactUnity/editor/style-editor/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4000";
            res.UseDevServer = DevServerEnabled;
#endif
            return res;
        }

        public object GetResolvedStyles(IReactComponent component)
        {
            var obj = new Dictionary<string, object>();
            var props = CssProperties.CssPropertyMap;

            foreach (var prop in props)
            {
                if (prop.Value is ILayoutProperty ll)
                {
                    obj[prop.Key] = ll.Get(component.Layout);

                }
                else if (prop.Value is IStyleProperty ss)
                {
                    obj[prop.Key] = ss.GetStyle(component.ComputedStyle);
                }
                obj[prop.Key + "_exists"] = component.ComputedStyle.HasValue(prop.Value);
            }

            return runner.engine.CreateNativeObject(obj);
        }
    }
}
