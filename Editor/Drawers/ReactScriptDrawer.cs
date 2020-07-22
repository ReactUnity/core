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
            var x = position.x;
            var width = position.width;
            var watchWidth = 60;
            var source = property.FindPropertyRelative("ScriptSource");
            position.y += 2;
            position.height = 18;
            EditorGUI.PropertyField(position, source);

            position.y += 20;
            position.height = 18;

            var watchable = IsWatchable(source);

            if (watchable) position.width = position.width - watchWidth;

            if ((int)ScriptSource.TextAsset == source.intValue)
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourceAsset"));
            else if ((int)ScriptSource.Text == source.intValue)
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourceText"));
            else
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourcePath"));

            if (watchable)
            {
                position.x = position.width + x;
                position.width = watchWidth;
                var watch = property.FindPropertyRelative("Watch");
                watch.boolValue = EditorGUI.ToggleLeft(position, "Watch", watch.boolValue);
            }


            var useDevServer = property.FindPropertyRelative("UseDevServer");
            position.x = x;
            position.width = width;
            position.y += 20;
            position.height = 18;
            EditorGUI.PropertyField(position, useDevServer, GUIContent.none);

            GUI.enabled = useDevServer.boolValue;
            position.x += 30;
            EditorGUI.PropertyField(position, property.FindPropertyRelative("DevServer"));
        }

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
        {
            return 64;
        }

        bool IsWatchable(SerializedProperty sourceProperty)
        {
            var val = sourceProperty.intValue;
            return (int)ScriptSource.TextAsset == val || (int)ScriptSource.File == val || (int)ScriptSource.Resource == val;
        }
    }
}
