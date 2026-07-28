#if !JSB_UNITYLESS
using System;

namespace QuickJS.Unity
{
    using UnityEditor;

    [CustomEditor(typeof(JSBehaviour))]
    public class JSBehaviourInspector : JSInspectorBase<JSBehaviour>
    {
        protected override JSScriptClassType GetScriptClassType()
        {
            return JSScriptClassType.MonoBehaviour;
        }

        protected override void DrawSourceView()
        {
            base.DrawSourceView();

            var target_t = GetTarget();
            var updatableOld = target_t is JSBehaviourFull;
            var updatableNew = EditorGUILayout.Toggle("Updatable", updatableOld);

            if (updatableNew != updatableOld)
            {
                this.ReleaseJSValues();
                target_t.ReleaseScriptInstance();

                var type = updatableNew ? typeof(JSBehaviourFull) : typeof(JSBehaviour);
                var monoScript = UnityHelper.GetMonoScript(type);
                var prop = serializedObject.FindProperty("m_Script");
                serializedObject.Update();
                prop.objectReferenceValue = monoScript;

                // this editor instance (and _target) reference will be invalid after this call, 
                // do not access anything relating to the old references
                serializedObject.ApplyModifiedProperties();
            }
        }
    }
}

#endif
