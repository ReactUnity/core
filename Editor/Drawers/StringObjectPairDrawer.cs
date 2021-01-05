using ReactUnity.Types;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    [CustomPropertyDrawer(typeof(StringObjectPair))]
    public class StringObjectPairDrawer : PropertyDrawer
    {
        public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
        {
            position.width /= 2;
            EditorGUI.PropertyField(position, property.FindPropertyRelative("Key"), GUIContent.none);

            position.x += position.width;
            EditorGUI.PropertyField(position, property.FindPropertyRelative("Value"), GUIContent.none);
        }

        public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
        {
            return 20;
        }
    }
}
