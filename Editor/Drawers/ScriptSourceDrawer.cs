using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    [CustomPropertyDrawer(typeof(ScriptSource))]
    public class ScriptSourceDrawer : PropertyDrawer
    {
        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
        {
            var x = position.x;
            var width = position.width;

            position.y += 2;
            position.height = 18;
            var language = property.FindPropertyRelative("Language");
            EditorGUI.PropertyField(position, language);
            position.y += 18;

            var source = property.FindPropertyRelative("Type");
            position.y += 2;
            position.height = 18;
            if (source != null) EditorGUI.PropertyField(position, source);

            position.y += 18;
            position.height = 18;

            position.y += 2;

            if ((int) ScriptSourceType.TextAsset == source.intValue)
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourceAsset"));
            else if ((int) ScriptSourceType.Raw == source.intValue)
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourceText"));
            else
                EditorGUI.PropertyField(position, property.FindPropertyRelative("SourcePath"));


            if ((int) ScriptSourceLanguage.Html == language.intValue)
            {
                var watch = property.FindPropertyRelative("Watch");
                position.x = x;
                position.width = width;
                position.y += 20;
                position.height = 18;
                EditorGUI.PropertyField(position, watch, new GUIContent("Watch File Changes"));
            }
            else
            {
                var useDevServer = property.FindPropertyRelative("UseDevServer");

                var mp = Mathf.Max(122, width * 4f / 9f - 24);

                var labelWidth = 72;
                position.y += 20;
                position.height = 18;
                position.x = x;
                position.width = labelWidth;

                EditorGUI.LabelField(position, "Dev Server");


                var ddWidth = Mathf.Max(Mathf.Min(mp - 90, 90), 20);
                position.x += labelWidth;
                position.width = ddWidth;
                EditorGUI.PropertyField(position, useDevServer, GUIContent.none);

                GUI.enabled = useDevServer.intValue > 0;
                var inputPos = Mathf.Max(x + mp, x + labelWidth + ddWidth);
                position.x = inputPos;
                position.width = width + x - inputPos;
                EditorGUI.PropertyField(position, property.FindPropertyRelative("DevServer"), GUIContent.none);
            }
        }

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
        {
            return 84;
        }
    }
}
