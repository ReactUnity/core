#if !JSB_UNITYLESS
using System;
using System.Collections.Generic;
using System.IO;

namespace QuickJS.Unity
{
    using UnityEditor;
    using UnityEditor.IMGUI.Controls;
    using UnityEngine;
    using Native;

    [CustomEditor(typeof(JSScriptableObject))]
    public class JSScriptableObjectInspector : JSInspectorBase<JSScriptableObject>
    {
        protected override JSScriptClassType GetScriptClassType()
        {
            return JSScriptClassType.ScriptableObject;
        }

        protected override void OnWaitingForScriptInstancing()
        {
            var target_t = GetTarget();

            if (target_t.enabled)
            {
                target_t.CreateScriptInstance();
            }
        }
    }
}
#endif
