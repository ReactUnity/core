using ReactUnity.Editor.Components;
using ReactUnity.Editor.Styling;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using UnityEditor.UIElements;
using ReactUnity.Editor.StateHandlers;

namespace ReactUnity.Editor.Renderer
{
    public class EditorContext : ReactContext
    {
        public static Func<string, string, EditorContext, IEditorComponent<VisualElement>> defaultCreator =
            (tag, text, context) => new EditorComponent<VisualElement>(context, tag);

        public static Func<string, EditorContext, ITextComponent> textCreator =
            (text, context) => new TextComponent<TextElement>(text, context, "_text");

        public static Dictionary<string, Func<string, string, EditorContext, IEditorComponent<VisualElement>>> ComponentCreators
            = new Dictionary<string, Func<string, string, EditorContext, IEditorComponent<VisualElement>>>()
            {
                { "text", (tag, text, context) => new TextComponent<TextElement>(text, context, tag) },
                { "label", (tag, text, context) => new TextComponent<Label>(text, context, tag) },
                { "button", (tag, text, context) => new ButtonComponent<Button>(context, tag) },
                { "view", (tag, text, context) => new EditorComponent<VisualElement>(context, tag) },
                { "anchor", (tag, text, context) => new AnchorComponent(context) },
                { "box", (tag, text, context) => new EditorComponent<Box>(context, tag) },
                { "toggle", (tag, text, context) => new ToggleComponent<Toggle>(context, tag) },
                { "image", (tag, text, context) => new ImageComponent(context, tag) },
                { "scroll", (tag, text, context) => new EditorComponent<ScrollView>(context, tag) }, // TODO
                { "input", (tag, text, context) => new BaseFieldComponent<TextField, string>(context, tag) }, // TODO
                { "helpbox", (tag, text, context) => new EditorComponent<HelpBox>(context, tag) }, // TODO
                { "foldout", (tag, text, context) => new ValueComponent<Foldout, bool>(context, tag) }, // TODO
                { "popup", (tag, text, context) => new TextComponent<PopupWindow>(text, context, tag) },
                { "slider", (tag, text, context) => new BaseSliderComponent<Slider, float>(context, tag) },
                { "sliderint", (tag, text, context) => new BaseSliderComponent<SliderInt, int>(context, tag) },
                { "range", (tag, text, context) => new RangeComponent(context)},
                { "repeat", (tag, text, context) => new EditorComponent<RepeatButton>(context, tag) }, // TODO:
                { "scroller", (tag, text, context) => new EditorComponent<Scroller>(context, tag) }, // TODO:
                { "list", (tag, text, context) => new BindableComponent<ListView>(context, tag) }, // TODO:
                { "imgui", (tag, text, context) => new IMGUIComponent(context) },
                { "template", (tag, text, context) => new BindableComponent<TemplateContainer>(context, tag) },
                { "color", (tag, text, context) => new BaseFieldComponent<ColorField, Color>(context, tag) },
                { "bounds", (tag, text, context) => new BaseFieldComponent<BoundsField, Bounds>(context, tag)},
                { "boundsint", (tag, text, context) => new BaseFieldComponent<BoundsIntField, BoundsInt>(context, tag)},
                { "curve", (tag, text, context) => new BaseFieldComponent<CurveField, AnimationCurve>(context, tag) },
                { "double", (tag, text, context) => new BaseFieldComponent<DoubleField, double>(context, tag) },
                { "enum", (tag, text, context) => new EnumComponent<EnumField>(context, tag) },
                { "flags", (tag, text, context) => new EnumComponent<EnumFlagsField>(context, tag)},
                { "float", (tag, text, context) => new BaseFieldComponent<FloatField, float>(context, tag) },
                { "gradient", (tag, text, context) => new BaseFieldComponent<GradientField, Gradient>(context, tag) },
                { "inspector", (tag, text, context) => new BindableComponent<InspectorElement>(context, tag) },
                { "integer", (tag, text, context) => new BaseFieldComponent<IntegerField, int>(context, tag) },
                { "layer", (tag, text, context) => new BaseFieldComponent<LayerField, int>(context, tag) },
                { "layermask", (tag, text, context) => new BaseFieldComponent<LayerMaskField, int>(context, tag) },
                { "long", (tag, text, context) => new BaseFieldComponent<LongField, long>(context, tag) },
                { "mask", (tag, text, context) => new BaseFieldComponent<MaskField, int>(context, tag) },
                { "object", (tag, text, context) => new ObjectComponent(context) },
                { "progress", (tag, text, context) => new ValueComponent<ProgressBar, float>(context, tag) },
                { "property", (tag, text, context) => new BindableComponent<PropertyField>(context, tag) },
                { "rect", (tag, text, context) => new BaseFieldComponent<RectField, Rect>(context, tag) },
                { "rectint", (tag, text, context) => new BaseFieldComponent<RectIntField, RectInt>(context, tag) },
                { "tag", (tag, text, context) => new BaseFieldComponent<TagField, string>(context, tag) },
                { "vector2", (tag, text, context) => new BaseFieldComponent<Vector2Field, Vector2>(context, tag) },
                { "vector2int", (tag, text, context) => new BaseFieldComponent<Vector2IntField, Vector2Int>(context, tag) },
                { "vector3", (tag, text, context) => new BaseFieldComponent<Vector3Field, Vector3>(context, tag) },
                { "vector3int", (tag, text, context) => new BaseFieldComponent<Vector3IntField, Vector3Int>(context, tag) },
                { "vector4", (tag, text, context) => new BaseFieldComponent<Vector4Field, Vector4>(context, tag) },
                { "length", (tag, text, context) => new BaseFieldComponent<StyleLengthField, StyleLength>(context, tag) },
                { "toolbar", (tag, text, context) => new EditorComponent<Toolbar>(context, tag) },
                { "tb-breadcrumbs", (tag, text, context) => new EditorComponent<ToolbarBreadcrumbs>(context, tag) },
                { "tb-button", (tag, text, context) => new ButtonComponent<ToolbarButton>(context, tag) },
                { "tb-menu", (tag, text, context) => new EditorComponent<ToolbarMenu>(context, tag) }, // TODO
                { "tb-popupsearch", (tag, text, context) => new EditorComponent<ToolbarPopupSearchField>(context, tag) }, // TODO
                { "tb-search", (tag, text, context) => new EditorComponent<ToolbarSearchField>(context, tag) }, // TODO
                { "tb-spacer", (tag, text, context) => new EditorComponent<ToolbarSpacer>(context, tag) },
                { "tb-toggle", (tag, text, context) => new ToggleComponent<ToolbarToggle>(context, tag) },
            };

        public override Dictionary<string, Type> StateHandlers { get; }
            = new Dictionary<string, Type>()
            {
                { "active", typeof(ActiveStateHandler) },
                { "focus", typeof(FocusStateHandler) },
                { "hover", typeof(HoverStateHandler) },
            };

        public EditorContext(VisualElement hostElement, GlobalRecord globals, ReactScript script, IDispatcher dispatcher, IUnityScheduler scheduler, bool isDevServer, Action onRestart = null)
            : base(globals, script, dispatcher, scheduler, isDevServer, onRestart, true)
        {
            Host = new HostComponent(hostElement, this);
            InsertStyle(EditorResourcesHelper.UseragentStylesheet?.text, -1);
            Host.ResolveStyle(true);

            hostElement.styleSheets.Add(EditorResourcesHelper.UtilityStylesheet);
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
