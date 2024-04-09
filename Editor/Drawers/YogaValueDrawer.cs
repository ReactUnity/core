using Yoga;
using ReactUnity.Editor.UIToolkit;
using UnityEditor;
using UnityEditor.UIElements;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor
{
    [CustomPropertyDrawer(typeof(YogaValue))]
    public class YogaValueDrawer : PropertyDrawer
    {
        private static string[] UnitOptions = new string[] {
            "Undefined",
            "px",
            "%",
            "Auto"
        };

        const float ButtonWidth = 36;

        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
        {
            label = EditorGUI.BeginProperty(position, label, property);

            EditorGUI.BeginChangeCheck();

            var indent = EditorGUI.indentLevel;
            var enabled = GUI.enabled;


            var currentUnit = property.FindPropertyRelative("unit");
            var currentValue = property.FindPropertyRelative("value");

            var currentUnitInt = currentUnit.intValue;
            var currentValueFloat = currentValue.floatValue;

            var numerical = (int) YogaUnit.Point == currentUnitInt || (int) YogaUnit.Percent == currentUnitInt;


            var buttonRect = new Rect(position);

            if (numerical)
            {
                position.width -= ButtonWidth;
                buttonRect.width = ButtonWidth;
                buttonRect.x = position.x + position.width;

                var newValue = EditorGUI.FloatField(position, label, currentValueFloat);
                currentValue.floatValue = newValue;
                EditorGUI.indentLevel = 0;
            }
            else
            {
                // Draw label
                position = EditorGUI.PrefixLabel(position, GUIUtility.GetControlID(FocusType.Passive), label);
                buttonRect = new Rect(position);
                EditorGUI.indentLevel = 0;
            }


            var newUnitValue = EditorGUI.Popup(buttonRect, currentUnitInt, UnitOptions, EditorStyles.popup);
            currentUnit.intValue = System.Convert.ToInt32(newUnitValue);


            if (EditorGUI.EndChangeCheck())
                property.serializedObject.ApplyModifiedProperties();


            GUI.enabled = enabled;
            EditorGUI.indentLevel = indent;
            EditorGUI.EndProperty();
        }

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
        {
            return EditorGUIUtility.singleLineHeight;
        }

        public override VisualElement CreatePropertyGUI(SerializedProperty property)
        {
            var fld = new StyleLengthField();

            fld.BindProperty(property);

            return fld;
        }
    }
}
