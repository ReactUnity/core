using ReactUnity.Types;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    [CustomPropertyDrawer(typeof(YogaValue2))]
    public class YogaValue2Drawer : PropertyDrawer
    {
        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
        {
            label = EditorGUI.BeginProperty(position, label, property);
            position = EditorGUI.PrefixLabel(position, GUIUtility.GetControlID(FocusType.Passive), label);

            EditorGUI.BeginChangeCheck();

            var indent = EditorGUI.indentLevel;
            var enabled = GUI.enabled;
            var originalLabelWidth = EditorGUIUtility.labelWidth;
            EditorGUI.indentLevel = 0;

            var xprop = property.FindPropertyRelative("x");
            var yprop = property.FindPropertyRelative("y");
            var lockedprop = property.FindPropertyRelative("locked");
            var isLocked = lockedprop.boolValue;

            var fullWidth = position.width;
            var margin = 5;
            var buttonWidth = 20;
            var labelWidth = 12;
            var propWidth = (fullWidth - buttonWidth - 2 * margin) / 2;


            EditorGUIUtility.labelWidth = labelWidth;
            position.width = propWidth;
            EditorGUI.PropertyField(position, xprop);

            position.x += propWidth + margin;
            position.width = buttonWidth;
            isLocked = lockedprop.boolValue = GUI.Toggle(position, isLocked, "=", "Button");

            if (isLocked) GUI.enabled = false;

            position.x += buttonWidth + margin;
            position.width = propWidth;
            EditorGUI.PropertyField(position, yprop);


            if (EditorGUI.EndChangeCheck() || isLocked)
            {
                if (isLocked)
                {
                    yprop.FindPropertyRelative("value").floatValue = xprop.FindPropertyRelative("value").floatValue;
                    yprop.FindPropertyRelative("unit").intValue = xprop.FindPropertyRelative("unit").intValue;
                }

                property.serializedObject.ApplyModifiedProperties();
            }


            GUI.enabled = enabled;
            EditorGUI.indentLevel = indent;
            EditorGUIUtility.labelWidth = originalLabelWidth;
            EditorGUI.EndProperty();
        }

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
        {
            return EditorGUIUtility.singleLineHeight;
        }
    }
}
