using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
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

        Vector2 scrollPosition;

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

            scrollPosition = GUILayout.BeginScrollView(scrollPosition);

            DrawStyles();
            DrawLayout();

            GUILayout.EndScrollView();


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

            // Opacity
            DrawNullableRow(CurrentStyle.hidden.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.Toggle("Hidden", CurrentStyle.hidden ?? CurrentStyle.resolved.hidden);
                CurrentStyle.hidden = enabled ? (bool?)prop : null;
            });

            // Interaction
            DrawNullableRow(CurrentStyle.interaction.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.EnumPopup("Interaction", CurrentStyle.interaction ?? CurrentStyle.resolved.interaction);
                CurrentStyle.interaction = enabled ? (InteractionType?)prop : null;
            });


            // Background color
            DrawNullableRow(CurrentStyle.backgroundColor.HasValue, (enabled) =>
            {
                var prop = EditorGUILayout.ColorField("Background color",
                    CurrentStyle.backgroundColor ?? CurrentStyle.resolved.backgroundColor ?? Color.white);
                CurrentStyle.backgroundColor = enabled ? (Color?)prop : null;
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



            GUILayout.Space(14);
            GUILayout.Label("Transform");

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

            // Width
            GUILayout.BeginHorizontal();
            GUILayout.Label("Width", GUILayout.Width(150));
            CurrentLayout.Width = DrawYogaValue(CurrentLayout.Width);
            GUILayout.EndHorizontal();

            // Height
            GUILayout.BeginHorizontal();
            GUILayout.Label("Height", GUILayout.Width(150));
            CurrentLayout.Height = DrawYogaValue(CurrentLayout.Height);
            GUILayout.EndHorizontal();


            // Min Width
            GUILayout.BeginHorizontal();
            GUILayout.Label("Min Width", GUILayout.Width(150));
            CurrentLayout.MinWidth = DrawYogaValue(CurrentLayout.MinWidth);
            GUILayout.EndHorizontal();

            // Min Height
            GUILayout.BeginHorizontal();
            GUILayout.Label("Min Height", GUILayout.Width(150));
            CurrentLayout.MinHeight = DrawYogaValue(CurrentLayout.MinHeight);
            GUILayout.EndHorizontal();


            // Max Width
            GUILayout.BeginHorizontal();
            GUILayout.Label("Max Width", GUILayout.Width(150));
            CurrentLayout.MaxWidth = DrawYogaValue(CurrentLayout.MaxWidth);
            GUILayout.EndHorizontal();

            // Max Height
            GUILayout.BeginHorizontal();
            GUILayout.Label("Max Height", GUILayout.Width(150));
            CurrentLayout.MaxHeight = DrawYogaValue(CurrentLayout.MaxHeight);
            GUILayout.EndHorizontal();


            var style = new GUIStyle(GUI.skin.textField);
            style.alignment = TextAnchor.MiddleCenter;

            GUILayout.Space(14);
            GUILayout.Label("Margin");

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.MarginTop = DrawYogaValue(CurrentLayout.MarginTop, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.MarginLeft = DrawYogaValue(CurrentLayout.MarginLeft, style, GUILayout.Width(100));
            CurrentLayout.MarginRight = DrawYogaValue(CurrentLayout.MarginRight, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.MarginBottom = DrawYogaValue(CurrentLayout.MarginBottom, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();



            GUILayout.Space(14);
            GUILayout.Label("Padding");

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.PaddingTop = DrawYogaValue(CurrentLayout.PaddingTop, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.PaddingLeft = DrawYogaValue(CurrentLayout.PaddingLeft, style, GUILayout.Width(100));
            CurrentLayout.PaddingRight = DrawYogaValue(CurrentLayout.PaddingRight, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.PaddingBottom = DrawYogaValue(CurrentLayout.PaddingBottom, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();



            GUILayout.Space(14);
            GUILayout.Label("Border");

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.BorderTopWidth = DrawFloat(CurrentLayout.BorderTopWidth, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.BorderLeftWidth = DrawFloat(CurrentLayout.BorderLeftWidth, style, GUILayout.Width(100));
            GUILayout.Space(20);
            CurrentLayout.BorderRightWidth = DrawFloat(CurrentLayout.BorderRightWidth, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.BorderBottomWidth = DrawFloat(CurrentLayout.BorderBottomWidth, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();


            GUILayout.Space(14);
            GUILayout.Label("Position");

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.Top = DrawYogaValue(CurrentLayout.Top, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.Left = DrawYogaValue(CurrentLayout.Left, style, GUILayout.Width(100));
            CurrentLayout.Right = DrawYogaValue(CurrentLayout.Right, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();

            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            CurrentLayout.Bottom = DrawYogaValue(CurrentLayout.Bottom, style, GUILayout.Width(100));
            GUILayout.FlexibleSpace();
            GUILayout.EndHorizontal();
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
                    if (v.Unit == YogaUnit.Percent) return $"'{v.Value}%'";
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
                case float f:
                    if (float.IsNaN(f)) return "null";
                    return f.ToString();
                default:
                    return value.ToString();
            }
        }

        YogaValue DrawYogaValue(YogaValue value, GUIStyle style = null, params GUILayoutOption[] options)
        {
            var str = "";
            if (value.Unit == YogaUnit.Auto) str = "auto";
            else if (value.Unit == YogaUnit.Percent) str = $"{value.Value}%";
            else if (value.Unit == YogaUnit.Point) str = $"{value.Value}";

            var res = GUILayout.TextField(str, style ?? GUI.skin.textField, options);

            var trimmed = new Regex("[^\\d\\.-]").Replace(res, "");

            if (res == "auto") return YogaValue.Undefined();
            if (trimmed.Length > 0 && float.TryParse(trimmed, out var fval))
            {
                if (res.EndsWith("%")) return YogaValue.Percent(fval);
                return YogaValue.Point(fval);
            }

            return YogaValue.Undefined();
        }


        float DrawFloat(float value, GUIStyle style = null, params GUILayoutOption[] options)
        {
            var enabled = Toggle(!float.IsNaN(value));
            value = float.IsNaN(value) ? 0 : value;
            GUI.enabled = enabled;
            var floatRes = EditorGUILayout.FloatField(value, style ?? GUI.skin.textField, options);
            GUI.enabled = true;

            if (enabled) return floatRes;
            else return float.NaN;
        }
    }
}
