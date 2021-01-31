using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using ReactUnity.Styling.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    public class EditStyleWindow : EditorWindow
    {
        public ReactElement PreviousComponent { get; set; }

        public NodeStyle CurrentStyle { get; set; }
        public YogaNode CurrentLayout { get; set; }

        public NodeStyle CurrentStyleDefaults { get; set; }
        public YogaNode CurrentLayoutDefaults { get; set; }

        Vector2 scrollPosition;

        public bool AutoApply = true;

        [MenuItem("React/Edit Style")]
        public static void Open()
        {
            var window = GetWindow<EditStyleWindow>();
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

            var cmp = Selection.activeGameObject?.GetComponent<ReactElement>();
            if (!cmp)
            {
                PreviousComponent = null;
                GUILayout.Label("Select an element to start editing");
                return;
            }

            if (PreviousComponent != cmp)
            {
                if (cmp.Style != null) CurrentStyle.CopyStyle(cmp.Style);
                if (cmp.Layout != null) CurrentLayout.CopyStyle(cmp.Layout);

                CurrentStyleDefaults = cmp.Component?.DefaultStyle;
                CurrentLayoutDefaults = cmp.Component?.DefaultLayout;

                CurrentStyle.Parent = cmp.Component?.Parent?.Style;

                PreviousComponent = cmp;
            }


            GUILayout.BeginHorizontal();
            AutoApply = EditorGUILayout.Toggle("Auto Apply changes", AutoApply);
            GUI.enabled = !AutoApply;
            if (GUILayout.Button("Apply")) ApplyStyles();
            GUILayout.EndHorizontal();
            GUI.enabled = true;


            GUILayout.BeginHorizontal();
            if (GUILayout.Button("Copy Json")) CopyStyleAndLayout();
            GUILayout.EndHorizontal();

            if (AutoApply) EditorGUI.BeginChangeCheck();

            var wide = EditorGUIUtility.wideMode;
            EditorGUIUtility.wideMode = true;
            scrollPosition = GUILayout.BeginScrollView(scrollPosition);

            DrawStyles();
            DrawLayout();

            GUILayout.EndScrollView();
            EditorGUIUtility.wideMode = wide;

            if (AutoApply && EditorGUI.EndChangeCheck()) ApplyStyles();
        }

        void DrawStyles()
        {
            GUILayout.Space(14);
            GUILayout.Label("Rendering");

            // Opacity
            DrawNullableRow("opacity", (enabled) =>
            {
                return EditorGUILayout.Slider("Opacity", CurrentStyle.opacity, 0, 1f);
            });

            // zIndex
            DrawNullableRow("zIndex", (enabled) =>
            {
                return EditorGUILayout.IntField("Z Index", CurrentStyle.zIndex);
            });

            // Visibility
            DrawNullableRow("visibility", (enabled) =>
            {
                return EditorGUILayout.Toggle("Visibility", CurrentStyle.visibility);
            });

            // Pointer Events
            DrawNullableRow("pointerEvents", (enabled) =>
            {
                return EditorGUILayout.EnumPopup("PointerEvents", CurrentStyle.pointerEvents);
            });



            GUILayout.Space(14);

            // Box Shadow
            DrawNullableRow("boxShadow", (enabled) =>
            {
                EditorGUILayout.BeginVertical();
                GUILayout.Label("Box Shadow");

                var tempShadow = CurrentStyle.boxShadow ?? new ShadowDefinition();

                tempShadow.blur = EditorGUILayout.FloatField("Blur", tempShadow.blur);
                tempShadow.offset = EditorGUILayout.Vector2Field("Offset", tempShadow.offset);
                tempShadow.spread = EditorGUILayout.Vector2Field("Spread", tempShadow.spread);
                tempShadow.color = EditorGUILayout.ColorField("Color", tempShadow.color);

                EditorGUILayout.EndVertical();

                return tempShadow;
            });


            GUILayout.Space(14);
            GUILayout.Label("Graphic");


            // Background color
            DrawNullableRow("backgroundColor", (enabled) =>
            {
                return EditorGUILayout.ColorField("Background color", CurrentStyle.backgroundColor);
            });



            // Border Width
            DrawFloatRowWithNaN(CurrentLayout.BorderWidth, 0, (enabled, appropriateValue) =>
            {
                var prop2 = EditorGUILayout.IntField("Border Width", (int) appropriateValue);
                CurrentLayout.BorderWidth = enabled ? prop2 : float.NaN;
            });

            // Border color
            DrawNullableRow("borderColor", (enabled) =>
            {
                return EditorGUILayout.ColorField("Border color", CurrentStyle.borderColor);
            });

            // Border radius
            DrawNullableRow("borderRadius", (enabled) =>
            {
                return EditorGUILayout.IntField("Border radius", CurrentStyle.borderRadius);
            });


            GUILayout.Space(14);
            GUILayout.Label("Font");

            // Font size
            GUILayout.BeginHorizontal();
            GUILayout.Label("Font size", GUILayout.Width(150));
            CurrentStyle.fontSize = DrawYogaValue(CurrentStyle.fontSize);
            GUILayout.EndHorizontal();

            // Font style
            DrawNullableRow("fontStyle", (enabled) =>
            {
                return EditorGUILayout.EnumFlagsField("Font style", CurrentStyle.fontStyle);
            });

            // Text Overflow
            DrawNullableRow("textOverflow", (enabled) =>
            {
                return EditorGUILayout.EnumPopup("Text Overflow", CurrentStyle.textOverflow);
            });

            // Text Overflow
            DrawNullableRow("textAlign", (enabled) =>
            {
                return EditorGUILayout.EnumPopup("Text Align", CurrentStyle.textAlign);
            });

            // Font color
            DrawNullableRow("color", (enabled) =>
            {
                return EditorGUILayout.ColorField("Font color", CurrentStyle.color);
            });

            // Text wrap
            DrawNullableRow("textWrap", (enabled) =>
            {
                return EditorGUILayout.Toggle("Text wrap", CurrentStyle.textWrap);
            });

            // Direction
            var prop1 = EditorGUILayout.EnumPopup("Direction", CurrentLayout.StyleDirection);
            CurrentLayout.StyleDirection = (YogaDirection) prop1;



            GUILayout.Space(14);
            GUILayout.Label("Transform");

            //// Translate
            //DrawNullableRow("translate", (enabled) =>
            //{
            //    return EditorGUILayout.Vector2Field("Translate", CurrentStyle.translate);
            //});

            // Pivot
            //DrawNullableRow("pivot", (enabled) =>
            //{
            //    return EditorGUILayout.Vector2Field("Pivot", CurrentStyle.pivot);
            //});

            // Scale
            DrawNullableRow("scale", (enabled) =>
            {
                return EditorGUILayout.Vector2Field("Scale", CurrentStyle.scale);
            });

            // Rotation
            DrawNullableRow("rotate", (enabled) =>
            {
                return EditorGUILayout.FloatField("Rotation", CurrentStyle.rotate);
            });
        }


        void DrawLayout()
        {
            GUILayout.Space(14);
            GUILayout.Label("Layout");

            // Display
            var position = EditorGUILayout.EnumPopup("Position", CurrentLayout.PositionType);
            CurrentLayout.PositionType = (YogaPositionType) position;

            var display = EditorGUILayout.EnumPopup("Display", CurrentLayout.Display);
            CurrentLayout.Display = (YogaDisplay) display;

            // Overflow
            var ovf = EditorGUILayout.EnumPopup("Overflow", CurrentLayout.Overflow);
            CurrentLayout.Overflow = (YogaOverflow) ovf;


            GUILayout.Space(14);
            GUILayout.Label("Flex");

            // Flex direction
            var prop1 = EditorGUILayout.EnumPopup("Flex Direction", CurrentLayout.FlexDirection);
            CurrentLayout.FlexDirection = (YogaFlexDirection) prop1;


            // Flex grow
            var grow = EditorGUILayout.FloatField("Flex Grow", CurrentLayout.FlexGrow);
            CurrentLayout.FlexGrow = grow;

            // Flex shrink
            var shrink = EditorGUILayout.FloatField("Flex Shrink", CurrentLayout.FlexShrink);
            CurrentLayout.FlexShrink = shrink;

            // Flex basis
            GUILayout.BeginHorizontal();
            GUILayout.Label("Flex Basis", GUILayout.Width(150));
            CurrentLayout.FlexBasis = DrawYogaValue(CurrentLayout.FlexBasis);
            GUILayout.EndHorizontal();


            // Wrap
            var prop6 = EditorGUILayout.EnumPopup("Wrap", CurrentLayout.Wrap);
            CurrentLayout.Wrap = (YogaWrap) prop6;


            GUILayout.Space(14);
            GUILayout.Label("Align");

            // Align Items
            var prop2 = EditorGUILayout.EnumPopup("Align Items", CurrentLayout.AlignItems);
            CurrentLayout.AlignItems = (YogaAlign) prop2;

            // Align Content
            var prop3 = EditorGUILayout.EnumPopup("Align Content", CurrentLayout.AlignContent);
            CurrentLayout.AlignContent = (YogaAlign) prop3;

            // Align Self
            var prop4 = EditorGUILayout.EnumPopup("Align Self", CurrentLayout.AlignSelf);
            CurrentLayout.AlignSelf = (YogaAlign) prop4;

            // Justify Content
            var prop5 = EditorGUILayout.EnumPopup("Justify Content", CurrentLayout.JustifyContent);
            CurrentLayout.JustifyContent = (YogaJustify) prop5;



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
            var flex = Selection.activeGameObject?.GetComponent<ReactElement>();
            if (!flex) return;

            flex.Style.CopyStyle(CurrentStyle);
            flex.Layout.CopyStyle(CurrentLayout);
            flex.Component.ScheduleLayout(flex.Component.ApplyLayoutStyles);
            flex.Component.ResolveStyle(true);
        }

        bool Toggle(bool value)
        {
            return EditorGUILayout.Toggle(value, GUILayout.ExpandWidth(false), GUILayout.Width(20));
        }

        void DrawNullableRow(string propertyName, Func<bool, object> draw)
        {
            var exists = CurrentStyle.HasValue(propertyName);

            GUILayout.BeginHorizontal();
            var enabled = Toggle(exists);
            GUI.enabled = enabled;

            var result = draw(enabled);
            CurrentStyle.SetStyleValue(StyleProperties.GetStyleProperty(propertyName), enabled ? result : null);

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

        void CopyStyleAndLayout()
        {
            var str = new StringBuilder();
            str.Append("{\n");

            str.Append($"  style: ");
            str.Append(GetStyleJson());
            str.Append(",\n");

            str.Append($"  layout: ");
            str.Append(GetLayoutJson());
            str.Append(",\n");

            str.Append("}");

            EditorGUIUtility.systemCopyBuffer = str.ToString();
        }

        string GetStyleJson()
        {
            var str = new StringBuilder();
            str.Append("{\n");

            var excludedProperties = new List<string>() { "StyleMap", "Changes", "HasInheritedChanges", "Parent", "DefaultStyle" };
            var styleType = typeof(NodeStyle);

            var properties = styleType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            return CopyObjectFor(
                properties.Where(x => !excludedProperties.Contains(x.Name) && x.CanWrite),
                CurrentStyle,
                CurrentStyleDefaults);
        }

        string GetLayoutJson()
        {
            var excludedProperties = new List<string>() {
                "IsBaselineDefined", "IsMeasureDefined", "Parent", "HasNewLayout", "IsDirty", "Data", "Count", "Flex" };
            var styleType = typeof(YogaNode);

            var properties = styleType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            return CopyObjectFor(
                properties.Where(x => !excludedProperties.Contains(x.Name) && !x.Name.StartsWith("Layout")),
                CurrentLayout,
                CurrentLayoutDefaults);
        }

        string CopyObjectFor(IEnumerable<PropertyInfo> properties, object current, object currentDefaults)
        {
            var str = new StringBuilder();
            str.Append("{");

            foreach (var prop in properties)
            {
                if (prop.GetIndexParameters().Length > 0) continue;
                var currentValue = prop.GetValue(current);
                var defaultValue = prop.GetValue(currentDefaults);

                if (currentValue == null && defaultValue == null) continue;

                if (currentValue != null && defaultValue != null)
                    if (currentValue.Equals(defaultValue)) continue;

                var type = prop.PropertyType;
                if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>)) type = type.GenericTypeArguments[0];

                str.Append($"\n    {prop.Name}: ");
                str.Append(ObjectAsString(currentValue, type));
                str.Append(",");
            }

            if (str.Length > 1)
                str.Append("\n");
            str.Append("  }");

            return str.ToString();
        }

        string ObjectAsString(object value, Type type = null)
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
                case ShadowDefinition sd:
                    return $"new ShadowDefinitionNative({ObjectAsString(sd.offset)}, {ObjectAsString(sd.spread)}, {ObjectAsString(sd.color)}, {ObjectAsString(sd.blur)})";
                default:
                    return value.ToString();
            }
        }

        YogaValue DrawYogaValue(YogaValue value, GUIStyle style = null, params GUILayoutOption[] options)
        {
            var str = "";
            var valueStr = IsNegativeZero(value.Value) ? "-0" : $"{value.Value}";
            if (value.Unit == YogaUnit.Auto) str = "auto";
            else if (value.Unit == YogaUnit.Percent) str = $"{valueStr}%";
            else if (value.Unit == YogaUnit.Point) str = $"{valueStr}";

            var res = EditorGUILayout.DelayedTextField(str, style ?? GUI.skin.textField, options);

            if (res == "auto") return YogaValue.Undefined();

            var trimmed = new Regex("[^\\d\\.-]").Replace(res, "");

            var canParse = float.TryParse(trimmed, out var fval);
            if (trimmed == "-" || trimmed == "-0") fval = -0f;


            if (trimmed.Length > 0 && (canParse || trimmed == "-"))
            {
                if (res.EndsWith("%")) return YogaValue.Percent(fval);
                return YogaValue.Point(fval);
            }

            return YogaValue.Undefined();
        }

        private static bool IsNegativeZero(float x)
        {
            return x == 0f && float.IsNegativeInfinity(1 / x);
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
