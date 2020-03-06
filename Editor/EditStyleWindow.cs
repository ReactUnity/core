using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using TMPro;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    public class EditStyleWindow : EditorWindow
    {
        public FlexElement PreviousFlex { get; set; }

        public NodeStyle CurrentStyle { get; set; }
        public YogaNode CurrentLayout { get; set; }

        public NodeStyle CurrentStyleDefaults { get; set; }
        public YogaNode CurrentLayoutDefaults { get; set; }


        public bool AutoApply = true;

        [MenuItem("React/Edit Style")]
        public static void Open()
        {
            EditStyleWindow window = GetWindow<EditStyleWindow>();
            window.titleContent = new GUIContent("React - Edit Style");
            window.Show();
        }

        private void OnSelectionChange()
        {
            this.Repaint();
        }

        void OnGUI()
        {
            if (CurrentStyle == null) CurrentStyle = new NodeStyle();
            if (CurrentLayout == null) CurrentLayout = new YogaNode();

            var flex = Selection.activeGameObject?.GetComponent<FlexElement>();
            if (!flex)
            {
                PreviousFlex = null;
                GUILayout.Label("Select an element to start editing");
                return;
            }

            if (PreviousFlex != flex)
            {
                CurrentStyle.CopyStyle(flex.Style);
                CurrentLayout.CopyStyle(flex.Layout);

                CurrentStyleDefaults = flex.Component.DefaultStyle;
                CurrentLayoutDefaults = flex.Component.DefaultLayout;

                CurrentStyle.ResolveStyle(flex.Component.Parent?.Style.resolved, CurrentStyleDefaults);

                PreviousFlex = flex;
            }


            GUILayout.BeginHorizontal();
            AutoApply = EditorGUILayout.Toggle("Auto Apply changes", AutoApply);
            GUI.enabled = !AutoApply;
            if (GUILayout.Button("Apply")) ApplyStyles();
            GUILayout.EndHorizontal();
            GUI.enabled = true;


            GUILayout.BeginHorizontal();
            if (GUILayout.Button("Copy Style")) CopyStyle();
            if (GUILayout.Button("Copy Layout")) CopyLayout();
            GUILayout.EndHorizontal();

            if (AutoApply) EditorGUI.BeginChangeCheck();

            DrawStyles();
            DrawLayout();

            if (AutoApply && EditorGUI.EndChangeCheck()) ApplyStyles();
        }

        void DrawStyles()
        {
            GUILayout.Space(14);
            GUILayout.Label("Rendering");

            // Opacity
            DrawNullableRow(CurrentStyle.opacity.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.Slider("Opacity", CurrentStyle.opacity ?? CurrentStyle.resolved.opacity, 0, 1f);
                CurrentStyle.opacity = enabled ? (float?)prop : null;
            });

            // zOrder
            DrawNullableRow(CurrentStyle.zOrder.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.IntField("Z Order", CurrentStyle.zOrder ?? CurrentStyle.resolved.zOrder);
                CurrentStyle.zOrder = enabled ? (int?)prop : null;
            });


            // Background color
            DrawNullableRow(CurrentStyle.backgroundColor.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.ColorField("Background color",
                    CurrentStyle.backgroundColor ?? CurrentStyle.resolved.backgroundColor ?? Color.white);
                CurrentStyle.backgroundColor = enabled ? (Color?)prop : null;
            });

            // Pivot
            DrawNullableRow(CurrentStyle.pivot.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.Vector2Field("Pivot",
                    CurrentStyle.pivot ?? CurrentStyle.resolved.pivot);
                CurrentStyle.pivot = enabled ? (Vector2?)prop : null;
            });

            // Scale
            DrawNullableRow(CurrentStyle.scale.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.Vector2Field("Scale",
                    CurrentStyle.scale ?? CurrentStyle.resolved.scale);
                CurrentStyle.scale = enabled ? (Vector2?)prop : null;
            });

            // Rotation
            DrawNullableRow(CurrentStyle.rotate.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.FloatField("Rotation",
                    CurrentStyle.rotate ?? CurrentStyle.resolved.rotate);
                CurrentStyle.rotate = enabled ? (float?)prop : null;
            });


            GUILayout.Space(14);
            GUILayout.Label("Border");

            // Border Width
            DrawFloatRowWithNaN(CurrentLayout.BorderWidth, 0, (enabled, appropriateValue) =>
            {
                var prop2 = EditorGUILayout.IntField("Border Width", (int)appropriateValue);
                CurrentLayout.BorderWidth = enabled ? prop2 : float.NaN;
            });

            // Border color
            DrawNullableRow(CurrentStyle.borderColor.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.ColorField("Border color", CurrentStyle.borderColor ?? CurrentStyle.resolved.borderColor ?? Color.black);
                CurrentStyle.borderColor = enabled ? (Color?)prop : null;
            });

            // Border radius
            DrawNullableRow(CurrentStyle.borderRadius.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.IntField("Border radius", CurrentStyle.borderRadius ?? CurrentStyle.resolved.borderRadius);
                CurrentStyle.borderRadius = enabled ? (int?)prop : null;
            });


            GUILayout.Space(14);
            GUILayout.Label("Font");

            // Font style
            DrawNullableRow(CurrentStyle.fontStyle.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.EnumFlagsField("Font style", CurrentStyle.fontStyle ?? CurrentStyle.resolved.fontStyle);
                CurrentStyle.fontStyle = enabled ? (FontStyles?)prop : null;
            });

            // Text Overflow
            DrawNullableRow(CurrentStyle.textOverflow.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.EnumPopup("Text Overflow", CurrentStyle.textOverflow ?? CurrentStyle.resolved.textOverflow);
                CurrentStyle.textOverflow = enabled ? (TextOverflowModes?)prop : null;
            });

            // Font color
            DrawNullableRow(CurrentStyle.fontColor.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.ColorField("Font color", CurrentStyle.fontColor ?? CurrentStyle.resolved.fontColor);
                CurrentStyle.fontColor = enabled ? (Color?)prop : null;
            });

            // Text wrap
            DrawNullableRow(CurrentStyle.textWrap.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.Toggle("Text wrap", CurrentStyle.textWrap ?? CurrentStyle.resolved.textWrap);
                CurrentStyle.textWrap = enabled ? (bool?)prop : null;
            });

            // Direction
            var prop1 = EditorGUILayout.EnumPopup("Direction", CurrentLayout.StyleDirection);
            CurrentLayout.StyleDirection = (YogaDirection)prop1;
        }


        void DrawLayout()
        {
            GUILayout.Space(14);
            GUILayout.Label("Layout");

            // Display
            var position = EditorGUILayout.EnumPopup("Position", CurrentLayout.PositionType);
            CurrentLayout.PositionType = (YogaPositionType)position;

            var display = EditorGUILayout.EnumPopup("Display", CurrentLayout.Display);
            CurrentLayout.Display = (YogaDisplay)display;

            // Overflow
            var ovf = EditorGUILayout.EnumPopup("Overflow", CurrentLayout.Overflow);
            CurrentLayout.Overflow = (YogaOverflow)ovf;


            GUILayout.Space(14);
            GUILayout.Label("Flex");

            // Flex direction
            var prop1 = EditorGUILayout.EnumPopup("Flex Direction", CurrentLayout.FlexDirection);
            CurrentLayout.FlexDirection = (YogaFlexDirection)prop1;


            // Flex grow
            var grow = EditorGUILayout.FloatField("Flex Grow", CurrentLayout.FlexGrow);
            CurrentLayout.FlexGrow = grow;

            // Flex shrink
            var shrink = EditorGUILayout.FloatField("Flex Shrink", CurrentLayout.FlexShrink);
            CurrentLayout.FlexShrink = shrink;

            // Wrap
            var prop6 = EditorGUILayout.EnumPopup("Wrap", CurrentLayout.Wrap);
            CurrentLayout.Wrap = (YogaWrap)prop6;


            GUILayout.Space(14);
            GUILayout.Label("Align");

            // Align Items
            var prop2 = EditorGUILayout.EnumPopup("Align Items", CurrentLayout.AlignItems);
            CurrentLayout.AlignItems = (YogaAlign)prop2;

            // Align Content
            var prop3 = EditorGUILayout.EnumPopup("Align Content", CurrentLayout.AlignContent);
            CurrentLayout.AlignContent = (YogaAlign)prop3;

            // Align Self
            var prop4 = EditorGUILayout.EnumPopup("Align Self", CurrentLayout.AlignSelf);
            CurrentLayout.AlignSelf = (YogaAlign)prop4;

            // Justify Content
            var prop5 = EditorGUILayout.EnumPopup("Justify Content", CurrentLayout.JustifyContent);
            CurrentLayout.JustifyContent = (YogaJustify)prop5;



            GUILayout.Space(14);
            GUILayout.Label("Size");

            // Aspect ratio
            DrawFloatRowWithNaN(CurrentLayout.AspectRatio, 1, (enabled, appropriateValue) =>
            {
                var val = EditorGUILayout.FloatField("Aspect Ratio", appropriateValue);
                CurrentLayout.AspectRatio = enabled ? val : float.NaN;
            });


        }


        void ApplyStyles()
        {
            var flex = Selection.activeGameObject?.GetComponent<FlexElement>();
            if (!flex) return;

            flex.Style.CopyStyle(CurrentStyle);
            flex.Layout.CopyStyle(CurrentLayout);
            flex.Component.Context.scheduleLayout(flex.Component.ApplyLayoutStyles);
            flex.Component.ResolveStyle();
        }

        bool Toggle(bool value)
        {
            return EditorGUILayout.Toggle(value, GUILayout.ExpandWidth(false), GUILayout.Width(20));
        }

        void DrawNullableRow(bool value, Action<bool> draw)
        {
            GUILayout.BeginHorizontal();
            var enabled = Toggle(value);
            GUI.enabled = enabled;

            draw(enabled);

            GUILayout.EndHorizontal();
            GUI.enabled = true;
        }



        void DrawFloatRowWithNaN(float value, float defaultValue, Action<bool, float> draw)
        {
            var isNan = float.IsNaN(value);
            GUILayout.BeginHorizontal();
            var enabled = Toggle(!isNan);
            GUI.enabled = enabled;

            draw(enabled, isNan ? defaultValue : value);

            GUILayout.EndHorizontal();
            GUI.enabled = true;
        }

        void CopyStyle()
        {
            var str = new StringBuilder();
            str.Append("{\n");

            var excludedProperties = new List<string>() { "resolved" };
            var styleType = typeof(NodeStyle);

            var properties = styleType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var prop in properties)
            {
                if (excludedProperties.Contains(prop.Name)) continue;

                var currentValue = prop.GetValue(CurrentStyle);
                var defaultValue = prop.GetValue(CurrentStyleDefaults);

                if (currentValue == null && defaultValue == null) continue;

                if (currentValue != null && defaultValue != null)
                    if (currentValue.Equals(defaultValue)) continue;

                var type = prop.PropertyType;
                if (type.GetGenericTypeDefinition() == typeof(Nullable<>)) type = type.GenericTypeArguments[0];

                str.Append($"  {prop.Name}: ");
                str.Append(ObjectAsString(currentValue, type));
                str.Append(",\n");
            }

            str.Append("}");

            EditorGUIUtility.systemCopyBuffer = str.ToString();
        }

        void CopyLayout()
        {
        }

        string ObjectAsString(object value, Type type)
        {
            switch (value)
            {
                case null:
                    return "null";
                case YogaValue v:
                    if (v.Unit == YogaUnit.Auto) return "'auto'";
                    if (v.Unit == YogaUnit.Undefined) return "null";
                    if (v.Unit == YogaUnit.Percent) return $"{v.Value}%";
                    return v.Value.ToString();
                case Enum e:
                    var enumName = Enum.GetName(type, value);
                    if (enumName != null) return $"{type.Name}.{enumName}";
                    return value.ToString();
                case Vector2 v2:
                    return $"[{v2.x}, {v2.y}]";
                case Color c:
                    return $"[{c.r}, {c.g}, {c.b}, {c.a}]";
                case string s:
                    return $"'{s}'";
                default:
                    return value.ToString();
            }
        }
    }
}
