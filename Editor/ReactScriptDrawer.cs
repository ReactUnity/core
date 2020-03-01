using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    [CustomPropertyDrawer(typeof(ReactScript))]
    public class ReactScriptDrawer : PropertyDrawer
    {
        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
        {
            var source = property.FindPropertyRelative("ScriptSource");
            position.y += 2;
            position.height = 18;
            EditorGUI.PropertyField(position, source);

            position.y += 20;
            position.height = 18;

            if ((int)ScriptSource.TextAsset == source.intValue)
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourceAsset"));
            else if ((int)ScriptSource.Text == source.intValue)
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourceText"));
            else
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourcePath"));
        }

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
        {
            return 40;
        }
    }
}
