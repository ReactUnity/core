using ReactUnity.Editor.Components;
using ReactUnity.Editor.Styling;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using UnityEditor.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class EditorContext : ReactContext
    {
        public static Func<string, string, EditorContext, IEditorComponent<VisualElement>> defaultCreator =
            (tag, text, context) => new EditorComponent<VisualElement>(context, tag);

        public static Func<string, EditorContext, ITextComponent> textCreator =
            (text, context) => new TextComponent(text, context, "_text");

        public static Dictionary<string, Func<string, string, EditorContext, IEditorComponent<VisualElement>>> ComponentCreators
            = new Dictionary<string, Func<string, string, EditorContext, IEditorComponent<VisualElement>>>()
            {
                { "text", (tag, text, context) => new TextComponent(text, context, tag) },
                { "button", (tag, text, context) => new ButtonComponent(context) },
                { "view", (tag, text, context) => new EditorComponent<VisualElement>(context, "view") },
                { "box", (tag, text, context) => new EditorComponent<Box>(context, "box") },
                { "toggle", (tag, text, context) => new ToggleComponent(context) },
                { "image", (tag, text, context) => new EditorComponent<Image>(context, "image") },
                { "scroll", (tag, text, context) => new EditorComponent<ScrollView>(context, "scroll") },
                { "input", (tag, text, context) => new BaseFieldComponent<TextField, string>(context, "input") },
                { "helpbox", (tag, text, context) => new EditorComponent<HelpBox>(context, "helpbox") },
                { "foldout", (tag, text, context) => new EditorComponent<Foldout>(context, "foldout") },
                { "popup", (tag, text, context) => new EditorComponent<PopupWindow>(context, "popup") },
                { "slider", (tag, text, context) => new BaseSliderComponent<Slider, float>(context, "slider") },
                { "sliderint", (tag, text, context) => new BaseSliderComponent<SliderInt, int>(context, "sliderint") },
                { "range", (tag, text, context) => new RangeComponent(context)},
                { "repeat", (tag, text, context) => new EditorComponent<RepeatButton>(context, "repeat") },
                { "scroller", (tag, text, context) => new EditorComponent<Scroller>(context, "scroller") },
                { "list", (tag, text, context) => new EditorComponent<ListView>(context, "list") },
                { "imgui", (tag, text, context) => new IMGUIComponent(context) },
                { "template", (tag, text, context) => new EditorComponent<TemplateContainer>(context, "template") },
                { "color", (tag, text, context) => new BaseFieldComponent<ColorField, Color>(context, "color") },
                { "bounds", (tag, text, context) => new BaseFieldComponent<BoundsField, Bounds>(context, "bounds") },
                { "boundsint", (tag, text, context) => new BaseFieldComponent<BoundsIntField, BoundsInt>(context, "boundsint") },
                { "curve", (tag, text, context) => new BaseFieldComponent<CurveField, AnimationCurve>(context, "curve") },
                { "double", (tag, text, context) => new BaseFieldComponent<DoubleField, double>(context, "double") },
                { "enum", (tag, text, context) => new BaseFieldComponent<EnumField, Enum>(context, "enum") },
                { "flags", (tag, text, context) => new BaseFieldComponent<EnumFlagsField, Enum>(context, "flags") },
                { "float", (tag, text, context) => new BaseFieldComponent<FloatField, float>(context, "float") },
                { "gradient", (tag, text, context) => new BaseFieldComponent<GradientField, Gradient>(context, "gradient") },
                { "inspector", (tag, text, context) => new EditorComponent<InspectorElement>(context, "inspector") },
                { "integer", (tag, text, context) => new BaseFieldComponent<IntegerField, int>(context, "integer") },
                { "layer", (tag, text, context) => new BaseFieldComponent<LayerField, int>(context, "layer") },
                { "layermask", (tag, text, context) => new BaseFieldComponent<LayerMaskField, int>(context, "layermask") },
                { "long", (tag, text, context) => new BaseFieldComponent<LongField, long>(context, "long") },
                { "mask", (tag, text, context) => new BaseFieldComponent<MaskField, int>(context, "mask") },
                { "object", (tag, text, context) => new BaseFieldComponent<ObjectField, UnityEngine.Object>(context, "object") },
                { "progress", (tag, text, context) => new EditorComponent<ProgressBar>(context, "progress") },
                { "property", (tag, text, context) => new EditorComponent<PropertyField>(context, "property") },
                { "rect", (tag, text, context) => new BaseFieldComponent<RectField, Rect>(context, "rect") },
                { "rectint", (tag, text, context) => new BaseFieldComponent<RectIntField, RectInt>(context, "rectint") },
                { "tag", (tag, text, context) => new BaseFieldComponent<TagField, string>(context, "tag") },
                { "vector2", (tag, text, context) => new BaseFieldComponent<Vector2Field, Vector2>(context, "vector2") },
                { "vector2int", (tag, text, context) => new BaseFieldComponent<Vector2IntField, Vector2Int>(context, "vector2int") },
                { "vector3", (tag, text, context) => new BaseFieldComponent<Vector3Field, Vector3>(context, "vector3") },
                { "vector3int", (tag, text, context) => new BaseFieldComponent<Vector3IntField, Vector3Int>(context, "vector3int") },
                { "vector4", (tag, text, context) => new BaseFieldComponent<Vector4Field, Vector4>(context, "vector4") },
                { "toolbar", (tag, text, context) => new EditorComponent<Toolbar>(context, "toolbar") },
                { "length", (tag, text, context) => new BaseFieldComponent<StyleLengthField, StyleLength>(context, "length") },
                { "tb-breadcrumbs", (tag, text, context) => new EditorComponent<ToolbarBreadcrumbs>(context, "tb-breadcrumbs") },
                { "tb-button", (tag, text, context) => new EditorComponent<ToolbarButton>(context, "tb-button") },
                { "tb-menu", (tag, text, context) => new EditorComponent<ToolbarMenu>(context, "tb-menu") },
                { "tb-popupsearch", (tag, text, context) => new EditorComponent<ToolbarPopupSearchField>(context, "tb-popupsearch") },
                { "tb-search", (tag, text, context) => new EditorComponent<ToolbarSearchField>(context, "tb-search") },
                { "tb-spacer", (tag, text, context) => new EditorComponent<ToolbarSpacer>(context, "tb-spacer") },
                { "tb-toggle", (tag, text, context) => new EditorComponent<ToolbarToggle>(context, "tb-toggle") },
            };

        public ReactWindow Editor;

        public EditorContext(VisualElement hostElement, StringObjectDictionary globals, ReactScript script, IDispatcher dispatcher, IUnityScheduler scheduler, bool isDevServer, ReactWindow editor, Action onRestart = null)
            : base(globals, script, dispatcher, scheduler, isDevServer, onRestart, true)
        {
            Editor = editor;
            Host = new HostComponent(hostElement, this);
            InsertStyle(EditorResourcesHelper.UseragentStylesheet?.text, -1);
            Host.ResolveStyle(true);

            hostElement.styleSheets.Add(EditorResourcesHelper.UtilityStylesheet);

            dispatcher.AddCallOnLateUpdate(() =>
            {
                if (Scheduled)
                {
                    Scheduled = false;

                    for (int i = 0; i < ScheduledCallbacks.Count; i++)
                        ScheduledCallbacks[i]?.Invoke();
                }
            });
        }

        public override ITextComponent CreateText(string text)
        {
            return textCreator(text, this);
        }

        public override IReactComponent CreateComponent(string tag, string text)
        {
            IEditorComponent<VisualElement> res = null;
            if (ComponentCreators.TryGetValue(tag, out var creator))
                res = creator(tag, text, this);
            else res = defaultCreator(tag, text, this);
            if (res.Element != null) res.Element.name = $"<{tag}>";
            return res;
        }
    }
}
